// Shared lead delivery for the contact form and the early-access waitlist.
//
// A lead is saved to Firestore AND emailed through Web3Forms, in parallel.
// The submission counts as delivered as soon as EITHER channel succeeds, and
// only fails (so the UI can tell the visitor) when both fail or time out.
//
// Each channel has a timeout because Firestore's addDoc() never settles while
// the network is blocked (ad-blockers, offline): it queues the write and waits.
// Without a timeout the form would sit on "Sending" forever.
//
// Firebase is loaded on demand so it stays out of the initial JS bundle.
// The Web3Forms access key is a public, client-side key by design.
const WEB3FORMS_ACCESS_KEY = "dbca4209-f902-4fd7-992e-0b850a5a2c4a";
const CHANNEL_TIMEOUT_MS = 12000;

const withTimeout = (promise, ms, label) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out`)), ms),
    ),
  ]);

async function saveToFirestore(record) {
  const [{ db }, { collection, addDoc, serverTimestamp }] = await Promise.all([
    import("../config/firebase"),
    import("firebase/firestore"),
  ]);
  await addDoc(collection(db, "leads"), {
    ...record,
    createdAt: serverTimestamp(),
  });
}

async function sendEmail({ subject, record }) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject,
      from_name: "SENOVA Digital Labs",
      ...record,
    }),
  });
  const result = await response.json();
  if (!result.success) throw new Error("Email delivery failed");
}

/**
 * @param {Record<string, string>} record  fields to store/send (name, email, ...)
 * @param {string} subject                 email subject line
 * @throws when neither Firestore nor email delivery succeeded
 */
export async function submitLead(record, subject) {
  try {
    await Promise.any([
      withTimeout(saveToFirestore(record), CHANNEL_TIMEOUT_MS, "Firestore"),
      withTimeout(sendEmail({ subject, record }), CHANNEL_TIMEOUT_MS, "Email"),
    ]);
  } catch {
    throw new Error("Lead could not be delivered");
  }
}

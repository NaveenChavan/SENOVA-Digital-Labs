// Single source of truth for business details used across the UI.
// Keep in sync with the JSON-LD block in index.html (name, address, phone).
export const SITE = {
  name: "SENOVA Digital Labs",
  url: "https://www.senovadigital.xyz",
  email: "info@senovadigital.xyz",
  phones: [
    { display: "+91 9731133425", tel: "+919731133425" },
    { display: "+91 8088366098", tel: "+918088366098" },
  ],
  whatsappSales: "https://wa.me/919731133425",
  whatsappChat:
    "https://wa.me/918088366098?text=" +
    encodeURIComponent(
      "Hello SENOVA! I am interested in your services and would like to discuss a project.",
    ),
  locality: "Raichur",
  region: "Karnataka",
  country: "India",
  addressLine: "Raichur, Karnataka, India",
  instagram: "https://www.instagram.com/senovadigitallabs",
  linkedin: {
    naveen: "https://www.linkedin.com/in/naveen-chavan-8852a9368/",
    shrihari: "https://www.linkedin.com/in/shrihari-124323340/",
  },
};

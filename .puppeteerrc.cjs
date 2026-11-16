// On Vercel the build uses @sparticuz/chromium (a Chromium built for serverless
// Linux), so puppeteer's own ~170MB Chrome download is skipped there.
module.exports = {
  skipDownload: Boolean(process.env.VERCEL),
};

export default async function handler(req, res) {
  const videoId = "1Zv9iP-VuwHc_bHPiIKyubeHWFk9FMFe7";
  const initialUrl = `https://docs.google.com/uc?export=download&id=${videoId}`;

  try {
    const response = await fetch(initialUrl);
    const contentType = response.headers.get("content-type") || "";

    // If Google Drive shows the "too large for virus scan" warning page,
    // we extract the confirmation token and redirect the user directly to the file payload.
    if (contentType.includes("text/html")) {
      const bodyText = await response.text();
      const confirmMatch = bodyText.match(/confirm=([a-zA-Z0-9_]+)/);
      if (confirmMatch) {
        const confirmToken = confirmMatch[1];
        res.redirect(302, `https://docs.google.com/uc?export=download&confirm=${confirmToken}&id=${videoId}`);
        return;
      }
    }
    
    // Otherwise, redirect to the initial URL (if it streams directly)
    res.redirect(302, initialUrl);
  } catch (error) {
    console.error("Vercel route error:", error);
    res.redirect(302, initialUrl);
  }
}

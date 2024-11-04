let customFileName = "";
chrome.runtime.onMessage.addListener((request) => {
  if (request.fileName) {
    customFileName = request.fileName; // received from content.js
  }
});

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  const fileType = downloadItem.filename.endsWith(".pptx")
    ? ".pptx"
    : downloadItem.filename.endsWith(".pdf")
    ? ".pdf"
    : downloadItem.filename.endsWith(".zip")
    ? ".zip"
    : null;

  // exit if the file is neither .pptx, .pdf, .zip
  if (!fileType) return true;

  if (downloadItem.filename.startsWith("GIU_") || downloadItem.filename.startsWith("GUC_")) {
    const newName = customFileName ? `${customFileName}${fileType}` : downloadItem.filename;

    if (newName) {
      suggest({ filename: newName });
      customFileName = "";
      return true;
    } else {
      console.error("Invalid filename: empty or undefined.");
    }
  }
});

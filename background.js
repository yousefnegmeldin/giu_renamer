let customFileName = "";
chrome.runtime.onMessage.addListener((request) => {
  if (request.fileName) {
    customFileName = request.fileName; // received from content.js
  }
});

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  const fileType = "." + downloadItem.filename.split(".").pop();

  // exit if the file is neither .pptx, .pdf, .zip
  if (!fileType) {
    suggest({ filename: downloadItem.filename });
    return true;
  }

  if (downloadItem.filename.startsWith("GIU_") || downloadItem.filename.startsWith("GUC_")) {
    const newName = customFileName ? `${customFileName}${fileType}` : downloadItem.filename;

    if (newName) {
      suggest({ filename: newName });
      customFileName = "";
    } else {
      console.error("Invalid filename: empty or undefined.");
      suggest({ filename: downloadItem.filename }); // Fallback to original filename
    }
  } else {
    suggest({ filename: downloadItem.filename });
  }
});

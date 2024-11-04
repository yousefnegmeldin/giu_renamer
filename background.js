chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  if (downloadItem.filename.startsWith("GIU_") || downloadItem.filename.startsWith("GUC")) {
    let newName = renameFile(downloadItem.filename);
    suggest({ filename: newName });
  }
});

const renameFile = (fileToBeRenamed) => {
  return "testing!";
};

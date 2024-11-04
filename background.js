chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  if (downloadItem.filename.startsWith("GIU_") || downloadItem.filename.startsWith("GUC")) {
    // Rename logic: extract or replace based on your needs
    let newName = renameFile(downloadItem.filename);

    // Suggest the new filename
    suggest({ filename: newName });
  }
});

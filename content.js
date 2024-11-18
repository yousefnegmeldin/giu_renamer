const setupListeners = () => {
  const courseName = document.querySelector("#ContentPlaceHolderright_ContentPlaceHoldercontent_LabelCourseName")?.innerText;
  if (!courseName) return;
  const trimmedCourseName = courseName.replace(/\s*\(.*?\)\s*$/, "");

  const downloadButtons = document.querySelectorAll("#download");

  downloadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const wholeCard = button.parentElement.parentElement.parentElement;
      //replace part uses regex to clean name
      let strongElement = wholeCard.getElementsByTagName("strong")[0].innerText.replace(/^\d+\s*-\s*/, "");
      const fileName = trimmedCourseName + " - " + strongElement;
      chrome.runtime.sendMessage({ fileName: fileName });
    });
  });
};

setupListeners();

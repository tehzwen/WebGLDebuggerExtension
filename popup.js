window.onload = () => {
  chrome.runtime.sendMessage({ message: "loaded" });
  const debugButton = document.getElementById("debugButton");

  debugButton.addEventListener('click', () => {
    runDebugger();
  });
}

function runDebugger() {
  chrome.tabs.executeScript({
    file: 'utils.js'
  }); 
}

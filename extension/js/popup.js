document.addEventListener('DOMContentLoaded', function () {
    // Request the copied text from the background script
    browser.runtime.sendMessage({ action: 'getCopiedText' }, function (response) {
      if (response.success && response.copiedText) {
        // Display the copied text in the popup
        document.getElementById('copiedText').textContent = response.copiedText;
      }
    });
  
    // Request the API result from the background script
    browser.runtime.sendMessage({ action: 'getPopupText' }, function (response) {
      if (response.success && response.result) {
        // Display the API result in the popup
        document.getElementById('copiedText').textContent = response.result;
      }
    });
  });
  
const BASE_URL = 'http://127.0.0.1:8000';

// Listener for messages from content script
browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // console.log({ message, sender, sendResponse });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  };
  
  return new Promise(async (resolve) => {
    // Send the selectedText to the API
    const res = await fetch(`${BASE_URL}/api`, options);
    if (!res.ok) {
      resolve({ success: false, data: null });
      return;
    }

    const response = await res.json();

    // TODO: Perform necessary processing and send the result back to the content script
    resolve({ success: true, data: response?.data });
  });
});

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {
    if (tab.url.startsWith('https://twitter.com/')) {
      browser.browserAction.setPopup({ popup: 'popup.html' });
    } else {
      browser.browserAction.setPopup({ popup: 'newtab.html' });
    }
  }
});

// Context menu creation
browser.contextMenus.create({
  id: 'bigFiveContextMenu',
  title: 'BIG 5',
  contexts: ['selection']
});

// Context menu click listener
browser.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'bigFiveContextMenu') {
    const selectedText = info.selectionText;
    const body = { text: selectedText };
    // Send the selectedText to the API
    fetch('http://127.0.0.1:8000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data
        console.log('API response:', data);
        // Pass the result to the new tab
        browser.tabs
          .create({
            url: browser.extension.getURL('popup.html'),
            active: true
          })
          .then((createdTab) => {
            console.log({ createdTab });
            browser.browserAction.setPopup({ popup: 'popup.html' });

            // Send the result to the new tab
            // browser.tabs.sendMessage(createdTab.id, { action: 'displayResult', result: data.data })
            // .then((response) => {
            //   console.log("Message from the content script:");
            //   console.log(response);
          });
      })
      .catch((error) => {
        // Handle API errors
        console.error('API Error:', error);
      });
  }
});

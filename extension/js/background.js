var big5TraitsMap = new Map();

const BASE_URL = 'http://127.0.0.1:8000';

const tweetSender = async (tweetText) => {
  const body = { text: tweetText };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  // Send the selectedText to the API
  const res = await fetch(`${BASE_URL}/api`, options);
  if (!res.ok) {
    return;
  }

  const response = await res.json();

  if (response?.data) {
    const key = response.data;
    if (big5TraitsMap.has(key)) {
      big5TraitsMap.set(key, big5TraitsMap.get(key) + 1);
    } else {
      big5TraitsMap.set(key, 1);
    }

    createTable();
  }
};

// Listener for messages from content script
// browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'copyTweetText') {
//     const tweetText = message.tweetText;
//     const body = { text: tweetText };
//     // Send the selectedText to the API
//     fetch('http://127.0.0.1:8000/api', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the API response data
//         console.log('API response:', data);
//         // TODO: Perform necessary processing on the result if needed
//         // Pass the result to the new tab
//         browser.tabs
//           .create({
//             url: browser.extension.getURL('newtab.html'),
//             active: true
//           })
//           .then((createdTab) => {
//             // Send the result to the new tab
//             browser.tabs.sendMessage(createdTab.id, {
//               action: 'displayResult',
//               result: data.data
//             });
//           });
//       })
//       .catch((error) => {
//         // Handle API errors
//         console.error('API Error:', error);
//       });

//     // TODO: Perform necessary processing and send the result back to the content script
//     sendResponse({ success: true });
//   }
// });

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

const USER_TRAIT_BOX_ID = 'big5-user-traits-box';

const tableExists = () => {
  // check if the user personality traits table exists in the DOM

  const box = document.getElementById(USER_TRAIT_BOX_ID);
  if (box) {
    return true;
  }

  return false;
};

const setTableHeader = (table) => {
  const th1 = document.createElement('th');
  th1.innerText = 'Personality Trait';

  const th2 = document.createElement('th');
  th1.innerText = 'Percentage';

  const thead = document.createElement('tr');
  thead.appendChild(th1);
  thead.appendChild(th2);

  table.appendChild(thead);
};

const setTableRows = (table) => {
  for (let [key, value] of big5TraitsMap) {
    console.log(key + ' = ' + value);
    const row = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');

    td1.innerText = key;
    td1.innerText = key;

    row.appendChild(td1);
    row.appendChild(td2);

    table.appendChild(row);
  }
};

const createTable = () => {
  const userBox = document.querySelector('[data-testid="UserName"');

  const tableWrapper = document.createElement('div');
  let table = document.createElement('table');
  table.setAttribute('id', USER_TRAIT_BOX_ID);

  if (tableExists()) {
    table = document.getElementById(USER_TRAIT_BOX_ID);
  }

  setTableHeader(table);
  setTableRows(table);

  tableWrapper.appendChild(table);
  userBox.appendChild(table);
};

function searchTweets() {
  const tweets = document.querySelectorAll('[data-testid="tweetText"]');

  tweets.forEach((tweet) => {
    if (tweet.dataset.is_visited) {
      return;
    }

    const tweetText = tweet.innerText;
    console.log({ tweetText });
    tweet.dataset.is_visited = true;

    tweetSender(tweetText);
  });
}

//
window.addEventListener('scroll', searchTweets);

window.addEventListener('DOMContentLoaded', () => {
  console.log("Hello I'm loaded!!!");
  searchTweets();
});

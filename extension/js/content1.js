const USER_TRAIT_BOX_ID = 'big5-user-traits-box';

var big5TraitsMap = new Map();

const BASE_URL = 'http://127.0.0.1:8000';

const tweetSender = async (tweetText) => {
  const body = { text: tweetText };

  const sending = browser.runtime.sendMessage(body);
  sending.then(
    function handleResponse(r) {
      console.log(r);
    },
    function handleError(e) {
      console.log(e);
    }
  );
  return;

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
  console.log('Searching tweets...');

  const tweets = document.querySelectorAll('[data-testid="tweetText"]');
  console.log({ tweets });
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

/**
 * Send tweet text to a "job lib" file and show "incon.png" under every tweet.
 * 
 * @param  {String} text The text to send to the "job lib" file.
 * @param  {Element} tweetElement The tweet element.
 */
const sendToJobLib = (text, tweetElement) => {
    // Send the tweet text to the "job lib" file
    // Replace the code below with your implementation of sending the text to the "job lib" file
    // jobLib.send(text);
  
    // Show "incon.png" under the tweet
    const img = document.createElement('img');
    img.src = 'icon.png';
    tweetElement.appendChild(img);
  };
  
  /**
   * Get the closest matching element up the DOM tree.
   * 
   * @param  {Element} elem     Starting element
   * @param  {String}  selector Selector to match against
   * @return {Boolean|Element}  Returns null if no match found
   */
  const getClosest = (elem, selector) => {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) { }
          return i > -1;
        };
    }
  
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
  
    return null;
  };
  
  /**
   * Manage multiple tweet statuses and append the functionality.
   */
  const tweetArticles = () => {
    /**
     * Event listener callback.
     * 
     * @param  {Object} e Event object
     * @return {NULL} Returns null
     */
    const listener = (e) => {
      let targetElement = e.target;
  
      switch (e.type) {
        case 'click':
          // Don't click the tweet
          e.stopPropagation();
  
          // In case a button child element is clicked
          if (e.target !== e.currentTarget) {
            targetElement = e.currentTarget;
          }
  
          const siblings = Array.from(targetElement.parentNode.children);
  
          let outputContent = '';
          let authorHandle = '';
  
          siblings.forEach((sibling) => {
            if (sibling.tagName === 'SPAN') {
              outputContent += sibling.innerText;
            } else if (sibling.tagName === 'A' && sibling.getAttribute('data-testid') === 'tweetAuthorScreenName') {
              authorHandle = sibling.innerText;
            }
          });
  
          outputContent += ` — ${authorHandle}`;
  
          sendToJobLib(outputContent, getClosest(targetElement, 'article'));
  
          break;
      }
    };
  
    /**
     * Build the functionality button.
     * 
     * @return {Element} Returns the button element.
     */
    const functionalityBtn = () => {
      const el = document.createElement('button');
  
      el.classList.add('functionality-button');
      el.innerHTML = 'Send to Job Lib';
  
      el.addEventListener('click', listener);
  
      return el;
    };
  
    /**
     * Append the functionality button.
     * 
     * @param  {Element} tweetElement The tweet element.
     */
    const appendFunctionalityBtn = (tweetElement) => {
        // Create the functionality button
        const functionalityBtn = document.createElement('button');
        functionalityBtn.textContent = 'Functionality Button';
        functionalityBtn.addEventListener('click', () => {
          // Add your functionality code here
          // This code will be executed when the button is clicked
          console.log('Functionality button clicked!');
        });
      
        // Append the functionality button to the tweet element
        tweetElement.appendChild(functionalityBtn);
      };
    }
// content.js - the content scripts which is run in the context of web pages, and has access
// to the DOM and other web APIs.

// Example usage:
// const message = {
//     action: 'classify',
//     text: 'text to classify',
// }
// chrome.runtime.sendMessage(message, (response) => {
//     console.log('received user data', response)
// });

async function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// Wait for the first batch of tweets to load
// The MutationObserver will handle new tweets, not these
async function waitForFirstTweets() {
  let tweets = document.querySelectorAll('[data-testid="tweet"]');

  while (!tweets[0]) {
    console.log("Waiting for the tweet to load...");
    tweets = document.querySelectorAll('[data-testid="tweet"]');
    // Wait before checking again
    await wait(200);
  }

  return tweets;
}

// Wait for the timeline to load
async function waitForTimeline() {
  let timeline = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');

  while (!timeline) {
    console.log("Waiting for the timeline to load...");
    timeline = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');
    // Wait before checking again
    await wait(200);
  }

  return timeline;
}

// Get the text from the element that contains it
function getTweetText(tweetElem) {
  let textDiv = tweetElem.querySelector('[data-testid="tweetText"]');

  if (!textDiv) {
    console.log("Non-tweet element found");
    return null;
  }
  else if (textDiv.textContent === "") {
    console.log("Tweet contains no text");
    return null;
  }

  return textDiv.textContent;
}

// Sent a classify message to the background script
function sendClassifyMessage(text) {
  const message = {
    action: 'classify',
    text: text
  };

  chrome.runtime.sendMessage(message, (response) => {
    console.log('Received classification response:', response);
  });
}

async function main() {
  // Wait for the timeline to load
  await waitForTimeline().then(timeline => {
    console.log("Timeline loaded:", timeline);

    // Add a MutationObserver to watch for new tweets
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          // Get the new timeline elements
          const newTLNodes = mutation.addedNodes;

          // Output the tweet text and give a border
          newTLNodes.forEach(node => {
            // Check if the node is a tweet
            const tweet = node.querySelector('[data-testid="tweet"]');
            if (!tweet) {
              console.log("Non-tweet element updated");
              return;
            }

            // Get the text from the tweet
            const text = getTweetText(node);
            if (text) {
              console.log("Tweet text:", text);
              // Send the text to the background script for classification
              sendClassifyMessage(text);

              // Create a thin green border around each tweet
              tweet.style.border = "1px solid green";
              tweet.style.padding = "5px";
              tweet.style.margin = "5px 0";
            }
          });
        }
      });
    });

    // Start observing the timeline for new tweets
    observer.observe(timeline, {
      childList: true,
      subtree: true
    });
  });

  // Handle the first batch of tweets when the timeline loads
  // (the MutationObserver will handle new tweets)
  await waitForFirstTweets().then(tweets => {
    console.log("Tweets collected:", tweets);


    // Create a thin green border around each tweet
    tweets.forEach((tweet) => {
      // Get the text from each tweet
      const text = getTweetText(tweet);
      if (text) {
        console.log("Tweet text:", text);
      
        // Send the text to the background script for classification
        sendClassifyMessage(text);

        // Create a thin green border around each tweet
        tweet.style.border = "1px solid green";
        tweet.style.padding = "5px";
        tweet.style.margin = "5px 0";
      }
    });
  });
}

main();
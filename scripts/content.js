async function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// Wait for the page to load
async function waitForTweet() {
  let tweets = document.querySelectorAll('[data-testid="tweet"]');

  while (!tweets[0]) {
    console.log("Waiting for the tweet to load...");
    tweets = document.querySelectorAll('[data-testid="tweet"]');
    // Wait before checking again
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  return tweets;
}

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

            // Output the tweet text to console
            const text = getTweetText(node);
            if (text) {
              console.log("Tweet text:", text);
            }

            // Create a thin green border around each tweet
            tweet.style.border = "1px solid green";
            tweet.style.padding = "5px";
            tweet.style.margin = "5px 0";
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

  /*

  // Call the function to wait for the tweet
  await waitForTweet().then(tweets => {
    console.log("Tweets collected:", tweets);

    // Get the tweet text
    const text = getTweetText(tweets[0]);
    if (text) {
      console.log("Tweet text:", text);
    }
    else {
      console.log("Tweet contains no text");
    }

    // Create a thin green border around each tweet
    for (tweet of tweets) {
      tweet.style.border = "1px solid green";
      tweet.style.padding = "5px";
    }
  });

  */
}

main();
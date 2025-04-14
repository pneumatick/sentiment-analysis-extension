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

function getTweetText(tweetElem) {
  let textDiv = tweetElem.querySelector('[data-testid="tweetText"]');

  return textDiv.textContent;
}

async function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// Call the function to wait for the tweet
waitForTweet().then(tweets => {
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

// `document.querySelector` may return null if the selector doesn't match anything.
/*if (article) {
  console.log("Tweet found");
  console.log(article);
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}
*/
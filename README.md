
# Love Hate - A Sentiment Analysis Browser Extension for Twitter / X

A Chrome browser extension that performs sentiment analysis on Twitter / X posts. The goal of this project is to provide users with a means of understanding the emotional weight of the posts that they encounter on X, which can have effects on their daily life, especially with heavy use. 

## Development

### Getting Started
1. Clone the repo and enter the project directory:
    ```bash
    git clone https://github.com/pneumatick/sentiment-analysis-extension.git
    cd sentiment-analysis-extension
    ```
1. Install the necessary dependencies:
    ```bash
    npm install 
    ```

1. Build the project:
    ```bash
    npm run build 
    ```

1. Add the extension to your browser. To do this, go to `chrome://extensions/`, enable developer mode (top right), and click "Load unpacked". Select the `build` directory from the dialog which appears and click "Select Folder".

1. You should now be able to use the extension in your browser.

### Editing the extension

It is recommended to run `npm run dev` while editing the template as it will rebuild the project when changes are made. 

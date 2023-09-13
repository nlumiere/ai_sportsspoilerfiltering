// import * as tf from "@tensorflow/tfjs";

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("Received message from content script:", message);
    if (Object.keys(message).includes("thumbnail")) {
        console.log(message["thumbnail"]);
    }
    sendResponse({ farewell: "Goodbye from background script!" });
});
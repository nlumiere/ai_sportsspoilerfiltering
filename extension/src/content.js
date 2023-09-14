const titleMap = new Map();
const thumbnailMap = new Map();

function findTitle(item, query) {
  const title = item.querySelector(query);
  if (title && title.textContent) {
    const text = title.textContent;
    if (titleMap.has(text)) {

    }
    else {
      titleMap.set(text, true);
      // console.log("NEW VID:", text);
      chrome.runtime.sendMessage({ title: text }, function (response) {
        if(response){
          console.log(response)
        }
        else{
          console.log("no response")
        }
        // const containsSpoilerContent = response["title"]; // get from GPT
        // if (containsSpoilerContent && response["alt_title"] != "") {
        //   try {
        //     title.textContent = response["alt_title"];
        //     console.log("Spoiler title:", text, "; New title:", response["alt_title"]);
        //   }
        //   catch {
        //     console.log("DOM not fully loaded");
        //   }
        // }
      });
    }
  }
}

function filterVideos() {
  const richItems = document.querySelectorAll("ytd-rich-item-renderer");
  richItems.forEach((item) => {
    findTitle(item, "yt-formatted-string#video-title");
  });
  const richItems2 = document.querySelectorAll("ytd-video-renderer");
  richItems2.forEach((item) => {
    findTitle(item, "yt-formatted-string.ytd-video-renderer");
  });
    // const thumbnail = item.querySelector("yt-image.ytd-thumbnail");
    // if (thumbnail) {
    //   const thumbnailImage = thumbnail.querySelector("img");
    //   if (thumbnailImage && thumbnailImage.src) {
    //     const url = thumbnailImage.src;
    //     if (thumbnailMap.has(url)) {
    //       // Do nothing (?)
    //     }
    //     else {
    //       thumbnailMap.set(url, true);
    //       // TODO get image bytes and call cnn
    //       chrome.runtime.sendMessage({ thumbnail: url }, function (response) {
    //         // console.log("Contains spoiler content", response);
    //       });
    //       const containsSpoilerContent = true; // get from CNN
    //     }
    //   }
    // }
}

function handleMutations(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Check if any "ytd-rich-item-renderer" elements were added
      const addedNodes = mutation.addedNodes;
      for (const node of addedNodes) {
        if (node instanceof HTMLElement && node.matches('ytd-rich-item-renderer')) {
          findTitle(node, "yt-formatted-string#video-title");
        }
        else if (node instanceof HTMLElement && node.matches('ytd-video-renderer')) {
          findTitle(node, "yt-formatted-string.ytd-video-renderer");
        }
      }
    }
  }
}

window.onload = () => {
  filterVideos();
}

const observer = new MutationObserver(handleMutations);
observer.observe(document.body, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("yeet.");
})
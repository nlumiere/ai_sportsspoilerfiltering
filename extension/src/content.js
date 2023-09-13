const titleMap = new Map();
const thumbnailMap = new Map();

function filterVideos() {
  const richItems = document.querySelectorAll("ytd-rich-item-renderer");
  richItems.forEach((item) => {
    const title = item.querySelector("yt-formatted-string#video-title");
    if (title && title.textContent) {
      const text = title.textContent;
      if (titleMap.has(text)) {

      }
      else {
        // TODO call GPT
        console.log(text);
        const containsSpoilerContent = true; // get from GPT
        titleMap.set(text, containsSpoilerContent);
      }
    }
    const thumbnail = item.querySelector("yt-image.ytd-thumbnail");
    if (thumbnail) {
      const thumbnailImage = thumbnail.querySelector("img");
      if (thumbnailImage && thumbnailImage.src) {
        const url = thumbnailImage.src;
        if (thumbnailMap.has(url)) {
          // Do nothing (?)
        }
        else {
          // TODO get image bytes and call cnn
          chrome.runtime.sendMessage({ thumbnail: url }, function (response) {
            console.log("Contains spoiler content", response);
          });
          const containsSpoilerContent = true; // get from CNN
          thumbnailMap.set(url, containsSpoilerContent);
        }
      }
    }
  });
}

const observer = new MutationObserver(filterVideos);
observer.observe(document.body, { childList: true, subtree: true });

window.onload = () => {
  filterVideos();
}

chrome.runtime.sendMessage({ greeting: "Hello from content script!" }, function (response) {
  console.log("Received response from background:", response);
});
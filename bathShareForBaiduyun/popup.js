function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}

document.querySelector("#expiration").onclick = function () {
    let v = document.getElementById("expiration").value;
    console.log(v);
    sendMessageToContentScript({v: v}, function (response) {
        console.log('respond of content-script:' + response);
    });
};
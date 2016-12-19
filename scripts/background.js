/**
 * Handling HTTP requests
 * @param {any} request
 * @param {MessageSender} sender
 * @param {function} callback 
 */
//INFO: https://developer.chrome.com/extensions/content_scripts#host-page-communication
chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    if (request.action == "xhttp") {
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            callback(xhttp.responseText);
        };
        xhttp.open(request.method, request.url, true);
        if (request.method == 'POST') {
            // Adding header to post requests
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhttp.send(request.data);
        return true;
    }
});

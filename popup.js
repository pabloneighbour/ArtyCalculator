let popupId = chrome.windows.create({
    'url': 'index.html', 
    'width': 420,
    'height': 640,
    'type': 'popup'
}, function(window) {
    chrome.windows.update(
        window.id, {
        focused: true
        },
      )
})



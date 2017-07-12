var affiliateTag = "tag=beskarschmied-21";

var amazonAddress = "amazon.de";

browser.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    var currentTime = Date();

    if(timers[tabId] == null || (currentTime - timers[tabId]) === (20 * 60 * 1000))
    {
      timers[tabId] = currentTime;

      var tabUrl = tab.url;
      if(tabUrl.indexOf(affiliateTag) == -1) {
        if(tabUrl.indexOf(amazonAddress) > -1) {
          if(tabUrl==amazonAddress||tabUrl==amazonAddress+"/") {
          tabUrl += "?"+affiliateTag; 
          }
          tabUrl += "&"+affiliateTag;
          chrome.tabs.update(tabId, { url: tabUrl} );
        }
      }
    }
  }
);

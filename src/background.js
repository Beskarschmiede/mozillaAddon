var affiliateTag = "tag=beskarschmied-21";
var amazonAddress = "amazon.de";
var simpleStorage = require("sdk/simple-storage");

browser.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
		var tabUrl = tab.url;
		if(tabUrl.indexOf(affiliateTag) == -1) {
			if(tabUrl.indexOf(amazonAddress) > -1) {
				var lastTime = simpleStorage.storage.lastTime;
				var currentTime = Date();
				if(lastTime = null || (currentTime - lastTime === (20 * 60 * 1000))){
					if(tabUrl == amazonAddress || tabUrl == amazonAddress + "/") {
						tabUrl += "?" + affiliateTag; 
					} else {
						tabUrl += "&" + affiliateTag;
					}
					browser.tabs.update(tabId, { url: tabUrl} );
					simpleStorage.storage.lastTime = currentTime;
				}
			}
		}
	}
);

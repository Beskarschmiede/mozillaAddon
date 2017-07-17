var affiliateTag = "tag=beskarschmied-21";
var amazonAddress = "amazon.de";

browser.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
		var tabUrl = tab.url;
		if(tabUrl.indexOf(affiliateTag) === -1) {
			if(tabUrl.indexOf(amazonAddress) > -1) {
				browser.storage.local.get("lastTime", function(data){
					var lastTime = isNaN(data.lastTime) ? null : new Date(parseInt(data.lastTime));
					var currentTime = new Date();
					if(lastTime === null || (currentTime.getTime() - lastTime.getTime()) > (20 * 60 * 1000)){
						if(tabUrl.indexOf("?") === -1) {
							tabUrl += "&" + affiliateTag;
						} else {
							tabUrl += "?" + affiliateTag;
						}
						browser.storage.local.set({'lastTime': +new Date()});
						browser.tabs.update(tabId, { url: tabUrl} );
					}
				});
			}
		}
	}
);

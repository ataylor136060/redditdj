var songTitle;
var url;
var pic;

$(".title a").mousedown(function(e){
	if(e.which == 3){
		songTitle = $(this).text();
		url = $(this).attr('href');
		var temp = $(this).closest('.thing').children('.thumbnail').children('img').attr('src');
		pic = "http:"+temp;

		/*if(pic.length() === 0){
			pic = "Picture Not Found";
		}*/
	}
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");
		if(request.greeting == "Get Song") {
			sendResponse({stitle: songTitle, slink: url, sthumb: pic});
		}
	}
);

/*document.addEventListener("mousedown", function(event){
    var selection = window.getSelection().toString();
    if(selection.match(/^10\./)) {
        chrome.extension.sendRequest({cmd: "create_menu"});
    } else {
        chrome.extension.sendRequest({cmd: "delete_menu"});
    }
}, true);*/
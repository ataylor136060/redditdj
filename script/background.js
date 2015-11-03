var Playlist = {
	index: 0,
	songlist: [],
	addSong: function(info) {
		var message = "Get Song";
		getPageInfo(message, function(title, pic, url){
			var song = new Song(title, pic, url);
			Playlist.songlist.push(song);
		});
	},

	Song: function(stitle, surl, spic){
	this.songtitle = stitle;
	this.pic = spic;
	this.url = surl;
    }
};

var playlist = new Playlist;
$('.playButton').click(function(){alert("I'm working")});



function getPageInfo(message, callback) {
	var s;
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {greeting: message}, function(response){
			callback(response.stitle, 
				     response.slink, 
				     response.sthumb);
		});
	});
}

chrome.contextMenus.create({
	title: "Add to Playlist",
	contexts: ["image", "link"],
	onclick: Playlist.addSong
});

/*chrome.extension.onRequest.addListener(function(request) {
    if(request.cmd == "create_menu") {
        chrome.contextMenus.removeAll(function() {
            chrome.contextMenus.create({
                "title" : "Add to Playlist",
                "type" : "normal",
                "contexts" : ["image", "link"],
                "onclick" : Playlist.test
            });
        });
    } else if(request.cmd == "delete_menu") {
        chrome.contextMenus.removeAll();
    }
});*/
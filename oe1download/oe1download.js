setTimeout(function(){ 
		initLinks();
	}, 2000);

function initLinks(){
	
	//generate download button for UI
	var imgUrl = chrome.extension.getURL('dl.png');
	var dlBtn = $("<a style='cursor: pointer; position: absolute; left: 40px;'><img width='21' src='"+imgUrl+"'/></a>")
	dlBtn.click(function(){
		//get URL of current playing mp3
		var uri = $("audio").attr("src");

		var link = document.createElement("a");
		link.download = document.title.replace(/ /g, '_') + ".mp3"
		link.target="_blank"
    link.href = "https:" + uri;
		link.click();
	});

	//add the UI download button to the DOM
	$(".control-buttons").append(dlBtn)
}
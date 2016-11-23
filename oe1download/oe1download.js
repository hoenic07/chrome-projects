setTimeout(function(){ 
		initLinks();
	}, 350);

function initLinks(){
	//dummy link to generate download popup
	$(".wrapper").append("<a href='' id='dldLink' download/>")
	
	//generate download button for UI
	var imgUrl = chrome.extension.getURL('dl.png');
	var dlBtn = $("<a style='cursor: pointer; position: absolute; left: 40px;'><img width='21' src='"+imgUrl+"'/></a>")
	dlBtn.click(function(){
		//get URL of current playing mp3
		var uri = $("audio").attr("src");

		//set url as download link of dummy download link
		$("#dldLink").attr("href",uri);
  		var d = document.getElementById("dldLink")

  		//call a click on the download link programmatically, which triggers the download
  		var clickEvent = new MouseEvent("click", {
		    "view": window,
		    "bubbles": true,
		    "cancelable": false
		});
  		d.dispatchEvent(clickEvent);
	});

	//add the UI download button to the DOM
	$(".share-bar").append(dlBtn)
}
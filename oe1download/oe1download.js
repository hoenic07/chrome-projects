setTimeout(function(){ 
		initLinks();
	}, 350);


$("#date, #ondemand").click(function(){
	setTimeout(function(){ 
		initLinks();
	}, 750);
});

function sendRequest(id){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://oe1.orf.at/programm/"+id+"/playlist", true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
	    var track = xhr.responseXML.getElementsByTagName("track")[0];
	    var uri = track.getAttribute("url");

  		$("#dldLink").attr("href",uri);
  		var d = document.getElementById("dldLink")

  		var clickEvent = new MouseEvent("click", {
		    "view": window,
		    "bubbles": true,
		    "cancelable": false
		});

  		d.dispatchEvent(clickEvent);

	  }
	}
	xhr.send();
}

function initLinks(){
	var isNewPlayer = window.location.href.indexOf("http://oe1.orf.at/player") >= 0

	if(isNewPlayer){
		//---new 7 day player---

		//dummy link to generate download popup
		$(".wrapper").append("<a href='' id='dldLink' download/>")
		
		//generate download button for UI
		var dlBtn = $("<a style='cursor: pointer; position: absolute; left: 40px;'><img width='21' src='http://rwrBrille.at/wp-content/uploads/2014/12/download.png'/></a>")
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
	else{
		//---old oe1 console---
		$("#programm").append("<a href='' id='dldLink' download/>")
		$("#programm li .container-right").each(function(){
	    	var field = $("<a style='cursor: pointer; margin-right: 7px;'><img width='21' src='http://rwrBrille.at/wp-content/uploads/2014/12/download.png'/></a>");
    
	    	var idstr = $(".button",this).attr("href");
	    	var id = idstr.replace("#?track_id=", "");

	    	field.addClass("id_"+id);

	    	field.click(function() {
	    		var idstr = $(this).attr("class");
	    		var id =idstr.replace("id_", "");
	    		sendRequest(id);
	    	});
	    	$(this).append(field)
		});
	}	
}
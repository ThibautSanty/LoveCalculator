console.log("script loaded");
// check the theme
checkTheme();
let ToggleThumb = document.getElementById("Theme");
// set background sound

document.getElementById("Body").addEventListener("mouseover",function(){
	document.getElementById("backgroundAudio").play();
})

ToggleThumb.addEventListener("change",function(){
	console.log("toggle button clicked");
	checkTheme();
});

document.getElementById("GoToCalculate").addEventListener("click",function(){
	GoNextPage();
});
//goto calculation
function GoNextPage(){
	// get the two names
	let name1 = document.getElementById("Name1").value;
	let name2 = document.getElementById("Name2").value;
	console.log("the names are " + name1 + " and " + name2);
	if(name1 <= 1){
		console.log("no name filled in for name 1");
		document.getElementById('Name1').classList.add("input-field-error");
	}
	else if(name2 <= 1){
		console.log("no name filled in for name 2");
		document.getElementById('Name2').classList.add("input-field-error");
	}
	else{
		let currentLocation = window.location.href;
		window.location.href = currentLocation.replace("choose.html","calculate.html?name1="+name1+"&name2="+name2);
	}
}

// function to set the theme
function checkTheme(){
	let Body = document.getElementById("Body");
	let ToggleCheck = document.getElementById("Theme").checked;
	let Cupido = document.getElementById("Cupido");
	let Reaper = document.getElementById("Reaper");
	let active = "toggle-active-image";
	let inactive = "toggle-image";


	if(ToggleCheck == true ){
		console.log("dark theme active");
		document.cookie = "theme=true";
		GetThemeCookie();
		// add class to change theme
		Body.classList.add("darkTheme");
		document.getElementById("Theme").checked = true;
		Cupido.setAttribute("class",inactive);
		Reaper.setAttribute("class",active);
	}
	else{
		console.log("light theme active");
		document.cookie = "theme=false";

		// delete class
		Body.classList.remove("darkTheme");
		document.getElementById("Theme").checked = false;
		Cupido.setAttribute("class",active);
		Reaper.setAttribute("class",inactive);
	}
}

function GetThemeCookie(){
	let themeCookie = document.cookie;
	console.log(themeCookie);
}



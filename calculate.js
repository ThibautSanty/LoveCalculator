console.log("script loaded");
GetAPI();

// get the names of the url and connect to API
function getQueryVariable(variable){
	let query = window.location.search.substring(1);
	let vars = query.split("&");
	for(var i=0;i<vars.length;i++){
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}

function GetAPI(){
	let name1 = getQueryVariable("name1");
	let name2 = getQueryVariable("name2");
	console.log("the names are " + name1 + " " + name2);
	// try to get the response of the API
	try{
		fetch('https://love-calculator.p.rapidapi.com/getPercentage?fname='+name1+'&sname='+name2 ,{
			headers:{
				"X-RapidAPI-Key" : "afbf84fcc4msh7c03fc7a4b9f558p15446fjsn49b04c75de88"
			}}).then(function(response) {return response.json();}).then(function(myJson) {
				console.log(JSON.stringify(myJson));
				LoadScreen(myJson.percentage/100);
			}).catch(function(error){
				console.warn(error);
				RandomPercentage()
			});
	}
	catch(error){
		console.warn(error);
	}
}

function RandomPercentage(){
	console.warn("there was an error with the API connection");
	// make random percentage
	let random = Math.floor(Math.random()*100)/100;
	console.log("percentage is " + random);
	LoadScreen(random);
}


function LoadScreen(percentage){
	SetPercentage(percentage);
	CheckPercentage(percentage);
}

function SetPercentage(percentage){
	// de minimum punt van de y-as en het maximum punt van de y-as van de te animeren object
	let max = 270; // negatief in mijn geval
	let min = 75; //negatief in mijn geval
	// omrekenen van de punten minimum en maximum naar 100% van het hartje
	let full = max - min; // that is 100% of the heart
	// berekenen van het percentage die moet worden ingepakt en dit omrekenen naar een punt voor de y-as
	// percentage is tussen 0 tot 1 dit resultaat plus het minimum , plus 10 is puur voor mijn eigen animatie zichtbaarder te maken
	let result = (percentage * full) + min + 10;
	console.log("y-as punt = "+ result);
	// hier zet ik de translate van het object naar de minimum om het niet zichtbaar te maken
	document.getElementById("filling").setAttribute("transform","translate(117.084 -" + min + ")");
	// een variabele die het eind translate zet
	let setY = "117.084,-" + result;
	// een variabele die het begin translate zet
	let setBegin = "117.084,-" + min;
	// zet de animatie beginpunt naar de begin translate
	document.getElementById("HeartFilling").setAttribute("from",setBegin);
	// zet de animatie eindpunt naar de eind translate
	document.getElementById("HeartFilling").setAttribute("to",setY);
}

async function CheckPercentage(percentage){
	// get the elements to change
	let Body = document.getElementById("Body");
	let textPercentage = document.getElementById("result-percentage");
	let textPercentageTitle = document.getElementById("result-percentage-title");
	let textSentence = document.getElementById("result-sentence");
	let cupido = document.getElementById("Cupido");
	let reaper = document.getElementById("Reaper");
	let hideClass = "hide-element";
	let BorderShadowHeart = document.getElementById("BorderShadowHeart");
	let BorderHeart = document.getElementById("BorderHeart");
	let Layer1 = document.getElementById("layer_1");
	let Layer2 = document.getElementById("layer_2");
	let nameOne = getQueryVariable("name1");
	let nameTwo = getQueryVariable("name2");

	await sleep(2000);
	if(percentage < 0.5){
		// dark theme actief
		console.log("less than 50%");
		Body.classList.add("darkTheme");
		textPercentage.innerHTML = Math.floor(percentage * 100) + " %";
		textPercentageTitle.innerHTML = "surprise haha";
		textSentence.innerHTML = "Hahaha if "+nameOne+" and "+nameTwo+" stays together we gonna have a lot of fun. I promise !";
		BorderHeart.setAttribute("class","cls-4005");
		BorderShadowHeart.setAttribute("class","cls-6006");
		Layer1.setAttribute("class","cls-1002");
		Layer2.setAttribute("class","cls-1002");
		cupido.classList.add(hideClass);
		reaper.classList.remove(hideClass);
		document.getElementById('darkaudio').play();
	}	
	else{
		console.log("more than 50%");
		Body.classList.remove("darkTheme");
		textPercentage.innerHTML = Math.floor(percentage * 100) + " %";
		textPercentageTitle.innerHTML = "congratulations";
		textSentence.innerHTML = "The future is positive for "+ nameOne +"'s relation. I hope there will be a wedding with "+nameTwo+" !";
		BorderHeart.setAttribute("class","cls-4004");
		BorderShadowHeart.setAttribute("class","cls-5005");
		Layer1.setAttribute("class","cls-1001");
		Layer2.setAttribute("class","cls-1001");
		cupido.classList.remove(hideClass);
		reaper.classList.add(hideClass);
		document.getElementById('lightaudio').play();
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


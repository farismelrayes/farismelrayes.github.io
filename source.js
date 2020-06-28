$(document).ready(function () {

var colorArray=["#019875","#1E8BC3","#D91E18","#D35400","#8E44AD","#C0392B"];
var cardState;
var currentQuestion=0;
var questionOrder=new Array;
var qbank=new Array;
var challenging = null
var onlyShowFlagged = false;

loadDB();
$("#cardArea").click(function(e){
	 console.log("toggled");
  if(cardState!=1){
   cardState=1;
   //togglePosition();
   $("#card1").animate({top: "-=400"}, 150, function() {});
   $("#card2").animate({top: "-=400"}, 150, function() {});
  }else{
	cardState=0;
	$("#card1").animate({top: "+=400"}, 150, function() {});
	$("#card2").animate({top: "+=400"}, 150, function() {});
  }//else
	  e.stopPropagation();
 });//click function

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  
  return null;
}

function setCookie(name, value){
	document.cookie = name+"="+value;
}

function isEnglish(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 31 && code < 127)){
      return false;
    }
  }
  return true;
};

function saveChallengeCookie(){
	jsonStr = JSON.stringify(challenging);
	setCookie('challenging', jsonStr);
}

function loadDB(){
 var chCookie = getCookie('challenging');
 var chCookieFound = false;
 if (chCookie != null){
	challenging = JSON.parse(chCookie);
	chCookieFound = true;
 }else
	challenging = new Array;
 $.getJSON("activity.json", function(data) {
  for(i=0;i<data.questionlist.length;i++){
   qbank[i]=[];
   qbank[i][0]=data.questionlist[i].cardfront.replace('\n','<br>');
   qbank[i][1]=data.questionlist[i].cardback.replace('\n','<br>');
   if ((!chCookieFound) || (challenging.length != data.questionlist.length))
	   challenging[i]=false;
   if (data.questionlist[i].hasOwnProperty('sound'))
	   qbank[i][2]=data.questionlist[i].sound;
   else
	   qbank[i][2]=null;
   questionOrder[i]=i
  }//for
  beginActivity();
 })//gtjson
}//loadDB

function beginActivity(){
 // Check only show flagged mode
 if (onlyShowFlagged && (challenging.indexOf(true)!=-1)){
	while(!challenging[questionOrder[currentQuestion]])
		currentQuestion = (currentQuestion + 1) % qbank.length;
 }
	
 cardState=0;
 var color1=colorArray[Math.floor(Math.random()*colorArray.length)];
 $("#cardArea").empty();
 $("#cardArea").append('<img id="flag" class="flag" src="flag.png"/>');
 
 $("#cardArea").append('<div id="card1" class="card"><div class="card-text-area"><div class="card-text'+ (isEnglish(qbank[questionOrder[currentQuestion]][0]) ? '' : '-arabic') +'">' + qbank[questionOrder[currentQuestion]][0] + '</div></div></div>');
 $("#cardArea").append('<div id="card2" class="card"><div class="card-text-area"><div class="card-text'+ (isEnglish(qbank[questionOrder[currentQuestion]][1]) ? '' : '-arabic') +'">' + qbank[questionOrder[currentQuestion]][1] + '</div></div></div>');
 $("#card1").css("background-color",color1);
 $("#card2").css("background-color","#34495E");
 $("#card2").css("top","400px");
 
 // Setup flag
 if (challenging[questionOrder[currentQuestion]])
	 $("#flag").css("opacity", "1")
 else
	 $("#flag").css("opacity", "0.2")
 $("#flag").click(function(e){
	challenging[questionOrder[currentQuestion-1]] = !challenging[questionOrder[currentQuestion-1]];
	if (challenging[questionOrder[currentQuestion-1]])
	 $("#flag").css("opacity", "1")
	else
	 $("#flag").css("opacity", "0.2")
	saveChallengeCookie();
	e.stopPropagation();
 })
 $("#flag").hover(function(){
	 $(this).css("opacity", "0.5")
 },function(){
	if (challenging[questionOrder[currentQuestion-1]])
	 $("#flag").css("opacity", "1")
	else
	 $("#flag").css("opacity", "0.2")
 })
 
 // Set audio
 var audio = null;
 if (qbank[questionOrder[currentQuestion]][2]!=null){
	 audio = new Audio(qbank[questionOrder[currentQuestion]][2]);
 }
 currentQuestion++;
 $("#buttonArea").empty();
 $("#buttonArea").append('<div id="nextButton" class="button">NEXT</div>');
 $("#buttonArea").append('<div id="shuffleButton" class="button">SHUFFLE</div>');
 $("#buttonArea").append('<div id="soundButton" class="button">PLAY SOUND</div>');
 $("#buttonArea").append('<div id="challengeToggle" class="button"></div>');
 $("#challengeToggle").html(onlyShowFlagged ? "SHOW ALL" : "ONLY SHOW FLAGGED");
 $("#nextButton").on("click",function(){
  if(currentQuestion<qbank.length){beginActivity();}
  else{
	  currentQuestion = 0;
	  beginActivity();
  }
 });//click function
 $("#shuffleButton").on("click", function(){
	 // Shuffle function
	 currentQuestion=0;
	 questionOrder.sort(() => Math.random() - 0.5)
	 beginActivity();
 })
 $("#soundButton").on("click", function(){
	 if (audio!=null){
		audio.play();
	 }
 })
 $("#challengeToggle").on("click", function(){
	onlyShowFlagged = !onlyShowFlagged;
	$("#challengeToggle").html(onlyShowFlagged ? "SHOW ALL" : "ONLY SHOW FLAGGED");
 })
}//beginactivity

});
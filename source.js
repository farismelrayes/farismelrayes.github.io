$(document).ready(function () {

var colorArray=["#019875","#1E8BC3","#D91E18","#D35400","#8E44AD","#C0392B"];
var cardState;
var currentQuestion=0;
var questionOrder=new Array;
var qbank=new Array;

loadDB();

function loadDB(){
 $.getJSON("activity.json", function(data) {
  for(i=0;i<data.questionlist.length;i++){
   qbank[i]=[];
   qbank[i][0]=data.questionlist[i].cardfront;
   qbank[i][1]=data.questionlist[i].cardback;
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
 cardState=0;
 var color1=colorArray[Math.floor(Math.random()*colorArray.length)];
 $("#cardArea").empty();
 $("#cardArea").append('<div id="card1" class="card"><div class="card-text">' + qbank[questionOrder[currentQuestion]][0] + '</div></div>');
 $("#cardArea").append('<div id="card2" class="card"><div class="card-text">' + qbank[questionOrder[currentQuestion]][1] + '</div></div>');
 $("#card1").css("background-color",color1);
 $("#card2").css("background-color","#34495E");
 $("#card2").css("top","200px");
 $("#cardArea").on("click",function(){
  if(cardState!=1){
   cardState=1;
   //togglePosition();
   $("#card1").animate({top: "-=200"}, 150, function() {cardState=0;togglePosition();});
   $("#card2").animate({top: "-=200"}, 150, function() {togglePosition2();});
  }//if
 });//click function
 // Set audio
 var audio = null;
 if (qbank[questionOrder[currentQuestion]][2]!=null){
	 audio = new Audio(qbank[questionOrder[currentQuestion]][2]);
 }
 currentQuestion++;
 $("#buttonArea").empty();
 $("#buttonArea").append('<div id="nextButton">NEXT</div>');
 $("#buttonArea").append('<div id="shuffleButton">SHUFFLE</div>');
 $("#buttonArea").append('<div id="soundButton">PLAY</div>');
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
}//beginactivity

function togglePosition(){
 if($("#card1").position().top==-200){$("#card1").css("top","200px");};
}//toggle

function togglePosition2(){
 if($("#card2").position().top==-200){$("#card2").css("top","200px");};
}//toggle2

});
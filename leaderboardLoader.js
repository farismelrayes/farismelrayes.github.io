let scores = [
    {name: "Player 1", score: 300},
    {name: "Player 2", score: 370},
    {name: "Player 3", score: 500},
    {name: "Player 4", score: 430},
    {name: "Player 5", score: 340},
    {name: "Player 6", score: 500},
];

function updateLeaderboardView() {
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";

    scores.sort(function(a, b){ return b.score - a.score  });
    let elements = []; // we'll need created elements to update colors later on
    // create elements for each player
    for(let i=0; i<scores.length; i++) {
        let name = document.createElement("div");
        let score = document.createElement("div");
        name.classList.add("name");
        score.classList.add("score");
        name.innerText = scores[i].name;
        score.innerText = scores[i].score;

        let scoreRow = document.createElement("div");
        scoreRow.classList.add("row");
        scoreRow.appendChild(name);
        scoreRow.appendChild(score);
        leaderboard.appendChild(scoreRow);

        elements.push(scoreRow);

    }

    let colors = ["gold", "silver", "#cd7f32"];
    for(let i=0; i < 3 && i < elements.length; i++) {
        elements[i].style.color = colors[i];
    }
}

function loadData(){
	$.getJSON('https://space-rps-scores-default-rtdb.firebaseio.com//.json', function(data) {
	  
	  console.log(data);
	  // Update scores array to match scores
	  scores = [];
	  
	  for (var i = 0; i < data.length; i++) {
		console.log(data[i]);
		//Do something
	  }
	  
	  // Update leaderboard view
	  updateLeaderboardView();
	});
}

console.log("starting load?");

loadData();

// Runs every 5 seconds
var intervalId = window.setInterval(function(){
	loadData();
}, 5000);


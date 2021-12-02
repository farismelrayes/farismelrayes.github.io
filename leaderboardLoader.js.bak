let scores = [
    {name: "test", score: 0, inprogress: 0}
];

let inProgressScores = [
	{name: "test", score: 0}
];

function updateLeaderboardView() {
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";

    scores.sort(function(a, b){ return (b.score + b.inprogress) - (a.score + a.inprogress)  });
    let elements = []; // we'll need created elements to update colors later on
    // create elements for each player
    for(let i=0; i<scores.length; i++) {
        let name = document.createElement("div");
        let score = document.createElement("div");
        name.classList.add("name");
        score.classList.add("score");
        name.innerText = scores[i].name;
		if (scores[i].inprogress == 0)
			score.innerText = scores[i].score;
		else
			score.innerText = scores[i].score+" (+"+scores[i].inprogress+")";
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
	  	  // Update scores array to match scores
	  scores = [];
	  inProgressScores = [];
	  for (var key in data) {
		if (data.hasOwnProperty(key)) {
			var difficulty = data[key]['difficulty'];
			
			// Update scores array
			var currentSongScores = {};
			for (var playerScores in data[key]['scores']){
				
				if (data[key]['scores'][playerScores]===0)
					continue;
				
				// Check if player's name is in scores array
				var name = data[key]['scores'][playerScores]['name'];
				currentSongScores.name = difficulty * data[key]['scores'][playerScores]['score'];
				var nameFound = false;
				for (var i = 0; i < scores.length; i++){
					var score = scores[i];
					if (score.name === name){
						nameFound = true;
						score.score += currentSongScores.name;
						break;
					}
				}
				
				// otherwise add it manually
				if (!nameFound){
					scores.push({name: name, score:currentSongScores.name, inprogress: 0});
				}
			}
			
			// Update in progress scores array
			for (var playerScores in data[key]['in-progress']){
				
				if (data[key]['scores'][playerScores]===0)
					continue;
				
				// Check if player's name is in scores array
				var name = data[key]['in-progress'][playerScores]['name'];
				var nameFound = false;
				var inprogressFinalScore = difficulty * data[key]['in-progress'][playerScores]['score'];
				if (name in currentSongScores)
					inprogressFinalScore = inprogressFinalScore - currentSongScores.name;
				inprogressFinalScore = Math.max(0, inprogressFinalScore);
				
				for (var i = 0; i < inProgressScores.length; i++){
					var score = inProgressScores[i];	
					if (score.name === name){
						nameFound = true;
						score.score += inprogressFinalScore;
						break;
					}
				}
				
				// otherwise add it manually
				if (!nameFound){
					inProgressScores.push({name: name, score:inprogressFinalScore});
				}
			}
						
		}
	  }
	  
		// Merge in-progress into scores
		for (let i = 0; i < inProgressScores.length; i++){
			// Try to find name in scores list and add to inprogress
			var nameFound = false;
			for (let j = 0; j < scores.length; j++){
				if (scores[j].name === inProgressScores[i].name){
					nameFound = true;
					scores[j].inprogress+= inProgressScores[i].score;
					break;
				}
			}
			
			// Otherwise, add a new user
			if (!nameFound){
				scores.push({name: inProgressScores[i].name, score:0, inprogress:inProgressScores[i].score});
			}
		}
	  
	  // Update leaderboard view
	  updateLeaderboardView();
	});
}

loadData();

// Runs every 5 seconds
var intervalId = window.setInterval(function(){
	loadData();
}, 5000);


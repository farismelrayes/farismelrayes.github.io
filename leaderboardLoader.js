import { getDatabase } from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyC5F7ocHqlyK0kq89-2Zjv0_vGTF7FOkhA",

  authDomain: "space-rps-scores.firebaseapp.com",

  databaseURL: "https://space-rps-scores-default-rtdb.firebaseio.com",

  projectId: "space-rps-scores",

  storageBucket: "space-rps-scores.appspot.com",

  messagingSenderId: "778814579402",

  appId: "1:778814579402:web:950e1ad557795b6e448a33",

  measurementId: "G-SCLJ8XPK0F"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// Get a reference to the database service
const database = getDatabase(app);


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
    for(let i=0; i < 3; i++) {
        elements[i].style.color = colors[i];
    }
}

updateLeaderboardView();
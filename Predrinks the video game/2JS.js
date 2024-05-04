let tipsyLevel = 0;
let drinksConsumed = 0;
let gotFood = false; // New flag to track if food was obtained

// New variable for random target tipsy level
let targetTipsyLevel;

const storyEl = document.getElementById("story");
const messageEl = document.getElementById("message");
const beerBtn = document.getElementById("beer-btn");
const shotBtn = document.getElementById("shot-btn");
const getFoodBtn = document.getElementById("get-food-btn"); // New button
const clubBtn = document.getElementById("club-btn");
const waterBtn = document.getElementById("water-btn"); // New button
const retryBtn = document.getElementById("retry-btn");
const saveGameDataBtn = document.getElementById("save-game-data-btn");


const messages = [
  "You take a sip, feeling the good vibes flow!",
  "That one hits the spot! You're definitely feeling more loose.",
  "Careful there, that might be a bit strong!",
  "Maybe some water next? You're getting a little wobbly.",
  "Looking good! You're almost ready to hit the dance floor."
];

const usernameInput = document.getElementById("username");
const submitNameBtn = document.getElementById("submit-name-btn");

beerBtn.disabled = true; // Initially disable all game buttons
shotBtn.disabled = true;
getFoodBtn.disabled = true;
waterBtn.disabled = true;
clubBtn.disabled = true;
retryBtn.disabled = true;
saveGameDataBtn.disabled = true;



submitNameBtn.addEventListener("click", function() {
  const username = usernameInput.value.trim();
  if (username) {
    startGame(username); // Call startGame function

    beerBtn.disabled = false; // Enable buttons after username entry
    shotBtn.disabled = false;
    getFoodBtn.disabled = false;
    waterBtn.disabled = false;
	
	
  } else {
    alert("Please enter a username!");
  }
});

function takeDrink(amount) {
    const randomMessage = Math.floor(Math.random() * messages.length);
    messageEl.textContent = messages[randomMessage].replace("%NAME%", username); // Replace "%NAME%" with username

    tipsyLevel += amount;
    drinksConsumed++;
    updateText();
	retryBtn.disabled = false;
 
    // Check if tipsyLevel reaches the target (feeling tipsy hint)
    if (tipsyLevel >= targetTipsyLevel - 2) {
      messageEl.textContent += " You're feeling it! Maybe slow down a bit.";
    }

    // Check win/lose conditions
    if (tipsyLevel > targetTipsyLevel) {
      messageEl.textContent = "Ugh, you overdid it! Looks like no club for you tonight.";
      beerBtn.disabled = true;
      shotBtn.disabled = true;
      getFoodBtn.disabled = true;
      waterBtn.disabled = true;
      clubBtn.disabled = true;
     } else if (tipsyLevel >= targetTipsyLevel && tipsyLevel <= 10) {
      // clubBtn.disabled = false; // Enable club button if in good tipsy range
     }

    // Random Events
    const randomEvent = Math.random();
    if (randomEvent < 0.2) { // 20% chance
      messageEl.textContent += " Your friend offers you a strong drink! (Tipsy Level +3)";
      tipsyLevel += 3;
    }
  }
  
function updateText() {
  storyEl.textContent = `You've had ${drinksConsumed} drink${drinksConsumed !== 1 ? 's' : ''}. Tipsy Level: ${tipsyLevel}`;
  messageEl.textContent = "";
  clubBtn.disabled = !(tipsyLevel >= targetTipsyLevel && tipsyLevel <= 10); // Enable club button only in good tipsy range
}

updateText();

beerBtn.addEventListener("click", function() {
  takeDrink(1);
});


shotBtn.addEventListener("click", function() {
  takeDrink(2);
});

getFoodBtn.addEventListener("click", function() {
  // Reduce tipsyness by 3 (ensure it doesn't go negative)
  tipsyLevel = Math.max(tipsyLevel - 3, 0);
  updateText();
  messageEl.textContent = "You head to Food4U, scarfing down some chips smothered in garlic mayo. Filling, but not exactly date-night breath-freshener. Maybe vampires won't mind...";
  getFoodBtn.disabled = true; // Disable the button after use
});

clubBtn.addEventListener("click", function() {
  messageEl.textContent = "You head to the club, feeling perfectly tipsy for a night of fun!";
  beerBtn.disabled = true;
  shotBtn.disabled = true;
  getFoodBtn.disabled = true; // Disable food button after club decision
  clubBtn.disabled = true;
  waterBtn.disabled = true;
  retryBtn.disabled = false;  // Disable water button after club decision
});

retryBtn.addEventListener("click", function() {
	messageEl.textContent = "You have clicked the retry button";
	clubBtn.disabled = true;
});

function downloadGameData(jsonData) {
  const blob = new Blob([jsonData], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'gameData.json';
  link.click();
}

function saveGameData(targetTipsyLevel) {
  const username = document.getElementById("username").textContent; // Get username
  const achievedTipsyLevel = tipsyLevel; // Assuming tipsyLevel reflects achieved level

  const gameData = {
    username: username,
    targetTipsyLevel: targetTipsyLevel,
    achievedTipsyLevel: achievedTipsyLevel,
  };

  const jsonData = JSON.stringify(gameData, null, 2)
  
    downloadGameData(jsonData);
	
	messageEl.textContent = "click the link to download game data"
 };

waterBtn.addEventListener("click", function() {
  drinksConsumed++; // Increment drinksConsumed but not tipsyLevel
  updateText();
  messageEl.textContent = "Feeling a bit dehydrated? Smart move, stay hydrated!";
});



function handleRetryClick() {
	console.log("Retry button clicked!");
	console.log("tipsyLevel reset to:", tipsyLevel);
	console.log("drinksConsumed reset to:", drinksConsumed);
  // Reset game variables
  tipsyLevel = null;
  drinksConsumed = null;
  gotFood = false; // Reset food flag
  targetTipsyLevel = null; // Reset target tipsy level

  // Reset button states
  beerBtn.disabled = true;
  shotBtn.disabled = true;
  getFoodBtn.disabled = true;
  clubBtn.disabled = true; 
  waterBtn.disabled = true;

  updateText(); // Update story and message elements
}
function startGame(username) {
  tipsyLevel = 0;
  drinksConsumed = 0;
  gotFood = false;
  targetTipsyLevel = Math.floor(Math.random() * (10 - 6 + 1)) + 5; // Generate random target tipsy level
  clubBtn.disabled = true;
  
  function downloadGameData(jsonData) {
  const blob = new Blob([jsonData], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'gameData.json';
  link.click();
	};
  

  function takeDrink(amount) {
    const randomMessage = Math.floor(Math.random() * messages.length);
    messageEl.textContent = messages[randomMessage].replace("%NAME%", username); // Replace "%NAME%" with username

    tipsyLevel += amount;
    drinksConsumed++;
    updateText();

    // Check if tipsyLevel reaches the target (feeling tipsy hint)
    if (tipsyLevel >= targetTipsyLevel - 2) {
      messageEl.textContent += " You're feeling it! Maybe slow down a bit.";
    }

    // Check win/lose conditions
    if (tipsyLevel > targetTipsyLevel) {
      messageEl.textContent = "Ugh, you overdid it! Looks like no club for you tonight.";
      beerBtn.disabled = true;
      shotBtn.disabled = true;
      getFoodBtn.disabled = true;
      waterBtn.disabled = true;
      clubBtn.disabled = true;
    } else if (tipsyLevel >= targetTipsyLevel && tipsyLevel <= 10) {
      clubBtn.disabled = false; // Enable club button if in good tipsy range
    }

    // Random Events
    const randomEvent = Math.random();
    if (randomEvent < 0.2) { // 20% chance
      messageEl.textContent += " Your friend offers you a strong drink! (Tipsy Level +3)";
      tipsyLevel += 3;
    }
  }

  function updateText() {
    storyEl.textContent = `You've had <span class="math-inline">\{drinksConsumed\} drink</span>{drinksConsumed !== 1 ? 's' : ''}. Tipsy Level: ${tipsyLevel}`;
    messageEl.textContent = "";
    clubBtn.disabled = !(tipsyLevel >= targetTipsyLevel && tipsyLevel <= 10); // Update club button state based on reset variables
  }

  // Track gameplay data for JSON output
  const gameData = {
    username: username,
    targetTipsyLevel: targetTipsyLevel,
    achievedTipsyLevel: null,
  }
   if (tipsyLevel > targetTipsyLevel) {
    gameData
   }
/*    saveGameData(targetTipsyLevel);
 */   
}
saveGameDataBtn.addEventListener("click", saveGameData);


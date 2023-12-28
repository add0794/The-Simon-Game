// Step 1: Check that JavaScript and jQuery are set up.

alert('jQuery is set up. You are ready to start the Simon Game!');

// Step 2: Start the game.

let started = false;
let level = 0; // Track your level.

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level); // Create the heading.
        nextSequence(); // Run the game.
        started = true; // Start the game.
    } 
})

// Step 3: Generate a new random color.

let colors = ['red', 'blue', 'green', 'yellow']; 

let gamePattern = []; // Keep a pattern of colors.

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4)
    let chosenColor = colors[randomNumber];

    gamePattern.push(chosenColor); // Add the new random to the pattern of colors.
   
    $(`#${chosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(chosenColor);

    // console.log(gamePattern); Optional: Log the array to the console
}

// Track the clicks and colors against the game pattern's.

let userClickedPattern = [];

$('.btn').click(function() {
    let colorClicked = $(this).attr('id');
    userClickedPattern.push(colorClicked);

    playSound(colorClicked);
    animatePress(colorClicked);
    
    checkAnswer(userClickedPattern.length - 1);
    currentLevel();
    
    // console.log(userClickedPattern); Optional: Log the array to the console
});

// Step 4: Test the clicked color against the random color.

let sum = 0;

function checkAnswer() {
    let currentLevel = userClickedPattern[userClickedPattern.length - 1];
    let lastColorGenerated = gamePattern[gamePattern.length - 1];
    sum = userClickedPattern.length;

    if (currentLevel === lastColorGenerated) {
        console.log(`Success! Keep going! The pattern is ${JSON.stringify(userClickedPattern)}`);
        console.log(`Your level so far is ${sum}`);
        // Check if the user completed the sequence
        if (sum === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log('Game over! Press any key to restart.');
        console.log(`You reached level ${sum}`);
        
        playSound('wrong');
        startOver();

        $('body').addClass('game-over'); // Add the "game-over" class
        setTimeout(function() {
            $('body').removeClass('game-over'); // Remove the "game-over" class after a short delay
        }, 1000);
    }
}

// Step 5: End the game when you click the wrong color.

function startOver() {
    $('.btn').click(function() {
        started = false;
        userClickedPattern = [];
        gamePattern = [];
        level = 0;
        sum = 0;
        $('#level-title').text('Game over! Press any key to start!');
    })
}

// Update the heading to the level you're at, especially when you're starting over.

function currentLevel() {
    level++;
    $('#level-title').text('Level ' + level);
}

// Add animation to when you *click* a color.

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass('pressed'); // Add the "pressed" class
    setTimeout(function() {
        $(`#${currentColor}`).removeClass('pressed'); // Remove the "pressed" class after a short delay
    }, 100);
}

// Add sound when you click or generate a color.

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`); // Add the sound, including when you're wrong.
    audio.play();
}


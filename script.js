//variables to track player's and computer's scores
let playerScore = 0;
let computerScore = 0;

//variables to contol Modal, that is used to show winner of the game and provide a new game button
let modal = document.getElementById("endGameModal");
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
//add single event for new game button in the modal
document.getElementById("new-game-btn").addEventListener("click", function(){ 
    //when clicked, restarts a game with reset score panel and closes modal
    modal.style.display = "none";
    newGame();
})

//assign event listener to each button extracted  by their class "btn" into an array
let buttonsArray = document.getElementsByClassName("btn");
for(let i = 0; i < buttonsArray.length; i++ )
{
    //save button's id to differentiate between player's choices
    let buttonId = buttonsArray[i].id;
    //when button is clicked, button's value is passed into the game function 
    buttonsArray[i].addEventListener("click", function(){ game(buttonId) });
}

//function to play the game by generating computer choice and comparing it to player's to get a score
function game(playerChoice)
{
    //check if end game is reached with 5 point score 
    if(playerScore == 5 || computerScore == 5)
    {
        //call game over function to diable buttons, announce winner and prompt for a new game
        gameOver();
    }
    //if end game wasn't reached, continue
    else{
        //get computer's choice 
        let computerChoice = getComputerChoice();
        //display player's and computer's choices as icons in the status panel
        displayChoices(playerChoice, computerChoice)
        //compare the two choices, update scores and print the status 
        evaluate(playerChoice, computerChoice);
        //display updated scores
        displayScores();
        //check if end game was reached
        if(playerScore == 5 || computerScore == 5)
        {
            //call game over function to diable buttons, announce winner and prompt for a new game
            gameOver();
        }
    }
}

//function to announce a winner and ask player if they what to start a new game
function gameOver()
{
    //add the won or lost status to modal
    if(playerScore == computerScore)
    {
        document.getElementById('win-status').innerHTML = "It's a tie!";
    }
    else if(playerScore == 5)
    {
        document.getElementById('win-status').innerHTML = "You Won!";
    }
    else{
        document.getElementById('win-status').innerHTML = "You Lost";
    }
    //open the modal to announce the winner
    modal.style.display = "block";
}

//function to start a new game by reseting score panel
function newGame(){
    //reset the score
    playerScore = 0;
    computerScore = 0;
    displayScores();
    //reset status
    updateStatus("Status");
    //clear the choice icons
    document.getElementById("player-choice").className = " ";
    document.getElementById("computer-choice").className = " ";
}

//funciton to display choice as an icon in the status panel
function displayChoices(playerChoice, computerChoice)
{
    //change the icon image depending on what aciton player/computer chose
    //add active in the class name to make an icon visible
    document.getElementById("player-choice").className = "fas fa-hand-" + playerChoice + " active";
    document.getElementById("computer-choice").className = "fas fa-hand-" + computerChoice + " active";
}

//function to display updated scores after the round's evaluation
function displayScores()
{
    //get computer and player score's by id and change them to updated global variables
    document.getElementById("player-score-id").innerHTML = "Player: " + playerScore;
    document.getElementById("computer-score-id").innerHTML = "Computer: " + computerScore;
}

//function to update status of the game
function updateStatus(statusString)
{
    document.getElementById("status-id").innerHTML = statusString;
}

//function makes a computer choice by generating a random number beteen 0 and 4
function getComputerChoice(){
    var choice = Math.floor(Math.random() * 5);
    //return corresponging string choice
    switch(choice)
    {
        case(0):
        return 'rock';
        break;
        case(1):
        return 'paper';
        break;
        case(2):
        return 'scissors';
        break;
        case(3): 
        return 'lizard';
        break;
        case(4): 
        return 'spock';
        break;
    }
}

//funciton that evaluates player's and computer's choices, updates scores and calls update status function
function evaluate(playerChoice, computerChoice)
{
    //check for a tie, otherwise compare two choices for a winner
    if(playerChoice == computerChoice)
    {
        updateStatus("It's a tie");
    }
    else
    {
        //first switch between player's choices, then between computer choices
        //send an appropriate string for status panel
        switch(playerChoice)
        {
            case('rock'):
                switch(computerChoice)
                {
                        case('paper'):
                        computerScore++;
                        updateStatus("Paper covers Rock");
                        break;
                        case('scissors'):
                        playerScore++;
                        updateStatus("Rock crushes Scissors");
                        break;
                        case('lizard'):
                        playerScore++;
                        updateStatus("Rock crushes Lizard");
                        break;
                        case('spock'):
                        computerScore++;
                        updateStatus("Spock vaporizes Rock");
                        break;
                }
                break;
            case('paper'):
                switch(computerChoice)
                    {
                        case('rock'): 
                        playerScore++;
                        updateStatus("Paper covers Rock");
                        break;
                        case('scissors'):
                        computerScore++;
                        updateStatus("Scissors cuts Paper");
                        break;
                        case('lizard'):
                        computerScore++;
                        updateStatus("Lizard eats Paper");
                        break;
                        case('spock'):
                        playerScore++;
                        updateStatus("Paper disproves Spock");
                        break;
                    }
                    break;
            case('scissors'):
                switch(computerChoice)
                {
                    case('rock'): 
                    computerScore++;
                    updateStatus("Rocks crushes Scissors");
                    break;
                    case('paper'):
                    playerScore++;
                    updateStatus("Scissors cuts Paper");
                    break;
                    case('lizard'):
                    playerScore++;
                    updateStatus("Scissors decapitates Lizard");
                    break;
                    case('spock'):
                    computerScore++;
                    updateStatus("Spock smashes Scissors");
                    break;
                }
                break;
            case('lizard'):
                switch(computerChoice)
                    {
                        case('rock'): 
                        computerScore++;
                        updateStatus("Rocks crushes Lizard");
                        break;
                        case('paper'):
                        playerScore++;
                        updateStatus("Lizard eats Paper");
                        break;
                        case('scissors'):
                        computerScore++;
                        updateStatus("Scissors decapitates Lizard");
                        break;
                        case('spock'):
                        playerScore++;
                        updateStatus("Lizard poisons Spock");
                        break;
                    }
                break;
            case('spock'):
                switch(computerChoice)
                    {
                        case('rock'): 
                        playerScore++;
                        updateStatus("Spock vaporizes Rock");
                        break;
                        case('paper'):
                        computerScore++;
                        updateStatus("Paper disproves Spock");
                        break;
                        case('scissors'):
                        playerScore++;
                        updateStatus("Spock smashes Scissors");
                        break;
                        case('lizard'):
                        computerScore++;
                        updateStatus("Lizard poisons Spock");
                        break;
                    }
            break;
        }
    }
}
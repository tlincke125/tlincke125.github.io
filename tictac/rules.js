

/*
 * The assignment states to not add a on reload to restart 
 * This is NOT a reload for restart -- refer to restart, I only
 * execute this function to propagate game_state
 */
var game_state = undefined;
window.onload = init_game_state;

function init_game_state() {

  game_state = {
    table_ids : ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"],
    board_state : [-1,-1,-1,-1,-1,-1,-1,-1,-1],
    turn  : 1,
    playing : false,
    player_id : "player_turn"
  }

  for(var i = 0; i < game_state.table_ids.length; ++i){
    document.getElementById(game_state.table_ids[i]).innerHTML = game_state.table_ids[i];
    document.getElementById(game_state.table_ids[i]).style.color="black";
  }

}


/*
 @Return boolean
 @Param _str - A string variable - Note the type is not checked in the implementation
 The methods @Returns true is the _str is null or it has a length of 0, otherwise, the methods returns false
*/
function isEmpty(_str) {
	return (!_str || 0 === _str.length);
}

/*
@Return int This return the turn variable. Please note that 
turn = 1 is for player_1 and 
turn = 0 is for player_2
@Param - No param
*/
function whose_move(){
	return game_state.turn;
}

/*
@Return void
@Param 
This methods toggles the 'turn' variable.
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	game_state.turn = !game_state.turn;
}

/*
@Return boolean
@Param 
The method returns the value of the 'started' flag.
true means the game has started
false means the game has not started
When the game has not started the flag is set to false. As soon as the game starts the flag must be set to true.
Once the game has finished or user has clicked on reset_play the flag must be set to false.
*/
function game_started(){
	return game_state.playing;
}


/*
TODO - Rule 1
This is the first method you'll implement. This method is called when the Begin Play button is clicked.
The method should do all the validations as stated in rule 1.
1. Verify if the player names are empty or not. Raise an alert if they are empty.
2. If the field are empty don't start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
3. If all verification is successful, disable the name fields and update the player moves as shown in the image.
4. If all verification is successful, update the turn information on the page. (See the source code and image). And set the started flag to true.(this will help you track at any instant if the game is in start state or not.)
5. Once game has started, Handle multiple clicks on begin play.
*/

function begin_play(){
  init_game_state();
  if(game_state.playing) {
    alert("Error, you are already playing the game");
    return false;
  }

  var player1_handle = document.getElementById("player1_id");
  var player2_handle = document.getElementById("player2_id");


  if(isEmpty(player1_handle.value) || isEmpty(player2_handle)){
    alert("Error, please add a user name");
    return false;
  }

 
  // Added one more condition to
  // check if values are the same
  if(player1_handle.value == player2_handle.value) {
    alert("Please choose two seperate user names");
    return false;
  }

  // Add disabled to attributes
  player1_handle.disabled = true;
  player2_handle.disabled = true;

  // Add meta information on values
  player1_handle.value += " (X)";
  player2_handle.value += " (O)";
  
  // The new value to set
  var string = `Turn for: <b><p style=\"display:inline;\" 
        id=${game_state.player_id}>X</p></b>`

  document.getElementById("turn_info").innerHTML = string;

  // We are now playing the game
  game_state.playing = true;

  return true;
}

/*
TODO - Rule 2
This is the second method you'll implement. This method is called when the Reset Play button is clicked.
The method should do all the things as stated in rule 2.
1. The reset play button should reset the whole game.(At any time when reset is clicked - All the three text boxes should be cleared and Turn should be set to the default message.)
2. The text boxes for entering name should be enablled back.
3. The Tic Tac Toe Grid should be set to its default entries.
4. Clicking reset play again and again shall have the same effect.(or no effect when clicked multiple times)
Remember to set the strated flag as false

*/
function reset_play(){
  var player1_handle = document.getElementById("player1_id");
  var player2_handle = document.getElementById("player2_id");

  // Add disabled to attributes
  player1_handle.disabled = false;
  player2_handle.disabled = false;

  player1_handle.value = "";
  player2_handle.value = "";
  
  // This doesn't do anything important, just changes inner html
  if(!game_state.playing) {
    document.getElementById("turn_info").innerHTML = "Game has not begun";
  } else {
    document.getElementById("turn_info").innerHTML = "Game has been reset";
  }

  // init the game state
  init_game_state();
}


/**
* @brief Checks status of the game
*
* @return -1 if game is still playing, otherwise, return the player that won (1, 2)
*/
function check_game() {

  /*
   * Add up all the values in rows, diags etc and check if t
   * hey equal 3 * (value) or -3 * value (because -2 2)
   */
  
  var n = 3; // works for n dimensional
  var sum_row, sum_col, sum_diag = 0;


  for(var i = 0; i < n; ++i) {
    sum_row = 0;
    sum_col = 0;
    sum_diag_r = 0;
    sum_diag_l = 0;

    // Itterate within the same for loop - O(n) because we check each cell once
    for(var j = 0; j < n; ++j) {
      sum_row += game_state.board_state[i * n + j] == -1 ? 
        0 : game_state.board_state[i * n + j];

      sum_col += game_state.board_state[j * n + i] == -1 ?
        0 : game_state.board_state[j * n + i];

      if(i == 0)
        sum_diag_r += game_state.board_state[j * n + j] == -1 ?
          0 : game_state.board_state[j * n + j];
      if(i == (n - 1)){
        sum_diag_l += game_state.board_state[n - 1 + j * (n - 1)] == -1 ?
          0 : game_state.board_state[n - 1 + j * (n - 1)];
        console.log("here", sum_diag_r);
      }
    }
  
    // Handle each item, this isn't part of the logic, just a nice ending
    if(Math.abs(sum_row) == 6) {
      for(var q = 0; q < n; ++q)
        document.getElementById(game_state.table_ids[i * n + q]).style.color="red";
      return sum_row;
    }
    if(Math.abs(sum_col) == 6) {
      for(var q = 0; q < n; ++q)
        document.getElementById(game_state.table_ids[q * n + i]).style.color="red";
      return sum_col;
    }
    if(Math.abs(sum_diag_l) == 6) {
      for(var q = 0; q < n; ++q)
        document.getElementById(game_state.table_ids[n - 1 + q * (n - 1)]).style.color="red";
      return sum_diag_l;
    }
    if(Math.abs(sum_diag_r) == 6) {
      for(var q = 0; q < n; ++q)
        document.getElementById(game_state.table_ids[q * n + q]).style.color="red";
      return sum_diag_r;
    }
  }
  return 0;
}

/*
TODO - Rule 3
This is the last method you'll implement. This method is called everytime a move has been player( Play button was clicked).
The method should do all the things as stated in rule 2.
1. The moves should be validated can only be these ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
2. Invalid moves should be reported by an alert message.(You are encorraged to use Modal which you learned in HW1 - Usage is not mandatory.)
3. If the move is a valid move, the grid should be updated with the correct move (Player 1 is always - 'X', and Player 2 is always 'O' (This is not zero!)) - The turn information should also be updated
	Hint: Use the turn variable to figure out who is currently playing. Use to toggle method to change moves.
4. A move should always be a valid move. (Example: If say a move was made in already filled cell, it should be invalidated with an alert.)
5. If the game has not started, clicking on <b>Play</b> should give an alert "The game has not started."<br/>
6. After any move, the state of the table should be validated.(see the document attached in the homework) 
   If the there is winner - Show it in an alert message - (Ex - Winner is X or O) - Displaying name is not important. <br/>
7. The game should reset itself once a winner is determined.<br/>
8. After all the moves have exhausted, you're not required to display any message. (It should be obvious to Reset play.)<br/>

*/
function play() {
  if(!game_state.playing){
    alert("Not playing the game yet");
    return false;
  }

  var move_handle = document.getElementById("move_text_id");

  if(!game_state.table_ids.includes(move_handle.value)) {
    alert("Invalid move");
    return false;
  }

  var index = game_state.table_ids.indexOf(move_handle.value);

  // Should never hit this
  // This might be a better check than
  // the ones above
  if(index == -1) {
    alert("Error? Not sure why though");
    return false;
  }

  if(game_state.board_state[index] != -1) {
    alert("Error, that move has already been used");
    return false;
  }

  game_state.board_state[index] = game_state.turn == 1 ? -2 : 2;

  document.getElementById(move_handle.value).innerHTML = 
    (game_state.turn == 1 ? "X" : "O");

  document.getElementById(game_state.player_id).innerHTML = (game_state.turn == 1 ? "O" : "X");

  var res = check_game();

  if(res == -6) {
    alert("X Wins");
    reset_play();
  }
  else if(res == 6) {
    alert("Y Wins");
    reset_play();
  }

  game_state.turn = !game_state.turn;
}

/*
Do not change this method.
*/
function moveEnter(event) {		
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}

}

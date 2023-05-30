// Megan M Boyer - CSC256 Checkers Game - 5/23/2023

// Declare a variable to represent the board. A multidimensional array will structure the board.
let board = [
    /* A checkers board is 8x8 - so we need to cover 8 spaces total accross in each array, then make 8 arrays total for the columns.
    In this case, null means no checkers piece is present, 'i' means that there is a checker on the space. */
    [null, 'i', null, 'i', null, 'i', null, 'i'],
    // pieces need to be staggered, so null has been moved to the end in some arrays.
    ['i', null, 'i', null, 'i', null, 'i', null],
    [null, 'i', null, 'i', null, 'i', null, 'i'],
    // This row has 0 pieces.
    [null, null, null, null, null, null, null, null],
    // This row has 0 pieces.
    [null, null, null, null, null, null, null, null],
    // Other player's rows - 'x' is used instead of 'i' so that we may differentiate the colors of each player later.
    ['x', null, 'x', null, 'x', null, 'x', null],
    [null, 'x', null, 'x', null, 'x', null, 'x'],
    ['x', null, 'x', null, 'x', null, 'x', null]
]

// Queryselector gets the element specified by either its class, ID, or other means of assignment. Getelementbyid only allows you to select the element by ID.
let selectedValueelement = document.querySelector('#selectedSquare');

function createBoard(){
    /* Declare a variable called 'theBoard'.
    document.createElement alows us to create an element in the HTML using JS.
    Below, we use it to create a new div element. */
let theBoard = document.createElement('div');
// Method to give the new div element created above an id - here we set it to 'checkersBoard'.
theBoard.id = 'checkersBoard';
/* Using JS, find the body tag in the HTML and add a child attachment/supplement, which is 'theBoard' in this case.
So, we have added a div with id 'checkersBoard' to the body of the HTML. */
document.body.appendChild(theBoard)

/* Create a for loop to iterate over the array and fill the board.
set row = 0, if row < array length, increment row. */
for(let row = 0; row < board.length; row++){
// Create another, nested for loop to fill the array columns.
for(col = 0; col < board.length; col++){
    // Create squares for board by using the document.createElement to create a div every time 'col' is incremented.
    let square = document.createElement('div');
    // Give these new div elements a class called 'square' so that we may style them later in CSS.
    square.classList.add('square');
    // Give each square for both row and column a unique id.
    square.setAttribute('id', 'div' + row + col);

    /* Now we must determine which square will be dark, and which will be light colored.
    To do this, we can use a conditional statement and the modulus operator to say:
    If there is a remainder of 1, add a class called 'bg'. - we will use this class for styling later. */
        if((row + col) % 2 == 1){
        square.classList.add('bg');
        /* If the square has a remander of one (as specified in the conditional statement), 
        add an event listener so that when a square is clicked on, the movepiece() function is called. */
        square.addEventListener('click', movepiece);
    }

    // Add else if statement to add a class to squares without pieces for styling.
    else {
        square.classList.add('bg2');
    }

    // Add a child element (square - our div created earlier) to our div we created called 'theBoard'.
    theBoard.appendChild(square);

    // If there is a piece present (will ignore null values in arrays), 
    if(board[row][col]){
        // Places a piece on the board if that place needs one.
        createpiece('piece' + row + col, 'checker-' + board[row][col], square);
    }
        }
    }
}

// Declare function to move a checkers piece - takes arguments 'id', 'pieceClass', and 'theSquare'.
function createpiece(id, pieceClass, theSquare){
    // Declare a variable called 'newpiece' and set it equal to a newly created div element.
    let newpiece = document.createElement('div');
    // Give the newpiece div an attribute.
    newpiece.setAttribute('id', id);
    // Add class to new piece - will be used to style the checker pieces later.
    newpiece.classList.add('checker');
    // Pass in the 'pieceClass' class so that we get pieces of differing color.
    newpiece.classList.add(pieceClass);
    // Add an event listener.
    newpiece.addEventListener('click', getPlayerPieces);
    // Add a newpiece div to the parent 'theSquare' div. 
    theSquare.appendChild(newpiece);
}

// Declare function to move a piece if there is an event - takes argument 'event'.
function movepiece(event){
    // Will give us the id of the target that was clicked and write it to the console.
    console.log('Target Square Selected=' + event.target.id);
    // Declare a new variable called 'newSquareId' and set it equal to the event target id. 
    let newSquareId = event.target.id;
    // Replace the selected square's id and replace it with a blank id. - Get rid of the 'piece' id.
    newSquareId = newSquareId.replace('piece', '');
    // Replace the selected square's id and replace it with a blank id. - Get rid of the 'div' id.
    newSquareId = newSquareId.replace('div', '');
    // Move the piece from one location to another.
    let selectedPieceId = selectedValueelement.dataset.value;
    // Ensure that a different square was selected to move the piece to.
    if(selectedPieceId != newSquareId){
        // Declare a variable called 'oldSquare' and set it equal to the value of the square's position and the id of the square 'div'.
        let oldSquare = document.getElementById('div' + selectedPieceId);
        // Declare a new variable called 'oldPiece' and set it equal to the value of the piece's position and the id of the piece 'piece'.
        let oldPiece = document.getElementById('piece' + selectedPieceId);
        // Get whether the piece is one color or another for when you create a new piece.
        let pieceClass = oldPiece.classList[1];
        // Remove the piece from the square it was originally on.
        oldSquare.removeChild(oldPiece);
        // Specify where we want to move the new piece to.
        let newSquare = document.getElementById('div' + newSquareId);
        // Create a new piece by calling the createPiece function and pasing arguments.
        createpiece('piece' + newSquareId, pieceClass, newSquare);
    }
}

// Declare function to get player pieces.
function getPlayerPieces(event){
    // Will give us the id of the square that was clicked and write it to the console.
    console.log('Square Selected=' + event.target.id);
    // Declare a new variable called 'selectedPieceId' and set it equal to event.taget.id - or which piece was clicked according to the id.
    let selectedPieceId = event.target.id; 
    // Replace the selected piece's id and replace it with a blank id. - Get rid of the 'piece' id.
    selectedPieceId = selectedPieceId.replace('piece', '');
    // Replace the selected piece's id and replace it with a blank id. - Get rid of the 'div' id.
    selectedPieceId = selectedPieceId.replace('div', '');
    // Store the value of the selected element in the selectedPieceId variable.
    selectedValueelement.dataset.value = selectedPieceId;

}

// any logic related to players
// use this to add an extra player later on
const Player = (name) => {

    let score = 0 
    let isPlayerTurn = false

    // const swapTurn = function(isPlayerTurn){
    //     return !isPlayerTurn
    // }

    return { name, score, isPlayerTurn } 


}
const title = document.querySelector(".title")
const player1 = Player("player1")
player1.mark = "X"
// player1.mark.style.color = "red"
player1.isPlayerTurn = true
let p1Score = 0

const player2 = Player("player2")
player2.mark = "O"

let p2Score = 0
let board = document.querySelector('.board')
let selection = ["","","","","","","","",""]

let win

let p1scoreBoard = document.getElementById("p1Score")
let p2scoreBoard = document.getElementById("p2Score")
const gameOverBTN = document.querySelector(".gameOver-btn")



// any logic related to the board or position of selections
const gameboard = (() =>{
    
    // loop through the game selection array and for each item, create a div with an inner html correpsonding to the value. give each item a class of selection append that div to the board
    const displayBoard = function() {
       
        for(let i=0; i <selection.length; i++) {
            let item = document.createElement("div")
            item.setAttribute('class', 'selection')
            item.setAttribute('id', i)
            item.addEventListener('click', function() {
                // check to see if that spot is already taken and if it is the players turn
                game.playerPicker()
                if(player1.isPlayerTurn && item.innerHTML === "") {
                    selection[item.id] = player1.mark
                    item.innerHTML = player1.mark
                    item.style.color = "red"
                    win = game.checkWin()
                    
                    if(win !== null && win !== "TIE") {
                        // title.innerHTML = "Player 1 Wins"
                        p1Score++
                        p1scoreBoard.innerHTML = p1Score
                        game.gameOver()
                    }
                    else if(win ==="TIE"){
                        // title.innerHTML = win
                        game.gameOver()
                    }
                    player1.isPlayerTurn = false
                    player2.isPlayerTurn = true
                    game.playerPicker()
                }
                else if(player2.isPlayerTurn && item.innerHTML === "") {
                    selection[item.id] = player2.mark
                    item.innerHTML = player2.mark
                    item.style.color = "blue"

                    win = game.checkWin()
                    if(win !== null && win !== "TIE") {
                        // title.innerHTML = "Player 2 Wins"
                        p2Score++
                        p2scoreBoard.innerHTML = p2Score
                        game.gameOver()
                    }
                    else if(win ==="TIE"){
                        // title.innerHTML = win
                        game.gameOver()

                    }
                    player2.isPlayerTurn = false
                    player1.isPlayerTurn = true
                    game.playerPicker()  
                }

            })
             board.append(item)
            }
            
            
            
    }
    

    return {displayBoard}


})()

gameboard.displayBoard()


// any logic related to the flow of the game
const game = (()=>{
    // one btn is red when its their turn. one is blue. otherwise black
    const p1btn = document.querySelector(".p1btn")
    p1btn.classList.add("p1curr")
    const p2btn = document.querySelector(".p2btn")

    // console.log(player1.isPlayerTurn)
    // console.log(player2.isPlayerTurn)
    
    const playerPicker = () => {
        if(player1.isPlayerTurn === true){
            p1btn.classList.add("p1curr")
        }
        else {
            p1btn.classList.remove("p1curr")
        }
        
        if(player2.isPlayerTurn === true){
            p2btn.classList.add("p2curr")
        }
        else{
            p2btn.classList.remove("p2curr")
        }
    };
    
    

    const checkWin = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let winner = null; 

        winConditions.forEach(function(combo, index){
            if(selection[combo[0]] && selection[combo[0]] === selection[combo[1]] && selection[combo[2]] === selection[combo[0]]) {
                winner = selection[combo[0]];
            }
        });

        if(winner) {
            return winner
        }
        else if (selection.includes("")) {
            return null
        }
        else {
            return "TIE"
        }
    };
    
    const gameOver = () => {
        
        const GOmessage = document.querySelector(".card")
        GOmessage.style.display = "flex"
        if(win === "X"){
            console.log("X wins");
            GOmessage.textContent = `GAME OVER. Player 1 Won!`

        }
        if(win === "O"){
            console.log("X wins");
            GOmessage.textContent = `GAME OVER. Player 2 Won!`

        }
        if(win === "TIE"){
            console.log("X wins");
            GOmessage.textContent = `GAME OVER. TIE`

        }
       
        selection = ["","","","","","","","",""]
        let squares = document.querySelectorAll(".selection")
        squares.forEach(square => {
            square.innerHTML = ""
        })
        gameOverBTN.addEventListener("click", function() {
            GOmessage.style.display = "none"
        })
        const GObtn = document.createElement("button")
        GObtn.textContent = "OK"
        GObtn.addEventListener("click", function(){
            GOmessage.style.display = "none"
        })
        GOmessage.appendChild(GObtn)
        
        title.innerHTML = "TIC TAC TOE"
        player1.isPlayerTurn = true
        player2.isPlayerTurn = false
    }
        
    return {playerPicker, checkWin, gameOver}


})()


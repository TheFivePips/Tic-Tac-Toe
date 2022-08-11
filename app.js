
// Player factory function
const Player = (name) => {

    let score = 0 
    let isPlayerTurn = false

    return { name, score, isPlayerTurn } 

}
// **********************************************************************************************************************************************************************

// These should be in a function somewhere to cleanup the global namespace but  a lot of refactoring needs to be done to make it work.
const player1 = Player("player1")
const player2 = Player("player2")
player1.mark = "X"
player2.mark = "O"

player1.isPlayerTurn = true

let p1Score = 0
let p2Score = 0

let win

let p1scoreBoard = document.getElementById("p1Score")
let p2scoreBoard = document.getElementById("p2Score")
const gameOverBTN = document.querySelector(".gameOver-btn")


let board = document.querySelector('.board')
let selection = ["","","","","","","","",""]

// **********************************************************************************************************************************************************************
const gameboard = (() =>{


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
                        p1Score++
                        p1scoreBoard.innerHTML = p1Score
                        game.gameOver()
                    }
                    else if(win ==="TIE"){
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
                        p2Score++
                        p2scoreBoard.innerHTML = p2Score
                        game.gameOver()
                    }
                    else if(win ==="TIE"){
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

// **********************************************************************************************************************************************************************

//logic related to the flow of the game
const game = (()=>{
    
    const p1btn = document.querySelector(".p1btn")
    p1btn.classList.add("p1curr")
    const p2btn = document.querySelector(".p2btn")

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
            GOmessage.textContent = `GAME OVER. Player 1 Won!`
        }
        if(win === "O"){
            GOmessage.textContent = `GAME OVER. Player 2 Won!`
        }
        if(win === "TIE"){
            GOmessage.textContent = `GAME OVER. TIE`
        }
        reset()
        gameOverBTN.addEventListener("click", function() {
            GOmessage.style.display = "none"
        })
        const GObtn = document.createElement("button")
        GObtn.textContent = "OK"
        GObtn.addEventListener("click", function(){
            GOmessage.style.display = "none"
        })
        GOmessage.appendChild(GObtn)
        
        
        player1.isPlayerTurn = true
        player2.isPlayerTurn = false
    }
    
    const reset = () => {
        selection = ["","","","","","","","",""]
        let squares = document.querySelectorAll(".selection")
        squares.forEach(square => {
            square.innerHTML = ""
        })
        player1.isPlayerTurn = true
        player2.isPlayerTurn = false
        playerPicker()
    }
    const resetBtn = document.getElementById("reset-btn")
    resetBtn.addEventListener("click", reset)


    return {playerPicker, checkWin, gameOver, reset}


})()

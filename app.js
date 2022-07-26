// any logic related to the board or position of selections
const gameboard = (() =>{
    const board = document.querySelector('.board')
    const selection = ["","","","","","","","","",]

    // loop through the game selection array and for each item, create a div with an inner html correpsonding to the value. give each item a class of selection append that div to the board
    const displayBoard = function() {
       
        for(let i=0; i <selection.length; i++) {
            let item = document.createElement("div")
            item.setAttribute('class', 'selection')
            item.setAttribute('id', i)
            item.addEventListener('click', function() {
                console.log("clicked")
                item.innerHTML = item.id
            })
             board.append(item)
            }
            
            
            
    }
    

    return {displayBoard}


})()

gameboard.displayBoard()


// any logic related to the flow of the game
const game = (()=>{

})()


// any logic related to players
// use this to add an extra player later on
const Player = (name) => {

    let score = 0 
    let isPlayerTurn = false

    return { name, score, isPlayerTurn } 


}



const player1 = Player(player1)
player1.mark = "X"
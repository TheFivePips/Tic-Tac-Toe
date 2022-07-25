const board = document.querySelector('.board')

const gameboard = (() =>{
    const selection = ['X','X','X','O','O','O','X','X','X']

    // loop through the game selection array and for each item, create a div with an inner html correpsonding to the value. give each item a class of selection append that div to the board
    const displayBoard = function() {
        selection.forEach(element => {
        console.log(element)
        let item = document.createElement("div")
        item.setAttribute('class', 'selection')
        item.innerHTML = element
        board.append(item)


        }
    )}

    return {displayBoard}


})()

gameboard.displayBoard()



// const game = {}

// const Player = {}
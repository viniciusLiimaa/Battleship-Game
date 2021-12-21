enum ShipName {
  Carrier = 'Carrier', 
  Battleship = 'Battleship', 
  Cruiser = 'Cruiser', 
  Submarine = 'Submarine', 
  Destroyer = 'Destroyer',
}


const shipFactory = (position: Array<string>, length: number, name: ShipName, isSunk=false) => {
  
  const shipStatus = {
    position: position,
    name: name,
    length: length,
    hits: [],
    isSunk: isSunk
  }

  const getHit = (hitLocation: string) => {
    for (let i=0; i < shipStatus.position.length;i++) {
      if (hitLocation == shipStatus.position[i]) {
        shipStatus.hits.push(hitLocation)
        isSunken()
        return true
      }
    };
  };

  const isSunken = () => {
    if (shipStatus.position.every(pos => shipStatus.hits.includes(pos))) {
      shipStatus.isSunk = true;
    }
  }
  
  return {shipStatus, getHit}

};


const gameBoardFactory = () => {

  const createBoard = (grid: number) => {
    // Create board DOM
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('grid-container')
    boardContainer.style.gridTemplateColumns = `repeat(${grid}, auto)`

    for (let i = 0; i < grid*grid; i++) {
      let boardSquare = document.createElement('div');
      boardSquare.classList.add('grid-child')
      boardContainer.appendChild(boardSquare)
      if ((i+1) % grid == 0) {
        boardSquare.style.backgroundColor = "red"
      }
    }

    // Create boardSquares coordinates
    const alphabet = []
    for (let i = 65; i < 65+grid; i++) {
      alphabet.push(String.fromCharCode(i))
    }

    let letterCordinate = 0;
    let numberCoordinate = 1;
    for (let i = 0;i < boardContainer.childElementCount; i++) {
      boardContainer.children[i].setAttribute('id', `${alphabet[letterCordinate]}${numberCoordinate}`)
      letterCordinate++
      if (letterCordinate > grid-1) {
        letterCordinate = 0;
        numberCoordinate++;
      }
      boardContainer.children[i].textContent = boardContainer.children[i].getAttribute('id')
      console.log(boardContainer.children[i].textContent)
    }
  
    document.querySelector('body').appendChild(boardContainer);

  }

  return {createBoard}



};

const newShip = shipFactory(["a1", "a2"], 5, ShipName.Destroyer)


gameBoardFactory().createBoard(10)









module.exports = {
  shipFactory
}
  
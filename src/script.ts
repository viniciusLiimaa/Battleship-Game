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



    const boardContainer = document.createElement('div');
    boardContainer.classList.add('grid-container')
    boardContainer.style.gridTemplateColumns = `repeat(${grid}, auto)`

    let i = 0;
    while (i < grid*grid) {
      let boardSquare = document.createElement('div');
      boardSquare.classList.add('grid-child')
      boardSquare.setAttribute('id', `${i}`)
      boardContainer.appendChild(boardSquare)
      if ((i+1) % grid == 0) {
        boardSquare.style.backgroundColor = "red"
        // Here needs to add the code to include the letters in the header
      }
      i++
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
  
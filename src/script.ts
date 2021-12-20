const shipFactory = (position: Array<string>, length: number, name: string, isSunk=false) => {
  
  const currentShip = {
    position: position,
    name: name,
    length: length,
    hits: [],
    isSunk: isSunk
  }

  const getHit = (hitLocation: string) => {
    for (let i=0; i < currentShip.position.length;i++) {
      if (hitLocation == currentShip.position[i]) {
        currentShip.hits.push(hitLocation)
        return true
      }
    };
    

  };
  
  return {currentShip, getHit}

};

const newShip = shipFactory(["a1", "a2"], 5, "destroyer")
console.log(newShip.getHit("a1"))


module.exports = {
  shipFactory
}
  
var shipFactory = function (position, length, name, isSunk) {
    if (isSunk === void 0) { isSunk = false; }
    var currentShip = {
        position: position,
        name: name,
        length: length,
        hits: [],
        isSunk: isSunk
    };
    var getHit = function (hitLocation) {
        for (var i = 0; i < currentShip.position.length; i++) {
            if (hitLocation == currentShip.position[i]) {
                currentShip.hits.push(hitLocation);
                return true;
            }
        }
        ;
    };
    return { currentShip: currentShip, getHit: getHit };
};
var newShip = shipFactory(["a1", "a2"], 5, "destroyer");
console.log(newShip.getHit("a1"));
module.exports = {
    shipFactory: shipFactory
};

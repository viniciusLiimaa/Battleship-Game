var ShipName;
(function (ShipName) {
    ShipName["Carrier"] = "Carrier";
    ShipName["Battleship"] = "Battleship";
    ShipName["Cruiser"] = "Cruiser";
    ShipName["Submarine"] = "Submarine";
    ShipName["Destroyer"] = "Destroyer";
})(ShipName || (ShipName = {}));
var shipFactory = function (position, length, name, isSunk) {
    if (isSunk === void 0) { isSunk = false; }
    var shipStatus = {
        position: position,
        name: name,
        length: length,
        hits: [],
        isSunk: isSunk
    };
    var getHit = function (hitLocation) {
        for (var i = 0; i < shipStatus.position.length; i++) {
            if (hitLocation == shipStatus.position[i]) {
                shipStatus.hits.push(hitLocation);
                isSunken();
                return true;
            }
        }
        ;
    };
    var isSunken = function () {
        if (shipStatus.position.every(function (pos) { return shipStatus.hits.includes(pos); })) {
            shipStatus.isSunk = true;
        }
    };
    return { shipStatus: shipStatus, getHit: getHit };
};
var gameBoardFactory = function () {
    var createBoard = function (grid) {
        var boardContainer = document.createElement('div');
        boardContainer.classList.add('grid-container');
        boardContainer.style.gridTemplateColumns = "repeat(".concat(grid, ", auto)");
        var i = 0;
        while (i < grid * grid) {
            var boardSquare = document.createElement('div');
            boardSquare.classList.add('grid-child');
            boardSquare.setAttribute('id', "".concat(i));
            boardContainer.appendChild(boardSquare);
            if ((i + 1) % grid == 0) {
                boardSquare.style.backgroundColor = "red";
                // Here needs to add the code to include the letters in the header
            }
            i++;
        }
        document.querySelector('body').appendChild(boardContainer);
    };
    return { createBoard: createBoard };
};
var newShip = shipFactory(["a1", "a2"], 5, ShipName.Destroyer);
gameBoardFactory().createBoard(10);
module.exports = {
    shipFactory: shipFactory
};

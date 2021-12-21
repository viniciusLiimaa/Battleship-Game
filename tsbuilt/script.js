var ShipName;
(function (ShipName) {
    ShipName["Carrier"] = "Carrier";
    ShipName["Battleship"] = "Battleship";
    ShipName["Cruiser"] = "Cruiser";
    ShipName["Submarine"] = "Submarine";
    ShipName["Destroyer"] = "Destroyer";
})(ShipName || (ShipName = {}));
var shipStorage = (function () {
    var shipList = [];
    return { shipList: shipList };
})();
var shipFactory = function (position, name, isSunk) {
    if (isSunk === void 0) { isSunk = false; }
    var shipStatus = {
        position: position,
        name: name,
        length: position.length,
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
        // Create board DOM
        var boardContainer = document.createElement('div');
        boardContainer.classList.add('grid-container');
        boardContainer.style.gridTemplateColumns = "repeat(".concat(grid, ", auto)");
        for (var i = 0; i < grid * grid; i++) {
            var boardSquare = document.createElement('div');
            boardSquare.classList.add('grid-child');
            boardContainer.appendChild(boardSquare);
        }
        // Create boardSquares coordinates
        var alphabet = [];
        for (var i = 65; i < 65 + grid; i++) {
            alphabet.push(String.fromCharCode(i));
        }
        var letterCordinate = 0;
        var numberCoordinate = 1;
        for (var i = 0; i < boardContainer.childElementCount; i++) {
            boardContainer.children[i].setAttribute('id', "".concat(alphabet[letterCordinate]).concat(numberCoordinate));
            letterCordinate++;
            if (letterCordinate > grid - 1) {
                letterCordinate = 0;
                numberCoordinate++;
            }
            boardContainer.children[i].textContent = boardContainer.children[i].getAttribute('id');
        }
        document.querySelector('body').appendChild(boardContainer);
    };
    var placeShip = function (position, name, isSunk) {
        if (isSunk === void 0) { isSunk = false; }
        var newShip = shipFactory(position, name);
        shipStorage.shipList.push(newShip);
        position.forEach(function (pos) {
            document.getElementById(pos).setAttribute('data-has-ship', "true");
            document.getElementById(pos).style.backgroundColor = ' #3333ff';
        });
    };
    return { createBoard: createBoard, placeShip: placeShip };
};
var newShip = shipFactory(["a1", "a2"], ShipName.Destroyer);
gameBoardFactory().createBoard(10);
gameBoardFactory().placeShip(["A1", "A2", "A3"], ShipName.Destroyer);
gameBoardFactory().placeShip(["J5", "J6", "J7", "J8", "J9"], ShipName.Cruiser);
gameBoardFactory().placeShip(["D3", "E3", "F3"], ShipName.Carrier);
console.log(shipStorage.shipList);
module.exports = {
    shipFactory: shipFactory
};

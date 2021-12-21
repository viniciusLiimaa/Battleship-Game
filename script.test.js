const myFunctions = require('./src/script');

test('hit location to equal one of the positions of the ship', () => {
  const testShip = myFunctions.shipFactory(["a1", "a2"], 5, "destroyer")
  expect(testShip.getHit("a1")).toBe(true)
});

test('ship should be sunken after being hit in every position', () => {
  const testShip = myFunctions.shipFactory(["a1", "a2"], 5, "destroyer")
  testShip.getHit("a1")
  testShip.getHit("a2")
  expect(testShip.shipStatus.isSunk).toBe(true)
})


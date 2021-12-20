const myFunctions = require('./src/script');

test('hit location to equal the position of the ship', () => {
  const testShip = myFunctions.shipFactory(["a1", "a2"], 5, "destroyer")

  expect(testShip.getHit("a1")).toBe(true)

});


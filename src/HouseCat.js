import felid from './Felid.js'


class HouseCat {
  constructor(name, favoriteFood, ownerName) {
    this.name = name;
    this.favoriteFood = favoriteFood;
    this.ownerName = ownerName;
}
};

HouseCat.prototype = Object.create(Felid.prototype);
HouseCat.prototype.constructor = HouseCat;

HouseCat.prototype.huntForFood = function() {
  return 'Goes to kitchen, knocks over bowl containing ' + this.favoriteFood + ' and eats it from the floor';
};

HouseCat.prototype.showAffectionToOwner = function() {
  return 'Brings dead mouse to ' + this.ownerName;
};

module.exports = HouseCat;

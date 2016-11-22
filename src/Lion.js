var Felid = require('./Felid');

var Lion = function(name, favoriteFood) {
  Felid.call(this, name, favoriteFood);
  this.cubs = [];
};

Lion.prototype = Object.create(Felid.prototype);
Lion.prototype.constructor = Lion;

Lion.prototype.huntForFood = function(nameOfCub) {
  return 'Goes over to the ' + this.favoriteFood + ' killed by the lionesses and eats it';
};

Lion.prototype.procreate = function(nameOfCub) {
  var newCub = new Lion(nameOfCub, this.favoriteFood);
  this.cubs.push(newCub);
  return 'Nants ingonyama bagithi Baba\nSithi uhm ingonyama\n' + newCub.name + ' is hoisted at the top of Pride Rock';
};

Lion.prototype.namesOfCubs = function() {
  var namesOfCubs;
  if (this.cubs.length === 0) {
    namesOfCubs = this.name + ' has no cubs!';
  } else if (this.cubs.length === 1) {
    namesOfCubs = this.cubs[0].name;
  } else {
    namesOfCubs = this.cubs.map(function(cub) {
      return cub.name;
    });
    namesOfCubs = namesOfCubs
      .slice(0, -1)
      .concat('and ' + namesOfCubs.slice(-1));
    namesOfCubs = namesOfCubs.join(', ');
  }

  return namesOfCubs;
};

module.exports = Lion;

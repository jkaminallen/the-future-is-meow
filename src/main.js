var Felid = require('./Felid');
var HouseCat = require('./HouseCat');
var Lion = require('./Lion');

// Code ensuring Felid is working
var jaxsonDeVille = new Felid('JaxsonDeVille', 'See-food');

if (jaxsonDeVille.name !== 'JaxsonDeVille') {
  console.error('Felid.name is broken');
}

if (jaxsonDeVille.favoriteFood !== 'See-food') {
  console.error('Felid.favoriteFood is broken');
}

if (jaxsonDeVille.groom() !== 'Licks its coat') {
  console.error('Felid.prototype.groom is broken');
}

// Code ensuring HouseCat is working
var garfield = new HouseCat('Garfield', 'lasagna', 'Jon');

if (garfield.name !== 'Garfield') {
  console.error('HouseCat.name is broken');
}

if (garfield.favoriteFood !== 'lasagna') {
  console.error('HouseCat.favoriteFood is broken');
}

if (garfield.ownerName !== 'Jon') {
  console.error('HouseCat.ownerName is broken');
}

if (garfield.groom() !== 'Licks its coat') {
  console.error('HouseCat.prototype.groom is broken');
}

if (garfield.huntForFood() !== 'Goes to kitchen, knocks over bowl containing lasagna and eats it from the floor') {
  console.error('HouseCat.prototype.huntForFood is broken');
}

if (garfield.showAffectionToOwner() !== 'Brings dead mouse to Jon') {
  console.error('HouseCat.prototype.showAffetionToOwner is broken');
}

// Code ensuring Lion is working
var mufasa = new Lion('Mufasa', 'antelope');

if (mufasa.name !== 'Mufasa') {
  console.error('Lion.name is broken');
}

if (mufasa.favoriteFood !== 'antelope') {
  console.error('Lion.favoriteFood is broken');
}

if (!Array.isArray(mufasa.cubs)) {
  console.error('Lion.cubs is broken');
}

if (mufasa.cubs.length !== 0) {
  console.error('Lion.cubs is broken');
}

if (mufasa.groom() !== 'Licks its coat') {
  console.error('Lion.prototype.groom is broken');
}

if (mufasa.huntForFood() !== 'Goes over to the antelope killed by the lionesses and eats it') {
  console.error('Lion.prototype.huntForFood is broken');
}

if (mufasa.namesOfCubs() !== 'Mufasa has no cubs!') {
  console.error('Lion.prototype.namesOfCubs is broken');
}

if (mufasa.procreate('Simba') !== 'Nants ingonyama bagithi Baba\nSithi uhm ingonyama\nSimba is hoisted at the top of Pride Rock') {
  console.error('Lion.prototype.procreate is broken');
}

var simba = mufasa.cubs[0];

if (simba.name !== 'Simba') {
  console.error('Lion.prototype.procreate is broken');
}

if (simba.favoriteFood !== 'antelope') {
  console.error('Lion.prototype.procreate is broken');
}

if (mufasa.namesOfCubs() !== 'Simba') {
  console.error('Lion.prototype.namesOfCubs is broken');
}

simba.procreate('Kiara');
simba.procreate('Kion');

if (simba.namesOfCubs() !== 'Kiara, and Kion') {
  console.error('Lion.prototype.namesOfCubs is broken');
}

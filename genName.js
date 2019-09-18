// "use strict";

const fs = require('fs');

const firstNames = require('./data/firstNames');
const lastNames = require('./data/lastNames');

getRandomFirstName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  return firstName;
};

getRandomLastName = () => {
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return lastName;
};

genFullName = () => {
  const firstName = getRandomFirstName();
  const lastName = getRandomLastName();
  const fullName = `${firstName} ${lastName}`;
  return fullName;
};

genFullNames = (num) => {
  let names = [];
  for (let i = 0; i < num; i++) {
    let fullName = genFullName();
    names.push(fullName);
  }
  console.log(names);
  fs.writeFileSync('teamPlayers', names);
};

// genFullName();
genFullNames(5);

module.exports = {
  genFullName,
  genFullNames,
};

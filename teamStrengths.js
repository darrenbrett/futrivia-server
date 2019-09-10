function getTeamStrength(team, min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

const Andessa = getTeamStrength("Andessa", 5, 8);
const Aventura = getTeamStrength("Aventura", 5, 8);
const Creighton = getTeamStrength("Creighton", 5, 8);
const Hawthorne = getTeamStrength("Aventura", 5, 8);
const Janders = getTeamStrength("Creighton", 5, 8);
const Larson = getTeamStrength("Aventura", 5, 8);
const Pieska = getTeamStrength("Pieska", 5, 8);
const Rosdon = getTeamStrength("Rosdon", 5, 8);
const Solston = getTeamStrength("Solston", 5, 8);
const Westingdon = getTeamStrength("Westingdon", 5, 8);
const Santiago = getTeamStrength("Sanviago", 5, 8);
const Argonia = getTeamStrength("Argonia", 5, 8);

let teamRatings = [{
    "Andessa": Andessa
  },
  {
    "Aventura": Aventura
  },
  {
    "Creighton": Creighton
  },
  {
    "Hawthorne": Hawthorne
  },
  {
    "Janders": Janders
  },
  {
    "Larson": Larson
  },
  {
    "Pieska": Pieska
  },
  {
    "Rosdon": Rosdon
  },
  {
    "Solston": Solston
  },
  {
    "Westingdon": Westingdon
  },
  {
    "Sanviago": Sanviago
  },
  {
    "Argonia": Argonia
  }
];

// let initialRatings = [...teamRatings];

// console.log('initialRatings: ', initialRatings);

console.log(teamRatings);

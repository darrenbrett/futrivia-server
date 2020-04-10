const queryHandler = require('./../utils/queryHandler');

const genFullName = async () => {
  let players;
  try {
    players = await queryHandler.find("players");
  } catch (error) {
    console.log(error);
  }

  for (let p of players) {
    if (p.name.first && p.name.last) {
      let id = p._id;
      let fullName = `${p.name.first} ${p.name.last}`;
      try {
        await queryHandler.findOneAndUpdate("players", {
          _id: id
        }, {
          $set: {
            fullName: fullName
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};

genFullName();

module.exports = genFullName;

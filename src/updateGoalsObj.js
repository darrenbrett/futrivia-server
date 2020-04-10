const queryHandler = require('./../utils/queryHandler');

const updateGoalsObj = async () => {
  let players;
  try {
    players = await queryHandler.find("players");
  } catch (error) {
    console.log(error);
  }

  for (let p of players) {
    if (!p.goals.year) {
      let id = p._id;
      try {
        await queryHandler.findOneAndUpdate("players", {
          _id: id
        }, {
          $set: {
            goals: {
              year: {
                2020: 0
              }
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};

updateGoalsObj();

module.exports = updateGoalsObj;

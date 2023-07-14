const playersData = require('../data/players.json');

module.exports = {
  getPlayersByTeam: (teamId) => playersData.filter(player => player.teamId === teamId),

  getTopScorersByTeam: (teamId) => {
    const players = playersData.filter(player => player.teamId === teamId);
    const maxScore = Math.max(...players.map(player => player.score));
    return players.filter(player => player.score === maxScore);
  },

  getTopWicketTakersByTeam: (teamId) => {
    const players = playersData.filter(player => player.teamId === teamId);
    const maxWickets = Math.max(...players.map(player => player.wickets));
    return players.filter(player => player.wickets === maxWickets);
  },
};

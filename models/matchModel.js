const matchesData = require('../data/matches.json');
const fs = require('fs');
const matchesDataPath = './data/matches.json';

module.exports = {
  getAllMatches: () => matchesData,

  getMatchById: (id) => matchesData.find(match => match.id === id),

  createMatch: (match) => {
    const newMatch = { id: matchesData.length + 1, ...match };
    matchesData.push(newMatch);
    return newMatch;
  },

  updateMatch: (id, updatedMatch) => {
    const matchIndex = matchesData.findIndex(match => match.id === id);
    if (matchIndex !== -1) {
      matchesData[matchIndex] = { id, ...updatedMatch };
      return matchesData[matchIndex];
    }
    return null;
  },

  deleteMatch: (id) => {
    const matchIndex = matchesData.findIndex(match => match.id === parseInt(id));
    if (matchIndex !== -1) {
      const deletedMatch = matchesData[matchIndex];
      matchesData.splice(matchIndex, 1);
      fs.writeFileSync(matchesDataPath, JSON.stringify(matchesData, null, 2));
      return deletedMatch;
    }
    return null;
  },

};

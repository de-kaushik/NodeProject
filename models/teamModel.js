const teamsData = require('../data/teams.json');

module.exports = {
  getAllTeams: () => teamsData,

  getTeamById: (id) => teamsData.find(team => team.id === id),

  createTeam: (team) => {
    const newTeam = { id: teamsData.length + 1, ...team };
    teamsData.push(newTeam);
    return newTeam;
  },

  updateTeam: (id, updatedTeam) => {
    const teamIndex = teamsData.findIndex(team => team.id === id);
    if (teamIndex !== -1) {
      teamsData[teamIndex] = { id, ...updatedTeam };
      return teamsData[teamIndex];
    }
    return null;
  },

  deleteTeam: (id) => {
    const teamIndex = teamsData.findIndex(team => team.id === id);
    if (teamIndex !== -1) {
      const deletedTeam = teamsData[teamIndex];
      teamsData.splice(teamIndex, 1);
      return deletedTeam;
    }
    return null;
  },
};

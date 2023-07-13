const teamModel = require('../models/teamModel');
// const playerModel = require('../models/playerModel');

module.exports = {
  getAllTeams: (req, res) => {
    const teams = teamModel.getAllTeams();
    res.json(teams);
  },

  getTeamById: (req, res) => {
    const teamId = parseInt(req.params.id);
    const team = teamModel.getTeamById(teamId);
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  },

  createTeam: (req, res) => {
    const newTeam = req.body;
    const createdTeam = teamModel.createTeam(newTeam);
    res.status(201).json(createdTeam);
  },

  updateTeam: (req, res) => {
    const teamId = parseInt(req.params.id);
    const updatedTeam = req.body;
    const team = teamModel.updateTeam(teamId, updatedTeam);
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  },

  deleteTeam: (req, res) => {
    const teamId = parseInt(req.params.id);
    const deletedTeam = teamModel.deleteTeam(teamId);
    if (deletedTeam) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  },

  // getTeamPlayers: (req, res) => {
  //   const teamId = parseInt(req.params.id);
  //   const players = playerModel.getPlayersByTeam(teamId);
  //   res.json(players);
  // },
};

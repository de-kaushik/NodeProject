const teamService = require('../services/teamService');
const playerService = require('../services/playerService');

module.exports = {
  getAllTeams: (req, res) => {
    const teams = teamService.getAllTeams();
    res.json(teams);
  },

  getTeamById: (req, res) => {
    const teamId = parseInt(req.params.id);
    const team = teamService.getTeamById(teamId);
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  },

  createTeam: (req, res) => {
    const newTeam = req.body;
    const createdTeam = teamService.createTeam(newTeam);
    res.status(201).json(createdTeam);
  },

  updateTeam: (req, res) => {
    const teamId = parseInt(req.params.id);
    const updatedTeam = req.body;
    const team = teamService.updateTeam(teamId, updatedTeam);
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  },

  deleteTeam: (req, res) => {
    const teamId = parseInt(req.params.id);
    const deletedTeam = teamService.deleteTeam(teamId);
    if (deletedTeam) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  },

  getTeamPlayers: (req, res) => {
    const teamId = parseInt(req.params.id);
    const players = playerService.getPlayersByTeam(teamId);
    res.json(players);
  },

  getTopScorersByTeam: (req, res) => {
    const teamId = parseInt(req.params.id);
    const topScorers = playerService.getTopScorersByTeam(teamId);
    res.json(topScorers);
  },

  getTopWicketTakersByTeam: (req, res) => {
    const teamId = parseInt(req.params.id);
    const topWicketTakers = playerService.getTopWicketTakersByTeam(teamId);
    res.json(topWicketTakers);
  },
};

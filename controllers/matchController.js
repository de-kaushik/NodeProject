const matchModel = require('../models/matchModel');
// const teamModel = require('../models/teamModel');
// const playerModel = require('../models/playerModel');

module.exports = {
  getAllMatches: (req, res) => {
    const matches = matchModel.getAllMatches();
    res.json(matches);
  },

  getMatchById: (req, res) => {
    const matchId = parseInt(req.params.id);
    const match = matchModel.getMatchById(matchId);
    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ error: 'Match not found' });
    }
  },

  createMatch: (req, res) => {
    const newMatch = req.body;
    const createdMatch = matchModel.createMatch(newMatch);
    res.status(201).json(createdMatch);
  },

  updateMatch: (req, res) => {
    const matchId = parseInt(req.params.id);
    const updatedMatch = req.body;
    const match = matchModel.updateMatch(matchId, updatedMatch);
    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ error: 'Match not found' });
    }
  },

  deleteMatch: (req, res) => {
    const matchId = parseInt(req.params.id);
    const deletedMatch = matchModel.deleteMatch(matchId);
    if (deletedMatch) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Match not found' });
    }
  },

  getMatchesByDate: (req, res) => {
    const requestedDate = req.params.date;
    const matchesOnDate = matchModel.getMatchesByDate(requestedDate);
    res.json(matchesOnDate);
  },

 };


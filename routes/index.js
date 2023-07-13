const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const teamController = require('../controllers/teamController');

router.get('/matches', matchController.getAllMatches);
router.get('/matches/:id', matchController.getMatchById);
router.post('/matches', matchController.createMatch);
router.put('/matches/:id', matchController.updateMatch);
router.delete('/matches/:id', matchController.deleteMatch);
router.get('/matches/date/:date', matchController.getMatchesByDate);

router.get('/teams', teamController.getAllTeams);
router.get('/teams/:id', teamController.getTeamById);
router.post('/teams', teamController.createTeam);
router.put('/teams/:id', teamController.updateTeam);
router.delete('/teams/:id', teamController.deleteTeam);
router.get('/teams/:id/players', teamController.getTeamPlayers);
router.get('/teams/:id/topscorers', teamController.getTopScorersByTeam);
router.get('/teams/:id/topwickettakers', teamController.getTopWicketTakersByTeam);
module.exports = router;
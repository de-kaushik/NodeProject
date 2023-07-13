const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchControler');
// const teamController = require('../controllers/teamController');

router.get('/matches', matchController.getAllMatches);
router.get('/matches/:id', matchController.getMatchById);
router.post('/matches', matchController.createMatch);
router.put('/matches/:id', matchController.updateMatch);
router.delete('/matches/:id', matchController.deleteMatch);
module.exports = router;
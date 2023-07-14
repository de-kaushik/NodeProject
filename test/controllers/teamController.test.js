const teamController = require('../../controllers/teamController');
const teamService = require('../../services/teamService');
const playerService = require('../../services/playerService');

jest.mock('../../services/teamService');
jest.mock('../../services/playerService');

describe('Team Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTeams', () => {
    it('should return all teams', () => {
      const mockTeams = [{ id: 1, name: 'Team A' }];
      teamService.getAllTeams.mockReturnValueOnce(mockTeams);

      const res = { json: jest.fn() };

      teamController.getAllTeams({}, res);

      expect(teamService.getAllTeams).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockTeams);
    });
  });

  describe('getTeamById', () => {
    it('should return the team with the specified id', () => {
      const mockTeam = { id: 1, name: 'Team A' };
      teamService.getTeamById.mockReturnValueOnce(mockTeam);

      const req = { params: { id: '1' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      teamController.getTeamById(req, res);

      expect(teamService.getTeamById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockTeam);
    });

    it('should return 404 if team not found', () => {
      teamService.getTeamById.mockReturnValueOnce(null);

      const req = { params: { id: '1' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      teamController.getTeamById(req, res);

      expect(teamService.getTeamById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Team not found' });
    });
  });

  describe('createTeam', () => {
    it('should create a new team', () => {
      const mockTeam = { id: 1, name: 'Team A' };
      teamService.createTeam.mockReturnValueOnce(mockTeam);

      const req = { body: { name: 'Team A' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      teamController.createTeam(req, res);

      expect(teamService.createTeam).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockTeam);
    });
  });

  describe('updateTeam', () => {
    it('should update the team with the specified id', () => {
      const mockTeam = { id: 1, name: 'Team A' };
      teamService.updateTeam.mockReturnValueOnce(mockTeam);

      const req = { params: { id: '1' }, body: { name: 'Team B' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      teamController.updateTeam(req, res);

      expect(teamService.updateTeam).toHaveBeenCalledWith(1, req.body);
      expect(res.json).toHaveBeenCalledWith(mockTeam);
    });

    it('should return 404 if team not found', () => {
      teamService.updateTeam.mockReturnValueOnce(null);

      const req = { params: { id: '1' }, body: { name: 'Team B' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      teamController.updateTeam(req, res);

      expect(teamService.updateTeam).toHaveBeenCalledWith(1, req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Team not found' });
    });
  });

  describe('deleteTeam', () => {
    it('should delete the team with the specified id', () => {
      const deletedTeam = { id: 1, name: 'Team A' };
      teamService.deleteTeam.mockReturnValueOnce(deletedTeam);

      const req = { params: { id: '1' } };
      const res = { sendStatus: jest.fn(), json: jest.fn(), status: jest.fn().mockReturnThis() };

      teamController.deleteTeam(req, res);

      expect(teamService.deleteTeam).toHaveBeenCalledWith(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it('should return 404 if team not found', () => {
      teamService.deleteTeam.mockReturnValueOnce(null);

      const req = { params: { id: '1' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      teamController.deleteTeam(req, res);

      expect(teamService.deleteTeam).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Team not found' });
    });
  });

  describe('getTeamPlayers', () => {
    it('should return players of the team with the specified id', () => {
      const mockPlayers = [{ id: 1, name: 'Player A' }];
      playerService.getPlayersByTeam.mockReturnValueOnce(mockPlayers);

      const req = { params: { id: '1' } };
      const res = { json: jest.fn() };

      teamController.getTeamPlayers(req, res);

      expect(playerService.getPlayersByTeam).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockPlayers);
    });
  });

  describe('getTopScorersByTeam', () => {
    it('should return top scorers of the team with the specified id', () => {
      const mockTopScorers = [{ id: 1, name: 'Player A', runs: 100 }];
      playerService.getTopScorersByTeam.mockReturnValueOnce(mockTopScorers);

      const req = { params: { id: '1' } };
      const res = { json: jest.fn() };

      teamController.getTopScorersByTeam(req, res);

      expect(playerService.getTopScorersByTeam).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockTopScorers);
    });
  });

  describe('getTopWicketTakersByTeam', () => {
    it('should return top wicket takers of the team with the specified id', () => {
      const mockTopWicketTakers = [{ id: 1, name: 'Player B', wickets: 10 }];
      playerService.getTopWicketTakersByTeam.mockReturnValueOnce(mockTopWicketTakers);

      const req = { params: { id: '1' } };
      const res = { json: jest.fn() };

      teamController.getTopWicketTakersByTeam(req, res);

      expect(playerService.getTopWicketTakersByTeam).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockTopWicketTakers);
    });
  });
});

const matchController = require('../../controllers/matchController');
const matchService = require('../../services/matchService');

jest.mock('../../services/matchService');

describe('Match Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllMatches', () => {
    it('should return all matches', () => {
      const mockMatches = [{ id: 1, team1: 'Team A', team2: 'Team B' }];
      matchService.getAllMatches.mockReturnValueOnce(mockMatches);

      const res = { json: jest.fn() };

      matchController.getAllMatches({}, res);

      expect(matchService.getAllMatches).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockMatches);
    });
  });

  describe('getMatchById', () => {
    it('should return the match with the specified id', () => {
      const mockMatch = { id: 1, team1: 'Team A', team2: 'Team B' };
      matchService.getMatchById.mockReturnValueOnce(mockMatch);

      const req = { params: { id: '1' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      matchController.getMatchById(req, res);

      expect(matchService.getMatchById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockMatch);
    });

    it('should return 404 if match not found', () => {
      matchService.getMatchById.mockReturnValueOnce(null);

      const req = { params: { id: '1' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      matchController.getMatchById(req, res);

      expect(matchService.getMatchById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Match not found' });
    });
  });

  describe('createMatch', () => {
    it('should create a new match', () => {
      const mockMatch = { id: 1, team1: 'Team A', team2: 'Team B' };
      matchService.createMatch.mockReturnValueOnce(mockMatch);
      matchService.generateId.mockReturnValueOnce(1);

      const req = { body: { team1: 'Team A', team2: 'Team B',date: '12-02-2023' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      matchController.createMatch(req, res);
      const req2= { body: { id: 1, team1: 'Team A', team2: 'Team B',date: '12-02-2023' } };


      expect(matchService.createMatch).toHaveBeenCalledWith(req2.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockMatch);
    });

    it('should return 400 if required fields are missing', () => {
      const req = { body: {} };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      matchController.createMatch(req, res);

      expect(matchService.createMatch).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields' });
    });

    it('should return 500 if an error occurs', () => {
      matchService.createMatch.mockImplementationOnce(() => {
        throw new Error('Some error');
      });
      matchService.generateId.mockReturnValueOnce(1);

      const req = { body: { team1: 'Team A', team2: 'Team B',date: '12-02-2023' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      matchController.createMatch(req, res);
      const req2 = { body: { id: 1, team1: 'Team A', team2: 'Team B',date: '12-02-2023' } };


      expect(matchService.createMatch).toHaveBeenCalledWith(req2.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('update match',()=>{
    it('should update a match', ()=>{
      const match = { id: 1, team1: 'Team A', team2: 'Team B',date: '12-02-2023' };
      matchService.updateMatch.mockReturnValueOnce(match);

      const req = { body: {id: 1, team1: 'Team A', team2: 'Team B',date: '12-02-2023' }, params: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      matchController.updateMatch(req, res);
        const req2= { body: { id: 1, team1: 'Team A', team2: 'Team B',date: '12-02-2023' } };

      expect(matchService.updateMatch).toHaveBeenCalledWith(req.params.id, req.body);
      expect(res.json).toHaveBeenCalledWith({match,msg:'updated successfully'});

    })

    it('should return 404 if match not found', () => {
      matchService.updateMatch.mockReturnValueOnce(null);
      const match = { id: 1, team1: 'Team A', team2: 'Team B',date: '12-02-2023' };

      const req = { params: { id: '1' },body: match };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      matchController.updateMatch(req, res);

      expect(matchService.updateMatch).toHaveBeenCalledWith(1,match);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Match not found' });
    });
  })

  describe('delete match',()=>{
    it('should delete a match', ()=>{
      const match = { id: 1, team1: 'Team A', team2: 'Team B',date: '12-02-2023' };
      matchService.deleteMatch.mockReturnValueOnce(match);

      const req = { params: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      matchController.deleteMatch(req, res);

      expect(matchService.deleteMatch).toHaveBeenCalledWith(req.params.id);
      expect(res.json).toHaveBeenCalledWith({msg:'deleted successfully'});

    })

    it('should return 404 if match not found', () => {
      matchService.deleteMatch.mockReturnValueOnce(null);

      const req = { params: { id: '1' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      matchController.deleteMatch(req, res);

      expect(matchService.deleteMatch).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Match not found' });
    });
  })

  describe('matches by date',()=>{
    it('should get matches by date', ()=>{
      const match = { id: 1, team1: 'Team A', team2: 'Team B',date: '02-02-2023' };
      matchService.getMatchesByDate.mockReturnValueOnce(match);

      const req = { params: { date: '02-02-2023' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      matchController.getMatchesByDate(req, res);

      expect(matchService.getMatchesByDate).toHaveBeenCalledWith(req.params.date);
      expect(res.json).toHaveBeenCalledWith(match);

    })
  })

});

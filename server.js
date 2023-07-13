const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.get('/matches', (req, res) => {
    const matches = [
      { id: 1, team1: 'Team A', team2: 'Team B', date: '2023-07-15' },
      { id: 2, team1: 'Team C', team2: 'Team D', date: '2023-07-16' }
    ];
  
    res.json(matches);
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
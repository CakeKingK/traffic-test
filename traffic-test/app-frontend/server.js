const express = require('express');
const os = require("os");
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.post('/api/login', (req, res) => {
  // DB connection and user authentication(JWT)
  res.json({ token: 'jwt-token-sample' });
});

app.listen(3000, () => {
  console.log('Express server running on port 3000');
});

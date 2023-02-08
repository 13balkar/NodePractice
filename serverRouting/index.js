const express = require('express');
const router = require('./src/Routes/taskRoutes');

const app = express();
const port = 3000;
app.use(express.json());
app.use('/tasks', router);
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Todo App',
    token: 'must pass token to access tasks in the header with key "token"'
  });
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
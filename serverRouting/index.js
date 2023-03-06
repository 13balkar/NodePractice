const express = require('express');
const router = require('./src/Routes/taskRoutes');
const { tokenValidator } = require('./src/middlewares/task.validator');
const app = express();
const port = 8080;
app.use(express.json());
var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.use(tokenValidator);
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
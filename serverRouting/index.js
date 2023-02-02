const express = require('express');
const router = require('./src/Routes/taskRoutes');

const app = express();
const port = 3000;
app.use(express.json());
app.use('/tasks', router);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
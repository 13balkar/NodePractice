const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = 4000;
dotenv.config();
const authRouter = require('./src/routes/authRouter');
app.use(express.json());
app.use('/', authRouter);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
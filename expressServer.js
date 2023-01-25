const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(process.env.PORT || 3000, ()=> {
  console.log('server started on port 3000');
});
app.get('/', (req,res) => {
  res.send('Welcome');
});

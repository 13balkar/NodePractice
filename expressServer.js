const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let tasks = [];
let counter = 1;
app.get('/tasks', (req, res) => {
  res.json(tasks);
});
app.post('/tasks', (req, res) => {
  let task = {
    'taskId': counter,
    'isComplete': false,
    'taskName':req.body.taskName 
  };
  counter+=1;
  tasks.push(task);
  res.status(201).json(task).end();
});
app.put('/tasks',(req,res)=>{
  let flag=0;
  tasks=tasks.map(task=>{
    if(task.taskId===parseInt(req.body.taskId) ){
      flag=1;
      return {
        'taskId': req.body.taskId,
        'isComplete':req.body.isComplete,
        'taskName':req.body.taskName
      };
    }else{
      return task;
    }
  });
  flag===1 ? res.status(201):res.status(404); 
});

app.listen(process.env.PORT || 3000, ()=> {
  console.log('server started on port 3000');
});
app.get('/', (req,res) => {
  res.send('Welcome');
});

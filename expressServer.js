const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let tasks = [];
let counter = 1;


app.route('/tasks')

  .get((req, res) => {
    res.status(200).json(tasks);
  })

  .post( (req, res) => {
    const task = {
      'taskId': counter,
      'isComplete': false,
      ...req.body 
    };
    counter+=1;
    tasks.push(task);
    res.status(201).json(task).end();
  })
  
  .put((req,res)=>{
    const index=tasks.findIndex(task=> task.taskId===parseInt(req.body.taskId));
    if(index===-1){
      res.status(404).send('Not Found');
    }else{
      tasks[index]={...req.body};
      res.status(200).json(tasks[index]);
    }
    
  })
  
  .delete((req,res)=>{
    tasks=tasks.filter(task=>{
      if(!task.isComplete){
        return task;
      }
    });
    res.status(200).json(tasks);
  });


app.get('/tasks/:code',(req,res)=>{
  let {code}=req.params;
  switch(code){
  case 'complete':{
    res.status(200).json(tasks.filter(task=> task.isComplete));
    break;
  }
  case 'incomplete':{
    res.status(200).json(tasks.filter(task=> task.isComplete===false));
    break;
  }
  default:{
    if(!isNaN(code)){
      const index=tasks.findIndex(task=> task.taskId===parseInt(code));
      if(index===-1){
        res.status(404).send('Not Found');
      }else{
        res.status(200).json(tasks[index]);
      }
    }else{
      res.status(400).send('Invalid Request');
    }
  }
  }
});

app.patch('/tasks/:id/:isComplete',(req,res)=>{
  const {id,isComplete}=req.params;
  const index=tasks.findIndex(task=> task.taskId===parseInt(id));
  if(index===-1){
    res.status(404).send('Not Found');
  }else{
    tasks[index].isComplete=isComplete;
    res.status(200).json(tasks[index]);
  }
});
    

app.listen(process.env.PORT || 3000, ()=> {
  console.log('server started on port 3000');
});
app.get('/', (req,res) => {
  res.send('Welcome');
});

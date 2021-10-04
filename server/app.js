const express = require('express');
app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbStorage = require('./dbStorage');
const {request} = require('express');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//            ---------------  DSA  --------------------
//create
app.post('/insertDSA', (request , response) => {
//   console.log("hii");
  const { question ,remark } = request.body;
  const db = dbStorage.getDbStorageInstance();
  const result=db.insertDSA(question,remark);

      result
      .then(data => response.json({ success : data}))
      .catch(err => console.log(err));
});
//read
app.get('/getDSA',(request,response)=>{
    // console.log('hi1');
   const db = dbStorage.getDbStorageInstance();
   const result=db.getDSA(); 
   result
   .then(data => response.json({ data : data}))
   .catch(err => console.log(err));
  //  console.log("hi4");
});

//update
//delete
app.delete('/deleteDSA',(request,response)=>{
  const { id } = request.body;
  const db = dbStorage.getDbStorageInstance();
   const result=db.deleteDSA(id); 

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
})

// ---------------------  CS ---------------------
//create
app.post('/insertCS', (request , response) => {
  // console.log("hii");
  const { question ,remark } = request.body;
  const db = dbStorage.getDbStorageInstance();
  const result=db.insertCS(question,remark);

      result
      .then(data => response.json({ success : data}))
      .catch(err => console.log(err));
});
//read
app.get('/getCS',(request,response)=>{
    // console.log('hi1');
   const db = dbStorage.getDbStorageInstance();
   const result=db.getCS(); 
   result
   .then(data => response.json({ data : data}))
   .catch(err => console.log(err));
  //  console.log("hi4");
});

//update
//delete
app.delete('/deleteCS',(request,response)=>{
  const { id } = request.body;
  const db = dbStorage.getDbStorageInstance();
   const result=db.deleteCS(id); 

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
})



// ---------------------  Task ---------------------
//create
app.post('/insertTask', (request , response) => {
  // console.log("hii");
  const { task } = request.body;
  const db = dbStorage.getDbStorageInstance();
  const result=db.insertTask(task);

      result
      .then(data => response.json({ success : data}))
      .catch(err => console.log(err));
});
//read
app.get('/getTask',(request,response)=>{
    // console.log('hi1');
   const db = dbStorage.getDbStorageInstance();
   const result=db.getTask(); 
   result
   .then(data => response.json({ data : data}))
   .catch(err => console.log(err));
  //  console.log("hi4");
});

//update
//delete
app.delete('/deleteTask',(request,response)=>{
  const { id } = request.body;
  const db = dbStorage.getDbStorageInstance();
   const result=db.deleteTask(id); 

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
})


app.listen(process.env.PORT,()=>{console.log("revise app is running")});

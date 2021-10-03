document.addEventListener('DOMContentLoaded',function(){
    getAll();
 });
 
 function getAll(){
     fetch('http://localhost:5000/getTask')
     .then(response => response.json())
     .then(data => loadAllData(data['data']));
 }
 
 function loadAllData(data){
     table=document.querySelector('#table-task tbody');
     // console.log(data);
     let tableData="";
     if(data.length === 0){
         tableData += "<tr>";
         tableData += "<td id='no-data' colspan='4'>No data</td>";
         tableData += "</tr>";
         table.innerHTML=tableData;
         return;
     }
     let count=1;
     data.forEach( function({id,date_added,task}) {
         tableData += "<tr>";
         tableData += `<td>${count}</td>`;
         tableData += `<td>${task}</td>`;
         tableData += `<td>${new Date(date_added).toLocaleString("hi-IN")}</td>`
         tableData += `<td><button class="delete-row-task" data-id='${id}'>delete</button></td>`;
         count++;
     });
     table.innerHTML=tableData;
 }
 
 const saveTaskBtn = document.querySelector('#save-task-btn');
  
 saveTaskBtn.onclick = function () {
     const task = document.querySelector('#task').value;
     document.querySelector('#task').value="";
 
     fetch('http://localhost:5000/insertTask', {
         headers: {
             'Content-type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify({ 
             task : task
         })
     })
     .then(response => response.json())
     .then(data => {
         // console.log(data.success);
         if(data.success){
             getAll();
         }
     });
 }
 
 document.querySelector('#table-task').addEventListener('click',function(event){
     if(event.target.className == "delete-row-task"){
         deleteRowById(event.target.dataset.id);
     }
 });
 
 function deleteRowById(id){
     fetch('http://localhost:5000/deleteTask', {
         headers: {
             'Content-type': 'application/json'
         },
         method: 'DELETE',
         body: JSON.stringify({ 
            id : id
         })
     })
     .then(response => response.json())
     .then(data => {
         // console.log(data.success);
         if(data.success){
             getAll();
         }
     });
 }
 
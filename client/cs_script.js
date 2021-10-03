document.addEventListener('DOMContentLoaded',function(){
    getAll();
 });
 
 function getAll(){
     fetch('http://localhost:5000/getCS')
     .then(response => response.json())
     .then(data => loadAllData(data['data']));
 }
 
 function loadAllData(data){
     table=document.querySelector('#table-cs tbody');
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
     data.forEach( function({id,question,remark}) {
         tableData += "<tr>";
         tableData += `<td>${count}</td>`;
         tableData += `<td>${question}</td>`;
         tableData += `<td>${remark}</td>`;
         tableData += `<td><button class="delete-row-cs" data-id='${id}'>delete</button></td>`;
         count++;
     });
     table.innerHTML=tableData;
 }
 
 const saveCsBtn = document.querySelector('#save-cs-btn');
  
 saveCsBtn.onclick = function () {
     const question = document.querySelector('#question-cs').value;
     const remark = document.querySelector('#remark-cs').value;
     document.querySelector('#question-cs').value="";
     document.querySelector('#remark-cs').value="";
 
     fetch('http://localhost:5000/insertCS', {
         headers: {
             'Content-type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify({ 
             question : question ,
             remark : remark
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
 
 document.querySelector('#table-cs').addEventListener('click',function(event){
     if(event.target.className == "delete-row-cs"){
         deleteRowById(event.target.dataset.id);
     }
 });
 
 function deleteRowById(id){
     fetch('http://localhost:5000/deleteCS', {
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
 
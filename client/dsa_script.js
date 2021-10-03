document.addEventListener('DOMContentLoaded',function(){
   getAll();
});

function getAll(){
    fetch('http://localhost:5000/getDSA')
    .then(response => response.json())
    .then(data => loadAllData(data['data']));
}

function loadAllData(data){
    table=document.querySelector('#table-dsa tbody');
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
        tableData += `<td><a href="${question}" target="_blank">${question}</a></td>`;
        tableData += `<td>${remark}</td>`;
        tableData += `<td><button class="delete-row-dsa" data-id='${id}'>delete</button></td>`;
        count++;
    });
    table.innerHTML=tableData;
}

const saveDsaBtn = document.querySelector('#save-dsa-btn');
 
saveDsaBtn.onclick = function () {
    const question = document.querySelector('#question-dsa').value;
    const remark = document.querySelector('#remark-dsa').value;
    document.querySelector('#question-dsa').value="";
    document.querySelector('#remark-dsa').value="";

    fetch('http://localhost:5000/insertDSA', {
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

document.querySelector('#table-dsa').addEventListener('click',function(event){
    if(event.target.className == "delete-row-dsa"){
        deleteRowById(event.target.dataset.id);
    }
});

function deleteRowById(id){
    fetch('http://localhost:5000/deleteDSA', {
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

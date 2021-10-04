const mysql = require('mysql');
const dotenv = require('dotenv');
const { connectionClass } = require('oracledb');
dotenv.config();

let dbInstance=null;

const connection = mysql.createConnection({
   host : process.env.HOST,
   user : process.env.USER,
   password : process.env.PASSWORD,
   database : process.env.DATABASE,
   port : process.env.DB_PORT
});

connection.connect((err)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log("db connected");
    }
});

class  DbStorage{

    static getDbStorageInstance(){
        return dbInstance ? dbInstance : new DbStorage();
    }
    // ------------ DSA ---------------
    async getDSA(){
        try{
            // console.log("hi2");
            const response = await new Promise( (resolve, reject)=>{
                const query = "SELECT * FROM dsa_table;";

                connection.query(query , (err,results)=>{
                    if(err)reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log("hi3");
            // console.log(response);
            return response;

        }catch(err){
            console.log(err.message);
        }
    }

    async insertDSA(question, remark){
        // console.log("hi from insertdsa");
        try{
            const response = await new Promise( (resolve, reject)=>{
                const query = "INSERT INTO dsa_table(question,remark) VALUES(?,?);";

                connection.query(query ,[question,remark], (err,results)=>{
                    if(err)reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response.affectedRows === 1 ? true : false;

        }catch(err){
            console.log(err.message);
            return false;
        }
    }
    async deleteDSA(id){
        try{
            id=parseInt(id,10);
            const response = await new Promise( (resolve, reject)=>{
                const query = "DELETE FROM dsa_table WHERE id = ?;";

                connection.query(query ,[id], (err,results)=>{
                    if(err)reject(new Error(err.message));
                    resolve(results.affectedRows);
                })
            });
            // console.log(response);
            return response === 1 ? true : false;

        }catch(err){
            console.log(err.message);
            return false;
        }
    }



    // ------------ CS ---------------
    async getCS(){
        try{
            // console.log("hi2");
            const response = await new Promise( (resolve, reject)=>{
                const query = "SELECT * FROM cs_table;";

                connection.query(query , (err,results)=>{
                    if(err)reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log("hi3");
            // console.log(response);
            return response;

        }catch(err){
            console.log(err.message);
        }
    }

    async insertCS(question, remark){
        // console.log("hi from insertdsa");
        try{
            const response = await new Promise( (resolve, reject)=>{
                const query = "INSERT INTO cs_table(question,remark) VALUES(?,?);";

                connection.query(query ,[question,remark], (err,results)=>{
                    if(err)reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response.affectedRows === 1 ? true : false;

        }catch(err){
            console.log(err.message);
            return false;
        }
    }
    async deleteCS(id){
        try{
            id=parseInt(id,10);
            const response = await new Promise( (resolve, reject)=>{
                const query = "DELETE FROM cs_table WHERE id = ?;";

                connection.query(query ,[id], (err,results)=>{
                    if(err)reject(new Error(err.message));
                    resolve(results.affectedRows);
                })
            });
            // console.log(response);
            return response === 1 ? true : false;

        }catch(err){
            console.log(err.message);
            return false;
        }
    }



    // ------------ Task ---------------
    async getTask(){
        try{
            // console.log("hi2");
            const response = await new Promise( (resolve, reject)=>{
                const query = "SELECT * FROM task_table;";

                connection.query(query , (err,results)=>{
                    if(err)reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log("hi3");
            // console.log(response);
            return response;

        }catch(err){
            console.log(err.message);
        }
    }

    async insertTask(task){
        // console.log("hi from insertdsa");
        try{
            const date_added=new Date();
            const response = await new Promise( (resolve, reject)=>{
                const query = "INSERT INTO task_table(task,date_added) VALUES(?,?);";

                connection.query(query ,[task,date_added], (err,results)=>{
                    if(err)reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response.affectedRows === 1 ? true : false;

        }catch(err){
            console.log(err.message);
            return false;
        }
    }
    async deleteTask(id){
        try{
            id=parseInt(id,10);
            const response = await new Promise( (resolve, reject)=>{
                const query = "DELETE FROM task_table WHERE id = ?;";

                connection.query(query ,[id], (err,results)=>{
                    if(err)reject(new Error(err.message));
                    resolve(results.affectedRows);
                })
            });
            // console.log(response);
            return response === 1 ? true : false;

        }catch(err){
            console.log(err.message);
            return false;
        }
    }
}

module.exports = DbStorage;
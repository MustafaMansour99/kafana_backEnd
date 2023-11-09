"use strict";
// import the express framework

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const pg = require("pg");
require("dotenv").config();
const server = express();
server.use(cors());
server.use(express.json());
// server open for all clients
const client = new pg.Client(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3003;
// http://localhost:3000 (Ip>>localhost) (PORT >> 3000)

// Routs
server.post("/adduser", addUserHandler);
server.get("/getuser", getUserHandler);
server.delete("/deleteuser/:id", deleteuserHandler);
server.put("/updateuser/:id", updateuserHandler);
server.post("/addaccount", addaccountHandler);
server.get("/getaccount", getaccountHandler);
server.delete("/deleteaccount/:id",deleteaccountHandler)
server.put("/updateaccount/:id",updateaccountHandler)


// functions
function addUserHandler(req, res) {
  const cadres = req.body;
  let sql = `INSERT INTO user1(Server_DateTime,DateTime_UTC,Update_DateTime_UTC,Username,Email,First_Name,Last_Name,Status,Gender,Date_Of_Birth) VALUES ('${cadres.Server_DateTime}','${cadres.DateTime_UTC}','${cadres.Update_DateTime_UTC}','${cadres.Username}','${cadres.Email}','${cadres.First_Name}','${cadres.Last_Name}','${cadres.Status}','${cadres.Gender}','${cadres.Date_Of_Birth}') RETURNING *;`;
  client
    .query(sql)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

function getUserHandler(req, res) {
  const sql = `SELECT * FROM user1`;
  client
    .query(sql)
    .then((Result) => {
      res.send(Result.rows);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}
function deleteuserHandler(req, res) {
  const id = req.params.id;
  const sql = `DELETE FROM user1 where id=${id} RETURNING *;`;
  client
    .query(sql)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}
function updateuserHandler(req, res) {
  const id = req.params.id;
  const data = req.body;
  const sql = `UPDATE user1 SET Username='${data.Username}' , Email='${data.Email}', First_name='${data.First_Name}',
  Last_name='${data.Last_Name}'WHERE id = ${id} RETURNING *;`;
        client.query(sql)
        .then((result) => {
            // res.send(result.rows);
            const sql = `SELECT * FROM user1`;
            client.query(sql)
            .then((data) => {
                res.send(data.rows);
              })
              .catch((error) => {
                res.status(500).send(error);
              });
        })
        .catch((error) => {
            errorHandler(error, req, res);
        });
    }

function addaccountHandler(req, res) {
        const cadres = req.body;
        let sql = `INSERT INTO Account(User_ID,Server_DateTime,DateTime_UTC,Update_DateTime_UTC,Account_Number,Balance,Currency,Status) VALUES ('${cadres.User_ID}','${cadres.Server_DateTime}','${cadres.DateTime_UTC}','${cadres.Update_DateTime_UTC}','${cadres.Account_Number}','${cadres.Balance}','${cadres.Currency}','${cadres.Status}') RETURNING *;`;
        client
          .query(sql)
          .then((data) => {
            res.send(data.rows);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
function getaccountHandler(req,res){
    const sql =`SELECT * FROM Account`
    client.query(sql)
.then((data)=>{
    res.send(data.rows)
})
.catch((err)=>console.log(err))
}
function deleteaccountHandler(req,res){
    const id = req.params.id
    console.log(id);
    const sql = `DELETE FROM Account where id=${id} RETURNING *;`;
    client.query(sql)
    .then((data)=>{
        res.send("success delete")
    })
    .catch((err)=>console.log(err))
}
function updateaccountHandler(req,res){
    const id=req.params.id
    const data=req.body
    const sql = `UPDATE Account SET User_ID='${data.User_ID}',Account_Number='${data.Account_Number}',Balance='${data.Balance}',Currency='${data.Currency}',Status='${data.Status}'WHERE id = ${id} RETURNING *;`;
    client.query(sql)
    .then((data)=>{
        res.send(data.rows)
    })
    .catch((err)=>console.log(err))
}
// connect with database
client.connect().then(() => {
  server.listen(PORT, () => {
    console.log(`success listining for this port ${PORT}`);
  });
});
// to give the server port using method call listen

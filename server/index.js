const express = require("express");
const mysql = require("mysql");

const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Sanju@17",
    database:"employeeSystem"
}) 

app.post('/create', (req, res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage= req.body.wage;

    db.query("INSERT INTO employeeDel(name,age,country,position,wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, results)=>{
        if(err){
            console.log(err);
        } else {
            res.send("value is inserted");
        }
    }
    )
})

 app.get('/employeeDel', (req, res)=>{
     db.query("SELECT * FROM employeeDel",(err, results)=>{
        if(err){
            console.log(err);
        } else {
            res.send(results);
        }
    })
 })

 app.put('/update', (req, res)=>{
     const emp_id = req.body.emp_id;
     const wage = req.body.wage;
     console.log(wage)
     db.query("UPDATE employeeDel SET wage = ? WHERE emp_id = ?",
     [wage, emp_id],
     (err, results)=>{
         if(err){
             console.log(err)
         }else {
             res.send(results)
         }
     })
 })

 app.delete('/delete/:emp_id',(req, res)=>{
     const emp_id =req.params.emp_id;

     db.query("DELETE FROM employeeDel WHERE emp_id = ?", emp_id,
     (err, results)=>{
         if(err){
             console.log(err)
         }else {
             res.send(results)
         }
     })
 })  

app.listen(3001, ()=>{
    console.log('hey, your server is rinning')
})
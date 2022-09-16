const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const { check, validationResult } = require('express-validator');
//const data = process.env.NODE_ENV === "test" ? "students-test" : "students";

const app = express();

app.use(cors());
app.use(bodyParser.json());

//error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: 'Internal Server Error',
      },
    });
  });



//database connection
const db = mysql.createConnection({
     host:'localhost',
     user:'root',
     password:'',
     database:'employeedb',
     port:3306
});

//check database connection
db.connect(err=>{
    if(err) {
        console.log(err,'dberr');
        
}else{
    console.log('database Connected...')};
});

//get data
app.get('/emp',(req,res)=>{
    let qr = `select * from emp`;

    db.query(qr,(err,result)=>{

         if(err)
         {
             console.log(err,'err');
             res.status(404).json({
                error: {
                    meassage:'data not found',
                },
              });
         }
         if(result.length>0){
             res.send({
               meassage:'All employee data',
               data:result
             });
         }

    })
});

//get data by id
app.get('/emp/:id',(req,res)=>{
    let gID = req.params.id;
    let qr =`select * from emp where id = ${gID}`;

    db.query(qr,(err,result)=>{
          if(err){console.log(err);
            res.status(404).json({
                error: {
                    meassage:'data not found',
                },
              });
        }

          if(result.length>0){
              res.send({
               meassage:'get data by id',
               data:result
              });
          } else{
              res.status(404).json({
                error: {
                    meassage:'data not found',
                },
              });
          }
    });
});


//Post data
app.post('/emp',  [check('name', 'Name is required').notEmpty().isAlpha().isLength({min:3}),
check('city', 'city is required').notEmpty().isAlpha(),
check('salary', 'salary is required').notEmpty().isNumeric(),
check('company', 'company is required').notEmpty().isAlpha(),
check('gender', 'gender is required').notEmpty().isAlpha()
], (req, res, next)=>{
let errors = validationResult(req);
if (!errors.isEmpty()) {
  console.log(errors.mapped());
  console.log("errors")
  return res.status(400).json({ errors: errors.array() });
}else{
    console.log(req.body,'createdata');}


let name = req.body.name;
let city = req.body.city;
let salary = req.body.salary;
let company = req.body.company;
let gender = req.body.gender;


   let qr = `insert into emp(name,city,salary,company,gender) 
              values('${name}','${city}','${salary}','${company}','${gender}')`;
            
   db.query(qr,(err,result)=>{

    
      if(err){
          console.log(err);
         
} 
    else{
    console.log(result,'result')}
   res.send({
       meassage:'data insterted'
         });
    });

});


// put data
app.put('/emp/:id', [check('name', 'Name is required').notEmpty(),
check('city', 'city is required').notEmpty(),
check('salary', 'salary is required').notEmpty().isNumeric(),
check('company', 'company is required').notEmpty(),
check('gender', 'gender is required').notEmpty()
], (req, res, next)=>{
let errors = validationResult(req);
if (!errors.isEmpty()) {
  console.log(errors.mapped());
  console.log("errors")
  return res.status(400).json({ errors: errors.array() });
}else{
    console.log(req.body,'createdata');}


    console.log(req.body,'data update');

    let gID = req.params.id;

    let name = req.body.name;
    let city = req.body.city;
    let salary = req.body.salary;
    let company = req.body.company;
    let gender = req.body.gender;

    let qr =`update emp set name = '${name}',city = '${city}',salary = '${salary}',company = '${company}',gender = '${gender}'
             where id = ${gID}`;

    db.query(qr,(err,result)=>{
         if(err){console.log(err);}

         res.send({
             meassage:'data updated'
         });
    });


});

//delete data

app.delete('/emp/:id',(req,res)=>{
         let qID = req.params.id;

         let qr = `delete from emp where id = '${qID}' `;
         db.query(qr,(err,result)=>{
             if(err) {console.log(err); }
             if(result){
                res.send({
                 meassage:'Deleted!',
                 
                });
            }
            // else{
            //     res.status(404).json({
            //       error: {
            //           meassage:'data not found',
            //       },
            //     });
            // }
      });
});


  




app.listen(3000,()=>{
   console.log('server is running...');
 });

 module.exports = app;
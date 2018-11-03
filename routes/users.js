
var express = require('express');
var router = express.Router();
var user = require('../schema/users');
var nodemailer = require('nodemailer');
let bcryptjs = require('bcryptjs');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            requireTLS: true,
            auth: {
                user: 'elit.naveen@gmail.com',
                pass: 'kddintepfsnefnrw'
            }
 });

/* Insert users listing. */
router.post('/register', function(req, res, next) {
 
      var data = req.body;
      console.log(data);

      user.findOne({email:data.email}, (err, info)=>{
        if(err){
          res.send({status:"error", message:"Error while Registration"})
        }else if(info){
          res.send({status:"error", message:"Email already exits"})
        }else{
          data.email = data.email;
        user.create(data,(err,dat)=>{
            if(err){
              console.log(err);
            }
            else{
            var link="http://localhost:4200/setpassword?id="+data.email;
            const mailOptions = {
              from: '"Digital Lync" <development@digitallynctech.com>', // sender address
              to: data.email, // list of receivers 35.193.136.46
              subject: 'Please Set your password', // Subject line
              html: `<!DOCTYPE html>
                       <html>
                       <head>
                           <title>Password Reset</title>
                       </head>
                       <body>
                       <div style="background-color:#white ;width: 60%;height: 50%;padding-top: 3%;padding-bottom: 3%;">
                       <div style="width: 50%;height: 30%; background-image: linear-gradient(135deg, #3023ae, #c86dd7);box-shadow:  3px 3px 10px #888888 ;padding: 40px;margin: auto;border-radius: 10px;">
                               <h1 style="text-align: center;font-family: 'Roboto', sans-serif;color:white">Full Stack Workshop</h1>
                               <p style="font-family: 'Roboto', sans-serif;line-height: 30px;color: white;text-align: center;">Hi ${data.firstname} ${data.lastname},</p>
                           <p style="font-family: 'Roboto', sans-serif;line-height: 25px;text-align: center;color: white">Thank You <br>Your are successfully Registered<br> for Full stack workshop
                               
                           
                           </p>
                           <div style="text-align="center">
                
                           <button style="color: blue;text-align: center;border:0px;outline: 0px; width: 150px;height: 40px;border-radius: 4px;background-color: #f2f2f2;cursor: pointer; font-family: Roboto;font-size: 15px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: 1.2px;text-align: left;color: #3d29b1;margin-left: 132px;"><a style="text-decoration="none"" href="${link}">Create Password</a></button>
                  
                       </div>
                       </div>
                       </div>
                       </body>
                       </html>`
            };
            transporter.sendMail(mailOptions, function (err, info) {
              if(err){
               res.send({status:"error", message:"Something went wrong, please try again"});
                user.findOneAndRemove({email:data.email});
              }
              else{
                res.send({status:"success", message:"Registration success, Check your mail for setpassword"});
              }
            });
          }
         })
        }
      })
});



router.post('/password', (req, res)=>{
  let hash = bcryptjs.hashSync(req.body.password, 8);
  console.log(hash)
  
            user.findOneAndUpdate({email:req.body.email}, {$set:{ password: hash }}, {new:true},(err, data)=>{
              if(err){ res.send({status:"error", message:"Something went wrong, Try again"}); 
              }else{
                res.send({status:"success", message:"Password set successfully"})
              }
          })
})

router.get('/', (req, res)=>{
  res.send("Workshop Application")
})

router.get('/users', (req,res)=>{
    user.find({}).exec((err,data)=>{
      res.send({status:"success", message:data});
    })
})

router.get('/testing/:name',(req, res)=>{
  res.send(req.params);
})

router.get("/test", (req, res)=>{
  res.send(req.query);
})

router.get('/details', (req, res)=>{

  console.log(req.query);
  user.findById(req.query.id).exec((err, data)=>{
    if(err){
      res.send({status:"error", message:'Problem while retriving data, Try again'})
    }else{
      res.send({status:"success", message:data});
    }
  })
})

router.post('/update', (req, res)=>{
  let obj = req.body;
  //console.log(obj)
          user.findOneAndUpdate({email:obj.email}, {$set:obj}, {new:true}, (err, details)=>{
              if(err){ res.send({status:"error", message:err}); 
              }else{
                res.send({status:"sucess", message:details})
              }
          })
})

router.post('/login', (req, res)=>{
  console.log(req.body);
  user.findOne({email:req.body.email, password: req.body.password}, (err, data)=>{
    //let compare = bcryptjs.compareSync(req.body.password, data.password);
    if(err) res.send({data:"Something went wrong while logging"});
    if(!data){
      res.send({status:"error", message:'No User Found'})
    }else if(!compare){
      res.send({status:"error", message:"Invalid Credentials"})
    }else{
      delete data["password"];
      res.send({status:"success", message:data});
    }
  })
})

module.exports = router;

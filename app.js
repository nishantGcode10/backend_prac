// jshint esversion:6


const express=require('express');
const app=express();
const request=require('request');
const https=require('https');
const bodyParser=require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,function(){
  console.log('listening on port 3000');
});
app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});
app.post('/',function(req,res){
        const email=req.body.email;
        const password=req.body.password;
        const data={
          members:[{
            email_address:email,
            status:"subscribed",
            update_existing:'true',
          }]
        };
        const jsonData=JSON.stringify(data);
        const url="https://us17.api.mailchimp.com/3.0/lists/c6a1431388";
        const options={
          method:"POST",
          auth:"nishant:eee81dadd683f17040a3556572c28be2-us17"
        };
        const request=https.request(url,options,function(response){
          if(response.statusCode===200){
            res.send("easier said than done");
          }
          else res.send("sorry better luck next time");
          response.on("data",function(data){
            console.log(JSON.parse(data));
          });
        });
        request.write(jsonData);
        request.end();
      //  res.send("Easier said than done");
});
//c6a1431388
//eee81dadd683f17040a3556572c28be2-us17

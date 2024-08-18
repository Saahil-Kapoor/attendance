const express = require('express');
const port = 5000;
const app = express();
const db = require('./queries');


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.get('/',(req,res)=>{
    res.send("hello world");
})
app.use(express.json({limit: '50mb'}));
app.post('/api/createuser',db.createUser);
app.post('/api/login',db.login);
app.post('/api/camBack',db.camBack);
app.listen(port,()=>{
    console.log(`example app listening on port ${port}`);
})
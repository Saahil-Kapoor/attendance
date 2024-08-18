const pg = require('pg');
const axios = require('axios');

const jwt = require('jsonwebtoken');
const jwtSecret = "dhcfiuhfshio";

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    password:"123456",
    port:5432,
    database:"worlds"
})

db.connect();

console.log("successfully connected");

const createUser = (req,res)=>{
    const {name,email,roll_no,password} = req.body;
    console.log(req.body);

    db.query(`insert into login values ($1, $2, $3, $4)`,[name,password,roll_no,email],(error,results)=>{
        if(error){
            throw error;
        }
        res.status(201).send({success:true});
    })
}


const login = async(req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);
    try{
        const query = `select * from login where email = $1`;
        const values = [email];
        const {rows} = await db.query(query,values);
        if(rows.length === 0){
            return res.status(401).send({
                success:false,
                message:"No such data found"
            })
        }

        const user = rows[0];
        console.log(user);
        var isMatch = false;
        const parsePassword = parseInt(password,10)
        if(parsePassword === user.password){
            isMatch = true;
        }
        if(!isMatch){
            return res.status(401).send({success:false,message:"Invalid email or password"})
        }
        const authToken = jwt.sign(user,jwtSecret);
        return res.status(200).send({success:true,message:"Login successfull",roll_no:user.roll_no,name:user.Name,token:authToken});
    }catch(error){
        console.log(error);
        res.status(500).send({success:false,message:"Server Error"})
    }
}

const camBack =async(req,res)=>{
    try{
        const {data} = req.body;
        const base64Data = data.replace('data:image/png;base64',"");
        const response = await axios.post('http://127.0.0.1:5000/predict',{base64Data});
        console.log(response.data);
        res.status(200).send(response.data);
    }
    catch(error){
        res.status(500).send(error.toString());
    }
}

const deleteUser = (req,res)=>{
    const id = req.params.name;
    db.query('delete from login where name = $1',[id],(error,results)=>{
        if(error){
            throw error;
        }
        res.status(200).send({success:true});
    })
}

module.exports = {
    createUser,
    camBack,
    login
}
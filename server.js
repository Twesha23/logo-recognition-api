const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const connectDB = require('./src/config/database');
const UserModel = require('./src/models/user');
const register=require('./controllers/register');
const login=require('./controllers/login');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors());
connectDB();
// const database = {
//     users: [
//         {
//             id: '1',
//             name: 'Twesha',
//             email: 'twesha@gmail.com',
//             password: 'twesha',
//             entries: 0,
//             joiningDate: new Date()
//         },
//         {
//             id: '2',
//             name: 'Grima',
//             email: 'grima@gmail.com',
//             password: 'grima',
//             entries: 0,
//             joiningDate: new Date()
//         }
//     ]
// }

//setting routes
app.get('/', (req,res) => {
    UserModel.getUsers()
    .then(users => {
        res.json(users);
        console.log("Users List:",users);
     })
    .catch(err => {
        res.status(400).json(`Error ${err}`);
    })
})

app.post('/login',(req,res)=>{login.handleLogin(req,res,UserModel,bcrypt)})
    // let found = false;
    // database.users.forEach(user =>{
    //     if(req.body.email === user.email && found === false && req.body.password === user.password){
    //         found = user;
    //         console.log(req.body,user);
    //         /*bcrypt.compare(req.body.password, user.password, function(err, hash_res) {
    //             if(hash_res === true) {
    //                 console.log('True',hash_res,user);
    //                 found = user;
    //             }
    //         });*/
    //     }       
    // })
    // if(found === false)
    //     res.status(400).json("Login unsuccessful");
    // else
    //     res.json(found);



app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt,UserModel)})
    // const newUser = req.body;
    // let encrypted_password='';
    // database.users.push({
    //     id: 101 + database.users.length + '',
    //     name: newUser.name,
    //     email: newUser.email,
    //     password: '',
    //     entries: 0,
    //     joiningDate: new Date()
    // });
    // bcrypt.genSalt(10, function (err, salt) {
    //     bcrypt.hash(newUser.password, salt, function (err, hash) {
    //         database.users[database.users.length-1].password = hash;
    //         console.log(hash);
    //     });
    // });
    // res.json(database.users[database.users.length-1]); 


app.get('/profile/:id',(req,res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json("No such user found");
    }
})

app.put('/imageEntry',(req,res) => {image.handleImageEntry(req,res,UserModel)})
    
    // const {id} = req.body;
    // let found = false;
    // database.users.forEach(user =>{
    //     if(user.id === id){
    //         found = true;
    //         user.entries++;
    //         return res.json(user.entries);
    //     }
    // })
    // if(!found){
    //     res.status(400).json("No such user found");
    // }
app.post('/imageURL',(req,res) => {image.handleAPICall(req,res)})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
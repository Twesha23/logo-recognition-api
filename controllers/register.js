
const handleRegister = (req,res,bcrypt,UserModel) => {
    const newUser = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            let user = new UserModel({
                name: newUser.name,
                email: newUser.email,
                password: hash,
                entries: 0,
                joiningDate: new Date()
              });
              
              user.save()
                 .then(user => {
                    res.json(user); 
                    console.log("Record created",user);
                 })
                 .catch(err => {
                   res.status(400).json("Registration unsuccessful");
                   console.error("Error:",err);
                 })
            console.log(hash);
        })
    })
}

module.exports={
    handleRegister:handleRegister
};
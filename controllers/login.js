const handleLogin= (req,res,UserModel,bcrypt) => {
    UserModel
    .find({
        email: req.body.email
    })
    .then(user => {
        if(user[0])
        {
            bcrypt.compare(req.body.password, user[0].password, function(err, hash_res) {
                if(hash_res === true) {
                    console.log('True',hash_res,user[0]);
                    console.log("Record found:",user[0]);
                    return res.json(user[0]);
                }
                else
                    res.status(400).json("Login unsuccessful"); 
            });
        }  
        else
            res.status(400).json("Login unsuccessful"); 
    })
    .catch(err => {
        res.status(400).json("Login unsuccessful");
    })
}
module.exports={
    handleLogin:handleLogin
};
const Clarifai=require('clarifai');

const app = new Clarifai.App({
    apiKey: 'e0e49015fe0643048d0c40783be7a10d'
   });

const handleAPICall=(req,res)=>{
    app.models.predict(Clarifai.LOGO_MODEL,req.body.imageURL)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>res.status(400).json('unble to work with API'))
}


const handleImageEntry = (req,res,UserModel) => {
    const {user,logos_detected} = req.body;
    UserModel
    .findOneAndUpdate(
        {
        _id: user.id  // search query
        }, 
        Object.assign(user,{                                //Updation
            entries: Number(user.entries + logos_detected)
        }),
        {
            new: true,                       // return updated doc
            runValidators: true              // validate before update
        })
    .then(usr => {
        if(usr){
            return res.json(usr.entries);
        }
        else
            res.status(400).json("No such user found");
        
    })
    .catch(err => {
        console.error("Error:",err);
        res.status(400).json("Error encountered");
    })
}

module.exports={
    handleImageEntry,
    handleAPICall
};
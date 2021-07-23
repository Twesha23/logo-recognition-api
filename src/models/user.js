let mongoose = require('mongoose');
const validator = require('validator');


let userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
          return validator.isEmail(value)
        }
    },
    password: String,
    entries: Number,
    joiningDate: Date,
    createdAt: Date,
    updatedAt: Date
});


//Static Method
userSchema.statics.getUsers = function() {
    return new Promise((resolve, reject) => {
      this.find((err, docs) => {
        if(err) {
          console.error(err);
          return reject(err);
        }
        resolve(docs);
      })
    })
}

userSchema.statics.findUser = function() {
    return new Promise((resolve, reject) => {
      this.find((err, docs) => {
        if(err) {
          console.error(err);
          return reject(err);
        }
        resolve(docs);
      })
    })
}

//Middlewares - pre-save hook
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    // Set a value for createdAt only if it is null
    if (!this.createdAt) {
      this.createdAt = Date.now();
    }
    // Call the next function in the pre-save middleware chain
    next();   
})

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        fullName:{
            type: String,
            required: [true, "Full Name not provided"]
        },
        email:{
            type:String,
            unique:[true,"email already exist in DB"],
            lowercase:true,
            trim:true,
            required:[true,"Email is not provided"],
            validate: {
                validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: '{VALUE} is not a valid email!'
            }
        },
        role:{
            type:String,
            enum:["normal","admin"],
            required:[true,"Role is not provided"]
        },
        password:{
            type:String,
            required: [true,"Password is not provided"]
        }
    },
    {timestamps:true}
);

const User = mongoose.model("User",userSchema);
module.exports = User;
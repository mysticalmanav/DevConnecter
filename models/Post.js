const mongoose = require('mongoose');
const { post } = require('request');
const PostSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    like:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    }], 
    comment:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        },
        text:{
            type:String,
            required:true
        },name:{
            type:String
        },
        avatar:{
            type:String
        },date:{
            type:Date,
            dafult:Date.now
        }
    }],
    date:{
        type:Date,
        default:Date.now
    }


})
module.exports = Profile=  mongoose.model('posts',PostSchema);
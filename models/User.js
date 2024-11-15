const mongoose=require('mongoose');

const UserSchema= new mongoose.Schema({
    username:{type:String, require:true, unique:true},
    email:{type:String,require:true,unique:true},
    password:{type:String, require:true},
    date:{type:Date, default:Date.now},
});

module.exports=mongoose.model('User',UserSchema);
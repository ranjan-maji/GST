const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    dateofbirth: Date,
    verified: Boolean
});

//Generating tokens
UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id:user.id.toString()}, 'hiiamranjanmajiiambackenddev')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
//convert password into Hash Method
UserSchema.pre('save', async function(next) {

    if(this.isModified("password")){
     this.password = await bcrypt.hash(this.password, 10);
    
     
    }
    next();
 })



const User = mongoose.model('User', UserSchema);

module.exports = User;
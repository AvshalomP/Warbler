const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImgUrl: {
        type: String
    }
});


//hashing password (using 'pre save' HOOK - we do it before we save the info in our db)
userSchema.pre("save", async function(next){ //adding async because we want to 'await' the hash async function inside
    try {
        if(!this.isModified("password")){
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10); //10 is what's called salting in cryptography - make the hashed string more randomize
        this.password = hashedPassword;
        return next();
    }
    catch(err) {
        return next(err); //anytime we use next(err) we aim that our errorHandler middleware will be fired
    }
});

//comparing helper to see if entered password is correct
userSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);   //compare will hash the candidate pass first
        return isMatch;                                                         //-> and then compare it with the stored one
    }
    catch (err) {
        return next(err);
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;

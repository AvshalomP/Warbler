const mongoose = require("mongoose");
const User = require("./user");


const messageSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxLength: 160   //160 chars
        },
        //reference to user
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"     //has to match the User model name
        }
    },
    {
        timestamps: true
    }
);

//this will remove the message from the messages list in user first and then will continue with next() to remove the message itserlf from the db
messageSchema.pre('remove', async function(next){
    try {
        //find user
        let user = User.findById(this.user);
        //remove message from 'messages' array of the user
        user.messages.remove(this.id); //this is a mongoose method - this method is synchronous
        //save the updated user
        await user.save();
        //continue
        return next();
    } catch (err) {
        return next(err.message);
    }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
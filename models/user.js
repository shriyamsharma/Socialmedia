const mongoose =  require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic:{
        type:String,
        default: "https://res.cloudinary.com/dpiq0zpxp/image/upload/v1606908331/default_profile_photo_y0mbvf.png"
    },
    followers:[{type:ObjectId, ref: "User"}],
    following:[{type:ObjectId, ref: "User"}]
})

mongoose.model("User", userSchema);


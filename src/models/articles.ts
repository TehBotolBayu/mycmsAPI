import mongoose, {Schema, models, Mixed } from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const articlesSchema = new Schema({ 
    titleid: {type: String, unique : true, required: true, index:true, dropDups: true},
    title: {type: String, required: true},
    content: [{}],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cover: {type: String, required: false},
    tags: {type: [String], required: false}
}, {timestamps: true});

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {type: String, unique : true, required: true, index:true, dropDups: true},
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: String,
    },
    pictureUrl: {
        type: String
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

articlesSchema.plugin(mongoosePaginate);

const Articles = mongoose.model("Articles", articlesSchema);
export default Articles;
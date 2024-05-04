import mongoose, {Schema, models, Mixed } from "mongoose";

const articlesSchema = new Schema({
    title: {type: String, required: true},
    content: [{}],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {timestamps: true});

const Articles = models.Articles || mongoose.model("Articles", articlesSchema);
export default Articles;


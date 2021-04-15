import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    uid: { type: Number, index: true, unique: true },
    title: String,
    genre: String,
    malRating: Number,
    imgUrl: String,
    link: String,
    hongoScore: Number,
    numberHongoScore: Number,
  },
  {
    collection: 'animes',
  },
);

export default mongoose.models.AnimeSchema || mongoose.model('AnimeSchema', schema);

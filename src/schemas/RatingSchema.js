import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    uid: { type: Number, index: true, unique: true },
    id_account: String,
    site_account: String,
    rating: Number,
  },
  {
    collection: 'ratings',
  },
);

export default mongoose.models.RatingSchema || mongoose.model('RatingSchema', schema);

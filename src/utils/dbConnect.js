import mongoose from 'mongoose';

require('dotenv').config();

const atlasCode = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSOWD}@cluster0.nac5a.mongodb.net/AnimeHongo?retryWrites=true&w=majority`;

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.connect(
    atlasCode,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  );
}

export default dbConnect;

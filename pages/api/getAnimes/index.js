import AnimeSchema from '../../../src/schemas/AnimeSchema';
import dbConnect from '../../../src/utils/dbConnect';

export default async function getAnimes(req, res) {
  dbConnect();

  // get all animes greater than 7.9
  const animes = await AnimeSchema.aggregate([
    {
      $match: { malRating: { $gt: 7.9 } },
    },
    {
      $project: {
        _id: 0,
        uid: 1,
        title: 1,
        genre: 1,
        link: 1,
        malRating: 1,
        hongoScore: 1,
        numberHongoScore: 1,
        imgUrl: 1,
      },
    },
  ]);

  res.status(201).json(JSON.parse(JSON.stringify(animes)));
}

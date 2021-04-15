/* eslint-disable object-shorthand */

import AnimeSchema from '../../../src/schemas/AnimeSchema';
import RatingSchema from '../../../src/schemas/RatingSchema';
import dbConnect from '../../../src/utils/dbConnect';

export default async function getAnimes(req, res) {
  dbConnect();
  const { idAccount } = req.query;

  // get all animes greater than 7.9
  // after left join It with rating table
  const animes = await AnimeSchema.aggregate([
    {
      $match: { malRating: { $gt: 7.9 } },
    },
    {
      $lookup:
         {
           from: RatingSchema.collection.name,
           let: { uid: '$uid' },
           pipeline: [
             {
               $match: {
                 $expr: { $eq: ['$uid', '$$uid'] },
                 id_account: idAccount,
               },
             },
             { $project: { rating: 1, _id: 0 } },
           ],
           as: 'userRatings',
         },
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
        userRating: { $first: '$userRatings.rating' },
      },
    },
  ]);

  res.status(201).json(JSON.parse(JSON.stringify(animes)));
}

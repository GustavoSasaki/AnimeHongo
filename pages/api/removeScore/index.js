/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import RatingSchema from '../../../src/schemas/RatingSchema';
import AnimeSchema from '../../../src/schemas/AnimeSchema';
import dbConnect from '../../../src/utils/dbConnect';

export default async function removeScore(req, res) {
  if (req.method !== 'POST') {
    res.status(403).json({ result: 'no' });
    return;
  }

  dbConnect();
  const { AouthInfo: [accessToken, userId], siteAccount, uidAnime } = JSON.parse(req.body);

  const ratingsPrimaryKeys = { id_account: userId, site_account: siteAccount, uid: uidAnime };
  const ratingRow = await RatingSchema.findOne(ratingsPrimaryKeys);
  const animeRow = await AnimeSchema.findOne({ uid: uidAnime });

  const numberScoresOld = animeRow.numberHongoScore;
  const scoreTotalOld = animeRow.hongoScore * numberScoresOld;
  const scoreUserOld = ratingRow?.rating;

  // no review to remove
  if (typeof scoreUserOld === 'undefined') {
    res.json();
    return;
  }

  const numberScoresNew = numberScoresOld - 1;
  let scoreTotalNew;
  if (numberScoresNew === 0) {
    scoreTotalNew = 0;
  } else {
    scoreTotalNew = (scoreTotalOld - scoreUserOld) / numberScoresNew;
  }

  await RatingSchema.deleteOne(ratingsPrimaryKeys);

  await AnimeSchema.updateOne(
    { uid: uidAnime },
    {
      $set: {
        hongoScore: scoreTotalNew,
        numberHongoScore: numberScoresNew,
      },
    },
  );

  res.json();
}

/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import { OAuth2Client } from 'google-auth-library';
import RatingSchema from '../../../src/schemas/RatingSchema';
import AnimeSchema from '../../../src/schemas/AnimeSchema';
import dbConnect from '../../../src/utils/dbConnect';

const OAUTH_ID_CLIENT = '228953463372-dbd0f30dc299kin5nec84ikaf97e0qtd.apps.googleusercontent.com';
const client = new OAuth2Client(OAUTH_ID_CLIENT);

export default async function postScore(req, res) {
  if (req.method !== 'POST') {
    res.status(403).json({ result: 'no' });
    return;
  }

  dbConnect();
  const {
    AouthInfo: [accessToken, userId],
    siteAccount, uidAnime,
    ratingNew: scoreUserNew,
  } = JSON.parse(req.body);

  const ratingsPrimaryKeys = { id_account: userId, site_account: siteAccount, uid: uidAnime };
  const ratingRow = await RatingSchema.findOne(ratingsPrimaryKeys);
  const animeRow = await AnimeSchema.findOne({ uid: uidAnime });

  const scoreTotalOld = animeRow.hongoScore;
  const numberScoresOld = animeRow.numberHongoScore;
  const scoreUserOld = ratingRow?.rating;

  let scoreTotalNew;
  let numberScoresNew;
  const total = scoreTotalOld * numberScoresOld;

  // first review for this user of the anime
  if (typeof scoreUserOld === 'undefined') {
    numberScoresNew = numberScoresOld + 1;
    scoreTotalNew = (total + scoreUserNew) / numberScoresNew;
  } else {
    numberScoresNew = numberScoresOld;
    scoreTotalNew = (total - scoreUserOld + scoreUserNew) / numberScoresNew;
  }

  await RatingSchema.updateOne(
    ratingsPrimaryKeys,
    {
      $set: {
        uid: uidAnime,
        id_account: userId,
        rating: scoreUserNew,
        site_account: siteAccount,
      },
    },
    { upsert: true },
  );

  await AnimeSchema.updateOne(
    { uid: uidAnime },
    {
      $set: {
        hongoScore: scoreTotalNew,
        numberHongoScore: numberScoresNew,
      },
    },
  );

  res.json(scoreTotalNew);
}

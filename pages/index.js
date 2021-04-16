import React from 'react';
import PropTypes from 'prop-types';
import { server } from '../src/utils/siteUrl';
import TableAnimes from '../src/components/TableAnimes/TableAnimes';
import FirstTimeText from '../src/components/FirstTimeText/FirstTimeText';

async function getAnimeRows({ AouthInfo }) {
  let apiUrl;
  if (AouthInfo === undefined) {
    apiUrl = `${server}/api/getAnimes`;
  } else {
    apiUrl = `${server}/api/getAnimes/${AouthInfo[1]}`;
  }

  const rows = await fetch(apiUrl)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error('Falha em pegar os dados');
    });
  return rows;
}

export default function Home({ animeRows, AouthInfo }) {
  return (
    <>
      {AouthInfo === undefined && <FirstTimeText />}

      <TableAnimes
        animeRows={animeRows}
        getAnimeRows={getAnimeRows}
        AouthInfo={AouthInfo}
      />

    </>
  );
}

Home.propTypes = {

  animeRows: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    link: PropTypes.string,
    malRating: PropTypes.number,
    hongoScore: PropTypes.number,
    numberHongoScore: PropTypes.number,
    imgUrl: PropTypes.string,
    uid: PropTypes.number,
  })).isRequired,
};

export async function getServerSideProps() {
  try {
    const animeRows = await getAnimeRows({});
    return {
      props: {
        animeRows,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

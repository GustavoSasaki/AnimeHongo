import styled from 'styled-components';
import MalRatingLink from './MalRatingLink/MalRatingLink';
import TotalScore from './TotalScore/TotalScore';
import SelectScore from './SelectScore/SelectScore';

const ColumnsGrow = {
  imgUrl: '10%',
  title: 'auto',
  genre: '28%',
  malRating: '10%',
  japaneseScore: '12%',
  yourScore: '12%',
};

function ColumnsInfo({ UserPostScore, AouthInfo }) {
  const columnInfo = [
    {
      field: 'imgUrl',
      align: 'center',
      // eslint-disable-next-line no-return-assign
      render: (rowData) => <ImageStyled src={rowData.imgUrl} alt={rowData.title} />,
      cellStyle: { width: ColumnsGrow.imgUrl },
      headerStyle: { width: ColumnsGrow.imgUrl },
    },
    {
      field: 'title',
      align: 'center',
      title: 'Title',
      cellStyle: { width: ColumnsGrow.title },
      headerStyle: { width: ColumnsGrow.title },
    },
    {
      title: (
        <div>
          MAL Rating
        </div>
      ),
      align: 'center',
      field: 'malRating',
      customSort: (a, b) => (a.malRating - b.malRating),
      render: (rowData) => <MalRatingLink link={rowData.link} score={rowData.malRating} />,
      cellStyle: { width: ColumnsGrow.malRating },
      headerStyle: { width: ColumnsGrow.malRating },
    },
    {
      title: 'Japanese Score',
      field: 'hongoScore',
      align: 'center',
      cellStyle: { width: ColumnsGrow.japaneseScore },
      headerStyle: { width: ColumnsGrow.japaneseScore },
      render: (rowData) => (
        <Centerlize>
          <TotalScore score={rowData.hongoScore} numberScores={rowData.numberHongoScore} />
        </Centerlize>
      ),
    },
    {
      title: <YourScoreStyled>Your Score</YourScoreStyled>,
      align: 'center',
      cellStyle: { width: ColumnsGrow.japaneseScore },
      headerStyle: { width: ColumnsGrow.japaneseScore },
      customSort: (a, b) => ((a.userRating ?? -1) - (b.userRating ?? -1)),
      render: (rowData) => (
        <SelectScore
          uidAnime={rowData.uid}
          scoreUser={rowData.userRating}
          UserPostScore={UserPostScore}
        />
      ),
      hidden: (AouthInfo === undefined),
    },
    {
      field: 'genre',
      title: 'Genre',
      align: 'center',
      sorting: false,
      cellStyle: { width: ColumnsGrow.genre },
      headerStyle: {
        width: ColumnsGrow.genre,
      },
    },
  ];
  return columnInfo;
}

const ImageStyled = styled.img`
  width:72px;
  height:108px;
  @media(max-width: 750px) {
    width:60px;
    height:90px;
  }
`;

const YourScoreStyled = styled.p`
  text-decoration: underline;
  font-size: 16px;
`;

const Centerlize = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ColumnsInfo;

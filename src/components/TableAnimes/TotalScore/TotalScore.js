import styled from 'styled-components';
import PropTypes from 'prop-types';
import { levelToNames, levelToColor } from '../../../utils/levelsInfo';

function TotalScore({ score, numberScores }) {
  const levelZeroDec = Math.round(score);
  const levelOneDec = Math.round(score * 10) / 10;

  return (
    <>
      {numberScores === 0 && (
        <TotalScoreStyled level={undefined}>
          {levelToNames[undefined]}
        </TotalScoreStyled>
      )}

      {numberScores !== 0 && (
      <TotalScoreStyled level={levelZeroDec}>
        <div>
          {levelToNames[levelZeroDec]}
          {score !== undefined && ` (${levelOneDec + 1}) `}
        </div>
      </TotalScoreStyled>
      )}
    </>
  );
}

TotalScore.propTypes = {
  score: PropTypes.number,
  numberScores: PropTypes.number.isRequired,
};

TotalScore.defaultProps = {
  score: undefined,
};

const TotalScoreStyled = styled.div`
  backGround : ${({ level }) => levelToColor[level]};
  height: 60px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export default TotalScore;

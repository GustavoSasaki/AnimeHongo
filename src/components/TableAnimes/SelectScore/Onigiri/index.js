import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import db from '../../../../db/styleDb.json';

function Onigiri({
  score, hoverScore, SetHoverScore, UserPostScore,
}) {
  return (
    <OnigiStyled
      onClick={() => UserPostScore(score)}
      score={score}
      onMouseEnter={() => SetHoverScore(score)}
      hoverScore={hoverScore}
    >
      🍙
    </OnigiStyled>
  );
}

Onigiri.propTypes = {
  score: PropTypes.number.isRequired,
  hoverScore: PropTypes.number.isRequired,
  SetHoverScore: PropTypes.func.isRequired,
  UserPostScore: PropTypes.func.isRequired,
};

const OnigiStyled = styled.button`
    color : ${({ hoverScore, score }) => (hoverScore >= score ? 'white' : 'transparent')};
    text-shadow: ${() => `0 0 0 ${db.theme.OnigiriColor}`};

    font-size: 25px;
    cursor: pointer;
    border:none;
    background-color:transparent;
    outline:none;
`;

export default Onigiri;

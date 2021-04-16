import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Onigiri from './Onigiri/Onigi';
import db from '../../../db/styleDb.json';
import { levelToNames } from '../../../utils/levelsInfo';

const { theme } = db;

const useStyles = makeStyles((themee) => ({
  bodyStyle: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.menuBKColor,
    border: `solid ${theme.menuBorderColor}`,
    color: theme.lettersColor,
    boxShadow: themee.shadows[5],
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '1px 0px 0px 0px',
  },
  padder: {
    padding: '0px 35px 24px',
  },
  closeDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeButton: {
    backgroundColor: 'inherit',
    color: 'white',
    cursor: 'pointer',
    outline: 'inherit',
    border: 0,
    margin: 0,
    padding: 0,
  },
  removeScoreButton: {
    backgroundColor: 'transparent',
    color: theme.RemoveByttonColor,
    cursor: 'pointer',
    outline: 'inherit',
    border: 0,
    marginLeft: '3px',
    padding: 0,
    transform: 'translate(0, 2px)',
    '&:hover': {
      color: 'white',
    },
  },

}));

const AllLevels = [0, 1, 2, 3, 4, 5, 6];

function SimpleModal({ uidAnime, scoreUser, UserPostScore }) {
  const classes = useStyles();

  const [hoverScore, SetHoverScore] = React.useState(scoreUser);
  const [open, setOpen] = React.useState(false);
  const [buttonText, SetButtonText] = React.useState();

  function Close() {
    setOpen(false);
    SetHoverScore(scoreUser);
  }

  useEffect(() => {
    if (scoreUser !== undefined) {
      SetButtonText(`${scoreUser + 1} 🍙`);
    } else {
      SetButtonText('N/A');
    }
  }, [scoreUser]);

  async function RemoveScore() {
    if (scoreUser !== undefined) {
      UserPostScore({ uidAnime, ratingNew: undefined });
    }
  }

  const ModalBody = (
    <div className={classes.bodyStyle}>

      <div className={classes.closeDiv}>
        <button type="button" onClick={Close} className={classes.closeButton}>
          <CloseIcon />
        </button>
      </div>

      <div className={classes.padder}>
        <QuestionText>
          How Dificult Is the Anime&apos;s Language?
        </QuestionText>
        <HrStyled />
        <br />

        <Centerlize>
          {AllLevels.map((x) => (
            <Onigiri
              score={x}
              hoverScore={hoverScore}
              SetHoverScore={SetHoverScore}
              UserPostScore={(score) => UserPostScore({ uidAnime, ratingNew: score })}
              key={x}
            />
          ))}
        </Centerlize>

        <br />
        <LevelNameText>
          {levelToNames[hoverScore] || <br />}
        </LevelNameText>
      </div>

      <button type="button" onClick={RemoveScore} className={classes.removeScoreButton}>
        Remove Score
      </button>
    </div>
  );

  return (
    <>
      <ButtonStyled type="button" onClick={() => setOpen(true)}>
        {buttonText}
      </ButtonStyled>
      <Modal
        open={open}
        onClose={Close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {ModalBody}
      </Modal>
    </>
  );
}

const ButtonStyled = styled.button`
  background-color: inherit;
  color: rgb(33, 182, 209);
  cursor: pointer;
  font-size: 17px;
  &:hover{
    text-decoration: underline;
  }
`;

const Centerlize = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
`;

SimpleModal.propTypes = {
  uidAnime: PropTypes.number.isRequired,
  UserPostScore: PropTypes.func.isRequired,
  scoreUser: PropTypes.number,
};

SimpleModal.defaultProps = {
  scoreUser: undefined,
};

const HrStyled = styled.hr`
  border: none;
  height: 2.5px;
  background-color: ${() => theme.menuBorderColor};
  color: ${() => theme.menuBorderColor};
`;

const LevelNameText = styled.p`
  text-align: center
`;

const QuestionText = styled.p`
  border: "solid black";
  text-align: center;
`;
export default SimpleModal;

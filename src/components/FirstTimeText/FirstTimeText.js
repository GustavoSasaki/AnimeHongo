// /* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

const text1 =
  'AnimeHongo aggregates the opinion of other japanese learners about how difficult is the japanese language of certain animes.';
const text2 =
  'With this site  you can find more easily an anime compatible with your current level.';
const text3 = `If you are interested in rating the difficult of a anime, 
just log in with a google account and post the score.`;
const text4 =
  'This project is in beta, I would really appreciate some feedback and suggestions. (the email is concentrarGSR@gmail.com)';

function FirstTimeText() {
  const [open, setOpen] = React.useState(true);

  return (
    <FirstTimeTextStyled>
      {open && (
        <div>
          <CloseDiv>
            <CloseButon onClick={() => setOpen(false)}>
              <CloseIcon />
            </CloseButon>
          </CloseDiv>

          <CertelizedDiv>
            <div>
              <TextStyled>
                {text1}
                <br />
                <br />
                {text2}
                <br />
                <br />
                {text3}
                <br />
                <br />
                {text4}
              </TextStyled>
            </div>
          </CertelizedDiv>
        </div>
      )}
    </FirstTimeTextStyled>
  );
}

const CloseDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButon = styled.button`
  background-color: inherit;
  color: white;
  cursor: pointer;
  outline: inherit;
  border: 0;
  margin: 0;
  padding: 0;
`;
const TextStyled = styled.div`
  background-color: ${({ theme }) => theme.AboutBKColor};
  color: ${({ theme }) => theme.lettersColor};
  @media (max-width: 800px) {
    width: 100%;
  }

  margin: 5px;
  height: calc(100% - 10px);
`;

const CertelizedDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 10px;

  @media (max-width: 800px) {
    font-size: 14px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const FirstTimeTextStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 10px;

  & > * {
    border: ${({ theme }) => `solid ${theme.menuBorderColor}`};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.AboutBKColor};

    width: 80%;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
`;

export default FirstTimeText;

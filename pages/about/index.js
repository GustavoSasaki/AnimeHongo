/* eslint-disable max-len */
import styled from 'styled-components';

const text1 = 'One of the best ways of learning japanese is immersing yourself in the language ( for example listening to radio or reading the news ). The more you do it, the more natural japanese sounds to you, even if not every sentense is comprehensible.';
const text2 = 'Fortunately for us, we can watch anime, which is fun and accessible.';
const text3 = 'This site aggregates the opinion of other language learners about how difficult is the japanese language of animes, which makes easier the process of finding an anime compatible with your current level.';
function about() {
  return (
    <AboutStyled>
      <div className="flexCenter">
        <div className="flexStretch">
          <div className="internalMargin">
            <div>
              {text1}
              <br />
              <br />
              {text2}
              <br />
              <br />
              {text3}
              <br />
              <br />
              <br />
            </div>

            <div>
              <h3>Other Resources:</h3>
              <br />
              {'Another list of japanese rankings : '}
              <AStyled href="https://learnjapaneseanime.com/anime-recommendations/">
                Learn Japanese Anime
              </AStyled>
              <br />
              {'General Hub for learning new languages: '}
              <AStyled href="https://refold.la/">
                Refold
              </AStyled>
              <br />
              {'Lecture about comprehensible input and why watching anime is a good idea for learning: '}
              <AStyled href="https://www.youtube.com/watch?v=NiTsduRreug&ab_channel=MarkRounds">
                Stephen Krashen on Language Acquisition
              </AStyled>
            </div>
          </div>
        </div>
      </div>
    </AboutStyled>
  );
}

const AboutStyled = styled.div`

  display: flex;

  align-items: center;
  font-size: 18px;

  @media(max-width: 800px) {
    font-size: 16px;
  }
  @media(max-width: 600px) {
    font-size: 14px;
  }

  & .flexCenter{
    display: flex;
    justify-content: center;
    align-items: stretch;
    min-height: 70vh;
  }
  & .flexStretch{  

    border: ${({ theme }) => `solid ${theme.menuBorderColor}`};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.AboutBKColor};
    width:90%;
    @media(max-width: 800px) {
      width:100%;
    }

  }
  & .internalMargin{
    margin: 15px;
    height: calc(100% - 30px);
    display: flex;
    flex-direction: column; 
    justify-content:space-between;
    color: ${({ theme }) => theme.lettersColor};
  } 

`;

const AStyled = styled.a`
  color: ${({ theme }) => theme.TableMalLinkColor};
`;
export default about;

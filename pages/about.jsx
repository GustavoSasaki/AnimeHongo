import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  margin-bottom: 20px;
`;

const AboutPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: ${({ theme }) => theme.lettersColor};

  @media (max-width: 800px) {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.TableMalLinkColor};
`;

const AboutContainer = styled.div`
  width: 90%;
  padding: 15px;

  border: ${({ theme }) => `solid ${theme.menuBorderColor}`};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.AboutBKColor};

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const AboutContent = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.h2`
  margin-bottom: 20px;
`;

function About() {
  return (
    <AboutPage>
      <AboutContainer>
        <AboutContent>
          <div>
            <Header>About AnimeHongo</Header>
            <Paragraph>
              One of the best ways of learning japanese is immersing yourself in the language ( for example listening to
              radio or reading the news ). The more you do it, the more natural japanese sounds to you, even if not
              every sentense is comprehensible.
            </Paragraph>
            <Paragraph>Fortunately for us, we can watch anime, which is fun and accessible.</Paragraph>
            <Paragraph>
              This site aggregates the opinion of other language learners about how difficult is the japanese language
              of animes, which makes easier the process of finding an anime compatible with your current level.
            </Paragraph>
          </div>

          <div>
            <Header>Other Resource</Header>
            <p>
              Another list of japanese rankings:&nbsp;
              <StyledLink href="https://learnjapaneseanime.com/anime-recommendations/">Learn Japanese Anime</StyledLink>
            </p>
            <p>
              General Hub for learning new languages:&nbsp;<StyledLink href="https://refold.la/">Refold</StyledLink>
            </p>
            <p>
              Lecture about comprehensible input and why watching anime is a good idea for learning:&nbsp;
              <StyledLink href="https://www.youtube.com/watch?v=NiTsduRreug">
                Stephen Krashen on Language Acquisition
              </StyledLink>
            </p>
          </div>
        </AboutContent>
      </AboutContainer>
    </AboutPage>
  );
}

export default About;

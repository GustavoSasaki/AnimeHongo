import styled from 'styled-components';
import PropTypes from 'prop-types';

function MalRatingLink({ link, score }) {
  return (
    <LinkStyled href={link}>
      {score}
    </LinkStyled>
  );
}

MalRatingLink.propTypes = {
  link: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const LinkStyled = styled.a`
  color: ${({ theme }) => theme.lettersColor};
  text-decoration: none;

  &:hover{
    text-decoration: underline;
  }
// link color remove because make FLASHY, so people didnt see the your score column
//  color: ${({ theme }) => theme.TableMalLinkColor};
`;
export default MalRatingLink;

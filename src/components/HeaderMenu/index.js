import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import GoogleSignIn from './GoogleSignIn';

const framerVariant = {
  show: { opacity: 1, y: '0' },
  hidden: { opacity: 0, y: '-100%' },
};

function HeaderMenu({ title, SetAouthInfo }) {
  return (
    <HeaderStyled
      as={motion.div}
      transition={{ delay: 0, duration: 0.5 }}
      variants={framerVariant}
      initial="hidden"
      animate="show"
    >

      <Space width="3%" />
      <Link href="/" flexGrow="1">
        <LinkStyled>
          <p>
            {title}
          </p>
        </LinkStyled>
      </Link>

      <MiddleSpace flexGrow="2" />

      <Container flexGrow="1">
        <Link href="/about" flexGrow="1">
          <LinkStyled>
            <p>
              About
            </p>
          </LinkStyled>
        </Link>
        <GoogleSignIn SetAouthInfo={SetAouthInfo} />
      </Container>

      <Space width="5%" />
    </HeaderStyled>
  );
}

HeaderMenu.propTypes = {
  title: PropTypes.string.isRequired,
  SetAouthInfo: PropTypes.func.isRequired,
};

const HeaderStyled = styled.div`
  
  border-bottom-style: solid;
  border-color: ${({ theme }) => theme.menuBorderColor};
  background-color: ${({ theme }) => theme.menuBKColor};
  display:flex;
  align-items:stretch;

`;

const Container = styled.div`
  display: flex;
  align-items: stretch;
  flex-grow: ${(props) => props.flexGrow};
  width: ${(props) => props.width};
  
`;

export const LinkStyled = styled.a`
  flex-grow:1;
  justify-content: center;
  cursor: pointer;
  
  color : ${({ theme }) => theme.lettersColor};
  &:hover {
    background-color:${({ theme }) => theme.menuHoverColor};
  }
  &:active {
    color: ${({ theme }) => theme.menuLettersActivateColor};
  }

  display: flex;
  align-items: center;
`;

const Space = styled.div`
  width: ${(props) => props.width};
  flex-grow: ${(props) => props.flexGrow};
`;

const MiddleSpace = styled(Space)`
  @media(max-width: 500px) {
    flex-grow:0.5
  }
`;
export default HeaderMenu;

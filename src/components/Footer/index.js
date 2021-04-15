import styled from 'styled-components';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.div
      transition={{ delay: 0, duration: 0.5 }}
      variants={{
        show: { opacity: 1, y: '0' },
        hidden: { opacity: 0, y: '100%' },
      }}
      initial="hidden"
      animate="show"
    >
      <FooterStyled>
        <div>
          <p>contact : concentrarGSR@gmail.com</p>
        </div>
      </FooterStyled>
    </motion.div>
  );
}

const FooterStyled = styled.div`
    width: 100%;
    height:100%;
    
    border-top-style: solid;
    border-color: ${({ theme }) => theme.menuBorderColor};
    background-color: ${({ theme }) => theme.menuBKColor};
    display:flex;
    align-items:center;
    justify-content: center;

    & div{
      width: 90%;
      color: ${({ theme }) => theme.FooterLetters};
      display:flex;
      justify-content: right;
    }
    & p{
      color: ${({ theme }) => theme.FooterLetters};
    }
`;

export default Footer;

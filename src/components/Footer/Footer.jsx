import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledFooter = styled(motion.footer)`
  height: 100%;

  border-top: 3px solid ${({ theme }) => theme.menuBorderColor};

  background-color: ${({ theme }) => theme.menuBKColor};
  color: ${({ theme }) => theme.FooterLetters};

  display: flex;
  align-items: center;
  padding-left: 20px;
`;

function Footer() {
  return (
    <StyledFooter
      transition={{ delay: 0, duration: 0.5 }}
      variants={{
        show: { opacity: 1, y: '0' },
        hidden: { opacity: 0, y: '100%' }
      }}
      initial="hidden"
      animate="show"
    >
      contact : concentrarGSR@gmail.com
    </StyledFooter>
  );
}

export default Footer;

/* eslint-disable no-unused-vars */
import styled from 'styled-components';

import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import GoogleLogo from './GoogleLogo';

const OAUTH_ID_CLIENT = '228953463372-dbd0f30dc299kin5nec84ikaf97e0qtd.apps.googleusercontent.com';
function GoogleSignIn({ SetAouthInfo }) {
  const [signIn, setSignIn] = React.useState(false);

  // refresh google login token
  function refreshTokenSetup(res) {
    let refreshTiming = (res.tokenObj.expire_in || 3600 - 5 * 60) * 1000;
    const refreshToken = async () => {
      setSignIn(true);
      SetAouthInfo([res.accessToken, res.googleId]);
      refreshTiming = (res.tokenObj.expire_in || 3600 - 5 * 60) * 1000;
      setTimeout(refreshToken, refreshTiming);
    };
    setTimeout(refreshToken, refreshTiming);
  }

  const LogInnGoogle = (response) => {
    setSignIn(true);
    SetAouthInfo([response.accessToken, response.googleId]);
    refreshTokenSetup(response);
  };

  const LogOutGoogle = (response) => {
    setSignIn(false);
    SetAouthInfo(undefined);
  };

  return (
    <Centralize>
      <>
        {!signIn
        && (
        <GoogleLogin
          isSignedIn
          render={(renderProps) => (
            <button onClick={renderProps.onClick} type="button">
              <span>Sign In&nbsp;&nbsp;</span>
              <GoogleLogo />
            </button>
          )}
          clientId={OAUTH_ID_CLIENT}
          buttonText="Login"
          onSuccess={LogInnGoogle}
          onFailure={LogOutGoogle}
          cookiePolicy="single_host_origin"
        />
        )}

        {signIn
        && (
          <GoogleLogout
            render={(renderProps) => (
              <button onClick={renderProps.onClick} type="button">
                <span>Logout&nbsp;&nbsp;</span>
                <GoogleLogo />
              </button>
            )}
            clientId={OAUTH_ID_CLIENT}
            onLogoutSuccess={LogOutGoogle}
          />
        )}
      </>
    </Centralize>
  );
}

GoogleSignIn.propTypes = {
  SetAouthInfo: PropTypes.func.isRequired,
};

const Centralize = styled.div`
  display:flex;
  flex-grow: 1;
  justify-content: center;
  align-items: stretch;

  &>* {
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    background-color : ${({ theme }) => theme.menuBKColor};
    border: none;
    padding: none;
    color : ${({ theme }) => theme.lettersColor};
    flex-grow:1;
    font-size:16px;
    &:hover {
      background-color:${({ theme }) => theme.menuHoverColor};
    }

    &:active {
      color: ${({ theme }) => theme.menuLettersActivateColor};
    }

    }
`;

export default GoogleSignIn;

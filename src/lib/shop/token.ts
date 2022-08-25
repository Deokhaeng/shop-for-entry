import { setCookie } from 'nookies';
import nookies from 'nookies';

function setToken(accessToken:string, refreshToken:string) {
  setCookie(null, 'accessTokenShop', accessToken, {
    maxAge: 1 * 24 * 60 * 60,
    path: '/',
  });

  setCookie(null, 'refreshTokenShop', refreshToken, {
    maxAge: 1 * 24 * 60 * 60,
    path: '/',
  });
}

function removeToken() {
  const { accessToken } = nookies.get({} as any);
  const { refreshToken } = nookies.get({} as any);

  setCookie(null, 'accessTokenShop', accessToken, {
    maxAge: -1,
    path: '/',
  });

  setCookie(null, 'refreshTokenShop', refreshToken, {
    maxAge: -1,
    path: '/',
  });
}

export { setToken, removeToken };

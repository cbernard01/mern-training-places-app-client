import {useCallback, useEffect, useState} from "react";

let logoutTimer;


export const useAuthentication = () => {

  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  const [token, setToken] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setUserId(uid);
    setToken(token);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem("userData", JSON.stringify({
      userId: uid,
      token: token,
      expiration: tokenExpirationDate
    }));
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setTokenExpirationDate(null);
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = new Date(tokenExpirationDate.toString()).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, storedData.expiration);
    }
  }, [login]);

  return {token, userId, login, logout};
};

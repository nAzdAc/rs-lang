import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [ready, setReady] = useState(false);

  const login = useCallback((jwtToken, jwtRefreshToken, id, name) => {
    setToken(jwtToken);
    setRefreshToken(jwtRefreshToken);
    setUserId(id);
    setUserName(name);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        token: jwtToken,
        refreshToken: jwtRefreshToken,
        userId: id,
        userName: name,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setUserId(null);
    setUserName(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.refreshToken, data.useId, data.userName);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, refreshToken, userId, ready, userName };
};

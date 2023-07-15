import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./context/authContext";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [userInfos, setUserInfos] = useState({});

  const router = useRoutes(routes);

  const login = (userInformation, token) => {
    setToken(token);
    setUserInfos(userInformation);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify({token}));
  };

  const logout = useCallback(() => {
    setToken(null);
    setUserInfos({});
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    if (localStorageData) {
      fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      })
        .then((res) => res.json())
        .then((userDatas) => {
          setIsLoggedIn(true);
          setUserInfos(userDatas);
        });
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}

export default App;

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  auth: false,
  setAuth: () => { },
  user: null,
  setUser: () => { },
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuth = () => {
      try {
        console.log("Fetching User")
        fetch("http://localhost:8080/user", {
          method: "GET",
          credentials: 'include'
        })
          .then(resp => resp.json())
          .then(data => {
            console.log("In Auth", data.authenticated, data, user)
            if (data.authenticated) {
              console.log("True Authenticated")
              setAuth(true)
              setUser(data.user)
            } else {
              setAuth(false)
              setUser(null)
            }
          })
      } catch (error) {
        console.log("ERROR")
        setAuth(false)
        setUser(null);
      };
    };
    isAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

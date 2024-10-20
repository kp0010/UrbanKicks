import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  auth: false,
  setAuth: () => { },
  user: null,
  setUser: () => { },
  admin: false,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const isAuth = () => {
      try {
        fetch("http://localhost:8080/user", {
          method: "GET",
          credentials: 'include'
        })
          .then(resp => resp.json())
          .then(data => {
            if (data.authenticated) {
              console.log("ISADMIN: ", data.admin)
              if (data.admin) {
                setAdmin(true)
              }
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
    <AuthContext.Provider value={{ auth, setAuth, user, setUser, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

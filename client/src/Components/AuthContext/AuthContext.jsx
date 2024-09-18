import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
        auth: null,
        setAuth: () => { },
        user: null
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
        const [auth, setAuth] = useState(null);
        const [user, setUser] = useState(null);

        useEffect(() => {
                const isAuth = () => {
                        try {
                                fetch("http://localhost:8080/user", {
                                        method: "GET",
                                        credentials: 'include'
                                })
                                        .then(resp => resp.json())
                                        .then(data => {
                                                console.log("Auther check")
                                                if (data.authenticated) {
                                                        console.log("Authing", data.user)
                                                        setUser(data.user)
                                                } else {
                                                        setAuth(false)
                                                        setUser(null)
                                                }
                                        })
                        } catch (error) {
                                setUser(null);
                        };
                };

                isAuth();
        }, [auth]);

        return (
                <AuthContext.Provider value={{ auth, setAuth, user }}>
                        {children}
                </AuthContext.Provider>
        );
};

export default AuthProvider;

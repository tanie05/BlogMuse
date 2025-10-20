import {createContext, useState} from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {

  const storedUser = localStorage.getItem('user')
  
  const value = storedUser ?  JSON.parse(storedUser) : {flag: false} ;
  const [userInfo,setUserInfo] = useState(value);

  const logout = () => {
    localStorage.removeItem('user');
    setUserInfo({flag: false});
  };

  return (
    <UserContext.Provider value={{userInfo, setUserInfo, logout}}>
      {children}
    </UserContext.Provider>
  );
}
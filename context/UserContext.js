import {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppInterface from '../components/AppInterface';

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({children}) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const r = await AsyncStorage.getItem('USER_TOKEN');
      setToken(r);
    })();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const values = {token, setToken};
  return (
    <>
      {loading ? (
        <AppInterface />
      ) : (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
      )}
    </>
  );
}

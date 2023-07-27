import CustomStatusBar from './components/CustomStatusBar';
import UserContextProvider from './context/UserContext';
import RootNavigation from './navigation';

const App = () => {
  /* GET TOKEN FROM ASYNC STORAGE */

  return (
    <UserContextProvider>
      <CustomStatusBar backgroundColor="#1D2F49" barStyle="light-content" />
      <RootNavigation />
    </UserContextProvider>
  );
};

export default App;

/**
 *
 *
 *
 */

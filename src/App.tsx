import { SnackbarProvider } from 'notistack';
import './App.css';
import { PopupContextProvider } from './context/SauronContext';
import DefaultLayout from './layouts/Default';
import Main from './pages/Main';

function App() {
  return (
    <SnackbarProvider maxSnack={5} >
      <PopupContextProvider>
        <DefaultLayout>
          <Main />
        </DefaultLayout>
      </PopupContextProvider>
    </SnackbarProvider>
  );
}

export default App;

import './App.css';
import Users from './pages/users/Users';
import Header from './components/Header';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Colors } from './theme/Theme';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: Colors.primary,
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <Users />
    </MuiThemeProvider>
  );
}

export default App;

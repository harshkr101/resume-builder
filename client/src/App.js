import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import MainRouter from './MainRouter';
import theme from './theme';

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <MainRouter />
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App;
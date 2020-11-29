import React from 'react';
import 'fontsource-roboto';
import './App.css';
import Content from './Content';
import SettingsProvider from './containers/SettingsProvider/SettingsProvider';
import ThemeProvider from '@material-ui/core/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#fff',
        },
    },
});

function App() {
    return (
        <SettingsProvider>
            <ThemeProvider theme={theme}>
                <Content />
            </ThemeProvider>
        </SettingsProvider>
    );
}

export default App;

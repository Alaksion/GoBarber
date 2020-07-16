import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import GlobalStyle from './styles/global'
import AppProvider from './hooks/index'
import Routes from './routes/index'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes></Routes>
      </AppProvider>
      <GlobalStyle></GlobalStyle>
    </BrowserRouter>
  );
}

export default App;

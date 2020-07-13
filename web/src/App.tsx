import React from 'react';
import GlobalStyle from './styles/global'
import AppProvider from './hooks/index'
import SignIn from './pages/login/index'

function App() {
  return (
    <>
      <AppProvider>
        <SignIn></SignIn>
      </AppProvider>
      <GlobalStyle></GlobalStyle>
    </>
  );
}

export default App;

// Layout.js
import React from 'react';
import Header from './Header';

const Layout = ({ children, login }) => {
  return (
    <div>
      <Header  login={login}/>
      <main>{children}</main>
    </div>
  );
};

export default Layout;

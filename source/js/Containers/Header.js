import React from 'react';

const Header = ({ variant = 'is-primary', children }) => <header className={`hero is-medium ${variant} is-bold`}>
  <div className="hero-body">
    <div className="container">
      <h1 className="title">{children}</h1>
    </div>
  </div>
</header>;

export default Header;
import React from 'react';
import Link from '../../Components/FetchLink';

const Nav = () => <div className="nav has-shadow">
  <div className="container">
    <div className="nav-left">
      <Link classname="nav-item is-tab" href="/">Strona główna</Link>
      <Link classname="nav-item is-tab" href="/category/edge-case-2">Kategoria</Link>
    </div>
  </div>
</div>;

export default Nav;
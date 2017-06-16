import React from 'react';
import Link from '../../Components/FetchLink';
import ProgressBar from '../../Components/ProgressBar';

const Nav = () => <div className="nav has-shadow">
  <ProgressBar />
  <div className="container">
    <div className="nav-left">
      <Link classname="nav-item is-tab" href="/">Strona główna</Link>
      <Link classname="nav-item is-tab" href="/category/edge-case-2">Kategoria</Link>
      <Link classname="nav-item is-tab" href="/tag/alignment-2">Tag</Link>
    </div>
  </div>
</div>;

export default Nav;
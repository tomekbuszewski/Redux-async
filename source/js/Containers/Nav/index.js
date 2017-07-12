import React from 'react';

import Link from '../../Components/FetchLink';
import ProgressBar from '../../Components/ProgressBar';
import Search from '../../Components/Search';

import style from './style.css';

const Nav = () => <div className={style.nav}>
  <ProgressBar />
  <Search />
  <div className="container">
    <div className={style.Wrapper}>
      <Link classname={style.Item} href="/">Strona główna</Link>
      <Link classname={style.Item} href="/category/edge-case-2">Kategoria</Link>
      <Link classname={style.Item} href="/tag/alignment-2">Tag</Link>
    </div>
  </div>
</div>;

export default Nav;
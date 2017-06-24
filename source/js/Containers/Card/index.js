import React from 'react';
import Link from '../../Components/FetchLink';

const Card = ({ title, link, thumbnail }) => <article className="box">
  {/*{thumbnail[0].thumbnail !== null ? console.log(thumbnail) : ''}*/}
  <h2 className="title is-5">
    <Link type="post" href={link}>{title}</Link>
  </h2>
</article>;

export default Card;
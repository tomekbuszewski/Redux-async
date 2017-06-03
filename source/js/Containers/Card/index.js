import React from 'react';
import Link from '../../Components/FetchLink';

const Card = ({ title, link }) => <article className="box">
  <h2 className="title is-5">
    <Link type="post" href={link}>{title}</Link>
  </h2>
</article>;

export default Card;
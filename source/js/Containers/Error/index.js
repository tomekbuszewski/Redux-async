import React from 'react';
import Helmet from 'react-helmet';
import Link from  '../../Components/FetchLink';

const Error = () => <div><Helmet><title>Błąd</title></Helmet><div className="notification is-danger">Nie ma takiej strony. <Link href="/">Wróć do strony głównej</Link>.</div></div>;

export default Error;
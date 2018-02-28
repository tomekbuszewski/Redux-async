import React from 'react';

import style from './style.scss';

const PageContainer = ({ children }) => <div className={style.container}>{children}</div>;

export default PageContainer;
import React from 'react';

const Button = ({ variant = '', action = null, children }) => <button onClick={action} className={`button is-small ${variant}`}>{children}</button>;

export default Button;
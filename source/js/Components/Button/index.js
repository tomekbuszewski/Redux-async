import React from 'react';

const Button = ({ variant = '' }) => <button className={`button is-small ${variant}`}>A</button>;

export default Button;
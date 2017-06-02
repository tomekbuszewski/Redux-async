import React from 'react';
/**
 * Simple buttons
 * @param {string} variant - additional class
 * @param {function} action - function to be invoked upon click
 * @param {object} children - component's children
 * @example
 *  <Button action={() => {this.props.fetch('/2017/04/witaj-swiecie/')}}>Fetch post</Button>
 * @constructor
 */
const Button = ({ variant = '', action = null, children }) => <button onClick={action} className={`button is-small ${variant}`}>{children}</button>;

export default Button;
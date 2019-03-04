import React from 'react';
import './Input.css';

const Input = props => { 
  const messages = {
    empty: "Pole nie zostało wypełnione"
  }
  return ( 
    <label htmlFor={props.id}>
      {props.name !== "accept" && props.yourname}
      <input 
        type={props.type}
        id={props.id} 
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      {props.name === "accept" && props.yourname}
      {props.error && props.value.length === 0 && props.name !== "accept" && <span>{messages.empty}</span>}
      {props.error && (props.value.length > 0 || props.name === "accept") && <span>{props.incorrect}</span>}
    </label>
  );
}
 
export default Input;
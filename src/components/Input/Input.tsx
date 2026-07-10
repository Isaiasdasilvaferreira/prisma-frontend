import React, { InputHTMLAttributes, useState } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <div className={`input-wrapper ${focused ? 'input-focused' : ''} ${error ? 'input-error' : ''}`}>
        <input
          className="input-field"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        <div className="input-border" />
      </div>
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
}
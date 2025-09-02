"use client";

import React from "react";

interface LabelTextProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const LabelText: React.FC<LabelTextProps> = ({ id, children, className }) => {
  return (
    <label htmlFor={id} className={`font-semibold text-text ${className}`}>
      {children}
    </label>
  );
};

export default LabelText;

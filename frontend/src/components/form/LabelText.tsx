"use client";

import React from "react";

interface LabelTextProps {
    id: string;
    children: React.ReactNode;
}

const LabelText: React.FC<LabelTextProps> = ({ id, children }) => {
    return (
        <label htmlFor={id} className="font-semibold text-gray-800">
            {children}
        </label>
    );
};

export default LabelText;

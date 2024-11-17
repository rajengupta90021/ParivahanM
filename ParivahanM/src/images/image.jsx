import React from "react";

// Rename component to Images
export const Images = () => {
    return (
        <img
        src="/images/mlogo.png" // Correct path from the public folder
        alt="Logo"
        style={{ width: '76px', height: '76px' }} 
    />    );
};

export default Images;

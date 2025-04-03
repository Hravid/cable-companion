import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-center py-4 border-t text-sm" style={{ 
            backgroundColor: '#9DB2BF',
            borderColor: '#526D82'
        }}>
            <p>
                <a 
                    href="https://github.com/Hravid" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline mx-1"
                    style={{ color: '#27374D' }}
                >
                    GitHub Profile
                </a>
                <span style={{ color: '#27374D' }}>|</span>
                <a 
                    href="mailto:hravidd@proton.me" 
                    className="hover:underline mx-1"
                    style={{ color: '#27374D' }}
                >
                    hravidd@proton.me
                </a>
            </p>
        </footer>
    );
}

export default Footer; 
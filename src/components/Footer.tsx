import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-4 text-center" style={{ background: '#27374D', color: '#DDE6ED' }}>
            <p>© {currentYear} Cable Companion. All rights reserved.</p>
        </footer>
    );
} 
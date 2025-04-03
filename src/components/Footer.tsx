import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-4 text-center" style={{ background: '#27374D', color: '#DDE6ED' }}>
            <p>© {currentYear} Cable Companion. | MiT License</p>
            <div className="mt-2 flex justify-center items-center gap-4">
                <a href="https://github.com/Hravid" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    <FaGithub /> GitHub
                </a>
                <a href="mailto:hravidd@proton.me" className="hover:underline">
                    hravidd@proton.me
                </a>
            </div>
        </footer>
    );
}

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { NAV_LINKS } from '../data/navLinks.js';
import { ChatIcon, SunIcon, MoonIcon } from './icons.jsx';

export default function Navbar({ activeId, onNavClick }) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (event, id) => {
    event.preventDefault();

    onNavClick(id);

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setMenuOpen(false);
  };

  return (
    <nav className="topnav">

      <button
        className="mobile-menu-btn"
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span>☰</span>
      </button>

      <div className="nav-links">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={activeId === link.id ? 'active' : ''}
            onClick={(event) => handleNavClick(event, link.id)}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="nav-right">

        <button
          className="theme-toggle"
          type="button"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <MoonIcon width="18" height="18" />
          ) : (
            <SunIcon width="18" height="18" />
          )}
        </button>

        <button
          className="talk-btn"
          type="button"
          onClick={(event) => handleNavClick(event, 'contact')}
        >
          Let&apos;s Talk
          <ChatIcon width="16" height="16" />
        </button>

      </div>

      {menuOpen && (
        <div className="mobile-nav-menu">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeId === link.id ? 'active' : ''}
              onClick={(event) => handleNavClick(event, link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

    </nav>
  );
}


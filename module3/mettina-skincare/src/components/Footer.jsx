import React from "react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div>
        <h3>Mettina Skin Care</h3>
        <p>Simple products for a healthy skin-care routine.</p>
      </div>

      <div className="footer-links">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("contact"); }}>Contact</a>
      </div>

      <p className="copyright">© 2026 Mettina Skin Care. All rights reserved.</p>
    </footer>
  );
}

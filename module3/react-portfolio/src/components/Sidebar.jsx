import avatarPlaceholder from '../assets/images/profile.jpg';
import { GithubIcon, LinkedinIcon, EmailIcon, PhoneIcon, ArrowRightIcon } from './icons.jsx';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">MA</div>
        <div className="brand-name">
          Metages
          <br />
          Asebe
        </div>
      </div>

      <div className="avatar">
        
          <img src={avatarPlaceholder} alt="Metages Asebe" />
        
      </div>

      <p className="role">Full-Stack Developer</p>
      <p className="location-label">Based in</p>
      <p className="location-value">Ethiopia 🇪🇹</p>

      <div className="socials">
        <a 
          className="icon-btn" 
          href="https://github.com/Mettina" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub" 
          title="GitHub"
        >
          <GithubIcon width="16" height="16" />
        </a>
        <a 
          className="icon-btn" 
          href="https://www.linkedin.com/in/metages-asebe-7248223a2?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn" 
          title="LinkedIn"
        >
          <LinkedinIcon width="16" height="16" />
        </a>
        <a 
          className="icon-btn" 
          href="mailto:metagesasebecs@gmail.com" 
          aria-label="Email" 
          title="Email"
        >
          <EmailIcon width="16" height="16" />
        </a>
        <a 
          className="icon-btn" 
          href="tel:+251-956691899" 
          aria-label="Phone" 
          title="Phone"
        >
          <PhoneIcon width="16" height="16" />
        </a>
      </div>

      <a href="#contact" className="cta-full">
        Let&apos;s Work Together
        <ArrowRightIcon width="16" height="16" />
      </a>
    </aside>
  );
}

import { ThemeProvider } from './context/ThemeContext.jsx';
import { useScrollSpy } from './hooks/useScrollSpy.js';
import { NAV_LINKS } from './data/navLinks.js';

import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';

import Hero from './sections/Hero.jsx';
import Projects from './sections/Projects.jsx';
import About from './sections/About.jsx';
import Education from './sections/EducationalSkils.jsx';
import Contact from './sections/Contact.jsx';

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

function Layout() {
  const [activeId, setActiveId] = useScrollSpy(SECTION_IDS);

  return (
    <div className="page">

      <Sidebar />

      <div className="main-area">

        <Navbar
          activeId={activeId}
          onNavClick={setActiveId}
        />

        <main className="main">
          <Hero />
          <Projects />
          <About />
          <Education />
          <Contact />
        </main>

      </div>

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}


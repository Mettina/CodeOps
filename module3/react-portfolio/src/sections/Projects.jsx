
import project1 from '../assets/images/project1.jpg';
import project2 from '../assets/images/project2.jpg';

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio-section">
      <h2>MY WORK</h2>

      <p>
        Here are some of the projects I have worked on using different
        technologies and development tools.
      </p>

      <div className="projects-grid">

        {/* Project 1 */}
        <div className="project-card">
          <div className="project-image-container">
            <img
              src={project1}
              alt="Wellness Map healthcare locator app"
              className="project-image"
            />
          </div>

          <div className="project-info">
            <h3>Wellness Map</h3>

            <p>
              A mobile healthcare locator app that helps users quickly find
              nearby hospitals and doctors. Users can search for hospitals
              based on their location, view available healthcare facilities,
              and find doctors according to their needs.
            </p>

            <div className="project-tech">
              <span>Flutter</span>
              <span>Firebase</span>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="project-card">
          <div className="project-image-container">
            <img
              src={project2}
              alt="Medanit healthcare application"
              className="project-image"
            />
          </div>

          <div className="project-info">
            <h3>Medanit App</h3>

            <p>
              Medanit is a comprehensive digital health platform designed to
              transform healthcare access in Ethiopia. It integrates
              medications, doctors, diagnostics centers, and hospitals into a
              single, user-friendly ecosystem. Patients can upload
              prescriptions, order medications, and track deliveries—all from
              their phone or through a convenient Telegram bot.
            </p>

            <div className="project-tech">
              <span>MySQL</span>
              <span>PHP</span>
              <span>API</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


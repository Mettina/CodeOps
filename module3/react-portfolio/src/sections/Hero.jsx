import { ArrowUpRightIcon, DownloadIcon } from '../components/icons.jsx';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="blob" />

      <p className="eyebrow">✦ LET&apos;S CREATE!</p>

      <h1 className="headline">
        I&apos;m Metages Asebe,
        <br />
        <span className="accent-line">Full-Stack Developer.</span>
      </h1>

      <p className="sub">I build modern, functional and meaningful digital experiences.</p>

    <div className="hero-ctas">
       <button
         className="btn-primary"
          type="button"
         onClick={() => {
          document.getElementById('portfolio')?.scrollIntoView({
           behavior: 'smooth',
            block: 'start',
           });
         }}
          >
           My Works
          <ArrowUpRightIcon width="16" height="16" />
        </button>
      </div>



      <div className="explore">
        <svg viewBox="0 0 130 130">
          <g className="explore-text">
            <path
              id="circlePath"
              d="M 65,65 m -55,0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0"
              fill="none"
            />
            <text fontSize="10.5" fontWeight="700" letterSpacing="1.5" fill="var(--text)">
              <textPath href="#circlePath" startOffset="0%">
                EXPLORE MY WORK · EXPLORE MY WORK ·
              </textPath>
            </text>
          </g>
          <g
            className="arrow"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="65" y1="52" x2="65" y2="78" />
            <path d="M57 70 L65 78 L73 70" />
          </g>
        </svg>
      </div>
    </section>
  );
}

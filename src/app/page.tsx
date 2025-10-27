import './page.scss';
import Link from 'next/link';

export default function Root() {
  return (
    <div className="home-container">
      {/* <div className="home-watermark-text" aria-hidden="true">WARN</div> */}

      <div className="home-hero">
        <h1 className="home-hero-text">
          <span className="home-hero-line">CODE.</span>
          <span className="home-hero-line">COMMIT.</span>
          <span className="home-hero-line">COLLABORATE.</span>
        </h1>

        {/* <Link href="/auth/signup" className="home-cta-link">
          Get Started →
        </Link> */}
      </div>
    </div>
  );
}

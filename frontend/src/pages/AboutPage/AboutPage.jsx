import React from 'react';
import InfoCard from '../../components/InfoCard/InfoCard';
import './AboutPage.css';

/**
 * About page component
 * Provides information about IEEE VSIT, the workshop, and the certificate system
 */
function AboutPage() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-page__hero" aria-labelledby="about-hero-title">
          <div className="about-page__hero-content">
            <h1 id="about-hero-title" className="about-page__hero-title">
              About IEEE VSIT Workshop
            </h1>
            <p className="about-page__hero-description">
              Learn more about IEEE VSIT, our workshop program, 
              and how our certificate system works.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="about-page__content">
          {/* IEEE VSIT Section */}
          <section className="about-page__section" aria-labelledby="wie-title">
            <h2 id="wie-title" className="about-page__section-title">
              IEEE VSIT
            </h2>
            
            <div className="about-page__text-content">
              <p>
                IEEE Women in Engineering (WIE) is one of the largest international professional organizations 
                dedicated to promoting women engineers and scientists, and inspiring girls around the world 
                to follow their academic interests in a career in engineering and science.
              </p>
              
              <p>
                IEEE WIE comprises more than 20,000 members in over 100 countries. The organization serves 
                as a global network of IEEE members and volunteers dedicated to promoting women in technical 
                fields and encouraging the evolution of these fields to better reflect the diverse populations 
                they serve.
              </p>
            </div>

            <div className="about-page__cards">
              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
                  </svg>
                }
                title="Our Mission"
                variant="primary"
              >
                <p>
                  To facilitate the recruitment and retention of women in technical disciplines globally. 
                  We envision a vibrant community of IEEE women and men collectively using their diverse 
                  talents to innovate for the benefit of humanity.
                </p>
              </InfoCard>

              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16,4C18.11,4 20.11,4.89 21.39,6.39L22.5,5.5C20.86,3.85 18.83,3 16.5,3C14.17,3 12.14,3.85 10.5,5.5L11.61,6.39C12.89,4.89 14.89,4 16,4M16,7C17,7 18,7.45 18.71,8.16L19.82,7.05C18.68,5.91 17.11,5.36 15.5,5.36C13.89,5.36 12.32,5.91 11.18,7.05L12.29,8.16C13,7.45 14,7 16,7M16,10C16.55,10 17,10.45 17,11C17,11.55 16.55,12 16,12C15.45,12 15,11.55 15,11C15,10.45 15.45,10 16,10M21,14V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V14A2,2 0 0,1 5,12H6V10A6,6 0 0,1 12,4A6,6 0 0,1 18,10V12H19A2,2 0 0,1 21,14M8,12H16V10A4,4 0 0,0 12,6A4,4 0 0,0 8,10V12Z" />
                  </svg>
                }
                title="Global Network"
                variant="secondary"
              >
                <p>
                  With over 20,000 members across 100+ countries, IEEE WIE provides a global platform 
                  for networking, mentorship, and professional development opportunities for women in STEM.
                </p>
              </InfoCard>
            </div>
          </section>

          {/* Workshop Section */}
          <section className="about-page__section" aria-labelledby="workshop-title">
            <h2 id="workshop-title" className="about-page__section-title">
              IEEE VSIT Workshop
            </h2>
            
            <div className="about-page__text-content">
              <p>
                The IEEE WIE Day Workshop is an annual event that brings together women in engineering 
                and technology to share knowledge, network, and inspire the next generation of female 
                engineers and scientists.
              </p>
              
              <p>
                Our workshops feature keynote speakers, technical sessions, panel discussions, and 
                networking opportunities designed to advance women's careers in engineering and technology fields.
              </p>
            </div>

            <div className="about-page__cards">
              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,3L1,9L12,15L21,9V16H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
                  </svg>
                }
                title="Learning Opportunities"
                variant="success"
              >
                <p>
                  Participate in technical sessions, workshops, and presentations covering the latest 
                  trends and innovations in engineering and technology.
                </p>
              </InfoCard>

              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16,4C16.88,4 17.67,4.5 18,5.26L20,9H4L6,5.26C6.33,4.5 7.12,4 8,4H16M18.5,9L17,12V22H15V14H9V22H7V12L5.5,9H18.5M13,1V3H11V1H13Z" />
                  </svg>
                }
                title="Networking"
                variant="warning"
              >
                <p>
                  Connect with like-minded professionals, mentors, and industry leaders to expand 
                  your professional network and career opportunities.
                </p>
              </InfoCard>

              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                  </svg>
                }
                title="Career Development"
                variant="neutral"
              >
                <p>
                  Gain insights into career advancement, leadership skills, and strategies for 
                  success in engineering and technology fields.
                </p>
              </InfoCard>
            </div>
          </section>

          {/* Certificate System Section */}
          <section className="about-page__section" aria-labelledby="certificate-title">
            <h2 id="certificate-title" className="about-page__section-title">
              Certificate System
            </h2>
            
            <div className="about-page__text-content">
              <p>
                Our digital certificate system provides a secure and convenient way for workshop 
                participants to obtain their official participation certificates. Each certificate 
                is personalized and verified against our secure attendee database.
              </p>
            </div>

            <div className="about-page__cards">
              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                  </svg>
                }
                title="Secure Verification"
                variant="success"
              >
                <p>
                  Each participant receives a unique verification code that ensures only registered 
                  attendees can generate certificates, maintaining the integrity of our certification process.
                </p>
              </InfoCard>

              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                }
                title="Professional Format"
                variant="primary"
              >
                <p>
                  Certificates are generated in high-quality PDF format, suitable for professional 
                  portfolios, LinkedIn profiles, and career documentation.
                </p>
              </InfoCard>

              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                  </svg>
                }
                title="Instant Access"
                variant="secondary"
              >
                <p>
                  Generate and download your certificate immediately after the workshop. 
                  No waiting periods or manual processing required.
                </p>
              </InfoCard>
            </div>
          </section>

          {/* Contact Section */}
          <section className="about-page__section" aria-labelledby="contact-title">
            <h2 id="contact-title" className="about-page__section-title">
              Get Involved
            </h2>
            
            <div className="about-page__text-content">
              <p>
                Interested in joining IEEE WIE or participating in future workshops? 
                Visit our official website or contact your local IEEE WIE chapter to learn more 
                about upcoming events and membership opportunities.
              </p>
            </div>

            <div className="about-page__cta">
              <a 
                href="https://wie.ieee.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn--primary btn--large"
              >
                Visit IEEE WIE Official Website
                <svg 
                  className="btn__icon" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
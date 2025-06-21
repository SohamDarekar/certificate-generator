import React, { useEffect } from 'react';
import CertificateForm from '../../components/CertificateForm/CertificateForm';
import InfoCard from '../../components/InfoCard/InfoCard';
import { useCertificateApi } from '../../hooks/useCertificateApi';
import './HomePage.css';

/**
 * Home page component
 * Main page for certificate generation with form and helpful information
 */
function HomePage() {
  const { checkHealth } = useCertificateApi();

  // Check API health on component mount
  useEffect(() => {
    checkHealth().then(isHealthy => {
      if (!isHealthy) {
        console.warn('API health check failed - service may be unavailable');
      }
    });
  }, [checkHealth]);

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <section className="home-page__hero-card" aria-labelledby="hero-title">
          <div className="home-page__hero-content">
            <h1 id="hero-title" className="home-page__hero-title">
              IEEE VSIT Workshop
            </h1>
            <span className="home-page__hero-subtitle">
              Certificate Generator
            </span>
            <p className="home-page__hero-description">
              Generate your official participation certificate for the IEEE VSIT Workshop.<br />
              Enter your details below to download your personalized certificate.
            </p>
          </div>
        </section>
        <div className="home-page__divider" />

        {/* Main Content */}
        <div className="home-page__content">
          {/* Certificate Form */}
          <section className="home-page__form-section" aria-labelledby="form-title">
            <div className="sr-only">
              <h2 id="form-title">Certificate Generation Form</h2>
            </div>
            <CertificateForm />
          </section>

          {/* Information Cards */}
          <section className="home-page__info-section" aria-labelledby="info-title">
            <h2 id="info-title" className="home-page__info-title">
              How It Works
            </h2>
            
            <div className="home-page__info-grid">
              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" />
                  </svg>
                }
                title="Enter Your Details"
                variant="primary"
              >
                <p>
                  Provide your full name exactly as you registered for the workshop and your unique verification code.
                </p>
              </InfoCard>

              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z" />
                  </svg>
                }
                title="Instant Verification"
                variant="success"
              >
                <p>
                  Your details are verified against our secure attendee database to ensure certificate authenticity.
                </p>
              </InfoCard>

              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                }
                title="Download Certificate"
                variant="secondary"
              >
                <p>
                  Your personalized PDF certificate will be automatically generated and downloaded to your device.
                </p>
              </InfoCard>
            </div>
          </section>

          {/* Additional Information */}
          <section 
            className="home-page__additional-info" 
            aria-labelledby="additional-info-title"
            style={{ marginBottom: 'var(--space-16)' }} // Added increased bottom margin
          >
            <h2 id="additional-info-title" className="home-page__section-title">
              Important Information
            </h2>
            
            <div className="home-page__info-cards">
              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z" />
                  </svg>
                }
                title="Secure & Private"
                variant="success"
              >
                <p>
                  Your personal information is protected and only used for certificate generation. 
                  We do not store or share your data.
                </p>
              </InfoCard>

              <InfoCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11M11,9H13V7H11" />
                  </svg>
                }
                title="Need Help?"
                variant="warning"
              >
                <p>
                  If you don't have your verification code or encounter any issues, 
                  please contact your workshop organizer for assistance.
                </p>
              </InfoCard>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
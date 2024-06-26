import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles.css';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Faculty Maintenance Management System</title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />

      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" />

      <section id="hero" className="hero d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">Welcome to our Faculty Maintenance System!</h1>
              <h2 data-aos="fade-up" data-aos-delay="400">We specialize in providing tailored solutions for efficiently managing maintenance tasks within the faculty.</h2>
              <div data-aos="fade-up" data-aos-delay="600">
                <div className="text-center text-lg-start">
                  <a href="/Login" className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                    <span>Get Started</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
              <img src="/images/hero-img.png" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>

      <main id="main">
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="row gx-0">
              <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                <div className="content">
                  <h3>Who We Are</h3>
                  <h2>We are a dedicated team committed to simplifying maintenance operations for faculty members.</h2>
                  <p>
                    Our goal is to ensure that every maintenance request is promptly addressed, providing a conducive environment for teaching and learning. Let us help you maintain a safe and functional environment for faculty and students alike. Contact us today to learn more about how we can support your maintenance efforts!
                  </p>
                  <div className="text-center text-lg-start">
                    <a href="#contact" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                      <span>Contact Us</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
                <img src="../images/faculty.jpg" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="values" className="values">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2>Our Values</h2>
              <p>In our faculty maintenance system, tasks are handled meticulously with clear instructions.</p>
            </header>

            <div className="row">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                <div className="box">
                  <img src="../images/values-1.png" className="img-fluid" alt="" />
                  <h3>Efficiency</h3>
                  <p>Our system streamlines maintenance operations, ensuring tasks are handled promptly and efficiently, minimizing downtime and disruptions within the faculty.</p>
                </div>
              </div>

              <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="400">
                <div className="box">
                  <img src="../images/values-2.png" className="img-fluid" alt="" />
                  <h3>Reliability</h3>
                  <p>With a dedicated team and robust infrastructure in place, we guarantee reliable service delivery, ensuring that maintenance requests are addressed with precision and care.</p>
                </div>
              </div>

              <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="600">
                <div className="box">
                  <img src="../images/values-3.png" className="img-fluid" alt="" />
                  <h3>Transparency</h3>
                  <p>We prioritize transparency in our processes, providing clear communication and updates on maintenance tasks to faculty members, fostering trust and accountability within the community.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container" data-aos="fade-up">
            <div style={{ marginTop: '10px' }} className="row feature-icons" data-aos="fade-up">
              <h3>Stay Tuned For Our Upcoming Mobile App</h3>

              <div className="row">
                <div className="col-xl-4 text-center" data-aos="fade-right" data-aos-delay="100">
                  <img src="../images/features-3.png" className="img-fluid p-4" alt="" />
                </div>

                <div className="col-xl-8 d-flex content">
                  <div className="row align-self-center gy-4">
                    <div className="col-md-6 icon-box" data-aos="fade-up">
                      <i className="ri-line-chart-line"></i>
                      <div>
                        <h4>Centralized Maintenance Management</h4>
                        <p>A centralized platform for reporting, tracking, and managing maintenance requests across the entire faculty.</p>
                      </div>
                    </div>

                    <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                      <i className="ri-stack-line"></i>
                      <div>
                        <h4>User-Friendly Reporting</h4>
                        <p>An intuitive interface allowing students and staff to effortlessly report maintenance issues.</p>
                      </div>
                    </div>

                    <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
                      <i className="ri-brush-4-line"></i>
                      <div>
                        <h4>Real-Time Request Tracking</h4>
                        <p>Track maintenance requests in real-time, empowering users to monitor their status.</p>
                      </div>
                    </div>

                    <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="300">
                      <i className="ri-magic-line"></i>
                      <div>
                        <h4>Enhanced Communication</h4>
                        <p>Automated notifications keep users informed about request progress, fostering better communication between faculty and maintenance divisions.</p>
                      </div>
                    </div>

                    <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="400">
                      <i className="ri-command-line"></i>
                      <div>
                        <h4>Built-in Feedback System</h4>
                        <p>Incorporate feedback mechanisms for users to rate and review completed work, ensuring accountability and quality assurance.</p>
                      </div>
                    </div>

                    <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="500">
                      <i className="ri-radar-line"></i>
                      <div>
                        <h4>Efficiency Optimization</h4>
                        <p>Streamline maintenance processes to improve efficiency and ensure timely resolution of issues.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2>Departments</h2>
              <p>Faculty of Engineering, University of Ruhuna</p>
            </header>

            <div className="row gy-4">
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                <div className="service-box blue">
                  <i className="ri-discuss-line icon"></i>
                  <h3>Civil and Environmental Engineering</h3>
                  <p>The Department of Civil and Environmental Engineering offers B.Sc.Eng (Hons) degree, specializing in Civil and Environmental Engineering from the commencement of the faculty in the year 2000.</p>
                  <a href="https://www.eng.ruh.ac.lk/dcee/" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                <div className="service-box orange">
                  <i className="ri-discuss-line icon"></i>
                  <h3>Computer Engineering</h3>
                  <p>Graduates of the B.Sc.Eng. in Computer Engineering can excel across diverse industries as engineers, consultants, researchers, and entrepreneurs, reflecting a broad range of career paths.</p>
                  <a href="https://www.eng.ruh.ac.lk/academic/undergraduate-programs/computer-engineering/" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
                <div className="service-box green">
                  <i className="ri-discuss-line icon"></i>
                  <h3>Electrical and Information Engineering</h3>
                  <p>From its inception in the Year 2000, the Department of Electrical and Information Engineering has become a regional plus national hub for innovation, research excellence, and community services in the country.</p>
                  <a href="https://www.eng.ruh.ac.lk/academic/undergraduate-programs/electrical-information-engineering/" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
                <div className="service-box red">
                  <i className="ri-discuss-line icon"></i>
                  <h3>Marine Engineering and Naval Architecture</h3>
                  <p>This Marine Engineering and Naval Architecture degree program aligns with both international and local accreditation standards.</p>
                  <a href="https://www.eng.ruh.ac.lk/dmme/academics/marine-engineering-and-naval-architecture/" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
                <div className="service-box purple">
                  <i className="ri-discuss-line icon"></i>
                  <h3>Mechanical Engineering</h3>
                  <p>The Department of Mechanical and Manufacturing Engineering offers BScEng (Hons) degree, specializing in Mechanical and Manufacturing Engineering from the commencement of the faculty in the year 2000.</p>
                  <a href="https://www.eng.ruh.ac.lk/dmme/academics/mechanical-and-manufacturing-engineering//" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="700">
                <div className="service-box pink">
                  <i className="ri-discuss-line icon"></i>
                  <h3>Interdisciplinary Studies</h3>
                  <p>The Department of Interdisciplinary Studies (DIS) has mainly designed its curriculum to bridge the gap between the student’s technical skills and personal development.</p>
                  <a href="https://www.eng.ruh.ac.lk/dis/" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2>Contact</h2>
              <p>Contact Us</p>
            </header>

            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <div className="info-box">
                      <i className="bi bi-geo-alt"></i>
                      <h3>Address</h3>
                      <p>Faculty of Engineering,<br />University of Ruhuna, Hapugala, Galle</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-box">
                      <i className="bi bi-telephone"></i>
                      <h3>Call Us</h3>
                      <p>+(94) 912245765<br />+(94) 912245766</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-box">
                      <i className="bi bi-envelope"></i>
                      <h3>Email Us</h3>
                      <p>ar@eng.ruh.ac.lk</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-box">
                      <i className="bi bi-clock"></i>
                      <h3>Fax</h3>
                      <p>+94 912245762</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <form action="forms/contact.php" method="post" className="php-email-form">
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6">
                      <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                    </div>
                    <div className="col-md-12">
                      <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                    </div>
                    <div className="col-md-12">
                      <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                    </div>
                    <div className="col-md-12 text-center">
                      <div className="loading">Loading</div>
                      <div className="error-message"></div>
                      <div className="sent-message">Your message has been sent. Thank you!</div>
                      <button type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </div>
  );
}

import React from 'react';
import '../styles.css';


export default function Home() {
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
                  <a href="/" className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
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

      <main id="main"/>
 
        <section id="about" class="about">
          <div class="container" data-aos="fade-up">
            <div class="row gx-0">
              <div class="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                <div class="content">
                  <h3>Who We Are</h3>
                  <h2>We are a dedicated team committed to simplifying maintenance operations for faculty members. </h2>
                  <p>
                  Our goal is to ensure that every maintenance request is promptly addressed, providing a conducive environment for teaching and learning.
                  Let us help you maintain a safe and functional environment for faculty and students alike.Contact us today to learn more about how we can support your maintenance efforts!

                  </p>
                  <div class="text-center text-lg-start">
                    <a href="#contact" class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                      <span>Contact Us</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
                <img src="../images/faculty.jpg" class="img-fluid" alt=""/>
              </div>
            </div>
          </div>
        </section>

        <section id="values" class="values">

<div class="container" data-aos="fade-up">

  <header class="section-header">
    <h2>Our Values</h2>
    <p>In our faculty maintenance system, tasks are handled meticulously with clear instructions.</p>
  </header>

  <div class="row">

    <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
      <div class="box">
        <img src="../images/values-1.png" class="img-fluid" alt=""/>
        <h3>Efficiency</h3>
        <p>Our system streamlines maintenance operations, ensuring tasks are handled promptly and efficiently, minimizing downtime and disruptions within the faculty.</p>
      </div>
    </div>

    <div class="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="400">
      <div class="box">
        <img src="../images/values-2.png" class="img-fluid" alt=""/>
        <h3>Reliability</h3>
        <p>With a dedicated team and robust infrastructure in place, we guarantee reliable service delivery, ensuring that maintenance requests are addressed with precision and care.</p>
      </div>
    </div>

    <div class="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="600">
      <div class="box">
        <img src="../images/values-3.png" class="img-fluid" alt=""/>
        <h3>Transparency</h3>
        <p>We prioritize transparency in our processes, providing clear communication and updates on maintenance tasks to faculty members, fostering trust and accountability within the community.</p>
      </div>
    </div>

  </div>

</div>

</section>

<section  id="features" class="features">

<div class="container"  data-aos="fade-up">
  <div style={{ marginTop: '10px' }}class="row feature-icons" data-aos="fade-up">
          <h3  > Catch us on our Mobile App</h3>

          <div class="row">

            <div class="col-xl-4 text-center" data-aos="fade-right" data-aos-delay="100">
              <img src="../images/features-3.png" class="img-fluid p-4" alt=""/>
            </div>

            <div class="col-xl-8 d-flex content">
              <div class="row align-self-center gy-4">

                <div class="col-md-6 icon-box" data-aos="fade-up">
                  <i class="ri-line-chart-line"></i>
                  <div>
                    <h4>Centralized Maintenance Management</h4>
                    <p>A centralized platform for reporting, tracking, and managing maintenance requests across the entire faculty.</p>
                  </div>
                </div>

                <div class="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                  <i class="ri-stack-line"></i>
                  <div>
                    <h4>User-Friendly Reporting</h4>
                    <p>An intuitive interface allowing students and staff to effortlessly report maintenance issues.</p>
                  </div>
                </div>

                <div class="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
                  <i class="ri-brush-4-line"></i>
                  <div>
                    <h4>Real-Time Request Tracking</h4>
                    <p>Track maintenance requests in real-time, empowering users to monitor their status.</p>
                  </div>
                </div>

                <div class="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="300">
                  <i class="ri-magic-line"></i>
                  <div>
                    <h4>Enhanced Communication</h4>
                    <p>Automated notifications keep users informed about request progress, fostering better communication between faculty and maintenance divisions.</p>
                  </div>
                </div>

                <div class="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="400">
                  <i class="ri-command-line"></i>
                  <div>
                    <h4>Built-in Feedback System</h4>
                    <p>Incorporate feedback mechanisms for users to rate and review completed work, ensuring accountability and quality assurance.</p>
                  </div>
                </div>

                <div class="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="500">
                  <i class="ri-radar-line"></i>
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

    <section id="services" class="services">

      <div class="container" data-aos="fade-up">

        <header class="section-header">
          <h2>Departments</h2>
          <p>Faculty of Engineering, University of Ruhuna </p>
        </header>

        <div class="row gy-4">

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="service-box blue">
              <i class="ri-discuss-line icon"></i>
              <h3>Cvil and Environment Engineering</h3>
              <p>The Department of Civil and Environmental Engineering offers B.Sc.Eng (Hons) degree, specializing in Civil and Environmental Engineering from the commencement of the faculty in the year 2000.</p>
              <a href="https://www.eng.ruh.ac.lk/dcee/" class="read-more"><span>Read More</span> <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div class="service-box orange">
              <i class="ri-discuss-line icon"></i>
              <h3>Computer Engineering</h3>
              <p>Graduates of the B.Sc.Eng. in Computer Engineering can excel across diverse industries as engineers, consultants, researchers, and entrepreneurs, reflecting a broad range of career paths. </p>
              <a href="https://www.eng.ruh.ac.lk/academic/undergraduate-programs/computer-engineering/" class="read-more"><span>Read More</span> <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div class="service-box green">
              <i class="ri-discuss-line icon"></i>
              <h3>Electrical and Information Engineering</h3>
              <p>From its inception in the Year 2000, the Department of Electrical and Information Engineering has become a regional plus national hub for innovation, 
                research excellence, and community services in the country. </p>
              <a href="https://www.eng.ruh.ac.lk/academic/undergraduate-programs/electrical-information-engineering/" class="read-more"><span>Read More</span> <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
            <div class="service-box red">
              <i class="ri-discuss-line icon"></i>
              <h3>Marine Engineering and Naval Architecture</h3>
              <p>This Marine Engineering and Naval Architecture degree program aligns with both international and local accreditation standards. </p>
              <a href="https://www.eng.ruh.ac.lk/dmme/academics/marine-engineering-and-naval-architecture/" class="read-more"><span>Read More</span> <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
            <div class="service-box purple">
              <i class="ri-discuss-line icon"></i>
              <h3>Mechanical Engineering </h3>
              <p>The Department of Mechanical and Manufacturing Engineering offers BScEng (Hons) degree, specializing in Mechanical and Manufacturing Engineering from the commencement of the faculty in the year 2000. </p>
              <a href="https://www.eng.ruh.ac.lk/dmme/academics/mechanical-and-manufacturing-engineering//" class="read-more"><span>Read More</span> <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="700">
            <div class="service-box pink">
              <i class="ri-discuss-line icon"></i>
              <h3>Interdisciplinary Studies</h3>
              <p>The Department of Interdisciplinary Studies (DIS) has mainly designed its curriculum to bridge the gap between the student’s technical skills and personal development.</p>
              <a href="https://www.eng.ruh.ac.lk/dis/" class="read-more"><span>Read More</span> <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

        </div>

      </div>

    </section>
    <section id="contact" class="contact">
  <div class="container" data-aos="fade-up">
    <header class="section-header">
      <h2>Contact</h2>
      <p>Contact Us</p>
    </header>
    <div class="row gy-4">
      <div class="col-lg-6">
        <div class="row gy-4">
          <div class="col-md-6">
            <div class="info-box">
              <i class="bi bi-geo-alt"></i>
              <h3>Address</h3>
              <p>Faculty of Engineering,,<br />University of Ruhuna, Hapugala, Galle,</p> 
            </div>
          </div>
          <div class="col-md-6">
            <div class="info-box">
              <i class="bi bi-telephone"></i>
              <h3>Call Us</h3>
              <p>+(94) 912245765<br />+(94) 912245766,</p> 
            </div>
          </div>
          <div class="col-md-6">
            <div class="info-box">
              <i class="bi bi-envelope"></i>
              <h3>Email Us</h3>
              <p>ar@eng.ruh.ac.lk</p> 
            </div>
          </div>
          <div class="col-md-6">
            <div class="info-box">
              <i class="bi bi-clock"></i>
              <h3>Fax</h3>
              <p>+94 912245762</p> 
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <form action="forms/contact.php" method="post" class="php-email-form">
          <div class="row gy-4">
            <div class="col-md-6">
              <input type="text" name="name" class="form-control" placeholder="Your Name" required />
            </div>
            <div class="col-md-6">
              <input type="email" class="form-control" name="email" placeholder="Your Email" required />
            </div>
            <div class="col-md-12">
              <input type="text" class="form-control" name="subject" placeholder="Subject" required />
            </div>
            <div class="col-md-12">
              <textarea class="form-control" name="message" rows="6" placeholder="Message" required></textarea>
            </div>
            <div class="col-md-12 text-center">
              <div class="loading">Loading</div>
              <div class="error-message"></div>
              <div class="sent-message">Your message has been sent. Thank you!</div>
              <button type="submit">Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>




        </div>
        
        
      
      );
}
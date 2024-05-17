import React from 'react';
import 'remixicon/fonts/remixicon.css';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
     <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5 col-md-12 footer-info">
              <a href="/" className="logo d-flex align-items-center">
                <img src="assets/img/logo.png" alt="" />
                <span>ENG FMMS</span>
              </a>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" rel="stylesheet"/>

              <p>The Faculty of Engineering of University of Ruhuna was established on 1st July 1999 at Hapugala, Galle.  Admission to the Faculty of Engineering, University of Ruhuna, is subject to the University Grants Commission policy on university admissions.</p>
              <div className="social-links mt-3">
                <a href="https://www.eng.ruh.ac.lk/dmme/" className="twitter"><i className="bi bi-twitter"></i></a>
                <a href="https://www.facebook.com/EfacUOR/" className="facebook"><i className="bi bi-facebook"></i></a>
               
                <a href="https://www.linkedin.com/company/faculty-of-engineering-university-of-ruhuna/mycompany/verification/" className="linkedin"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>

            <div className="col-lg-2 col-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Home</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#about">About us</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#contact">Contact Us</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Privacy policy</a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><i className="bi bi-chevron-right"></i> <a href="https://www.ruh.ac.lk/index.php/en/">University of Ruhuna</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="https://www.eng.ruh.ac.lk/">Faculty of Engineering</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="http://paravi.ruh.ac.lk/foenmis/index.php">ENG-MIS</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#https://www.lib.ruh.ac.lk/Eng/index.php">Library</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="https://www.iesl.lk/index.php?lang=en">IESL</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Contact Us</h4>
              <p>
              Faculty of Engineering <br />
              University of Ruhuna<br />
              Hapugala,<br />
              Galle <br /><br />
                <strong>Phone:</strong> +1 5589 55488 55<br />
                <strong>Email:</strong> info@example.com<br />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong><span>FMMS</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
          <p>@2024</p>
        </div>
      </div>
    </footer>

    
  );
}

export default Footer;

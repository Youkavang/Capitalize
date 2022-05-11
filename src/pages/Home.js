import React from 'react'
import workplace from '../img/workplace.jpg';
import mketechhub3 from "../img/mketechhub3.jpg";
import tech from '../img/tech.jpg';
import gender from '../img/Gender.jpg';
import mketechhub5 from '../img/mketechhub5.jpg';
import mketechhub4 from '../img/mketechhub4.jpg';
import mketechhub from '../img/mketech.png';
import dt from '../img/dt.jpg';
import './Home.css';

function Home() {
  return (
    <div className="App">
        <section className="header">
          {/* <nav>
              <div class="nav-links" id="navLinks">
                  <i class="fa fa-times" onclick="hideMenu()"></i>
                  <ul>
                      <li><a href="">HOME</a></li>
                      <li><a href="">ABOUT</a></li>
                      <li><a href="">COURSE</a></li>
                      <li><a href="">BLOG</a></li>
                      <li><a href="">CONTACT</a></li>
                  </ul>
              </div>
              <i class="fa fa-bars" onClick="showMenu()"></i>
          </nav> */}
          <div className="text-box">
              <h1>MKE Tech Hub Coalition</h1>
              <p>Creating opportunites to expand the world of tech <br/>and to show that a future in technology is everlasting and amazing.</p>
              <a href="https://www.mketech.org/" className="hero-btn">Visit Us To Know More</a>
          </div>
      </section>
      <section className="course">
      <h1>Upcoming Techonology Events</h1>
      <p>Are you interested in a career in tech? You have come to the right place! Have no fear, we are here to help!</p>
  <div className="row">
  <div className="course-col">
      <h3>About Us</h3>
      <p>We are a company that is giving back to help the community.</p>
  </div>
  <div className="course-col">
      <h3>Future Plans</h3>
      <p>We plan to have at least 50 tech events to bring outsiders from Milwaukee an opportunity to showcase their tech abilities.</p>
  </div>
  <div className="course-col">
      <h3>Contact Us</h3>
      <p>Do you need have further questions or would like to schedule a coffee chat with our staff? Feel free to contact us through our email:mketechhub@icstars.org</p>
  </div>
      </div>
  </section>
  <section className="Events">
      <h1>Tech Events Happening Soon</h1>
      <p>Interested in technology but can't figure out when these events are located? Click here!</p>
      <div className="row">
          <div className="Events-col">
              <img src={workplace}/>
              <div className="layer">
                <h3>Milwaukee</h3>  
              </div>
          </div>
        </div>
          <div className="row">
              <div className="Events-col">
                  <img src={mketechhub3}/>
                  <div className="layer">
                    <h3>Eastside</h3>  
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="Events-col">
              <img src={tech}/>
               <div className="layer">
                <h3>Westside</h3>  
              </div>
            </div>
          </div>
  </section>
  <div className='first-border'></div>
  <section className="facilities">
      <h1> Our facilities</h1>
      <p>Practice run to see how this would look on our website!</p>
  <div className="row">
      <div className="facilities-col">
          <img src={gender}/>
           <h3>Gender Roles in technology</h3>
          <p>Practice run to see how this would look on our website!</p>
      </div>
      <div className="facilities-col">
          <img src={mketechhub5}/>
          <h3>Minorities in Techonology</h3>
          <p>Practice run to see how this would look on our website!</p>
  </div>
  <div className="facilities-col">
      <img src={mketechhub4}/>
      <h3>Technophobia</h3>
      <p>Practice run to see how this would look on our website!</p>
  </div>
  </div>
  </section>
  <div className='border'></div>
  <section className="testimonials">
      <h1>What Our Clients Would Say</h1>
      <p>Practice run to see how this would look on our website!</p>
      <div className="row">
          <div className="testimonial-col">
              <img src={mketechhub}/> 
              <div>
              <p>Practice run to see how this would look on our website!</p>
              <h3>Changing Faces</h3>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
              </div>
          </div>
          <div className="testimonial-col">
              <img src={dt}/>
               <div>
              <p>Practice run to see how this would look on our website!</p>
              <h3>Technology Ruining Our Generation?</h3>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
              </div>
          </div>
      </div>
  </section>
  <div className='border'></div>
  <section className="cta">
      <h1>Sign Up To Become A Member</h1>
      <a href="">CONTACT US</a>
      </section>
      </div>
  )
}

export default Home
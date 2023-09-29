import React from "react";
import "./Aboutus.css";

const About=()=>{
 return(
    <div className="aboutuspage">
        
        <div className="aboutuscontent">
            <h1 className="about-us-heading">Who we are</h1>
            We are a young, passionate team aspiring to become recognized professionals and a trusted online solutions company. We provide critical Real-Time Information & Data to improve operational efficiency in various industries.

             In today's world, instant information shapes our decisions and impacts our lives. Real-time data helps companies identify and fix problems before they escalate. It's essential for smart business decisions.

            Real-time information is changing how companies manage resources. It provides valuable insights for accurate and swift operations. No more waiting until the end of the month to assess resource effectiveness.
            <img src='/aboutUs.jpeg' alt="core values"/>
        </div>
        <div className="aboutuscontent">
            <h1 className="about-us-heading">
                what we do
            </h1>
            The growing need for instant business information has led Algomatix Technology to develop real-time solutions. Our solutions enable customers to quickly gather and analyze real-time data, saving valuable time and resources.

            Real-Time Information (RTI) and Real-Time Analytics (RTA) are significant achievements made possible by the Internet of Things (IoT).

            Access to real-time data helps eliminate inefficiencies, making life simpler and more efficient. We aim to create data-rich environments that provide added value and a competitive edge with Algomatix solutions.
           
        </div>
    </div>    
 )
}
export default About;
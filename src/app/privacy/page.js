"use client";
import { useEffect, useState } from "react";
import NavicationHome from "../components/NavicationHome";
import Footer from "../components/Footer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";

export default function pricing() {


  return (
    <>
      <Head>
        <title>Icons Page </title>
        <meta name="description" content="IconsGuru provides a comprehensive library of free and premium icons that you can instantly download and customize to any size. Perfect for designers, developers, and creatives looking for high-quality, scalable icons to enhance their projects. Discover icons that fit your design needs seamlessly." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavicationHome/>
      <main className="mian-text01 privacy-page w-100 float-left">
         <div className="container">
             <h2 className="comon-cont-head"> Privacy policy </h2>
             <p className="mt-3"> Welcome to <strong> IconsGuru.com! </strong> Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you access our icon library offering premium icons, free icons, and downloadable SVG icons. 
              By using our website, you agree to the practices described in this policy. </p>
              <h5> 1. Information We Collect </h5>
              <p> When you visit <strong> IconsGuru.com,</strong> we may collect: </p>
              <ul>
                <li> <strong>	Personal Information: </strong> If you sign up for updates or purchase premium icons, we may ask for your name,
                   email address, billing information, and other relevant details.</li>
                <li> <strong>	Non-Personal Information: </strong> We automatically collect data such as your IP address, browser type, device information, and the pages you 
                visit (including popular searches like “SVG icons down” and “free icon” categories). </li>
              </ul>
              <h5> 2. How We Use Your Information </h5>
              <p> We use your information to: </p>
              <ul>
                <li>
                  Provide access to our extensive <strong> icon library. </strong>
                </li>
                <li>
                 	Process transactions for  <strong> premium icons </strong> and other paid services.
                </li>
                <li>
                  Send important updates, promotions, or news about free icons and premium collections.
                </li>
                <li>
                  Improve the functionality and performance of <strong> IconsGuru.com. </strong>
                </li>
                <li>
                 	Analyze how users interact with content, including free icon downloads and SVG icons down, to enhance user experience.
                </li>
              </ul>
             
             <h5 className="mt-5"> Cookies and Tracking Technologies </h5>
             <p className="mt-3 mb-2"> We use cookies and similar technologies to: </p>
             <ul>
              <li>
                Remember your preferences when browsing our <strong> icon library. </strong>
              </li>
              <li>
              	Offer personalized recommendations (like new free icons or trending premium icon packs).
              </li>
              <li>
              	Monitor site performance and usage trends, such as the demand for SVG icons downloads.
              </li>
             </ul>
             <p> You can control cookies through your browser settings. However, disabling cookies may affect your experience on
              <strong> IconsGuru.com. </strong> </p>
            <h5 className="mt-5"> Sharing Your Information </h5>
             
              <p> We do <strong> not </strong> sell, rent, or share your personal information with third parties for their marketing purposes. However, we may share information with trusted service providers who help us operate the website
                 (such as payment processors for premium icons or hosting services).</p>

             <h5 className="mt-5"> Data Security </h5>
             
             <p> We implement strict security measures to protect your information from unauthorized access, alteration,
               disclosure, or destruction. Whether you're browsing free icons or
               purchasing premium icon bundles, we ensure that your data is securely handled.</p>

             <h5 className="mt-5"> Your Choices and Rights </h5>

             <p> You have the right to: </p>
             <ul>
               <li> Access the information we hold about you. </li>
               <li> Request correction or deletion of your data. </li>
               <li> Opt out of marketing communications at any time. </li>
             </ul>
             <p> To exercise your rights, please contact us at <strong> [insert contact email]. </strong> </p>

             <h5 className="mt-5"> 7. External Links </h5>
             <p> Our website may include links to third-party sites, especially resources for additional SVG icons or graphic design tools. We are not 
              responsible for the privacy practices of these external sites. </p>

             <h5 className="mt-5"> 8. Children's Privacy </h5>
             <p> <strong> IconsGuru.com  </strong> does not knowingly collect personal information from individuals under the age of 13. If we learn that
               we have collected information from a child, we will promptly delete it.</p>

             <h5 className="mt-5"> 9. Updates to This Policy </h5>
             <p> We may update our Privacy Policy from time to time to reflect changes in our services or legal requirements.
               Updates will be posted on this page with a revised effective date. </p>

             <p> We recommend you check back periodically, especially if you frequently download <strong> free icons </strong> or 
              purchase new <strong> premium icons </strong> from our ever-growing <strong> icon library. </strong> </p>

             <h5 className="mt-5"> 10. Contact Us </h5>
             <p> If you have any questions or concerns about this Privacy Policy or our practices regarding <strong> SVG icons down, </strong>
               free icons, or premium icons, please contact us.. </p>
             
             
         </div>

      </main>


      <Footer/>
    </>
  );
}

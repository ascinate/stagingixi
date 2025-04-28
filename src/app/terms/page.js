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
        <title>Icons Page</title>
        <meta name="description" content="IconsGuru provides a comprehensive library of free and premium icons that you can instantly download and customize to any size. Perfect for designers, developers, and creatives looking for high-quality, scalable icons to enhance their projects. Discover icons that fit your design needs seamlessly." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavicationHome/>
      <main className="mian-text01 privacy-page w-100 float-left">
      <div className="container">
             <h2 className="comon-cont-head"> Privacy policy </h2>
             <p className="mt-3"> These Terms & Conditions (&quot;Terms&quot;) govern your access to and use of IconsGuru.com (&quot;Website&quot;), including all services and resources related to 
              our premium icons, SVG icons download, icon library, and free icons. </p>
             <p className="mt-2"> By accessing or using IconsGuru, you agree to these Terms.
               If you do not agree, you may not use the Website. </p>
             <h5 className="mt-5"> 1. Use of Our Services </h5>
             <p className="mt-3 mb-2"> IconsGuru offers users access to a curated icon library featuring a wide range of free icons
               and premium icons available for SVG icons download and other formats. </p>
             <p> You are granted a limited, non-exclusive, non-transferable license to use the icons for personal 
              and commercial purposes, subject to compliance with these Terms. </p>
             <h5 className="mt-5"> Prohibited Uses: </h5>
             <ul className="mt-3">
               <li>
                 Reselling or redistributing icons without modification or as part of a competing service.
               </li>
               <li>
                Using icons in a manner that violates applicable laws or regulations.
               </li>
               <li>
                Misrepresenting ownership of the icons from IconsGuru.
               </li>
             </ul>
             <h5 className="mt-5"> 2. Intellectual Property Rights </h5>
             <p> All icons, graphics, branding materials, and website content remain the property of IconsGuru or its licensors. The icons available through our icon
               library, whether free icons or premium icons, are protected by copyright laws. </p>
             <p>  You may use the icons as permitted, but you may not claim ownership, 
             sublicense, or exploit the icons beyond the scope outlined in these Terms.</p>
             <h5 className="mt-5"> 3. Account Registration </h5>
             <p> Some features, such as access to premium icons or bulk SVG icons download, may require you to create an account. 
              You agree to provide accurate information and keep your login credentials secure. </p>
             <p> IconsGuru is not liable for any unauthorized access or activities conducted through your account. </p>
             <h5 className="mt-5"> 4. Pricing and Payments </h5>
             <p> IconsGuru offers a selection of free icons and paid access to premium icons. </p>
             <p> Pricing details are clearly listed, and payments are processed securely. All sales are final unless otherwise stated. IconsGuru reserves the right
               to update pricing, subscriptions, and offerings at any time. </p>
             <h5 className="mt-5"> 5. Disclaimer </h5>
             <p> IconsGuru provides the icon library &quot;as-is&quot; and &quot;as-available.&quot; We do not guarantee that the SVG icons
               download or any other service will be uninterrupted, error-free, or secure. </p>
             <p> We are not responsible for any damages resulting from the use or inability to use our icons, 
              whether free or premium. </p>
             <h5 className="mt-5"> Third-Party Links </h5>
             <p> The Website may contain links to third-party websites. IconsGuru is not responsible
               for the content, terms, or privacy practices of external sites. </p>
             <p> Accessing third-party websites is at your own risk. </p>
             <h5 className="mt-5"> 7. Changes to Terms </h5>
             <p> IconsGuru may update these Terms from time to time. Changes are effective when posted. Your continued use of
               the Website after changes are made constitutes acceptance of the updated Terms. </p>
             <p> We recommend you review these Terms periodically. </p>
             <h5 className="mt-5"> 8. Termination </h5>
             <p> We may suspend or terminate your access to IconsGuru at any time for violations of these Terms or misuse of our icon library, 
              including free icon downloads and premium icons usage. </p>
             <h5 className="mt-5"> 9. Contact Us </h5>
             <p> For questions about these Terms, your account, or licensing options for our SVG icons download,
               free icons, or premium icons, please contact: </p>
             <p> IconsGuru Team  <Link href="mailto:support@iconsguru.com"> Email:support@iconsguru.com </Link> </p>
         </div>

      </main>


      <Footer/>
    </>
  );
}

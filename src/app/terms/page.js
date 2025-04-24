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
             <p className="mt-3"> These terms of use govern the access, browsing and use of Icons Mind by their users the download and use of certain content owned by Icons Mind as well as the services rendered through the website.Iconsguru Icons can modify the Terms of Use any time 
              and thus we recommended that the Terms are reviewed on a regular basis by the user. </p>
             <p className="mt-2"> Likewise, in respect of collection and processing personal data, the Privacy Policy will apply. </p>
             <h5 className="mt-5"> PURPOSE OF WEBSITE </h5>
             <p className="mt-3 mb-2"> Through the website, you, the user, can search visual content 
              in any format, as well as specific information related to such content.</p>
             <p> The services may search and locate, as a result of the search performed by the user, third party content offered for free over the internet. However, the service ma provide, in result of that search, content owned by Icons Mind along with third party Content not offered free of charge. Both the Icons Mind 
              content and sponsored content are differentiated and identified on search results.</p>
             <h5 className="mt-5"> AUTHORIZED USE OF THE WEBSITE </h5>
             <p> If the user acts on behalf of any business, they will have to declare that they are authorized to bind
               such business and that business will be bound to the Terms of Use.</p>
             <p> 
             The User is responsible of ensuring prior to using the services that the features of the services meet the needs and that have all requirements, equipment and software necessary for this purpose.
             When providing the Services, Iconsguru Icons can publish advertising either related or not to the searched content.</p>
             <h5 className="mt-5"> REGISTRATION </h5>
             <p> In order to use Iconsguru Icons services, users must register by creating a username and password and activating an account.
             The User is responsible for all operations carried out through the Userâ€™s account through any device. Iconsguru Icons may and will suspend the account of the User if it considers that the User has breached these Terms.</p>
             <h5 className="mt-5"> GENERAL AND CONTACT INFORMATION </h5>
             <p> The use of the Icons Mind website and their services shall be governed by XX Law.

            If any provision in the Terms of Use is declared to invalid or unenforceable, it shall be deemed that it had not been included. The remaining provisions in these Terms shall not be affected in anyway.

            For any inquiries, you can contact Iconsguru Icons here:www.Iconsguruicons.com/contact

            Your Consent By using our site, you consent to our privacy policy.</p>
         </div>

      </main>


      <Footer/>
    </>
  );
}

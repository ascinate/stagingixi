
import Image from "next/image";
import styles from "./page.module.css";
import CategorySlider from "./components/CategorySlider";
import NavicationHome from "./components/NavicationHome";
import BannerHome from "./components/BannerHome";
import Link from "next/link";
import Footer from "./components/Footer";
import Head from "next/head";



async function getTotalIcons() {
  try {
    const res = await fetch("http://iconsguru.ascinatetech.com/api/icons/total-count", {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.total || 0;
  } catch (err) {
    console.error("Server icon count error:", err);
    return 0;
  }
}

export default async function Home() {
  const totalIcons = await getTotalIcons();

    const icontypes = [    { id: 1, title: 'Arrow' , counting: '144', tag:"", img: '/arrow.svg', link: '/icons/arrow'  },    { id: 2, title: 'Business' , counting: '65', tag:"New", img: '/business.svg', link: '/icons/business'  },    { id: 3, title: 'Device' , counting: '118', tag:"", img: '/device.svg', link: '/icons/device'  },    { id: 4, title: 'Music' , counting: '200', tag:"", img: '/Music.svg', link: '/icons/music'  },    { id: 5, title: 'home' , counting: '49', tag:"", img: '/home.svg', link: '/icons/home'  },    { id: 6, title: 'Interface' , counting: '89', tag:"", img: '/interface.svg', link: '/icons/interface'  },  ];  
    const categorytypes = [    { id: 1, title: 'Thin' , counting: '450', tag:"", img: '/tine1.svg', link: '/icons/thin'  },    { id: 2, title: 'Solid' , counting: '590', tag:"New", img: '/solid1.svg', link: '/icons/solid'  },    { id: 3, title: 'Regular' , counting: '387', tag:"", img: '/regulari.svg', link: '/icons/regular'  }  ];

  
  
  return (
    <>
     <Head>
        <title>Free Icons, Vector Icons - SVG, PNG, WEBP</title>
        <meta name="description" content="IconsGuru provides a comprehensive library of free and premium icons that you can instantly download and customize to any size. Perfect for designers, developers, and creatives looking for high-quality, scalable icons to enhance their projects. Discover icons that fit your design needs seamlessly." />
        <meta name="keywords" content="icon downloads, customizable icons, high-quality vector icons, free icons for websites, premium icons for designers, icon size customization, icon resources, digital design icons, creative icons, UI icons, scalable icons, instant icon downloads, professional icon library" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
   <NavicationHome/>
   <BannerHome totalIcons={totalIcons} />

   <main className="float-start w-100 main-body">
         <section className="float-start about-sections comon-short-parts w-100">
             <aside className="container">
                 <div className="row row-cols-1 row-cols-md-2 flex-column-reverse align-items-center">
                    <div className="col">
                       <div className="ab-left">
                          <h2 className="comon-head"> Your workflow <span className="d-lg-block"> been never so fast </span> </h2>
                          <p className="col-lg-8 mt-2"> We’ve developed from scratch our tools to browse, customize and quickly use our assets. Drop our icons and. </p>
                          <Link href='/icons' className="btn btn-expolre mt-3"> Explore now </Link>
                          
                       </div>
                    </div>
                    <div className="col">
                       <figure className="mt-3 m-md-0">
                           <Image loading="lazy" src="/musics.svg"
                                        alt="user"
                                        width={500}
                                        height={383} />
                       </figure>
                    </div>
                 </div>
             </aside>
         </section>

         <section className="float-start fetures-acountins-sections w-100">
            <div className="container">
                <h2 className="text-center comon-head"> Featured premium icon sets </h2>
                <p className="text-center"> Download the perfection and largest unique icons drawn by hand. </p>

                  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 gy-4 g-lg-4 mt-5">

                    {icontypes.map((type) => (
                              <div className="col" key={type.id}>
                                <article className="d-inline-block w-100 comon-types01 position-relative">
                                <span className="tagsd">{type.tag}</span>
                                  <figure className="text-center mx-auto d-block mb-1">
                                    <Link href={type.link}> <Image loading="lazy" src={type.img}
                                          alt="user"
                                          width={260}
                                          height={178} /> </Link>
                                  </figure>
                                  <span className="d-flex icon-list-name col-lg-10 mx-auto align-items-center justify-content-between">
                                      <h5 className="mb-0"> 
                                        <Link href={type.link}> 
                                          {type.title}
                                        </Link>
                                      </h5>
                                      <Link className="coun-text" href={type.link}> 
                                          
                                       <strong> {type.counting}</strong> icons
                                      </Link>
                                      
                                  </span>
                                </article>
                              </div>
                          ))}
                      
                  </div>

            </div>
         </section>

         <section className="float-start about-sections comon-short-parts w-100">
             <aside className="container">
                 <div className="row row-cols-1 row-cols-md-2 align-items-center">
                    <div className="col">
                       <div className="ab-left">
                          <h2 className="comon-head"> All the style that <span className="d-lg-block"> you need! </span> </h2>
                          <p className="col-lg-8 mt-2"> We’ve developed from scratch our tools to browse, customize and quickly us.  </p>
                          <ul className="p-0 m-0 fe-list mt-4">
                            <li className="d-flex align-items-baseline">
                                <span className="icoh">
                                  <Image loading="lazy" src="/flag.svg"
                                        alt="user"
                                        width={32}
                                        height={32} />
                                
                                </span>
                                <h5 className="ms-3"> Line black 
                                  <small className="d-block"> We offer 3 style of line icons  </small> 
                                </h5>
                            </li>
                            <li className="d-flex align-items-baseline">
                                <span className="icoh">
                                  <Image loading="lazy" src="/fill-b.svg"
                                        alt="user"
                                        width={32}
                                        height={32} />
                                
                                </span>
                                <h5 className="ms-3"> Fill black 
                                  <small className="d-block"> This style is great for you project  </small> 
                                </h5>
                            </li>
                            <li className="d-flex align-items-baseline">
                                <span className="icoh">
                                  <Image loading="lazy" src="/color.svg"
                                        alt="user"
                                        width={32}
                                        height={32} />
                                
                                </span>
                                <h5 className="ms-3"> Colors 
                                  <small className="d-block"> We offer 5 style of line icons   </small> 
                                </h5>
                            </li>
                          </ul>
                       </div>
                    </div>
                    <div className="col">
                       <figure className="m-0">
                           <Image loading="lazy" src="/style-icon.svg"
                                        alt="user"
                                        width={500}
                                        height={383} />
                       </figure>
                    </div>
                 </div>
             </aside>
         </section>

         <section className="float-start w-100 comon-short-parts types-catg-sections">
             <div className="container">
                <h2 className="text-center comon-head"> Professional Icon Set Features </h2>
                <p className="text-center"> Download the perfection and largest unique icons drawn by hand. </p>
                <div className="row row-cols-1 row-cols-sm-2  justify-content-center justify-content-lg-between show-list04 row-cols-lg-3 gy-4 g-lg-4 mt-5 categort-list01">

                {categorytypes.map((type) => (
                              <div className="col" key={type.id}>
                                <article className="d-inline-block w-100 comon-types01 position-relative">
                                <span className="tagsd">{type.tag}</span>
                                  <figure className="text-center mx-auto d-block mb-1">
                                    <Link href={type.link}> <Image loading="lazy" src={type.img}
                                          alt="user"
                                          width={260}
                                          height={178} /> </Link>
                                  </figure>
                                  <span className="d-flex icon-list-name col-lg-10 mx-auto align-items-center justify-content-between">
                                      <h5 className="mb-0"> 
                                        <Link href={type.link}> 
                                          {type.title}
                                        </Link>
                                      </h5>
                                      <Link className="coun-text" href={type.link}> 
                                          
                                       <strong> {type.counting}</strong> icons
                                      </Link>
                                      
                                  </span>
                                </article>
                              </div>
                          ))}

                 </div>
             </div>
         </section>
          

         <section className="float-start about-sections comon-short-parts mb-5 w-100">
             <aside className="container">
                 <div className="row row-cols-1 flex-column-reverse row-cols-md-2 align-items-center">
                    <div className="col">
                       <div className="ab-left">
                          <h2 className="comon-head"> What’s New<span className="d-lg-block"> in Iconsguru </span> </h2>
                          <p className="col-lg-9 mt-2"> Level up your designs with our premium icons! Whether you need sleek, modern, or creative icons, we’ve got you covered.  </p>
                          <h5 className="mt-4"> Available Formats </h5>
                          <ul className="p-0 d-flex align-items-center flex-lg-wrap m-0 fe-list fe-list2 mt-4">
                            <li className="d-flex align-items-baseline">
                                <h5 className="m-0"> PNG 
                                </h5>
                            </li>
                            <li className="d-flex align-items-baseline">
                                <h5 className="m-0"> SVG
                                </h5>
                            </li>
                            <li className="d-flex align-items-baseline">
                                <h5 className="m-0"> WEBP
                                </h5>
                            </li>
                            
                            
                          </ul>
                          <Link href='/icons' className="btn btn-expolre mt-3"> Explore now </Link>
                          
                       </div>
                    </div>
                    <div className="col">
                       <figure className="m-0">
                           <Image loading="lazy" src="/download-svg.svg"
                                        alt="user"
                                        width={442}
                                        height={338} />
                       </figure>
                    </div>
                 </div>
             </aside>
          </section>
       

          
         
   </main>
   <Footer/>
    </>
  );
}

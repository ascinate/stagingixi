
import Image from "next/image";
import styles from "./page.module.css";
import CategorySlider from "./components/CategorySlider";
import NavicationHome from "./components/NavicationHome";
import BannerHome from "./components/BannerHome";
import Link from "next/link";
import Footer from "./components/Footer";
import Head from "next/head";

import CategoryTabs from './components/CategoryTabs';

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

    const icontypes = [    { id: 1, title: 'Arrow' , counting: '144', tag:"", img: '/arrow.svg', link: '/icons/arrow'  },    { id: 2, title: 'Business' , counting: '65', tag:"New", img: '/business.svg', link: '/icons/business'  },    { id: 3, title: 'Device' , counting: '118', tag:"", img: '/device.svg', link: '/icons/device'  },    { id: 4, title: 'Music' , counting: '200', tag:"", img: '/Music.svg', link: '/icons/music'  },    { id: 5, title: 'home' , counting: '49', tag:"", img: '/home.svg', link: '/icons/home'  },    { id: 6, title: 'Interface' , counting: '89', tag:"", img: '/interface.svg', link: '/icons/interface'  },    { id: 7, title: 'Halloween' , counting: '69', tag:"", img: '/halloween.svg', link: '/icons/halloween'  },    { id: 8, title: 'Food' , counting: '99', tag:"", img: '/food.svg', link: '/icons/food'  },  ];  
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
         

         <section className="float-start fetures-acountins-sections w-100">
            <div className="container">
              <div className="row align-items-center">
                 <div className="col-lg-9">
                     <h2 className="comon-head mb-0 page-haeding01 mb-2"> Top <span> Icon </span> packages </h2>
                     <p> Download the perfection and largest unique icons drawn by hand. </p>
                 </div>
                 <div className="col-lg-3">
                     <Link href="/" className="btn d-table btn-mores ms-auto">More packages
                       <span className="ms-2">
                          <svg width="16" height="16" viewBox="0 0 136 84" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M91.6249 1.17157C93.187 -0.390524 95.7197 -0.390524 97.2818 1.17157L134.828 38.7182C136.391 40.2803 136.391 42.813 134.828 44.3751L97.2818 81.9218C95.7197 83.4839 93.187 83.4839 91.6249 81.9218C90.0628 80.3597 90.0628 77.827 91.6249 76.2649L122.343 45.5467H4C1.79086 45.5467 0 43.7558 0 41.5467C0 39.3375 1.79086 37.5467 4 37.5467H122.343L91.6249 6.82843C90.0628 5.26633 90.0628 2.73367 91.6249 1.17157Z" fill="#ffffff"/>
                          </svg>
                       </span>
                     </Link>
                 </div>
              </div>
                

                  <div className="row cats-div01 row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-4 g-lg-4 mt-3">

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

         <section className="float-start libary-parts w-100">
             <aside className="container position-relative">
                  <div className="comon-heading-sec d-block w-100 text-center">
                      <h5 className="bg-white sub-libray d-table mx-auto">Icons Library</h5>
                      <h2 className="text-white"> Browse Icons Effortlessly with Modern UI </h2>
                      <p className="text-white"> Your Icons, Your Way – Search, Tweak, Download in Seconds </p>
                  </div>
                  <figure>
                     <Image src="/broswer-divs01.webp" width={3563} height={1709} alt="fm"/>
                  </figure>
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
          
        <CategoryTabs />
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

import Link from "next/link";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Image from "next/image";

function Footer(){
    const mianmenu = [
        { id: 1, title: 'Why us' , link: '/whyus'  },
        { id: 2, title: 'Blog' , link: 'https://blog.icontrove.com/'  },
        { id: 3, title: 'Pricing' , link: '/pricing'  },
        
    ];
    const categorymenu = [
        { id: 1, title: 'Bold' , link: '/'  },
        { id: 2, title: 'Solid' , link: '/'  },
        { id: 3, title: 'Regular' , link: '/'  },
        { id: 4, title: 'Thin' , link: '/'  },
    ];
    const topicons = [
        { id: 1, title: 'Sports' , link: '/icons/Sports'  },
        { id: 2, title: 'Health' , link: '/icons/Health'  },
        { id: 3, title: 'Music' , link: '/icons/Music'  },
        { id: 4, title: 'Weather' , link: '/icons/Weather'  },
    ];
    const supports = [
        { id: 1, title: 'Help & Support' , link: '/help'  },
        { id: 2, title: 'FAQ' , link: '/faq'  },
        { id: 3, title: 'Privacy policy' , link: '/privacy'  },
    ];

    const request = [
        { id: 1, title: 'Icon' , link: '/'  },
        { id: 2, title: 'Illustration' , link: '/'  },
        { id: 3, title: 'Feature' , link: '/'  },
    ];

    const developmenrs = [
        { id: 1, title: 'Icons API' , link: '/'  },
        { id: 2, title: 'Illustrations API' , link: '/'  },
        { id: 3, title: 'Music API' , link: '/'  },
    ];
    const onlinetools = [
        { id: 1, title: 'Mega Creator' , link: '/'  },
        { id: 2, title: 'Smart Upscaler' , link: '/'  },
        { id: 3, title: 'Background Remover' , link: '/'  },
    ];
    const lincesn = [
        { id: 1, title: 'Free license' , link: '/'  },
        { id: 2, title: 'Paid license' , link: '/'  },
        { id: 3, title: 'Pricing' , link: '/'  },
    ];
    
    return(
        <>
        <footer className="float-start comon-short-parts w-100">
            <div className="container">
                <div className="row row-cols-1 row-cols-lg-5">
                    <div className="col">
                        <div className="comon-footers-div01">
                            <Link href='/'>
                                <Image loading="lazy" src="/footer-logo.svg"
                                        alt="iconsguru"
                                        width={114}
                                        height={18} />
                            </Link>

                            <p className="text-white ft-paras mt-4"> Join millions of designers, developers, and content creators using Iconguru — a comprehensive icon library and toolkit built for creativity and efficiency. .</p>

                            
                        </div>
                    </div>
                    <div className="col d-grid justify-content-center">
                        <div className="comon-footers-div01">
                           <h5 className="text-white"> Help & Support </h5>
                           <ul className="comon-links mt-4 ms-0 p-0">
                                {supports.map((page) => (
                                    <li key={page.id}>
                                      <Link href={page.link}> {page.title} </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col d-grid justify-content-center">
                        <div className="comon-footers-div01">
                           <h5 className="text-white"> Company </h5>
                            
                            <ul className="comon-links mt-4 ms-0 p-0">
                                {mianmenu.map((page) => (
                                    <li key={page.id}>
                                      <Link href={page.link}> {page.title} </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col d-grid justify-content-center">
                        <div className="comon-footers-div01">
                           <h5 className="text-white"> Top Icons </h5>
                           
                            <ul className="comon-links mt-4 ms-0 p-0">
                                {topicons.map((page) => (
                                    <li key={page.id}>
                                      <Link href={page.link}> {page.title} </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col d-grid justify-content-end">
                        <div className="comon-footers-div01">
                           <h5 className="text-white"> Social media </h5>
                           
                            <ul className="solic-list d-flex align-items-center">
                                <li>
                                    <Link href='https://www.instagram.com/iconguru_official/' className="ft-scol" target="_blank" role="noopener noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="rgba(0,0,0,1)"><path d="M13.0281 2.00073C14.1535 2.00259 14.7238 2.00855 15.2166 2.02322L15.4107 2.02956C15.6349 2.03753 15.8561 2.04753 16.1228 2.06003C17.1869 2.1092 17.9128 2.27753 18.5503 2.52503C19.2094 2.7792 19.7661 3.12253 20.3219 3.67837C20.8769 4.2342 21.2203 4.79253 21.4753 5.45003C21.7219 6.0867 21.8903 6.81337 21.9403 7.87753C21.9522 8.1442 21.9618 8.3654 21.9697 8.58964L21.976 8.78373C21.9906 9.27647 21.9973 9.84686 21.9994 10.9723L22.0002 11.7179C22.0003 11.809 22.0003 11.903 22.0003 12L22.0002 12.2821L21.9996 13.0278C21.9977 14.1532 21.9918 14.7236 21.9771 15.2163L21.9707 15.4104C21.9628 15.6347 21.9528 15.8559 21.9403 16.1225C21.8911 17.1867 21.7219 17.9125 21.4753 18.55C21.2211 19.2092 20.8769 19.7659 20.3219 20.3217C19.7661 20.8767 19.2069 21.22 18.5503 21.475C17.9128 21.7217 17.1869 21.89 16.1228 21.94C15.8561 21.9519 15.6349 21.9616 15.4107 21.9694L15.2166 21.9757C14.7238 21.9904 14.1535 21.997 13.0281 21.9992L12.2824 22C12.1913 22 12.0973 22 12.0003 22L11.7182 22L10.9725 21.9993C9.8471 21.9975 9.27672 21.9915 8.78397 21.9768L8.58989 21.9705C8.36564 21.9625 8.14444 21.9525 7.87778 21.94C6.81361 21.8909 6.08861 21.7217 5.45028 21.475C4.79194 21.2209 4.23444 20.8767 3.67861 20.3217C3.12278 19.7659 2.78028 19.2067 2.52528 18.55C2.27778 17.9125 2.11028 17.1867 2.06028 16.1225C2.0484 15.8559 2.03871 15.6347 2.03086 15.4104L2.02457 15.2163C2.00994 14.7236 2.00327 14.1532 2.00111 13.0278L2.00098 10.9723C2.00284 9.84686 2.00879 9.27647 2.02346 8.78373L2.02981 8.58964C2.03778 8.3654 2.04778 8.1442 2.06028 7.87753C2.10944 6.81253 2.27778 6.08753 2.52528 5.45003C2.77944 4.7917 3.12278 4.2342 3.67861 3.67837C4.23444 3.12253 4.79278 2.78003 5.45028 2.52503C6.08778 2.27753 6.81278 2.11003 7.87778 2.06003C8.14444 2.04816 8.36564 2.03847 8.58989 2.03062L8.78397 2.02433C9.27672 2.00969 9.8471 2.00302 10.9725 2.00086L13.0281 2.00073ZM12.0003 7.00003C9.23738 7.00003 7.00028 9.23956 7.00028 12C7.00028 14.7629 9.23981 17 12.0003 17C14.7632 17 17.0003 14.7605 17.0003 12C17.0003 9.23713 14.7607 7.00003 12.0003 7.00003ZM12.0003 9.00003C13.6572 9.00003 15.0003 10.3427 15.0003 12C15.0003 13.6569 13.6576 15 12.0003 15C10.3434 15 9.00028 13.6574 9.00028 12C9.00028 10.3431 10.3429 9.00003 12.0003 9.00003ZM17.2503 5.50003C16.561 5.50003 16.0003 6.05994 16.0003 6.74918C16.0003 7.43843 16.5602 7.9992 17.2503 7.9992C17.9395 7.9992 18.5003 7.4393 18.5003 6.74918C18.5003 6.05994 17.9386 5.49917 17.2503 5.50003Z"></path></svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='https://www.facebook.com/profile.php?id=61575078242862' className="ft-scol" target="_blank" role="noopener noreferrer">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="rgba(0,0,0,1)"><path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z"></path></svg>
                                    </Link>
                                </li>
                                <li>
                                   <Link href='https://x.com/icons_guru' className="ft-scol" target="_blank" role="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="rgba(0,0,0,1)"><path d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z"></path></svg>
                                   </Link>
                                </li>
                                <li>
                                    <Link href='https://www.linkedin.com/in/icons-guru-27583335b/' className="ft-scol" target="_blank" role="noopener noreferrer">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="rgba(0,0,0,1)"><path d="M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z"></path></svg>
                                    </Link>
                                </li>
                            </ul>
                           <p className="mt-3 text-white"> Receive premium resources directly in your inbox. </p>
                           
                        </div>
                    </div>

                    
                </div>
                <div className="row row-cols-1 row-cols-lg-5 mt-5">
                    <div className="col"></div>
                    <div className="col d-grid justify-content-center">
                        <div className="comon-footers-div01">
                           <h5 className="text-white"> For developers </h5>
                           <ul className="comon-links mt-4 ms-0 p-0">
                                {developmenrs.map((page) => (
                                    <li key={page.id}>
                                      <Link href={page.link}> {page.title} </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col d-grid justify-content-center">
                        <div className="comon-footers-div01">
                           <h5 className="text-white"> Online tools </h5>
                            
                            <ul className="comon-links mt-4 ms-0 p-0">
                                {onlinetools.map((page) => (
                                    <li key={page.id}>
                                      <Link href={page.link}> {page.title} </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col d-grid justify-content-center">
                        <div className="comon-footers-div01">
                           <h5 className="text-white"> Licenses </h5>
                           
                            <ul className="comon-links mt-4 ms-0 p-0">
                                {lincesn.map((page) => (
                                    <li key={page.id}>
                                      <Link href={page.link}> {page.title} </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col d-grid">
                        <div className="comon-footers-div01">
                           <h5 className="text-white"> Request </h5>
                           

                           
                           <ul className="comon-links mt-4 ms-0 p-0">
                                {request.map((page) => (
                                    <li key={page.id}>
                                      <Link href={page.link}> {page.title} </Link>
                                    </li>
                                ))}
                            </ul>
                           
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row row-cols-1 row-cols-lg-2 g-lg-0">
                   <div className="col">
                      <ul className="d-flex align-items-center copy-text1 p-0 m-0 copt-lisk">
                        <li>
                            <Link href='/terms' className="trust01">Terms & conditions</Link>
                        </li>
                        <li className="mx-3">
                            <Link href='/terms' className="trust01">Cookies policy</Link>
                        </li>
                        <li>
                            <Link href='/terms' className="trust01">Cookies Settings</Link>
                        </li>
                      </ul>
                   </div>
                   <div className="col d-grid justify-content-lg-end"> <p className="text-white copy-text1 copt-lisk"> &copy; {new Date().getFullYear()} iconsguru.com | All Rights Reserved </p> </div>
                </div>
            </div>
        </footer>
     


       

        </>
    )
   };
   
   export default Footer;
"use client";
import { useEffect, useState } from "react";
import NavicationHome from "../components/NavicationHome";
import Footer from "../components/Footer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function InterfaceIconsPage() {
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("interface");

  useEffect(() => {
    const fetchInterfaceIcons = async () => {
      try {
        const res = await fetch("https://iconsguru.ascinatetech.com/admin/api/icons/interface");
        const json = await res.json();
        if (json.status && Array.isArray(json.data)) {
          setIcons(json.data);
        }
      } catch (err) {
        console.error("Error fetching Interface icons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterfaceIcons();
  }, []);

  return (
    <>
      <Head>
        <title>Interface Icons</title>
        <meta name="description" content="Free Interface icons from IconsGuru" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <NavicationHome />
      <section className="sub-banners d-inline-block w-100 float-start mt-2">
                <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                          <h2> Browse High-Quality <br/>
                          Icons by Category </h2>
                          <p className="col-lg-8 mt-3"> The largest database of vector icons available for download
                          SVG, EPS, PSD and BASE 64 formats. </p>
                      </div>
                      {/* <div className="col-lg-6">
                          <Image loading="lazy" src="/category-banner.svg"
                                alt="iconsguru"
                                width={511}
                                height={299} />
                      </div> */}
                    </div>
                </div>
      </section>

      <main className="pricing-pages-part float-start w-100">
        <section className="float-start w-100 pt-0">
          <div className="container">
            



 

            <div className="comon-cate-list trending-icons d-inline-block w-100">
              <h2 className="text-left comon-head cmg-heading m-0">Interface Icons</h2>
              

              {loading ? (
                <div className="d-block w-100">
                  <div className="loading-animations">
                                    <Image
                                      loading="lazy"
                                      src="/ser-loader.svg"
                                      alt="iconsguru"
                                      width={859}
                                      height={364}
                                    />
                  </div>
                </div>
              ) : (
                <>
                <div className="t-ind-icons mt-4">
                  <div className="new-icons-bm-bg">
                    {icons.map((icon) => (
                      
                        <article className="svg-item position-relative" key={icon.Id}>
                          <Link href={`/details/${icon.icon_name.replace(/\s+/g, "-").toLowerCase()}_${icon.Id}`} className="btn icons-list p-0">
                            <span dangerouslySetInnerHTML={{ __html: icon.icon_svg }}></span>
                          </Link>
                        </article>
                     
                    ))}
                  </div>
                </div>

                  <div className="text-center mt-5">
                    <Link
                      href={`/icons/${encodeURIComponent(category.toLowerCase())}`}
                      className="btn btn-primary btn-mores-btn px-4 py-2"
                    >
                      Show More
                    </Link>
                  </div>

                 
                </>
              )}

                 <section className="float-start about-sections mt-5 w-100">
                        <aside className="container">
                            <div className="row row-cols-1 row-cols-lg-2 align-items-center">
                              <div className="col">
                                  <div className="ab-left">
                                    <h2 className="comon-head"> Edit never <span className="d-lg-block"> beed to easy </span> </h2>
                                    <p className="col-lg-8 mt-3"> We’ve developed from scratch our tools to browse, customize and quickly use our assets.
                                       Drop our icons and illustration right into your workflow.   </p>
                                     <Link href='' className="btn btn-explore mt-2">Explore now</Link>
                                  </div>
                              </div>
                              <div className="col">
                                  <figure className="m-0">
                                      <Image loading="lazy" src="/color-12.svg"
                                            alt="user"
                                            width={390}
                                            height={310} />
                                  </figure>
                              </div>
                            </div>
                        </aside>
                  </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

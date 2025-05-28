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
  const [category, setCategory] = useState("animated");

  useEffect(() => {
    const fetchInterfaceIcons = async () => {
      try {
        const res = await fetch("https://iconsguru.ascinatetech.com/api/icons/animated");
        const json = await res.json();
        if (json.status && Array.isArray(json.data)) {
          setIcons(json.data);
        }
      } catch (err) {
        console.error("Error fetching animated icons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterfaceIcons();
  }, []);

  return (
    <>
      <Head>
        <title>Animated Icons</title>
        <meta name="description" content="Free Interface icons from IconsGuru" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <NavicationHome />

      <main className="pricing-pages-part float-start w-100">
        <section className="float-start w-100 pt-0">
          <div className="container">
            <div className="comon-cate-list trending-icons d-inline-block w-100">
               <h2 className="text-left comon-head cmg-heading m-0">Animated Icons</h2>

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
                  <div className="new-icons-bm mt-4">
                    {icons.map((icon) => (
                      
                        <article className="svg-item col position-relative" key={icon.Id}>
                          <Link href={`/details/${icon.icon_name.replace(/\s+/g, "-").toLowerCase()}_${icon.Id}`} className="btn icons-list p-0">
                            {icon.type === "Animated" ? (
                                  <img
                                    src={`https://iconsguru.ascinatetech.com/public/uploads/animated/${encodeURIComponent(icon.icon_svg)}`}
                                    alt={icon.icon_name}
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                ) : (
                                <span dangerouslySetInnerHTML={{ __html: icon.icon_svg }}></span>
                                )}
                          </Link>
                        </article>
                      
                    ))}
                  </div>

                  <div className="text-center mt-4">
                    <Link
                      href={`/icons/${encodeURIComponent(category.toLowerCase())}`}
                      className="btn btn-primary px-4 py-2"
                    >
                      Show More
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

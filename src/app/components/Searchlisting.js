'use client';
import Head from "next/head";
import NavicationHome from "./NavicationHome";
import { useEffect, useState } from "react";
import SidebarFilter from "./SidebarFilter";
import Footer from "./Footer";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import SerchInputes from "./SerchInputes";


export default function Searchlisting() {
  const searchParams = useSearchParams();
const searchKeyword = searchParams.get("search");

  const [icons, setIcons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ categories: [], colors: [], types: [] });
  const [totalIcons, setTotalIcons] = useState(0);
  

  useEffect(() => {
    const fetchIcons = async () => {
      setIsLoading(true);
      try {
        const query = new URLSearchParams();
        query.append("page", page);
        query.append("limit", 20);
  
        if (filters.categories.length) filters.categories.forEach(c => query.append("categories[]", c));
        if (filters.colors.length) filters.colors.forEach(c => query.append("colors[]", c));
        if (filters.types.length) filters.types.forEach(t => query.append("types[]", t));
  
        if (searchKeyword) query.append("search", searchKeyword);
  
        const finalURL = `https://iconsguru.ascinatetech.com/api/icons?${query.toString()}`;
         
        const response = await fetch(finalURL);
        const data = await response.json();
  
        if (data?.icons?.data && Array.isArray(data.icons.data)) {
          setIcons(data.icons.data);
          setTotalPages(data.icons.last_page || 1);
          setTotalIcons(data.icons.total || 0);
        } else {
          console.error("❌ Unexpected data.icons format:", data);
          setIcons([]);
        }
      } catch (error) {
        console.error("🚨 Error fetching icons:", error);
        setIcons([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchIcons();
  }, [page, filters, searchKeyword]);
  

  return (
    <>
      


      <main className="listing-pages floate-start w-100 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <SidebarFilter onFilterChange={setFilters}  showCategoryFilter={false} />
            </div>
            <div className="col-lg-9 ps-lg-4">
              <div className="main-divs g-col-6">
                <h2 className="search-listings01">{searchKeyword ? `${searchKeyword} Icons` : "All Icons"}</h2>
                <p>
                  Showing <strong className="serch-data">{totalIcons}</strong> Icons
                </p>



                <div className="ser-listu-lis sub-listu-div01">
                  <SerchInputes/>
                </div>

                <div className="tabsd_divs d-inline-block w-100 mt-2">
                    
                <div className="new-icons-bm w-100 mt-0 position-relative">
                        {isLoading ? (
                          <div className="loading-animations">
                          <Image
                            loading="lazy"
                            src="/ser-loader.svg"
                            alt="iconsguru"
                            width={825}
                            height={364}
                          />
                         </div>
                        ) : Array.isArray(icons) && icons.length > 0 ? (
                          icons.map((icon) => (
                            <article key={icon.Id} className="svg-item  position-relative">
                              <Link href={`/details/${icon.icon_name.replace(/\s+/g, "-").toLowerCase()}_${icon.Id}`} className="btn icons-list p-0">
                                <span dangerouslySetInnerHTML={{ __html: icon.icon_svg }}></span>
                              </Link>
                              
                            </article>
                          ))
                        ) : (
                          <div className="col no-found-div w-100">
                              <div className="not-imgs text-center">
                                  <figure className="m-0">
                                       <Image
                                          loading="lazy"
                                          src="/nofound.png"
                                          alt="iconsguru"
                                          width={249}
                                          height={219}
                                        />
                                  </figure>
                                  <h2> No results found </h2>
                                  <p> Try updating your search terms or filters </p>
                              </div>
                          </div>
                        )}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                      <div className="d-flex align-items-center justify-content-center my-5 gap-2 flex-wrap">
                        <button
                          className="btn btn-pre"
                          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                          disabled={page === 1}
                        >
                          ← Previous
                        </button>

                        {[...Array(totalPages)].map((_, index) => {
                          const pageNum = index + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setPage(pageNum)}
                              className={`btn btn-sm ${page === pageNum ? "btn-primary" : "btn-outline-secondary"}`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          className="btn btn-next"
                          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={page === totalPages}
                        >
                          Next →
                        </button>
                      </div>
                       )}

                
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

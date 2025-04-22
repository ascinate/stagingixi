"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavicationHome from "@/app/components/NavicationHome";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function IconDetailPage() {


  const params = useParams();
const slug = params?.slug;
const id = slug?.split('_').pop();
  const [icon, setIcon] = useState(null);
  const [color, setColor] = useState(null); // null to preserve original
  const [size, setSize] = useState(200);
  const [relatedIcons, setRelatedIcons] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const finalSize = Math.min(Number(size), 300); // ensure max 300



  const handleCopy = () => {
    navigator.clipboard.writeText(renderedSvg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // hide after 2 sec
  };



  // const tags = [
  //   { id: 1, title: 'Shopping Bag' , link: '/'  },
  //   { id: 2, title: 'Shopping' , link: '/'  },
  //   { id: 3, title: 'Online Bag', link: '/',},
  //   { id: 4, title: 'Shopper' , link: '/' },
  //   { id: 5, title: 'Activity' , link: '/' },
  //   { id: 6, title: 'Commerce' , link: '/' },
  // ];

  useEffect(() => {
    if (!id) return;

    const fetchIcon = async () => {
      try {
        const res = await fetch(`https://iconsguru.ascinatetech.com/admin/api/icon/${id}`);
        const data = await res.json();
        setIcon(data.icons);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchIcon();
  }, [id]);

  useEffect(() => {
    const fetchRelatedIcons = async () => {
      try {
        const res = await fetch(`https://iconsguru.ascinatetech.com/admin/api/related-icons/${id}`);
        const data = await res.json();
        console.log("Related fetch icon:", data)
        setRelatedIcons(data.icons || []);
      } catch (err) {
        console.error("Related fetch error:", err);
      }
    };
  
    if (id) {
      fetchRelatedIcons();
    }
  }, [id]);
  

  const applyColorAndSize = (svgRaw) => {
    let svg = svgRaw;

    // Apply color if selected
    if (color) {
      if (svg.includes('fill="')) {
        svg = svg.replace(/fill=".*?"/g, `fill="${color}"`);
      } else {
        svg = svg.replace(
          /<(path|circle|rect|polygon|line|ellipse|polyline)/g,
          `<$1 fill="${color}"`
        );
      }
    }

    // Apply width and height
    svg = svg
      .replace(/width=".*?"/g, `width="${size}"`)
      .replace(/height=".*?"/g, `height="${size}"`);

    return svg;
  };

  const svgToCanvasDownload = (type = "png") => {
    const finalSvg = applyColorAndSize(icon.icon_svg);
    const blob = new Blob([finalSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
  
    const img = new Image();
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
  
      const link = document.createElement("a");
      link.download = `${icon.icon_name.replace(/\s+/g, "-").toLowerCase()}.${type}`;
      link.href = canvas.toDataURL(`image/${type}`);
      link.click();
  
      URL.revokeObjectURL(url);
  
      // ✅ Call the download count API
      try {
        await fetch(`https://iconsguru.ascinatetech.com/admin/api/icon-download/${icon.Id}`, {
          method: 'POST',
        });
      } catch (err) {
        console.error("Download count error:", err);
      }
    };
  
    img.src = url;
  };
  

  const handleDownloadSVG = async () => {
    try {
      await fetch(`https://iconsguru.ascinatetech.com/admin/api/icon-download/${icon.Id}`, {
        method: 'POST',
      });
  
      const svg = applyColorAndSize(icon.icon_svg);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${icon.icon_name.replace(/\s+/g, "-").toLowerCase()}-${size}px.svg`;
      link.click();
    } catch (error) {
      console.error("Download tracking failed", error);
    }
  };
  
  

  if (!icon) return null;

  const renderedSvg = applyColorAndSize(icon.icon_svg);

  return (
    <>
       <NavicationHome/>
        <main className="details-body-parts lisu-lisn-div01 float-start w-100">
            <div className="container">
              <aside className="bercrums">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{icon.icon_name}</li>
                      </ol>
                    </nav>
                    <h2 className="icon-headings">{icon.icon_name}</h2>
               </aside>
               <div className="top-sections01 mt-4  details-coderyt">
                   <div className="row">
                       <div className="col-lg-6 position-relative p-0">
                            <div className="blox-icons-div01">
                                  <div
                                    className="d-table mx-auto"
                                    style={{ width: size, height: size }}
                                    
                                    dangerouslySetInnerHTML={{ __html: renderedSvg }}
                                  />
                                {icon.icon_category !== "Emoji" && (
                                  <div className="icn-list05">
                                          <input
                                            type="color"
                                            value={color || "#000000"}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="form-control form-control-color"
                                          />
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill={color}><path d="M4.7134 7.12811L4.46682 7.69379C4.28637 8.10792 3.71357 8.10792 3.53312 7.69379L3.28656 7.12811C2.84706 6.11947 2.05545 5.31641 1.06767 4.87708L0.308047 4.53922C-0.102682 4.35653 -0.102682 3.75881 0.308047 3.57612L1.0252 3.25714C2.03838 2.80651 2.84417 1.97373 3.27612 0.930828L3.52932 0.319534C3.70578 -0.106511 4.29417 -0.106511 4.47063 0.319534L4.72382 0.930828C5.15577 1.97373 5.96158 2.80651 6.9748 3.25714L7.69188 3.57612C8.10271 3.75881 8.10271 4.35653 7.69188 4.53922L6.93228 4.87708C5.94451 5.31641 5.15288 6.11947 4.7134 7.12811ZM15.3144 9.53285L15.4565 9.67491C16.7513 11.018 17.3306 12.9868 16.8126 14.9201C16.1644 17.3393 13.9702 18.9984 11.5016 18.9984C9.46572 18.9984 6.78847 18.3726 4.5286 17.4841C5.73449 16.0696 6.17423 14.675 6.3285 12.805C6.36574 12.3536 6.38901 12.1741 6.43185 12.0142C7.22541 9.05261 10.0168 7.40515 12.9235 8.18399C13.8549 8.43357 14.6661 8.90783 15.3144 9.53285ZM18.2278 2.3713L13.2886 6.21289C9.34224 5.23923 5.55843 7.54646 4.5 11.4966C4.39826 11.8763 4.36647 12.262 4.33317 12.666C4.21829 14.0599 4.08554 15.6707 1 17.9966C3.5 19.4966 8 20.9984 11.5016 20.9984C14.8142 20.9984 17.8463 18.7896 18.7444 15.4377C19.0836 14.1719 19.0778 12.895 18.7847 11.7067L22.6253 6.76879C22.9349 6.3707 22.8997 5.80435 22.543 5.44774L19.5488 2.45355C19.1922 2.09694 18.6259 2.06168 18.2278 2.3713ZM16.8952 8.2852C16.8319 8.21952 16.7673 8.15494 16.7015 8.09149L15.5769 6.96685L18.7589 4.49198L20.5046 6.23774L18.0297 9.41972L16.8952 8.2852Z"></path></svg>
                                 </div>
                                )}

                                 

                            </div>
                       </div>
                       <div className="col-lg-6 d-grid justify-content-end">
                              <div className="right-details-lis01">
                                  <div className="groups-list-btn">
                                      <div className="comon-groups-div01 d-flex align-items-center justify-content-between">
                                           <h5 className="m-0"> Size : </h5>
                                           <div className="input-divs d-flex align-items-center">
                                            {!showCustom ? (
                                                <select
                                                  id="size"
                                                  className="form-select"
                                                  value={size}
                                                  onChange={(e) => {
                                                    if (e.target.value === "custom") {
                                                      setShowCustom(true);
                                                      setSize(""); // clear size on custom
                                                    } else {
                                                      setSize(Number(e.target.value));
                                                    }
                                                  }}
                                                >
                                                  <option value="">-- Select a Size --</option>
                                                  <option value="12">12px</option>
                                                  <option value="16">16px</option>
                                                  <option value="18">18px</option>
                                                  <option value="24">24px</option>
                                                  <option value="32">32px</option>
                                                  <option value="36">36px</option>
                                                  <option value="48">48px</option>
                                                  <option value="64">64px</option>
                                                  <option value="72">72px</option>
                                                  <option value="96">96px</option>
                                                  <option value="120">120px</option>
                                                  <option value="240">240px</option>
                                                  <option value="custom">Custom</option>
                                                </select>
                                              ) : (
                                                <div className="d-flex align-items-center">
                                                  <input
                                                    type="number"
                                                    className="form-control me-2"
                                                    placeholder="Enter custom size"
                                                    value={size}
                                                    onChange={(e) => setSize(Number(e.target.value))}
                                                    style={{ width: "150px" }}
                                                  />
                                                  <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => {
                                                      setShowCustom(false);
                                                      setSize("");
                                                    }}
                                                  >
                                                    Back
                                                  </button>
                                                </div>
                                              )}


                                           </div>
                                      </div>
                                      <div className="comon-groups-div01 d-flex align-items-center justify-content-between">
                                           <h5 className="m-0"> Download As: </h5>
                                           <div className="input-divs d-flex justify-content-between align-items-center">
                                               <button type="button" onClick={handleDownloadSVG} className="btn btn-comons01 crm-btn01"> SVG </button>
                                               <button type="button" onClick={() => svgToCanvasDownload("png")} className="btn btn-comons01 crm-btn01"> PNG </button>
                                               <button type="button" onClick={() => svgToCanvasDownload("webp")} className="btn btn-comons01 crm-btn01"> WEBP </button>
                                           </div>
                                      </div>

                                      <code className="mt-2 codet p-2 bg-light01 d-inline-block w-100 rounded" style={{ fontSize: '0.75rem', wordBreak: 'break-word' }}>
                                          {renderedSvg}
                                      </code>


                                      <div className="comon-groups-div01 mt-4 d-flex align-items-center">
                                         <button type="button" className="btn  btn-shares"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)"><path d="M13.1202 17.0228L8.92129 14.7324C8.19135 15.5125 7.15261 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.15255 8 8.19125 8.48746 8.92118 9.26746L13.1202 6.97713C13.0417 6.66441 13 6.33707 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6C21 8.20914 19.2091 10 17 10C15.8474 10 14.8087 9.51251 14.0787 8.73246L9.87977 11.0228C9.9583 11.3355 10 11.6629 10 12C10 12.3371 9.95831 12.6644 9.87981 12.9771L14.0788 15.2675C14.8087 14.4875 15.8474 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 17.6629 13.0417 17.3355 13.1202 17.0228ZM6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14ZM17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8ZM17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z"></path></svg> Share </button>
                                         <button
                                            onClick={handleCopy}
                                            className="btn btn-copsy ms-3"
                                            title="Copy SVG Code"
                                          >
                                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6ZM6.9998 11V13H12.9998V11H6.9998ZM6.9998 15V17H12.9998V15H6.9998Z"></path></svg> Copy Code
                                          </button>
                                      </div>
                                      

                                  
                                      <h5 className="list-texr style-list mt-4 d-flex flex-column position-relative">
                                        <span><strong>Style :</strong> {icon.type}</span>
                                       
                                       
                                      </h5>
                                      {showToast && (
                                          <div
                                            className="position-fixed top-0 start-50 translate-middle-x p-2 px-4 bg-dark text-white rounded shadow"
                                            style={{ zIndex: 1050, marginTop: '80px' }}
                                          >
                                            ✅ SVG code copied!
                                          </div>
                                        )}

                                      




                                  </div>
                              </div>
                       </div>
                   </div>

                   <div className="styles-icons-div  comon-rows d-block w-100">
                      <h4 className="sub-titels-h1">Related Icons with the same style</h4>
                      <div className="relatesd t-ind-icons d-block w-100">
                        <div className="row row-cols-1 row-cols-lg-6 gy-2 gy-lg-3">
                          {relatedIcons.map((icon) => (
                            <article key={icon.Id} className="col">
                              <Link href={`/details/${icon.icon_name.replace(/\s+/g, "-").toLowerCase()}_${icon.Id}`} className="btn icons-list p-0 position-relative">
                                <div
                                  className="svg-img d-grid"
                                  dangerouslySetInnerHTML={{ __html: icon.icon_svg }}
                                />
                              </Link>
                            </article>
                          ))}
                        </div>
                      </div>
                    </div>


                      <div className="styles-icons-div comon-rows d-block w-100 mb-5 pb-5">
                          <h4 className="sub-titels-h1"> Related Tags </h4>
                          <ul className="crm-tagsd d-flex align-items-center flex-wrap m-0 p-0">
                          {icon.tags?.split(",").map((tag, index) => {
                            const trimmedTag = tag.trim();
                            if (!trimmedTag) return null;

                            return (
                              <li key={index} className="me-2 mb-2 list-unstyled">
                                <Link
                                   href={`/icons/${encodeURIComponent(icon.icon_category)}?tag=${encodeURIComponent(trimmedTag)}`}
                                  className="btn"
                                >
                                  {trimmedTag}
                                </Link>
                              </li>
                            );
                          })}
                          </ul>
                      </div>

               </div>
              
            </div>
              
        </main>
       <Footer/>
       
    </>
   
  );
}

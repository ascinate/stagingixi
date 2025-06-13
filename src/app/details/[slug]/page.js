"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavicationHome from "@/app/components/NavicationHome";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";
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
 


  

  const handleCopy = async () => {
    navigator.clipboard.writeText(renderedSvg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // hide after 2 sec
  
    try {
      await fetch(`https://iconsguru.ascinatetech.com/api/icon-download/${icon.Id}`, {
        method: 'POST',
      });
    } catch (err) {
      console.error("Download count error:", err);
    }
  };
  



  useEffect(() => {
    if (!id) return;

    const fetchIcon = async () => {
      try {
        const res = await fetch(`https://iconsguru.ascinatetech.com/api/icon/${id}`);
        const data = await res.json();
        setIcon(data.icons);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchIcon();
  }, [id]);

  const uploadIconAsImage = async () => {
    if(icon.type === "Animated"){
      const gifurl= `https://iconsguru.ascinatetech.com/public/uploads/animated/${icon.icon_svg}`;
      return gifurl;
    }
   else{
    const svgString = icon.icon_svg;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = async () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);

          canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('image', blob, 'shared-image.png');

            try {
              const res = await fetch('https://iconsguru.ascinatetech.com/api/upload-temp-image', {
                method: 'POST',
                body: formData,
              });

              const data = await res.json();
              resolve(data.url);
            } catch (err) {
              reject(err);
            }
          }, 'image/png');
        };

        img.onerror = reject;
        img.src = url;
      });
     }
   
  };
  const shareToPinterest = async () => {
    try {
      const imageUrl = await uploadIconAsImage();
      const pinterestUrl = `https://in.pinterest.com/pin-builder/?description=Check+out+this+icon&media=${encodeURIComponent(imageUrl)}&url=${window.location.href}`;
      window.open(pinterestUrl, '_blank');
    } catch (err) {
      console.error("Pinterest share failed:", err);
    }
  };
  const shareToFacebook = async () => {
    try {
      const imageUrl = await uploadIconAsImage();
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;
      window.open(facebookUrl, '_blank');
    } catch (err) {
      console.error("Facebook share failed:", err);
    }
  };
  const shareToX = async () => {
    try{
    const tweetText = 'Check out this icon';
    const tweetUrl = window.location.href;
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(tweetUrl)}`;
    window.open(xUrl, '_blank');
    } catch (err) {
      console.error("X share failed:",);
    }
    
  };




 
  useEffect(() => {
    const fetchRelatedIcons = async () => {
      try {
        const res = await fetch(`https://iconsguru.ascinatetech.com/api/related-icons/${id}`);
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

  const isLightColor = (hex) => {
    if (!hex) return false;
    const cleanedHex = hex.replace("#", "");
  
    const r = parseInt(cleanedHex.substring(0, 2), 16);
    const g = parseInt(cleanedHex.substring(2, 4), 16);
    const b = parseInt(cleanedHex.substring(4, 6), 16);
  
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
  
    // If luminance is greater than 200, consider it light
    return luminance > 200;
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
        await fetch(`https://iconsguru.ascinatetech.com/api/icon-download/${icon.Id}`, {
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
      await fetch(`https://iconsguru.ascinatetech.com/api/icon-download/${icon.Id}`, {
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

  const handleDownloadGIF = async () => {
    const gifUrl = `https://iconsguru.ascinatetech.com/public/uploads/animated/${icon.icon_svg}`;

    try {
      const response = await fetch(gifUrl, { mode: 'cors' });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${icon.icon_name.replace(/\s+/g, "-").toLowerCase()}.gif`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("GIF download failed:", error);
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
                    
               </aside>
               <div className="top-sections01 mt-2 cmr-details01  details-coderyt">
                   <div className="row">
                       <div className="col-lg-6 col-xl-7 position-relative p-0">
                            <div className="blox-icons-div01" style={{ backgroundColor: isLightColor(color) ? "#000000" : "#eaf3fa",}}>
                              <div
                                className="d-table mx-auto"
                                style={{
                                  width: size,
                                  height: size,
                                  overflow: "hidden",
                                  maxWidth: "300px",
                                  maxHeight: "300px",
        
                                }}
                              >
                                  {icon.type === "Animated" ? (
                                  <img
                                    src={`https://iconsguru.ascinatetech.com/public/uploads/animated/${encodeURIComponent(icon.icon_svg)}`}
                                    alt={icon.icon_name}
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                  />
                                ) : (
                                  <div
                                    style={{ width: "100%", height: "100%" }}
                                    dangerouslySetInnerHTML={{ __html: renderedSvg }}
                                  />
                                )}
                              </div>
                               
                               <button type="button" className="btn bg-white btn-zoom">
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
                               </button>

                                 

                            </div>

                            <div className="varitions-div d-block w-100 mt-4">
                                <h5> Variations </h5>

                            </div>
                            

                       </div>
                       <div className="col-lg-6 col-xl-5 buttons-group01 d-grid justify-content-end">
                              <div className="right-details-lis01">
                                  <div className="groups-list-btn">
                                      <h2 className="icon-headings">{icon.icon_name}</h2>
                                      <div className="d-flex align-items-center user-icons-list08">
                                          <span className="user-nams01">
                                              <Image src="/user01.svg" width={64} height={64} alt="names"/>
                                          </span>
                                          <h6 className="m-0"> <small> Author </small> IconsGuru </h6>
                                      </div>

                                      <div className="list-on0-div w-100">
                                          <ul className="crm-tagsd d-flex align-items-center flex-wrap m-0 p-0">
                                            {icon.tags?.split(",").map((tag, index) => {
                                              const trimmedTag = tag.trim();
                                              if (!trimmedTag) return null;

                                              return (
                                                <li key={index} className="me-2 mb-3 list-unstyled">
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

                                      <h5 className="list-texr style-list mt-3 mb-2 d-flex flex-column position-relative">
                                        <span><strong>Style :</strong> {icon.type}</span>
                                      </h5>
                                      <p className="mt-2 lice-text"> License: Free for personal use </p>

                                      <div className="customize-sctions01 pt-2 d-block w-100">
                                           <h5> Customization </h5>

                                          <div className="comon-groups-div01 w-100 mt-3">
                                          
                                              <div className="form-group">
                                                 <label className="form-label d-block"> Size </label>

                                                  <div className="input-divs d-flex align-items-center w-100">
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
                                                          <option value="16">16px</option>                  
                                                          <option value="24">24px</option>
                                                          <option value="32">32px</option>                                                
                                                          <option value="64">64px</option>       
                                                          <option value="120">128px</option>
                                                          <option value="240">256px</option>
                                                          <option value="240">512px</option>
                                                          <option value="custom">Custom</option>
                                                        </select>
                                                      ) : (
                                                        <div className="d-flex align-items-center">
                                                          <input
                                                            type="number"
                                                            className="form-control me-2"
                                                            placeholder="Enter custom size"
                                                            value={size}
                                                            onChange={(e) => {
                                                              const value = e.target.value;
                                                              setSize(value === '' ? '' : Number(value));
                                                            }}                                                                                                       
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
                                              <div className="form-group mt-3">
                                                  <label className="form-label d-block"> Color </label>
                                                  <div className="bodret-details012 w-100">
                                                      {icon.icon_category !== "Emoji" && icon.icon_category !== "Stickers" && icon.type !== "Animated" &&(

                                                          <input
                                                            type="color"
                                                            id="colos"
                                                            value={color || "#000000"}
                                                            onChange={(e) => setColor(e.target.value)}
                                                            className="form-control form-control-color"
                                                          />   
                                                      )}
                                                  </div>
                                              </div>
                                              
                                          </div>

                                      </div>

                                      
                                      <div className="comon-groups-div01 mb-0 align-items-center justify-content-between">
                                           
                                           <div className="input-divs mt-3 w-100 d-flex justify-content-between align-items-center">


                                            <div className="dropdown col-9">
                                              <button className="btn w-100 btn-download015 dropdown-toggle" data-bs-auto-close="outside" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span>
                                                      <svg width="200" height="200" viewBox="0 0 86 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M0 57.0703C0 55.4135 1.34315 54.0703 3 54.0703C4.65685 54.0703 6 55.4135 6 57.0703V68.8174L6.00586 69.3584C6.06209 72.0964 6.51343 75.3116 7.98828 77.8584C9.41808 80.3273 11.9642 82.464 17.1387 82.6162H66.46C68.6851 82.6162 71.9392 81.9588 74.5586 79.9697C77.0318 78.0916 79.2451 74.8051 79.2451 68.8242V57.0703C79.2451 55.4135 80.5883 54.0703 82.2451 54.0703C83.9018 54.0705 85.2451 55.4136 85.2451 57.0703V68.8242C85.2451 76.5454 82.2588 81.6557 78.1865 84.748C74.2604 87.7293 69.6215 88.6162 66.46 88.6162H17.0645L17.0244 88.6152C9.78825 88.4199 5.30007 85.1894 2.7959 80.8652C0.430791 76.7811 0.00769019 72.0299 0 68.832V57.0703Z" fill="#ffffff"/>
                                                       <path d="M38.6111 3C38.6111 1.34315 39.9542 0 41.6111 0C43.2679 0.000114414 44.6111 1.34322 44.6111 3V54.5283L60.3113 38.8281C61.4828 37.6566 63.3829 37.6567 64.5545 38.8281C65.726 39.9997 65.726 41.8997 64.5545 43.0713L41.6111 66.0146L18.6677 43.0713C17.4962 41.8997 17.4962 39.9997 18.6677 38.8281C19.8392 37.657 21.7384 37.657 22.9099 38.8281L38.6111 54.5293V3Z" fill="#ffffff"/>
                                                      </svg>
                                                    </span>
                                                    Download
                                              </button>
                                              <ul className="dropdown-menu w-100">
                                                  {icon.type!== "Animated" && (
                                                    <>
                                                    <li className="dropdown-item">
                                                      <button type="button" onClick={handleDownloadSVG} className="btn w-100 svg-bn btn-comons01 crm-btn01">
                                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(255,255,255,1)"><path d="M2.80577 5.20006L7.00505 7.99958L11.1913 2.13881C11.5123 1.6894 12.1369 1.58531 12.5863 1.90631C12.6761 1.97045 12.7546 2.04901 12.8188 2.13881L17.0051 7.99958L21.2043 5.20006C21.6639 4.89371 22.2847 5.01788 22.5911 5.47741C22.7228 5.67503 22.7799 5.91308 22.7522 6.14895L21.109 20.1164C21.0497 20.62 20.6229 20.9996 20.1158 20.9996H3.8943C3.38722 20.9996 2.9604 20.62 2.90115 20.1164L1.25792 6.14895C1.19339 5.60045 1.58573 5.10349 2.13423 5.03896C2.37011 5.01121 2.60816 5.06832 2.80577 5.20006ZM12.0051 14.9996C13.1096 14.9996 14.0051 14.1042 14.0051 12.9996C14.0051 11.895 13.1096 10.9996 12.0051 10.9996C10.9005 10.9996 10.0051 11.895 10.0051 12.9996C10.0051 14.1042 10.9005 14.9996 12.0051 14.9996Z"></path></svg>
                                                      SVG </button>
                                                    </li>
                                                    <li className="dropdown-item">
                                                       <button type="button" onClick={() => svgToCanvasDownload("png")} className="btn w-100 png-bn btn-comons01 crm-btn01">
                                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(0,0,0,1)"><path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path></svg>
                                                      PNG </button>
                                                    </li>
                                                    <li className="dropdown-item">
                                                       <button type="button" onClick={() => svgToCanvasDownload("webp")} className="btn w-100 png-bn btn-comons01 crm-btn01">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(0,0,0,1)"><path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path></svg>
                                                      WEBP </button>
                                                    </li>
                                                  </>
                                                )}
                                           
                                                <li>
                                                  {icon.type === "Animated" && (
                                                  <button
                                                    type="button"
                                                    onClick={handleDownloadGIF}
                                                    className="btn png-bn btn-comons01 crm-btn01"
                                                  >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black">
                                                      <path d="M3 3H21V21H3V3ZM5 5V19H19V5H5ZM8 7H10V17H8V7ZM14 7H16V17H14V7Z" />
                                                    </svg>
                                                    GIF
                                                  </button>

                                                  )}
                                                </li>
                                              </ul>
                                            </div>
                                            <div className="col-3 d-grid justify-content-end">
                                                <div className="dropdown">
                                                   <button type="button" className="btn btn-shares" data-bs-toggle="dropdown"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill=""><path d="M13.1202 17.0228L8.92129 14.7324C8.19135 15.5125 7.15261 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.15255 8 8.19125 8.48746 8.92118 9.26746L13.1202 6.97713C13.0417 6.66441 13 6.33707 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6C21 8.20914 19.2091 10 17 10C15.8474 10 14.8087 9.51251 14.0787 8.73246L9.87977 11.0228C9.9583 11.3355 10 11.6629 10 12C10 12.3371 9.95831 12.6644 9.87981 12.9771L14.0788 15.2675C14.8087 14.4875 15.8474 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 17.6629 13.0417 17.3355 13.1202 17.0228ZM6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14ZM17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8ZM17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z"></path></svg> 
                                                   </button>
                                            
                                              <ul className="dropdown-menu px-3 drop-divu py-3" aria-labelledby="dropdownMenuButton1">
                                                  <li><button className="dropdown-item facebook-btn text-center" onClick={shareToFacebook}> 
                                                      <span> <svg width="16" height="16" viewBox="0 0 73 136" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                                          <path d="M23.0805 24.5077V51.1005H0V74.6825H23.0805V135.896H48.168V74.6825H72.252V51.1005H48.168V33.5391C47.3652 23.9055 53.1855 22.1661 56.196 22.5006H72.252V1.33165C30.6067 -5.19014 23.5822 13.8038 23.0805 24.5077Z" fill="#ffffff"/>
                                                      </svg>

                                                     </span> Facebook</button></li>
                                                  <li className="mt-2"><button className="dropdown-item twitter-btn text-center" onClick={shareToX}>
                                                    <span>
                                                      <svg width="16" height="16" viewBox="0 0 138 140" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M73.1883 54.4075L120.569 0.661621L125.874 5.33818L78.493 59.084L73.1883 54.4075ZM0.339844 135.036L54.7929 72.8041L60.115 77.4609L5.66193 139.693L0.339844 135.036Z" fill="#ffffff"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25391 2.29272H43.7544L137.728 138.779H94.4822L1.25391 2.29272ZM14.6485 9.36455L98.2158 131.707H124.273L40.0375 9.36455H14.6485Z" fill="#ffffff"/>
                                                      </svg>
                                                    </span> (Twitter)</button></li>     

                                                    <li className="mt-2">
                                                    <button className="dropdown-item pinterest-btn text-center" onClick={shareToPinterest}>
                                                      <span>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                                          <path d="M12.04 2C6.46 2 2 6.15 2 11.58C2 15.07 3.94 17.84 6.87 18.75C7.1 18.81 7.21 18.68 7.21 18.56C7.21 18.45 7.2 18.11 7.2 17.76C5.1 18.22 4.59 16.94 4.59 16.94C4.37 16.36 4 16.12 4 16.12C3.45 15.71 4.04 15.71 4.04 15.71C4.65 15.76 4.97 16.34 4.97 16.34C5.5 17.29 6.43 17.02 6.81 16.84C6.87 16.42 7.03 16.14 7.2 15.96C5.38 15.75 3.46 15.08 3.46 11.77C3.46 10.84 3.8 10.08 4.35 9.5C4.26 9.29 3.96 8.4 4.44 7.15C4.44 7.15 5.14 6.91 7.2 8.28C7.87 8.11 8.59 8.02 9.31 8.02C10.03 8.02 10.75 8.11 11.42 8.28C13.47 6.91 14.17 7.15 14.17 7.15C14.65 8.4 14.35 9.29 14.26 9.5C14.8 10.08 15.14 10.84 15.14 11.77C15.14 15.08 13.22 15.75 11.4 15.96C11.65 16.2 11.86 16.65 11.86 17.33C11.86 18.3 11.84 18.98 11.84 19.21C11.84 19.33 11.95 19.47 12.18 19.41C15.17 18.51 17.14 15.64 17.14 11.58C17.14 6.15 12.68 2 12.04 2Z"/>
                                                        </svg>
                                                      </span> Pinterest
                                                    </button>
                                                  </li>                                         
                                                </ul>
                                              </div>
                                            </div>
                                           
                                               
                                           </div>
                                           
                                           <hr/>
                                           <div className="form-group">
                                               <label className="form-label"> Attribuion  </label>
                                           </div>

                                      </div>
                                      {icon.type!=="Animated"&&(
                                      <code className="mt-2 codet p-2 bg-light01 d-inline-block w-100 rounded" style={{ fontSize: '0.75rem', wordBreak: 'break-word' }}>
                                        {renderedSvg}
                                      </code>
                                      )}
                                      


                                      <div className="comon-groups-div01 justify-content-end mt-3 d-flex align-items-center">
                                            {icon.type !=="Animated" &&(
                                              <button
                                                onClick={handleCopy}
                                                className="btn btn-sec ms-3"
                                                title="Copy SVG Code"
                                              >
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6ZM6.9998 11V13H12.9998V11H6.9998ZM6.9998 15V17H12.9998V15H6.9998Z"></path></svg> Copy Code
                                              </button>
                                            )}
                                      
                                      </div>

                                      
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

                    <ul className="nav nav-tabs tabs-newd" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" 
                        data-bs-target="#home" type="button" role="tab" aria-controls="home"
                         aria-selected="true">Details</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" 
                        data-bs-target="#profile" type="button" role="tab" aria-controls="profile" 
                        aria-selected="false">Versions </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" 
                        data-bs-target="#contact" type="button" role="tab" aria-controls="contact"
                         aria-selected="false">License Info </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" 
                        data-bs-target="#contact" type="button" role="tab" aria-controls="contact"
                         aria-selected="false">Usage Tips </button>
                      </li>

                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
                      <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                      <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                    </div>

                   <div className="styles-icons-div  comon-rows mt-0 d-block w-100">
                      <h4 className="sub-titels-h1">Related Icons with the same style</h4>
                      <div className="relatesd t-ind-icons d-block w-100">
                        <div className="row row-cols-1 row-cols-lg-6 gy-2 gy-lg-3">
                          {relatedIcons.map((icon) => (
                            <article key={icon.Id} className="col">
                              <Link href={`/details/${icon.icon_name.replace(/\s+/g, "-").toLowerCase()}_${icon.Id}`} className="btn icons-list p-0 position-relative">
                                  {icon.type === "Animated" ? (
                                  <img
                                    src={`https://iconsguru.ascinatetech.com/public/uploads/animated/${encodeURIComponent(icon.icon_svg)}`}
                                    alt={icon.icon_name}
                                    width={60}
                                    height={60}
                                  />
                                ) : (
                                  <div
                                  className="svg-img d-grid"
                                  dangerouslySetInnerHTML={{ __html: icon.icon_svg }}
                                />
                                )}
                                
                              </Link>
                            </article>
                          ))}
                        </div>
                      </div>
                    </div>



               </div>
              
            </div>
              
        </main>
       <Footer/>
       
    </>
   
  );
}

"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import NavicationHome from "@/app/components/NavicationHome";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Modal from 'bootstrap/js/dist/modal';




//slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function IconDetailPage() {

  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const [icon, setIcon] = useState(null);
  const [color, setColor] = useState(null);
  const [bgColor, setBgColor] = useState(null);
  // default background

  // null to preserve original
  const [size, setSize] = useState(200);
  const [relatedIcons, setRelatedIcons] = useState([]);
  const [variations, setVariations] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showCustom, setShowCustom] = useState(false);


  const [dimensions, setDimensions] = useState("1024 X 1024 px");
  const [fileSize, setFileSize] = useState("N/A");

  useEffect(() => {
    if (!icon?.icon_svg) return;

    // 1. Extract width/height from SVG
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(icon.icon_svg, "image/svg+xml");
    const svgTag = svgDoc.querySelector("svg");

    let width = svgTag?.getAttribute("width");
    let height = svgTag?.getAttribute("height");

    // Fallback if width/height are not set directly
    if (!width || !height) {
      const viewBox = svgTag?.getAttribute("viewBox");
      if (viewBox) {
        const [, , w, h] = viewBox.split(" ");
        width = w;
        height = h;
      }
    }

    if (width && height) {
      setDimensions(`${width} X ${height} px`);
    }

    // 2. Calculate approximate SVG size
    const sizeInKB = new Blob([icon.icon_svg], { type: "image/svg+xml" }).size / 1024;
    setFileSize(`${Math.ceil(sizeInKB)} KB`);
  }, [icon]);


  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    margin: 20,
    autoplay: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 4,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
          arrows: true,
          margin: 20,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          arrows: true,
          dots: false
        }
      },
      {
        breakpoint: 668,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          infinite: true,
          arrows: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          infinite: true,
          arrows: true,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          dots: false
        }
      }
    ]
  };

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
    const fetchIcon = async () => {
      try {
        const res = await fetch(`https://iconsguru.ascinatetech.com/api/icon-by-slug/${slug}`);
        const data = await res.json();
        setIcon(data.icons);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchIcon();
  }, [slug]);

  const uploadIconAsImage = async () => {
    if (icon.type === "Animated") {
      const gifurl = `https://iconsguru.ascinatetech.com/public/uploads/animated/${icon.icon_svg}`;
      return gifurl;
    }
    else {
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
    try {
      const tweetText = 'Check out this icon';
      const tweetUrl = window.location.href;
      const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(tweetUrl)}`;
      window.open(xUrl, '_blank');
    } catch (err) {
      console.error("X share failed:",);
    }

  };

  useEffect(() => {
    if (!icon || !icon.Id) return;
    const fetchRelatedIcons = async () => {
      try {
        const res = await fetch(`https://iconsguru.ascinatetech.com/api/related-icons/${icon.Id}`);
        const data = await res.json();
        console.log("Related fetch icon:", data)
        setRelatedIcons(data.icons || []);
      } catch (err) {
        console.error("Related fetch error:", err);
      }
    };


    fetchRelatedIcons();

  }, [icon?.Id]);

  useEffect(() => {
    if (!icon || !icon.Id) return;
    const fetchVariations = async () => {
      try {
        const res = await fetch(`https://iconsguru.ascinatetech.com/api/icon-variations/${icon.Id}`);
        const data = await res.json();
        setVariations(data.variations || []);
      } catch (err) {
        console.error("Variation fetch error:", err);
      }
    };
    fetchVariations();

  }, [icon?.Id]);



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

  const svgToCanvasDownload = async (type = "png") => {
    if (!icon || !icon.icon_svg) {
      console.error("Icon data is missing");
      return;
    }
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login first to purchase this icon.");
      window.location.href = "/login";
      return;
    }
    try {
      await fetch(`https://iconsguru.ascinatetech.com/api/icon-download/${icon.Id}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.warn("Download count API failed", err);
    }

    const finalSvg = applyColorAndSize(icon.icon_svg);
    const svgBlob = new Blob([finalSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new window.Image(); // ✅ Use native Image constructor
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas export failed");
          return;
        }

        const link = document.createElement("a");
        link.download = `${icon.icon_name.replace(/\s+/g, "-").toLowerCase()}.${type}`;
        link.href = URL.createObjectURL(blob);
        link.click();

        URL.revokeObjectURL(link.href);
      }, `image/${type}`);
    };

    img.onerror = (err) => {
      console.error("Image load failed", err);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };




  const handleDownloadSVG = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login first to purchase this icon.");
      window.location.href = "/login"; // Update path if needed
      return;
    }
    try {
      await fetch(`https://iconsguru.ascinatetech.com/api/icon-download/${icon.Id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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

  const renderPayPalButton = () => {
    const container = document.getElementById("paypal-button-container");
    if (!container || !window.paypal) return;
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login first to purchase this icon.");
      window.location.href = "/login";
      return;
    }
    container.innerHTML = "";

    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: "0.25",
              currency_code: "USD", // Ensure USD is explicitly passed
            },
            description: `Purchase of ${icon.icon_name}`,
          }],
        });
      },

      onApprove: async (data, actions) => {
        try {
          const details = await actions.order.capture();
          console.log("✅ PayPal capture success:", details);

          const token = localStorage.getItem("access_token");
          const res = await fetch("https://iconsguru.ascinatetech.com/api/purchase-icon", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              icon_id: icon.Id,
              license_type: "standard",
              price: 0.25,
              paypal_order_id: data.orderID,
            }),
          });

          const resJson = await res.json();
          console.log("📦 Backend Response:", res.status, resJson);

          if (!res.ok) {
            throw new Error("❌ Backend error: " + (resJson?.message || "Unknown error"));
          }
        const modalEl = document.getElementById("paypalModal");
        const modalInstance = Modal.getInstance(modalEl);
        modalInstance?.hide();   
        
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        const interval = setInterval(function () {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(interval);
          const particleCount = 50 * (timeLeft / duration);

          confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: Math.random(), y: Math.random() - 0.2 }
          }));
        }, 250);
        const successModalEl = document.getElementById("successModal");
        const successModal = new Modal(successModalEl);
        successModal.show();   
        } catch (err) {
          console.error("❌ Payment error:", err);
          alert("Payment failed. " + err.message);
        }
      },

      onError: (err) => {
        console.error("❌ PayPal button error:", err);
        alert("Payment failed.");
      },
    }).render("#paypal-button-container");
  };

  // 🔁 Trigger PayPal button render on modal shown
  useEffect(() => {
    const modalEl = document.getElementById("paypalModal");
    if (!modalEl) return;

    const onShown = () => {
      console.log("🟡 Modal shown – rendering PayPal");
      renderPayPalButton();
    };

    modalEl.addEventListener("shown.bs.modal", onShown);

    return () => {
      modalEl.removeEventListener("shown.bs.modal", onShown);
    };
  }, [icon]);

  if (!icon) return null;

  const renderedSvg = applyColorAndSize(icon.icon_svg);



  const getSchema = (icon) => {
    // Capitalize first letter of each word
    const capitalize = (str) =>
      str?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    const category = capitalize(icon.icon_category || '');
    const type = capitalize(icon.type || '');
    const name = capitalize(icon.icon_name || 'Icon');
    const rawTags = icon.tags;
    const tagsArray = Array.isArray(rawTags)
      ? rawTags
      : typeof rawTags === "string"
        ? rawTags.split(',').map(tag => tag.trim())
        : [];
    const tags = tagsArray.length ? tagsArray.join(', ') : '';


    const description = `Download free ${type} ${name} in ${category} category${tags ? ` with tags: ${tags}` : ''}.`;

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": name,
      "image": "data:image/svg+xml;utf8,${encodeURIComponent(icon.icon_svg)}",
      "description": description,
      "sku": icon.id,
      "offers": {
        "@type": "Offer",
        "url": "https://iconsguru.com/icon/${icon.slug}",
        "price": "0.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "isAccessibleForFree": true,
      "license": "https://iconsguru.com/license"
    };
  };



  return (
    <>
      {/* ✅ Inject SEO schema dynamically only if icon is loaded */}
      {icon && (
        <Head>
          <title>{icon.icon_name} - Free SVG Icon</title>
          <meta name="description" content={`Download free ${icon.icon_name} icon in SVG, PNG, WebP format.`} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchema(icon)) }}
          />
          <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>

        </Head>

      )}
      <Script
        src="https://www.sandbox.paypal.com/sdk/js?client-id=ATjVns30hskSznRUdWTp-lBLxfPTzcj6hkTO68jr-wsptmVu2wLJKeaFHfFb6ke8reFCMjr33bpLc5OC&currency=USD&intent=capture&commit=true"
        strategy="afterInteractive"
      />
    
      <NavicationHome />
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
                <div
                  className="blox-icons-div01"
                  style={{
                    backgroundColor: bgColor !== null ? bgColor : isLightColor(color) ? "#000000" : "#eaf3fa",
                  }}
                >
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
                  <ul className="icon-variations">
                    <li>
                      <Slider {...settings} className="text-center">
                        {variations.map((variation) => (
                          <article
                            key={variation.id}
                            className="d-flex align-items-center justify-content-center w-75 icon-carousel"
                            onClick={() => {

                              router.push(`/${variation.icon_category.toLowerCase()}/${variation.slug}`, undefined, { shallow: true });
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          >
                            {variation.type === "Animated" ? (
                              <img
                                src={`https://iconsguru.ascinatetech.com/public/uploads/animated/${encodeURIComponent(variation.icon_svg)}`}
                                alt={variation.icon_name}
                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                              />) : (<div
                                className="svg-img d-grid"
                                dangerouslySetInnerHTML={{ __html: variation.icon_svg }}
                              />
                            )}

                          </article>
                        ))}
                      </Slider>
                    </li>
                    <li>
                      <Link href="/" className="see-all-variations">
                        See all variations &#62;
                      </Link>
                    </li>
                  </ul>
                </div>

              </div>
              <div className="col-lg-6 col-xl-5 buttons-group01 d-grid justify-content-end">
                <div className="right-details-lis01">
                  <div className="groups-list-btn">
                    <h2 className="icon-headings">{icon.icon_name}</h2>
                    <div className="d-flex align-items-center user-icons-list08">
                      <span className="user-nams01">
                        <Image src="/user01.svg" width={64} height={64} alt="names" />
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
                            {icon.icon_category !== "Emoji" && icon.icon_category !== "Stickers" && icon.type !== "Animated" && (

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
                          <button
                            className="btn w-100 btn-download015 dropdown-toggle"
                            data-bs-auto-close="outside"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span>
                              {/* your SVG icon button */}
                            </span>
                            Download
                          </button>

                          <ul className="dropdown-menu w-100">
                            {icon.is_premium ? (
                              <li className="dropdown-item">
                                <button
                                  type="button"
                                  className="btn w-100 btn-warning crm-btn01"
                                  data-bs-toggle="modal"
                                  data-bs-target="#paypalModal"
                                >
                                  🛒 Buy Now (Standard License)
                                </button>
                              </li>

                            ) : (
                              <>
                                {icon.type !== "Animated" && (
                                  <>
                                    <li className="dropdown-item">
                                      <button
                                        type="button"
                                        onClick={handleDownloadSVG}
                                        className="btn w-100 svg-bn btn-comons01 crm-btn01"
                                      >
                                        SVG
                                      </button>
                                    </li>
                                    <li className="dropdown-item">
                                      <button
                                        type="button"
                                        onClick={() => svgToCanvasDownload("png")}
                                        className="btn w-100 png-bn btn-comons01 crm-btn01"
                                      >
                                        PNG
                                      </button>
                                    </li>
                                    <li className="dropdown-item">
                                      <button
                                        type="button"
                                        onClick={() => svgToCanvasDownload("webp")}
                                        className="btn w-100 png-bn btn-comons01 crm-btn01"
                                      >
                                        WEBP
                                      </button>
                                    </li>
                                  </>
                                )}
                                {icon.type === "Animated" && (
                                  <li className="dropdown-item">
                                    <button
                                      type="button"
                                      onClick={handleDownloadGIF}
                                      className="btn png-bn btn-comons01 crm-btn01"
                                    >
                                      GIF
                                    </button>
                                  </li>
                                )}
                              </>
                            )}
                          </ul>

                        </div>
                        {/* PayPal Modal */}
                        <div
                          className="modal fade"
                          id="paypalModal"
                          tabIndex={-1}
                          aria-labelledby="paypalModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content p-3">
                              <div className="modal-header">
                                <h5 className="modal-title" id="paypalModalLabel">
                                  Complete Your Purchase
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                />
                              </div>
                              <div className="modal-body text-center">
                                <div id="paypal-button-container" />
                              </div>
                            </div>
                          </div>
                        </div>
                         {/* Success Modal */}
                        <div className="modal fade" id="successModal" tabIndex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content text-center">
                              <div className="modal-header">
                                <h5 className="modal-title" id="successModalLabel">Purchase Complete</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                🎉 Your icon has been successfully purchased. You can now download it.
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => location.reload()}>
                                  OK
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>




                        <div className="col-3 d-grid justify-content-end">
                          <div className="dropdown">
                            <button type="button" className="btn btn-shares" data-bs-toggle="dropdown"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill=""><path d="M13.1202 17.0228L8.92129 14.7324C8.19135 15.5125 7.15261 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.15255 8 8.19125 8.48746 8.92118 9.26746L13.1202 6.97713C13.0417 6.66441 13 6.33707 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6C21 8.20914 19.2091 10 17 10C15.8474 10 14.8087 9.51251 14.0787 8.73246L9.87977 11.0228C9.9583 11.3355 10 11.6629 10 12C10 12.3371 9.95831 12.6644 9.87981 12.9771L14.0788 15.2675C14.8087 14.4875 15.8474 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 17.6629 13.0417 17.3355 13.1202 17.0228ZM6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14ZM17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8ZM17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z"></path></svg>
                            </button>

                            <ul className="dropdown-menu px-3 drop-divu py-3" aria-labelledby="dropdownMenuButton1">
                              <li><button className="dropdown-item facebook-btn text-center" onClick={shareToFacebook}>
                                <span> <svg width="16" height="16" viewBox="0 0 73 136" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M23.0805 24.5077V51.1005H0V74.6825H23.0805V135.896H48.168V74.6825H72.252V51.1005H48.168V33.5391C47.3652 23.9055 53.1855 22.1661 56.196 22.5006H72.252V1.33165C30.6067 -5.19014 23.5822 13.8038 23.0805 24.5077Z" fill="#ffffff" />
                                </svg>

                                </span> Facebook</button></li>
                              <li className="mt-2"><button className="dropdown-item twitter-btn text-center" onClick={shareToX}>
                                <span>
                                  <svg width="16" height="16" viewBox="0 0 138 140" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M73.1883 54.4075L120.569 0.661621L125.874 5.33818L78.493 59.084L73.1883 54.4075ZM0.339844 135.036L54.7929 72.8041L60.115 77.4609L5.66193 139.693L0.339844 135.036Z" fill="#ffffff" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25391 2.29272H43.7544L137.728 138.779H94.4822L1.25391 2.29272ZM14.6485 9.36455L98.2158 131.707H124.273L40.0375 9.36455H14.6485Z" fill="#ffffff" />
                                  </svg>
                                </span> (Twitter)</button></li>

                              <li className="mt-2">
                                <button className="dropdown-item pinterest-btn text-center" onClick={shareToPinterest}>
                                  <span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12.04 2C6.46 2 2 6.15 2 11.58C2 15.07 3.94 17.84 6.87 18.75C7.1 18.81 7.21 18.68 7.21 18.56C7.21 18.45 7.2 18.11 7.2 17.76C5.1 18.22 4.59 16.94 4.59 16.94C4.37 16.36 4 16.12 4 16.12C3.45 15.71 4.04 15.71 4.04 15.71C4.65 15.76 4.97 16.34 4.97 16.34C5.5 17.29 6.43 17.02 6.81 16.84C6.87 16.42 7.03 16.14 7.2 15.96C5.38 15.75 3.46 15.08 3.46 11.77C3.46 10.84 3.8 10.08 4.35 9.5C4.26 9.29 3.96 8.4 4.44 7.15C4.44 7.15 5.14 6.91 7.2 8.28C7.87 8.11 8.59 8.02 9.31 8.02C10.03 8.02 10.75 8.11 11.42 8.28C13.47 6.91 14.17 7.15 14.17 7.15C14.65 8.4 14.35 9.29 14.26 9.5C14.8 10.08 15.14 10.84 15.14 11.77C15.14 15.08 13.22 15.75 11.4 15.96C11.65 16.2 11.86 16.65 11.86 17.33C11.86 18.3 11.84 18.98 11.84 19.21C11.84 19.33 11.95 19.47 12.18 19.41C15.17 18.51 17.14 15.64 17.14 11.58C17.14 6.15 12.68 2 12.04 2Z" />
                                    </svg>
                                  </span> Pinterest
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>


                      </div>

                      <hr />
                      <div className="form-group">
                        <label className="form-label"> Attribuion  </label>
                      </div>

                    </div>
                    {icon.type !== "Animated" && (
                      <code className="mt-2 codet p-2 bg-light01 d-inline-block w-100 rounded" style={{ fontSize: '0.75rem', wordBreak: 'break-word' }}>
                        {renderedSvg}
                      </code>
                    )}



                    <div className="comon-groups-div01 justify-content-end mt-3 d-flex align-items-center">
                      {icon.type !== "Animated" && (
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
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <ul className="icon-detail">
                          <li>File formats</li>
                          <li>Dimensions</li>
                          <li>File size</li>
                          <li>Category</li>

                        </ul>
                      </div>
                      <div>
                        <ul className="icon-detail">
                          <li>{icon?.type === "Animated" ? "GIF" : "SVG, PNG, JPG"}</li>
                          <li>{dimensions}</li>
                          <li>{fileSize}</li>
                          <li>{icon?.icon_category || "Uncategorized"}</li>

                        </ul>
                      </div>
                    </div>

                    <ul className="inputColor-ul">
                      <li>
                        <h5 className="">Try Icon on Background</h5>
                      </li>

                      {/* Default background remover */}
                      <li
                        onClick={() => setBgColor(null)}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          border: bgColor === null ? "2px solid #000" : "1px solid #ccc",
                          backgroundColor: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                        }}
                        title="Default"
                      >
                        ×
                      </li>

                      {/* Color variations */}
                      {[
                        { hex: "#ff0000", name: "Red" },
                        { hex: "#ffff00", name: "Yellow" },
                        { hex: "#0000ff", name: "Blue" },
                      ].map((item) => (
                        <li
                          key={item.hex}
                          onClick={() => setBgColor(item.hex)}
                          style={{
                            backgroundColor: item.hex,
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            border: bgColor === item.hex ? "2px solid #000" : "1px solid #ccc",
                          }}
                          title={item.name}
                        ></li>
                      ))}
                    </ul>



                  </div>
                  <div className="col-lg-6">
                    <ul className="detail-right">
                      <li>
                        <h6>More by this creator</h6>
                      </li>
                      <li className="d-flex justify-content-between gap-4">
                        <div className="morebyicons d-flex justify-content-center align-items-center">
                          <svg width="64" height="64" viewBox="0 0 134 149" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M108.768 42.9062C109.281 41.6242 110.735 41.0007 112.017 41.5135C114.671 42.575 117.516 44.3299 119.974 46.4664C122.416 48.59 124.638 51.2306 125.843 54.1364C127.075 57.1091 127.277 60.4955 125.361 63.6622C123.517 66.7105 119.969 69.1097 114.724 70.8582C113.414 71.2948 111.998 70.5869 111.562 69.2771C111.125 67.9672 111.833 66.5514 113.143 66.1148C117.853 64.5448 120.113 62.6773 121.083 61.0737C121.982 59.5886 122.006 57.938 121.224 56.0514C120.414 54.098 118.784 52.0571 116.693 50.2399C114.618 48.4357 112.247 46.9906 110.16 46.1558C108.878 45.6431 108.255 44.1881 108.768 42.9062Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M120.199 27.2123C117.843 23.2289 113.734 18.6148 108.208 17.1247C101.668 15.3611 94.3961 18.2303 87.2527 28.1518C86.9976 28.5061 86.8397 28.921 86.7948 29.3553L84.0121 56.2541C76.5649 67.4676 51.6072 86.1597 13.0336 77.426C12.2923 77.2582 11.5149 77.4367 10.9211 77.9111C10.3272 78.3855 9.98149 79.1043 9.98149 79.8643C9.98149 84.4702 11.565 88.2404 13.8988 91.3801L3.38992 89.7208C2.45725 89.5736 1.52118 89.9644 0.970053 90.731C0.418927 91.4977 0.346781 92.5095 0.783547 93.3467C6.7979 104.874 19.6567 116.17 35.7125 121.808C51.8578 127.478 71.3613 127.468 90.5515 116.151C90.5791 116.135 90.6064 116.118 90.6334 116.101C97.5945 111.626 106.034 103.782 111.248 91.7885C116.298 80.1741 118.238 64.8608 113.129 45.2941C114.998 44.5797 117.436 43.8132 120.035 43.3008C123.724 42.5735 127.404 42.4269 130.209 43.362C131.108 43.6614 132.098 43.4276 132.768 42.758C133.437 42.0884 133.671 41.098 133.372 40.1997C132.656 38.0527 131.134 34.9004 128.806 32.2347C126.756 29.8878 123.876 27.6981 120.199 27.2123ZM91.6987 30.5414C98.0339 21.9895 103.265 20.9704 106.906 21.9522C111.047 23.0688 114.538 27.0766 116.456 30.7659C116.886 31.5934 117.741 32.1125 118.674 32.1125C121.088 32.1125 123.225 33.4452 125.04 35.5237C125.652 36.2241 126.197 36.9772 126.672 37.7309C124.085 37.6185 121.454 37.9248 119.068 38.3952C115.007 39.1956 111.31 40.5414 109.093 41.5648C107.976 42.0803 107.4 43.3318 107.735 44.5155C113.284 64.1229 111.386 78.9317 106.663 89.7949C101.932 100.676 94.2752 107.806 87.9699 111.869C70.1959 122.334 52.2639 122.321 37.369 117.091C24.5466 112.588 14.0659 104.251 7.94414 95.5019L20.6249 97.5041C21.7451 97.681 22.844 97.0817 23.3019 96.0442C23.7599 95.0067 23.4621 93.791 22.5766 93.0825C18.9852 90.2095 16.2781 87.0106 15.3398 83.0141C54.7016 90.5224 80.648 70.9565 88.5508 58.4437C88.7565 58.118 88.8841 57.7492 88.9238 57.366L91.6987 30.5414ZM89.5405 74.5333C90.9138 74.6764 91.9111 75.9056 91.768 77.2789C90.9311 85.3134 86.9275 95.7627 78.8364 101.993C74.7384 105.149 69.6256 107.188 63.4859 107.253C57.3761 107.318 50.4075 105.429 42.5447 101.006C41.3413 100.329 40.9145 98.805 41.5914 97.6016C42.2683 96.3982 43.7926 95.9714 44.996 96.6483C52.3036 100.759 58.4116 102.307 63.4326 102.253C68.4238 102.2 72.4962 100.565 75.7858 98.0317C82.4701 92.8845 86.0516 83.8967 86.7949 76.7609C86.938 75.3876 88.1672 74.3903 89.5405 74.5333Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M70.3185 119.084C71.6993 119.084 72.8185 120.203 72.8185 121.584V138.547L92.0325 129.741C93.2876 129.166 94.7715 129.717 95.3468 130.972C95.922 132.227 95.3709 133.711 94.1157 134.286L78.7738 141.318L93.4851 143.77C94.847 143.997 95.7671 145.285 95.5401 146.647C95.3131 148.009 94.025 148.929 92.6631 148.702L69.9075 144.909C68.7021 144.708 67.8185 143.665 67.8185 142.443V121.584C67.8185 120.203 68.9378 119.084 70.3185 119.084Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M100.578 5.67282C98.0839 6.3225 95.685 8.72319 94.2457 11.026C93.96 11.4831 93.5343 11.8356 93.0319 12.031C89.8886 13.2533 88.2292 14.6028 87.3958 15.7749C86.609 16.8814 86.4238 18.0141 86.6266 19.2174C87.0753 21.8802 89.4408 24.8019 91.8059 26.7236C92.8775 27.5943 93.0404 29.1688 92.1697 30.2404C91.2991 31.312 89.7246 31.4749 88.653 30.6042C85.9613 28.4172 82.4483 24.5123 81.6961 20.0482C81.2984 17.6881 81.682 15.1823 83.3209 12.8774C84.8021 10.7943 87.1753 9.06134 90.4642 7.67661C92.2776 5.03333 95.3724 1.86191 99.3179 0.834256C101.571 0.24751 104.041 0.38303 106.508 1.64364C108.649 2.7379 110.653 4.60867 112.509 7.30735C113.943 7.46399 115.488 7.77268 116.96 8.28544C118.86 8.94703 120.859 10.0257 122.245 11.7756C123.716 13.6317 124.312 16.0158 123.698 18.7701C123.111 21.4004 121.45 24.2775 118.659 27.4665C117.75 28.5056 116.171 28.6109 115.132 27.7017C114.092 26.7925 113.987 25.2131 114.896 24.174C117.416 21.2949 118.488 19.1625 118.818 17.682C119.12 16.3257 118.815 15.4978 118.326 14.8806C117.753 14.1572 116.734 13.5014 115.316 13.0073C113.925 12.523 112.358 12.2676 110.964 12.1978C110.147 12.157 109.402 11.7193 108.969 11.0259C107.226 8.23727 105.592 6.79067 104.233 6.09603C102.927 5.42874 101.723 5.37463 100.578 5.67282Z" fill="black" />
                            <path d="M108.244 29.614C108.244 31.1849 106.971 32.4584 105.4 32.4584C103.829 32.4584 102.556 31.1849 102.556 29.614C102.556 28.043 103.829 26.7695 105.4 26.7695C106.971 26.7695 108.244 28.043 108.244 29.614Z" fill="black" />
                          </svg>
                        </div>
                        <div className="morebyicons d-flex justify-content-center align-items-center">
                          <svg width="64" height="64" viewBox="0 0 134 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M127.984 108.955C127.676 103.636 123.019 98.8603 117.437 99.1543C115.783 99.2415 114.371 97.9708 114.284 96.3163C114.197 94.6617 115.467 93.2498 117.122 93.1626C126.414 92.6732 133.5 100.423 133.974 108.608C134.22 112.847 132.72 117.217 129.021 120.692C125.371 124.122 119.787 126.495 112.122 127.323C110.475 127.501 108.995 126.31 108.817 124.663C108.639 123.016 109.83 121.536 111.477 121.358C118.295 120.621 122.497 118.59 124.913 116.32C127.281 114.095 128.13 111.469 127.984 108.955Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M52.9981 6.60557C52.8622 7.79885 52.6571 9.04612 52.3658 10.1887C51.9136 11.9617 51.3714 12.9981 50.9654 13.404C49.7939 14.5756 49.7939 16.4751 50.9654 17.6467C52.137 18.8182 54.0365 18.8182 55.2081 17.6467C56.8083 16.0464 57.6698 13.6708 58.1797 11.6713C58.7196 9.55437 58.999 7.29682 59.1265 5.46144C59.347 2.28799 56.5263 -0.175594 53.4429 0.38707C32.6479 4.18171 26.8779 22.2941 26.6031 31.0884C26.5513 32.7445 27.8518 34.1289 29.5079 34.1807C31.1639 34.2324 32.5484 32.9319 32.6001 31.2758C32.8209 24.2123 37.3357 10.2629 52.9981 6.60557Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M55.4253 17.8273C49.3462 21.9001 44.7696 27.4374 42.2359 31.584C41.2081 33.2661 39.3195 34.1987 37.3775 34.0214C30.6274 33.4051 21.6627 34.5983 15.1245 39.7376C8.82738 44.6874 4.12298 53.8305 6.7324 70.6468C6.93686 71.9644 7.65585 73.3333 9.28733 74.3372C10.9759 75.3762 13.9156 76.1842 18.7825 75.6836C22.4584 75.3055 25.259 78.7603 24.5038 82.1706C22.0494 93.2551 29.3889 100.843 34.7202 103.937C36.217 104.805 37.2986 106.434 37.2986 108.354V117.643C37.2986 120.487 35.0295 122.465 32.6334 122.733C26.2829 123.444 23.2322 128.481 22.114 133.083H45.2751C45.4841 130.65 46.3542 127.962 48.2383 125.462C51.0949 121.672 56.0355 118.63 63.7178 117.331C63.7271 117.306 63.7361 117.279 63.7441 117.25C63.759 117.195 63.7683 117.142 63.773 117.095C59.4977 113.239 55.5894 107.695 55.8369 100.976C56.0926 94.0346 60.7246 87.0282 71.0228 80.3343C72.4119 79.4314 74.2701 79.8255 75.173 81.2147C76.076 82.6039 75.6819 84.462 74.2927 85.365C64.7547 91.5647 61.9852 97.0591 61.8328 101.196C61.6767 105.434 64.2075 109.468 67.9805 112.808C69.943 114.545 69.9934 117.139 69.5326 118.828C69.0734 120.512 67.6949 122.77 65.0378 123.195C58.2513 124.28 54.7687 126.766 53.0298 129.074C52.011 130.425 51.5026 131.829 51.3133 133.083H87.417C97.0773 132.331 103.721 128.822 108.032 124.049C112.391 119.224 114.598 112.85 114.869 106.039C115.419 92.2241 108.023 77.6655 96.4399 72.2599C91.1739 69.8025 83.1003 67.4926 74.7258 65.6233C66.3994 63.7647 58.0029 62.3909 52.2124 61.7483C49.6827 61.4676 47.7382 59.337 47.7382 56.759V48.9933C47.7382 46.8915 49.052 45.0828 50.8953 44.3324C73.8565 34.9844 77.218 19.9844 76.3499 12.6226C68.3506 11.4373 61.2665 13.9139 55.4253 17.8273ZM52.0857 12.8426C59.0537 8.17434 67.9828 5.02011 78.2356 6.85184C80.13 7.1903 81.7677 8.65331 82.1327 10.7204C83.8815 20.6231 79.5431 38.901 53.7382 49.6504V55.8838C59.7123 56.5876 67.9175 57.9559 76.0329 59.7674C84.499 61.6571 93.097 64.0787 98.9772 66.8228C113.228 73.473 121.488 90.6193 120.864 106.278C120.548 114.205 117.96 122.01 112.485 128.071C106.978 134.166 98.7821 138.242 87.7574 139.074C87.6823 139.08 87.607 139.083 87.5317 139.083H20.7393C17.9888 139.083 15.3837 136.699 15.9077 133.514C16.8523 127.772 20.7282 118.401 31.2986 116.856V108.883C25.0242 105.075 15.8226 95.7114 18.4686 81.7358C13.2204 82.1421 9.13487 81.2883 6.1429 79.4472C2.91979 77.4639 1.2599 74.5089 0.803361 71.5668C-2.04896 53.1852 3.00074 41.6357 11.4167 35.0204C19.4054 28.7409 29.8126 27.4095 37.3974 28.0017C40.3382 23.3249 45.3733 17.3396 52.0857 12.8426Z" fill="black" />
                            <path d="M29 50C29 52.2091 27.2091 54 25 54C22.7909 54 21 52.2091 21 50C21 47.7909 22.7909 46 25 46C27.2091 46 29 47.7909 29 50Z" fill="black" />
                          </svg>
                        </div>
                        <div className="morebyicons d-flex justify-content-center align-items-center">
                          <svg width="64" height="64" viewBox="0 0 130 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M122.662 68.7039C116.717 69.2672 110.86 66.9323 107.883 65.0273L111.117 59.9736C113.346 61.4 117.951 63.1704 122.233 62.7169C124.433 62.4838 126.466 63.5817 127.673 64.8743C128.311 65.5568 128.919 66.5002 129.14 67.6574C129.377 68.907 129.123 70.2663 128.216 71.409C123.255 77.659 114.565 83.9694 102.628 82.4773L103.372 76.5236C111.946 77.5953 118.458 73.51 122.662 68.7039ZM123.322 69.0098C123.328 69.0165 123.33 69.0199 123.329 69.02C123.329 69.0201 123.327 69.0167 123.322 69.0098Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.23544 59.1075C8.49539 46.6818 20.7293 44.6681 26.4495 45.5348L25.5506 51.4671C22.0257 50.933 13.5113 52.0579 7.685 60.1761C10.4424 59.8525 13.4648 59.7423 16.0609 60.1455C17.6934 60.3991 19.454 60.8982 20.8746 61.9263C22.434 63.0549 23.5 64.7805 23.5 67.0011H17.5C17.5 66.9874 17.501 66.976 17.5019 66.9658C17.5063 66.9134 17.5077 66.8961 17.3568 66.7869C17.0379 66.5561 16.3487 66.2621 15.1401 66.0744C12.7547 65.7039 9.49155 65.9125 6.48688 66.401C4.53384 66.7185 2.71842 65.8971 1.63679 64.5383C0.518153 63.1329 0.115344 61.0246 1.23544 59.1075Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M82.9466 92.9415C103.589 79.9699 110.021 56.6713 100.472 41.4755C90.9225 26.2797 67.1399 21.9684 46.4979 34.94C25.8559 47.9117 19.4236 71.2103 28.9728 86.4061C38.522 101.602 62.3046 105.913 82.9466 92.9415ZM86.1391 98.0217C108.689 83.8513 117.38 57.1054 105.552 38.283C93.7237 19.4606 65.8551 15.6895 43.3055 29.8598C20.7559 44.0302 12.0645 70.7761 23.8926 89.5985C35.7208 108.421 63.5895 112.192 86.1391 98.0217Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M67.8551 41.4001L70.8855 21.4863L76.8172 22.389L73.7146 42.7776L85.8493 54.9124L110.051 51.3269L110.93 57.2621L87.2765 60.7664L83.323 78.557L95.0061 90.2401L90.7634 94.4828L79.094 82.8133L62.282 86.723L59.696 106.549L53.7464 105.773L56.4104 85.349L43.2748 72.2134L19.5229 75.3505L18.7373 69.4021L41.9581 66.3352L46.2456 49.9649L34.1389 37.8582L38.3816 33.6156L50.5039 45.7379L67.8551 41.4001ZM69.6002 47.1485L52.0355 51.5397L47.6875 68.1409L60.5194 80.9728L77.5183 77.0196L81.5097 59.0581L69.6002 47.1485Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M64.9576 1.31582C66.3443 2.42947 67.2178 4.31932 66.9087 6.34432C66.4927 9.07023 66.4676 12.3272 67.1527 15.2771C67.8388 18.2311 69.1643 20.6034 71.2204 22.0427L67.7797 26.9581C64.1136 24.3918 62.2003 20.4755 61.3083 16.6344C60.6083 13.6205 60.4924 10.4841 60.718 7.67707C56.0272 12.0346 51.564 19.2208 52.4844 28.1943L46.5157 28.8065C45.176 15.7444 52.7934 5.98644 59.1112 1.19779C61.1299 -0.332323 63.4834 0.131955 64.9576 1.31582Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M83.3621 99.6006C87.363 112.331 78.1373 121.922 71.1455 126.551C69.0346 127.948 66.7218 127.352 65.3051 126.135C63.9625 124.981 63.1239 123.087 63.435 121.074C64.4098 114.767 61.0143 109.152 58.9338 107.175L63.0663 102.825C65.9831 105.596 70.1389 112.323 69.5534 120.329C75.3414 115.944 80.1072 109.256 77.6381 101.4L83.3621 99.6006Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M103.76 9.9497C100.188 11.3211 97.6949 14.7802 97.2891 18.0269C97.1545 19.1041 96.7249 20.2747 96.2329 21.3175C95.7182 22.4083 95.0361 23.5665 94.2411 24.6482C93.4519 25.7219 92.4955 26.7965 91.4085 27.6589C90.3478 28.5004 88.959 29.3008 87.3313 29.4816L86.6687 23.5183C86.754 23.5089 87.0967 23.4207 87.6795 22.9584C88.2359 22.517 88.8349 21.8726 89.4065 21.0948C89.9722 20.3251 90.4563 19.4996 90.8066 18.7571C91.1796 17.9667 91.3139 17.4547 91.3354 17.2827C92.0114 11.875 95.9374 6.52606 101.609 4.34836C107.561 2.06351 114.808 3.45314 121.653 10.2986C124.888 13.5337 126.457 19.582 125.126 25.1453C123.719 31.0251 119.13 36.3377 110.321 38.1628C110.28 38.1836 110.219 38.216 110.136 38.264C109.877 38.4138 109.527 38.6461 109.135 38.9514C108.33 39.5775 107.525 40.3708 106.996 41.1641L102.004 37.8359C102.998 36.3452 104.316 35.098 105.451 34.215C106.029 33.7657 106.604 33.3763 107.127 33.0732C107.552 32.8266 108.234 32.4619 108.951 32.3187C115.718 30.9651 118.448 27.2715 119.291 23.7488C120.22 19.8668 118.934 16.0652 117.41 14.5412C111.875 9.00559 107.053 8.68543 103.76 9.9497Z" fill="black" />
                            <path d="M108 16.5C108 17.8807 106.881 19 105.5 19C104.119 19 103 17.8807 103 16.5C103 15.1193 104.119 14 105.5 14C106.881 14 108 15.1193 108 16.5Z" fill="black" />
                            <path d="M116 22.5C116 23.8807 114.881 25 113.5 25C112.119 25 111 23.8807 111 22.5C111 21.1193 112.119 20 113.5 20C114.881 20 116 21.1193 116 22.5Z" fill="black" />
                          </svg>
                        </div>
                        <div className="morebyicons d-flex justify-content-center align-items-center">
                          <svg width="64" height="64" viewBox="0 0 130 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M122.662 68.7039C116.717 69.2672 110.86 66.9323 107.883 65.0273L111.117 59.9736C113.346 61.4 117.951 63.1704 122.233 62.7169C124.433 62.4838 126.466 63.5817 127.673 64.8743C128.311 65.5568 128.919 66.5002 129.14 67.6574C129.377 68.907 129.123 70.2663 128.216 71.409C123.255 77.659 114.565 83.9694 102.628 82.4773L103.372 76.5236C111.946 77.5953 118.458 73.51 122.662 68.7039ZM123.322 69.0098C123.328 69.0165 123.33 69.0199 123.329 69.02C123.329 69.0201 123.327 69.0167 123.322 69.0098Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.23544 59.1075C8.49539 46.6818 20.7293 44.6681 26.4495 45.5348L25.5506 51.4671C22.0257 50.933 13.5113 52.0579 7.685 60.1761C10.4424 59.8525 13.4648 59.7423 16.0609 60.1455C17.6934 60.3991 19.454 60.8982 20.8746 61.9263C22.434 63.0549 23.5 64.7805 23.5 67.0011H17.5C17.5 66.9874 17.501 66.976 17.5019 66.9658C17.5063 66.9134 17.5077 66.8961 17.3568 66.7869C17.0379 66.5561 16.3487 66.2621 15.1401 66.0744C12.7547 65.7039 9.49155 65.9125 6.48688 66.401C4.53384 66.7185 2.71842 65.8971 1.63679 64.5383C0.518153 63.1329 0.115344 61.0246 1.23544 59.1075Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M82.9466 92.9415C103.589 79.9699 110.021 56.6713 100.472 41.4755C90.9225 26.2797 67.1399 21.9684 46.4979 34.94C25.8559 47.9117 19.4236 71.2103 28.9728 86.4061C38.522 101.602 62.3046 105.913 82.9466 92.9415ZM86.1391 98.0217C108.689 83.8513 117.38 57.1054 105.552 38.283C93.7237 19.4606 65.8551 15.6895 43.3055 29.8598C20.7559 44.0302 12.0645 70.7761 23.8926 89.5985C35.7208 108.421 63.5895 112.192 86.1391 98.0217Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M67.8551 41.4001L70.8855 21.4863L76.8172 22.389L73.7146 42.7776L85.8493 54.9124L110.051 51.3269L110.93 57.2621L87.2765 60.7664L83.323 78.557L95.0061 90.2401L90.7634 94.4828L79.094 82.8133L62.282 86.723L59.696 106.549L53.7464 105.773L56.4104 85.349L43.2748 72.2134L19.5229 75.3505L18.7373 69.4021L41.9581 66.3352L46.2456 49.9649L34.1389 37.8582L38.3816 33.6156L50.5039 45.7379L67.8551 41.4001ZM69.6002 47.1485L52.0355 51.5397L47.6875 68.1409L60.5194 80.9728L77.5183 77.0196L81.5097 59.0581L69.6002 47.1485Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M64.9576 1.31582C66.3443 2.42947 67.2178 4.31932 66.9087 6.34432C66.4927 9.07023 66.4676 12.3272 67.1527 15.2771C67.8388 18.2311 69.1643 20.6034 71.2204 22.0427L67.7797 26.9581C64.1136 24.3918 62.2003 20.4755 61.3083 16.6344C60.6083 13.6205 60.4924 10.4841 60.718 7.67707C56.0272 12.0346 51.564 19.2208 52.4844 28.1943L46.5157 28.8065C45.176 15.7444 52.7934 5.98644 59.1112 1.19779C61.1299 -0.332323 63.4834 0.131955 64.9576 1.31582Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M83.3621 99.6006C87.363 112.331 78.1373 121.922 71.1455 126.551C69.0346 127.948 66.7218 127.352 65.3051 126.135C63.9625 124.981 63.1239 123.087 63.435 121.074C64.4098 114.767 61.0143 109.152 58.9338 107.175L63.0663 102.825C65.9831 105.596 70.1389 112.323 69.5534 120.329C75.3414 115.944 80.1072 109.256 77.6381 101.4L83.3621 99.6006Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M103.76 9.9497C100.188 11.3211 97.6949 14.7802 97.2891 18.0269C97.1545 19.1041 96.7249 20.2747 96.2329 21.3175C95.7182 22.4083 95.0361 23.5665 94.2411 24.6482C93.4519 25.7219 92.4955 26.7965 91.4085 27.6589C90.3478 28.5004 88.959 29.3008 87.3313 29.4816L86.6687 23.5183C86.754 23.5089 87.0967 23.4207 87.6795 22.9584C88.2359 22.517 88.8349 21.8726 89.4065 21.0948C89.9722 20.3251 90.4563 19.4996 90.8066 18.7571C91.1796 17.9667 91.3139 17.4547 91.3354 17.2827C92.0114 11.875 95.9374 6.52606 101.609 4.34836C107.561 2.06351 114.808 3.45314 121.653 10.2986C124.888 13.5337 126.457 19.582 125.126 25.1453C123.719 31.0251 119.13 36.3377 110.321 38.1628C110.28 38.1836 110.219 38.216 110.136 38.264C109.877 38.4138 109.527 38.6461 109.135 38.9514C108.33 39.5775 107.525 40.3708 106.996 41.1641L102.004 37.8359C102.998 36.3452 104.316 35.098 105.451 34.215C106.029 33.7657 106.604 33.3763 107.127 33.0732C107.552 32.8266 108.234 32.4619 108.951 32.3187C115.718 30.9651 118.448 27.2715 119.291 23.7488C120.22 19.8668 118.934 16.0652 117.41 14.5412C111.875 9.00559 107.053 8.68543 103.76 9.9497Z" fill="black" />
                            <path d="M108 16.5C108 17.8807 106.881 19 105.5 19C104.119 19 103 17.8807 103 16.5C103 15.1193 104.119 14 105.5 14C106.881 14 108 15.1193 108 16.5Z" fill="black" />
                            <path d="M116 22.5C116 23.8807 114.881 25 113.5 25C112.119 25 111 23.8807 111 22.5C111 21.1193 112.119 20 113.5 20C114.881 20 116 21.1193 116 22.5Z" fill="black" />
                          </svg>
                        </div>
                      </li>
                      <li className="my-3">
                        <Link href='/' className="icon-details-page">More</Link>
                        <span className="morearrow">&#62;</span>
                      </li>
                      <li>
                        <h6>Users also viewed</h6>
                      </li>
                      <li className="d-flex justify-content-between gap-4">
                        <div className="morebyicons d-flex justify-content-center align-items-center">
                          <svg width="64" height="64" viewBox="0 0 134 149" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M108.768 42.9062C109.281 41.6242 110.735 41.0007 112.017 41.5135C114.671 42.575 117.516 44.3299 119.974 46.4664C122.416 48.59 124.638 51.2306 125.843 54.1364C127.075 57.1091 127.277 60.4955 125.361 63.6622C123.517 66.7105 119.969 69.1097 114.724 70.8582C113.414 71.2948 111.998 70.5869 111.562 69.2771C111.125 67.9672 111.833 66.5514 113.143 66.1148C117.853 64.5448 120.113 62.6773 121.083 61.0737C121.982 59.5886 122.006 57.938 121.224 56.0514C120.414 54.098 118.784 52.0571 116.693 50.2399C114.618 48.4357 112.247 46.9906 110.16 46.1558C108.878 45.6431 108.255 44.1881 108.768 42.9062Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M120.199 27.2123C117.843 23.2289 113.734 18.6148 108.208 17.1247C101.668 15.3611 94.3961 18.2303 87.2527 28.1518C86.9976 28.5061 86.8397 28.921 86.7948 29.3553L84.0121 56.2541C76.5649 67.4676 51.6072 86.1597 13.0336 77.426C12.2923 77.2582 11.5149 77.4367 10.9211 77.9111C10.3272 78.3855 9.98149 79.1043 9.98149 79.8643C9.98149 84.4702 11.565 88.2404 13.8988 91.3801L3.38992 89.7208C2.45725 89.5736 1.52118 89.9644 0.970053 90.731C0.418927 91.4977 0.346781 92.5095 0.783547 93.3467C6.7979 104.874 19.6567 116.17 35.7125 121.808C51.8578 127.478 71.3613 127.468 90.5515 116.151C90.5791 116.135 90.6064 116.118 90.6334 116.101C97.5945 111.626 106.034 103.782 111.248 91.7885C116.298 80.1741 118.238 64.8608 113.129 45.2941C114.998 44.5797 117.436 43.8132 120.035 43.3008C123.724 42.5735 127.404 42.4269 130.209 43.362C131.108 43.6614 132.098 43.4276 132.768 42.758C133.437 42.0884 133.671 41.098 133.372 40.1997C132.656 38.0527 131.134 34.9004 128.806 32.2347C126.756 29.8878 123.876 27.6981 120.199 27.2123ZM91.6987 30.5414C98.0339 21.9895 103.265 20.9704 106.906 21.9522C111.047 23.0688 114.538 27.0766 116.456 30.7659C116.886 31.5934 117.741 32.1125 118.674 32.1125C121.088 32.1125 123.225 33.4452 125.04 35.5237C125.652 36.2241 126.197 36.9772 126.672 37.7309C124.085 37.6185 121.454 37.9248 119.068 38.3952C115.007 39.1956 111.31 40.5414 109.093 41.5648C107.976 42.0803 107.4 43.3318 107.735 44.5155C113.284 64.1229 111.386 78.9317 106.663 89.7949C101.932 100.676 94.2752 107.806 87.9699 111.869C70.1959 122.334 52.2639 122.321 37.369 117.091C24.5466 112.588 14.0659 104.251 7.94414 95.5019L20.6249 97.5041C21.7451 97.681 22.844 97.0817 23.3019 96.0442C23.7599 95.0067 23.4621 93.791 22.5766 93.0825C18.9852 90.2095 16.2781 87.0106 15.3398 83.0141C54.7016 90.5224 80.648 70.9565 88.5508 58.4437C88.7565 58.118 88.8841 57.7492 88.9238 57.366L91.6987 30.5414ZM89.5405 74.5333C90.9138 74.6764 91.9111 75.9056 91.768 77.2789C90.9311 85.3134 86.9275 95.7627 78.8364 101.993C74.7384 105.149 69.6256 107.188 63.4859 107.253C57.3761 107.318 50.4075 105.429 42.5447 101.006C41.3413 100.329 40.9145 98.805 41.5914 97.6016C42.2683 96.3982 43.7926 95.9714 44.996 96.6483C52.3036 100.759 58.4116 102.307 63.4326 102.253C68.4238 102.2 72.4962 100.565 75.7858 98.0317C82.4701 92.8845 86.0516 83.8967 86.7949 76.7609C86.938 75.3876 88.1672 74.3903 89.5405 74.5333Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M70.3185 119.084C71.6993 119.084 72.8185 120.203 72.8185 121.584V138.547L92.0325 129.741C93.2876 129.166 94.7715 129.717 95.3468 130.972C95.922 132.227 95.3709 133.711 94.1157 134.286L78.7738 141.318L93.4851 143.77C94.847 143.997 95.7671 145.285 95.5401 146.647C95.3131 148.009 94.025 148.929 92.6631 148.702L69.9075 144.909C68.7021 144.708 67.8185 143.665 67.8185 142.443V121.584C67.8185 120.203 68.9378 119.084 70.3185 119.084Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M100.578 5.67282C98.0839 6.3225 95.685 8.72319 94.2457 11.026C93.96 11.4831 93.5343 11.8356 93.0319 12.031C89.8886 13.2533 88.2292 14.6028 87.3958 15.7749C86.609 16.8814 86.4238 18.0141 86.6266 19.2174C87.0753 21.8802 89.4408 24.8019 91.8059 26.7236C92.8775 27.5943 93.0404 29.1688 92.1697 30.2404C91.2991 31.312 89.7246 31.4749 88.653 30.6042C85.9613 28.4172 82.4483 24.5123 81.6961 20.0482C81.2984 17.6881 81.682 15.1823 83.3209 12.8774C84.8021 10.7943 87.1753 9.06134 90.4642 7.67661C92.2776 5.03333 95.3724 1.86191 99.3179 0.834256C101.571 0.24751 104.041 0.38303 106.508 1.64364C108.649 2.7379 110.653 4.60867 112.509 7.30735C113.943 7.46399 115.488 7.77268 116.96 8.28544C118.86 8.94703 120.859 10.0257 122.245 11.7756C123.716 13.6317 124.312 16.0158 123.698 18.7701C123.111 21.4004 121.45 24.2775 118.659 27.4665C117.75 28.5056 116.171 28.6109 115.132 27.7017C114.092 26.7925 113.987 25.2131 114.896 24.174C117.416 21.2949 118.488 19.1625 118.818 17.682C119.12 16.3257 118.815 15.4978 118.326 14.8806C117.753 14.1572 116.734 13.5014 115.316 13.0073C113.925 12.523 112.358 12.2676 110.964 12.1978C110.147 12.157 109.402 11.7193 108.969 11.0259C107.226 8.23727 105.592 6.79067 104.233 6.09603C102.927 5.42874 101.723 5.37463 100.578 5.67282Z" fill="black" />
                            <path d="M108.244 29.614C108.244 31.1849 106.971 32.4584 105.4 32.4584C103.829 32.4584 102.556 31.1849 102.556 29.614C102.556 28.043 103.829 26.7695 105.4 26.7695C106.971 26.7695 108.244 28.043 108.244 29.614Z" fill="black" />
                          </svg>
                        </div>
                        <div className="morebyicons d-flex justify-content-center align-items-center">
                          <svg width="64" height="64" viewBox="0 0 134 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M127.984 108.955C127.676 103.636 123.019 98.8603 117.437 99.1543C115.783 99.2415 114.371 97.9708 114.284 96.3163C114.197 94.6617 115.467 93.2498 117.122 93.1626C126.414 92.6732 133.5 100.423 133.974 108.608C134.22 112.847 132.72 117.217 129.021 120.692C125.371 124.122 119.787 126.495 112.122 127.323C110.475 127.501 108.995 126.31 108.817 124.663C108.639 123.016 109.83 121.536 111.477 121.358C118.295 120.621 122.497 118.59 124.913 116.32C127.281 114.095 128.13 111.469 127.984 108.955Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M52.9981 6.60557C52.8622 7.79885 52.6571 9.04612 52.3658 10.1887C51.9136 11.9617 51.3714 12.9981 50.9654 13.404C49.7939 14.5756 49.7939 16.4751 50.9654 17.6467C52.137 18.8182 54.0365 18.8182 55.2081 17.6467C56.8083 16.0464 57.6698 13.6708 58.1797 11.6713C58.7196 9.55437 58.999 7.29682 59.1265 5.46144C59.347 2.28799 56.5263 -0.175594 53.4429 0.38707C32.6479 4.18171 26.8779 22.2941 26.6031 31.0884C26.5513 32.7445 27.8518 34.1289 29.5079 34.1807C31.1639 34.2324 32.5484 32.9319 32.6001 31.2758C32.8209 24.2123 37.3357 10.2629 52.9981 6.60557Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M55.4253 17.8273C49.3462 21.9001 44.7696 27.4374 42.2359 31.584C41.2081 33.2661 39.3195 34.1987 37.3775 34.0214C30.6274 33.4051 21.6627 34.5983 15.1245 39.7376C8.82738 44.6874 4.12298 53.8305 6.7324 70.6468C6.93686 71.9644 7.65585 73.3333 9.28733 74.3372C10.9759 75.3762 13.9156 76.1842 18.7825 75.6836C22.4584 75.3055 25.259 78.7603 24.5038 82.1706C22.0494 93.2551 29.3889 100.843 34.7202 103.937C36.217 104.805 37.2986 106.434 37.2986 108.354V117.643C37.2986 120.487 35.0295 122.465 32.6334 122.733C26.2829 123.444 23.2322 128.481 22.114 133.083H45.2751C45.4841 130.65 46.3542 127.962 48.2383 125.462C51.0949 121.672 56.0355 118.63 63.7178 117.331C63.7271 117.306 63.7361 117.279 63.7441 117.25C63.759 117.195 63.7683 117.142 63.773 117.095C59.4977 113.239 55.5894 107.695 55.8369 100.976C56.0926 94.0346 60.7246 87.0282 71.0228 80.3343C72.4119 79.4314 74.2701 79.8255 75.173 81.2147C76.076 82.6039 75.6819 84.462 74.2927 85.365C64.7547 91.5647 61.9852 97.0591 61.8328 101.196C61.6767 105.434 64.2075 109.468 67.9805 112.808C69.943 114.545 69.9934 117.139 69.5326 118.828C69.0734 120.512 67.6949 122.77 65.0378 123.195C58.2513 124.28 54.7687 126.766 53.0298 129.074C52.011 130.425 51.5026 131.829 51.3133 133.083H87.417C97.0773 132.331 103.721 128.822 108.032 124.049C112.391 119.224 114.598 112.85 114.869 106.039C115.419 92.2241 108.023 77.6655 96.4399 72.2599C91.1739 69.8025 83.1003 67.4926 74.7258 65.6233C66.3994 63.7647 58.0029 62.3909 52.2124 61.7483C49.6827 61.4676 47.7382 59.337 47.7382 56.759V48.9933C47.7382 46.8915 49.052 45.0828 50.8953 44.3324C73.8565 34.9844 77.218 19.9844 76.3499 12.6226C68.3506 11.4373 61.2665 13.9139 55.4253 17.8273ZM52.0857 12.8426C59.0537 8.17434 67.9828 5.02011 78.2356 6.85184C80.13 7.1903 81.7677 8.65331 82.1327 10.7204C83.8815 20.6231 79.5431 38.901 53.7382 49.6504V55.8838C59.7123 56.5876 67.9175 57.9559 76.0329 59.7674C84.499 61.6571 93.097 64.0787 98.9772 66.8228C113.228 73.473 121.488 90.6193 120.864 106.278C120.548 114.205 117.96 122.01 112.485 128.071C106.978 134.166 98.7821 138.242 87.7574 139.074C87.6823 139.08 87.607 139.083 87.5317 139.083H20.7393C17.9888 139.083 15.3837 136.699 15.9077 133.514C16.8523 127.772 20.7282 118.401 31.2986 116.856V108.883C25.0242 105.075 15.8226 95.7114 18.4686 81.7358C13.2204 82.1421 9.13487 81.2883 6.1429 79.4472C2.91979 77.4639 1.2599 74.5089 0.803361 71.5668C-2.04896 53.1852 3.00074 41.6357 11.4167 35.0204C19.4054 28.7409 29.8126 27.4095 37.3974 28.0017C40.3382 23.3249 45.3733 17.3396 52.0857 12.8426Z" fill="black" />
                            <path d="M29 50C29 52.2091 27.2091 54 25 54C22.7909 54 21 52.2091 21 50C21 47.7909 22.7909 46 25 46C27.2091 46 29 47.7909 29 50Z" fill="black" />
                          </svg>
                        </div>
                        <div className="morebyicons d-flex justify-content-center align-items-center">
                          <svg width="64" height="64" viewBox="0 0 130 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M122.662 68.7039C116.717 69.2672 110.86 66.9323 107.883 65.0273L111.117 59.9736C113.346 61.4 117.951 63.1704 122.233 62.7169C124.433 62.4838 126.466 63.5817 127.673 64.8743C128.311 65.5568 128.919 66.5002 129.14 67.6574C129.377 68.907 129.123 70.2663 128.216 71.409C123.255 77.659 114.565 83.9694 102.628 82.4773L103.372 76.5236C111.946 77.5953 118.458 73.51 122.662 68.7039ZM123.322 69.0098C123.328 69.0165 123.33 69.0199 123.329 69.02C123.329 69.0201 123.327 69.0167 123.322 69.0098Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.23544 59.1075C8.49539 46.6818 20.7293 44.6681 26.4495 45.5348L25.5506 51.4671C22.0257 50.933 13.5113 52.0579 7.685 60.1761C10.4424 59.8525 13.4648 59.7423 16.0609 60.1455C17.6934 60.3991 19.454 60.8982 20.8746 61.9263C22.434 63.0549 23.5 64.7805 23.5 67.0011H17.5C17.5 66.9874 17.501 66.976 17.5019 66.9658C17.5063 66.9134 17.5077 66.8961 17.3568 66.7869C17.0379 66.5561 16.3487 66.2621 15.1401 66.0744C12.7547 65.7039 9.49155 65.9125 6.48688 66.401C4.53384 66.7185 2.71842 65.8971 1.63679 64.5383C0.518153 63.1329 0.115344 61.0246 1.23544 59.1075Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M82.9466 92.9415C103.589 79.9699 110.021 56.6713 100.472 41.4755C90.9225 26.2797 67.1399 21.9684 46.4979 34.94C25.8559 47.9117 19.4236 71.2103 28.9728 86.4061C38.522 101.602 62.3046 105.913 82.9466 92.9415ZM86.1391 98.0217C108.689 83.8513 117.38 57.1054 105.552 38.283C93.7237 19.4606 65.8551 15.6895 43.3055 29.8598C20.7559 44.0302 12.0645 70.7761 23.8926 89.5985C35.7208 108.421 63.5895 112.192 86.1391 98.0217Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M67.8551 41.4001L70.8855 21.4863L76.8172 22.389L73.7146 42.7776L85.8493 54.9124L110.051 51.3269L110.93 57.2621L87.2765 60.7664L83.323 78.557L95.0061 90.2401L90.7634 94.4828L79.094 82.8133L62.282 86.723L59.696 106.549L53.7464 105.773L56.4104 85.349L43.2748 72.2134L19.5229 75.3505L18.7373 69.4021L41.9581 66.3352L46.2456 49.9649L34.1389 37.8582L38.3816 33.6156L50.5039 45.7379L67.8551 41.4001ZM69.6002 47.1485L52.0355 51.5397L47.6875 68.1409L60.5194 80.9728L77.5183 77.0196L81.5097 59.0581L69.6002 47.1485Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M64.9576 1.31582C66.3443 2.42947 67.2178 4.31932 66.9087 6.34432C66.4927 9.07023 66.4676 12.3272 67.1527 15.2771C67.8388 18.2311 69.1643 20.6034 71.2204 22.0427L67.7797 26.9581C64.1136 24.3918 62.2003 20.4755 61.3083 16.6344C60.6083 13.6205 60.4924 10.4841 60.718 7.67707C56.0272 12.0346 51.564 19.2208 52.4844 28.1943L46.5157 28.8065C45.176 15.7444 52.7934 5.98644 59.1112 1.19779C61.1299 -0.332323 63.4834 0.131955 64.9576 1.31582Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M83.3621 99.6006C87.363 112.331 78.1373 121.922 71.1455 126.551C69.0346 127.948 66.7218 127.352 65.3051 126.135C63.9625 124.981 63.1239 123.087 63.435 121.074C64.4098 114.767 61.0143 109.152 58.9338 107.175L63.0663 102.825C65.9831 105.596 70.1389 112.323 69.5534 120.329C75.3414 115.944 80.1072 109.256 77.6381 101.4L83.3621 99.6006Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M103.76 9.9497C100.188 11.3211 97.6949 14.7802 97.2891 18.0269C97.1545 19.1041 96.7249 20.2747 96.2329 21.3175C95.7182 22.4083 95.0361 23.5665 94.2411 24.6482C93.4519 25.7219 92.4955 26.7965 91.4085 27.6589C90.3478 28.5004 88.959 29.3008 87.3313 29.4816L86.6687 23.5183C86.754 23.5089 87.0967 23.4207 87.6795 22.9584C88.2359 22.517 88.8349 21.8726 89.4065 21.0948C89.9722 20.3251 90.4563 19.4996 90.8066 18.7571C91.1796 17.9667 91.3139 17.4547 91.3354 17.2827C92.0114 11.875 95.9374 6.52606 101.609 4.34836C107.561 2.06351 114.808 3.45314 121.653 10.2986C124.888 13.5337 126.457 19.582 125.126 25.1453C123.719 31.0251 119.13 36.3377 110.321 38.1628C110.28 38.1836 110.219 38.216 110.136 38.264C109.877 38.4138 109.527 38.6461 109.135 38.9514C108.33 39.5775 107.525 40.3708 106.996 41.1641L102.004 37.8359C102.998 36.3452 104.316 35.098 105.451 34.215C106.029 33.7657 106.604 33.3763 107.127 33.0732C107.552 32.8266 108.234 32.4619 108.951 32.3187C115.718 30.9651 118.448 27.2715 119.291 23.7488C120.22 19.8668 118.934 16.0652 117.41 14.5412C111.875 9.00559 107.053 8.68543 103.76 9.9497Z" fill="black" />
                            <path d="M108 16.5C108 17.8807 106.881 19 105.5 19C104.119 19 103 17.8807 103 16.5C103 15.1193 104.119 14 105.5 14C106.881 14 108 15.1193 108 16.5Z" fill="black" />
                            <path d="M116 22.5C116 23.8807 114.881 25 113.5 25C112.119 25 111 23.8807 111 22.5C111 21.1193 112.119 20 113.5 20C114.881 20 116 21.1193 116 22.5Z" fill="black" />
                          </svg>
                        </div>
                        <div className="morebyicons d-flex justify-content-center align-items-center">
                          <svg width="64" height="64" viewBox="0 0 130 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M122.662 68.7039C116.717 69.2672 110.86 66.9323 107.883 65.0273L111.117 59.9736C113.346 61.4 117.951 63.1704 122.233 62.7169C124.433 62.4838 126.466 63.5817 127.673 64.8743C128.311 65.5568 128.919 66.5002 129.14 67.6574C129.377 68.907 129.123 70.2663 128.216 71.409C123.255 77.659 114.565 83.9694 102.628 82.4773L103.372 76.5236C111.946 77.5953 118.458 73.51 122.662 68.7039ZM123.322 69.0098C123.328 69.0165 123.33 69.0199 123.329 69.02C123.329 69.0201 123.327 69.0167 123.322 69.0098Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.23544 59.1075C8.49539 46.6818 20.7293 44.6681 26.4495 45.5348L25.5506 51.4671C22.0257 50.933 13.5113 52.0579 7.685 60.1761C10.4424 59.8525 13.4648 59.7423 16.0609 60.1455C17.6934 60.3991 19.454 60.8982 20.8746 61.9263C22.434 63.0549 23.5 64.7805 23.5 67.0011H17.5C17.5 66.9874 17.501 66.976 17.5019 66.9658C17.5063 66.9134 17.5077 66.8961 17.3568 66.7869C17.0379 66.5561 16.3487 66.2621 15.1401 66.0744C12.7547 65.7039 9.49155 65.9125 6.48688 66.401C4.53384 66.7185 2.71842 65.8971 1.63679 64.5383C0.518153 63.1329 0.115344 61.0246 1.23544 59.1075Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M82.9466 92.9415C103.589 79.9699 110.021 56.6713 100.472 41.4755C90.9225 26.2797 67.1399 21.9684 46.4979 34.94C25.8559 47.9117 19.4236 71.2103 28.9728 86.4061C38.522 101.602 62.3046 105.913 82.9466 92.9415ZM86.1391 98.0217C108.689 83.8513 117.38 57.1054 105.552 38.283C93.7237 19.4606 65.8551 15.6895 43.3055 29.8598C20.7559 44.0302 12.0645 70.7761 23.8926 89.5985C35.7208 108.421 63.5895 112.192 86.1391 98.0217Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M67.8551 41.4001L70.8855 21.4863L76.8172 22.389L73.7146 42.7776L85.8493 54.9124L110.051 51.3269L110.93 57.2621L87.2765 60.7664L83.323 78.557L95.0061 90.2401L90.7634 94.4828L79.094 82.8133L62.282 86.723L59.696 106.549L53.7464 105.773L56.4104 85.349L43.2748 72.2134L19.5229 75.3505L18.7373 69.4021L41.9581 66.3352L46.2456 49.9649L34.1389 37.8582L38.3816 33.6156L50.5039 45.7379L67.8551 41.4001ZM69.6002 47.1485L52.0355 51.5397L47.6875 68.1409L60.5194 80.9728L77.5183 77.0196L81.5097 59.0581L69.6002 47.1485Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M64.9576 1.31582C66.3443 2.42947 67.2178 4.31932 66.9087 6.34432C66.4927 9.07023 66.4676 12.3272 67.1527 15.2771C67.8388 18.2311 69.1643 20.6034 71.2204 22.0427L67.7797 26.9581C64.1136 24.3918 62.2003 20.4755 61.3083 16.6344C60.6083 13.6205 60.4924 10.4841 60.718 7.67707C56.0272 12.0346 51.564 19.2208 52.4844 28.1943L46.5157 28.8065C45.176 15.7444 52.7934 5.98644 59.1112 1.19779C61.1299 -0.332323 63.4834 0.131955 64.9576 1.31582Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M83.3621 99.6006C87.363 112.331 78.1373 121.922 71.1455 126.551C69.0346 127.948 66.7218 127.352 65.3051 126.135C63.9625 124.981 63.1239 123.087 63.435 121.074C64.4098 114.767 61.0143 109.152 58.9338 107.175L63.0663 102.825C65.9831 105.596 70.1389 112.323 69.5534 120.329C75.3414 115.944 80.1072 109.256 77.6381 101.4L83.3621 99.6006Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M103.76 9.9497C100.188 11.3211 97.6949 14.7802 97.2891 18.0269C97.1545 19.1041 96.7249 20.2747 96.2329 21.3175C95.7182 22.4083 95.0361 23.5665 94.2411 24.6482C93.4519 25.7219 92.4955 26.7965 91.4085 27.6589C90.3478 28.5004 88.959 29.3008 87.3313 29.4816L86.6687 23.5183C86.754 23.5089 87.0967 23.4207 87.6795 22.9584C88.2359 22.517 88.8349 21.8726 89.4065 21.0948C89.9722 20.3251 90.4563 19.4996 90.8066 18.7571C91.1796 17.9667 91.3139 17.4547 91.3354 17.2827C92.0114 11.875 95.9374 6.52606 101.609 4.34836C107.561 2.06351 114.808 3.45314 121.653 10.2986C124.888 13.5337 126.457 19.582 125.126 25.1453C123.719 31.0251 119.13 36.3377 110.321 38.1628C110.28 38.1836 110.219 38.216 110.136 38.264C109.877 38.4138 109.527 38.6461 109.135 38.9514C108.33 39.5775 107.525 40.3708 106.996 41.1641L102.004 37.8359C102.998 36.3452 104.316 35.098 105.451 34.215C106.029 33.7657 106.604 33.3763 107.127 33.0732C107.552 32.8266 108.234 32.4619 108.951 32.3187C115.718 30.9651 118.448 27.2715 119.291 23.7488C120.22 19.8668 118.934 16.0652 117.41 14.5412C111.875 9.00559 107.053 8.68543 103.76 9.9497Z" fill="black" />
                            <path d="M108 16.5C108 17.8807 106.881 19 105.5 19C104.119 19 103 17.8807 103 16.5C103 15.1193 104.119 14 105.5 14C106.881 14 108 15.1193 108 16.5Z" fill="black" />
                            <path d="M116 22.5C116 23.8807 114.881 25 113.5 25C112.119 25 111 23.8807 111 22.5C111 21.1193 112.119 20 113.5 20C114.881 20 116 21.1193 116 22.5Z" fill="black" />
                          </svg>
                        </div>
                      </li>
                      <li className="my-3">
                        <Link href='/' className="icon-details-page">Suces</Link>
                        <span className="morearrow">&#62;</span>
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <input type="text" placeholder="Write your comments..." className="w-100 detail-input-comment" />
                  </div>
                </div>


              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"></div>
              <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">






                <ul className="licenseinfo">
                  <li><h5>License summary</h5></li>
                  <li> <h6>Our license allows you to use the content.</h6></li>
                  <li>For <strong>commercial and personal</strong> projects.</li>
                  <li>On  <strong>digital or printed</strong> media.</li>
                  <li>For an <strong>unlimited number of times</strong> and perpetually.</li>
                  <li>Anywhere in the world.</li>
                  <li>To make modifications and derived works.</li>
                </ul>
              </div>
            </div>

            <div className="styles-icons-div  comon-rows mt-0 d-block w-100">
              <h4 className="sub-titels-h1">Related Icons with the same style</h4>
              <div className="relatesd t-ind-icons d-block w-100">
                <div className="row row-cols-1 row-cols-sm-3  row-cols-lg-6 gy-2 gy-lg-3">
                  {relatedIcons.map((icon) => (
                    <article key={icon.Id} className="col" style={{ cursor: "pointer" }}>
                      <div
                        className="btn icons-list p-0 position-relative"
                        onClick={() => {

                          router.push(`/${icon.icon_category.toLowerCase()}/${icon.slug}`, undefined, { shallow: true });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
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
                      </div>
                    </article>

                  ))}
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

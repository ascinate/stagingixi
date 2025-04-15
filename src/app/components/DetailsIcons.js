import Link from "next/link";
import FilterIcons from "./FilterIcons";
import { useEffect,useState, useRef } from "react";
import html2canvas from 'html2canvas';



function DetailsIcons() {
      const [icons, setIcons] = useState([]);
      const [selectedOption, setSelectedOption] = useState('');
      const [color, setColor] = useState("#000000");
      const [size, setSize] = useState(300);
      const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      };

      const handleSizeChange = (event) => {
        setSize(event.target.value); 
      };
      const svgRef = useRef(null);

      // Convert canvas to PNG
      const handleDownload = () => {
        const svg = svgRef.current;
        
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        if (svgRef.current) {
          html2canvas(svgRef.current, {
            backgroundColor: null,
          }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
    
            const ctx = canvas.getContext('2d');
            canvas.width = size;
            canvas.height = size;
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'image.png'; 
            link.click();
          });
        }
      };




      // Convert canvas to Webp

      const handleDownloadWeb = () => {
        const svg = svgRef.current;
        
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        if (svgRef.current) {
          html2canvas(svgRef.current, {
            backgroundColor: null,
          }).then((canvas) => {
            const imgData = canvas.toDataURL('image/webp', 0.8);
    
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'image.webp';
            link.click();
          });
        }
      };

      // Convert canvas to Svg

      const downloadSVG = () => {
        const svg = svgRef.current;
        
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `image-${size}px.svg`; 
        link.click();
      };

      useEffect(() => {
        const fetchIcons = async () => {
          try {
            const response = await fetch('https://iconsguru.ascinatetech.com/admin/api/icons');
            const data = await response.json();
            setIcons(data.icons); 
          } catch (error) {
            console.error('Error fetching icons:', error);
          }
        };
    
        fetchIcons();
      }, []);

      const tags = [
        { id: 1, title: 'Shopping Bag' , link: '/'  },
        { id: 2, title: 'Shopping' , link: '/'  },
        { id: 3, title: 'Online Bag', link: '/',},
        { id: 4, title: 'Shopper' , link: '/' },
        { id: 5, title: 'Activity' , link: '/' },
        { id: 6, title: 'Commerce' , link: '/' },
      ];
     return(
        <>
         <div className="top-sections01">
             <div className="row">
                 <div className="col-lg-7">
                    <div className="blox-icons-div01">
                        <div ref={svgRef} width={size} height={size}>
                            <svg xmlns="http://www.w3.org/2000/svg" ref={svgRef} width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z"></path></svg>
                            
                        
                        </div>
                    
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="form-control form-control-color "
                        />
                    </div>
                 </div>
                 <div className="col-lg-5">
                    <div className="right-details-lis01">
                        <h4> Online Bag Icon 2</h4>
                        <div className="groups-list-btn">
                            <div className="btn btn-seize">
                                <span className="size01">SIZE</span>
                            </div>
                            <div type="button" className="btn w-100 btn-comons01"> SIZE 
                                <select id="size" value={size} onChange={handleSizeChange}>
                                    <option value="">-- Select a Size --</option>
                                    <option value="12">12px</option>
                                    <option value="16">16px</option>
                                    <option value="18">18px</option>
                                    <option value="24">24px</option>
                                    <option value="32">32px</option>
                                </select>
                            </div>
                            <button type="button" onClick={downloadSVG} className="btn btn-comons01"> SVG </button>
                            <button type="button" onClick={handleDownload} className="btn btn-comons01"> PNG </button>
                            <button type="button" onClick={handleDownloadWeb} className="btn btn-comons01"> WEBP </button>
                        </div>
                        <button type="button" className="btn btn mt-4"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path d="M13.5759 17.2714L8.46576 14.484C7.83312 15.112 6.96187 15.5 6 15.5C4.067 15.5 2.5 13.933 2.5 12C2.5 10.067 4.067 8.5 6 8.5C6.96181 8.5 7.83301 8.88796 8.46564 9.51593L13.5759 6.72855C13.5262 6.49354 13.5 6.24983 13.5 6C13.5 4.067 15.067 2.5 17 2.5C18.933 2.5 20.5 4.067 20.5 6C20.5 7.933 18.933 9.5 17 9.5C16.0381 9.5 15.1669 9.11201 14.5343 8.48399L9.42404 11.2713C9.47382 11.5064 9.5 11.7501 9.5 12C9.5 12.2498 9.47383 12.4935 9.42408 12.7285L14.5343 15.516C15.167 14.888 16.0382 14.5 17 14.5C18.933 14.5 20.5 16.067 20.5 18C20.5 19.933 18.933 21.5 17 21.5C15.067 21.5 13.5 19.933 13.5 18C13.5 17.7502 13.5262 17.5064 13.5759 17.2714Z"></path></svg> Share </button>

                        <h5 className="list-texr mt-4"> <strong> Style : </strong> Phoenix Group Basic Outline <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path></svg> </h5>
                    </div>
                 </div>

             </div>

            <div className="tags-list">
                <ul>
                {tags.map((post) => (
                    <li key={post.id}>
                        <Link href={post.link}>{post.title}</Link>
                    </li>
                ))}
                </ul>
            </div>
             <div className="styles-icons-div">
                 <h4> Icons With The Same Style And Concept </h4>
                 <div className="row row-cols-1 row-cols-lg-9">
                    {icons.length === 0 ? (
                        <div className="col">
                            <div className="loading-animations"></div>
                        </div>
                        ) : (
                        icons.map((icon) => (
                            <div key={icon.id} className="svg-item col">
                            <button
                                className="btn p-0"
                                data-bs-toggle="modal"
                                data-bs-target="#modaldetails"
                                onClick={() => openModal(icon)}
                            >
                                <span dangerouslySetInnerHTML={{ __html: icon.icon_svg }}></span>
                            </button>
                            </div>
                        ))
                        )}
                 </div>
             </div>
         </div>
        </>
     );
}
export default DetailsIcons;

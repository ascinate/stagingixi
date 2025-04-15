"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";




var settings = {
    dots:  true,
    infinite: true,
    margin:20,
    speed: 500,
    slidesToShow:4,
    slidesToScroll:4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow:4,
          slidesToScroll: 4,
          infinite: true,
          dots:  true,
          margin:20,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:1,
          slidesToScroll: 1,
          infinite: true,
          dots:  true
        }
      },
      {
        breakpoint: 668,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots:  true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots:  true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots:  true
        }
      }
    ]
  };
function CategorySlider() {
  const iconcatgegory = [
    { id: 1, title: 'Brands' , counting: '200', img: '/sports1.png', link: '/icons', descriptions: 'Discover a world of creativity with our vast collection.'  },
    { id: 2, title: 'Family Icons' , counting: '100', img: '/family-icons.png', link: '/icons' , descriptions: 'Discover a world of creativity with our vast collection.'  },
    { id: 3, title: 'Wired Family' , counting: '300', img: '/sports1.png', link: '/icons' , descriptions: 'Discover a world of creativity with our vast collection.'   },
    { id: 4, title: 'Doodle Family' , counting: '2000', img: '/sports1.png', link: '/icons' , descriptions: 'Discover a world of creativity with our vast collection.'  },
    { id: 5, title: 'Doodle Family' , counting: '2000', img: '/sports1.png', link: '/icons' , descriptions: 'Discover a world of creativity with our vast collection.'  },
  ];
     return(
        <>
          
             <div className="slider-parts mt-4">
                <Slider {...settings}>

                {iconcatgegory.map((category) => (
                             <div className="items-process1"  key={category.id}>
                                <article className="d-inline-block comonins-category01">
                                    <figure>
                                        <Link href={category.link}>
                                        
                                          <Image
                                                  src={category.img}
                                                  alt="Next.js logo"
                                                  width={241}
                                                  height={178}
                                                  priority
                                          />
                                        </Link>
                                    </figure>
                                    <div className="btn-groups01 justify-content-between w-100 position-relative d-flex align-items-center">
                                        <Link href={category.link} className="btn btn-comon06 cl1"> Color </Link>
                                        <Link href={category.link} className="btn btn-comon06 cln" > Solid </Link>
                                    </div>
                                    <div className="text-contenst-divs mt-4">
                                        <h5> <small className="d-block"> {category.counting}+ icons </small>
                                          {category.title} 
                                        </h5>
                                        <p> {category.descriptions}   </p>
                                    </div>
                                </article>
                             </div>
                        ))}
                    
                </Slider>
             </div>
         
        </>
     );
}
export default CategorySlider;
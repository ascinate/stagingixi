import { Sora, Play, Playfair, Inter, Plus_Jakarta_Sans   } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ImportBsJS from "../app/components/ImportBsJS";

const sorasans = Sora({
  variable: "--font-sora-sans",
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const play = Play({
  variable: "--font-play-sans",
  weight: ['700'],
  subsets: ['latin'],
});

const playfa = Playfair({
  variable: "--font-playfa-sans",
  weight: ['400'],
  subsets: ['latin'],
});

const inter = Inter({
  variable: "--font-inter-sans",
  weight: ['800', '300'],
  subsets: ['latin'],
});

const plus = Plus_Jakarta_Sans({
  variable: "--font-plus-sans",
  weight: ['800', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
});










export const metadata = {
  icons: {
    icon: '/favicon.png',
  },
  title: "Free Icons, Vector Icons - SVG, PNG, WEBP",
  Keywords: "icon downloads, customizable icons, high-quality vector icons, free icons for websites, premium icons for designers, icon size customization, icon resources, digital design icons, creative icons, UI icons, scalable icons, instant icon downloads, professional icon library.",
  description: "IconsGuru provides a comprehensive library of free and premium icons that you can instantly download and customize to any size. Perfect for designers, developers, and creatives looking for high-quality, scalable icons to enhance their projects. Discover icons that fit your design needs seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      
      <body>
      <style>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
        .banner-parts01 h2, .form-select{
         font-family: ${sorasans.style.fontFamily};
        }
         p{
          font-weight: 300;
         }
        button,
        .p-autocomplete-item,
        .comon-cont-head,
        .comon-content-div h3,
        .privacy-page h5,
        .comon-heading-sub,
        .text-caraole-divb h2
        .btn,
        .comon-list01 h3,
        .contents-div h3,
        .value-sections h3,
        .comon-groups-div01 h5,
        body{
         font-family: ${plus.style.fontFamily};
        } 
        input{
         font-family: ${sorasans.style.fontFamily};
        }
         h5.sub-headings{
           font-family: ${play.style.fontFamily};
         }
        p.text-para1{
          font-family: ${playfa.style.fontFamily};
        }
        h2.comon-head,
        .comon-types01 h5 a,
        .coun-text,
        .btn,
        h5,
        .icon-headings,
        .styles-icons-div h4,
        .comon-heading-sub,{
          font-family: ${inter.style.fontFamily};
        }
         
        
      `}
    </style>
        <ImportBsJS/>
        {children}
      </body>
    </html>
  );
}

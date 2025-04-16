import { Sora, Play, Playfair, Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
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
  weight: ['800'],
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
          font-family: ${sorasans.style.fontFamily};
        }
        .banner-parts01 h2, .form-select{
         font-family: ${sorasans.style.fontFamily};
        }
        button,
        .p-autocomplete-item{
         font-family: ${inter.style.fontFamily};
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

import Link from "next/link";
import Image from "next/image";
import Form from 'next/form';


function NavicationSubpage(){

 return(
     <>
     <header className="sub_header float-start w-100">
       <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <Link className="navbar-brand" href='/'>
                   <Image loading="lazy" src="/icons_guru_logo.webp"
                        alt="iconsguru"
                        width={114}
                        height={18} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon"></span>
                </button>
                <div className="serach-div-home d-inlin-block ms-5">
                    
                    
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                           <a className="nav-link me-3" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
                        </li>
                        <li className="nav-item">
                           <a className="nav-link btn-signup01" data-bs-toggle="modal" data-bs-target="#registerModal">Sign Up</a>
                        </li>
                        
                    </ul>
                
                </div>
            </div>
        </nav>
    </header>
     </>
 )
};

export default NavicationSubpage;


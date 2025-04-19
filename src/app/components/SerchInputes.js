'use client';
import Link from "next/link";
import { AutoComplete } from 'primereact/autocomplete';
import { useRouter } from 'next/navigation';
import { useState } from "react";
function SerchInputes({ totalIcons }) {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  const router = useRouter();

  const search = async (event) => {
    const query = event.query;

    if (query.length > 1) {
      try {
        const res = await fetch(`https://iconsguru.ascinatetech.com/admin/api/icons/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        const names = data.data.map(icon => icon.icon_name);
        setItems(names);
      } catch (err) {
        console.error('Autocomplete fetch error:', err);
      }
    }
  };



  const handleSearchClick = () => {
    if (value.trim()) {
      router.push(`/details?search=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
   

     <>
         
         <div className="search-sections-home home-search08 position-relative col-lg-8 mx-auto d-flex justify-content-between align-items-center bg-white">
         <AutoComplete
        value={value}
        placeholder="Search icons..."
        suggestions={items}
        completeMethod={search}
        onChange={(e) => setValue(e.value)}
        className="form-control w-full"
        loading={false}
        />
         <button className="btn btn-search" onClick={handleSearchClick}>
            Search{" "}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(255,255,255,1)">
              <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
            </svg>
          </button>
         </div>
   </>     
  );
}

export default SerchInputes;


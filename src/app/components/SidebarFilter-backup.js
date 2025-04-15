'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function SidebarFilter({ onFilterChange }) {
  const [visibleItems, setVisibleItems] = useState(5);
  
    const loadMoreItems = () => {
      setVisibleItems(prev => prev + 5);
    };
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    types: [],
  })

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    colors: [],
    types: [],
  })

  useEffect(() => {
    axios.get('https://iconsguru.com/admin/api/sidebar-filters')
      .then(res => {
        const data = res.data
        setFilters({
          categories: Array.isArray(data.categories) ? data.categories : [],
          colors: Array.isArray(data.colors) ? data.colors : [],
          types: Array.isArray(data.types) ? data.types : [],
        })
      })
      .catch(err => console.error('Sidebar filter fetch error:', err))
  }, [])

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(selectedFilters)
    }
  }, [selectedFilters]) // ✅ Only call when filters change

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters(prev => {
      const isChecked = prev[filterType].includes(value)
      const updated = {
        ...prev,
        [filterType]: isChecked
          ? prev[filterType].filter(v => v !== value)
          : [...prev[filterType], value]
      }
      return updated
    })
  }

  return (
    <aside className="sidebarsd_div d-inline-block w-100 p-0">
      
      {/* Categories */}
        <div className="comon_heading01 d-flex align-items-center mt-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path d="M5 7C5 6.17157 5.67157 5.5 6.5 5.5C7.32843 5.5 8 6.17157 8 7C8 7.82843 7.32843 8.5 6.5 8.5C5.67157 8.5 5 7.82843 5 7ZM6.5 3.5C4.567 3.5 3 5.067 3 7C3 8.933 4.567 10.5 6.5 10.5C8.433 10.5 10 8.933 10 7C10 5.067 8.433 3.5 6.5 3.5ZM12 8H20V6H12V8ZM16 17C16 16.1716 16.6716 15.5 17.5 15.5C18.3284 15.5 19 16.1716 19 17C19 17.8284 18.3284 18.5 17.5 18.5C16.6716 18.5 16 17.8284 16 17ZM17.5 13.5C15.567 13.5 14 15.067 14 17C14 18.933 15.567 20.5 17.5 20.5C19.433 20.5 21 18.933 21 17C21 15.067 19.433 13.5 17.5 13.5ZM4 16V18H12V16H4Z"></path></svg>
                      <h4 className="ms-2"> Filter </h4>  
        </div>

        <div className="sub_headings01 d-inline-block w-100 mt-3">

          

          {/* Colors */}
         
            <div className="d-flex align-items-center mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="rgba(0,0,0,1)"><path d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2ZM10.8111 18.1111C10.8111 16.0843 12.451 14.4444 14.4778 14.4444H16.4444C18.4065 14.4444 20 12.851 20 10.8889C20 7.1392 16.4677 4 12 4C7.58235 4 4 7.58235 4 12C4 16.19 7.2226 19.6285 11.324 19.9718C10.9948 19.4168 10.8111 18.7761 10.8111 18.1111ZM7.5 12C6.67157 12 6 11.3284 6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5C9 11.3284 8.32843 12 7.5 12ZM16.5 12C15.6716 12 15 11.3284 15 10.5C15 9.67157 15.6716 9 16.5 9C17.3284 9 18 9.67157 18 10.5C18 11.3284 17.3284 12 16.5 12ZM12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5C13.5 8.32843 12.8284 9 12 9Z"></path></svg> 
                <h5 className="ms-2 mb-0"> Colors </h5>
            </div>
            <ul className="options_names new-filter-05 p-0 m-0 d-flex flex-wrap align-items-center mt-4">
            {filters.colors.map((color, i) => {
              const id = `color-${i}`;
              return (
                <li className="cmout form-check position-relative" key={i}>
                  <input
                    id={id}
                    type="checkbox"
                    className="form-check-input"
                    onChange={() => handleCheckboxChange('colors', color)}
                    checked={selectedFilters.colors.includes(color)}
                  />
                  <label className="form-check-label" htmlFor={id}>
                    {color.trim()}
                  </label>
                </li>
              );
            })}
            </ul>
         

          {/* Types */}
          <div className="mb-4">
            <div className="d-flex align-items-center mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path d="M4.7134 7.12811L4.46682 7.69379C4.28637 8.10792 3.71357 8.10792 3.53312 7.69379L3.28656 7.12811C2.84706 6.11947 2.05545 5.31641 1.06767 4.87708L0.308047 4.53922C-0.102682 4.35653 -0.102682 3.75881 0.308047 3.57612L1.0252 3.25714C2.03838 2.80651 2.84417 1.97373 3.27612 0.930828L3.52932 0.319534C3.70578 -0.106511 4.29417 -0.106511 4.47063 0.319534L4.72382 0.930828C5.15577 1.97373 5.96158 2.80651 6.9748 3.25714L7.69188 3.57612C8.10271 3.75881 8.10271 4.35653 7.69188 4.53922L6.93228 4.87708C5.94451 5.31641 5.15288 6.11947 4.7134 7.12811ZM15.3144 9.53285L15.4565 9.67491C16.7513 11.018 17.3306 12.9868 16.8126 14.9201C16.1644 17.3393 13.9702 18.9984 11.5016 18.9984C9.46572 18.9984 6.78847 18.3726 4.5286 17.4841C5.73449 16.0696 6.17423 14.675 6.3285 12.805C6.36574 12.3536 6.38901 12.1741 6.43185 12.0142C7.22541 9.05261 10.0168 7.40515 12.9235 8.18399C13.8549 8.43357 14.6661 8.90783 15.3144 9.53285ZM18.2278 2.3713L13.2886 6.21289C9.34224 5.23923 5.55843 7.54646 4.5 11.4966C4.39826 11.8763 4.36647 12.262 4.33317 12.666C4.21829 14.0599 4.08554 15.6707 1 17.9966C3.5 19.4966 8 20.9984 11.5016 20.9984C14.8142 20.9984 17.8463 18.7896 18.7444 15.4377C19.0836 14.1719 19.0778 12.895 18.7847 11.7067L22.6253 6.76879C22.9349 6.3707 22.8997 5.80435 22.543 5.44774L19.5488 2.45355C19.1922 2.09694 18.6259 2.06168 18.2278 2.3713ZM16.8952 8.2852C16.8319 8.21952 16.7673 8.15494 16.7015 8.09149L15.5769 6.96685L18.7589 4.49198L20.5046 6.23774L18.0297 9.41972L16.8952 8.2852Z"></path></svg>
                <h5 className="ms-2 mb-0"> Style </h5>
            </div>
            <ul className="options_names p-0 m-0 new-filter-05 d-flex flex-wrap align-items-center mt-4">
            {filters.types.map((type, i) => {
              const id = `type-${i}`;
              return (
                <li className="cmout form-check position-relative" key={i}>
                  <input
                    id={id}
                    type="checkbox"
                    className="form-check-input"
                    onChange={() => handleCheckboxChange('types', type)}
                    checked={selectedFilters.types.includes(type)}
                  />
                  <label className="form-check-label" htmlFor={id}>
                    {type.trim()}
                  </label>
                </li>
              );
            })}
            </ul>
          </div>

          <div className="d-flex align-items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>
                  <h5 className="ms-2 mb-0"> Categories </h5>
          </div>
          <ul className='options_names cate-list-hide new-filter-05 p-0 m-0 d-flex flex-wrap align-items-center mt-3'>
          {filters.categories.map((cat, i) => {
              const id = `category-${i}`;
              return (
                <li className="cmout form-check position-relative" key={i}>
                  <input
                    id={id}
                    type="checkbox"
                    className="form-check-input"
                    onChange={() => handleCheckboxChange('categories', cat)}
                    checked={selectedFilters.categories.includes(cat)}
                  />
                  <label className="form-check-label" htmlFor={id}>
                    {cat.trim()}
                  </label>
                </li>
              );
            })}

            {/* {visibleItems < categories.length && (
                      <div className="d-block mt-0">
                        <button className="btn btn-load-more p-0" onClick={loadMoreItems}>Load More</button>
                      </div>
             )} */}
            <li>
               <Link href="" className='moreb btn'>+ More</Link>
            </li>
          </ul>

        </div>
    </aside>
  )
}
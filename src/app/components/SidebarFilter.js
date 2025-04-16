'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';
import Image from 'next/image';

export default function SidebarFilter({ onFilterChange, showCategoryFilter = true }) {
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true)


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
    axios.get('https://iconsguru.ascinatetech.com/admin/api/sidebar-filters')
      .then(res => {
        const data = res.data
        setFilters({
          categories: Array.isArray(data.categories) ? data.categories : [],
          colors: Array.isArray(data.colors) ? data.colors : [],
          types: Array.isArray(data.types) ? data.types : [],
        })
      })
      .catch(err => console.error('Sidebar filter fetch error:', err))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(selectedFilters)
    }
  }, [selectedFilters])

 

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters(prev => {
      const isChecked = prev[filterType].includes(value)
      return {
        ...prev,
        [filterType]: isChecked
          ? prev[filterType].filter(v => v !== value)
          : [...prev[filterType], value],
      }
    })
  }

  return (
    <aside className="sidebarsd_div d-inline-block w-100 p-0">

      {/* Categories */}
      <div className="comon_heading01 d-flex align-items-center mt-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)">
          <path d="M5 7C5 6.17157 5.67157 5.5 6.5 5.5C7.32843 5.5 8 6.17157 8 7C8 7.82843 7.32843 8.5 6.5 8.5C5.67157 8.5 5 7.82843 5 7ZM6.5 3.5C4.567 3.5 3 5.067 3 7C3 8.933 4.567 10.5 6.5 10.5C8.433 10.5 10 8.933 10 7C10 5.067 8.433 3.5 6.5 3.5ZM12 8H20V6H12V8ZM16 17C16 16.1716 16.6716 15.5 17.5 15.5C18.3284 15.5 19 16.1716 19 17C19 17.8284 18.3284 18.5 17.5 18.5C16.6716 18.5 16 17.8284 16 17ZM17.5 13.5C15.567 13.5 14 15.067 14 17C14 18.933 15.567 20.5 17.5 20.5C19.433 20.5 21 18.933 21 17C21 15.067 19.433 13.5 17.5 13.5ZM4 16V18H12V16H4Z"></path>
        </svg>
        <h4 className="ms-2"> Filter </h4>
      </div>

      <div className="sub_headings01 d-inline-block w-100 mt-3">
        {/* Show loader if loading */}
        {isLoading ? (
          <p className="d-block w-100">
             <div className="loading-animations">
                    <Image
                      loading="lazy"
                      src="/category.svg"
                      alt="iconsguru"
                      width={245}
                      height={346}
                    />
              </div>
          </p>
        ) : (
          <>
            {/* Colors */}
            <div className="d-flex align-items-center mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="rgba(0,0,0,1)">
                <path d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2ZM10.8111 18.1111C10.8111 16.0843 12.451 14.4444 14.4778 14.4444H16.4444C18.4065 14.4444 20 12.851 20 10.8889C20 7.1392 16.4677 4 12 4C7.58235 4 4 7.58235 4 12C4 16.19 7.2226 19.6285 11.324 19.9718C10.9948 19.4168 10.8111 18.7761 10.8111 18.1111ZM7.5 12C6.67157 12 6 11.3284 6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5C9 11.3284 8.32843 12 7.5 12ZM16.5 12C15.6716 12 15 11.3284 15 10.5C15 9.67157 15.6716 9 16.5 9C17.3284 9 18 9.67157 18 10.5C18 11.3284 17.3284 12 16.5 12ZM12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5C13.5 8.32843 12.8284 9 12 9Z"></path>
              </svg>
              <h5 className="ms-2 mb-0"> Colors </h5>
            </div>

            <ul className="options_names cololi-list new-filter-05 p-0 m-0 d-flex flex-wrap align-items-center mt-4">
              {filters.colors.map((color, i) => {
                const id = `color-${i}`
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
                )
              })}
            </ul>

            {/* Types */}
            <div className="mb-4">
              <div className="d-flex align-items-center mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path d="M20.0833 15.1999L21.2854 15.9212C21.5221 16.0633 21.5989 16.3704 21.4569 16.6072C21.4146 16.6776 21.3557 16.7365 21.2854 16.7787L12.5144 22.0412C12.1977 22.2313 11.8021 22.2313 11.4854 22.0412L2.71451 16.7787C2.47772 16.6366 2.40093 16.3295 2.54301 16.0927C2.58523 16.0223 2.64413 15.9634 2.71451 15.9212L3.9166 15.1999L11.9999 20.0499L20.0833 15.1999ZM20.0833 10.4999L21.2854 11.2212C21.5221 11.3633 21.5989 11.6704 21.4569 11.9072C21.4146 11.9776 21.3557 12.0365 21.2854 12.0787L11.9999 17.6499L2.71451 12.0787C2.47772 11.9366 2.40093 11.6295 2.54301 11.3927C2.58523 11.3223 2.64413 11.2634 2.71451 11.2212L3.9166 10.4999L11.9999 15.3499L20.0833 10.4999ZM12.5144 1.30864L21.2854 6.5712C21.5221 6.71327 21.5989 7.0204 21.4569 7.25719C21.4146 7.32757 21.3557 7.38647 21.2854 7.42869L11.9999 12.9999L2.71451 7.42869C2.47772 7.28662 2.40093 6.97949 2.54301 6.7427C2.58523 6.67232 2.64413 6.61343 2.71451 6.5712L11.4854 1.30864C11.8021 1.11864 12.1977 1.11864 12.5144 1.30864ZM11.9999 3.33233L5.88723 6.99995L11.9999 10.6676L18.1126 6.99995L11.9999 3.33233Z"></path></svg>
                <h5 className="ms-2 mb-0"> Types </h5>
              </div>

              <ul className="options_names p-0 m-0 new-filter-05 d-flex flex-wrap align-items-center mt-4">
                {filters.types.map((type, i) => {
                  const id = `type-${i}`
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
                  )
                })}
              </ul>
            </div>
          {showCategoryFilter && (
              <>
            <div className="d-flex align-items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>
                  <h5 className="ms-2 mb-0"> Categorie </h5>
            </div>
                <ul className="options_names p-0 m-0 new-filter-05 d-flex flex-wrap align-items-center mt-4">
                  {(showAll ? filters.categories : filters.categories.slice(0, 4)).map((cat, i) => (
                    <li className="cmout form-check position-relative" key={i}>
                      <input
                        id={`cat-${i}`}
                        type="checkbox"
                        className="form-check-input"
                        onChange={() => handleCheckboxChange('categories', cat)}
                        checked={selectedFilters.categories.includes(cat)}
                      />
                      <label className="form-check-label" htmlFor={`cat-${i}`}>
                        {cat.trim()}
                      </label>
                    </li>
                  ))}
                  {filters.categories.length > 4 && (
                  <button
                    type="button"
                    className="btn btn-sm  px-0"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? '+ Less' : '+ More'}
                  </button>
                )}
                </ul>
                
            </>
            )}
          </>
        )}
      </div>
    </aside>
  )
}

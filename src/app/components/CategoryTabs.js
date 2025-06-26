'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CategoryTabs() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://iconsguru.ascinatetech.com/api/categories-with-icons');
        const data = await res.json();

        if (data.status) {
          setCategories(data.data);
          if (data.data.length > 0) {
            setSelectedCategory(data.data[0].category);
            setIcons(data.data[0].icons);
          }
        }
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleTabClick = (category) => {
    setSelectedCategory(category);
    const selected = categories.find(c => c.category === category);
    setIcons(selected?.icons || []);
  };

  return (
    <section className="float-start w-100 py-5">
      <div className="container">
        <h2 className="text-center comon-head mb-4">Explore by Category</h2>

        <div className="d-flex justify-content-center flex-wrap mb-4">
          {categories.map(({ category }) => (
            <button
              key={category}
              className={`btn btn-outline-dark m-1 ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleTabClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
     
        <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-3">
          {icons.map((icon) => (
            <article key={icon.Id} className="svg-item  position-relative">
                               <Link
                                  href={`/${icon.icon_category.toLowerCase()}/${icon.slug}`}
                                  className="btn icons-list p-0"
                                >
                               {icon.type === "Animated" ? (
                                  <img
                                    src={`https://iconsguru.ascinatetech.com/public/uploads/animated/${encodeURIComponent(icon.icon_svg)}`}
                                    alt={icon.icon_name}
                                   style={{ height: "100%",width: "100%" }}
                                  />
                                ) : (
                                <span dangerouslySetInnerHTML={{ __html: icon.icon_svg }}></span>
                                )}
                              </Link>
                              
           </article>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export async function getServerSideProps(context) {

        
    const { id } = context.params;
    const res = await fetch('https://iconsguru.com/admin/icon/${id}');
    const data = await res.json();
    if (!res.ok) {
        return {
            notFound: true,
        };
    }
    return {
        props: { icon: data },
    };
}
export default function FilterIcons({ icon }) {
    const router = useRouter();
    const { id } = router.query;
    return (
          <div className="min">
              <p dangerouslySetInnerHTML={{ __html: icon.icon_svg }}></p>
             <p>{ icon.icon_name }</p>
          </div>
    );
}
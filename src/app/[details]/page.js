'use client';
import Head from "next/head";
import NavicationHome from "../components/NavicationHome";
import { useEffect, useState } from "react";
import SidebarFilter from "../components/SidebarFilter";
import FooterDetails from "../components/FooterDetails";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import Searchlisting from "../components/Searchlisting";



export default function Page() {
  return (
    <>
    <Head>
        <title>Listing page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <NavicationHome/>
      <Suspense fallback={<div>Loading...</div>}>
        
        <Searchlisting />
      </Suspense>
    </>
  );
}

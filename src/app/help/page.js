"use client";
import { useEffect, useState } from "react";
import NavicationHome from "../components/NavicationHome";
import Footer from "../components/Footer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";

export default function pricing() {

  const options = [
    { value: 'login', label: 'I canot log in ' },
    { value: 'suggestion', label: 'I have a suggestion ' },
    { value: 'download', label: 'I canot download file' },
    { value: 'others', label: 'Others' }
  ]
  return (
    <>
      
      <NavicationHome/>
  


      <Footer/>
    </>
  );
}

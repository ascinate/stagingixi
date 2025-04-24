"use client";
import { useEffect, useState } from "react";
import NavicationHome from "../components/NavicationHome";
import Footer from "../components/Footer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import Select from 'react-select'

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
  
      <main className="mian-text01 comon-content-div w-100 float-left">
          <section className="min-tops01">
              <div className="container">
                  <h2 className="comon-cont-head"> Can we help you? </h2>
                  <p className="col-lg-8 mt-3"> These terms of use govern the access, browsing and use of Blendicons by their users 
                    the download and use of certain content owned by Icons Mind as well as the.  </p>
                  <div className="row row-cols-1 row-cols-lg-2 g-lg-5 gy-4 mt-0 mb-5 pb-5">
                     <div className="col">
                       <Form>
                          <div className="forms-contacts">
                              <div className="form-group">
                                  <label className="form-label"> Full name </label>
                                  <input type="text" className="form-control"/>
                              </div>
                              <div className="form-group">
                                  <label className="form-label"> Email address </label>
                                  <input type="email" className="form-control"/>
                              </div>
                              <div className="form-group">
                                  <label className="form-label"> Categery </label>
                                  <Select options={options} />
                              </div>
                              <div className="form-group">
                                  <label className="form-label"> Message </label>
                                  <textarea className="form-control"></textarea>
                              </div>
                              <div className="form-group">
                                <button type="button" className="btn btn-send"> Send </button>
                              </div>
                          </div>
                       </Form>
                     </div>
                     <div className="col ps-lg-5">
                        <h3> FAQ  </h3>
                        <div className="accounding mt-4">
                            <div className="accordion" id="accordionExample">
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                     How to download?
                                  </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                       <p> Download the perfection and largest unique icons drawn by hand  </p>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                      How work the free licenece?
                                  </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                  <p> Download the perfection and largest unique icons drawn by hand  </p>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                      No able to upgrade?
                                  </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                  <p> Download the perfection and largest unique icons drawn by hand  </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>

                        <p className="mt-4 have-text"> Have more questions? <Link href="/faq"> Clck to see all FAQ </Link>  </p>

                     </div>
                  </div>
              </div>
          </section>
      </main>

      <Footer/>
    </>
  );
}

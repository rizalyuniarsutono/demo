import React, { useState } from 'react'
import {  Routes, Route, Outlet  } from "react-router-dom";
/// Css
import './index.css'
import './chart.css'
import './step.css'

import Nav from './layouts/nav'
import Footer from './layouts/Footer'
import Home from "./components/Dashboard/Home";
import Login from './pages/Login'
import CalonPeserta from './components/CheckingCalonPeserta/CalonPeserta';
import DaftarAkun from './components/PengelolaanAkun/DaftarAkun';
import FormAkun from './components/PengelolaanAkun/FormAkun';
import DaftarPengaduanAspirasi from './components/PengaduanAspirasi/DaftarPengaduanAspirasi';
// import FormPengaduanAspirasi from './components/PengaduanAspirasi/FormPengaduanAspirasi'
import DaftarUsulanPeserta from './components/UsulanPeserta/DaftarUsulanPeserta';
import ImportAlumni from './components/CheckingCalonPeserta/ImportAlumni';
// import FormUsulanPeserta from './components/UsulanPeserta/FormUsulanPeserta';

//Scroll To Top
import ScrollToTop from './layouts/ScrollToTop';


const Markup = () => {
  const allroutes = [
    { url: "", component: <Home/> },
    { url: "dashboard", component: <Home/> },
    { url: "checking-calon-peserta", component: <CalonPeserta/> },
    { url: "pengelolaan-akun", component: <DaftarAkun/> },
    { url: ":id?/form-akun", component: <FormAkun/> },
    { url: "pengaduan-aspirasi", component: <DaftarPengaduanAspirasi/> },
    { url: "alumni", component: <ImportAlumni/> },
    { url: "usulan-peserta", component: <DaftarUsulanPeserta/> },
  ]

  return (
       <> 
          <Routes>
            <Route  element={<MainLayout />} > 
                {allroutes.map((data, i) => (
                  <Route
                    key={i}
                    exact
                    path={`${data.url}`}
                    element={data.component}
                  />
                ))}
            </Route>
          </Routes>
         <ScrollToTop />
       </>
  )
}
function MainLayout(){
  return (
    <div id="main-wrapper" 
      className="show"
    >  
      <Nav />
      <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>
          <div className="container-fluid">
            <Outlet />                
          </div>
      </div>
      {/* <Footer /> */}
    </div>
  )

};

export default Markup

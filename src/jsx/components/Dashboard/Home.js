import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";

function Home() {
  useEffect(() => {
    // document.querySelector("#BarChart canvas").classList.add("lineChart");
  });
  const [session, setSession] = useState('Monthly');
  return (
    <Fragment>
      <PageTitle
        activeMenu={`Dashboard`}
      />
      <div className="row">
        {/* <h1>Halooo</h1> */}
        <h4>Selamat datang di Sistem Informasi Pengusulan, Pengecekan dan Aspirasi Pengaduan Peserta - Si-Ulan Ceksita</h4>
        <h4>Bidang Program dan Evaluasi Pusdiklat Manajemen dan Kepemimpinan</h4>
      </div>
      </Fragment>
  );
}

export default Home;

import React, { Fragment, useState, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import { GET, PATCH, POST } from "../../../services/AxiosService";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import logo from "../../../images/logo-ma2.png";

const FormPengaduanAspirasi = () => {
  const location = useLocation();
  const { id } = useParams();
  const router = useNavigate();
  const [locations, setLocations] = useState(location.state?.from);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    klasifikasi: "",
    judul: "",
    deskripsi: "",
    namaPelapor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const form = e.currentTarget.form;
    const isValid = form.checkValidity();

    setValidated(isValid);

    if (isValid) {
      form.classList.remove("was-validated");
    } else {
      form.classList.add("was-validated");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { klasifikasi, judul, deskripsi, namaPelapor } = formData;
    const requestBody = {
      klasifikasi,
      judul,
      deskripsi,
      namaPelapor,
      tindakLanjut: "",
    };

    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const res = await POST(`/aspirasi-pengaduan/create-aspirasi-pengaduan`, requestBody);
    if (res) {
      Swal.fire({
        icon: "success",
        title: "Berhasil membuat akun!",
      }).then(() => {
        Swal.close();
        setFormData({
          klasifikasi: "",
          judul: "",
          deskrips: "",
          namaPelapor: "",
        });
        // router("/pengelolaan-akun")
      });
    }
  };

  return (
    <div className="vh-100">
      <div className='mb-5' style={{ height: "200px", backgroundColor: "#004aad" }}>
        <div className='d-flex justify-content-center align-items-center'>
          <img className="mr-5" src={logo} alt="" height={200} />
          <div>
            <h1 className="text-center" style={{ color: "#ffde59" }}>SIULAN-CEKSITA</h1>
            <h1 className="text-center" style={{ color: "#ffde59" }}>Layanan Aspirasi dan Pengaduan Online Peserta Diklat</h1>
            <h3 className="text-center" style={{ color: "#ffffff" }}>Program dan Evaluasi Pusdiklat Manajemen dan Kepemimpinan</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card mx-5">
            <div className="card-header d-flex">
              <h4 className="card-title mb-2">Ayo Sampaikan Aspirasi dan Pengaduan anda!</h4>
              {location.state?.from === "Detail" && (
                <Link className="btn btn-primary" to={`/daftar-donasi`}>
                  Kembali
                </Link>
              )}
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form className="form-valide" onSubmit={handleSubmit}>
                  <div className="row flex-wrap">
                    <div className='form-group col-md-6 col-12'>
                      <label>Klasifikasi<span className="text-danger">*</span></label>
                      <select
                        className='form-control'
                        name="klasifikasi"
                        value={formData.klasifikasi}
                        onChange={handleChange}
                        required
                      // disabled={location.state?.from === "Detail"}
                      >
                        <option key="" value="">Pilih Klasifikasi Laporan</option>
                        <option key="aspirasi" value="aspirasi">Aspirasi</option>
                        <option key="pengaduan" value="pengaduan">Pengaduan</option>
                      </select>
                    </div>
                    <div className='form-group col-md-6 col-12'>
                      <label>Judul Laporan</label>
                      <input
                        className='form-control'
                        name="judul"
                        type='text'
                        value={formData.judul}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='form-group col-md-12 col-12'>
                      <label>Isi Laporan<span className="text-danger">*</span></label>
                      <textarea
                        className='form-control'
                        name="deskripsi"
                        rows="8"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        placeholder="Ketik isi laporan anda"
                        // minLength="5"
                        // maxLength="600"
                        required
                      />
                      {/* <Form.Control.Feedback type="invalid">
                        Deskripsi harus diisi minimal 5 karakter.
                      </Form.Control.Feedback> */}
                    </div>
                    <div className='form-group col-md-6 col-12'>
                      <label>Nama Pelapor</label>
                      <input
                        className='form-control'
                        name="namaPelapor"
                        type='text'
                        value={formData.namaPelapor}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {location.state?.from !== "Detail" && (
                    <div className="form-group mb-3 d-flex">
                      <div className="col-xl-6">
                        <Link className="btn btn-light w-100" to={`/login`}>
                          Batal
                        </Link>
                      </div>
                      <div className="col-xl-6">
                        <button type="submit" className="btn btn-primary w-100"
                        // onClick={locations === "Tambah" ? handleSubmit : handleEditSubmit}
                        >
                          Simpan Perubahan
                        </button>
                      </div>
                    </div>
                  )}
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormPengaduanAspirasi
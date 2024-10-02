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

const FormUsulanPeserta = () => {
  const location = useLocation();
  const { id } = useParams();
  const router = useNavigate();
  const [locations, setLocations] = useState(location.state?.from);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    pengusul: "",
    tanggal: "",
    name: "",
    hp_no: "",
    surat_usulan: "",
    usulan: "",
  });
  const [file, setFile] = useState(null);
  const [fileUsulan, setFileUsulan] = useState(null);

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

  const handleDateChange = (e) => {
    const dateString = e.target.value; // format asli yyyy-mm-dd
    const [year, month, day] = dateString.split("-"); // pisahkan tahun, bulan, dan hari
    const formattedDate = `${day}/${month}/${year}`; // format menjadi dd/mm/yyyy

    setFormData({
      ...formData,
      tanggal: formattedDate, // simpan tanggal yang diformat di state
    });
  };
  function getFormattedDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');
    return new Date(`${yyyy}-${mm}-${dd}`);
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleFileChangeUsulan = (event) => {
    const selectedFile = event.target.files[0];
    setFileUsulan(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { pengusul, tanggal, name, hp_no, surat_usulan, usulan } = formData;
    const requestBody = {
      pengusul,
      tanggal,
      name,
      hp_no,
      surat_usulan,
      usulan
    };

    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });


    if (file.length !== 0) {
      // Upload the new file
      const formDataObject = new FormData();
      formDataObject.append("tipe", "surat usulan");
      formDataObject.append("file", file);

      const fileUploadResponse = await POST(
        `/file/upload`,
        formDataObject,
        undefined,
        { "Content-Type": "multipart/form-data" }
      );

      const newPictureFileId = fileUploadResponse?.fileId;
      requestBody.surat_usulan = newPictureFileId;
    }

    if (fileUsulan.length !== 0) {
      // Upload the new file
      const formDataObject = new FormData();
      formDataObject.append("tipe", "usulan");
      formDataObject.append("file", fileUsulan);

      const fileUploadResponse = await POST(
        `/file/upload`,
        formDataObject,
        undefined,
        { "Content-Type": "multipart/form-data" }
      );

      const newPictureFileIdUsulan = fileUploadResponse?.fileId;
      requestBody.usulan = newPictureFileIdUsulan;
    }

    const res = await POST(`/usulan-peserta/create-usulan`, requestBody);
    if (res) {
      Swal.fire({
        icon: "success",
        title: "Berhasil membuat usulan peserta!",
      }).then(() => {
        Swal.close();
        setFormData({
          pengusul: "",
          tanggal: "",
          name: "",
          hp_no: "",
          surat_usulan: "",
          usulan: "",
        });
        setFile('');
        // router("/tentang-yayasan-dan-aplikasi")
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
            <h1 className="text-center" style={{ color: "#ffde59" }}>Pengajuan Usulan Calon Peserta Diklat</h1>
            <h3 className="text-center" style={{ color: "#ffffff" }}>Program dan Evaluasi Pusdiklat Manajemen dan Kepemimpinan</h3>
          </div>
        </div>
      </div>
      <div className="row mx-2">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex">
              <h4 className="card-title mb-2">Pengiriman Usulan</h4>
              {location.state?.from === "Detail" && (
                <Link className="btn btn-primary" to={`/daftar-usulan-peserta`}>
                  Kembali
                </Link>
              )}
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form className="form-valide" onSubmit={handleSubmit} >
                  <div className="row flex-wrap">
                    <div className='form-group col-md-6 col-12'>
                      <label>Satker/Unit Pengusul</label>
                      <input
                        className='form-control'
                        name="pengusul"
                        type='text'
                        value={formData.pengusul}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='form-group col-md-6 col-12'>
                      <p className="mb-1">Tanggal Registrasi<span className="text-danger">*</span></p>
                      <input
                        name="tanggal"
                        type="date"
                        onChange={handleDateChange}
                        className="form-control"
                        max={getFormattedDate().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className='form-group col-md-6 col-12'>
                      <label>Nama Kontak Person</label>
                      <input
                        className='form-control'
                        name="name"
                        type='text'
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='form-group col-md-6 col-12'>
                      <label>No Wa Kontak Person</label>
                      <input
                        className='form-control'
                        name="hp_no"
                        type='text'
                        value={formData.hp_no}
                        onChange={(e) => {
                          const { value } = e.target;
                          // Hanya karakter angka
                          const numericValue = value.replace(/\D/g, "");
                          setFormData((prevState) => ({
                            ...prevState,
                            hp_no: numericValue,
                          }));

                          const form = e.currentTarget.form;
                          const isValid = form.checkValidity();

                          setValidated(isValid);

                          if (isValid) {
                            form.classList.remove("was-validated");
                          } else {
                            form.classList.add("was-validated");
                          }
                        }}
                        required
                      />
                    </div>
                    <div className='form-group col-md-6 col-12'>
                      <label>Surat Usulan</label>
                      <input
                        className='form-control'
                        type='file'
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                    <div className='form-group col-md-6 col-12'>
                      <label>Usulan</label>
                      <input
                        className='form-control'
                        type='file'
                        accept=".xlsx, .xls"
                        onChange={handleFileChangeUsulan}
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
                        <button type="submit" className="btn btn-primary w-100">
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

export default FormUsulanPeserta
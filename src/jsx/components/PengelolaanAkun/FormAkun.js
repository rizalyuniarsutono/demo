import React, { Fragment, useState, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import { GET, PATCH, POST } from "../../../services/AxiosService";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

const FormAkun = () => {
  const location = useLocation();
  const { id } = useParams();
  const router = useNavigate();
  const [locations, setLocations] = useState(location.state?.from);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    nama: "",
    password: "",
    email: "",
    role: ""
  });

  const fetchData = async () => {
    const res = await GET(`/user/${id}`);

    setFormData({
      username: res.data?.username,
      nama: res.data?.nama,
      email: res.data?.email,
      role: res.data?.role,
    });
  };
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);

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
    const { username, nama, email, password, role } = formData;
    const requestBody = {
      username,
      nama,
      email,
      password,
      role,
    };

    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const res = await POST(`/user/create-user`, requestBody);
    if (res) {
      Swal.fire({
        icon: "success",
        title: "Berhasil membuat akun!",
      }).then(() => {
        Swal.close();
        setFormData({
          username: "",
          nama: "",
          email: "",
          password: "",
          role: "",
        });
        router("/pengelolaan-akun")
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { username, nama, email, role } = formData;
    const requestBody = {
      username,
      nama,
      email,
      role,
    };

    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const res = await PATCH(`/user/${id}`, requestBody);
    if (res) {
      Swal.fire({
        icon: "success",
        title: "Berhasil mengubah akun!",
      }).then(() => {
        Swal.close();
        setFormData({
          username: "",
          nama: "",
          email: "",
          password: "",
          role: "",
        });
        router("/pengelolaan-akun")
      });
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex">
              <h4 className="card-title mb-2">{locations} Akun</h4>
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
                      <label>Username</label>
                      <input
                        className='form-control'
                        name="username"
                        type='text'
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='form-group col-md-6 col-12'>
                      <label>Nama</label>
                      <input
                        className='form-control'
                        name="nama"
                        type='text'
                        value={formData.nama}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='form-group col-md-6 col-12'>
                      <label>Email</label>
                      <input
                        className='form-control'
                        name="email"
                        type='text'
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {locations === "Tambah" && (
                      <div className='form-group col-md-6 col-12'>
                        <label>Password</label>
                        <input
                          className='form-control'
                          name="password"
                          type='password'
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                    <div className='form-group col-md-6 col-12'>
                      <label>Role<span className="text-danger">*</span></label>
                      <select
                        className='form-control'
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      // disabled={location.state?.from === "Detail"}
                      >
                        <option key="" value="">Pilih Role</option>
                        <option key="admin" value="admin">Admin</option>
                        <option key="pengguna" value="pengguna">Pengguna</option>
                      </select>
                    </div>


                  </div>

                  {location.state?.from !== "Detail" && (
                    <div className="form-group mb-3 d-flex">
                      <div className="col-xl-6">
                        <Link className="btn btn-light w-100" to={`/pengelolaan-akun`}>
                          Batal
                        </Link>
                      </div>
                      <div className="col-xl-6">
                        <button type="submit" className="btn btn-primary w-100" onClick={locations === "Tambah" ? handleSubmit : handleEditSubmit}>
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
    </Fragment>
  )
}

export default FormAkun
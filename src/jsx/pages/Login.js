import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {
	loadingToggleAction, loginAction,
} from '../../store/actions/AuthActions';
import logo from "../../images/logo-ma.jpg";
import logotext from '../../images/logo-text.png'
import Swal from 'sweetalert2';
import { POST } from '../../services/AxiosService';
import { Form } from 'react-bootstrap';

function Login() {
	const router = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [validated, setValidated] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Validasi form di sini
		const form = e.currentTarget.form;
		const isValid = form.checkValidity();
		setValidated(isValid);
		if (isValid) {
			form.classList.remove("was-validated");
		} else {
			form.classList.add("was-validated");
		}
	};

	function callback(res) {
		Swal.close();
		Swal.fire({
			icon: "error",
			title: `${res.data.Message}`,
		});
	}

	const handleLogin = async (e) => {
		e.preventDefault();

		const requestBody = {
			username: formData.username,
			password: formData.password,
		};

		Swal.fire({
			title: "Logging in...",
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		const res = await POST(`/user/login`, requestBody, callback);
		if (res) {
			console.log(res.data);
			
			Swal.close();
			Swal.fire( "Login Sukses" );

			const token = res.data.token;
			const refresh_token = res.data.refreshToken;
			// const access_id = res.access_id;
			const access_name = res.data.nama;
			const access_role = res.data.role;

			localStorage.setItem("accessToken", token);
			localStorage.setItem("refreshToken", refresh_token);
			// localStorage.setItem("accessId", access_id);
			localStorage.setItem("accessName", access_name);
			localStorage.setItem("accessRole", access_role);

			router("/");
		}
	};

	return (
		<div className="vh-100">
			<div className='mb-5' style={{ height: "200px", backgroundColor: "#004aad" }}>
				<div className='d-flex justify-content-center align-items-center'>
					<img className="mr-5" src={logo} alt="" height={200} />
					<div>
						<h1 className="text-center" style={{ color: "#ffde59" }}>SIULAN-CEKSITA</h1>
						<h1 className="text-center" style={{ color: "#ffde59" }}>Sistem Informasi Pengusulan, Pengecekan dan Aspirasi Pengaduan Peserta</h1>
						<h3 className="text-center" style={{ color: "#ffffff" }}>Program dan Evaluasi Pusdiklat Manajemen dan Kepemimpinan</h3>
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-center align-items-center">
				<div className="p-4" style={{ width: "800px", backgroundColor: "#004aad", borderRadius: "40px" }}>
					<form onSubmit={handleLogin} noValidate validated={validated}>
						<div className="form-group">
							<label className="mb-2 ">
								<strong className="text-white">Username</strong>
							</label>
							<input name="username" type="text" className="form-control" placeholder="Masukkan Username" maxLength="14" required value={formData.username} onChange={handleChange} />
							<Form.Control.Feedback type="invalid">
								Username harus diisi.
							</Form.Control.Feedback>
						</div>
						<div className="form-group">
							<label className="mb-2"><strong className="text-white">Password</strong></label>
							<input name="password" type="password" className="form-control" placeholder="Masukkan password" maxLength="199" required value={formData.password} onChange={handleChange} />
							<Form.Control.Feedback type="invalid">
								Password harus diisi.
							</Form.Control.Feedback>
						</div>
						<div className="text-right">
							<label className="text-white text-right mb-4">Lupa Password</label>
						</div>
						<div className="text-center">
							<button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: "#5271ff", color: "#ffffff" }} disabled={!validated}>Masuk</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default Login;
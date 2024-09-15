import React, { Fragment, useEffect, useState } from 'react'
import { Row, Col, Card, Badge, Modal } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DELETE, GET, PATCH } from '../../../services/AxiosService';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";

const DaftarPengaduanAspirasi = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setShow(true);
    setFormData({
      id: row.id,
      tindakLanjut: row.tindak_lanjut
    })
  }
  const [formData, setFormData] = useState({
    id: "",
    tindakLanjut: ""
  })

  const fetchData = async () => {
    const res = await GET(`/aspirasi-pengaduan`);
    setData(res?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { name: 'No', selector: (row, index) => index + 1, width: "80px" },
    {
      name: 'Klasifikasi',
      selector: row => row.klasifikasi,
    },
    {
      name: 'Judul',
      selector: row => row.judul,
    },
    {
      name: 'Laporan',
      selector: row => row.deskripsi,
    },
    {
      name: 'Tindak Lanjut',
      selector: row => row.tindak_lanjut,
    },
    {
      name: 'Aksi',
      selector: row => row.id,
      width: "150px",
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary shadow btn-xs sharp"
            title="Edit"
            onClick={() => handleShow(row)}
          >
            <i className="fa fa-pencil"></i>
          </button>
        </div>
      ),
    },
  ];
  const customStyles = {
    headRow: { style: { backgroundColor: "#FCFCFD", fontSize: "14px", fontWeight: "bold", color: "black" } },
    rows: { style: { backgroundColor: "#FFFFFF", "&:nth-child(2n)": { backgroundColor: "#F3F0FD" } } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { tindakLanjut } = formData;
    const requestBody = {
      tindakLanjut,
    };

    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const res = await PATCH(`/aspirasi-pengaduan/${formData.id}/tindak-lanjut`, requestBody);
    if (res) {
      Swal.fire({
        icon: "success",
        title: "Berhasil mengubah tindak lanjut!",
      }).then(() => {
        Swal.close();
        setFormData({
          id: "",
          tindakLanjut: "",
        });
        fetchData();
        setShow(false);
      });
    }
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Daftar Pengaduan dan Aspirasi</Card.Title>
            </Card.Header>
            <Card.Body>
              {data && data.length > 0 ? (
                <DataTable
                  columns={columns}
                  data={data}
                  customStyles={customStyles}
                // pagination
                // paginationServer
                // paginationRowsPerPageOptions={[10, 25, 50]}
                // paginationResetDefaultPage={resetPaginationToggle}
                // paginationPerPage={perPage}
                // paginationTotalRows={totalRows}
                // onChangePage={handlePageChange}
                // onChangeRowsPerPage={handlePerPageChange}
                // onSort={handleSort}
                // defaultSortFieldId={1}
                />
              ) : (
                <p>Tidak ada data</p>
              )}
            </Card.Body>
          </Card>

          <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px", backgroundColor: "#004aad" }}>
              <Modal.Title className='text-white'>Tindak Lanjut</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#004aad" }}>
              <div className='form-group'>
                <textarea
                  className='form-control'
                  name="tindakLanjut"
                  rows="8"
                  value={formData.tindakLanjut}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  placeholder="Ketikan tindak lanjut"
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer style={{ borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", backgroundColor: "#004aad" }}>
              <button className='btn btn-danger' onClick={handleClose}>
                Batal
              </button>
              <button className='btn btn-success' onClick={handleSubmit}>
                Simpan Perubahan
              </button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Fragment>
  )
}

export default DaftarPengaduanAspirasi
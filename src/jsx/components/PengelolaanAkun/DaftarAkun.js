import React, { Fragment, useEffect, useState } from 'react'
import { Row, Col, Card, Badge } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DELETE, GET, PATCH } from '../../../services/AxiosService';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";

const DaftarAkun = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState("");

  const fetchData = async (page, perPage) => {
    const params = {
      page,
      size: perPage,
    };
    const res = await GET(`/user`, params);
    setData(res?.data);
  };
  const fetchServerData = () => {
    fetchData(currentPage, perPage);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setResetPaginationToggle(!resetPaginationToggle);
  };
  useEffect(() => {
    fetchServerData();
  }, [perPage, currentPage]);
  const columns = [
    {
      name: 'Username',
      selector: row => row.username,
    },
    {
      name: 'Nama',
      selector: row => row.nama,
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    {
      name: 'Role',
      selector: row => row.role,
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
            onClick={() => navigate(`/${row.id}/form-akun`, { state: { from: 'Ubah' } })}
          >
            <i className="fa fa-pencil"></i>
          </button>

          <Link className="btn btn-danger shadow btn-xs sharp ml-1" title="delete" onClick={() => handleDeleteClick(row.id)} >
            <i className="fa fa-trash"></i>
          </Link>
        </div>
      ),
    },
  ];
  const customStyles = {
    headRow: { style: { backgroundColor: "#FCFCFD", fontSize: "14px", fontWeight: "bold", color: "black" } },
    rows: { style: { backgroundColor: "#FFFFFF", "&:nth-child(2n)": { backgroundColor: "#F3F0FD" } } },
  };

  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin hapus data?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await DELETE(`/user/${id}`);
      if (res) {
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Berhasil menghapus akun!",
        }).then(() => {
          Swal.close();
        });
      }
    }
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Daftar Akun Pengguna</Card.Title>
            </Card.Header>
            <div className="d-flex justify-content-end mt-4 px-5">
              <button className="btn btn-success" onClick={() => navigate(`/form-akun`, { state: { from: 'Tambah' } })}>
                Tambah Akun
              </button>
            </div>
            <Card.Body>
              {data && data.length > 0 ? (
                <DataTable
                  columns={columns}
                  data={data}
                  customStyles={customStyles}
                  pagination
                  paginationServer
                  paginationRowsPerPageOptions={[10, 25, 50]}
                  paginationResetDefaultPage={resetPaginationToggle}
                  paginationPerPage={perPage}
                  paginationTotalRows={totalRows}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handlePerPageChange}
                />
              ) : (
                <p>Tidak ada data</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default DaftarAkun
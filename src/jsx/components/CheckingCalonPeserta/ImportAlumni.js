import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Badge } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DELETE, GET, PATCH, POST } from '../../../services/AxiosService';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";

const ImportAlumni = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState("");

  const fetchData = async (page, perPage) => {
    const params = {
      page,
      size: perPage,
    };
    const res = await GET(`/alumni-diklat`, params);
    setData(res?.data);
    setTotalRows(res?.pagination?.totalData);
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
    { name: 'No', selector: (row, index) => index + 1, width: "80px" },
    {
      name: 'Nip',
      selector: row => row.nip,
    },
    {
      name: 'Nama',
      selector: row => row.nama_peserta,
    },
    {
      name: 'Id Diklat',
      selector: row => row.id_diklat,
    },
    {
      name: 'Nama Diklat',
      selector: row => row.nama_diklat,
    },
    // {
    //   name: 'Aksi',
    //   selector: row => row.id,
    //   width: "150px",
    //   cell: (row) => (
    //     <div>
    //       <button
    //         className="btn btn-info shadow btn-xs sharp mx-1"
    //         title="Detail"
    //       // onClick={() => navigate(`/${row.id}/form-tentang`, { state: { from: 'Detail' } })}
    //       >
    //         <i className="fa fa-eye"></i>
    //       </button>

    //       <button
    //         className="btn btn-primary shadow btn-xs sharp"
    //         title="Edit"
    //       // onClick={() => navigate(`/${row.id}/form-tentang`, { state: { from: 'Ubah' } })}
    //       >
    //         <i className="fa fa-pencil"></i>
    //       </button>

    //       <Link className="btn btn-danger shadow btn-xs sharp ml-1" title="delete"
    //       // onClick={() => handleDeleteClick(row.id)}
    //       >
    //         <i className="fa fa-trash"></i>
    //       </Link>
    //     </div>
    //   ),
    // },
  ];
  const customStyles = {
    headRow: { style: { backgroundColor: "#FCFCFD", fontSize: "14px", fontWeight: "bold", color: "black" } },
    rows: { style: { backgroundColor: "#FFFFFF", "&:nth-child(2n)": { backgroundColor: "#F3F0FD" } } },
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      await handleImportExcel(selectedFile);
    }
  };

  const handleImportExcel = async (selectedFile) => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (!selectedFile) {
      alert('Please select an Excel file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await POST('/alumni-diklat/import-alumni', formData, undefined, { "Content-Type": "multipart/form-data" });
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Berhasil upload, silahkan cek data",
      }).then(() => {
        Swal.close();
        fetchData();
      });
    }
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Daftar Alumni</Card.Title>
            </Card.Header>
            <div className="d-flex justify-content-end mt-4 px-5">
              <input
                ref={fileInputRef}
                className='d-none'
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
              />
              <button className="btn btn-success" onClick={() => fileInputRef.current.click()}>
                Import Alumni
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

export default ImportAlumni
import React, { Fragment, useEffect, useState } from 'react'
import { Row, Col, Card, Badge } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DELETE, GET, PATCH } from '../../../services/AxiosService';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";

const DaftarUsulanPeserta = () => {
  const navigate = useNavigate();
  const dataDummy = [
    {
      id: 'O-20240725-002',
      name: 'Rizal',
      type: 'Vol 1',
      qty: 2,
      nama_penerima: 'Rizal Yuniar',
      status: 'sudah assign',
    },
    {
      id: 'O-20240725-003',
      name: 'Rizal Yuniar',
      type: 'Vol 2',
      qty: 3,
      nama_penerima: 'Rizal',
      status: 'belum assign',
    },
  ];
  const columns = [
    {
      name: 'Username',
      selector: row => row.id,
    },
    {
      name: 'Nama',
      selector: row => row.name,
    },
    {
      name: 'Email',
      selector: row => row.type,
    },
    {
      name: 'Role',
      selector: row => row.qty,
    },
    {
      name: 'Aksi',
      selector: row => row.id,
      width: "150px",
      cell: (row) => (
        <div>
          <button
            className="btn btn-info shadow btn-xs sharp mx-1"
            title="Detail"
          // onClick={() => navigate(`/${row.id}/form-tentang`, { state: { from: 'Detail' } })}
          >
            <i className="fa fa-eye"></i>
          </button>

          <button
            className="btn btn-primary shadow btn-xs sharp"
            title="Edit"
          // onClick={() => navigate(`/${row.id}/form-tentang`, { state: { from: 'Ubah' } })}
          >
            <i className="fa fa-pencil"></i>
          </button>

          <Link className="btn btn-danger shadow btn-xs sharp ml-1" title="delete"
          // onClick={() => handleDeleteClick(row.id)}
          >
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

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Daftar Usulan Peserta</Card.Title>
            </Card.Header>
            <div className="d-flex justify-content-end mt-4 px-5">
              <button className="btn btn-success"
              // onClick={() => navigate(`/form-cerita-hikmah`, { state: { from: 'Tambah' } })}
              >
                Tambah Usulan
              </button>
            </div>
            <Card.Body>
              {dataDummy && dataDummy.length > 0 ? (
                <DataTable
                  columns={columns}
                  data={dataDummy}
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
        </Col>
      </Row>
    </Fragment>
  )
}

export default DaftarUsulanPeserta
import React, { Fragment, useState, useRef } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import DataTable from "react-data-table-component";
import { POST } from '../../../services/AxiosService';
import Swal from 'sweetalert2';

const CalonPeserta = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

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

    const response = await POST('/alumni-diklat/cek-calpes', formData, undefined, { "Content-Type": "multipart/form-data" });
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Berhasil upload, silahkan cek data",
      }).then(() => {
        Swal.close();
        setData(response.duplicates);
      });
    }
  };

  const columns = [
    { name: 'No', selector: (row, index) => index + 1, width: "80px" },
    { name: 'Nama', selector: row => row.data?.nama_peserta, wrap: true, },
    { name: 'Nip', selector: row => row.data?.nip, wrap: true, },
    { name: 'Status', selector: row => row.message, wrap: true, },
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
              <Card.Title>Checking Calon Peserta</Card.Title>
            </Card.Header>
            <div className="d-flex mt-4 px-5">
              <input
                ref={fileInputRef}
                className='d-none'
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
              />
              <button className="btn btn-primary mr-auto" onClick={() => fileInputRef.current.click()}>
                Import Excel
              </button>

              <button className="btn btn-success mr-2">
                Download Hasil
              </button>
            </div>
            <Card.Body>
              <DataTable
                columns={columns}
                data={data}
                customStyles={customStyles}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default CalonPeserta;

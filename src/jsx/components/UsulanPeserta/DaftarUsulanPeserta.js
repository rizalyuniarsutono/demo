import React, { Fragment, useEffect, useState } from 'react'
import { Row, Col, Card, Badge } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DELETE, GET, PATCH } from '../../../services/AxiosService';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";

const DaftarUsulanPeserta = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pdfFiles, setPdfFiles] = useState({});
  const [excelFiles, setExcelFiles] = useState({});

  const fetchData = async () => {
    const res = await GET(`/usulan-peserta`);
    setData(res?.data);

    const pdfFilesMap = {};
    const excelFilesMap = {};
    for (const row of res?.data) {
      try {
        const pdfResponse = await GET(`/file/pdf/${row.surat_usulan}`, {}, { responseType: "arraybuffer" });
        pdfFilesMap[row.surat_usulan] = pdfResponse;

        const excelResponse = await GET(`/file/excel/${row.usulan}`, {}, { responseType: "arraybuffer" });
        excelFilesMap[row.usulan] = excelResponse;
      } catch (error) {
        console.error(`Error downloading files for ${row.pengusul}: `, error);
      }
    }
    setPdfFiles(pdfFilesMap);
    setExcelFiles(excelFilesMap);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: 'Pengusul',
      selector: row => row.pengusul,
    },
    {
      name: 'Tanggal Usulan',
      selector: row => row.tanggal,
    },
    {
      name: 'Contact Person',
      selector: row => row.hp_no,
    },
    {
      name: 'Surat Usulan',
      selector: row => row.surat_usulan,
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary shadow btn-xs"
            onClick={() => handleDownloadPdf(row.surat_usulan, `Surat_Usulan_${row.pengusul}`)}
          >
            Download
          </button>
        </div>
      ),
    },
    {
      name: 'Usulan',
      selector: row => row.usulan,
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary shadow btn-xs"
            onClick={() => handleDownloadExcel(row.usulan, `Usulan_${row.pengusul}`)}
          >
            Download
          </button>
        </div>
      ),
    }
  ];
  const customStyles = {
    headRow: { style: { backgroundColor: "#FCFCFD", fontSize: "14px", fontWeight: "bold", color: "black" } },
    rows: { style: { backgroundColor: "#FFFFFF", "&:nth-child(2n)": { backgroundColor: "#F3F0FD" } } },
  };

  const handleDownloadPdf = (fileId, fileName) => {
    const file = pdfFiles[fileId];
    if (file) {
      const blob = new Blob([file], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  };

  const handleDownloadExcel = (fileId, fileName) => {
    const file = excelFiles[fileId];
    if (file) {
      const blob = new Blob([file], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
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
              <button className="btn btn-success" onClick={() => navigate(`/form-usulan-peserta`, { state: { from: 'Tambah' } })}>
                Tambah Usulan
              </button>
            </div>
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
        </Col>
      </Row>
    </Fragment>
  )
}

export default DaftarUsulanPeserta
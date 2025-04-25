import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiFileExcel2Line } from "react-icons/ri";

import '../css/AdminHome.css'
import Form from '../Components/Form';
import Loading from "../Components/Loading";
import Error from "../Components/Error";

function AdminHome() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [file, setFile] = useState(null);
    const [excelData, setExcelData] = useState([]);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            console.log(selectedFile);
        }
    }

    const handleFileUpload = (e) => {
        e.preventDefault();

        setIsLoading(true)
        setError(null)
        // const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });

            const sheetName = workbook.SheetNames[0]; // First sheet
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);
            setExcelData(data);
            console.log(data);
        };

        reader.readAsArrayBuffer(file);
        setIsLoading(false)
        setFile(null)
    }

    return (
        <Form heading="Import From Excel" handleNext={handleFileUpload}>
            {isLoading && <Loading />}
            {error && <Error message={error} />}
            <div className="file-upload-container">
                <label htmlFor="dropzone-file" className="file-upload-label">
                    <div className="upload-content">
                        {file ?
                            <>
                                <div className='excel-file-container'>
                                    <div>
                                        <RiFileExcel2Line className='upload-icon' />
                                    </div>
                                    <div>
                                        <div className="upload-text">{file.name}</div>
                                        <div className="upload-text-small">{(file.size / 1024).toFixed(2)}kb</div>
                                    </div>
                                </div>

                            </>
                            :
                            <>
                                {/* <svg className="upload-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg> */}
                                <AiOutlineCloudUpload className='upload-icon' />
                                <p className="upload-text"><span className="upload-text-bold">Click to upload</span> or drag and drop</p>
                                <p className="upload-text-small">*File supported - .xlsx</p>
                            </>
                        }
                    </div>
                    <input id="dropzone-file" onChange={onFileChange} type="file" accept=".xlsx" className="hidden-input" />
                </label>
            </div>
        </Form>
    )
}

export default AdminHome
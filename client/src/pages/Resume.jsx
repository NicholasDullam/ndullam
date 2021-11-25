import React, { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import resume from '../images/resume.pdf'
import { FiDownload } from 'react-icons/fi'
import styled from 'styled-components'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const PDFDocumentWrapper = styled.div`
  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;

const Resume = (props) => {
    return (
        <PDFDocumentWrapper style={{ position: 'relative', height: '100%', width: '100%', color: 'white' }}>
            <Document file={resume}>
                <Page pageNumber={1}/>
            </Document>
            <a href={resume} target={'_blank'}>
                <div style={{ position: 'absolute', top: '20px', right: '20px', borderRadius: '25px', backgroundColor: 'rgba(0,0,0,.95)', padding: '12px 18px 12px 18px', display: 'flex' }}>
                    <FiDownload style={{ marginRight: '5px', color: 'white' }}/>
                    <p style={{ margin: '0px', textDecoration: 'none', highlight: 'none', color: 'white' }}> Download </p>
                </div>
            </a>
        </PDFDocumentWrapper>
    )
}

export default Resume
import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import resume from '../images/resume.pdf'
import { FiDownload } from 'react-icons/fi'
import styled from 'styled-components'

const Download = styled.a`
    transition: transform 300ms ease, background-color 300ms ease, color 300ms ease;
    background-color: black;
    box-shadow: 0 0px 20px 5px rgba(0,0,0,.08);
    color: white;
    z-index: 4;
    &:hover {
        color: black;
        background-color: white;
        transform: scale(1.1);
    }
`

const Resume = (props) => {
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <div style={{ position: 'relative', height: '100%', width: '100%', color: 'white' }}>
                <Viewer theme={'dark'} fileUrl={resume}/>
                <Download href={resume} target={'_blank'} style={{ position: 'absolute', top: '20px', right: '20px', borderRadius: '25px', padding: '12px 18px 12px 18px', display: 'flex', textDecoration: 'none' }}>
                    <FiDownload style={{ marginRight: '8px' }}/>
                    <p style={{ margin: '0px' }}> Download </p>
                </Download>
            </div>
        </Worker>
    )
}

export default Resume
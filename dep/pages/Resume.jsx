import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { LoadingIcon } from '../../client/src/components';
import resume from '../images/resume.pdf';

const Resume = (props) => {
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <div className="relative h-full w-full color-white">
                <Viewer theme={'dark'} fileUrl={resume} renderLoader={() => <LoadingIcon/>}/>
                <a href={resume} target={'_blank'} className="flex items-center absolute top-3 right-3 transform rounded-3xl no-underline py-3 px-4 bg-black hover:text-black hover:bg-white hover:scale-110 shadow-md transition-all duration-300">
                    <FiDownload className="mr-2"/>
                    <p> Download </p>
                </a>
            </div>
        </Worker>
    )
}

export default Resume
import React from "react";
import axios from 'axios';
import { useState } from "react";
import "./DragDrop.css";

const DragDrop = () => {

    const [isDragActive, setisDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(e.type === "dragenter" || e.type === "dragover") {
            setisDragActive(true);
        } else if(e.type === "dragleave") {
            setisDragActive(false);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setisDragActive(false);
        const file = e.dataTransfer.files[0];
        if(file.type != "application/pdf") {
            alert("Only files with extension .pdf are allowed");
        }
        else if(file.size > 5242880) {
            alert("File is too large!! Please upload files with size less than 5MB");
        }
        else if(e.dataTransfer.files && e.dataTransfer.files[0]) {
            axios.post('http://192.168.1.39:3000/parse-resume', {
                file: e.dataTransfer.files[0],
                profile: "Software Developer"
            }).then(res => {
                console.log(res.data);
            })
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file);
        if(file.type != "application/pdf") {
            alert("Only files with extension .pdf are allowed");
        }
        else if(file.size > 5242880) {
            alert("File is too large!! Please upload files with size less than 5MB");
        }
        else if(e.target.files && e.target.files[0]) {
            alert(file.name);
        }


    }

    return (
        <form id="form-file-upload" onDragEnter={handleDrag} onDrop={handleDrop} >
            <input type="file" id="input-file-upload" accept="application/pdf" onChange={handleChange} />
            <label id="label-file-upload" htmlFor="input-file-upload" className={isDragActive ? "drag-active" : ""}>
                <div> 
                    <p>Drag and drop your file here or click anywhere to upload a file</p>
                </div>
            </label>
            { isDragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
        </form>
    );
}

export default DragDrop;
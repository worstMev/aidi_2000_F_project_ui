// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';

const BASE = 'http://localhost:8000';
export default function Home() {
    const [ src, setSrc ] = useState(null);
    const [ img, setImg ] = useState(null);
    const [ output, setOutput ] = useState(null);
    const handleImage = (e) => {
        console.log('image selected :',e.target.files);
        if (e.target.files.length){
            const file = e.target.files[0];
            const new_src = URL.createObjectURL(file)
            setSrc(new_src)
            setImg(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit')
        const url = `${BASE}/upload`;
        try{
            const formData = new FormData();
            formData.append('image', img);
            const res = await fetch(url, {
                method : 'POST',
                body : formData,
            });
            const response = await res.json();
            console.log('response from server :',response);
            setOutput(response);
        }catch(err){
            console.log('error in handleSubmit :', err);
        }
    }
    return (
        <div className={styles.page}>
            <div className ={styles.input}>
                <div className={styles.control}> 
                    <label>
                    select an Image
                        <input 
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className={styles.input}
                        />
                    </label>
                </div>
                <div className={styles.preview}>
                    <p> preview of image </p>
                    <img
                        className={styles.img}
                        src = {src}
                        alt = "preview image"
                    />
                </div>
                <button
                    onClick = {handleSubmit}
                >
                    Submit
                </button>
            </div>
            <div id ={styles.output}>
                <p> output </p>
                { output &&
                    <>
                        <p> {output} </p>
                    </>
                }
            </div>
        </div>
    );
}

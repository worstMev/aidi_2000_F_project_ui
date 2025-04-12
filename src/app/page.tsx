// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';

const LOCAL = 'http://localhost:8000';
const SERVER = 'http://3.22.71.226:8000';
const BASE = SERVER;


export default function Home() {
    const [src, setSrc] = useState<string | null>(null);
    const [img, setImg] = useState<File | null>(null);
    const [output, setOutput] = useState<string | null>(null);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const newSrc = URL.createObjectURL(file);
            setSrc(newSrc);
            setImg(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!img) return;

        try {
            const formData = new FormData();
            formData.append('image', img);

            const res = await fetch(`${BASE}/upload`, {
                method: 'POST',
                body: formData,
            });

            const response = await res.json();
            setOutput(response?.result || JSON.stringify(response));
        } catch (err) {
            console.error("Error uploading image:", err);
            setOutput("Failed to process image.");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.input}>
                <div className={styles.control}>
                    <label>
                        Select an Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className={styles.inputFile}
                        />
                    </label>
                </div>

                <div className={styles.preview}>
                    {src ? (
                        <img src={src} alt="Preview" className={styles.img} />
                    ) : (
                        <div className={styles.placeholder}>No image selected</div>
                    )}
                </div>

                <button
                    className={`${styles.button} ${img ? styles.activeButton : styles.disabledButton}`}
                    onClick={handleSubmit}
                    disabled={!img}
                >
                    Check Vibration
                </button>
            </div>

            <div id={styles.output}>
                <h2>Analysis Results</h2>
                {output ? (
                    <p>{output}</p>
                ) : (
                    <p className={styles.placeholderText}>Select an image to begin</p>
                )}
            </div>
        </div>
    );
}

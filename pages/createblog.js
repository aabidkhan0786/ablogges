import React, { useState, useEffect } from 'react';
import Link from "next/link"
import { auth } from "../firebase"
import { storage, db, serverTimestamp } from "../firebase"
import { v4 as uuidv4 } from 'uuid'
import router from 'next/router';


export default function CreateBlog({ user }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [img, setImg] = useState(null);
    const [url, setUrl] = useState("");
    const [alerts, setAlerts] = useState(false);
    const [msgs, setMsgs] = useState('');


    useEffect(() => {
        if (url) {
            try {
                db.collection("ablogs").add({
                    title,
                    body,
                    imageUrl: url,
                    createdAt: serverTimestamp(),
                    postedBy: user.uid,
                    createdBy: user.displayName
                })
                setMsgs("Post Created Successfully!")
                setAlerts(true)
                router.push('/')
            } catch (error) {
                setMsgs(error.message)
                setAlerts(true)
            }
        }
    }, [url])

    const submitDetails = () => {
        // e.preventDefault();
        if (!title || !body || !img) {
            setMsgs("Please add all fields!")
            setAlerts(true)
            return
        }
        var uploadTask = storage.ref().child(`images/${uuidv4()}`).put(img);
        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                if (progress == "100")
                    setMsgs("Pic Uploaded!")
                setAlerts(true)
            },
            (error) => {
                // Handle unsuccessful uploads
                setMsgs(error.message)
                setAlerts(true)
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUrl(downloadURL)
                });
            }
        );
    }

    return (
        <>

            <div className="row-fluid create_blog">
                <div className="col-11 col-lg-8 mx-auto shadow-lg p-3 mb-3 bg-body rounded  ">
                    {alerts && <>
                        <div class="alert alert-dismissible alert-primary">
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            <strong>{msgs}</strong>
                        </div>
                    </>}
                    <div className="form-group">
                        <h1 className="text-center"><u>Create Your Blog</u></h1>
                        <label className="form-label mt-4 ">Welcome to aBlogges!</label>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" onChange={e => setTitle(e.target.value)} placeholder="name@example.com" />
                            <label for="floatingInput">Add Title</label>
                        </div>
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" onChange={e => setBody(e.target.value)} id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                            <label for="floatingTextarea2">Write Content</label>
                        </div>
                        <div className="form-group">
                            <label for="formFile" className="form-label mt-4">Select Image</label>
                            <input className="form-control" type="file" id="formFile" accept="/image/*" onChange={e => setImg(e.target.files[0])} />
                        </div>
                        {
                            img ?
                                <>
                                    <h3>Image Preview:</h3>
                                    <img className="img-fluid" src={img ? URL.createObjectURL(img) : ""} />
                                </> : ""
                        }
                        <div className="d-grid gap-2 my-3">
                            <button className="btn btn-lg   btn-outline-success" onClick={() => submitDetails()} type="button">CREATE</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



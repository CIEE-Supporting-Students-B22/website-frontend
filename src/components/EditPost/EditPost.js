import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import "./EditPost.css";
import ReactDOM from 'react-dom';


export function EditPost(props) {

    const [initData, setInitData] = useState({
        _id: useParams().id,
        postType: '',
        title: '',
        shortDescription: '',
        description: '',
        postImage: [],
        loaded: false
    })

    const [imageLinks, setImageLinks] = useState([]);

    const textAreaRef = useRef(null);

    useEffect(() => {
        fetch('/getPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "_id": initData._id
            })
        }).then(data => data.json())
            .then(d => {
                setInitData(d)
            })

        fetch('/getImages?_id='+initData._id)
            .then(data => data.json())
            .then(links => setImageLinks(links))

    }, [])

    const changeHandler = e => {
        if (e.target.files) {
            setInitData({...initData, [e.target.name]: e.target.files, numOfImages: e.target.files.length});
        }
        else setInitData({...initData, [e.target.name]: e.target.value});
    }

    const submitHandler = e => {
        e.preventDefault();
        let formData = new FormData();
        for (let key in initData) {
            if (key === 'postImage') {
                for (let i=0;i<initData[key].length;i++) {
                    formData.append(key, initData[key][i]);
                }
            }
            else formData.append(key, initData[key]);
        }
        fetch('/adminEditPost', {
            method: 'POST',
            body: formData
        }).then( r => r.json())
            .then(r => window.location.href = "/post/"+r._id)

    }

    function onImageClicked(imageSrc) {
        let start = textAreaRef.current.selectionStart;
        let end = textAreaRef.current.selectionEnd;
        textAreaRef.current.value = textAreaRef.current.value.substring(0, start) + "![]("+imageSrc+")" + textAreaRef.current.value.substring(end, textAreaRef.current.value.length);
        setInitData({...initData, description: textAreaRef.current.value});
    }

    function removeImage(imageSrc, e) {
        fetch('/adminRemoveImage', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({'path': imageSrc})
        })
        ReactDOM.findDOMNode(e.target).parentNode.remove();
        console.log("![]("+imageSrc+")");
        console.log(textAreaRef.current.value.length);
        textAreaRef.current.value = initData.description.replaceAll("![](/getImage?pathname="+imageSrc+")", '');
        console.log(textAreaRef.current.value.length);
        setInitData({...initData, description: textAreaRef.current.value});
    }


    return (
        <div>
            <form className="new-post-submission">
                <label>Title:</label>
                <input type="text" name="title" defaultValue={initData.title} onChange={changeHandler}/>
                <label>Replace Image: </label>
                <input type="file" name="postImage" accept="image/png, image/jpeg" onChange={changeHandler} multiple/>
                <label>Short Description:</label>
                <input type="text" name="shortDescription" value={initData.shortDescription} onChange={changeHandler}/>
                <label>Full Description: </label>
                <textarea name="description" value={initData.description} rows="20" onChange={changeHandler} ref={textAreaRef} />
                <button onClick={submitHandler}>Edit post</button>
            </form>
            <p>Insert an image:</p>
            <div className="rowDiv">
                <>
                    {
                        imageLinks.map(image => {
                            return (
                            <React.Fragment key={image}>
                                <div className="removeDiv">
                                    <img onClick={() => onImageClicked("/getImage?pathname=" + image)} className="prev-img" src={"/getImage?pathname=" + image} alt=""/>
                                    <button onClick={(e) => removeImage(image, e)}>Remove Image</button>
                                </div>
                            </React.Fragment>
                            )
                        })
                    }
                </>
            </div>
        </div>

    )
}

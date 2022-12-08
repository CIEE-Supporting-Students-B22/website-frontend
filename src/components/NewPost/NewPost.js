import React, {useRef, useState} from "react";
import {useParams} from "react-router-dom";
import "./NewPost.css";


export function NewPost(props) {
    const [allValues, setAllValues] = useState({
        postType: useParams().postType,
        title: '',
        shortDescription: '',
        description: '',
        numOfImages: 0,
        postImage: []
    });
    const textAreaRef = useRef(null);

    const changeHandler = e => {
        if (e.target.files) {
            setAllValues({...allValues, [e.target.name]: e.target.files, numOfImages: e.target.files.length});
        }
        else setAllValues({...allValues, [e.target.name]: e.target.value});
    }

    const submitHandler = e => {
        e.preventDefault();
        let formData = new FormData();
        for (let key in allValues) {
            if (key === 'postImage') {
                for (let i=0;i<allValues[key].length;i++) {
                    formData.append(key, allValues[key][i]);
                }
            }
            else formData.append(key, allValues[key]);
        }
        fetch('/adminAddPost', {
            method: 'POST',
            body: formData
        }).then( r => r.json())
            .then(r => window.location.href = "/post/"+r._id)

    }

    function onImageClicked(imageSrc) {
        let start = textAreaRef.current.selectionStart;
        let end = textAreaRef.current.selectionEnd;
        textAreaRef.current.value = textAreaRef.current.value.substring(0, start) + "![]("+imageSrc+")" + textAreaRef.current.value.substring(end, textAreaRef.current.value.length);
        setAllValues({...allValues, description: textAreaRef.current.value});
    }

    async function removeImage(imageSrc, e) {
        if (window.confirm("Are you sure you want to remove this image?")) {
            textAreaRef.current.value = allValues.description.replaceAll("![]("+imageSrc+")", '');
            setAllValues({...allValues, description: textAreaRef.current.value, postImage: allValues.postImage.filter(image => image.name !== imageSrc)});
        }
    }

    const imageUploader = e => {
        let files = e.target.files;
        if (files.length === undefined) files = [files];
        setAllValues({...allValues, [e.target.name]: [...(allValues.postImage), ...files], numOfImages: allValues.numOfImages+e.target.files.length});
        e.target.value="";
        console.log(allValues.postImage)
    }

    return (
        <div>
            <form className="new-post-submission">
                <label>Title:</label>
                <input type="text" name="title" onChange={changeHandler}/>
                <label>Image: </label>
                <input type="file" name="postImage" accept="image/png, image/jpeg" onChange={imageUploader} multiple/>
                <label>Short Description:</label>
                <input type="text" name="shortDescription" onChange={changeHandler}/>
                <label>Full Description: </label>
                <textarea ref={textAreaRef} rows="20" name="description" onChange={changeHandler}/>
                <button onClick={submitHandler}>Add post</button>
            </form>
            <p>Insert an uploaded image:</p>
            <div className="rowDiv">
                {
                    Array.from(allValues.postImage).map(image => {
                        return (
                            <div className="removeDiv" key={image.name}>
                                <img onClick={() => onImageClicked(image.name)} className="prev-img" src={URL.createObjectURL(image)} alt=""/>
                                <button onClick={(e) => removeImage(image.name, e)}>Remove Image</button>
                            </div>
                        )
                    })
                }
            </div>

        </div>

    )
}

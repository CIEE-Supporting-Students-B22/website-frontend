import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import "./EditPost.css";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {stateToHTML} from 'draft-js-export-html';
import ContentState from "draft-js/lib/ContentState";

export function EditPost(props) {

    const [initData, setInitData] = useState({
        _id: useParams().id,
        postType: '',
        title: '',
        shortDescription: '',
        description: EditorState.createEmpty(),
        postImage: [],
        loaded: false
    })

    const [reloadData,setReloadData] = useState(0); // used to trigger useEffect to reload the images

    const [imageLinks, setImageLinks] = useState([]);

    const textAreaRef = useRef(null);

    useEffect(() => {
        if (reloadData === 0) {
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
                const blocksFromHTML = require('draft-js').convertFromHTML(d.description);
                const descriptionDraft = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap,
                );
                setInitData({...d, description: EditorState.createWithContent(descriptionDraft)})
            })
        }

        fetch('/getImages?_id='+initData._id)
            .then(data => data.json())
            .then(links => setImageLinks(links))
    }, [reloadData])

    const changeHandler = e => {
        if (e.target.files) {
            setInitData({...initData, [e.target.name]: e.target.files, numOfImages: e.target.files.length});
        }
        else setInitData({...initData, [e.target.name]: e.target.value});
    }

    const submitHandler = e => {
        e.preventDefault();
        let content = stateToHTML(initData.description.getCurrentContent()).toString();
        let formData = new FormData();
        for (let key in initData) {
            if (key === 'postImage') {
                for (let i=0;i<initData[key].length;i++) {
                    formData.append(key, initData[key][i]);
                }
            }
            else if (key === 'description') formData.append(key, content);
            else formData.append(key, initData[key]);
        }
        fetch('/adminEditPost', {
            method: 'POST',
            body: formData
        }).then( r => r.json())
            .then(r => window.location.href = "/post/"+r._id)
    }

    const imageUploader = e => {
        console.log('image uploading')
        let selectedFiles = e.target.files;
        let formData = new FormData();
        for (let i=0;i<selectedFiles.length;i++) {
            formData.append('postImage', selectedFiles[i]);
        }
        formData.append('postID', initData._id);
        fetch('/adminSubmitImage', {
            method: 'POST',
            body: formData
        }).then( () => {
            setReloadData(reloadData+1);
        }).then( () => {
            e.target.value="";
        })
    }

    function onImageClicked(imageSrc) {
        let start = textAreaRef.current.selectionStart;
        let end = textAreaRef.current.selectionEnd;
        textAreaRef.current.value = textAreaRef.current.value.substring(0, start) + "![]("+imageSrc+")" + textAreaRef.current.value.substring(end, textAreaRef.current.value.length);
        setInitData({...initData, description: textAreaRef.current.value});
    }

    async function removeImage(imageSrc, e) {
        if (window.confirm("Are you sure you want to remove this image?")) {
            fetch('/adminRemoveImage', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({'path': imageSrc})
            })
            textAreaRef.current.value = initData.description.replaceAll("![](/getImage?pathname="+imageSrc+")", '');
            setInitData({...initData, description: textAreaRef.current.value});
            setReloadData(reloadData+1);
        }
    }

    const changeDesc = e => {
        setInitData({...initData, description: e});
    }


    return (
        <div>
            <form className="new-post-submission">
                <label>Title:</label>
                <input type="text" name="title" defaultValue={initData.title} onChange={changeHandler}/>
                <label>Replace Image: </label>
                <input type="file" name="postImage" accept="image/png, image/jpeg" onChange={imageUploader} multiple/>
                <label>Short Description:</label>
                <input type="text" name="shortDescription" value={initData.shortDescription} onChange={changeHandler}/>
                <label>Full Description: </label>
                {/*<textarea name="description" value={initData.description} rows="20" onChange={changeHandler} ref={textAreaRef} />*/}
                <Editor editorState={initData.description} onChange={changeDesc}   toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"/>
                <button onClick={submitHandler}>Edit post</button>
            </form>
            <p>Insert an uploaded image:</p>
            <div key="images" className="rowDiv">
                <>
                    {
                        imageLinks.map(image => {
                            return (
                                <div className="removeDiv" key={image}>
                                    <img onClick={() => onImageClicked("/getImage?pathname=" + image)} className="prev-img" src={"/getImage?pathname=" + image} alt=""/>
                                    <button onClick={(e) => removeImage(image, e)}>Remove Image</button>
                                </div>
                            )
                        })
                    }
                </>
            </div>
        </div>

    )
}

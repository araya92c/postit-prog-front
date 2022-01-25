import react, { useState, useRef, useEffect } from "react";
import reactDom from "react-dom";
import { Fragment } from "react/cjs/react.production.min";
import {v4 as uuid} from 'uuid';

const key = "postit-key";

export function ListaPost() {
    const [post, setPost] = useState([]);
    const titleRef = useRef();
    const descRef = useRef();
    const impRef = useRef();

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem(key));
        if(storedPosts)
            setPost(storedPosts);
    }, [])
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(post));
    }, [post])

    const agregarPostit = () => {
        const title = titleRef.current.value
        const desc = descRef.current.value
        let importante = []

        if(document.getElementById("importante").checked){
            importante = "postit-importante";
        }
        else{
            importante = "postit-normal";
        }

        console.log(importante);

        setPost((prevPosts) => {
            const newPost = {
                id: uuid(),
                title: title,
                desc: desc,
                importante: importante
            }
            return [...prevPosts, newPost]
        })
    }
    const PostIt = () => {
        return (
            post.map((post) => (
            <div className={'postit me-5 mb-5 ' + post.importante} id="postit" key={post.id}>
                {console.log(post.id)}
                <span onClick={eliminarPost} className="cerrar">X</span>
                <h2>{post.title}</h2>
                <p>{post.desc}</p>
            </div>
        )));
    }
    const eliminarPost = () => {
        const newPost = post.filter((post) => !post.id);
        setPost(newPost);
    }
    return (
        <Fragment>
            <div className="row g-3 mb-5">
                <div className="col-auto">
                    <input className="form-control" type="text" ref={titleRef} placeholder="Título" />
                </div>
                <div className="col-auto">
                    <input className="form-control" type="text" ref={descRef} placeholder="Descripción" />
                </div>
                <div className="col-auto">
                    <input type="checkbox" id="importante" ref={impRef} />
                    <label htmlFor="checkbox">Importante</label>
                </div>
                <div className="col-auto">
                    <button className="btn btn-success" onClick={agregarPostit}>Agregar</button>
                </div>  
            </div>
            <PostIt />
        </Fragment>
    )
}
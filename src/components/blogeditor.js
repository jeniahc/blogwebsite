import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import EditorContext from "../pages/editor";
import EditorJS from "@editorjs/editorjs";
import { tools } from "../components/tools";
import AnimationWrapper from "../common/pageanimation";

const BlogEditor = () => {

    let { blog, blog: { title, banner, content, tags, description }, setBlog } =
    useContext(EditorContext)

    useEffect(() => {
        let editor = new EditorJS({
            holderId: "textEditor",
            data:'',
            tools: tools,
            placeholder: "What's on your mind today?...",
        })
    }, [])


    return (
        <>
        <nav className="blogNavbar">

            <p className="">
                New Story
            </p>
        

        <div className=" ">
            <button>
                Publush
            </button>
            <button>
                Save Draft
            </button>
        </div>
        
    </nav>
    <AnimationWrapper>
    <section>
        <div id="textEditor" className=" "></div>
    </section>
    </AnimationWrapper>

    </>
)}
    


export default BlogEditor;
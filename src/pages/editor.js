import { createContext , useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import BlogEditor from "../components/blogeditor";
import PublishForm from "../components/publishform";
import { UserContext } from "../App";

const blogStructure = {
    title: " ",
    banner: " ",
    content: [ ],
    tags: [ ],
    description: " ",
    author: { personal_info: { }}
}

export const EditorContext = createContext({ });

const Editor = () => {

    const [ blog, setBlog ] = useState("blogStructure");
    const [ editorState, setEditorState ] = useState("editor");

    let { userAuth: { access_token } } = useContext(UserContext)

    return (
        <EditorContext.Provider value= {{ blog, setBlog, editorState, setEditorState }}>
        {
        access_token === null ? <Navigate to="/signin" />
        : editorState === "editor" ? <BlogEditor /> : <PublishForm />
        }
        </EditorContext.Provider>
    )
}

export default Editor;



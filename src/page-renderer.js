import React from "react";
import useResolvedPath from "react-router-dom";

const generatePath = path => {
    const component = () => require(`./pages/${path}`).default

    try {
        return React.createElement(component())
    } catch (err) {
        console.warn(err)
        return React.createElement(() => 404)
    }
}

export default function PageRenderer () {
    const path = useResolvedPath("./pages").pathname;

    return generatePath(path)
};
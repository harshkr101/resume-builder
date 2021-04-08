import React from 'react'

const Template = (props) => {
    props.resume.title = Math.random().toString(36).substring(2, 7);
    props.resume.template = Math.random().toString(36).substring(2, 7);
    return (
        <h5>Choose Template</h5>
    )

}

export default Template;
import React from 'react';
import Template1 from './template1/Template1'
import Template2 from './template2/Template2'

const HiddenResume = (props) => {

    return (
        <React.Fragment>
            {props.id === 'template1' ? <Template1 /> : <div></div>}
            {props.id === 'template2' ? <Template2 /> : <div></div>}
        </React.Fragment>
    )

}

export default HiddenResume
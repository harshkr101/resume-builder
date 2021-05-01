import React from 'react';
import './template1.scss';

const Template1 = (props) => {



   
    return(
        <div className="container">

            <div className="main">
            
            <div className="resume col-12">

                <div className="top-content">
                        <div className="name">
                            <h1><strong>{resume.personal.firstName}</strong>  {resume.personal.lastName}</h1>
                        </div>

                        <div className="contact-details row-fluid ml-10">
                            <div className="span3">{resume.personal.website}</div>
                            <div className="span3"> |</div>
                            <div className="span3">{resume.personal.email}</div>
                            <div className="span3">|</div>
                            <div className="span3">{resume.personal.phone}</div>
                        </div>

                </div>

                <div className="main-content col-12">

                    <div className="left-content col-6">
                            
                    </div>

                    <div className="right-content col-6">

                    </div>

                </div>



    




                
            </div>





            </div>

            


        </div>
    )
}

export default Template1;
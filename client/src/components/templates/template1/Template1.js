import React from 'react';
import './template1.scss';
import { connect } from 'react-redux';

const Template1 = ({ resume }) => {

    console.log(resume)

    return (
        <div className="container">

            <div className="main">

                <div className="resume col-12">

                    <div className="top-content">
                        <div className="name">
                            <h1><strong>{resume.personal.firstName}</strong>  {resume.personal.lastName}</h1>
                        </div>

                        <div className="contact-details row-fluid ">
                            <div className="span3">{resume.personal.website}</div>
                            <div className="span3"> |</div>
                            <div className="span3">{resume.personal.email}</div>
                            <div className="span3">|</div>
                            <div className="span3">{resume.personal.phone}</div>
                        </div>

                    </div>

                    <hr></hr>

                    {/* main content Starts */}

                    <div className="main-content row">

                        {/* left half starts */}

                        <div className="left-content col-sm">

                            <div className="education content">

                                <div className=" heading">
                                    <h2>EDUCATION</h2>
                                </div>

                                <div className="info">

                                    {resume.education.map((education, index) => (
                                        <div className="details">

                                            <p key={index}>{education.degree}</p>
                                            <p key={index}>{education.university}</p>
                                            <p key={index} className="inline">{education.startDate} - </p>
                                            <p key={index} className="inline">{education.endDate}</p>
                                            <p key={index}>GPA: {education.gpa}</p>


                                        </div>
                                    ))}

                                </div>
                            </div>


                            <div className="skills content">

                                <div className=" heading">
                                    <h2>SKILLS</h2>
                                </div>

                                <div className="info">

                                    {resume.skills.map((skill, index) => (
                                        <div className="details">

                                            <p key={index} className="sub-heading">{skill.skillName}</p>

                                            <div>
                                                {skill.keywords.map((keyword, i) => (
                                                    <p key={`index_${i}`} className="inline">{(i ? ', ' : '') + keyword} </p>
                                                ))}
                                            </div>

                                            <br></br>

                                        </div>
                                    ))}

                                </div>
                            </div>

                            <div className="achivements content">

                                <div className="heading">
                                    <h2>ACHIVEMENTS</h2>
                                </div>

                                <div className="info">

                                    {resume.achivements.map((achivement, index) => (
                                        <div className="details">

                                            <p key={index} className="sub-heading">{achivement.title}</p>



                                            <div>

                                                <p key={index} className="inline">{achivement.organisation} - </p>
                                                <p key={index} className="inline">{achivement.date}</p>

                                                {achivement.description.map((description, i) => (
                                                    <p key={i}>{description}</p>
                                                ))}
                                            </div>

                                            <br></br>

                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>


                        {/* right half starts*/}

                        <div className="right-content col-sm">

                            <div className="experience content">

                                <div className=" heading">
                                    <h2>WORK EXPERIENCE</h2>
                                </div>

                                <div className="info">

                                    {resume.experience.map((experience, index) => (
                                        <div className="details">

                                            <p key={index} className="sub-heading">{experience.title}</p>
                                            <p key={index} className="inline">{experience.organisation}</p>
                                            <p key={index} className="inline">({experience.startDate}- </p>
                                            <p key={index} className="inline">{experience.endDate})</p>


                                            <div>
                                                {experience.description.map((description, i) => (
                                                    <p key={i}>{description}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            <div className="projects content">

                                <div className=" heading">
                                    <h2>PROJECTS</h2>
                                </div>

                                <div className="info">

                                    {resume.projects.map((project, index) => (
                                        <div className="details">

                                            <p key={index} className="sub-heading">{project.projectName}</p>



                                            <div>
                                                {project.keywords.map((keyword, i) => (
                                                    <p key={i} className="inline">{keyword} </p>
                                                ))}
                                            </div>
                                            <br></br>


                                            <div>
                                                {project.projectDescription.map((description, i) => (
                                                    <p key={i}>{description}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>



                        </div>



                    </div>









                </div>





            </div>




        </div>
    )
}

const mapStateToProps = state => {
    return {
        resume: state.resume.data
    }
}

export default connect(mapStateToProps)(Template1);
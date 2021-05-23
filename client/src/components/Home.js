import React from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchData, setData } from '../redux/actionCreators';

import "./stylesheets/home.scss";


const Home = (props) => {
   
    const history = useHistory();

    const [title, setTitle] = React.useState('');

   

    React.useEffect(() => {
        if (props.token) {
            props.fetchData(props.token, function () {
                //history.push("/builder")
            })
        }
    }, [])

    const handleChange = (event) => {
        setTitle(event.target.value);
        props.setData(event.target.value, function () {
            history.push("/builder")
        })
    };

    const handleClick = () => {
        props.setData(-1, function () {
            history.push("/builder")
        })
    };

    const publicURL = process.env.PUBLIC_URL; 

    return (
        
            <div className="container-fluid">

                <div className="main">

                <section className="top row" >
                         <div className="col-5 left">
                             <div className=" heading-content align-middle">
                                <span className="main-heading">Build your resume today</span>
                                <br></br>
                                <span className="main-subheading">Build a resume tailored to your needs</span>
                            </div>
                            <br></br>
                            <div>
                                <button className="btn  btn-lg" onClick={handleClick}>BUILD RESUME</button>
                            </div>
                         </div>

                         <div className="col-7 right ">
                             <img  src={publicURL+"/assets/resume.png"}   alt=" resume"/>
                         </div>
                </section>

                <section className="start ">
                    
                    <div className="start-heading ">
                        <span >How to Start?</span>
                    </div>

                   

                    <div className="content row align-content-center">

                        <div className="card-wrapper first col-md">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Fill the form</h5>
                                <p className="card-text">Fill out your details in six easy steps</p>

                            </div>
                        </div>
                        </div>

                        <div className="card-wrapper col-md">

                        <div className="card">
                           
                            <div className="card-body">
                                <h5 className="card-title">Choose template</h5>
                                <p className="card-text">Choose a template from multiple provided templates</p>

                            </div>
                        </div>

                        </div>

                        <div className="card-wrapper col-md">
                        <div className="card col-md">
                           
                            <div className="card-body">
                                <h5 className="card-title">Download Resume</h5>
                                <p className="card-text">That's it! Now you can download your resume in pdf form</p>

                            </div>
                        </div>
                        </div>

                    </div>
                </section>
                </div>

              

            </div>
    )

}

const mapStateToProps = state => {
    return {
        token: state.resume.token,
        data: state.resume.data
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: (props, callback) => { dispatch(fetchData(props, callback)) },
    setData: (props, callback) => { dispatch(setData(props, callback)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
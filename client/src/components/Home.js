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

            <div className="container  m-0 col-12">
                <div className="top m-0 row" >
                         <div className="col-4  left">
                             <div>
                                <h1>Build your resume today</h1>
                                <br/>
                                <h4>Build a resume tailored to your needs</h4>
                            </div>
                            <br></br>
                            <div>
                                <button className="btn btn-primary btn-lg" onClick={handleClick}>BUILD RESUME</button>
                            </div>
                         </div>

                         <div className="col-8 right">
                             <img  src={publicURL+"/assets/tailored.jpg"}  alt="tailored resume"/>

                         </div>

                       
                </div>

                <div className="">

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
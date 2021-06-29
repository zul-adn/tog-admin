import React from 'react';
import './style/style2.css';
import { connect } from "react-redux";
import {
    getAllDatas,
    createName
} from './../store/app/action';

import Login from './pages/login';
import List from './pages/list';

import Bg from './assets/img/girl.png';
import Logo from './assets/img/logo.png';

function Rootapp({ datas, getAllDatas, isLogin }) {

    React.useEffect(() => {
        getAllDatas()
    }, [])

    return (
        <div className="container">
            {/* <div className="logo">
                <img src={Logo} />
            </div> */}
            <div className="bg">
                <img src={Bg} />
            </div>
            {isLogin? <List /> : <Login />}
            {/* main here */}
        </div>
    )
}

const mapStateToProps = ({ app }) => {
    return {
        datas: app.datas,
        isLogin: app.isLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllDatas: () => dispatch(getAllDatas()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rootapp);

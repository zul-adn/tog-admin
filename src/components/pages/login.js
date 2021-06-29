import React from 'react';
import { connect } from "react-redux";

function Login() {
    return (
        <div className="main">
            <div className="header">
                Login Administrator
                </div>
            <div className="login-container">
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <button>Login</button>
            </div>
        </div>
    )
}

const mapStateToProps = ({ app }) => {
    return {
        datas: app.datas,
    }
}

const mapDispatchToProps = dispatch => {
    return {
       
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


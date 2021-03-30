import React, { Component } from "react";
import url from "../Url";
import { Link } from "react-router-dom";

import { faTable } from "@fortawesome/free-solid-svg-icons";
import "./box.css";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logConf: false,
    };
    this.user = {};
  }

  hideLogMessage() {
    this.setState({ logConf: false });
  }

  readValue(event, keyName) {
    this.user[keyName] = event.target.value;
  }

  loginUser() {
    fetch(url.BASE_URL + url.LOGIN_URL, {
      method: "POST",
      body: JSON.stringify(this.user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((message) => {
        if (message.code === 0) {
          this.setState({ logConf: true });
        } else {
          localStorage.setItem("authToken", message.token);
          localStorage.setItem("authStatus", "true");
          localStorage.setItem("userID", message.user._id);
          localStorage.setItem("userName", message.user.username);

          this.props.history.replace("/index");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    return (
      <div className="boss">
        <div className="childboss" style={{textAlign:"center"}}>
          <br></br>
          <hr></hr>
        <img src={Image} alt="" width="800px" height="450px" style={{marginLeft:"20px"}}/>
        <hr></hr>
        </div>
        <div className="childboss" style={{padding:"40px",textAlign:"center"}}>
          <br></br>
          <hr></hr>
        <h1 >Pic Share</h1>
      <div
        className="container card"
        style={{ marginTop: "30px",textAlign:'-moz-initial', padding: "20px" }} 
      >
        
        <h2 className="in-title">Login</h2>

        {this.state.logConf === true ? (
          <div
            style={{ marginTop: "20px" }}
            className="alert alert-danger"
            onClick={() => {
              this.hidelogMessage();
            }}
          >
            Wrong username or password
          </div>
        ) : null}

        <div style={{ marginTop: "10px" }}>
          <div className="form-group"></div>
          <div className="form-group">
            <input
              type="email"
              onKeyUp={(event) => {
                this.readValue(event, "email");
              }}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onKeyUp={(event) => {
                this.readValue(event, "password");
              }}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="form-group col-12 row">
            <button
              className="btn btn-primary"
              onClick={() => {
                this.loginUser();
              }}
              style={{marginLeft:'60px'}}
            >
              Login
            </button>
            <Link to="/register" className="nav-link">
              <p style={{ color: "blue" }}>Do Not Have a Account?|| Register Now</p>
            </Link>
          </div>
        </div>
        </div>
        <hr></hr>
      </div>
      </div>
    );
  }
}

export default Login;

import React from "react";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    this.props.history.push("/login");
  }

  componentWillMount() {
    if (!localStorage.getItem("user_email")) {
      if (!localStorage.getItem("user_name")) {
        this.props.history.push("login");
      }
    }
  }

  render() {
    const userName = localStorage.getItem("user_name");

    return (
      <div className="container">
        <button onClick={this.logout} className="btn btn-link">
          Logout
        </button>
        <span>
         {userName}
        </span>
        <div style={{backgroundColor: "gray"}}>
            <span 
          style={{
            textAlign: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate('-50%', '-50%')"
          }}
        >
          open Sesame
        </span>
        </div>
      </div>
    );
  }
}

export default Dashboard;

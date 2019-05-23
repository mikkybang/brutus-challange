import React from "react";
import { Route, Switch } from "react-router-dom"
//Components import
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"
import Dashboard from "./Components/Dashboard/Dashboard"
class Routes extends React.Component {
    render(){
        return(
            <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path ="/dashboard" component={Dashboard} />
    
            </Switch>
        )
    }



}
export default Routes
import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            type: '',
            password: '',
            password_confirm: '',
            errors: {},
            user: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.registerUser = this.registerUser.bind(this)
    }

    handleInputChange(e) {
        // this.registerUser()
        this.setState({
            [e.target.name]: e.target.value
            
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            errors: {}
        }
        this.registerUser(user);
        console.log(user);
    }

    registerUser(user) {
        if (this.state.password_confirm === this.state.password){
            axios.post("/register", user).then(
                res => {
                    localStorage.setItem('user_email', res.data.email);
                    localStorage.setItem('user_name', res.data.name);
                    this.props.history.push('/dashboard');
                } 
            ).catch(err => {
                console.log(err)
            })
        }
    }
    componentWillMount(){
        if(this.state.user){
            this.props.history.push('/dashboard');
        }
    }

    render() {
        const { errors } = this.state
        return (
            <div className="container" style={{ marginTop: '50px', width: '700px' }}>
                <h2 style={{ marginBottom: '40px' }}>BRUTUS CHALLENGE</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                        {errors.param && (<div className="invalid-feedback">{errors.msg}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control"
                            name="email"
                            onChange={this.handleInputChange}
                            value={this.state.email}
                        />
                        {errors.param && (<div className="invalid-feedback">{errors.msg}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            name="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                        {errors.param && (<div className="invalid-feedback">{errors.msg}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-control"
                            name="password_confirm"
                            onChange={this.handleInputChange}
                            value={this.state.password_confirm}
                        />
                         {errors.param && (<div className="invalid-feedback">{errors.msg}</div>)}
                    </div>
                    <div className="btn-group btn-group-lg">
                    <div>
                    <Link to="/login">
                        <button  className="btn btn-success btn-lg">I Have an Account</button>
                   </Link>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg" style={{marginLeft: "300px"}}>
                            Validate
                    </button>
                    </div>
                    </div>
                </form>
            </div>
        )
    }
}



export default Register
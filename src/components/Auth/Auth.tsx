import React, { Component } from 'react'
import Login from './Login'
import logo  from '../../assests/ellieyan.svg'
import './Front.css'
import Register from './Register';
import  {Link, BrowserRouter as Router} from 'react-router-dom';

type AuthProps = {
    updateToken: (newToken: string) => void
    updateIsAdmin: (newRole: string) => void
}

interface AuthState {
    login: boolean
    setLogin: boolean
    username: string
    email: string
    password: string
}

export default class Auth extends Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {
            login: true,
            setLogin: false,
            username: '',
            email: '',
            password: '',
        }
    }

    Authorization = () => {
        return this.state.login ? (
            <Login
            updateToken={this.props.updateToken}
            updateIsAdmin={this.props.updateIsAdmin}
            />
        ) : (
            <Register updateToken={this.props.updateToken} />
        )
    }

    loginToggle = () => {
        this.setState({
            login: !this.state.login,
            username: '',
            email: '',
            password: '',
        })
    }

    render() {
        return(
            <div>
                <div>
                    <img className='logo' src={logo} alt='logo'/>
                    <h2 className='subTitle'>The social media platform for gamers</h2>
                </div>
                <div>
                    {this.Authorization()}
                    {this.state.login ? (
                        <Router>
                            <Link className='loginLink' to='' onClick={this.loginToggle}>Register an account!</Link>
                        </Router>
                       
                    ) : (
                        <Router>
                             <Link className='loginLink' to='' onClick={this.loginToggle}>Login!</Link>
                        </Router>
                       
                    )}
                </div>
            </div>
        )
    }

}
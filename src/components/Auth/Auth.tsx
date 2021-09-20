import React, { Component } from 'react'
import Login from './Login'
import Register from './Register';
import  {Link} from 'react-router-dom';

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
                    <h1>Welcome to ELLIEYAN</h1>
                    <h3>The social media platform for gamers</h3>
                </div>
                <div>
                    {this.Authorization()}
                    {this.state.login ? (
                        <Link to='' onClick={this.loginToggle}>Register an account!</Link>
                    ) : (
                        <Link to='' onClick={this.loginToggle}>Login!</Link>
                    )}
                </div>
            </div>
        )
    }

}
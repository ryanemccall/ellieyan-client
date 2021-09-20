import React, { Component } from "react";

type AuthProps = {
    updateToken: (newToken: string) => void
    updateIsAdmin: (newRole: string) => void
}

export interface LoginState {
    username: string
    password: string
    Role: string
}

export default class Login extends Component<AuthProps, LoginState>{
    constructor(props: AuthProps) {
        super(props)
        this.state = {
            username: '',
            password: '',
            Role: '',
        }
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
        .then(res => res.json())
        .then(data => {
            this.props.updateToken(data.sessionToken)
            this.props.updateIsAdmin(data.user.Role)
        })
        .catch(err => console.log(err))
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({ [name]: value } as Pick<LoginState, keyof LoginState>)
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='username'>
                            <input 
                            id='username'
                            required
                            type='username'
                            placeholder='Username'
                            name='username'
                            onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='password'>
                            <input
                            id='password'
                            required
                            type='password'
                            placeholder='Password'
                            pattern='^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$'
                            title='Password must be at least 5 characters, and contain at least 1 uppercase character, a lowercase character, a number, and a special character.'
                            minLength={8}
                            maxLength={20}
                            name='password'
                            onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        )
    }
}
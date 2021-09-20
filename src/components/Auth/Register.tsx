import React, { Component } from "react";

type RegisterProps = {
    updateToken: (newToken: string, Role: string) => void
}

interface RegisterState {
    username: string
    email: string
    password: string
    Role: string
}

export default class Register extends Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            Role: '',
        }
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        fetch('http://localhost:3000/user/register', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
        .then(res => res.json())
        .then(data => {
            this.props.updateToken(data.sessionToken, this.state.Role)
        })
        }

        handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
            const target = e.target
            const value = target.value
            const name = target.name
            this.setState({ [name]: value } as Pick<RegisterState, keyof RegisterState>)
        }

        render() {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor='username'>
                                <input
                                    id='username'
                                    required
                                    type='text'
                                    placeholder='Enter a Username'
                                    minLength={7}
                                    maxLength={25}
                                    value={this.state.username}
                                    name='username'
                                    onChange={this.handleChange}
                                    />
                            </label>
                        </div>
                        <div>
                            <label htmlFor='email'>
                                <input
                                id='email'
                                required
                                pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
                                type='text'
                                placeholder='Enter your email'
                                value={this.state.email}
                                name='email'
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
                        <button type='submit'>Register Now!</button>
                    </form>
                </div>
            )
        }
    }

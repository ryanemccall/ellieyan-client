import React, { Component } from "react";
//import Profile from '../User/Profile';

type acceptedProps = {
    token: string
}

export default class Home extends Component<acceptedProps, {}> {
    constructor(props: acceptedProps){
        super(props)
    }

    render() {
        return (
            <div>
                <h1> This is HOME </h1>
                {/* <Profile token={this.props.token} /> */}
            </div>
        )
    }
}
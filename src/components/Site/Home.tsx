import React, { Component } from "react";
import Logo from '../../assests/ellieyan.svg';
//import Profile from '../User/Profile';

type acceptedProps = {
    token: string
}

type HomeState = {
    profile: Array<object>
}

export default class Home extends Component<acceptedProps, HomeState> {
    constructor(props: acceptedProps){
        super(props)
        this.state={
            profile: []
        }
    }
    
    getProfile = async () => {
        if (this.props.token) {
            try {
                const myProfile = await fetch(`http://localhost:3000/profile/`, {
                    method: "GET",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.props.children}`
                    }),
                })
                const data = await myProfile.json()
                this.setState({profile: data})
            } catch (err) {
                console.log(err)
            }
        }
    }

    render() {
        return (
            <div className='container mx-auto px-6 content-center py-20'>
                <img className='w-30 mx-auto-mb-1 content-center' src={Logo} alt='logo'/>
                <h1 className='header'> Welcome to ELLIEYAN! </h1>
                <p className='subHeader'>Share your thoughts with others gamers, talk about your favorite characters, favorite games, least favorite games, and have discussion with fellow gamers about what you love most.</p>
                <button className='profileBtn'>Create your Profile</button>
                <button className='myFeed'>See my Posts</button>
                <button className='Feed'>See Community</button>
                {/* <Profile token={this.props.token} /> */}
            </div>
        )
    }
}
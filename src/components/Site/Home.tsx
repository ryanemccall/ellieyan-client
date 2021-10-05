import React, { Component } from "react";
import Logo from '../../assests/ellieyan.svg';
import APIURL from '../../helpers/enviroment'
import './site.css'
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
                const myProfile = await fetch(`${APIURL}/profile/`, {
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
            <div className='container mx-auto'>
                <img id='homeLogo' src={Logo} alt='logo'/>
                <h1 className='antialiased tracking-wide font-medium leading-10'> Welcome to ELLIEYAN! </h1>
                <br />
                <p className='subpixel-antialiased tracking-tight font-light leading-snug'>Share your thoughts with others gamers, talk about your favorite characters, favorite games, least favorite games, and have discussion with fellow gamers about what you love most.</p>
                <br />
                <button className='bg-green-500 hover:bg-green-400 border-b-4 border-green-700 hover:border-green-500 text-white text-center py-2 px-4 rounded mx-4'>Create your Profile </button>
                <button className='bg-green-500 hover:bg-green-400 border-b-4 border-green-700 hover:border-green-500 text-white text-center py-2 px-4 rounded mx-4'> See my Posts </button>
                <button className='bg-green-500 hover:bg-green-400 border-b-4 border-green-700 hover:border-green-500 text-white text-center py-2 px-4 rounded mx-4'> See Community </button>
                {/* <Profile token={this.props.token} /> */}
            </div>
        )
    }
}
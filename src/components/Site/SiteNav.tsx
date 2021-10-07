import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    NavbarBrand,
} from 'reactstrap';
import Logo from '../../assests/ellieyan.svg';
import './site.css'

type acceptedProps = {
    token: string
    logout: () => void
    Role: string
}

type toggleState = { 
    isOpen: boolean
}

export default class Sitebar extends Component<acceptedProps, toggleState> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            isOpen: false,
        }
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen })

    logoutBtn = () => {
        return localStorage.getItem('sessionToken') === null ? (
            ''
        ) : (
            <Link to='/'>
                <button id='logoutBtn' onClick={this.props.logout}>Logout</button>
            </Link>            
        )
    }

    adminNavPanel = () => {
        return this.props.Role === 'admin' ? (
            <button>Admin Dashboard</button>
        ) : (
            <></>
        )
    }

    render() {
        return (
            <div>
                <Navbar color='dark' dark expand='md'>
                    <NavbarBrand>
                        <Link to='/'>
                            <img id='navLogo'src={Logo} alt='logo' height='28px' width='28px' />
                        </Link>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='mr-auto' navbar>
                            <NavItem>
                                <NavLink>
                                        <Link id='navLink' to='/'>
                                        Home
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <Link id='navLink' to='/post'>
                                        myFeed
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <Link id='navLink' to='/favorites'>
                                        myGames
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <Link id='navLink' to='/admin'>
                                        {this.adminNavPanel()}
                                    </Link>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText>{this.logoutBtn()}</NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}
import React, { Component } from "react";
import { Link, BrowserRouter as Router } from 'react-router-dom';
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
            <Router>
                <Link to='/'>
                <button id='logoutBtn' onClick={this.props.logout}>Logout</button>
            </Link>
            </Router>
            
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
                        <Router>
                        <Link to='/'>
                            <img id='navLogo'src={Logo} alt='logo' height='28px' width='28px' />
                        </Link>
                        </Router>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='mr-auto' navbar>
                            <NavItem>
                                <NavLink>
                                   <Router>
                                        <Link id='navLink' to='/'>
                                        Home
                                    </Link>
                                    </Router>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <Router>
                                    <Link id='navLink' to='/post'>
                                        myFeed
                                    </Link>
                                    </Router>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <Router>
                                    <Link id='navLink' to='/favorites'>
                                        myGames
                                    </Link>
                                    </Router>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <Router>
                                    <Link id='navLink' to='/admin'>
                                        {this.adminNavPanel()}
                                    </Link>
                                    </Router>
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
import React, { Component } from "react";
import { Table, Button, Container } from "reactstrap";

type acceptedProps = {
    token: string
}

interface AdminState  {
    allUsers: Array<object>
}

export default class AdminView extends Component<acceptedProps, AdminState> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            allUsers: [],
        }
    }

    private fetchAllUsers = async () => {
        if (this.props.token) {
            try {
                await fetch('http://localhost:3000/user/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.props.token}`,
                    },
                })
                .then((res) => res.json())
                .then((body) => this.setState({allUsers: body }))
            } catch (err) {
                console.log(err)
            }
        } 
    }
    public get fetchUsers() {
        return this.fetchAllUsers
    }
    public set fetchUsers(value) {
        this.fetchAllUsers = value
    }

    deleteUsers(user: any){
        try{ 
            fetch(`http://localhost:3000/user/${user.id}`, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`,
            }),
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    } catch (err) {
        console.log(err)
    }
}

    render() {
        return (
            <div>
                <Container>
                    <div>
                        <Table>
                            <h1>All Users Table</h1>
                            <tbody>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Delete User</th>
                                </tr>
                                {this.state.allUsers.length > 0 ? this.state.allUsers.map((user: any) => {
                                    return <tr>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.Role}</td>
                                        <td>
                                            <Button onClick={() => this.deleteUsers(user)}>Delete User</Button>
                                        </td>
                                    </tr>
                                }): this.fetchUsers()}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        )
    }
}
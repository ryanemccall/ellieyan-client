import React, { Component } from 'react';
import APIURL from '../../../helpers/enviroment'

type acceptedProps = {
    token: string 
    getPost: () => Promise<any>
    getAllPost: () => Promise<any>
}

export interface CommentState {
    comment: Array<object>
    content: string
    PostId: number
}

export default class CreateComment extends Component<acceptedProps, CommentState> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            comment: [],
            content: '',
            PostId: 0,
        }
    }

    newComment = async (postId: number) => {
        try {
            const comment = await fetch(`${APIURL}/comment/post/${postId}`, {
                method: 'POST',
                body: JSON.stringify({
                    comment: {
                        content: this.state.content,
                    }
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.props.token}`,
                }),
            })
            await comment.json()
            
            this.setState({
                content: '',
            }) //Makes comment box blank again
            this.props.getPost() //This calls the post feed to show new post(and others)
        } catch (err) {
            console.log(err)
        }
    }

    getComments  = async (postId: number) => {
        try {
            const comments = await fetch(`${APIURL}/comment/all/post/${postId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.props.token}`,
                }),
            })
            const res = await comments.json()
            this.setState({ comment: res })
            return res
        } catch (err) {
            console.log(err)
        }
    }

    updateComment = async (id: number, userId: number, postId: number) => {
        try {
            const newComment = await fetch(`${APIURL}/comment/post/${postId}/user/${userId}/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    comment: {
                        content: this.state.content,
                    }
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.props.token}`,
                }),
            })
            await newComment.json()
            
            this.setState({
                content: '',
            }) //Makes comment box blank again
            this.props.getPost() //This calls the post feed to show new post(and others)
        } catch (err) {
            console.log(err)
        }
    }

    render(){
        return (
            <></>
        )
    }
}
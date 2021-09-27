import React, { Component } from 'react';

type acceptedProps = {
    token: string 
    getPost: () => Promise<any>
}

export interface PostState {
    post: Array<object>
    postTitle: string
    content: string
}

export default class CreatePost extends Component<acceptedProps, PostState> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            post: [],
            postTitle: '',
            content: '',
        }
    }

    newPost = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        try {
            const post = await fetch(`http://localhost:3000/post/`, {
                method: 'POST',
                body: JSON.stringify({
                    post: {
                        postTitle: this.state.postTitle,
                        content: this.state.content,
                    }
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.props.token}`,
                }),
            })
            await post.json()
            
            this.setState({
                postTitle: '',
                content: '',
            }) //This will make the Post form blank again after submission
            this.props.getPost() //This calls the post feed to show new post(and others)
        } catch (err) {
            console.log(err)
        }
    }
    //Need a handle change for inputs
    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState(({ [name]: value } as unknown) as Pick<PostState, keyof PostState>)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.newPost}>
                    <div>
                        <label htmlFor='postTitle'>
                            <input
                            id='postTitle'
                            type='text'
                            value={this.state.postTitle}
                            name='postTitle'
                            placeholder='What is on your mind?'
                            onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='content'>
                            <input
                            id='content'
                            type='text'
                            value={this.state.content}
                            name='content'
                            placeholder='What do you think about this game?'
                            onChange={e => this.setState({ content: e.target.value })}
                            />
                        </label>
                    </div>
                    <button
                    type='submit'
                    >Post</button>
                </form>
            </div>
        )
    }
}
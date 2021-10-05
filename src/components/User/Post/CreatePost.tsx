import React, { Component } from 'react';
import APIURL from '../../../helpers/enviroment'

type acceptedProps = {
    token: string 
    getPost: () => Promise<any>
    getAllPost: () => Promise<any>
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
            const post = await fetch(`${APIURL}/post/`, {
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
            <div className='bg-green-200 bg-opacity-70 max-w-xl mx-auto p-7 md: p-10 rounded-lg shadow w-full'>
                <form className='space-y-4'onSubmit={this.newPost}>
                    <div>
                        <label htmlFor='postTitle'>
                           Title: <input
                            id='postTitle'
                            type='text'
                            className='w-full p-2 mb-6 text-blue-900 border-b-2 border-indigo-500 outline-none focus:bg-gray-300 rounded'
                            value={this.state.postTitle}
                            name='postTitle'
                            placeholder='title of game'
                            onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='content'>
                            Blog: <input
                            id='content'
                            type='text'
                            className='w-full p-2 mb-6 text-blue-900 border-b-2 border-indigo-500 outline-none focus:bg-gray-300 rounded'
                            value={this.state.content}
                            name='content'
                            placeholder="What's on your mind?"
                            onChange={e => this.setState({ content: e.target.value })}
                            />
                        </label>
                    </div>
                    <button
                    className='bg-green-500 hover:bg-green-400 border-b-4 border-green-700 hover:border-green-500 text-white text-center py-2 px-4 rounded mx-4'
                    type='submit'
                    >Post</button>
                </form>
            </div>
        )
    }
}
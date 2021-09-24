import React, { Component } from 'react';
import { PostState } from './CreatePost';

type acceptedProps = {
    token: string
    postFeed: Array<object>
    getPost: () => Promise<any>
    PostEdit: (post: string) => void
    updateOn: () => void
}

interface FeedState extends PostState {
    id: number
}

export default class PostFeedMap extends Component<acceptedProps, FeedState> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            id: Infinity,
            post: [],
            postTitle: '',
            content: '',
        }
    }

    deletePost = async (post: any) => {
        try{
            fetch(`http://localhost:3000/post/delete/${post.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer {this.props.token}`
                })
            })
            return this.props.getPost()
        } catch (err) {
            console.log(err)
        }
    
    }

    render() {
        return(
            <div>
                {this.props.postFeed.length > 0 ? (
                    <>
                    {this.props.postFeed.map((post: any, index: number) => {
                        return (
                            <div
                            key={index}
                            >
                                <p>{post.posTitle}</p>
                                <p>{post.content}
                                <div>
                                    <button onClick={() => {
                                        this.props.PostEdit(post)
                                        this.props.updateOn()
                                    }}
                                    >Edit/Remove
                                    </button>
                                </div>
                                </p>
                            </div>
                        )
                    })}
                    </>
                ) : (
                    <>
                        <h2>Share your thoughts about games!</h2>
                    </>
                )}
            </div>
        )
    }
}


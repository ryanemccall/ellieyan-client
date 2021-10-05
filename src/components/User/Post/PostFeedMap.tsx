import React, { Component } from 'react';
import { PostState } from './CreatePost';
import './post.css'
//import APIURL from '../../../helpers/enviroment'

type acceptedProps = {
    token: string
    postFeed: Array<object>
    commentFeed: Array<object>
    getPost: () => Promise<any>
    getAllPost: () => Promise<any>
    PostEdit: (post: string) => void
    PostComment: (comment: string) => void
    updateOn: () => void
}

interface FeedState extends PostState {
    id: number
    comment: string
}

export default class PostFeedMap extends Component<acceptedProps, FeedState> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            id: Infinity,
            post: [],
            comment: '',
            postTitle: '',
            content: '',
        }
    }
    //DELETE BUTTON ISNT WORKING IN THE UPDATE MIGHT JUST NEED TO ADDED IT HERE AS ITS OWN BUTTON
    render() {
        return(
            <div className='flex justify-center mt-8'>
                {this.props.postFeed.length > 0 ? (
                    <>
                    {this.props.postFeed.map((post: any, index: number) => {
                        return (
                            <div
                            key={index}
                            >
                                <p>{post.postTitle}</p>
                                <p>{post.content}
                                <div>
                                    <button onClick={() => {
                                        this.props.PostEdit(post)
                                        this.props.updateOn()
                                    }}
                                    >Edit
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
                {this.props.commentFeed.length > 0 ? (
                    <>
                     {this.props.commentFeed.map((comment: any, index: number) => {
                        return (
                            <div
                            key={index}
                            >
                                <p>{comment.user}</p>
                                <p>{comment.content}
                                <div>
                                    <button onClick={() => {
                                        this.props.PostComment(comment)
                                        //this.props.updateOn()
                                    }}
                                    >comment
                                    </button>
                                </div>
                                </p>
                            </div>
                        )
                    })}
                    </>
                ) : (
                    <></>
                )}
            </div>
        )
    }
}


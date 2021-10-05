import React, { Component } from 'react';
import { PostState } from './CreatePost';
import './post.css'
import { Card, CardBody, CardTitle, CardText, CardFooter} from 'reactstrap';
import APIURL from '../../../helpers/enviroment'

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
    deletePost = async (post: any) => {
        //id = post.id might work
        try{
            fetch(`${APIURL}/post/delete/${post.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.props.token}`
                })
            })
            return this.props.getPost()
        } catch (err) {
            console.log(err)
        }
    
    }
    //DELETE BUTTON ISNT WORKING IN THE UPDATE MIGHT JUST NEED TO ADD IT HERE AS ITS OWN BUTTON
    render() {
        return(
            <div className='container mx-auto px-4 justify-self-center'>
                {this.props.postFeed.length > 0 ? (
                    <>
                    {this.props.postFeed.map((post: any, index: number) => {
                        return (
                            <div 
                            className='container mx-auto'
                            key={index}
                            >
                               <Card id='postCards'>
                                   <CardBody>
                                       <CardTitle>
                                       <h3 id='postTitle' className='display-3'>{post.postTitle}</h3>
                                       </CardTitle>
                                       <CardText>
                                       <p id='content' className='lead'>{post.content} </p>
                                       </CardText>
                                   </CardBody>
                                   <CardFooter>
                                   <button
                                    className='bg-green-700 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-full'
                                    onClick={() => {
                                        this.props.PostEdit(post)
                                        this.props.updateOn()
                                    }}
                                    >Edit
                                    </button>
                                    <button
                                    className='bg-red-700 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-full'
                                    onClick={() => {
                                        this.deletePost(post)
                                    }}
                                    >
                                    Remove
                                    </button>
                                   </CardFooter>
                               </Card>
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


import React, { Component } from 'react';
import CreatePost from './CreatePost';
import PostFeedMap from './PostFeedMap';
import UpdatePost from './UpdatePost';

type acceptedProps = {
    token: string
}

interface PostIndexState {
    postFeed: Array<object>
    updatePost: { [key: string]: string}
    updateOn: boolean
    isOpen: boolean
}

export default class PostIndex extends Component<acceptedProps, PostIndexState> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            postFeed: [],
            updateOn: false,
            updatePost: {},
            isOpen: true
        }
    }

    getPost = async () => {
        if (this.props.token) {
            try {
                const feed = await fetch(`http://localhost:3000/post/myPosts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.props.token}`,
                    }
                })
               const res = await feed.json()
               this.setState({ postFeed: res })
               return res
            } catch (err) {
                console.log(err)
            }
        }
    }
    componentDidMount = () => {
        this.getPost()
    }
    
    componentDidUpdate(prev: acceptedProps) {
        if (prev.token !== this.props.token) {
          this.getPost()
        }
      }

      PostEdit = (post: any) => {
          this.setState({ updatePost: post})
      }

      updateOn = () => {
          this.setState({ updateOn: true })
      }

      updateOff = () => {
          this.setState({ updateOn: false })
      }
    
    render() {
        return (
            <div>
                <CreatePost token={this.props.token} getPost={this.getPost} />
                <PostFeedMap
                token={this.props.token}
                postFeed={this.state.postFeed}
                getPost={this.getPost}
                PostEdit={this.PostEdit}
                updateOn={this.updateOn}
                />
                {this.state.updateOn ? (
                <UpdatePost
                token={this.props.token}
                getPost={this.getPost}
                PostEdit={this.state.updatePost}
                updateOff={this.updateOff}
                isOpen={this.state.isOpen}
                />
            ): (
                <></>
            )}
            </div>
            
        )
    }
}
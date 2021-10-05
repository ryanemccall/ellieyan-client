import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'
import { PostState } from './CreatePost'
import './post.css'
import APIURL from '../../../helpers/enviroment'

type acceptedProps = {
    token: string
    updateOff: () => void
    getPost: () => Promise<any>
    getAllPost: () => Promise<any>
    deletePost: (post: any) => Promise<any>
    PostEdit: { [key: string]: any }
    isOpen: boolean
}

export interface PostEditState extends PostState {
    ModalOpen: boolean
}

export default class UpdatePost extends Component<acceptedProps, PostEditState> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            post: [],
            postTitle: this.props.PostEdit.postTitle,
            content: this.props.PostEdit.content,
            ModalOpen: true
        }
    }

    editPost = async (id: number) => {
        try {
            const updatedPost = await fetch(`${APIURL}/post/${this.props.PostEdit.id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.props.token}`,
                }),
                body: JSON.stringify({
                    post: {
                        postTitle: this.state.postTitle,
                        content: this.state.content,
                    }
                })
            })
            await updatedPost.json()
            this.props.getPost()
        } catch (err) {
            console.log(err)
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState(({ [name]: value } as unknown) as Pick<PostEditState, keyof PostEditState>)
    }

    toggle = () => {
        this.setState({ ModalOpen: false })
        this.props.updateOff()
    }

    render() {
        return (
            <div>
                <Modal id='Modal' isOpen={this.state.ModalOpen} toggle={this.toggle}>
                    <ModalHeader id='modalHeader' toggle={this.toggle}>Update your thoughts</ModalHeader>
                    <ModalBody id='modalBody'>
                        <div>
                            <label htmlFor='postTitle'>
                                <input
                                id='modalTitle'
                                className='border py-2 px-3 text-grey-darkest md:mr-2'
                                type='text'
                                value={this.state.postTitle}
                                placeholder='Title'
                                onChange={e => this.setState({ postTitle: e.target.value })}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor='content'>
                                <input
                                id='modalContent'
                                className='border py-2 px-3 text-grey-darkest md:mr-2'
                                type='text'
                                value={this.state.content}
                                placeholder="What's on your mind, gamer?"
                                onChange={e => this.setState({ content: e.target.value })}
                                />
                            </label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button 
                        className='bg-green-700 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-full'
                        onClick={(id: any) => {
                            this.editPost(id)
                            this.toggle()
                        }}>
                            Update
                        </button>
                        {/* <button onClick={(post: any) => {
                            this.props.deletePost(post)
                            this.toggle()
                        }}>Remove Post</button> */}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
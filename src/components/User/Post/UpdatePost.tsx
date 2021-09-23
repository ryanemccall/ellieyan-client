import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'
import { PostState } from './CreatePost'

type acceptedProps = {
    token: string
    updateOff: () => void
    getPost: () => Promise<any>
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
            postTitle: '',
            content: '',
            ModalOpen: true
        }
    }

    editPost = async (id: number) => {
        try {
            const updatedPost = await fetch(`http://localhost:3000/post/${this.props.PostEdit.id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.props.token}`,
                }),
                body: JSON.stringify({
                    postTitle: this.props.PostEdit.postTitle,
                    content: this.props.PostEdit.content,
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
                <Modal isOpen={this.state.ModalOpen} toggle={this.toggle}>
                    <ModalHeader toggle= {this.toggle}>Update your thoughts</ModalHeader>
                    <ModalBody>
                        <div>
                            <label htmlFor='postTitle'>
                                <input
                                id='postTitle'
                                type='text'
                                value={this.state.postTitle}
                                placeholder='Title'
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
                                placeholder="What's on your mind, gamer?"
                                onChange={e => this.setState({ content: e.target.value })}
                                />
                            </label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button 
                        onClick={(id: any) => {
                            this.editPost(id)
                            this.toggle()
                        }}>
                            Update
                        </button>
                        <button
                        onClick={this.toggle}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
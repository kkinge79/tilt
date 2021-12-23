import React, {useState} from 'react'
import '../../styles/Card.css'

import PostActions from './PostActions'
import {updatePost} from '../../services/postService'



const PostCard = (props) => {
  const [edit, setEdit]= useState(false)
  const [thread, setThread]= useState('')
  const formData = {
    thread: thread
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  const updatedPost = await updatePost(props.post._id, formData)
  props.setPosts(props.posts.map((post) => (
    post._id === props.post._id ? updatedPost : post
  )))
  setEdit(false)
}
console.log(props.user)

  return (
    !edit ? 
    <div className="post-card">
      <div className="post-container">
        <p className='usertext'>
          {props.post.thread}
        </p>
      </div>
    </div>
    : 
    <div className="post-card">
      <div className="card-header">
        <PostActions 
          {...props}
          edit={edit}
          setEdit={setEdit}
        />
        <form onSubmit={handleSubmit}>
        <textarea
        type="text"
        name="thread"
        value={thread}
        onChange={(e) => setThread(e.target.value)}
        />
        <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default PostCard
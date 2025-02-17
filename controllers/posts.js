import { Profile } from '../models/profile.js'
import { Post } from '../models/post.js'

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const post = await new Post(req.body)
    console.log("HELLOOOO",req.body)
    await post.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { posts: post } }
    )
    return res.status(201).json(post)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('author')
      .sort({ createdAt: 'desc' })
    return res.status(200).json(posts)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    
      .populate('author')
    return res.status(200).json(post)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    return res.status(200).json(updatedPost)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.posts.remove({ _id: req.params.id })
    await profile.save()
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json(err)
  }
}


export {
  create,
  index,
	show,
  update,
  deletePost as delete,
}
const express = require("express");

const Post = require("../models/Post.js");
const mongoose = require("mongoose");

const getAllPosts = async (req, res) => {
  const user_id = req.user._id;
  try {
    const posts = await Post.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Post does not exist" });
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post does not exist" });
    res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};
const createPost = async (req, res) => {
  const { date, title, content } = req.body;
  const user_id = req.user._id;

  try {
    const post = await Post.create({ date, title, content, user_id });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Post does not exist" });
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "post does not exist" });
    const deletePost = await Post.findOneAndDelete({ _id: id });
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Post does not exist" });
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "post does not exist" });
    const updatePost = await Post.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { getAllPosts, getPost, createPost, deletePost, updatePost };

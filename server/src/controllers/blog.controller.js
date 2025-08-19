import { Blog } from '../models/Blog.js';

export async function listBlogs(req, res) {
  const { category, q } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (q) filter.title = new RegExp(q, 'i');
  const items = await Blog.find(filter).sort({ createdAt: -1 });
  res.json(items);
}

export async function createBlog(req, res) {
  const created = await Blog.create({ ...req.body, authorId: req.user.id });
  res.status(201).json(created);
}

export async function updateBlog(req, res) {
  const item = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
}

export async function likeBlog(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Not found' });
  const idx = blog.likes.findIndex((id) => id.toString() === req.user.id);
  if (idx >= 0) blog.likes.splice(idx, 1);
  else blog.likes.push(req.user.id);
  await blog.save();
  res.json(blog);
}

export async function commentBlog(req, res) {
  const { content } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Not found' });
  blog.comments.push({ userId: req.user.id, content });
  await blog.save();
  res.json(blog);
}


// pages/api/posts.js
import { getAllPosts } from '@/lib/posts';

export default function handler(req, res) {
  const { page = 1 } = req.query;
  const postsPerPage = 9;
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const start = (page - 1) * postsPerPage;
  const posts = allPosts.slice(start, start + postsPerPage);

  res.status(200).json({ posts, totalPages });
}

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BlogPost from '@/components/BlogPost';
import BlogLayout from '@/components/blog';

const postsPerPage = 6;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async (page) => {
      const res = await fetch(`/api/posts?page=${page}`);
      const data = await res.json();
      console.log("Fetched posts for page:", page);
      console.log("Posts:", data.posts);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    };

    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`/blog?page=${page}`, undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>Name Ma Pet Blog</title>
        <meta name="description" content="A modern blog built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BlogLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <div className="rainbow-mesh-gradient max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:text-white">
            
            <section className="text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Welcome to Our Blog
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover stories, thinking, and expertise from writers on any topic.
              </p>
            </section>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogPost key={post.slug} post={post} />
              ))}
            </div>

            <div className="flex justify-center items-center flex-wrap mt-8 space-x-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 mx-1 my-1 ${
                    currentPage === i + 1 ? 'bg-orange-600 text-white' : 'bg-gray-200'
                  } rounded hover:bg-orange-400 transition duration-300`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </BlogLayout>
    </>
  );
}

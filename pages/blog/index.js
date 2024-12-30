import Head from 'next/head'
import BlogPost from '@/components/BlogPost'
import { posts } from '@/lib/blog'
import Navbar from '../../components/Navbar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Name Ma Pet Blog</title>
        <meta name="description" content="A modern blog built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
<Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <BlogPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
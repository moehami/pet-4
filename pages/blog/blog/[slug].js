import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { posts } from '@/lib/blog'
import { formatDate } from '@/lib/utils/date'

export default function BlogPost({ post }) {
  if (!post) return null

  return (
    <>
      <Head>
        <title>{post.title} - Name Ma Pet Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-muted-foreground">
            <time>{formatDate(post.date)}</time>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
          {/* Add more content here */}
{post.body}
        </div>
      </article>
    </>
  )
}

export function getStaticPaths() {
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const post = posts.find((post) => post.slug === params.slug)
  return {
    props: { post },
  }
}

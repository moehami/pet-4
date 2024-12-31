import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils/date'
import BlogLayout from '@/components/blog';

export default function BlogPost({ post }) {
  if (!post) return null

  if (typeof window !== 'undefined') { 
    const allH2Elements = document.querySelectorAll('h2');
    allH2Elements.forEach((h2) => {
 
      h2.style.fontSize = '1.5rem';
      h2.style.fontWeight = 'bold'; 
    });
  }
  return (
    <>
      <Head>
        <title>{post.title} - Name Ma Pet Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>
<BlogLayout>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 dark:text-white">
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

        <div 
          className="prose dark:prose-invert max-w-none font-light" 
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      </article>
      </BlogLayout>
    </>
  )
}

export async function getStaticPaths() {
  const posts = getAllPosts()
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  return {
    props: { post },
  }
}
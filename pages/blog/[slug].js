import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils/date'
import BlogLayout from '@/components/blog';
import { useEffect } from 'react';


export default function BlogPost({ post }) {
  if (!post) return null

  useEffect(() => {
    // Apply styles to h2, h3, and h4 elements
    const headings = ['h2', 'h3', 'h4', 'ul', 'li'];
    headings.forEach((tag) => {
      const elements = document.querySelectorAll(tag);
      elements.forEach((element) => {
        if (tag === 'h2') {
          element.classList.add('text-2xl', 'font-bold'); // Tailwind classes for h2
        } else if (tag === 'h3') {
          element.classList.add('text-xl', 'font-semibold'); // Tailwind classes for h3
        } else if (tag === 'h4') {
          element.classList.add('text-lg', 'font-medium'); // Tailwind classes for h4
        }
        else if (tag === 'ul') {
          element.classList.add('list-disc', 'list-inside'); // Tailwind classes for ul
        }
        else if (tag === 'li') {
          element.classList.add('items-center', 'space-x-2', 'mb-4'); // Tailwind classes for li
        }
        else if (tag === 'ol') {
          element.classList.add('list-decimal', 'list-inside', 'space-y-1', 'mb-2'); // Tailwind classes for li
        }
        
        
      });
    });
  }, []);
  return (
    <>
      <Head>
        <title>{post.title} - Name Ma Pet Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>
<BlogLayout>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 dark:text-white">
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
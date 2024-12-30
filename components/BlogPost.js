import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { formatDate } from '@/lib/utils/date'

export default function BlogPost({ post }) {
  return (
    <article className="group relative bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/blog/${post.slug}`} className="block p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <time>{formatDate(post.date)}</time>
          <span>•</span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {post.readTime}
          </span>
        </div>
        <h2 className="text-x2 font-semibold mb-6 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="mb-6 font-light text-xl">
          {post.excerpt}
        </p>
      </Link>
    </article>
  )
}
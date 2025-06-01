import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';

export default function Blog({ posts }) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-primary-light">Blog</h1>
      
      {posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.id} className="border-b border-dark-border pb-6">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/blog/${post.id}`} className="text-primary-light hover:text-primary-hover transition-colors">
                  {post.title}
                </Link>
              </h2>
              <div className="text-text-muted mb-2">
                {new Date(post.date).toLocaleDateString()}
                {post.tags && (
                  <span className="ml-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="inline-block bg-dark-lighter rounded-full px-3 py-1 text-sm font-semibold text-primary-light mr-2">
                        #{tag}
                      </span>
                    ))}
                  </span>
                )}
              </div>
              <p className="text-text-secondary">{post.excerpt}</p>
              <Link href={`/blog/${post.id}`} className="mt-2 inline-block text-primary-light hover:text-primary-hover transition-colors">
                Read more
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts
    }
  };
}

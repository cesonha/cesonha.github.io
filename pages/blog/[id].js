import ReactMarkdown from 'react-markdown';
import { getPostById, getPostIds } from '../../lib/posts';

export default function Post({ post }) {
  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-red-400">{post.title}</h1>
        <div className="text-gray-400">
          {new Date(post.date).toLocaleDateString()}
          {post.tags && (
            <span className="ml-4">
              {post.tags.map(tag => (
                <span key={tag} className="inline-block bg-dark-lighter rounded-full px-3 py-1 text-sm font-semibold text-red-400 mr-2">
                  #{tag}
                </span>
              ))}
            </span>
          )}
        </div>
      </header>
      
      <div className="prose lg:prose-xl max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}

export async function getStaticPaths() {
  const paths = getPostIds();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = getPostById(params.id);
  return {
    props: {
      post
    }
  };
}


import { BLOG_POSTS } from '../constants';

const Blog = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-16 text-center">
        <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Beyond the Data</h2>
        <h1 className="serif-title text-4xl text-slate-900">Personal Blog & Interests</h1>
        <p className="mt-4 text-slate-500 max-w-lg mx-auto">
          Life isn't just about spreadsheets. Here's a glimpse into the person behind the analyst.
        </p>
      </div>

      <div className="space-y-24">
        {BLOG_POSTS.map(post => (
          <article key={post.id} className="group">
            {post.mediaUrl && (
              <div className="mb-6 overflow-hidden rounded-2xl shadow-lg aspect-video">
                {post.mediaType === 'image' ? (
                  <img
                    src={post.mediaUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-full object-cover"
                  >
                    <source src={post.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
            <div className="max-w-2xl mx-auto">
              <span className="text-sm font-medium text-slate-400 block mb-2">{post.date}</span>
              <h2 className="serif-title text-2xl mb-4 text-slate-900">{post.title}</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;

import { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { getBlogPosts } from '../utils/blogStorage';
import AnimatedSection from '../components/AnimatedSection';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getBlogPosts());
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <AnimatedSection>
        <div className="mb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-2">Beyond the Data</h2>
          <h1 className="serif-title text-4xl text-stone-900">The Person Behind the Analyst</h1>
        </div>
        <p className="mt-4 text-stone-500 max-w-lg mx-auto text-center mb-16">
          Life isn't just about spreadsheets. Here's a glimpse into the things that keep me balanced, curious, and grounded.
        </p>
      </AnimatedSection>

      <div className="space-y-10">
        {posts.map((post, i) => (
          <AnimatedSection key={post.id} delay={0.12 * i}>
            <article className="group bg-white rounded-2xl border border-stone-200/60 overflow-hidden hover:shadow-lg hover:border-amber-200/60 transition-all duration-300">
              {post.mediaUrl && (
                <div className="overflow-hidden aspect-video">
                  {post.mediaType === 'image' ? (
                    <img
                      src={post.mediaUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <video controls className="w-full h-full object-cover">
                      <source src={post.mediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
              <div className="p-8">
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">{post.date}</span>
                <h2 className="serif-title text-2xl mt-4 mb-4 text-stone-900 group-hover:text-amber-700 transition-colors duration-200">{post.title}</h2>
                <p className="text-stone-600 leading-relaxed whitespace-pre-line">{post.content}</p>
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Blog;

import { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { generateBlogId } from '../utils/blogStorage';

interface BlogFormProps {
  post?: BlogPost | null;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const BlogForm = ({ post, onSave, onCancel }: BlogFormProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | ''>('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDate(post.date);
      setContent(post.content);
      setMediaType(post.mediaType || '');
      setMediaUrl(post.mediaUrl || '');
    } else {
      // Default date to current month/year
      const now = new Date();
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      setDate(`${monthNames[now.getMonth()]} ${now.getFullYear()}`);
    }
  }, [post]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!date.trim()) {
      newErrors.date = 'Date is required';
    }
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (mediaType && !mediaUrl.trim()) {
      newErrors.mediaUrl = 'Media URL is required when media type is selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const blogPost: BlogPost = {
      id: post?.id || generateBlogId(),
      title: title.trim(),
      date: date.trim(),
      content: content.trim(),
      ...(mediaType && mediaUrl && {
        mediaType: mediaType as 'image' | 'video',
        mediaUrl: mediaUrl.trim(),
      }),
    };

    onSave(blogPost);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">
            {post ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-slate-200'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g., Jan 2025"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.date ? 'border-red-300' : 'border-slate-200'
              }`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${
                errors.content ? 'border-red-300' : 'border-slate-200'
              }`}
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Media Type</label>
              <select
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value as 'image' | 'video' | '')}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="">None</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Media URL</label>
              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="/input/photo.jpg"
                disabled={!mediaType}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.mediaUrl ? 'border-red-300' : 'border-slate-200'
                } ${!mediaType ? 'bg-slate-50 text-slate-400' : ''}`}
              />
              {errors.mediaUrl && <p className="text-red-500 text-sm mt-1">{errors.mediaUrl}</p>}
            </div>
          </div>

          {mediaType && mediaUrl && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Preview</label>
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                {mediaType === 'image' ? (
                  <img
                    src={mediaUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23f1f5f9" width="100" height="100"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="12">Image not found</text></svg>';
                    }}
                  />
                ) : (
                  <video
                    src={mediaUrl}
                    className="w-full h-48 object-cover"
                    controls
                  />
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Upload files to /public/input/ folder and use path like /input/filename.jpg
              </p>
            </div>
          )}
        </form>

        <div className="flex justify-end gap-3 p-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
          >
            {post ? 'Save Changes' : 'Create Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;

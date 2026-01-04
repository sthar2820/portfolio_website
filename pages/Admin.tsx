import { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from '../utils/blogStorage';
import BlogForm from '../components/BlogForm';

interface AnalyticsData {
  pageViews: { page: string; views: number }[];
  resumeStats: { opens: number; downloads: number };
  projectViews: { title: string; views: number }[];
  externalClicks: { type: string; clicks: number }[];
  totalVisitors: number;
  lastUpdated: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<'7' | '30' | '90'>('30');

  // Blog management state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, use proper auth
    // Set your admin password here
    const ADMIN_PASSWORD = 'rohan2024';

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics?days=${dateRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        // Use mock data if API not available
        setAnalytics(getMockData());
      }
    } catch {
      // Use mock data if API fails
      setAnalytics(getMockData());
    }
    setLoading(false);
  };

  const getMockData = (): AnalyticsData => ({
    pageViews: [
      { page: 'Home', views: 0 },
      { page: 'Projects', views: 0 },
      { page: 'Experience', views: 0 },
      { page: 'Blog', views: 0 },
    ],
    resumeStats: { opens: 0, downloads: 0 },
    projectViews: [
      { title: 'Automated Analytics Data Pipeline', views: 0 },
      { title: 'Hospital Readmissions Risk Pipeline', views: 0 },
      { title: 'ML Stock Prediction Dashboard', views: 0 },
    ],
    externalClicks: [
      { type: 'LinkedIn', clicks: 0 },
      { type: 'GitHub', clicks: 0 },
      { type: 'Email', clicks: 0 },
      { type: 'Live Demo', clicks: 0 },
    ],
    totalVisitors: 0,
    lastUpdated: new Date().toISOString(),
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
      setBlogPosts(getBlogPosts());
    }
  }, [isAuthenticated, dateRange]);

  // Blog handlers
  const handleSaveBlog = (post: BlogPost) => {
    saveBlogPost(post);
    setBlogPosts(getBlogPosts());
    setShowBlogForm(false);
    setEditingPost(null);
  };

  const handleDeleteBlog = (id: string) => {
    deleteBlogPost(id);
    setBlogPosts(getBlogPosts());
    setDeleteConfirm(null);
  };

  const handleEditBlog = (post: BlogPost) => {
    setEditingPost(post);
    setShowBlogForm(true);
  };

  const handleNewBlog = () => {
    setEditingPost(null);
    setShowBlogForm(true);
  };

  const handleCancelBlogForm = () => {
    setShowBlogForm(false);
    setEditingPost(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-6 py-20">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm mb-6">Enter password to access analytics</p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Last updated: {analytics?.lastUpdated ? new Date(analytics.lastUpdated).toLocaleString() : 'Loading...'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as '7' | '30' | '90')}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-all disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-slate-500 hover:text-slate-700 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white">
          <p className="text-indigo-100 text-sm font-medium">Total Visitors</p>
          <p className="text-4xl font-bold mt-2">{analytics?.totalVisitors ?? '-'}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-slate-500 text-sm font-medium">Resume Opens</p>
          <p className="text-4xl font-bold text-slate-900 mt-2">{analytics?.resumeStats.opens ?? '-'}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-slate-500 text-sm font-medium">Resume Downloads</p>
          <p className="text-4xl font-bold text-slate-900 mt-2">{analytics?.resumeStats.downloads ?? '-'}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-slate-500 text-sm font-medium">Download Rate</p>
          <p className="text-4xl font-bold text-slate-900 mt-2">
            {analytics?.resumeStats.opens
              ? `${Math.round((analytics.resumeStats.downloads / analytics.resumeStats.opens) * 100)}%`
              : '-'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Page Views */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Page Views</h2>
          <div className="space-y-4">
            {analytics?.pageViews.map((page) => (
              <div key={page.page} className="flex items-center justify-between">
                <span className="text-slate-600">{page.page}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${analytics.pageViews.length > 0
                          ? (page.views / Math.max(...analytics.pageViews.map(p => p.views), 1)) * 100
                          : 0}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-900 w-12 text-right">{page.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Views */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Project Views</h2>
          <div className="space-y-4">
            {analytics?.projectViews.map((project) => (
              <div key={project.title} className="flex items-center justify-between">
                <span className="text-slate-600 text-sm truncate max-w-[200px]">{project.title}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${analytics.projectViews.length > 0
                          ? (project.views / Math.max(...analytics.projectViews.map(p => p.views), 1)) * 100
                          : 0}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-900 w-12 text-right">{project.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* External Link Clicks */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">External Link Clicks</h2>
          <div className="space-y-4">
            {analytics?.externalClicks.map((link) => (
              <div key={link.type} className="flex items-center justify-between">
                <span className="text-slate-600">{link.type}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${analytics.externalClicks.length > 0
                          ? (link.clicks / Math.max(...analytics.externalClicks.map(l => l.clicks), 1)) * 100
                          : 0}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-900 w-12 text-right">{link.clicks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Journey Funnel */}
        <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">User Journey Funnel</h2>
          <div className="space-y-3">
            {(() => {
              const totalPageViews = analytics?.pageViews.reduce((sum, p) => sum + p.views, 0) || 0;
              const resumeOpens = analytics?.resumeStats.opens || 0;
              const resumeDownloads = analytics?.resumeStats.downloads || 0;
              const totalClicks = analytics?.externalClicks.reduce((sum, c) => sum + c.clicks, 0) || 0;
              const maxValue = Math.max(analytics?.totalVisitors || 0, totalPageViews, 1);

              const funnelSteps = [
                { label: 'Visitors', value: analytics?.totalVisitors || 0, color: 'bg-indigo-500' },
                { label: 'Page Views', value: totalPageViews, color: 'bg-blue-500' },
                { label: 'Resume Opens', value: resumeOpens, color: 'bg-green-500' },
                { label: 'Resume Downloads', value: resumeDownloads, color: 'bg-emerald-500' },
                { label: 'External Clicks', value: totalClicks, color: 'bg-amber-500' },
              ];

              return funnelSteps.map((step, index) => (
                <div key={step.label} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-600">{step.label}</span>
                    <span className="text-sm font-semibold text-slate-900">{step.value}</span>
                  </div>
                  <div
                    className="h-8 bg-slate-100 rounded-lg overflow-hidden"
                    style={{
                      marginLeft: `${index * 8}%`,
                      marginRight: `${index * 8}%`
                    }}
                  >
                    <div
                      className={`h-full ${step.color} rounded-lg transition-all duration-500`}
                      style={{ width: `${maxValue > 0 ? (step.value / maxValue) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ));
            })()}
          </div>
          <div className="mt-6 pt-4 border-t border-indigo-100">
            <a
              href="https://analytics.google.com/analytics/web/#/p476498908/reports/dashboard?params=_u..nav%3Dmaui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-all"
            >
              View detailed analytics in Google Analytics
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Blog Management Section */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Blog Management</h2>
            <p className="text-slate-500 text-sm mt-1">Create, edit, and delete blog posts</p>
          </div>
          <button
            onClick={handleNewBlog}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </button>
        </div>

        <div className="space-y-4">
          {blogPosts.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
              <p className="text-slate-500">No blog posts yet. Create your first post!</p>
            </div>
          ) : (
            blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between hover:border-slate-300 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    {post.mediaUrl && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        {post.mediaType === 'image' ? (
                          <img src={post.mediaUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">{post.title}</h3>
                      <p className="text-sm text-slate-500">{post.date}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEditBlog(post)}
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  >
                    Edit
                  </button>
                  {deleteConfirm === post.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteBlog(post.id)}
                        className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(post.id)}
                      className="px-3 py-1.5 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Blog Form Modal */}
      {showBlogForm && (
        <BlogForm
          post={editingPost}
          onSave={handleSaveBlog}
          onCancel={handleCancelBlogForm}
        />
      )}
    </div>
  );
};

export default Admin;

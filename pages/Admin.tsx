import { useState, useEffect } from 'react';

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
    }
  }, [isAuthenticated, dateRange]);

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

        {/* Setup Instructions */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Setup Required</h2>
          <div className="text-sm text-slate-600 space-y-3">
            <p>To see real analytics data:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Create a GA4 property at <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">analytics.google.com</a></li>
              <li>Get your Measurement ID (G-XXXXXXXXXX)</li>
              <li>Update <code className="bg-slate-200 px-1 rounded">index.html</code> and <code className="bg-slate-200 px-1 rounded">utils/analytics.ts</code></li>
              <li>Set up the Vercel serverless function with GA4 API credentials</li>
            </ol>
            <p className="text-slate-500 mt-4">Currently showing placeholder data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

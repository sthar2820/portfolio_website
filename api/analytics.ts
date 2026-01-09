// Vercel Serverless Function for GA4 Data API
// This requires setting up Google Analytics Data API credentials

import type { VercelRequest, VercelResponse } from '@vercel/node';

// To use this function, you need to:
// 1. Enable Google Analytics Data API in Google Cloud Console
// 2. Create a service account and download the JSON key
// 3. Add the service account email to your GA4 property (Viewer role)
// 4. Set the following environment variables in Vercel:
//    - GA4_PROPERTY_ID: Your GA4 property ID (e.g., "123456789")
//    - GOOGLE_SERVICE_ACCOUNT_EMAIL: Service account email
//    - GOOGLE_PRIVATE_KEY: Private key from the JSON file (with \n for newlines)

interface AnalyticsData {
  pageViews: { page: string; views: number }[];
  resumeStats: { opens: number; downloads: number };
  projectViews: { title: string; views: number }[];
  externalClicks: { type: string; clicks: number }[];
  totalVisitors: number;
  lastUpdated: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const days = parseInt(req.query.days as string) || 30;

  // Check if GA4 credentials are configured
  const propertyId = process.env.GA4_PROPERTY_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!propertyId || !serviceAccountEmail || !privateKey) {
    // Return mock data if not configured
    return res.status(200).json(getMockData());
  }

  try {
    // Get access token using service account
    const accessToken = await getAccessToken(serviceAccountEmail, privateKey);

    // Fetch analytics data from GA4
    const analyticsData = await fetchGA4Data(propertyId, accessToken, days);

    return res.status(200).json(analyticsData);
  } catch (error) {
    console.error('Analytics API error:', error);
    return res.status(200).json(getMockData());
  }
}

async function getAccessToken(email: string, privateKey: string): Promise<string> {
  const jwt = await createJWT(email, privateKey);

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

async function createJWT(email: string, privateKey: string): Promise<string> {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  // Sign with private key
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(privateKey),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    encoder.encode(signatureInput)
  );

  const encodedSignature = base64url(new Uint8Array(signature));
  return `${signatureInput}.${encodedSignature}`;
}

function base64url(input: string | Uint8Array): string {
  let base64: string;
  if (typeof input === 'string') {
    base64 = btoa(input);
  } else {
    base64 = btoa(String.fromCharCode(...input));
  }
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '');
  const binary = atob(b64);
  const buffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
}

async function fetchGA4Data(
  propertyId: string,
  accessToken: string,
  days: number
): Promise<AnalyticsData> {
  const startDate = `${days}daysAgo`;
  const endDate = 'today';

  // Fetch page views
  const pageViewsResponse = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }],
      }),
    }
  );
  const pageViewsData = await pageViewsResponse.json();

  // Fetch events (resume, project views, external clicks)
  const eventsResponse = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }],
      }),
    }
  );
  const eventsData = await eventsResponse.json();

  // Fetch total users
  const usersResponse = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: 'totalUsers' }],
      }),
    }
  );
  const usersData = await usersResponse.json();

  // Process the data
  return processGA4Data(pageViewsData, eventsData, usersData);
}

function processGA4Data(
  pageViewsData: { rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[] },
  eventsData: { rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[] },
  usersData: { rows?: { metricValues: { value: string }[] }[] }
): AnalyticsData {
  // Log raw data for debugging
  console.log('Raw pageViewsData rows:', JSON.stringify(pageViewsData.rows?.slice(0, 5)));
  console.log('Raw eventsData rows:', JSON.stringify(eventsData.rows?.slice(0, 10)));
  console.log('Raw usersData rows:', JSON.stringify(usersData.rows));

  // Process all page views and group by simplified page name
  const allPageViews = (pageViewsData.rows || []).map((row) => ({
    page: row.dimensionValues[0].value,
    views: parseInt(row.metricValues[0].value),
  }));

  // Map page titles to simplified names
  let homeViews = 0, projectsViews = 0, experienceViews = 0, blogViews = 0;

  for (const pv of allPageViews) {
    const title = pv.page.toLowerCase();
    if (title.includes('home') || title === 'rohan shrestha' || title === '/' || !title.includes('|')) {
      homeViews += pv.views;
    } else if (title.includes('project')) {
      projectsViews += pv.views;
    } else if (title.includes('experience')) {
      experienceViews += pv.views;
    } else if (title.includes('blog')) {
      blogViews += pv.views;
    }
  }

  const pageViews = [
    { page: 'Home', views: homeViews },
    { page: 'Projects', views: projectsViews },
    { page: 'Experience', views: experienceViews },
    { page: 'Blog', views: blogViews },
  ];

  // Process events
  const events = (eventsData.rows || []).reduce(
    (acc, row) => {
      acc[row.dimensionValues[0].value] = parseInt(row.metricValues[0].value);
      return acc;
    },
    {} as Record<string, number>
  );

  console.log('Processed events:', JSON.stringify(events));

  const resumeStats = {
    opens: events['resume_opened'] || 0,
    downloads: events['resume_downloaded'] || 0,
  };

  const projectViews = [
    { title: 'Automated Analytics Data Pipeline', views: events['project_viewed'] || 0 },
  ];

  // Check for external_link_click event with different naming conventions
  const externalClicks = [
    { type: 'LinkedIn', clicks: events['external_link_click_linkedin'] || events['linkedin'] || 0 },
    { type: 'GitHub', clicks: events['external_link_click_github'] || events['github'] || 0 },
    { type: 'Email', clicks: events['external_link_click_email'] || events['email'] || 0 },
    { type: 'Live Demo', clicks: events['external_link_click_live_demo'] || events['live_demo'] || 0 },
  ];

  const totalVisitors = usersData.rows?.[0]?.metricValues?.[0]?.value
    ? parseInt(usersData.rows[0].metricValues[0].value)
    : 0;

  console.log('Final processed data:', JSON.stringify({ pageViews, totalVisitors, resumeStats }));

  return {
    pageViews,
    resumeStats,
    projectViews,
    externalClicks,
    totalVisitors,
    lastUpdated: new Date().toISOString(),
  };
}

function getMockData(): AnalyticsData {
  return {
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
  };
}

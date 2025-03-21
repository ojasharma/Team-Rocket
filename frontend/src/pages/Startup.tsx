import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define types for our data structures
interface BlogPost {
  id: string;
  title: string;
  link: string;
  date: string;
  likes: number;
  comments: number;
}

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: string;
  blogPosts?: BlogPost[];
}

interface User {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  following: number;
  followers: number;
  startupName: string;
  startupTagline: string;
}

interface ViewData {
  date: string;
  views: number;
}

const Startup: React.FC = () => {
  // Mock data - in a real app, this would come from your API/backend
  const [user] = useState<User>({
    id: "1",
    name: "Ayush Kashyap",
    initials: "AK",
    avatarColor: "#6366f1",
    following: 45,
    followers: 102,
    startupName: "EcoTech Solutions",
    startupTagline: "Sustainable technology for a better tomorrow",
  });

  const [timelineEvents] = useState<TimelineEvent[]>([
    {
      id: "1",
      title: "The Idea",
      date: "January 2023",
      description:
        "It all started with a simple observation: we were wasting too much energy in our daily lives. I sketched the first concept of our energy-saving device on a napkin during lunch.",
      icon: "lightbulb",
      blogPosts: [
        {
          id: "b1",
          title: "How a Lunch Break Changed My Life",
          link: "#blog-post-1",
          date: "January 20, 2023",
          likes: 143,
          comments: 28,
        },
      ],
    },
    {
      id: "2",
      title: "Research & Development",
      date: "March 2023",
      description:
        "Spent three months researching existing solutions and developing prototypes. Many late nights and coffee-fueled brainstorming sessions.",
      icon: "beaker",
      blogPosts: [],
    },
    {
      id: "3",
      title: "Finding Co-founders",
      date: "June 2023",
      description:
        "Met Alex (CTO) at a tech conference and Jamie (COO) through a mutual connection. We immediately clicked and shared the same vision for sustainable technology.",
      icon: "users",
      blogPosts: [
        {
          id: "b2",
          title: "The Importance of Finding the Right Team",
          link: "#blog-post-2",
          date: "June 15, 2023",
          likes: 211,
          comments: 46,
        },
      ],
    },
    {
      id: "4",
      title: "First Prototype",
      date: "September 2023",
      description:
        "After countless iterations, we finally built a working prototype that reduced energy consumption by 30%. This was our first major breakthrough.",
      icon: "chip",
      blogPosts: [],
    },
    {
      id: "5",
      title: "Seed Funding",
      date: "December 2023",
      description:
        "Secured $500K in seed funding from GreenVentures Capital. This was a pivotal moment that allowed us to expand our team and improve our prototype.",
      icon: "banknotes",
      blogPosts: [
        {
          id: "b3",
          title: "Our Funding Journey: Lessons Learned",
          link: "#blog-post-3",
          date: "December 10, 2023",
          likes: 315,
          comments: 72,
        },
      ],
    },
    {
      id: "6",
      title: "Beta Launch",
      date: "March 2024",
      description:
        "Released our beta product to 100 test users. The feedback was overwhelmingly positive, with users reporting an average of 35% energy savings.",
      icon: "rocket",
      blogPosts: [],
    },
    {
      id: "7",
      title: "Series A Funding",
      date: "September 2024",
      description:
        "Raised $3M in Series A funding. This milestone has enabled us to scale our operations and prepare for a full market launch.",
      icon: "chart-bar",
      blogPosts: [
        {
          id: "b4",
          title: "From Seed to Series A: Our Growth Story",
          link: "#blog-post-4",
          date: "September 25, 2024",
          likes: 427,
          comments: 93,
        },
      ],
    },
  ]);

  const [viewsData] = useState<ViewData[]>([
    { date: "Oct 2023", views: 120 },
    { date: "Nov 2023", views: 250 },
    { date: "Dec 2023", views: 580 },
    { date: "Jan 2024", views: 680 },
    { date: "Feb 2024", views: 750 },
    { date: "Mar 2024", views: 1200 },
    { date: "Apr 2024", views: 1350 },
    { date: "May 2024", views: 1700 },
    { date: "Jun 2024", views: 2300 },
    { date: "Jul 2024", views: 2700 },
    { date: "Aug 2024", views: 3200 },
    { date: "Sep 2024", views: 4100 },
  ]);

  // Function to render timeline icons
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "lightbulb":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
        );
      case "beaker":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 1-.659 1.591L9.5 14.5m3.75-11.729V3.104c.251.023.501.05.75.082M15 6.117c.995.608 1.778 1.834 1.778 3.632v5.927m-2.211-5.095L15 14.5m4.5-11.732V8.75a.75.75 0 0 0 1.5 0V2.75a.75.75 0 0 0-1.5 0v.008m0 0c-1.299.022-2.437.128-3.25.31M6 14.5c-3.14.734-4.33 2.078-4.5 2.25m0 0A2.25 2.25 0 0 0 3.75 19.5h16.5a2.25 2.25 0 0 0 2.25-2.25c-.17-.172-1.36-1.516-4.5-2.25M2.25 17.25h19.5m-16.5 0h3m10.5 0h3M6.75 19.5h10.5a2.25 2.25 0 0 0 2.25-2.25M6.75 19.5a2.25 2.25 0 0 1-2.25-2.25m10.5 0a2.25 2.25 0 0 1 2.25 2.25m-10.5 0h10.5"
            />
          </svg>
        );
      case "users":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
        );
      case "chip":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
            />
          </svg>
        );
      case "banknotes":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
        );
      case "rocket":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
            />
          </svg>
        );
      case "chart-bar":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        );
    }
  };

  // Custom tooltip component for the line chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow rounded border border-gray-200">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-indigo-600">
            {payload[0].value.toLocaleString()} views
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* User Profile Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
          <div className="px-6 py-4 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="absolute -top-16 border-4 border-white rounded-full overflow-hidden">
                {/* User avatar with initials instead of image */}
                <div
                  className="w-32 h-32 flex items-center justify-center text-white text-3xl font-bold"
                  style={{ backgroundColor: user.avatarColor }}
                >
                  {user.initials}
                </div>
              </div>
              <div className="mt-16 md:mt-0 md:ml-36">
                <h1 className="text-3xl font-bold text-gray-800">
                  {user.name}
                </h1>
                <h2 className="text-xl font-semibold text-indigo-600 mt-1">
                  {user.startupName}
                </h2>
                <p className="text-gray-600 mt-1">{user.startupTagline}</p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-auto flex space-x-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {user.following}
                  </p>
                  <p className="text-gray-600">Following</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {user.followers}
                  </p>
                  <p className="text-gray-600">Followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Startup Timeline Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Startup Journey
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-indigo-200"></div>

            {timelineEvents.map((event, index) => (
              <div key={event.id} className="mb-8 relative">
                {/* Timeline dot */}
                <div className="absolute left-8 w-4 h-4 bg-indigo-500 rounded-full transform -translate-x-1/2 mt-2 z-10 shadow-md"></div>

                <div className="ml-16">
                  {/* Event header */}
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 mr-4">
                      {renderIcon(event.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>

                  {/* Event description */}
                  <div className="mt-3 text-gray-700">
                    <p>{event.description}</p>
                  </div>

                  {/* Blog posts related to this event */}
                  {event.blogPosts && event.blogPosts.length > 0 && (
                    <div className="mt-4">
                      {event.blogPosts.map((blog) => (
                        <div
                          key={blog.id}
                          className="bg-gray-50 rounded-lg p-4 mt-2 border border-gray-200"
                        >
                          <a
                            href={blog.link}
                            className="text-indigo-600 font-medium hover:underline"
                          >
                            {blog.title}
                          </a>
                          <p className="text-xs text-gray-500 mt-1">
                            {blog.date}
                          </p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <span className="flex items-center mr-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 mr-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                              </svg>
                              {blog.likes}
                            </span>
                            <span className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 mr-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                                />
                              </svg>
                              {blog.comments}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Statistics Line Graph Section with Explanation */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Page Views</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left side: Line Graph */}
            <div className="md:col-span-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={viewsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      tickFormatter={(value: any) =>
                        value === 0
                          ? "0"
                          : value >= 1000
                          ? `${(value / 1000).toFixed(0)}K`
                          : value
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#6366f1"
                      strokeWidth={3}
                      activeDot={{ r: 8 }}
                      dot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }}
                      name="Views"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right side: Explanation */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">
                Understanding the Graph
              </h3>

              <div className="space-y-4 text-sm">
                <p>
                  This chart tracks the number of views your startup profile
                  page has received over time.
                </p>

                <div className="flex items-center">
                  <div className="w-4 h-4 bg-indigo-500 mr-2"></div>
                  <p>The line represents your page views trend over time</p>
                </div>

                <p>
                  <strong>Key insights:</strong>
                </p>

                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Your page views have consistently increased month over month
                  </li>
                  <li>
                    Significant growth began in March 2024, coinciding with your
                    Beta Launch
                  </li>
                  <li>
                    Page views doubled after your Series A funding announcement
                  </li>
                  <li>
                    Current monthly views: <strong>4,100</strong> (September
                    2024)
                  </li>
                </ul>

                <p className="text-indigo-600">
                  <strong>Growth rate: </strong>
                  +34.1% monthly average
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Startup;

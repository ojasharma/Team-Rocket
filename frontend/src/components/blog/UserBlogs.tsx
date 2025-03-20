"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { PlusIcon, UserIcon } from "lucide-react";
import BlogCard, { BlogPost } from "./BlogCard";
import BlogPostEditor from "./BlogPost";
import { useToast } from "../../hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

// Sample user data - in a real app this would come from your auth system
const currentUser = {
  id: "user123",
  name: "John Doe",
  avatar: undefined,
  bio: "Entrepreneur | Investor | Tech Enthusiast",
  followers: 245,
  following: 123,
};

// Sample blog posts - in a real app this would come from your backend
const samplePosts: BlogPost[] = [
  {
    id: "post1",
    title: "Launching My New Startup",
    content:
      "I'm excited to announce that I've just launched my new startup focused on sustainability. After months of research and planning, we're finally ready to make a positive impact on the environment. Our mission is to reduce carbon emissions through innovative technology solutions. We're looking for passionate individuals to join our team and help us grow. If you're interested in sustainability and technology, please reach out to me.",
    authorId: currentUser.id,
    authorName: currentUser.name,
    authorAvatar: currentUser.avatar,
    createdAt: new Date(2023, 5, 12),
    likes: 24,
    comments: 5,
  },
  {
    id: "post2",
    title: "Why Networking is Crucial for Startups",
    content:
      "In the early stages of a startup, networking can be the difference between success and failure. I've learned that building relationships with other founders, investors, and industry experts provides valuable insights and opportunities. Here are my top tips for effective networking in the startup ecosystem: 1) Be authentic and focus on giving value, 2) Follow up consistently, 3) Attend industry-specific events, 4) Don't be afraid to ask for introductions, 5) Use social media strategically.",
    authorId: currentUser.id,
    authorName: currentUser.name,
    authorAvatar: currentUser.avatar,
    createdAt: new Date(2023, 4, 28),
    likes: 36,
    comments: 12,
  },
];

const UserBlogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>(samplePosts);
  const [isWriting, setIsWriting] = useState(false);
  const { toast } = useToast();

  const handleLike = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
    toast({
      title: "Post liked!",
      description: "Your like has been recorded.",
    });
  };

  const handleSavePost = (
    newPost: Omit<BlogPost, "id" | "createdAt" | "likes" | "comments">
  ) => {
    const post: BlogPost = {
      ...newPost,
      id: uuidv4(),
      createdAt: new Date(),
      likes: 0,
      comments: 0,
    };

    setPosts([post, ...posts]);
    setIsWriting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* User Profile Card - Moved to the left */}
        <div className="md:w-1/3">
          <Card className="shadow-md border-0 overflow-hidden bg-white">
            <CardHeader className="pb-2 bg-gray-50">
              <CardTitle className="text-xl font-bold text-gray-900">
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-5 pt-6">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 border-2 border-blue-100">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="rounded-full h-full w-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <div className="w-full text-center">
                <h2 className="text-xl font-bold mb-1 text-gray-900">
                  {currentUser.name}
                </h2>
                <p className="text-muted-foreground mb-4 text-gray-600">
                  {currentUser.bio}
                </p>
                <div className="flex justify-around py-3 border-t border-b border-gray-100">
                  <div className="text-center">
                    <span className="block text-lg font-semibold text-gray-900">
                      {currentUser.followers}
                    </span>
                    <span className="block text-sm text-gray-500">
                      Followers
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-semibold text-gray-900">
                      {currentUser.following}
                    </span>
                    <span className="block text-sm text-gray-500">
                      Following
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-semibold text-gray-900">
                      {posts.length}
                    </span>
                    <span className="block text-sm text-gray-500">Posts</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Write New Post Button - With hover effects */}
          {!isWriting && (
            <div className="mt-4">
              <Button
                onClick={() => setIsWriting(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Write New Post
              </Button>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="md:w-2/3">
          {/* New Post Editor */}
          {isWriting && (
            <div className="mb-8">
              <BlogPostEditor
                onSave={handleSavePost}
                onCancel={() => setIsWriting(false)}
                user={currentUser}
              />
            </div>
          )}

          {/* Blog Posts */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900 pb-2 border-b border-gray-200">
              My Posts
            </h3>
            {posts.length > 0 ? (
              posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={(id) => console.log("Comment on", id)}
                  onShare={(id) => console.log("Share", id)}
                  onView={(id) => console.log("View", id)}
                />
              ))
            ) : (
              <Card>
                <CardContent className="py-6 text-center text-muted-foreground">
                  You haven't written any posts yet. Click "Write New Post" to
                  get started.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBlogs;

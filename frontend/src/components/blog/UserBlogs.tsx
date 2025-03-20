"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { PlusIcon, UserIcon } from "lucide-react";
import BlogCard, { BlogPost } from "./BlogCard";
import BlogPostEditor from "./BlogPost";
import { useToast } from "../../hooks/use-toast";
import axios from "axios";

// API base URL - could move this to an environment variable
const API_URL = "http://localhost:5000/api";

const UserBlogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
    avatar: undefined,
    bio: "Entrepreneur | Investor | Tech Enthusiast", // You might want to add this to your user schema
    followers: 0,
    following: 0,
  });
  const { toast } = useToast();

  // Get auth token from localStorage
  const getToken = () => localStorage.getItem("token");

  // Config for authenticated requests
  const authConfig = () => ({
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": getToken(),
    },
  });

  // Fetch current user and their blogs when component mounts
  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      try {
        const token = getToken();
        if (!token) {
          toast({
            title: "Authentication Error",
            description: "Please log in to view your blogs",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // Fetch current user data
        const userRes = await axios.get(`${API_URL}/users/me`, authConfig());
        setCurrentUser({
          id: userRes.data.id,
          name: userRes.data.name,
          avatar: undefined, // Your API might provide this
          bio: "Entrepreneur | Investor | Tech Enthusiast", // Default or from API
          followers: 0, // These could come from your API if you track them
          following: 0,
        });

        // Fetch user's blogs
        const blogsRes = await axios.get(`${API_URL}/blogs`, authConfig());

        // Transform to match our BlogPost interface
        const formattedPosts: BlogPost[] = blogsRes.data
          .filter((blog: any) => blog.authorId === userRes.data.id)
          .map((blog: any) => ({
            id: blog.id,
            title: blog.title,
            content: blog.content,
            authorId: blog.authorId,
            authorName: blog.author?.name || userRes.data.name,
            authorAvatar: undefined, // Your API might provide this
            createdAt: new Date(blog.createdAt),
            likes: blog.likes?.length || 0,
            comments: 0, // If you add comments later
          }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load your blogs. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndBlogs();
  }, [toast]);

  const handleLike = async (id: string) => {
    try {
      // Call the API to like the blog
      await axios.post(`${API_URL}/blogs/${id}/like`, {}, authConfig());

      // Update the UI optimistically
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, likes: post.likes + 1 } : post
        )
      );

      toast({
        title: "Post liked!",
        description: "Your like has been recorded.",
      });
    } catch (error) {
      console.error("Error liking post:", error);
      toast({
        title: "Error",
        description: "Failed to like the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSavePost = async (
    newPost: Omit<BlogPost, "id" | "createdAt" | "likes" | "comments">
  ) => {
    try {
      // Send the new blog post to the API
      const response = await axios.post(
        `${API_URL}/blogs`,
        {
          title: newPost.title,
          content: newPost.content,
        },
        authConfig()
      );

      // Create a formatted post object from the response
      const createdPost: BlogPost = {
        id: response.data.id,
        title: response.data.title,
        content: response.data.content,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        createdAt: new Date(response.data.createdAt),
        likes: 0,
        comments: 0,
      };

      // Add the new post to the state
      setPosts([createdPost, ...posts]);
      setIsWriting(false);

      toast({
        title: "Success!",
        description: "Your blog post has been published.",
      });
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: "Failed to publish your post. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <p className="text-center text-gray-600">Loading your blogs...</p>
      </div>
    );
  }

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

"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SaveIcon, XIcon } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { BlogPost } from "./BlogCard";

// Define the form schema with zod
const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  content: z
    .string()
    .min(20, {
      message: "Content must be at least 20 characters.",
    })
    .max(5000, {
      message: "Content must not exceed 5000 characters.",
    }),
});

interface BlogPostEditorProps {
  onSave: (
    post: Omit<BlogPost, "id" | "createdAt" | "likes" | "comments">
  ) => void;
  onCancel: () => void;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

const BlogPostEditor = ({ onSave, onCancel, user }: BlogPostEditorProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would save this to a backend
      const newPost = {
        title: values.title,
        content: values.content,
        authorId: user.id,
        authorName: user.name,
        authorAvatar: user.avatar,
      };

      onSave(newPost);

      toast({
        title: "Success!",
        description: "Your blog post has been published.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish your blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Write a New Blog Post</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
                      placeholder="Write your thoughts here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <XIcon className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <SaveIcon className="w-4 h-4 mr-2" />
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default BlogPostEditor;

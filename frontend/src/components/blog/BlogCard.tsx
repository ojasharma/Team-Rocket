import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  HeartIcon,
  MessageSquareIcon,
  ShareIcon,
  UserIcon,
  CalendarIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: Date;
  likes: number;
  comments: number;
}

interface BlogCardProps {
  post: BlogPost;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
  onView?: (id: string) => void;
}

const BlogCard = ({
  post,
  onLike,
  onComment,
  onShare,
  onView,
}: BlogCardProps) => {
  return (
    <Card className="mb-6 overflow-hidden shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 border border-blue-50">
            {post.authorAvatar ? (
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="rounded-full h-full w-full object-cover"
              />
            ) : (
              <UserIcon className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div>
            <p className="font-medium text-sm text-gray-900">
              {post.authorName}
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <CalendarIcon className="w-3 h-3 mr-1" />
              <span>
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
        <CardTitle className="text-xl tracking-normal text-gray-900 font-bold">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="py-4">
        <CardDescription className="text-sm line-clamp-3 md:line-clamp-4 text-gray-700">
          {post.content}
        </CardDescription>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-3 flex justify-between">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto text-gray-500 hover:text-blue-600 transition-colors duration-200"
            onClick={() => onLike?.(post.id)}
          >
            <HeartIcon className="w-4 h-4 mr-1" />
            <span className="text-xs">{post.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto text-gray-500 hover:text-blue-600 transition-colors duration-200"
            onClick={() => onComment?.(post.id)}
          >
            <MessageSquareIcon className="w-4 h-4 mr-1" />
            <span className="text-xs">{post.comments}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto text-gray-500 hover:text-yellow-500 transition-colors duration-200"
            onClick={() => onShare?.(post.id)}
          >
            <ShareIcon className="w-4 h-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-xs bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200"
          onClick={() => onView?.(post.id)}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;

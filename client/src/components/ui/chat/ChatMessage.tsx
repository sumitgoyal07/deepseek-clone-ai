import { cn } from "@/lib/utils";
import { userAuthStore } from "@/store/authStore";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Loader } from "../Loader";
import Markdown from "../Markdown";
import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import toast from "react-hot-toast";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

interface ChatMessageProps {
  message: {
    role: "user" | "assistant" | "system";
    content: string;
    comment?: string;
  };
  isUserLoading?: boolean;
  isAiLoading?: boolean;
}
const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isAiLoading,
  isUserLoading,
}) => {
  const { user } = userAuthStore();
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("copied");
  };

  const [disliked, setDisliked] = useState(false);
  const [liked, setliked] = useState(false);

  const handleLiked = () => {
    setliked(!liked);
    if (!liked) {
      setDisliked(false);
    };
  };

  const handleDisliked = () => {
    setDisliked(!disliked);
    if (!disliked) {
      setliked(false);
    };
  };

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 p-4 rounded-lg",
        message.role === "user" ? "bg-blue-50 mt-10" : "bg-muted/50",
        "mb-4 relative"
      )}
    >
      <Avatar className="h-8 w-8">
        {message.role === "user" ? (
          user?.profilePicture ? (
            <AvatarImage
              src={user?.profilePicture}
              alt={user?.name}
            ></AvatarImage>
          ) : (
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          )
        ) : (
          <AvatarImage src="/images/deepseek-small-logo.svg" alt="deepseek" />
        )}
      </Avatar>

      <div className="flex-1 space-y-2">
        {message.role === "user" && isUserLoading ? (
          <Loader type="user" position="left" className="mr-2" />
        ) : message.role === "assistant" && isAiLoading ? (
          <Loader type="ai" />
        ) : (
          <div className="prose prose-sm max-w-none">
            <Markdown content={message.content} />
          </div>
        )}
      </div>

      {message.role === "user" ? (
        <div className="absolute right-4 top-1/2 mt-4 transform -translate-y-1/2">
          <Copy
            className="h-5 w-5 text-gray-600 cursor-pointer"
            onClick={() => handleCopy(message.content)}
          />
        </div>
      ) : (
        <div className="absolute left-4 -bottom-10  transform -translate-y-1/2 flex gap-3">
          <Copy
            className="h-5 w-5 text-gray-600 cursor-pointer"
            onClick={() => handleCopy(message.content)}
          />
          <ThumbsUp
            className={`h-5 w-5 transition-colors duration-200 cursor-pointer ${liked ? 'text-green-500' : 'text-gray-500'}`}
            onClick={() => handleLiked()}
          />
          <ThumbsDown
            className={`h-5 w-5 transition-colors duration-200 cursor-pointer ${disliked ? 'text-red-500' : 'text-gray-500'}`}
            onClick={() => handleDisliked()}
          />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
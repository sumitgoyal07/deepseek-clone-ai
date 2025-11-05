"use client";
import ChatInput from "@/components/ui/chat/ChatInput";
import ChatSidebar from "@/components/ui/chat/ChatSidebar";
import { userAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const { isAuthenticated, isLoading } = userAuthStore();
  const { createChat, isLoading: createChatLoading } = useChatStore();
  const router = useRouter();
  const handleSendMesaage = async (message: string) => {
    if (isAuthenticated && !createChatLoading) {
      try {
        const chat = await createChat("New Chat");
        router.push(
          `/chat/${chat?._id}?message=${encodeURIComponent(message)}`
        );
      } catch (error) {
        console.log(error);
        toast.error("failed to create chat");
      }
    }
  };
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex flex-col mt-50 mx-auto">
        <div className="flex flex-col items-center gap-2 md:ml-40">
          <div className="flex items-center gap-4 justify-center">
            <div className="h-16 w-16">
              <img
                src="/images/deepseek-small-logo.svg"
                alt="deepsee-logo"
                className="h-full w-full"
              />
            </div>
            <h2 className="text-2xl font-bold mr-4 ">Hi, I'am DeepSeek.</h2>
          </div>
          <p className="text-center text-muted-foreground ml-8">
            How can help you today
          </p>
        </div>
        <div className="fixed left-0 top-30 right-0 bottom-0 mx-auto flex px-4 justify-center items-center">
          <ChatInput onSubmit={handleSendMesaage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

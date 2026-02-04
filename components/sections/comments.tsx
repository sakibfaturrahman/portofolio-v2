"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Reply, Send, ShieldCheck, Hash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---
interface Comment {
  id: string;
  user: string;
  role: string;
  text: string;
  likes: number;
  time: string;
  isLiked: boolean;
  replies: Comment[];
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "1",
    user: "Rudi Hermawan",
    role: "Fullstack Dev",
    text: "Sangat suka dengan arsitektur sistem yang kamu bangun di project PKL kemarin. Clean code banget!",
    likes: 12,
    time: "2h ago",
    isLiked: false,
    replies: [
      {
        id: "1-1",
        user: "Sakib Faturrahman.",
        role: "Developer",
        text: "Terima kasih Rudi! Saya fokus di efisiensi query database-nya.",
        likes: 5,
        time: "1h ago",
        isLiked: true,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    user: "Dinda Aulia",
    role: "UI Designer",
    text: "Visual portofolionya keren, performanya juga smooth!",
    likes: 8,
    time: "5h ago",
    isLiked: false,
    replies: [],
  },
];

export function Comments() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [replyTarget, setReplyTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  const handleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id)
          return {
            ...c,
            likes: c.isLiked ? c.likes - 1 : c.likes + 1,
            isLiked: !c.isLiked,
          };
        return {
          ...c,
          replies: c.replies.map((r) =>
            r.id === id
              ? {
                  ...r,
                  likes: r.isLiked ? r.likes - 1 : r.likes + 1,
                  isLiked: !r.isLiked,
                }
              : r,
          ),
        };
      }),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const addedComment: Comment = {
      id: Date.now().toString(),
      user: "Guest User",
      role: "Visitor",
      text: newComment,
      likes: 0,
      time: "Just now",
      isLiked: false,
      replies: [],
    };

    if (replyTarget) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyTarget.id
            ? { ...c, replies: [...c.replies, addedComment] }
            : c,
        ),
      );
      setReplyTarget(null);
    } else {
      setComments((prev) => [...prev, addedComment]);
    }
    setNewComment("");
  };

  return (
    <section
      id="comments"
      className="py-20 px-6 bg-white dark:bg-black transition-colors duration-500"
    >
      <div className="max-w-5xl mx-auto">
        <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col h-[650px] md:h-[750px]">
          {/* Header */}
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 py-5 flex flex-row items-center justify-between px-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <Hash className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-black font-montserrat tracking-tight text-zinc-900 dark:text-zinc-100">
                  public-discussion
                </CardTitle>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hidden sm:block">
                  Development & System Architecture
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-tighter">
                Live
              </span>
            </div>
          </CardHeader>

          {/* Chat Area */}
          <CardContent
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-hide"
          >
            <AnimatePresence>
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-6">
                  <CommentItem
                    comment={comment}
                    onLike={handleLike}
                    onReply={(id, name) => setReplyTarget({ id, name })}
                  />

                  {comment.replies.length > 0 && (
                    <div className="ml-6 md:ml-14 pl-6 border-l border-zinc-200 dark:border-zinc-800 space-y-6">
                      {comment.replies.map((reply) => (
                        <CommentItem
                          key={reply.id}
                          comment={reply}
                          isReply
                          onLike={handleLike}
                          onReply={() =>
                            setReplyTarget({ id: comment.id, name: reply.user })
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </AnimatePresence>
          </CardContent>

          {/* Footer Input */}
          <div className="p-6 bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-zinc-100 dark:border-zinc-800">
            <form onSubmit={handleSubmit} className="relative">
              <AnimatePresence>
                {replyTarget && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 right-0 mb-3 p-3 bg-primary/10 border border-primary/20 rounded-2xl flex justify-between items-center backdrop-blur-md"
                  >
                    <span className="text-[10px] font-bold text-primary px-2 uppercase tracking-widest">
                      Replying to{" "}
                      <span className="underline">@{replyTarget.name}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setReplyTarget(null)}
                      className="bg-primary/20 hover:bg-primary/30 text-primary p-1 rounded-full transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={`flex items-center gap-3 bg-white dark:bg-black border ${replyTarget ? "rounded-2xl" : "rounded-2xl"} border-zinc-200 dark:border-zinc-800 p-2 pl-5 focus-within:border-primary transition-all shadow-sm`}
              >
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="bg-transparent border-none focus-visible:ring-0 text-sm placeholder:text-zinc-400 dark:text-zinc-200 p-0"
                />
                <Button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="rounded-xl h-10 px-5 bg-primary hover:bg-primary/90 text-white font-bold transition-all shrink-0 shadow-lg shadow-primary/20"
                >
                  <Send className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Send Message</span>
                </Button>
              </div>
            </form>
          </div>
        </Card>

        <p className="mt-6 text-center text-[10px] text-zinc-400 dark:text-zinc-600 font-bold uppercase tracking-[0.3em]">
          End of encrypted transmission
        </p>
      </div>
    </section>
  );
}

function CommentItem({
  comment,
  isReply = false,
  onLike,
  onReply,
}: {
  comment: Comment;
  isReply?: boolean;
  onLike: (id: string) => void;
  onReply: (id: string, name: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex gap-4 md:gap-5"
    >
      <Avatar
        className={`${isReply ? "h-9 w-9" : "h-11 w-11"} rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm`}
      >
        <AvatarFallback className="bg-zinc-100 dark:bg-zinc-900 text-primary text-xs font-black">
          {comment.user.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {comment.user}
          </span>
          {comment.role === "Developer" && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-primary/10 border border-primary/20">
              <ShieldCheck className="w-3 h-3 text-primary" />
              <span className="text-[8px] font-black text-primary uppercase">
                Staff
              </span>
            </div>
          )}
          <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-tighter">
            • {comment.time}
          </span>
        </div>

        <div
          className={`p-4 rounded-2xl rounded-tl-none border border-zinc-100 dark:border-zinc-800 ${isReply ? "bg-zinc-50/50 dark:bg-zinc-900/30" : "bg-zinc-50 dark:bg-zinc-900/50"} text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed shadow-sm group-hover:border-primary/20 transition-colors`}
        >
          {comment.text}
        </div>

        <div className="flex items-center gap-5 mt-2.5 ml-1">
          <button
            onClick={() => onLike(comment.id)}
            className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all ${comment.isLiked ? "text-red-500" : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"}`}
          >
            <Heart
              size={13}
              fill={comment.isLiked ? "currentColor" : "none"}
              className={comment.isLiked ? "animate-bounce" : ""}
            />
            {comment.likes}
          </button>
          <button
            onClick={() => onReply(comment.id, comment.user)}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-primary transition-all"
          >
            <Reply size={13} />
            Reply
          </button>
        </div>
      </div>
    </motion.div>
  );
}

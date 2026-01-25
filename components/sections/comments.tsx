"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Heart,
  Reply,
  Send,
  User,
  ShieldCheck,
  ArrowDown,
  Hash,
} from "lucide-react";
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
        text: "Terima kasih Alex! Saya fokus di efisiensi query database-nya.",
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

  // Auto scroll ke bawah saat ada pesan baru
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
      setComments((prev) => [...prev, addedComment]); // Menambah ke bawah agar seperti chat
    }
    setNewComment("");
  };

  return (
    <section
      id="comments"
      className="py-20 px-6 bg-background transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto">
        <Card className="border-border bg-card/50 backdrop-blur-xl rounded-4xl overflow-hidden shadow-2xl flex flex-col h-[650px] md:h-[750px]">
          {/* Header */}
          <CardHeader className="border-b border-border bg-muted/30 py-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Hash className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold font-montserrat">
                  public-discussion
                </CardTitle>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  General discussion about development & projects
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Live
              </span>
            </div>
          </CardHeader>

          {/* Chat Area */}
          <CardContent
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-primary/10"
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
                    <div className="ml-6 md:ml-12 pl-4 border-l-2 border-primary/10 space-y-6">
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
          <div className="p-4 bg-muted/30 border-t border-border">
            <form onSubmit={handleSubmit} className="relative group">
              {replyTarget && (
                <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-primary/10 border border-primary/20 rounded-t-lg flex justify-between items-center animate-in slide-in-from-bottom-2">
                  <span className="text-[10px] font-bold text-primary px-2 uppercase">
                    Replying to @{replyTarget.name}
                  </span>
                  <button
                    onClick={() => setReplyTarget(null)}
                    className="text-primary hover:scale-110 transition-transform px-2 text-xs font-black"
                  >
                    ×
                  </button>
                </div>
              )}

              <div
                className={`relative flex items-center gap-2 bg-background border ${replyTarget ? "rounded-b-lg rounded-t-none" : "rounded-lg"} border-border px-3 py-2 focus-within:ring-2 ring-primary/20 transition-all`}
              >
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-transparent border-none focus-visible:ring-0 text-sm placeholder:text-muted-foreground/50"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-md h-9 px-4 shrink-0"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Send</span>
                </Button>
              </div>
            </form>
          </div>
        </Card>

        <p className="mt-4 text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          End of public transmission
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
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="group flex gap-3 md:gap-4"
    >
      <Avatar
        className={`${isReply ? "h-8 w-8" : "h-10 w-10"} rounded-lg border border-border shadow-sm`}
      >
        <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
          {comment.user.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-sm font-black text-foreground">
            {comment.user}
          </span>
          {comment.role === "Developer" && (
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          )}
          <span className="text-[9px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded uppercase tracking-tighter">
            {comment.time}
          </span>
        </div>

        <div
          className={`p-3 md:p-4 rounded-xl rounded-tl-none border border-border ${isReply ? "bg-muted/20" : "bg-muted/40"} text-sm text-foreground/80 leading-relaxed shadow-sm`}
        >
          {comment.text}
        </div>

        <div className="flex items-center gap-4 mt-2 ml-1">
          <button
            onClick={() => onLike(comment.id)}
            className={`flex items-center gap-1.5 text-[11px] font-bold transition-all ${comment.isLiked ? "text-red-500" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Heart
              size={14}
              fill={comment.isLiked ? "currentColor" : "none"}
              className={comment.isLiked ? "animate-bounce" : ""}
            />
            {comment.likes}
          </button>
          <button
            onClick={() => onReply(comment.id, comment.user)}
            className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground hover:text-primary transition-all"
          >
            <Reply size={14} />
            Reply
          </button>
        </div>
      </div>
    </motion.div>
  );
}

"use client"

import { Button } from "@/components/ui/Button"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { toast } from "sonner"
import { likePost } from "@/app/actions"
// @ts-ignore
import { useFormStatus } from "react-dom"

function LikeButton({ postId, likeCount, liked }: { postId: number, likeCount: number, liked?: boolean }) {
    // Optimistic UI could be added here, but for now we use server action
    return (
        <form action={likePost.bind(null, postId)}>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-pink-600 gap-2 transition-colors">
                <Heart className={`h-4 w-4 ${liked ? 'fill-pink-500 text-pink-500' : ''}`} />
                {likeCount} Likes
            </Button>
        </form>
    )
}

export function FeedInteractions({ post }: { post: any }) {

    const handleShare = () => {
        const url = window.location.origin + `/feed?post=${post.id}`
        navigator.clipboard.writeText(url)
        toast.success("Link copied to clipboard!")
    }

    const handleComment = () => {
        toast.info("Comments are coming soon!")
    }

    return (
        <div className="flex justify-between w-full">
            <LikeButton postId={post.id} likeCount={post.likes} />

            <Button variant="ghost" size="sm" className="text-slate-600 gap-2 hover:text-indigo-600" onClick={handleComment}>
                <MessageCircle className="h-4 w-4" /> Comment
            </Button>

            <Button variant="ghost" size="sm" className="text-slate-600 gap-2 hover:text-indigo-600" onClick={handleShare}>
                <Share2 className="h-4 w-4" /> Share
            </Button>
        </div>
    )
}

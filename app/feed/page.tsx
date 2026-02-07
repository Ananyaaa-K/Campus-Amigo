
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/Card"
// Removed missing Avatar imports
import { Heart, MessageCircle, Share2, Clock } from "lucide-react"
import { db } from "@/lib/db"
import { CreatePost } from "@/components/feed/CreatePost"
import { FeedInteractions } from "@/components/feed/FeedInteractions"

export const dynamic = 'force-dynamic'

export default async function FeedPage() {
    let posts: any[] = []
    try {
        posts = await db.post.findMany({
            orderBy: { createdAt: 'desc' },
            include: { author: true }
        })
    } catch (error) {
        console.error("Failed to fetch posts:", error)
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Campus Feed</h1>
                <p className="text-slate-500 dark:text-slate-400">See what's happening around you.</p>
            </div>

            <CreatePost />

            <div className="space-y-6">
                {posts.length > 0 ? (
                    posts.map((post: any) => (
                        <Card key={post.id} className="border-slate-200 dark:border-slate-800">
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                    {post.author?.name?.[0]?.toUpperCase() || "U"}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">{post.author?.name || "Anonymous"}</span>
                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{post.content}</p>
                                {post.image && (
                                    <div className="mt-4 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                                        {/* Placeholder for image */}
                                        <div className="h-64 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                            Image
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                <FeedInteractions post={post} />
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <p className="text-slate-500">No posts yet. Be the first to share something!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

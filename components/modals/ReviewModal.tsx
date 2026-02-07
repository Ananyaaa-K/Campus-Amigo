"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Star, MessageSquare } from "lucide-react"
import { addReview } from "@/actions/reviews"
import { toast } from "sonner"

export function ReviewModal({ meal }: { meal: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Calculate existing rating if available from props, or just show list
    // Ideally we'd pass existing reviews as props too.

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const result = await addReview(meal.id, rating, comment)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success("Review submitted!")
            setIsOpen(false)
            setComment("")
            setRating(5)
        }
        setIsSubmitting(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 text-slate-500 hover:text-indigo-600">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs">Review</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Review {meal.name}</DialogTitle>
                    <DialogDescription>
                        Share your experience with others.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`h-8 w-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="comment" className="text-sm font-medium">Comment (Optional)</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                            placeholder="What did you like? What should others order?"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Review"}
                        </Button>
                    </div>
                </form>

                {/* Simple List of Recent Reviews (if passed) - For now just empty or could be fetched */}
                {meal.reviews && meal.reviews.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 max-h-60 overflow-y-auto">
                        <h4 className="text-sm font-semibold mb-2">Recent Reviews</h4>
                        <div className="space-y-3">
                            {meal.reviews.map((r: any) => (
                                <div key={r.id} className="text-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-3 w-3 ${i < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                                            ))}
                                        </div>
                                        <span className="text-slate-400 text-xs">{new Date(r.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300">{r.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

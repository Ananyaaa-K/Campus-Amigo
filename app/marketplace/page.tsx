
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card"
import { ShoppingBag, Tag, Clock, User } from "lucide-react"
import { db } from "@/lib/db"
import { AddProductModal } from "@/components/modals/AddProductModal"
import { ContactButton } from "@/components/ContactButton"

import SearchInput from "@/components/SearchInput"
import { FilterComponent } from "@/components/FilterComponent"

export const dynamic = 'force-dynamic'

export default async function MarketplacePage(props: {
    searchParams: Promise<{ q?: string; category?: string }>
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.q || ""
    const category = searchParams?.category || ""

    const where: any = {}

    if (query) {
        where.OR = [
            { title: { contains: query } },
            { description: { contains: query } }
        ]
    }

    if (category) {
        where.category = category
    }

    let products: any[] = []
    try {
        products = await db.product.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: { seller: true }
        })
    } catch (error) {
        console.error("Failed to fetch products:", error)
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Marketplace</h1>
                    <p className="text-slate-500 dark:text-slate-400">Buy and sell items within the campus community.</p>
                </div>
                <AddProductModal />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <SearchInput placeholder="Search for books, electronics..." />
                <div className="flex gap-2 min-w-[200px]">
                    <div className="flex-1">
                        <FilterComponent
                            label="Category"
                            paramName="category"
                            options={[
                                { label: "General", value: "General" },
                                { label: "Books", value: "Books" },
                                { label: "Electronics", value: "Electronics" },
                                { label: "Stationery", value: "Stationery" },
                                { label: "Clothing", value: "Clothing" },
                                { label: "Other", value: "Other" },
                            ]}
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.length > 0 ? (
                    products.map((product: any) => (
                        <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-200 border-slate-200 dark:border-slate-800">
                            <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center">
                                {/* Placeholder for image since we don't have file upload yet */}
                                <ShoppingBag className="h-12 w-12 text-slate-300" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                    {product.status}
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg mb-1 line-clamp-1">{product.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-1">
                                            <Tag className="h-3 w-3" /> {product.category}
                                        </CardDescription>
                                    </div>
                                    <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                        ₹{product.price}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 h-10 mb-4">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                    <div className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        <span>{product.seller?.name || "Unknown Seller"}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <ContactButton
                                    label="Contact Seller"
                                    contactInfo={product.seller?.email}
                                    title={`Contact ${product.seller?.name || "Seller"}`}
                                    description="Email the seller to arrange the purchase."
                                    className="w-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
                                />
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 dark:bg-slate-900/50 dark:border-slate-800">
                        <ShoppingBag className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-200">No items found</h3>
                        <p className="text-slate-500 mb-4">Be the first to list something in this category!</p>
                        <AddProductModal />
                    </div>
                )}
            </div>
        </div>
    )
}

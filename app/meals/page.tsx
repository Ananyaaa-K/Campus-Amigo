

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Coffee, MapPin, Star, Clock } from "lucide-react"
import { db } from "@/lib/db"
import { SuggestModalWrapper } from "@/components/modals/SuggestModalWrapper"
import LeafletMapWrapper from "@/components/LeafletMapWrapper"
import { ReviewModal } from "@/components/modals/ReviewModal"

import SearchInput from "@/components/SearchInput"
import { FilterComponent } from "@/components/FilterComponent"

export const dynamic = 'force-dynamic'

export default async function MealsPage(props: {
    searchParams: Promise<{ q?: string; price?: string; cuisine?: string }>
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.q || ""
    const price = searchParams?.price || ""
    const cuisine = searchParams?.cuisine || ""

    const where: any = {}

    if (query) {
        where.OR = [
            { name: { contains: query } },
            { cuisine: { contains: query } },
            { menuItems: { contains: query } }
        ]
    }

    if (price) {
        where.price = price
    }

    // Since cuisine can be free text, we might want to be careful with exact match filters vs search
    // But for this filter component, let's assume common categories if provided via filter, OR part of the free text search.
    // However, if the user explicitly picks a Cuisine filter, we should probably filter by it.
    // The current schema just has 'cuisine' string.
    if (cuisine) {
        where.cuisine = { contains: cuisine } // Partial match for better hits
    }

    let meals: any[] = []
    try {
        meals = await db.meal.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {}
        })
    } catch (error) {
        console.error("Failed to fetch meals:", error)
    }



    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <SuggestModalWrapper />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Nearby Meals</h1>
                    <p className="text-slate-500 dark:text-slate-400">Discover the best food spots around campus.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <SearchInput placeholder="Search spots, cuisines, or items..." />
                <div className="flex gap-2 min-w-[300px]">
                    <div className="flex-1">
                        <FilterComponent
                            label="Price"
                            paramName="price"
                            options={[
                                { label: "Cheap (₹)", value: "₹" },
                                { label: "Moderate (₹₹)", value: "₹₹" },
                                { label: "Expensive (₹₹₹)", value: "₹₹₹" },
                            ]}
                        />
                    </div>
                    <div className="flex-1">
                        <FilterComponent
                            label="Cuisine"
                            paramName="cuisine"
                            options={[
                                { label: "North Indian", value: "North Indian" },
                                { label: "South Indian", value: "South Indian" },
                                { label: "Chinese", value: "Chinese" },
                                { label: "Snacks", value: "Snacks" },
                                { label: "Beverages", value: "Beverages" },
                            ]}
                        />
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="w-full h-96 rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 mb-8 relative z-0">
                <LeafletMapWrapper
                    points={meals
                        .filter((m: any) => m.latitude && m.longitude)
                        .map((m: any) => ({
                            lat: m.latitude,
                            lng: m.longitude,
                            title: m.name,
                            description: m.cuisine
                        }))}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {meals.length > 0 ? (
                    meals.map((meal: any) => {
                        const menuItemsArray = meal.menuItems.split(',').map((item: string) => item.trim())
                        const itemPricesArray = meal.itemPrices ? meal.itemPrices.split(',').map((price: string) => price.trim()) : []
                        
                        return (
                            <Card key={meal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 w-full relative">
                                    {meal.imageUrl ? (
                                        <Image 
                                            src={meal.imageUrl} 
                                            alt={meal.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className={`h-full w-full ${meal.imageClass || 'bg-slate-200'}`} />
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-slate-800">
                                        {meal.status}
                                    </div>
                                </div>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl mb-1">{meal.name}</CardTitle>
                                            <CardDescription>{meal.cuisine}</CardDescription>
                                        </div>
                                        <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg dark:bg-green-900/30 dark:text-green-400">
                                            <Star className="h-3 w-3 fill-current" />
                                            <span className="text-sm font-bold">{meal.rating}</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4 dark:text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {meal.distance}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-slate-900 dark:text-slate-200">{meal.price}</span>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Popular Items</p>
                                        <div className="flex flex-col gap-2">
                                            {menuItemsArray.map((item: string, i: number) => (
                                                <div key={i} className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                                                    {itemPricesArray[i] && (
                                                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{itemPricesArray[i]}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Navigation Button */}
                                {meal.latitude && meal.longitude && (
                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${meal.latitude},${meal.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 rounded-lg transition-colors font-medium text-sm dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
                                        >
                                            <MapPin className="h-4 w-4" />
                                            Get Directions
                                        </a>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        <p>No meals found matching your criteria.</p>
                        <a href="/meals" className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                            Clear filters
                        </a>
                    </div>
                )}
            </div>
        </div >
    )
}

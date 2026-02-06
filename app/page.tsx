import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { BookOpen, Calendar, Coffee, FileText, ArrowRight, TrendingUp, Users, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 md:px-6 lg:py-40 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-indigo-950/20 dark:to-purple-950/10">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col items-center text-center space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 border border-indigo-200 dark:border-indigo-800 shadow-lg backdrop-blur-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Trusted by 1000+ Students</span>
            </div>

            <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Your Ultimate <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">College Companion</span>
            </h1>
            <p className="max-w-[750px] text-xl text-slate-600 md:text-2xl dark:text-slate-300 leading-relaxed">
              Discover nearby food, share notes, access past papers, and stay updated with campus events — all in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 min-w-[340px] justify-center pt-6">
              <Link href="/meals">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-lg px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all">
                  Explore Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/notes">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 border-2 hover:bg-slate-50 dark:hover:bg-slate-900">
                  Find Notes
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl w-full">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">500+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Study Notes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">50+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Food Spots</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">100+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Events</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Background Shapes */}
        <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 md:px-6 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 px-4">
            <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
              <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">FEATURES</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Everything You Need in One Place</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              Stop juggling multiple apps and groups. Campus Amigo brings all your essential student needs under one digital roof.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Link key={i} href={feature.href} className="block group">
                <Card className="h-full border-2 border-slate-100 bg-gradient-to-br from-white to-slate-50 hover:from-white hover:to-white hover:border-indigo-300 hover:shadow-2xl transition-all duration-500 dark:border-slate-800 dark:from-slate-900/50 dark:to-slate-900 dark:hover:border-indigo-700">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 text-white shadow-xl group-hover:scale-125 group-hover:rotate-3 transition-all duration-500`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <div className="mt-6 flex items-center text-indigo-600 dark:text-indigo-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm">Explore</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Call to Action */}
      <section className="relative py-24 px-4 md:px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto max-w-5xl text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-semibold">Join the Movement</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Ready to Upgrade Your Campus Life?</h2>
          <p className="text-indigo-100 text-xl max-w-3xl mx-auto leading-relaxed">
            Join thousands of students who are managing their academic and social lives better with Campus Amigo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/login">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 font-bold px-10 py-6 text-lg shadow-2xl hover:shadow-3xl transition-all">
                Get Started Free
              </Button>
            </Link>
            <Link href="/notes">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-lg backdrop-blur-sm">
                Explore Features
              </Button>
            </Link>
          </div>

          {/* User Avatars */}
          <div className="flex items-center justify-center gap-3 pt-8">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-white"></div>
            </div>
            <div className="text-left ml-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-indigo-100">Loved by 1,000+ students</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Nearby Meals",
    description: "Discover the best food spots near campus. Rated by students, for students.",
    icon: Coffee,
    href: "/meals",
    color: "bg-orange-500"
  },
  {
    title: "Study Notes",
    description: "Access and share lecture notes. Never miss out on important study material again.",
    icon: BookOpen,
    href: "/notes",
    color: "bg-blue-500"
  },
  {
    title: "PYQs",
    description: "Prepare for exams with a vast archive of Previous Year Question papers.",
    icon: FileText,
    href: "/pyqs",
    color: "bg-green-500"
  },
  {
    title: "Events",
    description: "Stay updated on hackathons, workshops, and college fests happening around you.",
    icon: Calendar,
    href: "/events",
    color: "bg-purple-500"
  }
];

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { BookOpen, Calendar, Coffee, FileText, ArrowRight, TrendingUp, Users, Star } from "lucide-react";
import Link from "next/link";
import LeafletMapWrapper from "@/components/LeafletMapWrapper";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Hero Section */}
      <section className="relative py-24 px-4 md:px-6 lg:py-40 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-2 dark:bg-indigo-950/30 dark:border-indigo-800 dark:text-indigo-400">
              🚀 Version 2.0 Now Live
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-slate-900 dark:text-white drop-shadow-sm">
              Your Ultimate <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 dark:from-indigo-400 dark:to-sky-300">
                College Companion
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-600 md:text-2xl leading-relaxed dark:text-slate-300">
              Campus Amigo connects you with nearby food, study notes, past papers, and the latest campus events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/meals">
                <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto gap-2 bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-500/20">
                  Explore Meals <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/notes">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto bg-white/50 backdrop-blur-sm border-slate-200 hover:bg-white hover:text-indigo-600 dark:bg-slate-900/50 dark:border-slate-800">
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
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">100+</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Restaurants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">5k+</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Notes Uploaded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">12</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Campuses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">24/7</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Community</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Everything in One Place</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Stop juggling multiple apps. We bring all your essential student needs under one digital roof.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Link key={i} href={feature.href} className="block group">
                <Card className="h-full border-0 shadow-sm bg-white dark:bg-slate-900 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ring-1 ring-slate-200 dark:ring-slate-800">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-indigo-600 transition-colors dark:text-slate-100">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
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

      {/* Map Section */}
      <section className="py-24 px-4 md:px-6 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Find Us</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Come visit our main campus center in Jaipur.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <LeafletMapWrapper />
          </div>
        </div>
      </section>

      {/* Social Proof / Call to Action */}
      <section className="py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900 -z-20"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 -z-10"></div>

        <div className="container mx-auto max-w-4xl text-center space-y-8 relative z-10">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
            Ready to upgrade your campus life?
          </h2>
          <p className="text-indigo-100 text-xl max-w-2xl mx-auto">
            Join thousands of students who are managing their academic and social lives better with Campus Amigo.
          </p>
          <div className="pt-4">
            <Button size="lg" className="bg-white text-indigo-900 hover:bg-slate-100 font-bold px-10 h-14 text-lg shadow-2xl">
              Get Started Now
            </Button>
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

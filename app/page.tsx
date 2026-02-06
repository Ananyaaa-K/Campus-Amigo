import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { BookOpen, Calendar, Coffee, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:py-32 overflow-hidden bg-gradient-to-b from-white to-indigo-50/50 dark:from-slate-950 dark:to-indigo-950/20">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Your Ultimate <span className="text-indigo-600 dark:text-indigo-400">College Companion</span>
            </h1>
            <p className="max-w-[700px] text-lg text-slate-600 md:text-xl dark:text-slate-300">
              Campus Amigo connects you with nearby food, study notes, past papers, and the latest campus events. Everything you need to survive and thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 min-w-[300px] justify-center pt-4">
              <Link href="/meals">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Explore Meals <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/notes">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Find Notes
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-6 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Everything in One Place</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Stop juggling multiple apps and groups. Campus Amigo brings all your essential student needs under one digital roof.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Link key={i} href={feature.href} className="block group">
                <Card className="h-full border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Call to Action */}
      <section className="py-20 px-4 md:px-6 bg-indigo-900 text-white">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to upgrade your campus life?</h2>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            Join thousands of students who are managing their academic and social lives better with Campus Amigo.
          </p>
          <Button size="lg" variant="accent" className="text-slate-900 font-bold px-8">
            Get Started Now
          </Button>
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

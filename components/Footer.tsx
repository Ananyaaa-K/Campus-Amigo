import Link from "next/link";
import { Coffee, Twitter, Instagram, Github, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
                            <Coffee className="h-6 w-6" />
                            <span>Campus Amigo</span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Your all-in-one companion for surviving and thriving in college. Built with ❤️ for students.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors dark:bg-slate-900 dark:text-slate-400">
                                <Twitter className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition-colors dark:bg-slate-900 dark:text-slate-400">
                                <Instagram className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-400">
                                <Github className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-6">Product</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/meals" className="hover:text-indigo-600 transition-colors">Nearby Meals</Link></li>
                            <li><Link href="/notes" className="hover:text-indigo-600 transition-colors">Study Notes</Link></li>
                            <li><Link href="/pyqs" className="hover:text-indigo-600 transition-colors">PYQ Archive</Link></li>
                            <li><Link href="/events" className="hover:text-indigo-600 transition-colors">Campus Events</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-6">Company</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-6">Stay Updated</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            Get the latest campus news and feature updates directly to your inbox.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
                            />
                            <button className="bg-indigo-600 text-white rounded-lg px-3 py-2 hover:bg-indigo-700 transition-colors">
                                <Mail className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <p>© {new Date().getFullYear()} Campus Amigo. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-slate-900 dark:hover:text-white">Privacy</Link>
                        <Link href="#" className="hover:text-slate-900 dark:hover:text-white">Terms</Link>
                        <Link href="#" className="hover:text-slate-900 dark:hover:text-white">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

"use client";
import Navbar from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import {
  ArrowRight,
  Bot,
  FileText,
  Youtube,
  Brain,
  Sparkles,
  Shield,
  Share2,
  Globe,
  Lock,
  Zap,
  Upload,
  MessageSquare,
  Download,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    user && CheckUser();
  }, [user]);
  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      userName: user?.fullName,
    });
    console.log(result);
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI Chat Hub
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                How it works
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              {user ? (
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity shadow-md"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity shadow-md"
                >
                  Try for Free
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#4B0082,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#800080,_transparent_50%)]"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              The Future of AI Chat is Here
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              One platform for all your AI needs. Chat with PDFs, summarize
              videos, and experience next-gen AI conversations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href={user ? "/dashboard" : "/sign-in"}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
              >
                <span className="flex items-center justify-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Get Started
                </span>
              </Link>
              <button className="px-8 py-4 rounded-full border border-purple-500/30 hover:bg-purple-500/10 transition-colors">
                <span className="flex items-center justify-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Watch Demo
                </span>
              </button>
            </div>
          </div>

          {/* Feature Preview */}
          <div className="flex justify-center">
          <div className="relative flex items-center justify-center p-4 bg-gradient-to-br from-purple-500/10 to-black/10 rounded-2xl border-2 border-purple-500/30 shadow-lg w-[900px] h-[550px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 rounded-2xl"></div>
            <div className="relative  rounded-2xl overflow-hidden border-2 border-purple-500/20 shadow-2xl w-full h-full">
              <img
                src="/dashboard.png"
                alt="AI Interface"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-900/50 to-transparent p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all">
              <div className="bg-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Chat with PDFs
              </h3>
              <p className="text-gray-400 mb-6">
                Transform your documents into interactive conversations. Get
                insights, summaries, and answers instantly.
              </p>
              <a href="#" className="text-purple-400 flex items-center group">
                Explore{" "}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

            <div className="bg-gradient-to-br from-pink-900/50 to-transparent p-8 rounded-2xl border border-pink-500/20 backdrop-blur-sm hover:border-pink-500/40 transition-all">
              <div className="bg-pink-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Youtube className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Video Summarizer
              </h3>
              <p className="text-gray-400 mb-6">
                Extract key insights from any YouTube video in seconds. Save
                hours of watching time.
              </p>
              <a href="#" className="text-pink-400 flex items-center group">
                Learn more{" "}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

            <div className="bg-gradient-to-br from-purple-900/50 to-transparent p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all">
              <div className="bg-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Assistant
              </h3>
              <p className="text-gray-400 mb-6">
                Experience human-like conversations powered by cutting-edge AI
                technology.
              </p>
              <a href="#" className="text-purple-400 flex items-center group">
                Try now{" "}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Upload className="h-8 w-8 text-purple-400" />,
                title: "Upload Content",
                description: "Upload your PDFs or paste YouTube links",
              },
              {
                icon: <Brain className="h-8 w-8 text-purple-400" />,
                title: "AI Processing",
                description: "Our AI analyzes and processes your content",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-purple-400" />,
                title: "Interactive Chat",
                description: "Ask questions and get instant answers",
              },
              {
                icon: <Download className="h-8 w-8 text-purple-400" />,
                title: "Export Results",
                description: "Download summaries and insights",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative p-6 bg-gradient-to-br from-purple-900/30 to-transparent rounded-2xl border border-purple-500/20"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                1M+
              </div>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="p-8">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                10M+
              </div>
              <p className="text-gray-400">Documents Processed</p>
            </div>
            <div className="p-8">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                99.9%
              </div>
              <p className="text-gray-400">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Free",
                features: [
                  "5 PDF uploads per month",
                  "3 YouTube video summaries",
                  "Basic AI chat",
                  "Email support",
                ],
              },
              {
                name: "Pro",
                price: "$29",
                popular: true,
                features: [
                  "Unlimited PDF uploads",
                  "Unlimited video summaries",
                  "Advanced AI chat",
                  "Priority support",
                  "Custom API access",
                ],
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: [
                  "Everything in Pro",
                  "Custom integrations",
                  "Dedicated account manager",
                  "SLA guarantee",
                  "Custom AI training",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border ${
                  plan.popular
                    ? "border-purple-500 bg-gradient-to-br from-purple-900/50 to-transparent"
                    : "border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-transparent"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {plan.price}
                  {plan.price !== "Custom" && (
                    <span className="text-lg text-gray-400">/mo</span>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 mr-2" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : "border border-purple-500/30 hover:bg-purple-500/10"
                  } transition-all`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Why Choose AI Chat Hub?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Globe className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Global Accessibility
                    </h3>
                    <p className="text-gray-400">
                      Access your AI assistant from anywhere in the world, 24/7
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Lock className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Enterprise Security
                    </h3>
                    <p className="text-gray-400">
                      Bank-grade encryption and privacy protection
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Lightning Fast
                    </h3>
                    <p className="text-gray-400">
                      Get responses in milliseconds, not minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800"
                alt="AI Technology"
                className="relative rounded-3xl border border-purple-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#4B0082,_transparent_50%)]"></div>
            <div className="relative p-12 text-center">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Start Your AI Journey Today
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
                Join the thousands of professionals already revolutionizing
                their workflow with AI Chat Hub
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
                  Get Started Free
                </button>
                <button className="px-8 py-4 rounded-full border border-purple-500/30 hover:bg-purple-500/10 transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            {/* Logo and Tagline */}
            <div className="flex items-center mb-6 md:mb-0">
              <Bot className="h-6 w-6 text-purple-500" />
              <span className="ml-2 text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                AI Chat Hub
              </span>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#" className="hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} AI Chat Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

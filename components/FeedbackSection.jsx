"use client";

import { useEffect, useRef } from "react";

export default function FeedbackSection() {
  const feedbacks = [
    {
      name: "Aarav Mehta",
      role: "Student, CSE",
      feedback:
        "This app saved me hours of time! The PDF summarizer is super accurate and fast.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sanya Kapoor",
      role: "Frontend Developer",
      feedback:
        "I used Chatpedia for summarizing videos while learning React — really impressive work!",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Rohit Sharma",
      role: "GATE Aspirant",
      feedback:
        "Combining YouTube and PDF summaries is a game changer. Helps me revise fast before exams.",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
      name: "Ishita Rani",
      role: "College Topper",
      feedback:
        "I never imagined AI could summarize academic PDFs so well. Game changer for notes!",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Dev Mishra",
      role: "Hackathon Enthusiast",
      feedback:
        "Chatpedia helped me prep faster for my hackathon projects. Super handy and clean UI!",
      image: "https://randomuser.me/api/portraits/men/19.jpg",
    },
    {
      name: "Meera Jain",
      role: "Content Creator",
      feedback:
        "YouTube summarizer saves so much time. I can now create quick content briefs in minutes.",
      image: "https://randomuser.me/api/portraits/women/53.jpg",
    },
    {
      name: "Yuvraj Singh",
      role: "Tech Blogger",
      feedback:
        "Love the minimalist design. And the summaries are context-aware. That’s hard to build!",
      image: "https://randomuser.me/api/portraits/men/88.jpg",
    },
    {
      name: "Neha Verma",
      role: "UI/UX Intern",
      feedback:
        "The interface is beautiful and responsive. I keep recommending it to my classmates.",
      image: "https://randomuser.me/api/portraits/women/60.jpg",
    },
    {
      name: "Arjun Patel",
      role: "App Developer",
      feedback:
        "Summarizing docs and videos in one place is genius. A must-have dev productivity tool.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Tanya Singh",
      role: "Engineering Student",
      feedback:
        "I always use it before class to quickly catch up. Life-saver during exams!",
      image: "https://randomuser.me/api/portraits/women/25.jpg",
    },
  ];

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrameId;

    let scroll = () => {
      if (slider) {
        slider.scrollLeft += 0.5;
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
          slider.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="px-4 py-12 bg-black text-purple-400">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        What Our Users Say
      </h2>
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-20" />

        {/* Right shadow */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-20" />

        <div ref={sliderRef} className="flex gap-6 overflow-x-hidden px-2 py-4">
          {feedbacks.map((item, index) => (
            <div
              key={index}
              className="bg-card min-w-[300px] max-w-sm flex-shrink-0 text-card-foreground rounded-2xl shadow-lg p-6 transition-transform hover:scale-[1.03]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 mx-auto rounded-full mb-4"
              />
              <p className="text-muted-foreground text-sm italic mb-4">
                “{item.feedback}”
              </p>
              <h3 className="text-lg font-semibold text-center">{item.name}</h3>
              <p className="text-xs text-muted-foreground text-center">
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

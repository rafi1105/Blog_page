"use client"

import "../app/globals.css";
import { Divide, Table } from "lucide-react";
import Image from "next/image";
import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Contact from "../components/Contactme.jsx";

export default function Home() {
  const texts = ["Tailwind CSS", "Mechine Learning", "Python", "JavaScript"];
  const [typedText, setTypedText] = React.useState("");
  const [textIndex, setTextIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const typingSpeed = 120;
  const deletingSpeed = 60;
  const pauseTime = 1200;

  React.useEffect(() => {
    let timeout;
    const currentText = texts[textIndex];

    if (!isDeleting && typedText.length < currentText.length) {
      timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && typedText.length === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && typedText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex, texts]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <section className="relative container px-6 py-16 mx-auto lg:min-h-screen lg:space-x-10 justify-center lg:flex lg:items-center lg:gap-8">
        <div className="w-full text-center lg:text-left lg:w-4/5 lg:-mt-8">
          <div className="glass-ultra p-8 rounded-2xl shadow-2xl shadow-blue-500/10 ">
            <h2 className="text-3xl leading-snug text-black dark:text-white md:text-5xl text-center font-bold mb-6">
              A <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent animate-gradient">free repository</span> for community components{" "}
              <br className="hidden lg:block" /> 
              using{" "}
              <span className="font-bold bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                {typedText}
                <span className="animate-pulse text-blue-500">|</span>
              </span>
            </h2>
            
            <p className="lg:mt-6 text-center text-lg lg:text-gray-700 dark:text-gray-300 leading-relaxed">
              Open source projects and components increase reusability{" "}
              <br className="hidden lg:block" /> 
               for your new apps, projects or landing sites{" "}
              <span className="text-blue-600 dark:text-blue-400 font-extrabold animate-pulse">!</span>
            </p>
            
            <div className="mt-8 glass backdrop-blur-md rounded-4xl p-1 shadow-lg shadow-blue-500/20 border border-blue-200/50 dark:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 lg:max-w-xl align-items-center mx-auto">
              <form 
                action="" 
                className="flex flex-wrap justify-between md:flex-row"
              >
                <input
                  type="search"
                  name="query"
                  placeholder="Search Posts, Components, Blogs..."
                  required
                  className="flex-1 px-6 py-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none focus:placeholder-transparent rounded-l-xl"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 transform rounded-4xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50 shadow-lg shadow-blue-500/30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="w-full mt-8 lg:mt-0 lg:w-2/3">
          <div className="p-0">
            <div className="w-full h-full max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
              <div className="relative z-10 w-full h-96">
                <DotLottieReact
                  src="https://lottie.host/2c8b85ae-01f2-4d69-b136-7d959df4b140/GKKwfJT0zA.lottie"
                  loop
                  autoplay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contact />

    </main>
  );
}

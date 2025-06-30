"use client"

import "../app/globals.css";
import { Divide, Table } from "lucide-react";
import Image from "next/image";
import React from "react";
import Lottie from "lottie-react";
import animationData from "../Animation - 1751031313621.json";

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
    <main className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <section className="container px-2 py-1 mx-auto lg:min-h-120 lg:space-x-10 justify-center lg:flex lg:items-center lg:gap-3 ">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-1">
          <h2 className="text-2xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            A <span className="font-semibold">free repository</span> for community{" "}
            <br className="hidden lg:block" /> 
            components using{" "}
            <span className="font-semibold underline decoration-secondary  dark:decoration-secondary ">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h2>
          
          <p className="lg:mt-4 text-lg lg:text-gray-600 dark:text-gray-300">
            Open source porject and components increase{" "}
            <br className="hidden lg:block" /> 
            reuseablity your new apps, projects or landing sites <span className="text-secondary  font-bold dark:text-secondary "> !</span>

          </p>
          
          <div className="mt-6 bg-transparent border-2 shadow-2xl shadow-gray-700/50 dark:shadow-red-700/40 rounded-lg dark:border-gray-700 lg:max-w-2/3  lg:max-h-20 focus-within:border-primary focus-within:ring focus-within:ring-primary dark:focus-within:border-primary focus-within:ring-opacity-20 backdrop-blur-sm ">
            <form 
              action="https://www.creative-tim.com/twcomponents/search" 
              className="flex flex-wrap justify-between md:flex-row "
            >
              <input
                type="search"
                name="query"
                placeholder="Search Posts, Components, Blogs..."
                required
                className="flex-1 max-h-10 px-5 m-1 text-gray-700 lg:w-1 placeholder dark:placeholder-white  bg-transparent border-none appearance-none lg:h-10 dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0  active:backdrop-blur-md  active:bg-transparent"
              />
              <button
                type="submit"
                className="flex items-center justify-center min-w-15 p-2 m-1    backdrop-blur-sm transition-colors duration-300 transform rounded-lg lg:max-w-15 lg:max-h-12 lg:p-0  bg-secondary text-white focus:outline-secondary  "
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
        
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2  ">
          <div className="w-full h-full max-w-md mx-auto ">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

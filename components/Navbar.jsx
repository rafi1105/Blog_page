"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Moon, Sun, Code } from "lucide-react"



function ModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleDarkMode}
      className="relative bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
      aria-label="Toggle dark mode"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-500 ${isDarkMode ? 'scale-0 rotate-90' : 'scale-100 rotate-0'} text-yellow-400`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ${isDarkMode ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'} text-blue-400`} />
    </Button>
  )
}
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-white/10 dark:bg-black/20  backdrop-blur-md border-b border-white/20 dark:border-white/10 shadow-lg shadow-blue-500/10 sticky top-0 z-50 flex items-center" >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left Side */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-all duration-300 hover:scale-105"> 
            <div className="flex items-center space-x-2 group">
              <Code className="h-10 w-10 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-all duration-800  group-hover:rotate-12 animate-caret-blink delay-100"  />
              <h3 className="text-3xl font-bold  text-black dark:text-white">
                Code<span className='text-blue-500 dark:text-blue-400 font-extrabold '>_</span>Blog<span className='text-blue-500 dark:text-blue-400 font-extrabold animate-pulse'>.</span>
              </h3>
            </div>
            </Link>
          </div>
          
          {/* Desktop Navigation Links - Right Side */}
          <div className="hidden md:flex  items-center  space-x-8 ">
            <Link 
                href="/" 
                className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-100 transition-all duration-300 font-medium group relative"
            >
               <span className="relative">
                Home
                 <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded shadow-sm shadow-blue-500/50"></span>
                 </span>
            </Link>
            <Link 
               href="/blog"                                                  
                className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-100 transition-all duration-300 font-medium group relative"
            >
                <span className="relative">
                Blog
                 <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded shadow-sm shadow-blue-500/50"></span>
                 </span>
            </Link>
            <Link 
                href="/about" 
                className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-100 transition-all duration-300 font-medium group relative"
            >
                <span className="relative">
                About
                 <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded shadow-sm shadow-blue-500/50"></span>
                 </span>
            </Link>
            <Link 
                href="/content" 
                className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-100 font-medium relative transition-all duration-300 group"
            >
                <span className="relative">
                    Content
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded shadow-sm shadow-blue-500/50"></span>
                </span>
            </Link>
            <div className='flex items-center space-x-2'>
              <Button variant="outline" className="bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 text-black dark:text-white hover:bg-blue-500/20 dark:hover:bg-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm shadow-blue-900/40">Log in</Button>
              <Button variant="outline" className="bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 text-black dark:text-white hover:bg-blue-500/20 dark:hover:bg-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm shadow-blue-900/40">Sign up</Button>
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <button 
              onClick={toggleMobileMenu}
              className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg hover:scale-110"
              aria-label="Toggle mobile menu"
            >
              <svg 
                className={`w-6 h-6 transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 scale-110' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-60 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="space-y-2 pt-2 border-t border-white/20 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-lg mt-2">
            <Link 
              href="/" 
              className="block px-3 py-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-500/10 dark:hover:bg-blue-500/10 rounded-md transition-all duration-300 font-medium hover:scale-105"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
             <Link 
              href="/blog" 
              className="block px-3 py-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-500/10 dark:hover:bg-blue-500/10 rounded-md transition-all duration-300 font-medium hover:scale-105"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-500/10 dark:hover:bg-blue-500/10 rounded-md transition-all duration-300 font-medium hover:scale-105"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/content" 
              className="block px-3 py-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-500/10 dark:hover:bg-blue-500/10 rounded-md transition-all duration-300 font-medium hover:scale-105"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Content
            </Link>
            <div className='flex space-x-2 px-3 py-2 '>
              <Button variant="outline" className="bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 text-black dark:text-white hover:bg-blue-500/20 dark:hover:bg-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm">Log in</Button>
              <Button variant="outline" className="bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 text-black dark:text-white hover:bg-blue-500/20 dark:hover:bg-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm">Sign up</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
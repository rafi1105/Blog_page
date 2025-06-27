"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Moon, Sun } from "lucide-react"



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
      className="relative"
      aria-label="Toggle dark mode"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${isDarkMode ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDarkMode ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`} />
    </Button>
  )
}
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className=" border-b border-border shadow-sm sticky top-0 z-50 backdrop-blur-sm flex items-center" >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left Side */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
              Code<span className='text-secondary text-3xl'>_</span>Blog<span className='text-secondary text-3xl'>.</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links - Right Side */}
          <div className="hidden md:flex  items-center  space-x-8 ">
            <Link 
                href="/" 
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium group"
            >
               <span className="relative">
                Home
                 <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-secondary  scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded"></span>
                 </span>
            </Link>
            <Link 
               href="/blog"                                                  
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium group"
            >
                <span className="relative">
                Blog
                 <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-secondary  scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded"></span>
                 </span>
            </Link>
            <Link 
                href="/about" 
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium group"
            >
                <span className="relative">
                About
                 <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-secondary  scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded"></span>
                 </span>
            </Link>
            <Link 
                href="/content" 
                className="text-foreground hover:text-primary font-medium relative transition-colors duration-200 group"
            >
                <span className="relative">
                    Content
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-secondary  scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded"></span>
                </span>
            </Link>
            <div className='flex items-center space-x-2'>
              <Button variant="outline" className="hover:text-secondary shadow-red-500/50">Log in</Button>
              <Button variant="outline" className="hover:text-secondary shadow-red-500/50">Sign up</Button>
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <button 
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary transition-colors duration-200 p-2"
              aria-label="Toggle mobile menu"
            >
              <svg 
                className={`w-6 h-6 transform transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
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
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-60 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="space-y-2 pt-2 border-t border-border/50">
            <Link 
              href="/" 
              className="block px-3 py-2 text-foreground hover:text-secondaryhover:bg-muted/50 rounded-md transition-colors duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
             <Link 
              href="/blog" 
              className="block px-3 py-2 text-foreground hover:text-secondary hover:bg-muted/50 rounded-md transition-colors duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-foreground hover:text-secondary hover:bg-muted/50 rounded-md transition-colors duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/content" 
              className="block px-3 py-2 text-foreground hover:bg-muted/50 rounded-md transition-colors duration-200 font-medium hover:text-red-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Content
            </Link>
            <div className='flex space-x-2 px-3 py-2 '>
              <Button variant="outline" className="flex hover:text-secondary shadow-red-500/50 ">Log in</Button>
              <Button variant="outline" className="flex hover:text-secondary shadow-red-500/50">Sign up</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
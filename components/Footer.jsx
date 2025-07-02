import React from 'react'
import Link from 'next/link'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  MessageCircle,
  Heart,
  ExternalLink,
  BookOpen,
  User,
  FileText,
  Home,
  Code,
  Briefcase
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Replace these with your actual contact information
  const contactInfo = {
    email: "rafikabir05.rk@gmail.com",
    phone: "01777777777",
    whatsapp: "+1234567890",
    linkedin: "https://linkedin.com/in/your-profile",
    github: "https://github.com/your-username",
    location: "Your City, Country"
  }

  const quickLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: User },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'Content', href: '/content', icon: FileText }
  ]

  const categories = [
    { name: 'React', href: '/blog?category=React' },
    { name: 'Next.js', href: '/blog?category=Next.js' },
    { name: 'JavaScript', href: '/blog?category=JavaScript' },
    { name: 'CSS', href: '/blog?category=CSS' },
    { name: 'TypeScript', href: '/blog?category=TypeScript' }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      href: contactInfo.github,
      icon: Github,
      color: 'hover:text-purple-500 hover:bg-transparent bg-purple-500 p-2 text-white rounded-full transition-colors duration-200'
    },
    {
      name: 'LinkedIn',
      href: contactInfo.linkedin,
      icon: Linkedin,
      color: 'hover:text-blue-500 hover:bg-transparent bg-blue-500 p-2 text-white rounded-full transition-colors duration-200'
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`,
      icon: MessageCircle,
      color: 'hover:text-green-500 hover:bg-transparent bg-green-500 p-2 text-white rounded-full transition-colors duration-200'
    },
    {
      name: 'Email',
      href: `mailto:${contactInfo.email}`,
      icon: Mail,
      color: 'hover:text-red-600 hover:bg-transparent bg-red-600 p-2 text-white rounded-full transition-colors duration-200'
    }
  ]

  return (
    <footer className="glass-ultra border-t border-blue-200/30 dark:border-blue-400/20 shadow-2xl shadow-blue-500/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Company/Brand Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="glass p-2 rounded-xl blue-glow">
                <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold   text-black dark:text-white">
                Code<span className='text-blue-600 dark:text-blue-400 font-extrabold'>_</span>Blog<span className='text-blue-600 dark:text-blue-400 font-extrabold'>.</span>
              </h3>
            </div>
            <p className="text-black dark:text-gray-300 text-sm leading-relaxed">
              Sharing knowledge, insights, and tutorials about modern web development, 
              programming best practices, and the latest technologies.
            </p>
            <div className="flex items-center space-x-2 text-sm text-black dark:text-gray-300">
              <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>{contactInfo.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="group flex items-center space-x-3 text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                    >
                      <div className="glass p-2 rounded-lg group-hover:blue-glow transition-all duration-300">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    href={category.href}
                    className="group flex items-center space-x-2 text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 group-hover:bg-blue-600 transition-all duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Connect With Me
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <a 
                href={`mailto:${contactInfo.email}`}
                className="group flex items-center space-x-3 text-sm text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
              >
                <div className="glass p-2 rounded-lg group-hover:blue-glow transition-all duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">{contactInfo.email}</span>
              </a>
              
              <a 
                href={`tel:${contactInfo.phone}`}
                className="group flex items-center space-x-3 text-sm text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
              >
                <div className="glass p-2 rounded-lg group-hover:blue-glow transition-all duration-300">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">{contactInfo.phone}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-black dark:text-white">
                Follow Me
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-600  dark:text-gray-300  ${social.color} transition-colors duration-200`}
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-6 pt-4 border-t border-blue-200/30 dark:border-blue-400/20">
          <div className="max-w-md mx-auto text-center lg:text-left lg:mx-0">
            <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent mb-2">
              Stay Updated
            </h4>
            <p className="text-black dark:text-gray-300 text-sm mb-3">
              Subscribe to get the latest articles and tutorials delivered to your inbox.
            </p>
            <form className="glass p-1 rounded-2xl shadow-lg shadow-blue-500/20 border-4 border-blue-400/50 dark:border-blue-400/30">
              <div className="flex flex-col sm:flex-row gap-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 text-sm bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none rounded-xl"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50 shadow-lg shadow-blue-500/30"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-blue-200/30 dark:border-blue-400/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-black dark:text-gray-300">
              <span>© {currentYear} Rafi Kabir. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>using Next.js</span>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-4 text-sm">
              <Link 
                href="/privacy" 
                className="text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <a 
                href="https://github.com/your-username/blog-repo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-1 text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
              >
                <span>Source Code</span>
                <ExternalLink className="h-3 w-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
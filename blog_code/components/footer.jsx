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
    email: "your.email@example.com",
    phone: "+1234567890",
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
    <footer className="bg-gray-300 dark:bg-gray-900 border-t border-gray-400 dark:border-gray-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-3 py-6 backdrop-blur-sm ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          
          {/* Company/Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-secondary dark:text-secondary" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Code<span className='text-secondary font-bold dark:text-secondary'>_</span>Blog<span className='text-secondary font-bold dark:text-secondary'>.</span>
              </h3>
            </div>
            <p className="text-gray-600  dark:text-gray-300  text-sm leading-relaxed">
              Sharing knowledge, insights, and tutorials about modern web development, 
              programming best practices, and the latest technologies.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600  dark:text-gray-300 ">
              <MapPin className="h-4 w-4" />
              <span>{contactInfo.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-600  dark:text-gray-300  hover:text-secondary   dark:hover:text-secondary  transition-colors duration-200"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    href={category.href}
                    className="text-gray-600  dark:text-gray-300  hover:text-secondary   dark:hover:text-secondary  transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Connect With Me
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href={`mailto:${contactInfo.email}`}
                className="flex items-center space-x-2 text-sm text-gray-600  dark:text-gray-300  hover:text-secondary   dark:hover:text-secondary  transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                <span>{contactInfo.email}</span>
              </a>
              
              <a 
                href={`tel:${contactInfo.phone}`}
                className="flex items-center space-x-2 text-sm text-gray-600  dark:text-gray-300  hover:text-secondary   dark:hover:text-secondary  transition-colors duration-200"
              >
                <Phone className="h-4 w-4" />
                <span>{contactInfo.phone}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
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
        <div className="mt-8 pt-8 border-t border-gray-400 dark:border-gray-700">
          <div className="max-w-md mx-auto text-center lg:text-left lg:mx-0">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h4>
            <p className="text-gray-600  dark:text-gray-300  text-sm mb-4">
              Subscribe to get the latest articles and tutorials delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 hover:bg-red-900 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-1 text-sm text-gray-600  dark:text-gray-300 ">
              <span>© {currentYear} Rafi Kabir. Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>using Next.js</span>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-600  dark:text-gray-300  hover:text-secondary   dark:hover:text-secondary  transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-600  dark:text-gray-300  hover:text-secondary   dark:hover:text-secondary  transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <a 
                href="https://github.com/your-username/blog-repo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-gray-600  dark:text-gray-300  hover:text-secondary   dark:hover:text-secondary  transition-colors duration-200"
              >
                <span>Source Code</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
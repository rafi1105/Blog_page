"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Code, 
  Coffee, 
  Heart, 
  Users, 
  Zap, 
  Target, 
  Globe, 
  Github, 
  Twitter, 
  Linkedin,
  Mail,
  MapPin,
  BookOpen,
  Award
} from 'lucide-react'

const About = () => {
  const skills = [
    { name: "React", level: 95, color: "from-blue-500 to-blue-600" },
    { name: "Next.js", level: 90, color: "from-gray-700 to-black" },
    { name: "TypeScript", level: 85, color: "from-blue-500 to-blue-700" },
    { name: "Tailwind CSS", level: 92, color: "from-cyan-400 to-cyan-600" },
    { name: "Node.js", level: 80, color: "from-green-500 to-green-700" },
    { name: "Python", level: 75, color: "from-yellow-400 to-yellow-600" }
  ]

  const achievements = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "10+ Projects",
      description: "Successfully delivered projects for clients worldwide"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "50K+ Developers",
      description: "Helped developers through tutorials and open source"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "200+ Articles",
      description: "Technical articles and tutorials published"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Top Contributor",
      description: "Recognized contributor to major open source projects"
    }
  ]

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Quality First",
      description: "We believe in creating high-quality, well-tested code that stands the test of time."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community Driven",
      description: "Building and supporting the developer community through knowledge sharing."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation",
      description: "Constantly exploring new technologies and pushing the boundaries of what's possible."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Open Source",
      description: "Contributing to the open source ecosystem and making technology accessible to all."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-16">
        <div className="glass-ultra rounded-3xl p-8 md:p-16 shadow-2xl shadow-blue-500/20 animate-slide-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Profile Picture */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 animate-pulse"></div>
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white/50 dark:border-white/20 shadow-2xl shadow-blue-500/30 group-hover:scale-105 transition-all duration-500">
                  <Image
                    src="/programming.png"
                    alt="Profile Picture"
                    width={350}
                    height={350}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4 animate-gradient">
                  Rafi Kabir
                </h1>
                <p className="text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-4 animate-pulse">
                  Full Stack Developer & Technical Writer
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Passionate developer with 5+ years of experience in building modern web applications. 
                  I love sharing knowledge through blog posts and creating innovative solutions with React, Next.js, and Node.js.
                </p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center justify-center lg:justify-start space-x-3 glass p-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                  <Mail className="w-6 h-6 text-blue-500" />
                  <span className="text-black dark:text-white font-medium">rafi@codeblog.dev</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3 glass p-4 rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-green-500" />
                  <span className="text-black dark:text-white font-medium">San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-4">
                <a href="#" className="glass p-3 rounded-xl hover:shadow-lg hover:shadow-gray-500/30 transition-all duration-300 hover:scale-110">
                  <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </a>
                <a href="#" className="glass p-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-110">
                  <Twitter className="w-6 h-6 text-blue-500" />
                </a>
                <a href="#" className="glass p-3 rounded-xl hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-6 h-6 text-blue-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative container mx-auto px-6 py-16">
        <div className="glass-ultra rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-500/20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            💻 Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="glass p-6 rounded-2xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-black dark:text-white">{skill.name}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative container mx-auto px-6 py-16">
        <div className="glass-ultra rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-500/20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            🏆 Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="glass p-8 rounded-2xl text-center hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white group-hover:animate-pulse">
                  {achievement.icon}
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-3">{achievement.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative container mx-auto px-6 py-16">
        <div className="glass-ultra rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-500/20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ⭐ Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="glass p-8 rounded-2xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mr-4 group-hover:animate-pulse">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white">{value.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative container mx-auto px-6 py-16">
        <div className="glass-ultra rounded-3xl p-8 md:p-16 shadow-2xl shadow-blue-500/20 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Let's Build Something Amazing Together!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Whether you're looking for a collaborator, have a project in mind, or just want to chat about technology, 
            I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/content" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30">
              Get In Touch
            </Link>
            <Link href="/blog" className="glass px-8 py-4 rounded-xl font-semibold text-black dark:text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105">
              View My Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

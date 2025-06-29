"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Phone,
  Download,
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
  Calendar,
  MapPin,
  BookOpen,
  Award
} from 'lucide-react'

const About = () => {
  const skills = [
    { name: "React", level: 95, color: "bg-blue-500" },
    { name: "Next.js", level: 90, color: "bg-black" },
    { name: "TypeScript", level: 85, color: "bg-blue-600" },
    { name: "Tailwind CSS", level: 92, color: "bg-cyan-500" },
    { name: "Node.js", level: 80, color: "bg-green-600" },
    { name: "Python", level: 75, color: "bg-yellow-500" }
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

  const timeline = [
    {
      year: "2024",
      title: "Code_Blog Launch",
      description: "Launched this platform to share knowledge and connect with the developer community."
    },
    {
      year: "2023",
      title: "Senior Full Stack Developer",
      description: "Leading development teams and architecting large-scale applications."
    },
    {
      year: "2022",
      title: "Open Source Advocate",
      description: "Started contributing actively to major open source projects and communities."
    },
    {
      year: "2021",
      title: "First Tech Talk",
      description: "Began speaking at conferences and sharing knowledge with the community."
    },
    {
      year: "2020",
      title: "Started Blogging",
      description: "Began writing technical articles and tutorials to help other developers."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Hero Section */}
     <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Profile Picture */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-68 h-98 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl shadow-red-500/100">
                  <Image
                    src="/rafi.jpg" // Replace with your actual profile image
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
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                 Rafi Kabir
                </h2>
                <p className="text-xl text-red-600 dark:text-red-400 font-semibold mb-2">
                  Full Stack Developer & Technical Writer
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Passionate developer with 5+ years of experience in building modern web applications. 
                  I love sharing knowledge through blog posts and creating innovative solutions with React, Next.js, and Node.js.
                </p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Mail className="h-5 w-5 text-red-500" />
                  <span className="text-gray-700 dark:text-gray-300">rafikabir05.rk@gmail.com</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Phone className="h-5 w-5 text-red-500" />
                  <span className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span className="text-gray-700 dark:text-gray-300">Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Calendar className="h-5 w-5 text-red-500" />
                  <span className="text-gray-700 dark:text-gray-300">Available for Projects</span>
                </div>
              </div>

              {/* Skills/Technologies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Technologies & Skills
                </h3>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {["React", "Next.js", "Node.js", "Sass", "MongoDB", "Tailwind CSS", "Python", "Mechine Learning"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-600 dark:bg-blue-600 text-red-100 dark:text-red-100 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/cv/John_Doe_CV.pdf" // Replace with your actual CV path
                  download="John_Doe_CV.pdf"
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-800 hover:bg-red-900 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download CV
                </a>
                
                <div className="flex space-x-3">
                  <a
                    href="https://github.com/your-username" // Replace with your GitHub
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-3 hover:text-purple-700 hover:bg-transparent bg-purple-700 p-2 text-white rounded-lg transition-colors duration-200"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/your-profile" // Replace with your LinkedIn
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-3 hover:text-blue-500 hover:bg-transparent bg-blue-500 p-2 text-white rounded-lg transition-colors duration-200"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-4 py-3 hover:text-red-600 hover:bg-transparent bg-red-600 p-2 text-white rounded-lg transition-colors duration-200"
                  >
                    <Mail className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">5+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">100+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">Blog Posts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">10K+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">Readers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              I&apos;m a developer who believes in the power of technology to solve real-world problems 
              and create meaningful experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">My Journey</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                With over 5 years of experience in web development, I&apos;ve had the privilege of working 
                with startups, Fortune 500 companies, and everything in between. My journey began with 
                a simple HTML page and has evolved into building complex, scalable applications that 
                serve millions of users.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I&apos;m passionate about clean code, user experience, and the latest web technologies. 
                When I&apos;m not coding, you&apos;ll find me writing technical articles, contributing to open 
                source projects, or mentoring aspiring developers.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Available for freelance</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Skills & Expertise</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Achievements</h2>
            <p className="text-lg text-muted-foreground">
              Some milestones I&apos;m proud of in my journey as a developer.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600">
                  {achievement.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{achievement.title}</h3>
                <p className="text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What I Stand For</h2>
            <p className="text-lg text-muted-foreground">
              The principles and values that guide my work and interactions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">My Journey</h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in my development career.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-orange-600"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className={`relative flex items-center mb-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                <div className={`w-full md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <div className="bg-card border border-border rounded-lg p-6 shadow-lg ml-8 md:ml-0">
                    <div className="text-orange-600 font-bold text-lg mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-3 h-3 bg-orange-600 rounded-full border-4 border-background"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  )
}

export default About

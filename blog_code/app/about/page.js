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
      title: "500+ Projects",
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Hey, I'm{" "}
                <span className="text-orange-600">Alex</span>
                <span className="text-orange-600 text-5xl md:text-6xl lg:text-7xl">.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                A passionate <span className="text-orange-600 font-semibold">Full Stack Developer</span> and 
                <span className="text-orange-600 font-semibold"> Open Source Advocate</span> who loves 
                building amazing web experiences and sharing knowledge with the community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="#contact"
                  className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                >
                  Get In Touch
                </Link>
                <Link 
                  href="/blog"
                  className="border border-orange-600 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-600 hover:text-white transition-colors font-semibold"
                >
                  Read My Blog
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20 absolute -top-4 -left-4"></div>
                <div className="w-72 h-72 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center relative">
                  <Code className="w-32 h-32 text-orange-600" />
                </div>
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
              I'm a developer who believes in the power of technology to solve real-world problems 
              and create meaningful experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">My Journey</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                With over 5 years of experience in web development, I've had the privilege of working 
                with startups, Fortune 500 companies, and everything in between. My journey began with 
                a simple HTML page and has evolved into building complex, scalable applications that 
                serve millions of users.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I'm passionate about clean code, user experience, and the latest web technologies. 
                When I'm not coding, you'll find me writing technical articles, contributing to open 
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
              Some milestones I'm proud of in my journey as a developer.
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

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-xl text-white/90 mb-8">
            I'm always excited to work on new projects and collaborate with fellow developers.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Link 
              href="mailto:alex@codeblog.dev"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email Me
            </Link>
            <Link 
              href="https://github.com/alexdev"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </Link>
            <Link 
              href="https://twitter.com/alexdev"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </Link>
            <Link 
              href="https://linkedin.com/in/alexdev"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </Link>
          </div>
          
          <div className="text-white/80">
            <p className="mb-2">Currently available for:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/10 px-3 py-1 rounded-full">Freelance Projects</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">Technical Consulting</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">Speaking Engagements</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">Open Source Collaboration</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

import React from 'react'
import Link from 'next/link'
import { 
  Github, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  Download, 
  MapPin, 
  Calendar,
  Code,
  Briefcase,
  Award,
  Star
} from 'lucide-react'
import "../app/globals.css"

const Contactme = () => {
  const skills = [
    { name: 'JavaScript', level: 90, color: 'bg-yellow-500' },
    { name: 'React', level: 85, color: 'bg-blue-500' },
    { name: 'Next.js', level: 80, color: 'bg-gray-800' },
    { name: 'Python', level: 58, color: 'bg-green-500' },
    { name: 'Node.js', level: 82, color: 'bg-green-600' },
    { name: 'My SQL', level: 75, color: 'bg-blue-600' },
    { name: 'CSS/Tailwind', level: 90, color: 'bg-blue-400' },
    { name: 'MongoDB', level: 78, color: 'bg-green-700' }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/your-username',
      icon: Github,
      color: 'hover:text-purple-500 bg-purple-500/10 hover:bg-purple-500/20',
      bgColor: 'bg-purple-500'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/your-profile',
      icon: Linkedin,
      color: 'hover:text-blue-500 bg-blue-500/10 hover:bg-blue-500/20',
      bgColor: 'bg-blue-500'
    },
    {
      name: 'Email',
      href: 'mailto:rafikabir05.rk@gmail.com',
      icon: Mail,
      color: 'hover:text-red-500 bg-red-500/10 hover:bg-red-500/20',
      bgColor: 'bg-red-500'
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/+1234567890',
      icon: MessageCircle,
      color: 'hover:text-green-500 bg-green-500/10 hover:bg-green-500/20',
      bgColor: 'bg-green-500'
    }
  ]

  const downloadCV = () => {
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = '/cv/Rafi kaber CV.pdf' // Make sure to add your CV file to public/cv/
    link.download = 'Rafi kaber CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-60 h-60 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-r from-purple-400/15 to-blue-400/15 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative container mx-auto px-6 py-20">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl scale-110"></div>
            <img
              src="/rafi.jpg"
              alt="Md. Rafi Kabir"
              className="relative w-32 h-32 md:w-70 md:h-90 object-cover rounded-full mx-auto border-4 border-white/50 dark:border-white/20 shadow-2xl shadow-blue-500/20"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mt-8 mb-4">
            Md. Rafi Kabir
          </h1>
          
          <div className="inline-flex items-center px-6 py-3 glass rounded-full shadow-lg shadow-blue-500/20 mb-6">
            <Code className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Computer Science Engineer</span>
          </div>
          
          <p className="text-lg text-black dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Passionate full-stack developer crafting innovative digital experiences with modern technologies. 
            Transforming ideas into reality through clean, efficient, and scalable code.
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={downloadCV}
            className="group glass px-6 py-3 rounded-2xl hover:blue-glow transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <Download className="h-5 w-5 group-hover:animate-bounce" />
              <span className="font-semibold">Download CV</span>
            </div>
          </button>
          
          <div className="flex items-center space-x-2 glass px-4 py-3 rounded-2xl shadow-lg shadow-blue-500/20">
            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-black dark:text-gray-300">Dhaka, Bangladesh</span>
          </div>
        </div>

        {/* Main Content Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column - About & Social */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* About Card */}
            <div className="glass-ultra p-6 rounded-2xl shadow-2xl shadow-blue-500/10 h-fit">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                About Me
              </h3>
              <p className="text-black dark:text-gray-300 text-sm leading-relaxed">
                I'm a passionate Computer Science Engineer who loves creating innovative digital solutions. 
                My expertise spans across modern web technologies with a focus on user experience and clean architecture.
              </p>
            </div>

            {/* Social Links Card */}
            <div className="glass-ultra p-6 rounded-2xl shadow-2xl shadow-blue-500/10">
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`glass p-4 rounded-xl ${social.color} transition-all duration-300 transform hover:scale-105 flex flex-col items-center space-y-2 group`}
                      aria-label={social.name}
                    >
                      <IconComponent className="h-6 w-6" />
                      <span className="text-xs font-medium">{social.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Stats Card */}
            <div className="glass-ultra p-6 rounded-2xl shadow-2xl shadow-blue-500/10">
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-black dark:text-gray-300">Projects Completed</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">25+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black dark:text-gray-300">Years Experience</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">3+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black dark:text-gray-300">Technologies</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">15+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Skills & Experience */}
          <div className="xl:col-span-8 space-y-6">
            
            {/* Skills Card */}
            <div className="glass-ultra p-8 rounded-2xl shadow-2xl shadow-blue-500/10">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 flex items-center">
                <Code className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                Technical Skills
              </h3>
              
              {/* Skills Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-black dark:text-white font-semibold">{skill.name}</span>
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`${skill.color} h-3 rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse`}
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience & Education Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Experience Card */}
              <div className="glass-ultra p-6 rounded-2xl shadow-2xl shadow-blue-500/10">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="glass p-2 rounded-lg blue-glow">
                    <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-xl font-bold text-black dark:text-white">Experience</h4>
                </div>
                
                <div className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-blue-400/50">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    <h5 className="font-semibold text-black dark:text-white">Full Stack Developer</h5>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">2023 - Present</p>
                    <p className="text-xs text-black dark:text-gray-300">
                      Developing modern web applications using React, Next.js, and Node.js with focus on performance and user experience.
                    </p>
                  </div>
                  
                  <div className="relative pl-6 border-l-2 border-blue-400/50">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-400 rounded-full border-2 border-white dark:border-gray-900"></div>
                    <h5 className="font-semibold text-black dark:text-white">Frontend Developer</h5>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">2022 - 2023</p>
                    <p className="text-xs text-black dark:text-gray-300">
                      Created responsive and interactive user interfaces with modern JavaScript frameworks.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Card */}
              <div className="glass-ultra p-6 rounded-2xl shadow-2xl shadow-blue-500/10">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="glass p-2 rounded-lg blue-glow">
                    <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-xl font-bold text-black dark:text-white">Education</h4>
                </div>
                
                <div className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-blue-400/50">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    <h5 className="font-semibold text-black dark:text-white">B.Sc. Computer Science</h5>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">2020 - 2024</p>
                    <p className="text-xs text-black dark:text-gray-300">
                      Specialized in Software Engineering and Web Technologies with focus on modern development practices.
                    </p>
                  </div>
                  
                  <div className="relative pl-6 border-l-2 border-blue-400/50">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-400 rounded-full border-2 border-white dark:border-gray-900"></div>
                    <h5 className="font-semibold text-black dark:text-white">Certifications</h5>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">2021 - 2023</p>
                    <p className="text-xs text-black dark:text-gray-300">
                      Multiple certifications in React, Node.js, and Cloud Technologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contactme
import React from 'react';
import Image from 'next/image';

const RepositoryCard = ({ repository }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: 'from-yellow-400 to-yellow-500',
      TypeScript: 'from-blue-400 to-blue-500',
      Python: 'from-green-400 to-green-500',
      Vue: 'from-emerald-400 to-emerald-500',
      React: 'from-cyan-400 to-cyan-500',
      Node: 'from-lime-400 to-lime-500'
    };
    return colors[language] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="glass-ultra rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 group animate-slide-in border border-blue-200/30 dark:border-blue-400/20 bg-white/30 dark:bg-black/20">
      {/* Image */}
      {repository.imageUrl && (
        <div className="relative w-full h-52 mb-6 rounded-xl overflow-hidden shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
          <Image
            src={repository.imageUrl}
            alt={repository.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized
          />
        </div>
      )}
      
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-black dark:text-white flex-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {repository.name}
          </h3>
          <div className="flex gap-3 ml-3">
            {repository.githubUrl && (
              <a
                href={repository.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass hover:bg-gray-500/20 dark:hover:bg-gray-400/20 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/30"
                title="View on GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {repository.liveUrl && (
              <a
                href={repository.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 text-blue-700 dark:text-blue-300 rounded-xl border border-blue-300/50 dark:border-blue-400/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                title="View Live Demo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {repository.description}
        </p>
        
        {/* Technologies */}
        {repository.technologies && repository.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {repository.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300 text-xs rounded-full border border-purple-300/50 dark:border-purple-400/50 backdrop-blur-sm hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        {/* Stats and Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-blue-200/30 dark:border-blue-400/20">
          <div className="flex items-center gap-4">
            {repository.language && (
              <div className="flex items-center gap-2 glass px-3 py-1 rounded-full">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getLanguageColor(repository.language)} animate-pulse`}></div>
                <span className="font-medium">{repository.language}</span>
              </div>
            )}
            {repository.stars !== undefined && (
              <div className="flex items-center gap-2 glass px-3 py-1 rounded-full hover:shadow-yellow-500/30 transition-all duration-300">
                <svg className="w-4 h-4 text-yellow-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="font-medium">{repository.stars}</span>
              </div>
            )}
            {repository.forks !== undefined && (
              <div className="flex items-center gap-2 glass px-3 py-1 rounded-full hover:shadow-green-500/30 transition-all duration-300">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
                <span className="font-medium">{repository.forks}</span>
              </div>
            )}
          </div>
          {repository.lastUpdate && (
            <span className="text-blue-600 dark:text-blue-400 font-medium">Updated {formatDate(repository.lastUpdate)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ContributionGraph from './ContributionGraph';

interface Repo {
  name: string;
  description: string;
  language: string;
  stars: number;
  updated: string;
  url: string;
  private?: boolean;
}

interface GitHubData {
  repos: Repo[];
  contributions?: Record<string, number>;
  totalContributions?: number;
  error?: string;
}

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubData>({ repos: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const response = await fetch('/api/github');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setData({ repos: [], error: 'Failed to load GitHub activity' });
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f1e05a',
      'Python': '#3572A5',
      'React': '#61dafb',
      'CSS': '#563d7c',
      'HTML': '#e34c26',
      'Java': '#b07219',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'Swift': '#fa7343'
    };
    return colors[language] || '#6b7280';
  };

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[var(--foreground)] text-center">What I've Been Building</h2>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12 overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[var(--foreground)] text-center">What I've Been Building</h2>

      {/* GitHub Contribution Graph */}
      <div className="mb-12 flex justify-center w-full">
        <div className="bg-[var(--card)] rounded-xl shadow-lg p-4 sm:p-6 border-2 border-[var(--accent)] overflow-hidden w-full max-w-4xl">
          <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-[var(--foreground)] text-center">GitHub Contribution Activity</h3>
          <ContributionGraph
            contributions={data.contributions || {}}
            totalContributions={data.totalContributions || 0}
          />
        </div>
      </div>

      {/* Repositories */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {data.repos.map((repo) => (
            <div key={repo.name} className="rounded-xl shadow-lg p-4 sm:p-6 bg-[var(--card)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors group flex flex-col min-h-[180px] w-full">
              <div className="flex items-start justify-between mb-3 gap-2">
                <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--highlight)] transition-colors break-words min-w-0 flex-1">
                  <Link href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {repo.name}
                  </Link>
                </h3>
                {repo.stars > 0 && (
                  <span className="flex items-center text-sm text-[var(--accent)] shrink-0">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {repo.stars}
                  </span>
                )}
              </div>

              {repo.description && (
                <p className="text-[var(--accent)] text-sm mb-3 line-clamp-2 flex-1">
                  {repo.description}
                </p>
              )}

              <div className="flex items-center justify-between text-sm flex-wrap gap-2 mt-auto">
                {repo.language && (
                  <div className="flex items-center shrink-0">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    />
                    <span className="text-[var(--accent)] truncate">{repo.language}</span>
                  </div>
                )}
                <span className="text-[var(--accent)] opacity-75 text-xs sm:text-sm shrink-0">
                  {formatDate(repo.updated)}
                </span>
              </div>
            </div>
          ))}
        </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <Link
          href="https://github.com/briansproule20"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-[var(--highlight)] text-[var(--foreground)] rounded-full font-semibold shadow hover:bg-[var(--accent)] transition"
        >
          View All on GitHub
        </Link>
      </div>
    </section>
  );
}
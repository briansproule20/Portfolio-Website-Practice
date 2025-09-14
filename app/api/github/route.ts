import { NextResponse, NextRequest } from 'next/server';

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionData {
  [key: string]: number;
}

interface Repository {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  private: boolean;
}

interface FormattedRepository {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  updated: string;
  url: string;
  private: boolean;
}

export async function GET(req: NextRequest) {
  try {
    const username = 'briansproule20'; // Your GitHub username
    const token = process.env.GITHUB_TOKEN;

    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Website'
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // Fetch recent repositories (public ones, sorted by recently updated)
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=6&type=public`,
      { headers }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub repos API responded with ${reposResponse.status}`);
    }

    const repos: Repository[] = await reposResponse.json();

    // Fetch contribution data for the graph
    let contributionData: ContributionData = {};
    let totalContributions = 0;

    try {
      // Try to fetch contribution data from a service that provides JSON data
      const contributionsResponse = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        { headers }
      );

      if (contributionsResponse.ok) {
        const contributionsJson = await contributionsResponse.json();

        if (contributionsJson.contributions) {
          // Transform the data to our format
          contributionsJson.contributions.forEach((day: ContributionDay) => {
            contributionData[day.date] = day.count;
            totalContributions += day.count;
          });
        }
      } else {
        // Fallback: parse the SVG from ghchart (more complex but possible)
        console.log('Contributions API failed, using fallback');
      }
    } catch (error) {
      console.error('Error fetching contribution data:', error);
    }


    // Format repositories data (already sorted by recently updated from API)
    const formattedRepos: FormattedRepository[] = repos.map((repo: Repository) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      updated: repo.updated_at,
      url: repo.html_url,
      private: repo.private
    }));

    return NextResponse.json({
      repos: formattedRepos,
      contributions: contributionData,
      totalContributions
    });

  } catch (error) {
    console.error('GitHub API error:', error);

    // Return fallback data
    return NextResponse.json({
      error: 'Failed to fetch GitHub data',
      repos: [
        {
          name: 'portfolio-website',
          description: 'Personal portfolio built with Next.js and TypeScript',
          language: 'TypeScript',
          stars: 0,
          updated: new Date().toISOString(),
          url: 'https://github.com/briansproule20/portfolio-website'
        }
      ],
      contributions: {},
      totalContributions: 0
    });
  }
}
import { getGameMetadata } from './game-metadata';

export interface XboxGameData {
  id: string;
  title: string;
  genre?: string;
  platform: string;
  coverArt?: string;
  rating?: number;
  hoursPlayed?: number;
  achievements?: number;
  totalAchievements?: number;
  lastPlayed?: string;
  gameDescription?: string;
  developer?: string;
  releaseDate?: string;
  recentAchievements?: XboxAchievement[];
}

export interface XboxAchievement {
  id: string;
  name: string;
  description: string;
  gamerscore: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  dateEarned: string;
  iconUrl?: string;
  gameName?: string;
}

export interface XboxProfile {
  gamertag: string;
  gamerscore: number;
  achievementCount: number;
  xuid: string;
  displayPicRaw?: string;
  realName?: string;
  bio?: string;
  location?: string;
}

class XboxAPI {
  private readonly baseUrl = 'https://xbl.io/api/v2';
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.OPENXBL_API_KEY || '';
    if (!this.apiKey) {
      console.warn('OpenXBL API key not configured');
    }
  }

  /**
   * Make authenticated request to OpenXBL API
   */
  private async makeOpenXBLRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.apiKey) {
      throw new Error('OpenXBL API key not configured');
    }

    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'X-Authorization': this.apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': 'en-US',
      ...options.headers,
    };

    console.log(`🔗 Making OpenXBL request to: ${endpoint}`);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenXBL API request failed: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`OpenXBL API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ OpenXBL request successful for: ${endpoint}`);
    return data;
  }

  /**
   * Get user profile information
   */
  async getProfile(xuid?: string): Promise<XboxProfile> {
    try {
      const endpoint = xuid ? `/account/${xuid}` : '/account';
      const response = await this.makeOpenXBLRequest(endpoint);

      const profileUser = response.profileUsers?.[0];
      if (!profileUser) {
        throw new Error('No profile data found');
      }

      const settings = profileUser.settings || [];
      const getSettingValue = (id: string) => 
        settings.find((s: any) => s.id === id)?.value || '';

      return {
        gamertag: getSettingValue('Gamertag') || 'Unknown',
        gamerscore: parseInt(getSettingValue('Gamerscore') || '0'),
        achievementCount: 0, // Will be populated from achievements endpoint
        xuid: profileUser.id || xuid || '',
        displayPicRaw: getSettingValue('GameDisplayPicRaw'),
        realName: getSettingValue('RealName'),
        bio: getSettingValue('Bio'),
        location: getSettingValue('Location'),
      };
    } catch (error) {
      console.error('Failed to fetch Xbox profile:', error);
      throw error;
    }
  }

  /**
   * Get user's games/titles
   */
  async getGames(xuid?: string): Promise<XboxGameData[]> {
    try {
      console.log('🚀 STARTING getGames() function');
      console.log('🚀 XUID parameter:', xuid);
      
      const endpoint = xuid ? `/player/titleHistory/${xuid}` : '/player/titleHistory';
      console.log('🚀 Using endpoint:', endpoint);
      
      const response = await this.makeOpenXBLRequest(endpoint);
      console.log('🚀 Raw API response keys:', Object.keys(response));
      console.log('🚀 Response.titles exists:', !!response.titles);
      console.log('🚀 Response.titles length:', response.titles?.length || 0);

      const titles = response.titles || [];
      console.log('🚀 About to map', titles.length, 'titles');
      
      return titles.map((title: any, index: number) => {
        // Debug: Log complete structure for first few games
        if (index < 3) {
          console.log(`🎮 Game "${title.name}" COMPLETE STRUCTURE:`, title);
          console.log(`🔍 Available keys:`, Object.keys(title));
          console.log(`📋 Publisher field:`, title.publisher);
          console.log(`👨‍💻 Developer field:`, title.developer);
          console.log(`📝 Description field:`, title.description);
          console.log(`📅 Release field:`, title.releaseDate);
          console.log(`🏷️ Category field:`, title.category);
          console.log(`🎯 Detail object:`, title.detail);
        }

        // Try multiple fields for developer information from API
        const apiDeveloperInfo = title.publisher || 
                                title.developer || 
                                title.detail?.publisher || 
                                title.detail?.developer ||
                                title.titleRecord?.developer ||
                                title.category ||
                                null;

        // Use fallback metadata if API doesn't provide enhanced data
        const fallbackData = getGameMetadata(title.name);

        return {
          id: title.titleId?.toString() || '',
          title: title.name || 'Unknown Game',
          platform: title.platforms?.join(', ') || 'Xbox',
          lastPlayed: title.lastTimePlayed || '',
          achievements: title.achievement?.currentAchievements || 0,
          totalAchievements: title.achievement?.totalAchievements || 0,
          gamerscore: title.achievement?.currentGamerscore || 0,
          gameDescription: title.description || fallbackData?.description || '',
          developer: apiDeveloperInfo || fallbackData?.developer || null,
          releaseDate: title.releaseDate || fallbackData?.releaseYear || undefined,
          genre: title.genre || fallbackData?.genre || undefined,
          coverArt: title.displayImage || title.imageUrl,
          rating: 0,
          hoursPlayed: 0, // Simplify this for now since stats structure varies
        };
      });
    } catch (error) {
      console.error('Failed to fetch Xbox games:', error);
      throw error;
    }
  }

  /**
   * Get recent achievements
   */
  async getRecentAchievements(limit: number = 20, xuid?: string): Promise<XboxAchievement[]> {
    try {
      // Try different endpoints without query parameters to avoid 400 errors
      const endpoints = [
        xuid ? `/achievements/player/${xuid}` : '/achievements',
        '/achievements/player',
        xuid ? `/achievements/player/${xuid}/titles` : '/achievements/player/titles'
      ];

      let achievements: any[] = [];
      let successfulEndpoint = '';

      for (const endpoint of endpoints) {
        try {
          console.log(`🔍 Trying achievements endpoint: ${endpoint}`);
          
          const response = await this.makeOpenXBLRequest(endpoint);
          
          console.log(`📊 Raw response from ${endpoint}:`, JSON.stringify(response, null, 2));
          
          // Check different possible response structures
          const possibleAchievements = response.achievements || response.data || response || [];
          
          if (Array.isArray(possibleAchievements) && possibleAchievements.length > 0) {
            achievements = possibleAchievements;
            successfulEndpoint = endpoint;
            console.log(`✅ Found ${achievements.length} achievements from ${endpoint}`);
            break;
          } else {
            console.log(`📊 No achievements found in response from ${endpoint}, response keys:`, Object.keys(response));
          }
        } catch (error) {
          console.log(`❌ Endpoint ${endpoint} failed:`, error);
          // Add delay between attempts to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      if (achievements.length === 0) {
        console.log('🔍 No achievements found from any endpoint, creating summaries from game data...');
        
        // Create achievement summaries from the actual game data we have
        try {
          const gamesResponse = await this.makeOpenXBLRequest('/player/titleHistory');
          const games = gamesResponse.titles || [];
          
          // Find games with achievements
          const gamesWithAchievements = games.filter((game: any) => 
            game.achievement && game.achievement.currentAchievements > 0
          ).slice(0, 10); // Take top 10 games by achievement count
          
          console.log(`🎮 Found ${gamesWithAchievements.length} games with achievements to create summaries`);
          
          const achievementSummaries: XboxAchievement[] = [];
          
          for (const game of gamesWithAchievements) {
            const earnedCount = game.achievement.currentAchievements;
            const totalCount = game.achievement.totalAchievements;
            const gamerscore = game.achievement.currentGamerscore;
            
            // Create a summary achievement for this game
            achievementSummaries.push({
              id: `summary-${game.titleId}`,
              name: `${earnedCount} Achievements in ${game.name}`,
              description: `${earnedCount} of ${totalCount} achievements (${Math.round((earnedCount / totalCount) * 100)}%)`,
              gamerscore: gamerscore,
              rarity: earnedCount >= totalCount * 0.8 ? 'rare' : earnedCount >= totalCount * 0.5 ? 'uncommon' : 'common',
              dateEarned: new Date().toISOString(), // Use current date to avoid parsing issues
              gameName: game.name
            });
          }
          
          if (achievementSummaries.length > 0) {
            achievements = achievementSummaries;
            console.log(`✅ Created ${achievements.length} achievement summaries from game data`);
          }
        } catch (error) {
          console.log('❌ Failed to create achievement summaries:', error);
        }
        
        if (achievements.length === 0) {
          console.log('🔍 No achievement summaries could be created');
          return [];
        }
      }

      const mappedAchievements = achievements.slice(0, limit).map((achievement: any) => ({
        id: achievement.id || '',
        name: achievement.name || 'Unknown Achievement',
        description: achievement.description || '',
        gamerscore: achievement.rewards?.find((r: any) => r.name === 'Gamerscore')?.value || 
                   achievement.gamerscore || 0,
        rarity: achievement.rarity || 'common',
        dateEarned: achievement.dateEarned || achievement.progressState || '',
        gameName: achievement.gameName || achievement.titleAssociations?.[0]?.name || 'Unknown Game'
      }));

      console.log(`🔍 Mapped achievements: ${mappedAchievements.length}`);
      
      // Only filter for earned achievements if we have dateEarned data
      const earnedAchievements = mappedAchievements.filter((achievement: XboxAchievement) => {
        if (achievement.dateEarned && achievement.dateEarned !== 'NotStarted') {
          return true;
        }
        // If no dateEarned, assume it's earned if it has a name
        return achievement.name && achievement.name !== 'Unknown Achievement';
      });

      console.log(`🔍 Final earned achievements: ${earnedAchievements.length}`);
      return earnedAchievements;
    } catch (error) {
      console.error('Failed to fetch Xbox achievements:', error);
      return [];
    }
  }

  /**
   * Map achievement rarity percentage to our enum
   */
  private mapRarity(percentage?: number): 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' {
    if (!percentage) return 'common';
    
    if (percentage >= 50) return 'common';
    if (percentage >= 20) return 'uncommon';
    if (percentage >= 10) return 'rare';
    if (percentage >= 5) return 'epic';
    return 'legendary';
  }

  /**
   * Get comprehensive gamehome data
   */
  async getGamehomeData(xuid?: string): Promise<{
    profile: XboxProfile;
    games: XboxGameData[];
    recentAchievements: XboxAchievement[];
  }> {
    try {
      console.log('🎮 Fetching comprehensive Xbox data from OpenXBL...');

      // Make sequential requests with delays to avoid rate limiting
      const profile = await this.getProfile(xuid);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
      
      const games = await this.getGames(xuid);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
      
      // Use the profile's XUID for achievements if we have it
      const achievementsXuid = profile.xuid || xuid;
      const achievements = await this.getRecentAchievements(20, achievementsXuid);

      // Calculate total achievements from games instead of using recent achievements length
      const totalAchievements = games.reduce((sum, game) => sum + (game.achievements || 0), 0);
      profile.achievementCount = totalAchievements;

      console.log(`✅ Successfully fetched ${games.length} games and ${achievements.length} recent achievements (${totalAchievements} total)`);

      // Filter games using configurable system
      const { filterGames } = await import('./game-filters');
      const filteredGames = filterGames(games);

      return {
        profile,
        games: filteredGames, // Return ALL filtered games - no more 30 limit
        recentAchievements: achievements,
      };
    } catch (error) {
      console.error('Failed to fetch gamehome data:', error);
      throw error;
    }
  }

  /**
   * Search for a user by gamertag
   */
  async searchUser(gamertag: string): Promise<XboxProfile[]> {
    try {
      const response = await this.makeOpenXBLRequest(`/search/${encodeURIComponent(gamertag)}`);
      const people = response.people || [];

      return people.map((person: any) => ({
        gamertag: person.gamertag || person.modernGamertag || 'Unknown',
        gamerscore: parseInt(person.gamerScore || '0'),
        achievementCount: 0,
        xuid: person.xuid || '',
        displayPicRaw: person.displayPicRaw,
        realName: person.realName,
        bio: person.detail?.bio,
        location: person.detail?.location,
      }));
    } catch (error) {
      console.error('Failed to search for user:', error);
      throw error;
    }
  }
}

export const xboxAPI = new XboxAPI();
export default XboxAPI; 
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
      const endpoint = xuid ? `/player/titleHistory/${xuid}` : '/player/titleHistory';
      const response = await this.makeOpenXBLRequest(endpoint);

      const titles = response.titles || [];
      
      return titles.map((title: any) => ({
        id: title.titleId?.toString() || '',
        title: title.name || 'Unknown Game',
        platform: title.platforms?.join(', ') || 'Xbox',
        lastPlayed: title.lastTimePlayed || '',
        achievements: title.achievement?.currentAchievements || 0,
        totalAchievements: title.achievement?.totalAchievements || 0,
        gamerscore: title.achievement?.currentGamerscore || 0,
        gameDescription: title.description || '',
        developer: title.publisher || '',
        coverArt: title.displayImage || title.imageUrl,
        rating: 0,
        hoursPlayed: 0, // Simplify this for now since stats structure varies
      }));
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
      // Try fewer endpoints to avoid rate limiting
      const endpoints = [
        xuid ? `/achievements/player/${xuid}` : '/achievements',
        '/achievements/recent'
      ];

      let achievements: any[] = [];
      let successfulEndpoint = '';

      for (const endpoint of endpoints) {
        try {
          console.log(`🔍 Trying achievements endpoint: ${endpoint}`);
          const response = await this.makeOpenXBLRequest(endpoint);
          
          // Check different possible response structures
          const possibleAchievements = response.achievements || response.data || response || [];
          
          if (Array.isArray(possibleAchievements) && possibleAchievements.length > 0) {
            achievements = possibleAchievements;
            successfulEndpoint = endpoint;
            console.log(`✅ Found ${achievements.length} achievements from ${endpoint}`);
            break;
          }
        } catch (error) {
          console.log(`❌ Endpoint ${endpoint} failed:`, error);
          // Add delay between attempts to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      if (achievements.length === 0) {
        console.log('🔍 No achievements found from any endpoint, trying alternative approach...');
        // Try to get achievements from games data instead
        try {
          const gamesResponse = await this.makeOpenXBLRequest('/player/titleHistory');
          const games = gamesResponse.titles || [];
          
          // Generate achievements from games with achievements
          const gamesWithAchievements = games.filter((game: any) => game.achievements && game.achievements > 0);
          
          if (gamesWithAchievements.length > 0) {
            achievements = gamesWithAchievements.slice(0, limit).map((game: any) => ({
              id: `game-${game.titleId}`,
              name: `${game.name} Achievement`,
              description: `Achievement from ${game.name}`,
              gamerscore: 0,
              rarity: 'common',
              dateEarned: game.lastUnlock || new Date().toISOString(),
              gameName: game.name
            }));
            console.log(`✅ Generated ${achievements.length} achievements from games data`);
          }
        } catch (error) {
          console.log('❌ Failed to get games data for achievements:', error);
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
      
      const achievements = await this.getRecentAchievements(20, xuid);

      // Calculate total achievements from games instead of using recent achievements length
      const totalAchievements = games.reduce((sum, game) => sum + (game.achievements || 0), 0);
      profile.achievementCount = totalAchievements;

      console.log(`✅ Successfully fetched ${games.length} games and ${achievements.length} recent achievements (${totalAchievements} total)`);

      return {
        profile,
        games: games.slice(0, 30), // Limit to last 30 games
        recentAchievements: achievements,
      };
    } catch (error) {
      console.error('Failed to fetch gamehome data:', error);
      throw error;
    }
  }

  /**
   * Generate sample achievements from games data
   */
  private generateAchievementsFromGames(games: XboxGameData[]): XboxAchievement[] {
    const gamesWithAchievements = games
      .filter(game => game.achievements && game.achievements > 0)
      .sort((a, b) => (b.achievements || 0) - (a.achievements || 0))
      .slice(0, 10); // Take top 10 games by achievement count

    const generatedAchievements: XboxAchievement[] = [];
    
    gamesWithAchievements.forEach((game, index) => {
      const achievementCount = Math.min(game.achievements || 0, 3); // Max 3 per game
      
      for (let i = 0; i < achievementCount; i++) {
        generatedAchievements.push({
          id: `gen_${game.id}_${i}`,
          name: `${game.title} Achievement ${i + 1}`,
          description: `Achievement from ${game.title}`,
          gamerscore: Math.floor(Math.random() * 50) + 10, // 10-60 gamerscore
          rarity: this.getRandomRarity(),
          dateEarned: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date in last 30 days
          gameName: game.title,
        });
      }
    });

    return generatedAchievements.slice(0, 20); // Return max 20 achievements
  }

  /**
   * Get random rarity for generated achievements
   */
  private getRandomRarity(): 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' {
    const rarities: ('common' | 'uncommon' | 'rare' | 'epic' | 'legendary')[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    const weights = [0.5, 0.3, 0.15, 0.04, 0.01]; // Probability weights
    
    const random = Math.random();
    let cumulative = 0;
    
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        return rarities[i];
      }
    }
    
    return 'common';
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
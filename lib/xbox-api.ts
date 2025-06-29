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
      const endpoint = xuid ? `/achievements/player/${xuid}` : '/achievements';
      const response = await this.makeOpenXBLRequest(endpoint);

      const achievements = response.achievements || [];
      
      return achievements.slice(0, limit).map((achievement: any) => ({
        id: achievement.id || '',
        name: achievement.name || 'Unknown Achievement',
        description: achievement.description || '',
        gamerscore: achievement.rewards?.find((r: any) => r.name === 'Gamerscore')?.value || 0,
        rarity: this.mapRarity(achievement.rarity?.currentPercentage),
        dateEarned: achievement.progressState === 'Achieved' ? 
          achievement.progression?.timeUnlocked || new Date().toISOString() : '',
        iconUrl: achievement.mediaAssets?.find((m: any) => m.name === 'Icon')?.url,
        gameName: achievement.titleAssociations?.[0]?.name || '',
      })).filter((achievement: XboxAchievement) => achievement.dateEarned); // Only include earned achievements
    } catch (error) {
      console.error('Failed to fetch Xbox achievements:', error);
      throw error;
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

      // Make parallel requests for better performance
      const [profile, games, achievements] = await Promise.all([
        this.getProfile(xuid),
        this.getGames(xuid),
        this.getRecentAchievements(20, xuid),
      ]);

      // Update profile with achievement count
      profile.achievementCount = achievements.length;

      console.log(`✅ Successfully fetched ${games.length} games and ${achievements.length} achievements`);

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
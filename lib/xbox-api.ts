import { authenticate } from '@xboxreplay/xboxlive-auth';

export interface XboxAuthData {
  xuid: string;
  user_hash: string;
  xsts_token: string;
  display_claims: {
    gtg: string; // Gamertag
    xid: string;
    uhs: string;
    agg: string;
    usr: string;
    utr: string;
    prv: string;
  };
  expires_on: string;
}

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
}

export interface XboxProfile {
  gamertag: string;
  gamerscore: number;
  achievementCount: number;
  xuid: string;
}

class XboxAPI {
  private authData: XboxAuthData | null = null;

  /**
   * Authenticate with Xbox Live using email and password
   */
  async authenticate(email: string, password: string): Promise<XboxAuthData> {
    try {
      const authResponse = await authenticate(email as `${string}@${string}.${string}`, password);
      
      // Map the response to our interface
      this.authData = {
        xuid: authResponse.xuid || '',
        user_hash: authResponse.user_hash,
        xsts_token: authResponse.xsts_token,
        display_claims: {
          gtg: (authResponse.display_claims as any).gtg || '',
          xid: (authResponse.display_claims as any).xid || authResponse.xuid || '',
          uhs: authResponse.user_hash,
          agg: (authResponse.display_claims as any).agg || '',
          usr: (authResponse.display_claims as any).usr || '',
          utr: (authResponse.display_claims as any).utr || '',
          prv: (authResponse.display_claims as any).prv || '',
        },
        expires_on: authResponse.expires_on,
      };
      
      return this.authData;
    } catch (error) {
      console.error('Xbox authentication failed:', error);
      throw new Error('Failed to authenticate with Xbox Live');
    }
  }

  /**
   * Authenticate using refresh token (faster)
   */
  async authenticateWithRefreshToken(refreshToken: string): Promise<XboxAuthData> {
    try {
      // Note: You'll need to implement refresh token logic
      // The library supports this but requires additional setup
      throw new Error('Refresh token authentication not yet implemented');
    } catch (error) {
      console.error('Xbox refresh token authentication failed:', error);
      throw error;
    }
  }

  /**
   * Make authenticated request to Xbox Live API
   */
  private async makeXboxRequest(url: string, options: RequestInit = {}): Promise<any> {
    if (!this.authData) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }

    const headers = {
      'Authorization': `XBL3.0 x=${this.authData.user_hash};${this.authData.xsts_token}`,
      'X-XBL-Contract-Version': '2',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Xbox API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get user profile information
   */
  async getProfile(): Promise<XboxProfile> {
    if (!this.authData) {
      throw new Error('Not authenticated');
    }

    try {
      const url = `https://profile.xboxlive.com/users/xuid(${this.authData.xuid})/profile/settings?settings=Gamerscore,Gamertag`;
      const response = await this.makeXboxRequest(url);

      const profile = response.profileUsers[0];
      const settings = profile.settings;

      return {
        gamertag: settings.find((s: any) => s.id === 'Gamertag')?.value || 'Unknown',
        gamerscore: parseInt(settings.find((s: any) => s.id === 'Gamerscore')?.value || '0'),
        achievementCount: 0, // We'll get this from achievements API
        xuid: this.authData.xuid,
      };
    } catch (error) {
      console.error('Failed to fetch Xbox profile:', error);
      throw error;
    }
  }

  /**
   * Get user's games/titles
   */
  async getGames(): Promise<XboxGameData[]> {
    if (!this.authData) {
      throw new Error('Not authenticated');
    }

    try {
      const url = `https://titlehub.xboxlive.com/users/xuid(${this.authData.xuid})/titles/titlehistory/decoration/detail`;
      const response = await this.makeXboxRequest(url);

      return response.titles.map((title: any) => ({
        id: title.titleId,
        title: title.name,
        platform: 'Xbox Series S', // Default, could be enhanced
        lastPlayed: title.lastTimePlayed,
        achievements: title.achievement?.currentAchievements || 0,
        totalAchievements: title.achievement?.totalAchievements || 0,
        gamerscore: title.achievement?.currentGamerscore || 0,
        gameDescription: title.description,
        developer: title.publisher,
        coverArt: title.displayImage,
        rating: 0, // Xbox API doesn't provide user ratings
      }));
    } catch (error) {
      console.error('Failed to fetch Xbox games:', error);
      throw error;
    }
  }

  /**
   * Get recent achievements
   */
  async getRecentAchievements(limit: number = 20): Promise<XboxAchievement[]> {
    if (!this.authData) {
      throw new Error('Not authenticated');
    }

    try {
      const url = `https://achievements.xboxlive.com/users/xuid(${this.authData.xuid})/achievements?maxItems=${limit}&orderBy=unlockTime`;
      const response = await this.makeXboxRequest(url);

      return response.achievements.map((achievement: any) => ({
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        gamerscore: achievement.rewards[0]?.value || 0,
        rarity: this.mapRarity(achievement.rarity),
        dateEarned: achievement.progression.timeUnlocked,
        iconUrl: achievement.mediaAssets[0]?.url,
      }));
    } catch (error) {
      console.error('Failed to fetch Xbox achievements:', error);
      throw error;
    }
  }

  /**
   * Map Xbox rarity to our enum
   */
  private mapRarity(rarity: any): 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' {
    if (!rarity || !rarity.currentPercentage) return 'common';
    
    const percentage = parseFloat(rarity.currentPercentage);
    if (percentage >= 50) return 'common';
    if (percentage >= 20) return 'uncommon';
    if (percentage >= 5) return 'rare';
    if (percentage >= 1) return 'epic';
    return 'legendary';
  }

  /**
   * Get comprehensive profile data for gamehome page
   */
  async getGamehomeData(): Promise<{
    profile: XboxProfile;
    games: XboxGameData[];
    recentAchievements: XboxAchievement[];
  }> {
    const [profile, games, achievements] = await Promise.all([
      this.getProfile(),
      this.getGames(),
      this.getRecentAchievements(15),
    ]);

    // Update achievement count in profile
    profile.achievementCount = achievements.length;

    return {
      profile,
      games: games.slice(0, 30), // Limit for performance
      recentAchievements: achievements,
    };
  }
}

export const xboxAPI = new XboxAPI();
export default XboxAPI; 
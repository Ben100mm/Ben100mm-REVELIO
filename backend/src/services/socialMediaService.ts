import axios from 'axios';

interface SocialMediaConfig {
  linkedin: {
    clientId: string;
    clientSecret: string;
    accessToken?: string;
  };
  twitter: {
    apiKey: string;
    apiSecret: string;
    accessToken?: string;
    accessTokenSecret?: string;
  };
  instagram: {
    accessToken: string;
  };
}

interface PostData {
  content: string;
  title?: string;
  imageUrl?: string;
  hashtags?: string[];
  platform: 'linkedin' | 'twitter' | 'instagram' | 'tiktok';
}

interface PostResult {
  success: boolean;
  platformId?: string;
  url?: string;
  error?: string;
}

class SocialMediaService {
  private config: SocialMediaConfig;

  constructor() {
    this.config = {
      linkedin: {
        clientId: process.env.LINKEDIN_CLIENT_ID || '',
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
        accessToken: process.env.LINKEDIN_ACCESS_TOKEN || '',
      },
      twitter: {
        apiKey: process.env.TWITTER_API_KEY || '',
        apiSecret: process.env.TWITTER_API_SECRET || '',
        accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
        accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
      },
      instagram: {
        accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || '',
      },
    };
  }

  async postToLinkedIn(postData: PostData): Promise<PostResult> {
    try {
      if (!this.config.linkedin.accessToken) {
        return { success: false, error: 'LinkedIn access token not configured' };
      }

      const response = await axios.post(
        'https://api.linkedin.com/v2/ugcPosts',
        {
          author: `urn:li:person:${process.env.LINKEDIN_PERSON_URN}`,
          lifecycleState: 'PUBLISHED',
          specificContent: {
            'com.linkedin.ugc.ShareContent': {
              shareCommentary: {
                text: postData.content,
              },
              shareMediaCategory: 'NONE',
            },
          },
          visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.linkedin.accessToken}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0',
          },
        }
      );

      return {
        success: true,
        platformId: response.data.id,
        url: `https://linkedin.com/feed/update/${response.data.id}`,
      };
    } catch (error: any) {
      console.error('LinkedIn posting error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'LinkedIn posting failed',
      };
    }
  }

  async postToTwitter(postData: PostData): Promise<PostResult> {
    try {
      if (!this.config.twitter.accessToken || !this.config.twitter.accessTokenSecret) {
        return { success: false, error: 'Twitter credentials not configured' };
      }

      // For Twitter API v2, we would use the new endpoints
      // This is a simplified example - in production, you'd use proper OAuth 1.0a or 2.0
      const response = await axios.post(
        'https://api.twitter.com/2/tweets',
        {
          text: postData.content,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.twitter.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        platformId: response.data.data.id,
        url: `https://twitter.com/user/status/${response.data.data.id}`,
      };
    } catch (error: any) {
      console.error('Twitter posting error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.detail || 'Twitter posting failed',
      };
    }
  }

  async postToInstagram(postData: PostData): Promise<PostResult> {
    try {
      if (!this.config.instagram.accessToken) {
        return { success: false, error: 'Instagram access token not configured' };
      }

      // Instagram Basic Display API for posting
      // Note: This requires additional setup and approval from Facebook
      const response = await axios.post(
        `https://graph.instagram.com/v18.0/me/media`,
        {
          image_url: postData.imageUrl,
          caption: postData.content,
          access_token: this.config.instagram.accessToken,
        }
      );

      // Publish the media
      const publishResponse = await axios.post(
        `https://graph.instagram.com/v18.0/me/media_publish`,
        {
          creation_id: response.data.id,
          access_token: this.config.instagram.accessToken,
        }
      );

      return {
        success: true,
        platformId: publishResponse.data.id,
        url: `https://instagram.com/p/${publishResponse.data.id}`,
      };
    } catch (error: any) {
      console.error('Instagram posting error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Instagram posting failed',
      };
    }
  }

  async postToTikTok(postData: PostData): Promise<PostResult> {
    try {
      // TikTok API integration would go here
      // This requires TikTok for Developers approval and specific API setup
      return {
        success: false,
        error: 'TikTok integration not yet implemented',
      };
    } catch (error: any) {
      console.error('TikTok posting error:', error);
      return {
        success: false,
        error: 'TikTok posting failed',
      };
    }
  }

  async distributeContent(content: string, platforms: string[], metadata?: any): Promise<PostResult[]> {
    const results: PostResult[] = [];

    for (const platform of platforms) {
      const postData: PostData = {
        content,
        platform: platform as any,
        title: metadata?.title,
        imageUrl: metadata?.imageUrl,
        hashtags: metadata?.hashtags,
      };

      let result: PostResult;

      switch (platform.toLowerCase()) {
        case 'linkedin':
          result = await this.postToLinkedIn(postData);
          break;
        case 'twitter':
          result = await this.postToTwitter(postData);
          break;
        case 'instagram':
          result = await this.postToInstagram(postData);
          break;
        case 'tiktok':
          result = await this.postToTikTok(postData);
          break;
        default:
          result = { success: false, error: `Unsupported platform: ${platform}` };
      }

      results.push(result);
    }

    return results;
  }

  async getLinkedInAuthUrl(): Promise<string> {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.config.linkedin.clientId,
      redirect_uri: `${process.env.FRONTEND_URL}/auth/linkedin/callback`,
      scope: 'r_liteprofile r_emailaddress w_member_social',
      state: 'random_state_string',
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  async getTwitterAuthUrl(): Promise<string> {
    // Twitter OAuth 1.0a flow
    // This would require additional setup for the OAuth flow
    return `${process.env.FRONTEND_URL}/auth/twitter`;
  }

  async getInstagramAuthUrl(): Promise<string> {
    const params = new URLSearchParams({
      client_id: process.env.INSTAGRAM_CLIENT_ID || '',
      redirect_uri: `${process.env.FRONTEND_URL}/auth/instagram/callback`,
      scope: 'user_profile,user_media',
      response_type: 'code',
    });

    return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
  }
}

export default new SocialMediaService();

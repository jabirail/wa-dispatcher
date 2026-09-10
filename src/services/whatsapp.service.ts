import axios, { AxiosInstance } from 'axios';

interface WhatsAppConfig {
  apiUrl: string;
  apiKey: string;
}

class WhatsAppService {
  private client: AxiosInstance;
  private config: WhatsAppConfig;

  constructor(config: WhatsAppConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.apiUrl,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get QR code for WhatsApp Web connection
   */
  async getQRCode(): Promise<string> {
    try {
      const response = await this.client.get('/auth/qr');
      return response.data.qrCode;
    } catch (error) {
      console.error('Failed to get QR code:', error);
      throw error;
    }
  }

  /**
   * Get connection status
   */
  async getConnectionStatus(): Promise<boolean> {
    try {
      const response = await this.client.get('/auth/status');
      return response.data.isConnected;
    } catch (error) {
      console.error('Failed to get connection status:', error);
      return false;
    }
  }

  /**
   * Get all groups
   */
  async getGroups() {
    try {
      const response = await this.client.get('/groups');
      return response.data.groups;
    } catch (error) {
      console.error('Failed to fetch groups:', error);
      throw error;
    }
  }

  /**
   * Send message to group
   */
  async sendMessage(groupId: string, message: string): Promise<boolean> {
    try {
      await this.client.post('/messages/send', {
        groupId,
        message,
      });
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }

  /**
   * Send broadcast to multiple groups
   */
  async sendBroadcast(
    groupIds: string[],
    message: string,
    mediaUrl?: string,
  ): Promise<{ successCount: number; failureCount: number }> {
    try {
      const response = await this.client.post('/messages/broadcast', {
        groupIds,
        message,
        mediaUrl,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to send broadcast:', error);
      throw error;
    }
  }

  /**
   * Disconnect WhatsApp
   */
  async disconnect(): Promise<boolean> {
    try {
      await this.client.post('/auth/disconnect');
      return true;
    } catch (error) {
      console.error('Failed to disconnect:', error);
      return false;
    }
  }
}

export default WhatsAppService;

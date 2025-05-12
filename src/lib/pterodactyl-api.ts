
/**
 * NextGen Hosting - Pterodactyl API Integration
 * This file handles communication with the Pterodactyl panel API
 */

export interface PterodactylApiConfig {
  apiUrl: string;
  apiKey: string;
}

export interface ServerCreationParams {
  name: string;
  user: number;
  egg: number;
  docker_image: string;
  startup: string;
  environment: Record<string, string>;
  limits: {
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
  };
  feature_limits: {
    databases: number;
    backups: number;
    allocations: number;
  };
  allocation: {
    default: number;
  };
}

/**
 * Get API configuration from localStorage
 */
export const getApiConfig = (): PterodactylApiConfig => {
  const apiSettings = localStorage.getItem('ngHostingApiSettings');
  if (!apiSettings) {
    throw new Error('API settings not configured');
  }
  
  return JSON.parse(apiSettings);
};

/**
 * Get all servers from the Pterodactyl panel
 */
export const getServers = async (): Promise<any[]> => {
  try {
    const { apiUrl, apiKey } = getApiConfig();
    
    // In production, this would be a real API call
    // For development, we'll simulate getting servers from localStorage
    const storedServers = localStorage.getItem('ngHostingServers');
    
    if (storedServers) {
      return JSON.parse(storedServers);
    }
    
    // Return empty array if no servers found
    return [];
  } catch (error) {
    console.error('Error fetching servers:', error);
    return [];
  }
};

/**
 * Create a new server on the Pterodactyl panel
 */
export const createServer = async (params: ServerCreationParams): Promise<any> => {
  try {
    const { apiUrl, apiKey } = getApiConfig();
    
    console.log('Creating server on Pterodactyl panel:', params);
    
    // In production, this would be a real API call
    // For development, we'll simulate creating a server
    
    // Generate a random ID and IP address
    const newServerId = Math.floor(Math.random() * 10000).toString();
    const ipOctet3 = Math.floor(Math.random() * 255);
    const ipOctet4 = Math.floor(Math.random() * 255);
    
    const newServer = {
      id: newServerId,
      name: params.name,
      status: 'stopped',
      cpu: params.limits.cpu / 100, // Convert percentage to vCores
      ram: params.limits.memory / 1024, // Convert MB to GB
      disk: params.limits.disk / 1024, // Convert MB to GB
      ip: `192.168.${ipOctet3}.${ipOctet4}`,
      created_at: new Date().toISOString(),
    };
    
    // Add to localStorage
    const storedServers = localStorage.getItem('ngHostingServers');
    const servers = storedServers ? JSON.parse(storedServers) : [];
    servers.push(newServer);
    localStorage.setItem('ngHostingServers', JSON.stringify(servers));
    
    return newServer;
  } catch (error) {
    console.error('Error creating server:', error);
    throw new Error('Failed to create server');
  }
};

/**
 * Get all eggs from the Pterodactyl panel
 */
export const getEggs = async (): Promise<any[]> => {
  try {
    const { apiUrl, apiKey } = getApiConfig();
    
    // In production, this would be a real API call
    // For development, we'll return predefined eggs
    return [
      {
        id: 1,
        name: "Minecraft (Java)",
        nest: 1,
        docker_image: "ghcr.io/pterodactyl/yolks:java_17",
      },
      {
        id: 2,
        name: "Paper",
        nest: 1,
        docker_image: "ghcr.io/pterodactyl/yolks:java_17",
      },
      {
        id: 3,
        name: "FiveM",
        nest: 2,
        docker_image: "ghcr.io/pterodactyl/games:fivem",
      },
      {
        id: 4,
        name: "Rust",
        nest: 3,
        docker_image: "ghcr.io/pterodactyl/games:rust",
      },
    ];
  } catch (error) {
    console.error('Error fetching eggs:', error);
    return [];
  }
};

/**
 * Get server power status
 */
export const getServerPowerStatus = async (serverId: string): Promise<string> => {
  try {
    const { apiUrl, apiKey } = getApiConfig();
    
    // In production, this would be a real API call
    // For development, we'll simulate getting server status
    const storedServers = localStorage.getItem('ngHostingServers');
    
    if (storedServers) {
      const servers = JSON.parse(storedServers);
      const server = servers.find((s: any) => s.id === serverId);
      
      if (server) {
        return server.status;
      }
    }
    
    return 'unknown';
  } catch (error) {
    console.error('Error fetching server status:', error);
    return 'unknown';
  }
};

/**
 * Send power action to server
 */
export const sendPowerAction = async (serverId: string, action: 'start' | 'stop' | 'restart'): Promise<boolean> => {
  try {
    const { apiUrl, apiKey } = getApiConfig();
    
    // In production, this would be a real API call
    // For development, we'll simulate power action
    const storedServers = localStorage.getItem('ngHostingServers');
    
    if (storedServers) {
      const servers = JSON.parse(storedServers);
      const serverIndex = servers.findIndex((s: any) => s.id === serverId);
      
      if (serverIndex !== -1) {
        // Update server status
        if (action === 'start') {
          servers[serverIndex].status = 'running';
        } else if (action === 'stop') {
          servers[serverIndex].status = 'stopped';
        } else if (action === 'restart') {
          servers[serverIndex].status = 'running';
        }
        
        localStorage.setItem('ngHostingServers', JSON.stringify(servers));
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error sending power action:', error);
    return false;
  }
};

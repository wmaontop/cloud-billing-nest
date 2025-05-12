
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
 * Sync servers from the Pterodactyl panel and save to localStorage
 */
export const syncServersFromPanel = async (): Promise<boolean> => {
  try {
    const { apiUrl, apiKey } = getApiConfig();
    
    // In a real production environment, this would make an actual API call
    // For development, we'll simulate syncing by generating sample servers
    
    // Generate sample servers based on eggs
    const eggs = await getEggs();
    const servers = [];
    
    for (let i = 0; i < eggs.length; i++) {
      const egg = eggs[i];
      const serverId = `server${i + 1}`;
      const ipOctet3 = Math.floor(Math.random() * 255);
      const ipOctet4 = Math.floor(Math.random() * 255);
      
      servers.push({
        id: serverId,
        name: `${egg.name} Server`,
        status: Math.random() > 0.5 ? 'running' : 'stopped',
        cpu: 1 + Math.floor(Math.random() * 4), // 1-4 cores
        ram: 1 + Math.floor(Math.random() * 8), // 1-8 GB
        disk: 20 + Math.floor(Math.random() * 80), // 20-100 GB
        ip: `192.168.${ipOctet3}.${ipOctet4}`,
        pterodactylId: `ptero-${serverId}`,
        planId: ['starter', 'standard', 'premium'][Math.floor(Math.random() * 3)],
        created_at: new Date().toISOString()
      });
    }
    
    // Save the synchronized servers to localStorage
    localStorage.setItem('ngHostingServers', JSON.stringify(servers));
    
    return true;
  } catch (error) {
    console.error('Error syncing servers from panel:', error);
    return false;
  }
};

/**
 * Get all servers from the Pterodactyl panel
 */
export const getServers = async (): Promise<any[]> => {
  try {
    const { apiUrl, apiKey } = getApiConfig();
    
    // In production, this would be a real API call
    // For development, we'll get servers from localStorage
    const storedServers = localStorage.getItem('ngHostingServers');
    
    if (storedServers) {
      return JSON.parse(storedServers);
    }
    
    // If no servers in localStorage, sync from panel
    await syncServersFromPanel();
    
    const newStoredServers = localStorage.getItem('ngHostingServers');
    return newStoredServers ? JSON.parse(newStoredServers) : [];
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
      pterodactylId: `ptero-${newServerId}`,
      planId: "custom"
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
      {
        id: 5,
        name: "CS:GO",
        nest: 4,
        docker_image: "ghcr.io/pterodactyl/games:source",
      },
      {
        id: 6,
        name: "ARK: Survival Evolved",
        nest: 5,
        docker_image: "ghcr.io/pterodactyl/games:ark",
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

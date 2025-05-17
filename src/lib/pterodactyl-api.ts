
/**
 * NextGen Hosting - Pterodactyl API Integration
 * This file handles communication with the Pterodactyl panel API
 */

// Set the default Pterodactyl panel URL to the one provided by the user
const DEFAULT_PANEL_URL = "http://104.234.107.159";

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
    // If no settings found, create default settings with the provided panel URL
    const defaultSettings = {
      apiUrl: DEFAULT_PANEL_URL,
      apiKey: "ptla_Zmu6YYkofIx0zhZn4BO2WFg7Lvp1X9m1I2lc4rHoOvg"
    };
    
    localStorage.setItem('ngHostingApiSettings', JSON.stringify(defaultSettings));
    return defaultSettings;
  }
  
  return JSON.parse(apiSettings);
};

/**
 * Sync servers from the Pterodactyl panel and save to localStorage
 */
export const syncServersFromPanel = async (): Promise<boolean> => {
  try {
    const { apiUrl, apiKey } = getApiConfig();
    console.log(`Syncing servers from panel at ${apiUrl}`);
    
    // In a real production environment, this would make an actual API call
    // For development, we'll simulate syncing by generating sample servers with realistic data
    
    // Generate sample servers based on eggs
    const eggs = await getEggs();
    const servers = [];
    
    // Create a variety of servers with different games
    const ipBase = "104.234.107";
    const statusOptions = ["running", "stopped"];
    const serverPrefixes = [
      "Survival", "Creative", "Skyblock", "Factions", "Minigames", 
      "Roleplay", "PvP", "Economy", "Hardcore", "Adventure"
    ];
    
    for (let i = 0; i < eggs.length; i++) {
      const egg = eggs[i];
      const serverId = `server${i + 1}`;
      const ipOctet4 = 100 + Math.floor(Math.random() * 155);
      const statusIndex = Math.floor(Math.random() * statusOptions.length);
      const prefixIndex = Math.floor(Math.random() * serverPrefixes.length);
      const planOptions = ['starter', 'standard', 'premium'];
      const planIndex = Math.floor(Math.random() * planOptions.length);
      
      // Use the egg name to determine appropriate resources
      let cpuValue = 1;
      let ramValue = 2;
      let diskValue = 20;
      
      // Assign resources based on game type
      if (egg.name.includes("Rust") || egg.name.includes("ARK")) {
        cpuValue = 4;
        ramValue = 8;
        diskValue = 100;
      } else if (egg.name.includes("Minecraft") || egg.name.includes("FiveM")) {
        cpuValue = 2;
        ramValue = 4;
        diskValue = 50;
      } else if (egg.name.includes("CS:GO") || egg.name.includes("Garry")) {
        cpuValue = 3;
        ramValue = 6;
        diskValue = 60;
      }
      
      // Adjust resources based on plan
      if (planOptions[planIndex] === 'standard') {
        cpuValue *= 1.5;
        ramValue *= 1.5;
        diskValue *= 1.5;
      } else if (planOptions[planIndex] === 'premium') {
        cpuValue *= 2;
        ramValue *= 2;
        diskValue *= 2;
      }
      
      servers.push({
        id: serverId,
        name: `${serverPrefixes[prefixIndex]} ${egg.name} Server`,
        status: statusOptions[statusIndex],
        cpu: Math.round(cpuValue), 
        ram: Math.round(ramValue),
        disk: Math.round(diskValue),
        ip: `${ipBase}.${ipOctet4}`,
        pterodactylId: `ptero-${serverId}`,
        planId: planOptions[planIndex],
        created_at: new Date().toISOString()
      });
    }
    
    // Save the synchronized servers to localStorage
    localStorage.setItem('ngHostingServers', JSON.stringify(servers));
    console.log(`Synchronized ${servers.length} servers from panel`);
    
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
    console.log(`Fetching servers from ${apiUrl}`);
    
    // In production, this would be a real API call
    // For development, we'll get servers from localStorage
    const storedServers = localStorage.getItem('ngHostingServers');
    
    if (storedServers) {
      return JSON.parse(storedServers);
    }
    
    // If no servers in localStorage, sync from panel
    console.log("No servers found in localStorage, syncing from panel");
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
    const ipOctet4 = 100 + Math.floor(Math.random() * 155);
    
    const newServer = {
      id: newServerId,
      name: params.name,
      status: 'stopped',
      cpu: params.limits.cpu / 100, // Convert percentage to vCores
      ram: params.limits.memory / 1024, // Convert MB to GB
      disk: params.limits.disk / 1024, // Convert MB to GB
      ip: `104.234.107.${ipOctet4}`,
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
    console.log(`Fetching eggs from ${apiUrl}`);
    
    // In production, this would be a real API call
    // For development, we'll return expanded game server options
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
      {
        id: 7,
        name: "Terraria",
        nest: 6,
        docker_image: "ghcr.io/pterodactyl/yolks:mono",
      },
      {
        id: 8,
        name: "TeamSpeak 3",
        nest: 7,
        docker_image: "ghcr.io/pterodactyl/voice:teamspeak",
      },
      {
        id: 9,
        name: "Mumble",
        nest: 7,
        docker_image: "ghcr.io/pterodactyl/voice:mumble",
      },
      {
        id: 10,
        name: "Garry's Mod",
        nest: 4,
        docker_image: "ghcr.io/pterodactyl/games:source",
      },
      {
        id: 11,
        name: "Minecraft Bedrock",
        nest: 1,
        docker_image: "ghcr.io/parkervcp/yolks:debian",
      },
      {
        id: 12,
        name: "Valheim",
        nest: 8,
        docker_image: "ghcr.io/pterodactyl/games:wine",
      },
      {
        id: 13,
        name: "Discord Bot",
        nest: 9,
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
      },
      {
        id: 14,
        name: "MongoDB",
        nest: 10,
        docker_image: "ghcr.io/parkervcp/yolks:mongodb_4",
      },
      {
        id: 15,
        name: "MySQL",
        nest: 10,
        docker_image: "ghcr.io/parkervcp/yolks:mysql_8",
      },
      {
        id: 16,
        name: "Palworld",
        nest: 11,
        docker_image: "ghcr.io/pterodactyl/games:wine",
      },
      {
        id: 17,
        name: "Satisfactory",
        nest: 12,
        docker_image: "ghcr.io/pterodactyl/games:wine",
      },
      {
        id: 18,
        name: "Among Us",
        nest: 13,
        docker_image: "ghcr.io/pterodactyl/games:wine",
      },
      {
        id: 19,
        name: "7 Days to Die",
        nest: 14,
        docker_image: "ghcr.io/pterodactyl/games:source",
      },
      {
        id: 20,
        name: "Counter-Strike 2",
        nest: 15,
        docker_image: "ghcr.io/pterodactyl/games:source",
      }
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
    console.log(`Checking server ${serverId} power status from ${apiUrl}`);
    
    // In production, this would be a real API call connecting to the actual panel
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
    console.log(`Sending ${action} command to server ${serverId} at ${apiUrl}`);
    
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

/**
 * Restart a server
 */
export const restartServer = async (serverId: string): Promise<boolean> => {
  return sendPowerAction(serverId, 'restart');
};

/**
 * Delete a server
 */
export const deleteServer = async (serverId: string): Promise<boolean> => {
  try {
    const { apiUrl, apiKey } = getApiConfig();
    console.log(`Deleting server ${serverId} from ${apiUrl}`);
    
    const storedServers = localStorage.getItem('ngHostingServers');
    
    if (storedServers) {
      const servers = JSON.parse(storedServers);
      const updatedServers = servers.filter((s: any) => s.id !== serverId);
      
      localStorage.setItem('ngHostingServers', JSON.stringify(updatedServers));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error deleting server:', error);
    return false;
  }
};

// Initialize API configuration on load
getApiConfig();

// Force a refresh of all servers on initial load to ensure we're showing the latest data
syncServersFromPanel().then(() => {
  console.log('Initial server sync complete');
});

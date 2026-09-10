import create from 'zustand';
import { Group, Folder, Broadcast, AppSettings, WhatsAppConnection } from '@types/index';

interface AppState {
  // WhatsApp Connection
  whatsappConnection: WhatsAppConnection;
  setWhatsAppConnection: (connection: WhatsAppConnection) => void;

  // Folders and Groups
  folders: Folder[];
  addFolder: (folder: Folder) => void;
  updateFolder: (folderId: string, folder: Partial<Folder>) => void;
  deleteFolder: (folderId: string) => void;

  // Groups
  allGroups: Group[];
  addGroup: (group: Group) => void;
  updateGroup: (groupId: string, group: Partial<Group>) => void;
  deleteGroup: (groupId: string) => void;

  // Broadcasts
  broadcasts: Broadcast[];
  addBroadcast: (broadcast: Broadcast) => void;
  updateBroadcast: (broadcastId: string, broadcast: Partial<Broadcast>) => void;
  deleteBroadcast: (broadcastId: string) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // WhatsApp Connection
  whatsappConnection: {
    isConnected: false,
  },
  setWhatsAppConnection: (connection) =>
    set({ whatsappConnection: connection }),

  // Folders
  folders: [],
  addFolder: (folder) =>
    set((state) => ({ folders: [...state.folders, folder] })),
  updateFolder: (folderId, updates) =>
    set((state) => ({
      folders: state.folders.map((f) =>
        f.id === folderId ? { ...f, ...updates } : f,
      ),
    })),
  deleteFolder: (folderId) =>
    set((state) => ({
      folders: state.folders.filter((f) => f.id !== folderId),
    })),

  // Groups
  allGroups: [],
  addGroup: (group) =>
    set((state) => ({ allGroups: [...state.allGroups, group] })),
  updateGroup: (groupId, updates) =>
    set((state) => ({
      allGroups: state.allGroups.map((g) =>
        g.id === groupId ? { ...g, ...updates } : g,
      ),
    })),
  deleteGroup: (groupId) =>
    set((state) => ({
      allGroups: state.allGroups.filter((g) => g.id !== groupId),
    })),

  // Broadcasts
  broadcasts: [],
  addBroadcast: (broadcast) =>
    set((state) => ({ broadcasts: [...state.broadcasts, broadcast] })),
  updateBroadcast: (broadcastId, updates) =>
    set((state) => ({
      broadcasts: state.broadcasts.map((b) =>
        b.id === broadcastId ? { ...b, ...updates } : b,
      ),
    })),
  deleteBroadcast: (broadcastId) =>
    set((state) => ({
      broadcasts: state.broadcasts.filter((b) => b.id !== broadcastId),
    })),

  // Settings
  settings: {
    theme: 'light',
    language: 'ru',
    notifications: true,
    autoSave: true,
  },
  updateSettings: (updates) =>
    set((state) => ({
      settings: { ...state.settings, ...updates },
    })),
}));

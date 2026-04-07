import { EventCardProps } from "../components/ShotgunEvents/types";
import api from "./api";

export interface ShotgunSyncResult {
  success: boolean;
  message: string;
  data?: {
    total?: number;
    created: number;
    updated: number;
    errors?: string[];
    events?: Array<Record<string, unknown>>;
    previewEvents?: EventCardProps[];
    createdEvents?: Array<{
      shotgunId: number;
      title: string;
      startTime: string;
      isPast: boolean;
    }>;
    updatedEvents?: Array<{
      shotgunId: number;
      title: string;
      changes: Array<{
        field: string;
        before: string;
        after: string;
      }>;
    }>;
  };
}

export const shotgunSyncService = {
  /**
   * Teste la connexion à l'API Shotgun
   */
  async testConnection(): Promise<ShotgunSyncResult> {
    const response = await api.get("/shotgun-sync/test");
    return response.data;
  },

  /**
   * Synchronise tous les événements depuis Shotgun
   */
  async syncAllEvents(): Promise<ShotgunSyncResult> {
    const response = await api.post("/shotgun-sync/sync-all");
    return response.data;
  },

  /**
   * Synchronise un événement spécifique par son ID Shotgun
   */
  async syncEventById(shotgunId: number): Promise<ShotgunSyncResult> {
    const response = await api.post(`/shotgun-sync/sync-event/${shotgunId}`);
    return response.data;
  },

  /**
   * Prévisualise les événements disponibles sur Shotgun (sans les sauvegarder)
   */
  async previewEvents(): Promise<ShotgunSyncResult> {
    const response = await api.get("/shotgun-sync/preview");
    return response.data;
  },
};


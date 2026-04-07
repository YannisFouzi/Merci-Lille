import React, { useState } from "react";
import { EventCardProps } from "../ShotgunEvents/types";
import { shotgunSyncService } from "../../services/shotgun-sync.service";

type MessageState = {
  type: "success" | "error" | "info";
  text: string;
};

type SyncSummaryState = {
  mode: "preview" | "sync";
  total?: number;
  created: number;
  updated: number;
  previewEvents: EventCardProps[];
  errors: string[];
  createdEvents: Array<{
    shotgunId: number;
    title: string;
    startTime: string;
    isPast: boolean;
  }>;
  updatedEvents: Array<{
    shotgunId: number;
    title: string;
    changes: Array<{
      field: string;
      before: string;
      after: string;
    }>;
  }>;
};

type ShotgunSyncProps = {
  isSyncPreviewActive: boolean;
  onBeforeSyncPreview: () => Promise<boolean>;
  onApplySyncPreview: (previewEvents: EventCardProps[]) => void;
  onCancelSyncPreview: () => void;
  onSyncSuccess: () => Promise<void>;
};

const formatPreviewDate = (startTime: string) =>
  new Date(startTime).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const ShotgunSync: React.FC<ShotgunSyncProps> = ({
  isSyncPreviewActive,
  onBeforeSyncPreview,
  onApplySyncPreview,
  onCancelSyncPreview,
  onSyncSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<MessageState | null>(null);
  const [syncSummary, setSyncSummary] = useState<SyncSummaryState | null>(null);

  const resetFeedback = () => {
    setMessage(null);
    setSyncSummary(null);
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    resetFeedback();

    try {
      const result = await shotgunSyncService.testConnection();

      if (result.success) {
        setMessage({
          type: "success",
          text: "Connexion a l'API Shotgun reussie.",
        });
      } else {
        setMessage({
          type: "error",
          text: "Echec de la connexion a l'API Shotgun.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `Erreur: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncAll = async () => {
    const syncConfirmationMessage =
      syncSummary?.mode === "preview"
        ? `Vous allez synchroniser ${syncSummary.created} evenement(s) a ajouter et ${syncSummary.updated} evenement(s) a mettre a jour. Cette action ecrit immediatement en base. Continuer ?`
        : "Voulez-vous vraiment synchroniser tous les evenements depuis Shotgun ? Cette action ecrit immediatement en base.";

    if (!window.confirm(syncConfirmationMessage)) {
      return;
    }

    setIsLoading(true);
    resetFeedback();

    try {
      const result = await shotgunSyncService.syncAllEvents();

      if (result.success && result.data) {
        const summary: SyncSummaryState = {
          mode: "sync",
          total: result.data.total,
          created: result.data.created,
          updated: result.data.updated,
          previewEvents: [],
          errors: result.data.errors ?? [],
          createdEvents: result.data.createdEvents ?? [],
          updatedEvents: result.data.updatedEvents ?? [],
        };

        setSyncSummary(summary);
        setMessage({
          type: "success",
          text: `Synchronisation reussie : ${summary.created} ajoute(s), ${summary.updated} mis a jour.`,
        });
        onCancelSyncPreview();
        await onSyncSuccess();
      } else {
        setMessage({
          type: "error",
          text: "Echec de la synchronisation Shotgun.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `Erreur: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrepareSync = async () => {
    const canStartPreview = await onBeforeSyncPreview();
    if (!canStartPreview) {
      return;
    }

    setIsLoading(true);
    resetFeedback();

    try {
      const result = await shotgunSyncService.previewEvents();

      if (result.success && result.data) {
        const previewEvents = result.data.previewEvents ?? [];
        const summary: SyncSummaryState = {
          mode: "preview",
          total: result.data.total,
          created: result.data.created,
          updated: result.data.updated,
          previewEvents,
          errors: result.data.errors ?? [],
          createdEvents: result.data.createdEvents ?? [],
          updatedEvents: result.data.updatedEvents ?? [],
        };

        onApplySyncPreview(previewEvents);
        setSyncSummary(summary);
        setMessage({
          type: "info",
          text: "Previsualisation locale appliquee. Verifiez la grille puis validez si le rendu vous convient.",
        });
      } else {
        setMessage({
          type: "error",
          text: "Echec de la previsualisation Shotgun.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `Erreur: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSyncPreview = () => {
    onCancelSyncPreview();
    resetFeedback();
    setMessage({
      type: "info",
      text: "Previsualisation Shotgun annulee. Rien n'a ete ecrit en base.",
    });
  };

  const handlePreview = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await shotgunSyncService.previewEvents();

      if (result.success && result.data) {
        const summary: SyncSummaryState = {
          mode: "preview",
          total: result.data.total,
          created: result.data.created,
          updated: result.data.updated,
          previewEvents: result.data.previewEvents ?? [],
          errors: result.data.errors ?? [],
          createdEvents: result.data.createdEvents ?? [],
          updatedEvents: result.data.updatedEvents ?? [],
        };

        setSyncSummary(summary);
        setMessage({
          type: "info",
          text: `Previsualisation : ${summary.created} a ajouter, ${summary.updated} a mettre a jour.`,
        });
      } else {
        setMessage({
          type: "error",
          text: "Echec de la previsualisation Shotgun.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `Erreur: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg space-y-6">
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-white mb-2">Synchronisation Shotgun</h2>
        <p className="text-gray-400 text-sm">
          Importez automatiquement vos evenements depuis votre compte Shotgun organisateur.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-900/30 border border-green-700 text-green-300"
              : message.type === "error"
                ? "bg-red-900/30 border border-red-700 text-red-300"
                : "bg-blue-900/30 border border-blue-700 text-blue-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {syncSummary && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-bold mb-2">
            {syncSummary.mode === "preview" ? "Previsualisation" : "Resultat"}
          </h3>
          <ul className="text-gray-300 space-y-1">
            {typeof syncSummary.total === "number" && (
              <li>{syncSummary.total} evenement(s) analyses sur Shotgun</li>
            )}
            <li>{syncSummary.created} evenement(s) a ajouter</li>
            <li>{syncSummary.updated} evenement(s) a mettre a jour</li>
            {syncSummary.errors.length > 0 && (
              <li className="text-red-400">{syncSummary.errors.length} erreur(s)</li>
            )}
          </ul>

          {syncSummary.mode === "preview" && syncSummary.createdEvents.length > 0 && (
            <div className="mt-4">
              <h4 className="text-white font-semibold mb-2">Events a ajouter</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {syncSummary.createdEvents.map((event) => (
                  <li key={`created-${event.shotgunId}`} className="rounded border border-gray-700 p-3">
                    <div className="font-medium text-white">{event.title}</div>
                    <div className="text-xs text-gray-400">
                      {formatPreviewDate(event.startTime)} {event.isPast ? "(passe)" : "(a venir)"}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {syncSummary.mode === "preview" && syncSummary.updatedEvents.length > 0 && (
            <div className="mt-4">
              <h4 className="text-white font-semibold mb-2">Events a mettre a jour</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {syncSummary.updatedEvents.map((event) => (
                  <li key={`updated-${event.shotgunId}`} className="rounded border border-gray-700 p-3">
                    <div className="font-medium text-white">{event.title}</div>
                    <div className="mt-3 space-y-2">
                      {event.changes.map((change) => (
                        <div
                          key={`${event.shotgunId}-${change.field}`}
                          className="rounded border border-blue-900/60 bg-blue-950/30 p-2"
                        >
                          <div className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                            {change.field}
                          </div>
                          <div className="mt-1 text-xs text-gray-400">Avant : {change.before}</div>
                          <div className="text-xs text-white">Apres : {change.after}</div>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {syncSummary.errors.length > 0 && (
            <details className="mt-4">
              <summary className="text-red-400 cursor-pointer hover:text-red-300">
                Voir les erreurs
              </summary>
              <ul className="mt-2 space-y-1 text-sm text-red-300">
                {syncSummary.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <button
          onClick={handleTestConnection}
          disabled={isLoading}
          className="px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? "Test..." : "Tester la connexion"}
        </button>

        <button
          onClick={handlePreview}
          disabled={isLoading || isSyncPreviewActive}
          className="px-4 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? "Chargement..." : "Previsualiser"}
        </button>

        {isSyncPreviewActive ? (
          <>
            <button
              onClick={handleSyncAll}
              disabled={isLoading}
              className="px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? "Sync..." : "Valider la synchronisation"}
            </button>

            <button
              onClick={handleCancelSyncPreview}
              disabled={isLoading}
              className="px-4 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Annuler la previsualisation
            </button>
          </>
        ) : (
          <button
            onClick={handlePrepareSync}
            disabled={isLoading}
            className="px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? "Sync..." : "Synchroniser tout"}
          </button>
        )}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-white font-bold mb-2">Instructions</h3>
        <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside">
          <li>
            <strong>Tester la connexion :</strong> verifiez que l'API Shotgun est accessible.
          </li>
          <li>
            <strong>Previsualiser :</strong> voyez combien d'evenements seront ajoutes ou mis a
            jour sans rien ecrire en base.
          </li>
          <li>
            <strong>Synchroniser :</strong> lancez une previsualisation locale du rendu final,
            puis validez seulement si le resultat vous convient.
          </li>
        </ol>

        <div className="mt-4 rounded border border-yellow-700 bg-yellow-900/20 p-3">
          <p className="text-xs text-yellow-300">
            <strong>Note :</strong> les evenements deja synchronises sont mis a jour, pas
            dupliques. Les images sont importees sur Cloudinary pendant la vraie synchronisation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShotgunSync;

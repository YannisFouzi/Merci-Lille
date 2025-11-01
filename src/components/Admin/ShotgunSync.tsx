import React, { useState } from "react";
import { shotgunSyncService } from "../../services/shotgun-sync.service";

const ShotgunSync: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [syncResult, setSyncResult] = useState<{
    created: number;
    updated: number;
    errors: string[];
  } | null>(null);

  const handleTestConnection = async () => {
    setIsLoading(true);
    setMessage(null);
    setSyncResult(null);

    try {
      const result = await shotgunSyncService.testConnection();

      if (result.success) {
        setMessage({
          type: "success",
          text: "✅ Connexion à l'API Shotgun réussie !",
        });
      } else {
        setMessage({
          type: "error",
          text: "❌ Échec de la connexion à l'API Shotgun",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `❌ Erreur: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncAll = async () => {
    if (
      !window.confirm(
        "Voulez-vous vraiment synchroniser tous les événements depuis Shotgun ? Cela peut prendre quelques instants."
      )
    ) {
      return;
    }

    setIsLoading(true);
    setMessage(null);
    setSyncResult(null);

    try {
      const result = await shotgunSyncService.syncAllEvents();

      if (result.success && result.data) {
        setSyncResult({
          created: result.data.created,
          updated: result.data.updated,
          errors: result.data.errors,
        });

        setMessage({
          type: "success",
          text: `✅ Synchronisation réussie ! ${result.data.created} créé(s), ${result.data.updated} mis à jour`,
        });

        // Recharger la page après 2 secondes pour voir les nouveaux événements
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage({
          type: "error",
          text: "❌ Échec de la synchronisation",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `❌ Erreur: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = async () => {
    setIsLoading(true);
    setMessage(null);
    setSyncResult(null);

    try {
      const result = await shotgunSyncService.previewEvents();

      if (result.success && result.data) {
        // L'API Shotgun retourne les événements dans result.data (qui est un tableau)
        const eventsCount = Array.isArray(result.data) 
          ? result.data.length 
          : (result.data.events?.length || result.data.data?.length || 0);
        
        setMessage({
          type: "info",
          text: `ℹ️  ${eventsCount} événement(s) trouvé(s) sur Shotgun`,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `❌ Erreur: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg space-y-6">
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-white mb-2">
          🔄 Synchronisation Shotgun
        </h2>
        <p className="text-gray-400 text-sm">
          Importez automatiquement vos événements depuis votre compte Shotgun
          organisateur
        </p>
      </div>

      {/* Messages */}
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

      {/* Résultat de la synchronisation */}
      {syncResult && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-bold mb-2">📊 Résultat :</h3>
          <ul className="text-gray-300 space-y-1">
            <li>✅ {syncResult.created} événement(s) créé(s)</li>
            <li>✏️  {syncResult.updated} événement(s) mis à jour</li>
            {syncResult.errors.length > 0 && (
              <li className="text-red-400">
                ❌ {syncResult.errors.length} erreur(s)
              </li>
            )}
          </ul>

          {syncResult.errors.length > 0 && (
            <details className="mt-4">
              <summary className="text-red-400 cursor-pointer hover:text-red-300">
                Voir les erreurs
              </summary>
              <ul className="mt-2 space-y-1 text-sm text-red-300">
                {syncResult.errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      {/* Boutons d'action */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={handleTestConnection}
          disabled={isLoading}
          className="px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? "⏳ Test..." : "🔌 Tester la connexion"}
        </button>

        <button
          onClick={handlePreview}
          disabled={isLoading}
          className="px-4 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? "⏳ Chargement..." : "👁️  Prévisualiser"}
        </button>

        <button
          onClick={handleSyncAll}
          disabled={isLoading}
          className="px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? "⏳ Sync..." : "🔄 Synchroniser tout"}
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-white font-bold mb-2">📖 Instructions :</h3>
        <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside">
          <li>
            <strong>Tester la connexion :</strong> Vérifiez que l'API Shotgun
            est accessible
          </li>
          <li>
            <strong>Prévisualiser :</strong> Vérifiez combien d'événements
            seront importés
          </li>
          <li>
            <strong>Synchroniser :</strong> Importez tous vos événements Shotgun
          </li>
        </ol>

        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded">
          <p className="text-yellow-300 text-xs">
            ⚠️  <strong>Note :</strong> Les événements déjà synchronisés seront
            mis à jour, pas dupliqués. Les images seront automatiquement
            importées sur Cloudinary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShotgunSync;


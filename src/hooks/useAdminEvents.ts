import { useCallback, useEffect, useState } from "react";
import { eventsService } from "../services/events.service";
import { EventCardProps } from "../components/ShotgunEvents/types";
import { sortEventsForAdmin } from "../utils";

export const useAdminEvents = () => {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await eventsService.getAllEvents(true);
      setEvents(sortEventsForAdmin(data));
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des événements");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const deleteEvent = useCallback(
    async (id: string) => {
      await eventsService.deleteEvent(id);
      await fetchEvents();
    },
    [fetchEvents]
  );

  const deleteMany = useCallback(
    async (ids: string[]) => {
      await Promise.all(ids.map((id) => eventsService.deleteEvent(id)));
      await fetchEvents();
    },
    [fetchEvents]
  );

  const updateOrder = useCallback(
    async (orderedIds: string[]) => {
      await eventsService.updateEventOrder(orderedIds);
      await fetchEvents();
    },
    [fetchEvents]
  );

  const hideMany = useCallback(
    async (ids: string[]) => {
      await eventsService.hideMultipleEvents(ids);
      await fetchEvents();
    },
    [fetchEvents]
  );

  const unhideMany = useCallback(
    async (ids: string[]) => {
      await eventsService.unhideMultipleEvents(ids);
      await fetchEvents();
    },
    [fetchEvents]
  );

  const hideOne = useCallback(
    async (id: string, currentHidden: boolean) => {
      if (currentHidden) {
        await eventsService.unhideEvent(id);
      } else {
        await eventsService.hideEvent(id);
      }
      await fetchEvents();
    },
    [fetchEvents]
  );

  const renumberAll = useCallback(async () => {
    await eventsService.renumberAllEvents();
    await fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    setEvents,
    loading,
    error,
    setError,
    refetch: fetchEvents,
    deleteEvent,
    deleteMany,
    updateOrder,
    hideMany,
    unhideMany,
    hideOne,
    renumberAll,
  };
};

export type UseAdminEventsReturn = ReturnType<typeof useAdminEvents>;

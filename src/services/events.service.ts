import api from "./api";

export const eventsService = {
  async getAllEvents(includeHidden: boolean = false) {
    const params = includeHidden ? { includeHidden: "true" } : {};
    const response = await api.get("/events", { params });
    return response.data;
  },

  async createEvent(eventData: FormData) {
    const response = await api.post("/events", eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async updateEvent(id: string, eventData: FormData) {
    const response = await api.put(`/events/${id}`, eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async deleteEvent(id: string) {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  async updateEventOrder(orderedIds: string[]) {
    const response = await api.put("/events/update-order", { orderedIds });
    return response.data;
  },

  async hideEvent(id: string) {
    const response = await api.patch(`/events/${id}/hide`);
    return response.data;
  },

  async unhideEvent(id: string) {
    const response = await api.patch(`/events/${id}/unhide`);
    return response.data;
  },

  async hideMultipleEvents(eventIds: string[]) {
    const response = await api.post("/events/hide-multiple", { eventIds });
    return response.data;
  },

  async unhideMultipleEvents(eventIds: string[]) {
    const response = await api.post("/events/unhide-multiple", { eventIds });
    return response.data;
  },

  async renumberAllEvents() {
    const response = await api.post("/events/renumber-all");
    return response.data;
  },
};

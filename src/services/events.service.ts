import api from "./api";

export const eventsService = {
  async getAllEvents() {
    const response = await api.get("/events");
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
};

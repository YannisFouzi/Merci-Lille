import api from "./api";

export const galleryService = {
  async getAllPhotos() {
    const response = await api.get("/gallery");
    return response.data;
  },

  async addPhoto(photoData: FormData) {
    const response = await api.post("/gallery", photoData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async deletePhoto(id: string) {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  },
};

import api from "./api";

export const galleryService = {
  async getAllImages() {
    const response = await api.get("/gallery");
    return response.data;
  },

  async uploadImage(imageData: FormData) {
    const response = await api.post("/gallery", imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async deleteImage(id: string) {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  },
};

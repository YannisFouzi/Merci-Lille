import api from "./api";

export const galleryService = {
  async getAllImages() {
    const response = await api.get("/gallery");
    return response.data;
  },

  async uploadImages(formData: FormData) {
    const response = await api.post("/gallery", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async deleteImages(imageIds: string[]) {
    const response = await api.delete(`/gallery/batch`, {
      data: { imageIds },
    });
    return response.data;
  },

  async deleteImage(id: string) {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  },
};

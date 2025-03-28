// Upload image and return image URL
export const imageUpload = async (imageData: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("image", imageData);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=f05482d5a09ecd5866a2d2ca55ad9d5a`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.success ? data.data.display_url : null;
  } catch (error) {
    console.error("Image upload failed", error);
    return null;
  }
};

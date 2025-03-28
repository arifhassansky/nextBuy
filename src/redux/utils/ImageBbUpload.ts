// Upload image and return image URL
export const imageUpload = async (imageData: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("image", imageData);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API}`,
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

const CLOUD_NAME = "de2cip8dk";
const UPLOAD_PRESET = "indumentary-dev";

export const uploadImage = async (file: File) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(url, {
        method: "POST",
        body: formData
    });

    if (!res.ok) throw new Error("Error al subir la imagen");

    const data = await res.json();
    return data.secure_url;
}

import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

export const formatDateTime = (dateInput: string | number | Date) => {
  const date = new Date(dateInput);
  return date.toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12 :false
  })
}

export const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_SECRET_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
  });
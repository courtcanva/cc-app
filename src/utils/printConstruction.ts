import { IDesign } from "@/interfaces/design";
import axios from "axios";

const getBase64Image = async (imageUrl: string) => {
  const response = await axios.get(imageUrl, { responseType: "blob" });
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(response.data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const getImageDimensions = (base64Image: string) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Image;
    img.onload = () => resolve({ width: img.width, height: img.height });
  });
};

export const downloadToPDF = async (design: IDesign, imageUrl: string) => {
  const { default: jsPDF } = await import(/* webpackChunkName: "jsPDF" */ "jspdf");
  // eslint-disable-next-line new-cap
  const doc = new jsPDF("p", "px", "a4");
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const base64Image = (await getBase64Image(imageUrl)) as string;
  const { width, height } = (await getImageDimensions(base64Image)) as {
    width: number;
    height: number;
  };
  const ratio = width / height;
  let canvasWidth = pageWidth;
  let canvasHeight = canvasWidth / ratio;

  if (canvasHeight > 0.55 * pageHeight) {
    canvasHeight = 0.55 * pageHeight;
    canvasWidth = canvasHeight * ratio;
  }
  const center = (pageWidth / 2) as number;
  const marginX = (pageWidth - canvasWidth) / 2;
  const marginY = (pageHeight - canvasHeight) / 2;
  const linkUrl = "design.courtcanva.com";
  const link = linkUrl.includes("https://") ? (linkUrl.split("https://").pop() as string) : linkUrl;
  // header
  doc.setFillColor("#344C5C");
  doc.rect(0, 0, pageWidth, 90, "F");
  doc.setFontSize(36);
  doc.setTextColor("#EBD935");
  doc.text(design.designName, center, 50, {
    align: "center",
  });
  doc.setFillColor("#EBD935");
  doc.rect(0, 90, pageWidth, 3, "F");
  // body
  doc.setTextColor("#000");
  doc.setFontSize(20);
  doc.text(design.courtSize.name, center, pageHeight / 2 - canvasHeight / 2 - 15, {
    align: "center",
  });
  doc.addImage(base64Image, "png", marginX, marginY, canvasWidth, canvasHeight);
  // footer
  doc.setFillColor("#344C5C");
  doc.rect(0, pageHeight - 138, pageWidth, 138, "F");
  doc.setFontSize(16);
  doc.setTextColor("#FFF");
  doc.text("About CourtCanva", center, pageHeight - 108, {
    align: "center",
  });
  doc.setFontSize(12);
  doc.text("With the CourtCanva web you can design your court easily,", center, pageHeight - 90, {
    align: "center",
  });
  doc.text("CourtCanva will help you estimate price for your design. ", center, pageHeight - 75, {
    align: "center",
  });
  doc.setFillColor("#44BC86");
  doc.roundedRect(42, pageHeight - 60, 360, 37, 2, 2, "F");
  doc.setFontSize(20);
  doc.textWithLink(link, center, pageHeight - 37, {
    url: linkUrl,
    align: "center",
  });
  doc.setFillColor("#EBD935");
  doc.rect(0, pageHeight - 3, pageWidth, 3, "F");
  doc.save("court_construction.pdf");
};

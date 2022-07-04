import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { store } from "../store";

const getCourtName = () => {
  const state = store.getState();
  return state.courtName.name;
};
const courtName = getCourtName() as string;

export const downloadToPDF = () => {
  const court = window.document.querySelector("canvas") as HTMLCanvasElement;

  html2canvas(court).then((canvas) => {
    const img = canvas.toDataURL("image/png");
    // eslint-disable-next-line new-cap
    const doc = new jsPDF("p", "px", "a4");
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const ratio = court.clientHeight / court.clientWidth;

    const canvasWidth = 400;
    const canvasHeight = canvasWidth * ratio;

    const marginX = (pageWidth - canvasWidth) / 2;
    const marginY = (pageHeight - canvasHeight) / 2;
    doc.text(courtName, 120, 100, {
      align: "justify",
    });
    doc.addImage(img, "png", marginX, marginY, canvasWidth, canvasHeight);
    doc.save("court_design.pdf");
  });

  // eslint-disable-next-line new-cap
};

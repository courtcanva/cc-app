import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import { store } from "../store";

export const downloadToPDF = () => {
  const getCourtName = () => {
    const state = store.getState();
    return state.courtName.name;
  };
  const courtDescription = getCourtName() as string;
  
  const getDesignName = () => {
    const state = store.getState();
    return state.designName.name;
  };
  const designName = getDesignName() as string;
  const court = window.document.querySelector("canvas") as HTMLCanvasElement;

  html2canvas(court).then((canvas) => {
    const img = canvas.toDataURL("image/png");
    // eslint-disable-next-line new-cap
    const doc = new jsPDF("p", "px", "a4");
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const ratio = court.clientWidth / court.clientHeight;
    const canvasHeight = 250;
    const canvasWidth = canvasHeight * ratio;
    const center = pageWidth / 2 as number;
    const marginX = (pageWidth - canvasWidth) / 2;
    const marginY = (pageHeight - canvasHeight) / 2;

    // header
    doc.setFillColor("#344C5C");
    doc.rect(0, 0, pageWidth, 90, "F");
    doc.setFontSize(36);
    doc.setTextColor("#EBD935");
    doc.text(designName, center, 50, {
      align: "center"
    });
    // body
    doc.setTextColor("#000");
    doc.setFontSize(20);
    doc.text(courtDescription, center, (pageHeight / 2 - canvasHeight / 2) - 15, {
      align: "center",
    });
    doc.addImage(img, "png", marginX, marginY, canvasWidth, canvasHeight);
    // footer
    doc.setFillColor("#344C5C");
    doc.rect(0, pageHeight - 138, pageWidth, 138, "F");
    doc.setFontSize(16);
    doc.setTextColor("#FFF");
    doc.text("About CourtCanva", center, pageHeight - 108, {
      align: "center",
    });
    doc.setFontSize(12);
    doc.text("With the CourtCanva web  you can design your court easily,", center, pageHeight - 90, {
        align: "center",
    });
    doc.text("CourtCanva will help you estimate price for your design. ", center, pageHeight - 75, {
        align: "center",
    });
    doc.setFillColor("#44BC86");
    doc.roundedRect(42, pageHeight - 60, 360, 37, 2, 2, 'F');
    doc.setFontSize(20);
    doc.textWithLink('uat.design.courtcanva.com', center, pageHeight - 37, {
      url: "https://uat.design.courtcanva.com/",
      align: "center",
    });
    doc.save("court_design.pdf");
  });
  // eslint-disable-next-line new-cap
};

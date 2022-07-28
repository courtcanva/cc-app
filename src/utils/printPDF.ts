import { environment } from "@/constants/environment";
import { store } from "../store";

export const downloadToPDF = async () => {
  const { default: jsPDF } = await import(/* webpackChunkName: "jsPDF" */ "jspdf");
  const { default: html2canvas } = await import(
    /* webpackChunkName: "html2canvas" */ "html2canvas"
  );
  const getCourtName = () => {
    const state = store.getState();
    return state.courtSpecData.activeCourt.courtName;
  };
  const courtDescription = getCourtName() as string;

  const getDesignName = () => {
    const state = store.getState();
    return state.courtSpecData.activeCourt.designName;
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
    const center = (pageWidth / 2) as number;
    const marginX = (pageWidth - canvasWidth) / 2;
    const marginY = (pageHeight - canvasHeight) / 2;
    const linkUrl = "design.courtcanva.com";
    const link = linkUrl.includes("https://")
      ? (linkUrl.split("https://").pop() as string)
      : linkUrl;
    // header
    doc.setFillColor("#344C5C");
    doc.rect(0, 0, pageWidth, 90, "F");
    doc.setFontSize(36);
    doc.setTextColor("#EBD935");
    doc.text(designName, center, 50, {
      align: "center",
    });
    doc.setFillColor("#EBD935");
    doc.rect(0, 90, pageWidth, 3, "F");
    // body
    doc.setTextColor("#000");
    doc.setFontSize(20);
    doc.text(courtDescription, center, pageHeight / 2 - canvasHeight / 2 - 15, {
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
    doc.save("court_design.pdf");
  });
};

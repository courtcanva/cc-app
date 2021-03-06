const svgIcon = (fillColor: string) => {
  const paintColorIcon =
    `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" >
     <feDropShadow dx="1" dy="1" stdDeviation="0" flood-color="#FFFFFF" flood-opacity="0.7"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
  <path fill="` +
    fillColor +
    `" stroke="` +
    fillColor +
    `" stroke-width="1.4" d="M6.22757 3.8282L6.58112 3.47465L6.22757 3.12109L4.68757 1.58109C4.52533 1.41886 4.52533 1.15794 4.68757 0.995702C4.84981 0.833464 5.11073 0.833464 5.27296 0.995702L12.8263 8.54904C13.1736 8.89629 13.1692 9.44817 12.8293 9.78225L12.8293 9.78224L12.8263 9.78526L7.78463 14.8269C7.61574 14.9958 7.38679 15.0838 7.16652 15.0838C6.94624 15.0838 6.7173 14.9958 6.5484 14.8269L1.50674 9.78526L1.50675 9.78525L1.5037 9.78225C1.16386 9.44817 1.15948 8.89629 1.50674 8.54904L6.22757 3.8282ZM2.42213 8.81359L1.56858 9.66715H2.77568H11.5574H12.7645L11.9109 8.81359L7.52007 4.42276L7.16652 4.06921L6.81296 4.42276L2.42213 8.81359ZM15.4165 11.3103C15.5666 11.4941 15.746 11.7241 15.9246 11.9774C16.1449 12.2896 16.3572 12.6275 16.5127 12.9513C16.6727 13.2844 16.7499 13.5568 16.7499 13.7505C16.7499 14.4827 16.1487 15.0838 15.4165 15.0838C14.6843 15.0838 14.0832 14.4827 14.0832 13.7505C14.0832 13.5568 14.1604 13.2844 14.3204 12.9513C14.4758 12.6275 14.6882 12.2896 14.9084 11.9774C15.0871 11.7241 15.2664 11.4941 15.4165 11.3103Z" />
  </g>
  </svg>`;

  return paintColorIcon;
};

export const paintBucketIcon = (selectedColor: string) => {
  const iconUrl =
    `data:image/svg+xml;base64,` +
    window.btoa(decodeURIComponent(encodeURIComponent(svgIcon(selectedColor)))); // replace escape with decodeURIComponent https://stackoverflow.com/questions/27926562/deprecation-of-javascript-function-unescape
  return iconUrl;
};

export interface IDesign {
  _id: string;
  user_id: string;
  designName: string;
  tileColor: ITileColor[];
  courtSize: ICourtSize;
}

export interface ITileColor {
  location: string;
  color: string;
}

export interface ICourtData extends ICourtSize {
  _id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isDeleted?: boolean;
  isHidden: boolean;
}
interface ICourtSize {
  name: string;
  length: number;
  width: number;
  centreCircleRadius: number;
  threePointRadius: number;
  threePointLine: number;
  lengthOfCorner: number;
  restrictedAreaLength: number;
  restrictedAreaWidth: number;
  sideBorderWidth: number;
  lineBorderWidth: number;
}

export interface ICourtColor {
  designId: string;
  tileColor: ITileColor[];
}

export interface ISaveDesign {
  user_id: string;
  designName: string;
  tileColor: ITileColor[];
  courtSize: ICourtSize;
}

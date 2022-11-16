export interface IDesign {
  _id: string;
  user_id: string;
  designName: string;
  courtType: string;
  tileColor: ITileColor[];
  courtSize: ICourtSize;
}

export interface IDesignDetail extends IDesign {
  description: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  image: string;
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
export interface ICourtSize {
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
  // fencingLength: number;
  // fencingWidth: number;
  // hoopsCount: number;
}
// todo: add fencing and hoops data - now waiting for backend

export interface ICourtColor {
  designId: string;
  tileColor: ITileColor[];
}

export interface ISaveDesign {
  designer?: string;
  user_id: string;
  designName: string;
  tileColor: ITileColor[];
  courtSize: ICourtSize;
  image: string;
}

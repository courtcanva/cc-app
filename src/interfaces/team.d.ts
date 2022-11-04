export interface IMember {
  _id: string;
  name: string;
  profileImgUrl: string;
  role: string;
  linkedInUrl: string;
  githubUrl: string;
  emailAddress: string;
}

export interface IGroupedMembers {
  [key: string]: IMember[];
}

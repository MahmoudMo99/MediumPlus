export interface IGetAvailableRooms {
  id: number;
  roomNumber: number;
  availablePlaces: number;
  floorName: string;
  floorOrder: number;
  buildingName: string;
  fullCapacity: number;
  isAvailable: boolean;
}
export interface IGetAvailableRoomsRequest {
  pageNumber: number;
  pageSize: number;
  floorOrder: number;
  buildingId: number;
  serach: string;
  studentCityId: number;
}
export interface IGetRoomById {
  id: number;
  number: number;
  floorName: string;
  fullCapacity: number;
  availablePlaces: number;
  buildingName: string;
  isStudentRoom: boolean;
  students: IRoomMember[];
  isAvailable: boolean;
  beds: IBedStudent[];
}
export interface IGetAvailableRoomsAdmin {
  id: number;
  roomNumber: number;
  availablePlaces: number;
  floorName: string;
  floorOrder: number;
  buildingName: string;
  fullCapacity: number;
  isAvailable: boolean;
}
export interface IGetRoomByIdAdmin {
  id: number;
  number: number;
  floorName: string;
  buildingName: string;
  buildingId: number;
  floorId: number;
  fullCapacity: number;
  numbersOfBed: number;
  availablePlaces: number;
  students: IRoomMember[];
  beds: IBedAdmin[];
  isAvailable: boolean;
}
export interface IRoomMember {
  studentId: number;
  studentName: string;
  bedNumber: number;
  levelName: string;
  facultyName: string;
  departmentName: string;
  cityName: string;
  villageName: string;
  profilePhoto: string;
}
export interface IBedStudent {
  id: number;
  number: number;
  isBedAvailable: boolean;
  isStudentBed: boolean;
}

export interface IBedAdmin {
  id: number;
  number: number;
  isBedAvailable: boolean;
}

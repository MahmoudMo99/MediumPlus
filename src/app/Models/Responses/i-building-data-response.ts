import {
  IBuildingRequest,
  IRoomRequest,
} from '../Requests/i-building-data-request';
import { IFacultySelect } from '../ifaculty';

export interface IBuildingResponse extends IBuildingRequest {
  id: number;
  typeName: string;
  numOfFloors: number;
  numOfRooms: number;
  facultyDetails: IFacultySelect[];
}

export interface IFloorResponse {
  id: number;
  name: string;
  order: number;
  numOfRooms: number;
}

export interface IRoomResponse extends IRoomRequest {
  id: number;
}

export interface IBuildingsInRoomsStudent {
  id: number;
  name: string;
  type: string;
  isActive: boolean;
  numOfFloors: number;
  numOfRooms: number;
}

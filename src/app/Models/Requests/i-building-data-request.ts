export interface IBuildingRequest {
  name: string;
  type: number;
  isActive: boolean;
}

export interface IBuildingType {
  id: number;
  name: string;
}

export interface IFloorRequest {
  buildingId: number;
  order: number;
  floorName: string;
  isActive: boolean;
}

export interface IRoomRequest {
  buildingId: number;
  floorId: number;
  number: number;
  fullCapacity: number;
  isActive: boolean;
}

export interface IEditRoomRequest {
  id: number;
  buildingId: number;
  floorId: number;
  number: number;
  capacity: number;
  isActive: boolean;
}

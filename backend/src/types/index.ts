import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    mobile?: string;
    email?: string;
  };
}

export interface SoilNutrients {
  pH: number;
  nitrogen: number; // N in kg/ha or mg/kg
  phosphorus: number; // P in kg/ha
  potassium: number; // K in kg/ha
  organicCarbon: number; // OC in %
  sulfur: number; // S in ppm
  zinc: number; // Zn in ppm
  iron: number; // Fe in ppm
}

export interface FarmLocation {
  latitude?: number;
  longitude?: number;
  village: string;
  district: string;
  state: string;
}

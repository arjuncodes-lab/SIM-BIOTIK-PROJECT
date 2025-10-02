import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
 
export interface GeoLocation {
  display_name: string;
  lat: string;
  lon: string;
}
 
export interface RouteResult {
  distance: number;
  duration: number;
  geometry: any;
}
 
@Injectable({ providedIn: 'root' })
export class MapRoutingService {
  constructor(private http: HttpClient) {}
}
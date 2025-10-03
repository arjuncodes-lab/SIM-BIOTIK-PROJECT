import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export interface GeoLocation {
  display_name: string;
  lat: string;
  lon: string;
}

export interface RouteResult {
  distance: number; // meters
  duration: number; // seconds
}

@Injectable({ providedIn: 'root' })
export class MapRoutingService {
  constructor(private http: HttpClient) {}

  searchLocation(query: string): Observable<GeoLocation[]> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    return this.http.get<GeoLocation[]>(url).pipe(
      catchError(() => of([]))
    );
  }

  getRoute(start: GeoLocation, end: GeoLocation): Observable<RouteResult | null> {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}?overview=false`;
    return this.http.get<any>(url).pipe(
      map(res => {
        if (!res.routes?.length) return null;
        const route = res.routes[0];
        return {
          distance: route.distance,
          duration: route.duration
        } as RouteResult;
      }),
      catchError(() => of(null))
    );
  }
}

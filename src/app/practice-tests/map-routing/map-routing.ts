import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapRoutingService, GeoLocation, RouteResult } from '../../services/map-routing.service';

@Component({
  selector: 'app-map-routing',
  standalone: true,
  imports: [CommonModule, FormsModule],
   templateUrl: './map-routing.html',
  styleUrl: './map-routing.scss'
})
export class MapRouting {
  fromQuery = '';
  toQuery = '';
  fromSuggestions: GeoLocation[] = [];
  toSuggestions: GeoLocation[] = [];
  selectedFrom?: GeoLocation;
  selectedTo?: GeoLocation;

  routeResult: RouteResult | null = null;
  error: string | null = null;

  constructor(private mapService: MapRoutingService) {}

  onFromInput() {
    if (this.fromQuery.length < 3) {
      this.fromSuggestions = [];
      return;
    }
    this.mapService.searchLocation(this.fromQuery).subscribe(res => {
      this.fromSuggestions = res;
    });
  }

  onToInput() {
    if (this.toQuery.length < 3) {
      this.toSuggestions = [];
      return;
    }
    this.mapService.searchLocation(this.toQuery).subscribe(res => {
      this.toSuggestions = res;
    });
  }

  selectFrom(loc: GeoLocation) {
    this.selectedFrom = loc;
    this.fromQuery = loc.display_name;
    this.fromSuggestions = [];
    this.tryRoute();
  }

  selectTo(loc: GeoLocation) {
    this.selectedTo = loc;
    this.toQuery = loc.display_name;
    this.toSuggestions = [];
    this.tryRoute();
  }

  tryRoute() {
    this.routeResult = null;
    this.error = null;
    if (this.selectedFrom && this.selectedTo) {
      this.mapService.getRoute(this.selectedFrom, this.selectedTo).subscribe(route => {
        if (!route) {
          this.error = 'No route found';
          return;
        }
        this.routeResult = route;
      });
    }
  }
}
 
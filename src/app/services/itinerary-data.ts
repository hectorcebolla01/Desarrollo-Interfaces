import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ItineraryInfo } from '../models/itinerary.model';

@Injectable({ providedIn: 'root' })
export class ItineraryData {
    private readonly http = inject(HttpClient);

    // Reads the local mock JSON (same pattern as VehicleData).
    getItinerary(): Observable<ItineraryInfo> {
        return this.http.get<ItineraryInfo>('data/itinerary.json');
    }
}
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

// providedIn: 'root' makes this service a single shared instance
// available anywhere in the app, with no extra configuration.
@Injectable({ providedIn: 'root' })
export class VehicleData {
    // inject() is the modern way to get a dependency (instead of the constructor).
    private readonly http = inject(HttpClient);

    // Reads the local mock JSON. The URL is relative to the app root.
    getVehicles(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>('data/vehicles.json');
    }
}
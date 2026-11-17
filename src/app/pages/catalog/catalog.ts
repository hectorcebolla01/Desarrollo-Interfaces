import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { VehicleData } from '../../services/vehicle-data';

@Component({
  imports: [],
  selector: 'app-catalog',

  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  private readonly vehicleData = inject(VehicleData);

  // toSignal converts the Observable into a Signal.
  // initialValue avoids an undefined state while the data is loading.
  readonly vehicles = toSignal(this.vehicleData.getVehicles(), { initialValue: [] });
}
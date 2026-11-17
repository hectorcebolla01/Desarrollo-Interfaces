import { Component, input, output } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.html',
  styleUrl: './vehicle-card.scss',
})
export class VehicleCard {
  // Signal-based input: the parent passes the vehicle. "required" means
  // Angular throws an error if the parent forgets to provide it.
  readonly vehicle = input.required<Vehicle>();

  // Signal-based output: the card notifies the parent when the user
  // wants to see the technical sheet.
  readonly detailsRequested = output<Vehicle>();

  onDetailsClick(): void {
    // vehicle() reads the current value of the input signal.
    this.detailsRequested.emit(this.vehicle());
  }
}
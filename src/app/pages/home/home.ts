import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { VehicleData } from '../../services/vehicle-data';
import { VehicleCard } from '../../components/vehicle-card/vehicle-card';

@Component({
  selector: 'app-home',
  imports: [VehicleCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly vehicleData = inject(VehicleData);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly router = inject(Router);

  readonly vehicles = toSignal(this.vehicleData.getVehicles(), { initialValue: [] });

  // Derived state: only the vehicles marked as featured in the JSON.
  readonly featuredVehicles = computed(() =>
    this.vehicles().filter((vehicle) => vehicle.featured),
  );

  // Angular blocks iframe URLs by default (security). Since this URL is a
  // constant written by us (not user input), it's safe to mark it as trusted.
  // CHANGE the coordinates to your real meeting point.
  readonly mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.openstreetmap.org/export/embed.html' +
      '?bbox=-3.7174,40.4105,-3.6974,40.4205&layer=mapnik&marker=40.4155,-3.7074',
  );

  // From the home page, a card's "technical sheet" button leads to the catalog.
  goToCatalog(): void {
    this.router.navigate(['/catalog']);
  }
}
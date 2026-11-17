import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { VehicleData } from '../../services/vehicle-data';
import { VehicleCard } from '../../components/vehicle-card/vehicle-card';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  imports: [VehicleCard],
  selector: 'app-catalog',
   // Standalone: child components are declared here
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  private readonly vehicleData = inject(VehicleData);

  // Source data: Observable from the service converted into a Signal.
  readonly vehicles = toSignal(this.vehicleData.getVehicles(), { initialValue: [] });

  // ---- Local reactive state (writable signals) ----
  readonly searchTerm = signal('');
  readonly selectedCategory = signal('all');
  readonly selectedVehicle = signal<Vehicle | null>(null);

  // ---- Derived state (computed signals) ----
  // Unique list of categories, built from the data. Recalculates when vehicles change.
  readonly categories = computed(() => {
    const all = this.vehicles().map((vehicle) => vehicle.category);
    return [...new Set(all)].sort(); // Set removes duplicates
  });

  // The filtered list. It reads searchTerm, selectedCategory and vehicles,
  // so Angular re-runs it automatically whenever any of them changes.
  readonly filteredVehicles = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const category = this.selectedCategory();

    return this.vehicles().filter((vehicle) => {
      const matchesText = `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(term);
      const matchesCategory = category === 'all' || vehicle.category === category;
      return matchesText && matchesCategory;
    });
  });

  // ---- Event handlers: they only update signals ----
  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  onCategoryChange(event: Event): void {
    this.selectedCategory.set((event.target as HTMLSelectElement).value);
  }

  resetFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('all');
  }

  showDetails(vehicle: Vehicle): void {
    this.selectedVehicle.set(vehicle);
  }

  closeDetails(): void {
    this.selectedVehicle.set(null);
  }
}
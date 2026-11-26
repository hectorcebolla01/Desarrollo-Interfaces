import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { ItineraryData } from '../../services/itinerary-data';
import { ItineraryInfo, Stage } from '../../models/itinerary.model';

@Component({
  selector: 'app-itinerary',
  imports: [],
  templateUrl: './itinerary.html',
  styleUrl: './itinerary.scss',
})
export class Itinerary {
  private readonly itineraryData = inject(ItineraryData);
  private readonly sanitizer = inject(DomSanitizer);

  // Empty initial value so the template never reads undefined while loading.
  private readonly emptyInfo: ItineraryInfo = { schedule: [], stages: [] };
  readonly info = toSignal(this.itineraryData.getItinerary(), {
    initialValue: this.emptyInfo,
  });

  // Derived lists to keep the template simple.
  readonly schedule = computed(() => this.info().schedule);
  readonly stages = computed(() => this.info().stages);

  // Id of the stage chosen by the user. It starts on the first stage.
  readonly selectedStageId = signal(1);

  // The full selected stage, derived from the id and the data.
  readonly selectedStage = computed<Stage | undefined>(() =>
    this.stages().find((stage) => stage.id === this.selectedStageId()),
  );

  // Map URL derived from the selected stage. It re-runs when the stage changes.
  // The coordinates come from our own JSON (not from user input), so marking
  // the URL as trusted is safe here.
  readonly mapUrl = computed(() => {
    const stage = this.selectedStage();
    if (!stage) {
      return null;
    }
    const delta = 0.03; // Zoom: half-size of the visible area in degrees
    const bbox = [
      stage.lng - delta,
      stage.lat - delta,
      stage.lng + delta,
      stage.lat + delta,
    ].join(',');
    const url =
      'https://www.openstreetmap.org/export/embed.html' +
      `?bbox=${bbox}&layer=mapnik&marker=${stage.lat},${stage.lng}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  selectStage(id: number): void {
    this.selectedStageId.set(id);
  }
}
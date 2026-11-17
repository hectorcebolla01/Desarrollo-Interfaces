import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';
import { Itinerary } from './pages/itinerary/itinerary';
import { StyleGuide } from './pages/style-guide/style-guide';
import { Registration } from './pages/registration/registration';

export const routes: Routes = [
    // Root route ("/"): loads the home page.
    // "title" sets the browser tab title (good for accessibility).
    { path: '', component: Home, title: 'Inicio | Classic Motor' },
    { path: 'catalog', component: Catalog, title: 'Catálogo | Classic Motor' },
    { path: 'itinerary', component: Itinerary, title: 'Itinerario | Classic Motor' },
    { path: 'registration', component: Registration, title: 'Inscripción | Classic Motor' },
    // Path required literally by the assignment brief.
    { path: 'guia-estilo', component: StyleGuide, title: 'Guía de estilo | Classic Motor' },
    // Wildcard: any unknown URL redirects to home.
    // It must always be the LAST route, because Angular matches from top to bottom.
    { path: '**', redirectTo: '' },
];

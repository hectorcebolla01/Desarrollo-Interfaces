// Describes the shape of every vehicle in vehicles.json.
// TypeScript will warn us if we use a property that doesn't exist.
export interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    category: string;   // Used by the catalog filter
    power: number;      // Horsepower (hp)
    engine: string;     // Short engine description
    image: string;      // Path inside the public/ folder
    imageAlt: string;   // Descriptive alt text (WCAG requirement)
    summary: string;    // Short text for the card
    history: string;    // Longer text for the technical sheet
    featured: boolean;  // true = shown in the "featured" block on the home page
}
// One activity in the day schedule.
export interface ScheduleItem {
    time: string;        // "HH:mm" format
    title: string;
    description: string;
}

// One stage of the route, with coordinates to show it on the map.
export interface Stage {
    id: number;
    name: string;
    description: string;
    distanceKm: number;  // Distance from the previous stage
    lat: number;
    lng: number;
}

// Shape of the whole itinerary.json file.
export interface ItineraryInfo {
    schedule: ScheduleItem[];
    stages: Stage[];
}
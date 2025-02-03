// Clase Teams
class Teams {
    constructor(name, country, motor, image) {
        this.name = name;
        this.country = country;
        this.motor = motor;
        this.image = image;
        this.pilots = [];
    }

    addPilot(pilotId) {
        this.pilots.push(pilotId);
    }

    getPilots(allPilots) {
        return this.pilots.map(pilotId => allPilots.find(pilot => pilot.id === pilotId));
    }
}
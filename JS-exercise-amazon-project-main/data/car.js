export class Car {
  brand;
  model;
  speed;
  isTrunkOpen;

  constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
    this.speed = 0; // initialize speed here
    this.isTrunkOpen = false; // initialize trunk state here
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }

  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5;
    }

    // Limit the speed to 200.
    if (this.speed > 200) {
      this.speed = 200;
    }
  }

  brake() {
    this.speed -= 5;

    // Limit the speed to 0.
    if (this.speed < 0) {
      this.speed = 0;
    }
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? "open" : "closed";

    console.log(
      `${this.brand} ${this.model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`
    );
  }
}

export class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);

    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    // Limit the speed to 200.
    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log("Race cars do not have a trunk.");
  }

  closeTrunk() {
    console.log("Race cars do not have a trunk.");
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`);
  }
}

// Test code
const car1 = new Car({ brand: "Toyota", model: "Corolla" });
const car2 = new Car({ brand: "Tesla", model: "Model 3" });
const raceCar1 = new RaceCar({
  brand: "Mclaren",
  model: "F1",
  acceleration: 20,
});

console.log(car1);
console.log(car2);

car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();

console.log(`--------------------------------`);
// Trunk should not open since the car is moving.
car1.openTrunk();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();

// Trunk should open since the car is not moving.
car2.openTrunk();
// Car should not go since the trunk is open.
car2.go();
car2.displayInfo();

console.log(`--------------------------------`);
console.log(raceCar1);
raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.displayInfo();
raceCar1.openTrunk();
raceCar1.displayInfo();
raceCar1.brake();
raceCar1.displayInfo();

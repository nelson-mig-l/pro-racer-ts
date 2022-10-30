import { Axis } from "@babylonjs/core/Maths/math";
import { Car } from "./car";

const actions = new Map<string, boolean>([
    ["acceleration", false],
    ["braking", false],
    ["right", false],
    ["left", false]
]);

const keysActions = new Map<string, string>([
    ["KeyW",'acceleration'],
    ["KeyS",'braking'],
    ["KeyA",'left'],
    ["KeyD",'right']
]);

export class Controls {

    car: Car;

    constructor(car: Car) {
        this.car = car;
        window.addEventListener( 'keydown', this.keydown);
        window.addEventListener( 'keyup', this.keyup);
    }

    update() {
        if(this.car.vehicleReady){
                  
            const speed = this.car.vehicle.getCurrentSpeedKmHour();
            const maxSteerVal = 0.2;
            this.car.breakingForce = 0;
            this.car.engineForce = 0;

            
            if(actions.get("acceleration")){
                if (speed < -1){
                    this.car.breakingForce = this.car.maxBreakingForce;
                }else {
                    this.car.engineForce = this.car.maxEngineForce;
                }
                    
            } else if(actions.get("braking")){
                if (speed > 1){
                    this.car.breakingForce = this.car.maxBreakingForce;
                }else {
                    this.car.engineForce = -this.car.maxEngineForce ;
                }
            } 
                    
            if(actions.get("right")){
                if (this.car.vehicleSteering < this.car.steeringClamp){
                    this.car.vehicleSteering += this.car.steeringIncrement;
                }
                    
            } else if(actions.get("left")){
                if (this.car.vehicleSteering > -this.car.steeringClamp){
                    this.car.vehicleSteering -= this.car.steeringIncrement;
                }
                    
            } else {
                this.car.vehicleSteering = 0;
            }
                    
            this.car.vehicle.applyEngineForce(this.car.engineForce, this.car.FRONT_LEFT);
            this.car.vehicle.applyEngineForce(this.car.engineForce, this.car.FRONT_RIGHT);
                    
            this.car.vehicle.setBrake(this.car.breakingForce / 2, this.car.FRONT_LEFT);
            this.car.vehicle.setBrake(this.car.breakingForce / 2, this.car.FRONT_RIGHT);
            this.car.vehicle.setBrake(this.car.breakingForce, this.car.BACK_LEFT);
            this.car.vehicle.setBrake(this.car.breakingForce, this.car.BACK_RIGHT);
                    
            this.car.vehicle.setSteeringValue(this.car.vehicleSteering, this.car.FRONT_LEFT);
            this.car.vehicle.setSteeringValue(this.car.vehicleSteering, this.car.FRONT_RIGHT);
                    
                    
            let tm, p, q, i;
            const n = this.car.vehicle.getNumWheels();
            for (i = 0; i < n; i++) {
                this.car.vehicle.updateWheelTransform(i, true);
                tm = this.car.vehicle.getWheelTransformWS(i);
                p = tm.getOrigin();
                q = tm.getRotation();
                this.car.wheelMeshes[i].position.set(p.x(), p.y(), p.z());
                this.car.wheelMeshes[i].rotationQuaternion?.set(q.x(), q.y(), q.z(), q.w());
                this.car.wheelMeshes[i].rotate(Axis.Z, Math.PI/2);
            }

            tm = this.car.vehicle.getChassisWorldTransform();
            p = tm.getOrigin();
            q = tm.getRotation();
            this.car.chassisMesh.position.set(p.x(), p.y(), p.z());
            this.car.chassisMesh.rotationQuaternion?.set(q.x(), q.y(), q.z(), q.w());
            this.car.chassisMesh.rotate(Axis.X, Math.PI);
                 
        }
    }

    private keyup(e: KeyboardEvent) {
        if(keysActions.get(e.code)) {
            actions.set(keysActions.get(e.code)??"", false);
            //e.preventDefault();
            //e.stopPropagation();

            //return false;
        }
    }

    private keydown(e: KeyboardEvent) {
        if(keysActions.get(e.code)) {
            actions.set(keysActions.get(e.code)??"", true);
            //e.preventDefault();
            //e.stopPropagation();

            //return false;
        }
    }


}

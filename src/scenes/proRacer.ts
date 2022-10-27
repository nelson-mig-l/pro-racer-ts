import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { SphereBuilder } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { AmmoJSPlugin } from "@babylonjs/core/Physics/Plugins/ammoJSPlugin";
import "@babylonjs/core/Physics/physicsEngineComponent";

// If you don't need the standard material you will still need to import it since the scene requires it.
import "@babylonjs/core/Materials/standardMaterial";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";
import { ammoModule, ammoReadyPromise } from "../externals/ammo";
import { CreateSceneClass } from "../createScene";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Axis, Color3 } from "@babylonjs/core/Maths/math";
import * as GRID from "@babylonjs/materials/grid";

import {Boxes} from "./boxes"
import {Car} from "./car";

class ProRacerScene implements CreateSceneClass {
    preTasks = [ammoReadyPromise];

    createScene = async (engine: Engine, canvas: HTMLCanvasElement): Promise<Scene> => {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);
        const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Materials
        const redMaterial = new StandardMaterial("RedMaterial", scene);
        redMaterial.diffuseColor = new Color3(0.8,0.4,0.5);
        redMaterial.emissiveColor = new Color3(0.8,0.4,0.5);

        scene.enablePhysics(new Vector3(0,-10,0), new AmmoJSPlugin(true, ammoModule));

        /* Testing physics
        const zero = new ammoModule.btVector3(0, 0, 0);
        console.log(zero);
        const tm = new ammoModule.btTriangleMesh();
        console.log("TriangleMesh");
        console.log(tm);
        console.log("----");
        //const meshShape = ammoModule.btBvhTriangleMeshShape(tm, true, true);
        console.log("====");
        //console.log(meshShape.name);
        */

        // Our built-in 'ground' shape.
        
        const ground = MeshBuilder.CreateGround("ground", { 
            width: 460, 
            height: 460, 
            subdivisions: 2 
        }, scene);
        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { 
            mass: 0, 
            friction: 0.5, 
            restitution: 0.7
        }, scene);

        ground.material = new GRID.GridMaterial("groundMaterial", scene);
        
    
        /*
        // Our built-in 'sphere' shape.
        const sphere = SphereBuilder.CreateSphere(
            "sphere",
            { diameter: 2, segments: 32 },
            scene
        );
    
        sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, {
            mass: 2, 
            restitution: 0.8
        }, scene);
        sphere.material = redMaterial;
    
        // Move the sphere upward 1/2 its height
        sphere.position.y = 5;
        */
        // Our built-in 'ground' shape.
        // const ground = GroundBuilder.CreateGround(
        //     "ground",
        //     { width: 6, height: 6 },
        //     scene
        // );
        
        //ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.6});

        const boxes = new Boxes(scene)
        boxes.baseBoxes();
        boxes.randomBoxes();

        //const actions = {acceleration:false,braking:false,right:false,left:false};
        const actions = new Map<string, boolean>([
            ["acceleration", false],
            ["braking", false],
            ["right", false],
            ["left", false]
        ]);
        
        // const keysActions = {
        //     "KeyW":'acceleration',
        //     "KeyS":'braking',
        //     "KeyA":'left',
        //     "KeyD":'right'
        // };
        const keysActions = new Map<string, string>([
            ["KeyW",'acceleration'],
            ["KeyS",'braking'],
            ["KeyA",'left'],
            ["KeyD",'right']
        ]);

        function keyup(e: KeyboardEvent) {
            if(keysActions.get(e.code)) {
                actions.set(keysActions.get(e.code)??"", false);
                //e.preventDefault();
                //e.stopPropagation();
        
                //return false;
            }
        }
        
        function keydown(e: KeyboardEvent) {
            if(keysActions.get(e.code)) {
                actions.set(keysActions.get(e.code)??"", true);
                //e.preventDefault();
                //e.stopPropagation();
        
                //return false;
            }
        }

        const car = new Car(new Vector3(0, 4, -20), scene, ammoModule);

        window.addEventListener( 'keydown', keydown);
        window.addEventListener( 'keyup', keyup);

        scene.registerBeforeRender(function() {
            const dt = engine.getDeltaTime()/*.toFixed()*//1000;
            if(car.vehicleReady){
                  
                const speed = car.vehicle.getCurrentSpeedKmHour();
                const maxSteerVal = 0.2;
                car.breakingForce = 0;
                car.engineForce = 0;
    
                
                if(actions.get("acceleration")){
                    if (speed < -1){
                        car.breakingForce = car.maxBreakingForce;
                    }else {
                        car.engineForce = car.maxEngineForce;
                    }
                        
                } else if(actions.get("braking")){
                    if (speed > 1){
                        car.breakingForce = car.maxBreakingForce;
                    }else {
                        car.engineForce = -car.maxEngineForce ;
                    }
                } 
                        
                if(actions.get("right")){
                    if (car.vehicleSteering < car.steeringClamp){
                        car.vehicleSteering += car.steeringIncrement;
                    }
                        
                } else if(actions.get("left")){
                    if (car.vehicleSteering > -car.steeringClamp){
                        car.vehicleSteering -= car.steeringIncrement;
                    }
                        
                } else {
                    car.vehicleSteering = 0;
                }
                        
                car.vehicle.applyEngineForce(car.engineForce, car.FRONT_LEFT);
                car.vehicle.applyEngineForce(car.engineForce, car.FRONT_RIGHT);
                        
                car.vehicle.setBrake(car.breakingForce / 2, car.FRONT_LEFT);
                car.vehicle.setBrake(car.breakingForce / 2, car.FRONT_RIGHT);
                car.vehicle.setBrake(car.breakingForce, car.BACK_LEFT);
                car.vehicle.setBrake(car.breakingForce, car.BACK_RIGHT);
                        
                car.vehicle.setSteeringValue(car.vehicleSteering, car.FRONT_LEFT);
                car.vehicle.setSteeringValue(car.vehicleSteering, car.FRONT_RIGHT);
                        
                        
                let tm, p, q, i;
                const n = car.vehicle.getNumWheels();
                for (i = 0; i < n; i++) {
                    car.vehicle.updateWheelTransform(i, true);
                    tm = car.vehicle.getWheelTransformWS(i);
                    p = tm.getOrigin();
                    q = tm.getRotation();
                    car.wheelMeshes[i].position.set(p.x(), p.y(), p.z());
                    car.wheelMeshes[i].rotationQuaternion?.set(q.x(), q.y(), q.z(), q.w());
                    car.wheelMeshes[i].rotate(Axis.Z, Math.PI/2);
                }
    
                tm = car.vehicle.getChassisWorldTransform();
                p = tm.getOrigin();
                q = tm.getRotation();
                car.chassisMesh.position.set(p.x(), p.y(), p.z());
                car.chassisMesh.rotationQuaternion?.set(q.x(), q.y(), q.z(), q.w());
                car.chassisMesh.rotate(Axis.X, Math.PI);
                     
            }
        });
    
        return scene;
    };

}

export default new ProRacerScene();

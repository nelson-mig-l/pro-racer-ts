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
import { Controls } from "./controls";

import grassTextureUrl from "../../assets/grass.jpg";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";

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
        //ground.material = new GRID.GridMaterial("groundMaterial", scene);
        const groundMaterial = new StandardMaterial("ground material", scene);
        groundMaterial.diffuseTexture = new Texture(grassTextureUrl, scene);
        ground.material = groundMaterial;

        
        const boxes = new Boxes(scene)
        boxes.baseBoxes();
        boxes.randomBoxes();


        const car = new Car(new Vector3(0, 4, -20), scene, ammoModule);
        const controls = new Controls(car);

        scene.registerBeforeRender(function() {
            const dt = engine.getDeltaTime()/*.toFixed()*//1000;
            controls.update();
        });
    
        return scene;
    };
    
}

export default new ProRacerScene();

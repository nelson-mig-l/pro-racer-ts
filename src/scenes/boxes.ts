import { Material } from "@babylonjs/core/Materials/material";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";
import { Scene } from "@babylonjs/core/scene";

export class Boxes {
    redMaterial: StandardMaterial;
    blueMaterial: StandardMaterial;
    scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;

        this.redMaterial = new StandardMaterial("RedMaterial", scene);
        this.redMaterial.diffuseColor = new Color3(0.8,0.4,0.5);
        this.redMaterial.emissiveColor = new Color3(0.8,0.4,0.5);

        this.blueMaterial = new StandardMaterial("BlueMaterial", scene);
        this.blueMaterial.diffuseColor = new Color3(0.5,0.4,0.8);
        this.blueMaterial.emissiveColor = new Color3(0.5,0.4,0.8);  
    }

    public baseBoxes() : void {
        this.createBox(new Vector3(4,1,12),new Vector3(0,0,25),new Vector3(-Math.PI/8,0,0),0);
        this.createBox(new Vector3(4,1,12),new Vector3(25,0,0),new Vector3(-Math.PI/8,Math.PI/2,0),0);
        this.createBox(new Vector3(4,1,12),new Vector3(0,0,-25),new Vector3(Math.PI/8,0,0),0);
        this.createBox(new Vector3(4,1,12),new Vector3(-25,0,0),new Vector3(Math.PI/8,Math.PI/2,0),0);
    }

    public randomBoxes() : void {
        const s = new Vector3();
        const p = new Vector3();
        const r = new Vector3();
        for(let i=0;i<20;i++){
            const m = Math.random()*300-150+5;
            const m3 = Math.random()*300-150+5;
            const m2 = Math.random()*10;
            s.set(m2,m2,m2);
            p.set(m3,0,m);
            r.set(m,m,m);
            this.createBox(s,p,r,0);
        }
    
        for(let i=0;i<30;i++){
            const m = Math.random()*300-150+5;
            const m3 = Math.random()*300-150+5;
            const m2 = Math.random()*3;
            s.set(m2,m2,m2);
            p.set(m3,0,m);
            r.set(m,m,m);
            this.createBox(s,p,r,5);
        }
    }

    private createBox(size: Vector3, position: Vector3, rotation: Vector3, mass: number) : Mesh {
        const box = MeshBuilder.CreateBox("box", { width: size.x, depth: size.z, height: size.y }, this.scene);
        box.position.set(position.x,position.y,position.z);
        box.rotation.set(rotation.x,rotation.y,rotation.z);
        if(!mass){
            mass = 0;
            box.material = this.redMaterial;
        } else {
            box.position.y += 5;
            box.material = this.blueMaterial;
    
        }
        box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass: mass, friction: 0.5, restitution: 0.7 }, this.scene);
        return box;
    }
}


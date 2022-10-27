import { Mesh, StandardMaterial } from "@babylonjs/core";
import { FollowCamera } from "@babylonjs/core/Cameras/followCamera";
import { Color3, Quaternion, Vector3 } from "@babylonjs/core/Maths/math";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";

export class Car {
    ZERO_QUATERNION = new Quaternion(); 

    FRONT_LEFT = 0;
    FRONT_RIGHT = 1;
    BACK_LEFT = 2;
    BACK_RIGHT = 3;

    chassisWidth = 1.8;
    chassisHeight = .6;
    chassisLength = 4;
    massVehicle = 200;


    wheelAxisPositionBack = -1;
    wheelRadiusBack = .4;
    wheelWidthBack = .3;
    wheelHalfTrackBack = 1;
    wheelAxisHeightBack = 0.4;
    
    wheelAxisFrontPosition = 1.0;
    wheelHalfTrackFront = 1;
    wheelAxisHeightFront = 0.4;
    wheelRadiusFront = .4;
    wheelWidthFront = .3;

    friction = 5;
    suspensionStiffness = 10;
    suspensionDamping = 0.3;
    suspensionCompression = 4.4;
    suspensionRestLength = 0.6;
    rollInfluence = 0.0;

    wheelDirectionCS0: number | undefined;
    wheelAxleCS: number | undefined;

    steeringIncrement = .01;
    steeringClamp = 0.2;
    maxEngineForce = 500;
    maxBreakingForce = 10;
    incEngine = 10.0;

    vehicleSteering = 0;
    engineForce = 0;  
    breakingForce = 0;

    private scene : Scene;

    greenMaterial: StandardMaterial;
    blackMaterial: StandardMaterial;

    
    tuning: any;
    vehicle: any;
    wheelMeshes: Mesh[] = [];
    chassisMesh: Mesh;


    vehicleReady = false;

    constructor(pos: Vector3, scene: Scene, ammoModule: any) {
        this.greenMaterial = new StandardMaterial("GreenMaterial", scene);
        this.greenMaterial.diffuseColor = new Color3(0.5,0.8,0.5);
        this.greenMaterial.emissiveColor = new Color3(0.5,0.8,0.5);
    
        this.blackMaterial = new StandardMaterial("BlackMaterial", scene);
        this.blackMaterial.diffuseColor = new Color3(0.1,0.1,0.1);
        this.blackMaterial.emissiveColor = new Color3(0.1,0.1,0.1);

        this.scene = scene;
        //Going Native
        const physicsWorld = scene.getPhysicsEngine()?.getPhysicsPlugin().world;

        this.wheelDirectionCS0 = new ammoModule.btVector3(0, -1, 0);
        this.wheelAxleCS = new ammoModule.btVector3(-1, 0, 0);

        const geometry = new ammoModule.btBoxShape(new ammoModule.btVector3(
            this.chassisWidth * .5, 
            this.chassisHeight * .5, 
            this.chassisLength * .5));
        const transform = new ammoModule.btTransform();
        transform.setIdentity();
        transform.setOrigin(new ammoModule.btVector3(0,5,0));
        transform.setRotation(new ammoModule.btQuaternion(
            this.ZERO_QUATERNION.x, 
            this.ZERO_QUATERNION.y, 
            this.ZERO_QUATERNION.z, 
            this.ZERO_QUATERNION.w));
        const motionState = new ammoModule.btDefaultMotionState(transform);
        const localInertia = new ammoModule.btVector3(0, 0, 0);
        geometry.calculateLocalInertia(this.massVehicle, localInertia);


        this.chassisMesh = this.createChassisMesh(this.chassisWidth, this.chassisHeight, this.chassisLength);


        const massOffset = new ammoModule.btVector3( 0, 0.4, 0);
        const transform2 = new ammoModule.btTransform();
        transform2.setIdentity();
        transform2.setOrigin(massOffset);
        const compound = new ammoModule.btCompoundShape();
        compound.addChildShape( transform2, geometry );

        const body = new ammoModule.btRigidBody(new ammoModule.btRigidBodyConstructionInfo(this.massVehicle, motionState, compound, localInertia));
        body.setActivationState(4);
		
        physicsWorld.addRigidBody(body);


        this.tuning = new ammoModule.btVehicleTuning();
        const rayCaster = new ammoModule.btDefaultVehicleRaycaster(physicsWorld);
        this.vehicle = new ammoModule.btRaycastVehicle(this.tuning, body, rayCaster);
        this.vehicle.setCoordinateSystem(0, 1, 2);
        physicsWorld.addAction(this.vehicle);
		
        const trans = this.vehicle.getChassisWorldTransform();

        this.addWheel(true, 
            new ammoModule.btVector3(this.wheelHalfTrackFront, this.wheelAxisHeightFront, this.wheelAxisFrontPosition), 
            this.wheelRadiusFront, this.wheelWidthFront, this.FRONT_LEFT);
        this.addWheel(true, 
            new ammoModule.btVector3(-this.wheelHalfTrackFront, this.wheelAxisHeightFront, this.wheelAxisFrontPosition), 
            this.wheelRadiusFront, this.wheelWidthFront, this.FRONT_RIGHT);
        this.addWheel(false, 
            new ammoModule.btVector3(-this.wheelHalfTrackBack, this.wheelAxisHeightBack, this.wheelAxisPositionBack), 
            this.wheelRadiusBack, this.wheelWidthBack, this.BACK_LEFT);
        this.addWheel(false, 
            new ammoModule.btVector3(this.wheelHalfTrackBack, this.wheelAxisHeightBack, this.wheelAxisPositionBack), 
            this.wheelRadiusBack, this.wheelWidthBack, this.BACK_RIGHT);
    
        this.vehicleReady = true;
    }

    private createChassisMesh(w: number, l: number, h: number) : Mesh {
        const mesh = MeshBuilder.CreateBox("box", {width:w, depth:h, height:l}, this.scene);
        mesh.rotationQuaternion = new Quaternion();
        mesh.material = this.greenMaterial;
    
        const camera = new FollowCamera("FollowCam", new Vector3(0, 10, -10), this.scene);
        camera.radius = 10;
        camera.heightOffset = 4;
        camera.rotationOffset = 0;
        camera.cameraAcceleration = 0.05;
        camera.maxCameraSpeed = 400;
        camera.attachControl(true);//camera.attachControl(canvas, true);
        camera.lockedTarget = mesh; //version 2.5 onwards
        this.scene.activeCamera = camera;
    
        return mesh;
    }

    private addWheel(isFront: boolean, pos: Vector3, radius: number, width: number, index: number) {
			
        const wheelInfo = this.vehicle.addWheel(
            pos,
            this.wheelDirectionCS0,
            this.wheelAxleCS,
            this.suspensionRestLength,
            radius,
            this.tuning,
            isFront);

        wheelInfo.set_m_suspensionStiffness(this.suspensionStiffness);
        wheelInfo.set_m_wheelsDampingRelaxation(this.suspensionDamping);
        wheelInfo.set_m_wheelsDampingCompression(this.suspensionCompression);
        wheelInfo.set_m_maxSuspensionForce(600000);
        wheelInfo.set_m_frictionSlip(40);
        wheelInfo.set_m_rollInfluence(this.rollInfluence);

        this.wheelMeshes[index] = this.createWheelMesh(radius, width);
    }

    private createWheelMesh(radius: number, width: number) {
        //var mesh = new BABYLON.MeshBuilder.CreateBox("wheel", {width:.82, height:.82, depth:.82}, scene);
        const mesh = MeshBuilder.CreateCylinder("Wheel", {diameter:1, height:0.5, tessellation: 6}, this.scene);
        mesh.rotationQuaternion = new Quaternion();
        mesh.material = this.blackMaterial;
        return mesh;
    }
}
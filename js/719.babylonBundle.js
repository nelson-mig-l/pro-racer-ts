(self.webpackChunkpro_racer=self.webpackChunkpro_racer||[]).push([[719,976,403],{7594:(e,t,i)=>{"use strict";i.d(t,{H:()=>s,u:()=>r});var n=i(216);let s;const r=new Promise((e=>{(new n).then((t=>{s=t,e(t)}))}))},5575:(e,t,i)=>{"use strict";i.r(t),i.d(t,{Boxes:()=>a});var n=i(3242),s=i(7417),r=i(9823),o=i(9635);class a{constructor(e){this.scene=e,this.redMaterial=new n.K("RedMaterial",e),this.redMaterial.diffuseColor=new s.Wo(.8,.4,.5),this.redMaterial.emissiveColor=new s.Wo(.8,.4,.5),this.blueMaterial=new n.K("BlueMaterial",e),this.blueMaterial.diffuseColor=new s.Wo(.5,.4,.8),this.blueMaterial.emissiveColor=new s.Wo(.5,.4,.8)}baseBoxes(){this.createBox(new s.P(4,1,12),new s.P(0,0,25),new s.P(-Math.PI/8,0,0),0),this.createBox(new s.P(4,1,12),new s.P(25,0,0),new s.P(-Math.PI/8,Math.PI/2,0),0),this.createBox(new s.P(4,1,12),new s.P(0,0,-25),new s.P(Math.PI/8,0,0),0),this.createBox(new s.P(4,1,12),new s.P(-25,0,0),new s.P(Math.PI/8,Math.PI/2,0),0)}randomBoxes(){const e=new s.P,t=new s.P,i=new s.P;for(let n=0;n<20;n++){const n=300*Math.random()-150+5,s=300*Math.random()-150+5,r=10*Math.random();e.set(r,r,r),t.set(s,0,n),i.set(n,n,n),this.createBox(e,t,i,0)}for(let n=0;n<30;n++){const n=300*Math.random()-150+5,s=300*Math.random()-150+5,r=3*Math.random();e.set(r,r,r),t.set(s,0,n),i.set(n,n,n),this.createBox(e,t,i,5)}}createBox(e,t,i,n){const s=r.V.CreateBox("box",{width:e.x,depth:e.z,height:e.y},this.scene);return s.position.set(t.x,t.y,t.z),s.rotation.set(i.x,i.y,i.z),n?(s.position.y+=5,s.material=this.blueMaterial):(n=0,s.material=this.redMaterial),s.physicsImpostor=new o.Q(s,o.Q.BoxImpostor,{mass:n,friction:.5,restitution:.7},this.scene),s}}},9976:(e,t,i)=>{"use strict";i.r(t),i.d(t,{Car:()=>a});var n=i(7057),s=i(9121),r=i(7417),o=i(9823);class a{constructor(e,t,i){this.ZERO_QUATERNION=new r._f,this.FRONT_LEFT=0,this.FRONT_RIGHT=1,this.BACK_LEFT=2,this.BACK_RIGHT=3,this.chassisWidth=1.8,this.chassisHeight=.6,this.chassisLength=4,this.massVehicle=200,this.wheelAxisPositionBack=-1,this.wheelRadiusBack=.4,this.wheelWidthBack=.3,this.wheelHalfTrackBack=1,this.wheelAxisHeightBack=.4,this.wheelAxisFrontPosition=1,this.wheelHalfTrackFront=1,this.wheelAxisHeightFront=.4,this.wheelRadiusFront=.4,this.wheelWidthFront=.3,this.friction=5,this.suspensionStiffness=10,this.suspensionDamping=.3,this.suspensionCompression=4.4,this.suspensionRestLength=.6,this.rollInfluence=0,this.steeringIncrement=.01,this.steeringClamp=.2,this.maxEngineForce=500,this.maxBreakingForce=10,this.incEngine=10,this.vehicleSteering=0,this.engineForce=0,this.breakingForce=0,this.wheelMeshes=[],this.vehicleReady=!1,this.greenMaterial=new n.StandardMaterial("GreenMaterial",t),this.greenMaterial.diffuseColor=new r.Wo(.5,.8,.5),this.greenMaterial.emissiveColor=new r.Wo(.5,.8,.5),this.blackMaterial=new n.StandardMaterial("BlackMaterial",t),this.blackMaterial.diffuseColor=new r.Wo(.1,.1,.1),this.blackMaterial.emissiveColor=new r.Wo(.1,.1,.1),this.scene=t;const s=t.getPhysicsEngine()?.getPhysicsPlugin().world;this.wheelDirectionCS0=new i.btVector3(0,-1,0),this.wheelAxleCS=new i.btVector3(-1,0,0);const o=new i.btBoxShape(new i.btVector3(.5*this.chassisWidth,.5*this.chassisHeight,.5*this.chassisLength)),a=new i.btTransform;a.setIdentity(),a.setOrigin(new i.btVector3(0,5,0)),a.setRotation(new i.btQuaternion(this.ZERO_QUATERNION.x,this.ZERO_QUATERNION.y,this.ZERO_QUATERNION.z,this.ZERO_QUATERNION.w));const c=new i.btDefaultMotionState(a),h=new i.btVector3(0,0,0);o.calculateLocalInertia(this.massVehicle,h),this.chassisMesh=this.createChassisMesh(this.chassisWidth,this.chassisHeight,this.chassisLength);const l=new i.btVector3(0,.4,0),d=new i.btTransform;d.setIdentity(),d.setOrigin(l);const f=new i.btCompoundShape;f.addChildShape(d,o);const g=new i.btRigidBody(new i.btRigidBodyConstructionInfo(this.massVehicle,c,f,h));g.setActivationState(4),s.addRigidBody(g),this.tuning=new i.btVehicleTuning;const p=new i.btDefaultVehicleRaycaster(s);this.vehicle=new i.btRaycastVehicle(this.tuning,g,p),this.vehicle.setCoordinateSystem(0,1,2),s.addAction(this.vehicle),this.vehicle.getChassisWorldTransform(),this.addWheel(!0,new i.btVector3(this.wheelHalfTrackFront,this.wheelAxisHeightFront,this.wheelAxisFrontPosition),this.wheelRadiusFront,this.wheelWidthFront,this.FRONT_LEFT),this.addWheel(!0,new i.btVector3(-this.wheelHalfTrackFront,this.wheelAxisHeightFront,this.wheelAxisFrontPosition),this.wheelRadiusFront,this.wheelWidthFront,this.FRONT_RIGHT),this.addWheel(!1,new i.btVector3(-this.wheelHalfTrackBack,this.wheelAxisHeightBack,this.wheelAxisPositionBack),this.wheelRadiusBack,this.wheelWidthBack,this.BACK_LEFT),this.addWheel(!1,new i.btVector3(this.wheelHalfTrackBack,this.wheelAxisHeightBack,this.wheelAxisPositionBack),this.wheelRadiusBack,this.wheelWidthBack,this.BACK_RIGHT),this.vehicleReady=!0}createChassisMesh(e,t,i){const n=o.V.CreateBox("box",{width:e,depth:i,height:t},this.scene);n.rotationQuaternion=new r._f,n.material=this.greenMaterial;const a=new s.i("FollowCam",new r.P(0,10,-10),this.scene);return a.radius=10,a.heightOffset=4,a.rotationOffset=0,a.cameraAcceleration=.05,a.maxCameraSpeed=400,a.attachControl(!0),a.lockedTarget=n,this.scene.activeCamera=a,n}addWheel(e,t,i,n,s){const r=this.vehicle.addWheel(t,this.wheelDirectionCS0,this.wheelAxleCS,this.suspensionRestLength,i,this.tuning,e);r.set_m_suspensionStiffness(this.suspensionStiffness),r.set_m_wheelsDampingRelaxation(this.suspensionDamping),r.set_m_wheelsDampingCompression(this.suspensionCompression),r.set_m_maxSuspensionForce(6e5),r.set_m_frictionSlip(40),r.set_m_rollInfluence(this.rollInfluence),this.wheelMeshes[s]=this.createWheelMesh(i,n)}createWheelMesh(e,t){const i=o.V.CreateCylinder("Wheel",{diameter:1,height:.5,tessellation:6},this.scene);return i.rotationQuaternion=new r._f,i.material=this.blackMaterial,i}}},8403:(e,t,i)=>{"use strict";i.r(t),i.d(t,{Controls:()=>o});var n=i(7417);const s=new Map([["acceleration",!1],["braking",!1],["right",!1],["left",!1]]),r=new Map([["KeyW","acceleration"],["KeyS","braking"],["KeyA","left"],["KeyD","right"]]);class o{constructor(e){this.car=e,window.addEventListener("keydown",this.keydown),window.addEventListener("keyup",this.keyup)}update(){if(this.car.vehicleReady){const e=this.car.vehicle.getCurrentSpeedKmHour();let t,i,r,o;this.car.breakingForce=0,this.car.engineForce=0,s.get("acceleration")?e<-1?this.car.breakingForce=this.car.maxBreakingForce:this.car.engineForce=this.car.maxEngineForce:s.get("braking")&&(e>1?this.car.breakingForce=this.car.maxBreakingForce:this.car.engineForce=-this.car.maxEngineForce),s.get("right")?this.car.vehicleSteering<this.car.steeringClamp&&(this.car.vehicleSteering+=this.car.steeringIncrement):s.get("left")?this.car.vehicleSteering>-this.car.steeringClamp&&(this.car.vehicleSteering-=this.car.steeringIncrement):this.car.vehicleSteering=0,this.car.vehicle.applyEngineForce(this.car.engineForce,this.car.FRONT_LEFT),this.car.vehicle.applyEngineForce(this.car.engineForce,this.car.FRONT_RIGHT),this.car.vehicle.setBrake(this.car.breakingForce/2,this.car.FRONT_LEFT),this.car.vehicle.setBrake(this.car.breakingForce/2,this.car.FRONT_RIGHT),this.car.vehicle.setBrake(this.car.breakingForce,this.car.BACK_LEFT),this.car.vehicle.setBrake(this.car.breakingForce,this.car.BACK_RIGHT),this.car.vehicle.setSteeringValue(this.car.vehicleSteering,this.car.FRONT_LEFT),this.car.vehicle.setSteeringValue(this.car.vehicleSteering,this.car.FRONT_RIGHT);const a=this.car.vehicle.getNumWheels();for(o=0;o<a;o++)this.car.vehicle.updateWheelTransform(o,!0),t=this.car.vehicle.getWheelTransformWS(o),i=t.getOrigin(),r=t.getRotation(),this.car.wheelMeshes[o].position.set(i.x(),i.y(),i.z()),this.car.wheelMeshes[o].rotationQuaternion?.set(r.x(),r.y(),r.z(),r.w()),this.car.wheelMeshes[o].rotate(n.RD.Z,Math.PI/2);t=this.car.vehicle.getChassisWorldTransform(),i=t.getOrigin(),r=t.getRotation(),this.car.chassisMesh.position.set(i.x(),i.y(),i.z()),this.car.chassisMesh.rotationQuaternion?.set(r.x(),r.y(),r.z(),r.w()),this.car.chassisMesh.rotate(n.RD.X,Math.PI)}}keyup(e){r.get(e.code)&&s.set(r.get(e.code)??"",!1)}keydown(e){r.get(e.code)&&s.set(r.get(e.code)??"",!0)}}},7357:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>y});var n=i(4147),s=i(156),r=i(972),o=i(5348),a=i(7759),c=(i(703),i(3242)),h=i(9635),l=i(7594),d=i(9823),f=i(7417),g=i(2166),p=i(5575),u=i(9976),m=i(8403);const y=new class{constructor(){this.preTasks=[l.u],this.createScene=async(e,t)=>{const i=new n.x(e),y=new s.c("camera1",new r.P(0,5,-10),i);y.setTarget(r.P.Zero()),y.attachControl(t,!0),new o.e("light",new r.P(0,1,0),i).intensity=.7;const v=new c.K("RedMaterial",i);v.diffuseColor=new f.Wo(.8,.4,.5),v.emissiveColor=new f.Wo(.8,.4,.5),i.enablePhysics(new r.P(0,-10,0),new a.b(!0,l.H));const w=d.V.CreateGround("ground",{width:460,height:460,subdivisions:2},i);w.physicsImpostor=new h.Q(w,h.Q.BoxImpostor,{mass:0,friction:.5,restitution:.7},i),w.material=new g.D("groundMaterial",i);const x=new p.Boxes(i);x.baseBoxes(),x.randomBoxes();const P=new u.Car(new r.P(0,4,-20),i,l.H),C=new m.Controls(P);return i.registerBeforeRender((function(){e.getDeltaTime(),C.update()})),i}}}},4207:()=>{},297:()=>{},2166:(e,t,i)=>{"use strict";i.d(t,{D:()=>u});var n=i(3555),s=i(6786),r=i(972),o=i(9859),a=i(3478),c=i(6721),h=i(569),l=i(3243),d=i(7959),f=i(9827),g=i(3127);i(796),i(5289),i(1410);g.v.ShadersStore.gridPixelShader="#extension GL_OES_standard_derivatives : enable\n#define SQRT2 1.41421356\n#define PI 3.14159\nprecision highp float;\nuniform float visibility;\nuniform vec3 mainColor;\nuniform vec3 lineColor;\nuniform vec4 gridControl;\nuniform vec3 gridOffset;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\n#include<fogFragmentDeclaration>\n#ifdef OPACITY\nvarying vec2 vOpacityUV;\nuniform sampler2D opacitySampler;\nuniform vec2 vOpacityInfos;\n#endif\nfloat getDynamicVisibility(float position) {\nfloat majorGridFrequency=gridControl.y;\nif (floor(position+0.5)==floor(position/majorGridFrequency+0.5)*majorGridFrequency)\n{\nreturn 1.0;\n} \nreturn gridControl.z;\n}\nfloat getAnisotropicAttenuation(float differentialLength) {\nconst float maxNumberOfLines=10.0;\nreturn clamp(1.0/(differentialLength+1.0)-1.0/maxNumberOfLines,0.0,1.0);\n}\nfloat isPointOnLine(float position,float differentialLength) {\nfloat fractionPartOfPosition=position-floor(position+0.5); \nfractionPartOfPosition/=differentialLength; \nfractionPartOfPosition=clamp(fractionPartOfPosition,-1.,1.);\nfloat result=0.5+0.5*cos(fractionPartOfPosition*PI); \nreturn result; \n}\nfloat contributionOnAxis(float position) {\nfloat differentialLength=length(vec2(dFdx(position),dFdy(position)));\ndifferentialLength*=SQRT2; \nfloat result=isPointOnLine(position,differentialLength);\nfloat dynamicVisibility=getDynamicVisibility(position);\nresult*=dynamicVisibility;\nfloat anisotropicAttenuation=getAnisotropicAttenuation(differentialLength);\nresult*=anisotropicAttenuation;\nreturn result;\n}\nfloat normalImpactOnAxis(float x) {\nfloat normalImpact=clamp(1.0-3.0*abs(x*x*x),0.0,1.0);\nreturn normalImpact;\n}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\nfloat gridRatio=gridControl.x;\nvec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;\nfloat x=contributionOnAxis(gridPos.x);\nfloat y=contributionOnAxis(gridPos.y);\nfloat z=contributionOnAxis(gridPos.z);\nvec3 normal=normalize(vNormal);\nx*=normalImpactOnAxis(normal.x);\ny*=normalImpactOnAxis(normal.y);\nz*=normalImpactOnAxis(normal.z);\n#ifdef MAX_LINE \nfloat grid=clamp(max(max(x,y),z),0.,1.);\n#else\nfloat grid=clamp(x+y+z,0.,1.);\n#endif\nvec3 color=mix(mainColor,lineColor,grid);\n#ifdef FOG\n#include<fogFragment>\n#endif\nfloat opacity=1.0;\n#ifdef TRANSPARENT\nopacity=clamp(grid,0.08,gridControl.w*grid);\n#endif \n#ifdef OPACITY\nopacity*=texture2D(opacitySampler,vOpacityUV).a;\n#endif \ngl_FragColor=vec4(color.rgb,opacity*visibility);\n#ifdef TRANSPARENT\n#ifdef PREMULTIPLYALPHA\ngl_FragColor.rgb*=opacity;\n#endif\n#else \n#endif\n#include<imageProcessingCompatibility>\n#define CUSTOM_FRAGMENT_MAIN_END\n}\n",i(3816),i(4667),i(7154),i(7761);g.v.ShadersStore.gridVertexShader="precision highp float;\nattribute vec3 position;\nattribute vec3 normal;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#include<instancesDeclaration>\nuniform mat4 projection;\nuniform mat4 view;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\n#include<fogVertexDeclaration>\n#ifdef OPACITY\nvarying vec2 vOpacityUV;\nuniform mat4 opacityMatrix;\nuniform vec2 vOpacityInfos;\n#endif\n#define CUSTOM_VERTEX_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_VERTEX_MAIN_BEGIN\n#include<instancesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\n#include<fogVertex>\nvec4 cameraSpacePosition=view*worldPos;\ngl_Position=projection*cameraSpacePosition;\n#ifdef OPACITY\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\nif (vOpacityInfos.x==0.)\n{\nvOpacityUV=vec2(opacityMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvOpacityUV=vec2(opacityMatrix*vec4(uv2,1.0,0.0));\n}\n#endif \nvPosition=position;\nvNormal=normal;\n#define CUSTOM_VERTEX_MAIN_END\n}";class p extends a.H{constructor(){super(),this.OPACITY=!1,this.TRANSPARENT=!1,this.FOG=!1,this.PREMULTIPLYALPHA=!1,this.MAX_LINE=!1,this.UV1=!1,this.UV2=!1,this.INSTANCES=!1,this.THIN_INSTANCES=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class u extends h.a{constructor(e,t){super(e,t),this.mainColor=o.Wo.Black(),this.lineColor=o.Wo.Teal(),this.gridRatio=1,this.gridOffset=r.P.Zero(),this.majorUnitFrequency=10,this.minorUnitVisibility=.33,this.opacity=1,this.preMultiplyAlpha=!1,this.useMaxLine=!1,this._gridControl=new r.Lt(this.gridRatio,this.majorUnitFrequency,this.minorUnitVisibility,this.opacity)}needAlphaBlending(){return this.opacity<1||this._opacityTexture&&this._opacityTexture.isReady()}needAlphaBlendingForMesh(e){return e.visibility<1||this.needAlphaBlending()}isReadyForSubMesh(e,t,i){if(this.isFrozen&&t.effect&&t.effect._wasPreviouslyReady&&t.effect._wasPreviouslyUsingInstances===i)return!0;t.materialDefines||(t.materialDefines=new p);const n=t.materialDefines,s=this.getScene();if(this._isReadyForSubMesh(t))return!0;if(n.TRANSPARENT!==this.opacity<1&&(n.TRANSPARENT=!n.TRANSPARENT,n.markAsUnprocessed()),n.PREMULTIPLYALPHA!=this.preMultiplyAlpha&&(n.PREMULTIPLYALPHA=!n.PREMULTIPLYALPHA,n.markAsUnprocessed()),n.MAX_LINE!==this.useMaxLine&&(n.MAX_LINE=!n.MAX_LINE,n.markAsUnprocessed()),n._areTexturesDirty&&(n._needUVs=!1,s.texturesEnabled&&this._opacityTexture&&l.k.OpacityTextureEnabled)){if(!this._opacityTexture.isReady())return!1;n._needUVs=!0,n.OPACITY=!0}if(c.G.PrepareDefinesForMisc(e,s,!1,!1,this.fogEnabled,!1,n),c.G.PrepareDefinesForFrameBoundValues(s,s.getEngine(),n,!!i),n.isDirty){n.markAsProcessed(),s.resetCachedMaterial(),c.G.PrepareDefinesForAttributes(e,n,!1,!1);const i=[d.o.PositionKind,d.o.NormalKind];n.UV1&&i.push(d.o.UVKind),n.UV2&&i.push(d.o.UV2Kind),n.IMAGEPROCESSINGPOSTPROCESS=s.imageProcessingConfiguration.applyByPostProcess,c.G.PrepareAttributesForInstances(i,n);const r=n.toString();t.setEffect(s.getEngine().createEffect("grid",i,["projection","mainColor","lineColor","gridControl","gridOffset","vFogInfos","vFogColor","world","view","opacityMatrix","vOpacityInfos","visibility"],["opacitySampler"],r,void 0,this.onCompiled,this.onError),n,this._materialContext)}return!(!t.effect||!t.effect.isReady()||(n._renderId=s.getRenderId(),t.effect._wasPreviouslyReady=!0,t.effect._wasPreviouslyUsingInstances=!!i,0))}bindForSubMesh(e,t,i){const n=this.getScene(),s=i.materialDefines;if(!s)return;const r=i.effect;r&&(this._activeEffect=r,this._activeEffect.setFloat("visibility",t.visibility),s.INSTANCES&&!s.THIN_INSTANCE||this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("view",n.getViewMatrix()),this._activeEffect.setMatrix("projection",n.getProjectionMatrix()),this._mustRebind(n,r)&&(this._activeEffect.setColor3("mainColor",this.mainColor),this._activeEffect.setColor3("lineColor",this.lineColor),this._activeEffect.setVector3("gridOffset",this.gridOffset),this._gridControl.x=this.gridRatio,this._gridControl.y=Math.round(this.majorUnitFrequency),this._gridControl.z=this.minorUnitVisibility,this._gridControl.w=this.opacity,this._activeEffect.setVector4("gridControl",this._gridControl),this._opacityTexture&&l.k.OpacityTextureEnabled&&(this._activeEffect.setTexture("opacitySampler",this._opacityTexture),this._activeEffect.setFloat2("vOpacityInfos",this._opacityTexture.coordinatesIndex,this._opacityTexture.level),this._activeEffect.setMatrix("opacityMatrix",this._opacityTexture.getTextureMatrix()))),c.G.BindFogParameters(n,t,this._activeEffect),this._afterBind(t,this._activeEffect))}dispose(e){super.dispose(e)}clone(e){return s.p4.Clone((()=>new u(e,this.getScene())),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.GridMaterial",e}getClassName(){return"GridMaterial"}static Parse(e,t,i){return s.p4.Parse((()=>new u(e.name,t)),e,t,i)}}(0,n.gn)([(0,s.n9)()],u.prototype,"mainColor",void 0),(0,n.gn)([(0,s.n9)()],u.prototype,"lineColor",void 0),(0,n.gn)([(0,s.qC)()],u.prototype,"gridRatio",void 0),(0,n.gn)([(0,s.hd)()],u.prototype,"gridOffset",void 0),(0,n.gn)([(0,s.qC)()],u.prototype,"majorUnitFrequency",void 0),(0,n.gn)([(0,s.qC)()],u.prototype,"minorUnitVisibility",void 0),(0,n.gn)([(0,s.qC)()],u.prototype,"opacity",void 0),(0,n.gn)([(0,s.qC)()],u.prototype,"preMultiplyAlpha",void 0),(0,n.gn)([(0,s.qC)()],u.prototype,"useMaxLine",void 0),(0,n.gn)([(0,s.oU)("opacityTexture")],u.prototype,"_opacityTexture",void 0),(0,n.gn)([(0,s.wz)("_markAllSubMeshesAsTexturesDirty")],u.prototype,"opacityTexture",void 0),(0,f.H)("BABYLON.GridMaterial",u)}}]);
//# sourceMappingURL=719.babylonBundle.js.map
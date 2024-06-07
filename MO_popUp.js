import "https://cdn.babylonjs.com/babylon.js";
import "https://cdn.babylonjs.com/loaders/babylonjs.loaders.js";
// import "https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.2/dat.gui.min.js";
import "https://assets.babylonjs.com/generated/Assets.js";
import "https://cdn.babylonjs.com/recast.js";
import "https://cdn.babylonjs.com/ammo.js";
import "https://cdn.babylonjs.com/havok/HavokPhysics_umd.js";
import "https://cdn.babylonjs.com/cannon.js";
import "https://cdn.babylonjs.com/Oimo.js";
import "https://cdn.babylonjs.com/earcut.min.js";
import "https://cdn.babylonjs.com/babylon.js";
import "https://cdn.babylonjs.com/materialsLibrary/babylonjs.materials.min.js";
import "https://cdn.babylonjs.com/proceduralTexturesLibrary/babylonjs.proceduralTextures.min.js";
import "https://cdn.babylonjs.com/postProcessesLibrary/babylonjs.postProcess.min.js";
import "https://cdn.babylonjs.com/loaders/babylonjs.loaders.js";
import "https://cdn.babylonjs.com/serializers/babylonjs.serializers.min.js";
import "https://cdn.babylonjs.com/gui/babylon.gui.min.js";
import "https://cdn.babylonjs.com/inspector/babylon.inspector.bundle.js";

const MoPopModule = (function() {

var canvas = document.getElementById("babyCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };

let cubeMesh;
let meshSolides;
let animSolides;
let meshElements;
let animElements;
let meshGround;

var createScene = function () {
// This creates a basic Babylon Scene object (non-mesh)
engine = new BABYLON.Engine(canvas, true);
scene = new BABYLON.Scene(engine);
scene.clearColor = color_ardoise;
// var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("textures/Studio_Softbox_2Umbrellas_cube_specular.dds", scene);
// hdrTexture.gammaSpace = false;
// scene.environmentTexture = hdrTexture;
// scene.environmentIntensity = 0.1;

var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
camera.lowerBetaLimit = 0.1;
camera.upperBetaLimit = (Math.PI / 2) * 0.9;
camera.lowerRadiusLimit = 30;
camera.upperRadiusLimit = 150;
camera.attachControl(canvas, true);
camera.fov = 0.25;
camera.setTarget(BABYLON.Vector3.Zero());
camera.position = new BABYLON.Vector3(50, 25, -50);


// plane.position =new BABYLON.Vector3(50, 25, -50)+ camera.getDirection(BABYLON.Vector3.Forward());
var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);

    var light0 = new BABYLON.SpotLight("spot0", new BABYLON.Vector3(20,40, 10), new BABYLON.Vector3(-10, -20, -5),1.14,100, scene);
    light0.intensity =0.5;
    var light1 = new BABYLON.SpotLight("spot1", new BABYLON.Vector3(20, 40, -10), new BABYLON.Vector3(-10, -20, 5),1.14,100, scene);
    light1.intensity =0.5;
    
    const shadowGenerator0 = new BABYLON.ShadowGenerator(1024, light0);
    const shadowGenerator1 = new BABYLON.ShadowGenerator(1024, light1);
         shadowGenerator0.bias = 0.0001;
          shadowGenerator1.bias = 0.0001;
    //  shadowGenerator0.useContactHardeningShadow = true;
     shadowGenerator0.usePercentageCloserFiltering = true;
     shadowGenerator1.usePercentageCloserFiltering = true;
    // // shadowGenerator0.filteringQuality = BABYLON.ShadowGenerator.QUALITY_LOW;
    //  shadowGenerator0.useExponentialShadowMap = true;
    //   shadowGenerator0.useBlurExponentialShadowMap = true;
    //    shadowGenerator0.blurScale = 1;
    // shadowGenerator0.setDarkness(0.6);

    //  shadowGenerator1.useContactHardeningShadow = true;
    // // shadowGenerator1.filteringQuality = BABYLON.ShadowGenerator.QUALITY_LOW;
    //  shadowGenerator1.useExponentialShadowMap = true;
    //    shadowGenerator1.useBlurExponentialShadowMap = true;
    //    shadowGenerator1.blurScale = 1;
    // shadowGenerator1.setDarkness(0.6);

    const elementsMaterial = new BABYLON.StandardMaterial("elementsMaterial", scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    const solidesMaterial = new BABYLON.StandardMaterial("solidesMaterial", scene);
    elementsMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    groundMaterial.diffuseColor = color_ardoise;
    solidesMaterial.diffuseColor = color_1;
    color_current = color_1;
    // solidesMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    //  solidesMaterial.emissiveColor = new BABYLON.Color3(0.0, 0.0, 0.0);
    //  solidesMaterial.ambientColor = new BABYLON.Color3(0.0, 0.0, 0.0);


    BABYLON.SceneLoader.OnPluginActivatedObservable.add(function (loader) {
        if (loader.name === "gltf") {
            console.log("gltf loader");
            loader.targetFps = 30;
        }
    });

BABYLON.SceneLoader.ImportMesh("","https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/","transCubes_elments.glb", scene, function(newMeshes,particleSystems, skeletons){
meshElements = newMeshes[0];
meshElements.receiveShadows = true;

shadowGenerator1.getShadowMap().renderList.push(meshSolides);
shadowGenerator1.addShadowCaster(meshSolides);
shadowGenerator0.getShadowMap().renderList.push(meshSolides);
shadowGenerator0.addShadowCaster(meshSolides);
let mymesh =newMeshes[0].getChildMeshes();
console.log("mesh solides elmements count : "+mymesh.length);
for (var i = 0; i < mymesh.length; i++) {
mymesh[i].receiveShadows = true;
mymesh[i].material =elementsMaterial;
shadowGenerator0.getShadowMap().renderList.push(mymesh[i]);
shadowGenerator1.getShadowMap().renderList.push(mymesh[i]);
shadowGenerator0.addShadowCaster(mymesh[i]);
shadowGenerator1.addShadowCaster(mymesh[i]);
mymesh[i].isVisible = false;
}

});

BABYLON.SceneLoader.ImportMesh("","https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/","transCubes_solides.glb", scene, function(newMeshes,particleSystems, skeletons){
meshSolides = newMeshes[0];
meshSolides.receiveShadows = true;
meshSolides.material =solidesMaterial;
shadowGenerator1.getShadowMap().renderList.push(meshSolides);
shadowGenerator1.addShadowCaster(meshSolides);
shadowGenerator0.getShadowMap().renderList.push(meshSolides);
shadowGenerator0.addShadowCaster(meshSolides);
let mymesh =newMeshes[0].getChildMeshes();
console.log("mesh solides elmements count : "+mymesh.length);
for (var i = 0; i < mymesh.length; i++) {
mymesh[i].receiveShadows = true;
mymesh[i].material =solidesMaterial;
shadowGenerator0.getShadowMap().renderList.push(mymesh[i]);
shadowGenerator1.getShadowMap().renderList.push(mymesh[i]);
shadowGenerator0.addShadowCaster(mymesh[i]);
shadowGenerator1.addShadowCaster(mymesh[i]);
mymesh[i].isVisible = false;
}

});

BABYLON.SceneLoader.ImportMesh("","https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/","transCubes_meshGround.glb", scene, function(newMeshes,particleSystems, skeletons){
meshGround = newMeshes[0];
meshGround.receiveShadows = true;
meshGround.scaling = new BABYLON.Vector3(2.0,2.0,2.0);
meshGround.position = new BABYLON.Vector3(-3.0,0.0,0.0);
// shadowGenerator1.getShadowMap().renderList.push(meshSolides);
// shadowGenerator1.addShadowCaster(meshSolides);
// shadowGenerator0.getShadowMap().renderList.push(meshSolides);
// shadowGenerator0.addShadowCaster(meshSolides);
let mymesh =newMeshes[0].getChildMeshes();
console.log("mesh solides elmements count : "+mymesh.length);
for (var i = 0; i < mymesh.length; i++) {
mymesh[i].receiveShadows = true;
mymesh[i].material = groundMaterial;
mymesh[i].checkCollisions = false;
mymesh[i].isPickable = false;
mymesh[i].isVisible = false;
// shadowGenerator0.getShadowMap().renderList.push(mymesh[i]);
// shadowGenerator1.getShadowMap().renderList.push(mymesh[i]);
// shadowGenerator0.addShadowCaster(mymesh[i]);
// shadowGenerator1.addShadowCaster(mymesh[i]);
}

});

// var cubeCollider = BABYLON.MeshBuilder.CreateBox("box", {size: 10}, scene);
// cubeCollider.position = new BABYLON.Vector3(0,2.5,0);
// cubeCollider.checkCollisions = true;
// cubeCollider.isPickable = true;

// scene.onPointerObservable.add((pointerInfo) => {
//     switch (pointerInfo.type) {
//         case BABYLON.PointerEventTypes.POINTERDOWN:
//             if (pointerInfo.pickInfo.pickedMesh.name === "box") {
//                 alert(curState);
//             }
//             break;
//     }
// });

// scene.onPointerDown = function castRay() {
// var ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera);
    
//             var hit = scene.pickWithRay(ray);
//             if (hit.pickedMesh) {
//                 console.log(hit.pickedMesh.name);
//             }
//         }

        // scene.onPointerDown = function (evt, pickResult) {
        //     // We try to pick an object
        //     if (pickResult.hit) {
        //         console.log(pickResult.pickedMesh.name);
        //         // header.textContent = pickResult.pickedMesh.name;
        //     }
        // };
// sphere.isVisible = false;

// BABYLON.SceneLoader.ImportMeshAsync("", "https://dl.dropbox.com/s/opjteez2x95if0j/", "ArtRoom-2022_v08_ImageFrames_Optimized_BlenderExport.glb").then(function (result) {
//     console.log("My base Mesh is called: ");
//     console.log(result.meshes[0]);
//     let rootMesh = result.meshes[0];
//     rootMesh.name = "baseModelMesh";
//     result.meshes.forEach(mesh => {
//         // mesh.isPickable = true;
//         mesh.checkCollisions = true;
//         //mesh.freezeWorldMatrix();
//         //mesh.doNotSyncBoundingInfo = true;
//     });
//     scene.onPointerDown = function castRay() {
//         var ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera);

//         var hit = scene.pickWithRay(ray);
//         if (hit.pickedMesh) {
//             guiButton.textBlock.text = hit.pickedMesh.name;
//         }
//     }
// });

// let parent = scene.getMeshByName(“_ root _”);

// shadows handling
// var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);

// let mymesh = parent.getChildMeshes();
// for (var i = 0; i < mymesh.length; i++) {
// mymesh[i].receiveShadows = true;
// shadowGenerator0.addShadowCaster(mymesh[i]);
// shadowGenerator1.addShadowCaster(mymesh[i]);
// }

   




var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

// var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "1");
// button1.width = 0.6;
// button1.height = 0.35;
// //button1.left = -40;
// // button1.left = "-37.5%"; 
// button1.top = "-10%"; 
// button1.color = "black";
// button1.cornerRadius = 20;
// button1.background = "white";
// // button1.isVisible = false;
// button1.thickness = 0;
// button1.onPointerUpObservable.add(function() {
// alert(nextState);
// });
// button1.onPointerMoveObservable.add(function() {
//     nextState = "state1";
// });

var image1 = new BABYLON.GUI.Image("industriel", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/industriel.png");
// image1.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    image1.width = 0.19526441;
    image1.height = 0.33;
    image1.left = "-37.5%"; 
    // image1.top = "12.5%"; 
    image1.top = "25%"; 
    // image1.height = "300px";
    // image1.populateNinePatchSlicesFromImage = true;
    
    // grid.addControl(image, 0, 0);

    image1.onPointerUpObservable.add(function() {
         alert("1");
        // nextState = "state1";
        });
        image1.onPointerMoveObservable.add(function() {
            nextState = "state1";
        });

        var image2 = new BABYLON.GUI.Image("commercial", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/commercial.png");
       // image2.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
     image2.width = 0.193221;
    image2.height = 0.33;
    image2.left = "-12.5%"; 
    // image2.top = "12.5%"; 
    image2.top = "25%"; 
    // image1.height = "300px";
    // image2.populateNinePatchSlicesFromImage = true;
    
    // grid.addControl(image, 0, 0);

    image2.onPointerUpObservable.add(function() {
        alert("2");
        // nextState = "state2";
        });
        image2.onPointerMoveObservable.add(function() {
            nextState = "state2";
        });

 
     

    //     var image4 = new BABYLON.GUI.Image("individuel", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/individuel.png");
    //   //  image4.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    //  image4.width = 0.188347;
    // image4.height = 0.33;
    // image4.left = "37.5%"; 
    // image4.top = "25%"; 
    //     image4.alpha = 0;
    // image4.onPointerUpObservable.add(function() {
    //     alert("4");
    //     // nextState = "state4";
    //     });
        
    //     image4.onPointerMoveObservable.add(function() {
    //         nextState = "state4";
    //     });




        var titrage = new BABYLON.GUI.Image("titrage", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/titre.png");
        titrage.width = 0.75;
        titrage.height = 0.12866817;
        titrage.top = "-35%";
       
// var txt4 = new BABYLON.GUI.TextBlock();
// txt4.text = "L'isolation thermique\nextérieure, c'est le plaisir\nde pouvoir conserver ou\nchanger l'esthétique de votre\nmaison et c'est sur tout\nl'assurance de faire de\nsérieuses économies !"
// // txt4.style = style_0;
// txt4.color ="#8f919b";
// txt4.fontSize ='1.5%';
// advancedTexture.addControl(txt4); 

// var logo_individuel = new BABYLON.GUI.Image("logo_individuel", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/logo_individuel.svg");
// logo_individuel.width = 0.04;
// logo_individuel.height = 0.04;
// logo_individuel.top = "12.5%";
// logo_individuel.alpha = 0.0;
// advancedTexture.addControl(logo_individuel); 

titreContainer = new BABYLON.GUI.Rectangle();
titreContainer.width = 1;
titreContainer.height = 1;
titreContainer.alpha =0;
titreContainer.isPointerBlocker = false;
var titreImg = new BABYLON.GUI.Image("indiv", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/container_titrage.png");
titreContainer.addControl(titreImg);

residContainer = new BABYLON.GUI.Rectangle();
residContainer.width = 1;
residContainer.height = 1;
residContainer.alpha =0;
residContainer.isPointerBlocker = false;
var residImg = new BABYLON.GUI.Image("indiv", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/container_residentiel.png");
residContainer.addControl(residImg);

indusContainer = new BABYLON.GUI.Rectangle();
indusContainer.width = 1;
indusContainer.height = 1;
indusContainer.alpha =0;
indusContainer.isPointerBlocker = false;
var indusImg = new BABYLON.GUI.Image("indiv", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/container_industriel.png");
indusContainer.addControl(indusImg);

commContainer = new BABYLON.GUI.Rectangle();
commContainer.width = 1;
commContainer.height = 1;
commContainer.alpha =0;
commContainer.isPointerBlocker = false;
var commImg = new BABYLON.GUI.Image("indiv", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/container_commercial.png");
commContainer.addControl(commImg);

indivContainer = new BABYLON.GUI.Rectangle();
indivContainer.width = 1;
indivContainer.height = 1;
indivContainer.alpha =0;
indivContainer.isPointerBlocker = false;
var indivImg = new BABYLON.GUI.Image("indiv", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/container_individuel.png");
indivContainer.addControl(indivImg);


var residButton = new BABYLON.GUI.Image("industriel", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/industriel.png");

residButton.width = 0.19526441;
residButton.height = 0.33;
residButton.left = "-37.5%"; 
    residButton.top = "25%"; 
    residButton.alpha = 0;

    residButton.onPointerUpObservable.add(function() {
         alert("1");
        });
        residButton.onPointerMoveObservable.add(function() {
            nextState = "state1";
        });



var indusButton = new BABYLON.GUI.Image("commercial", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/commercial.png");

indusButton.width = 0.193221;
indusButton.height = 0.33;
indusButton.left = "-12.5%"; 
indusButton .top = "25%"; 
indusButton .alpha = 0;
indusButton .onPointerUpObservable.add(function() {
         alert("2");
 });
 indusButton .onPointerMoveObservable.add(function() {
             nextState = "state2";
});

var commButton = new BABYLON.GUI.Image("commercial", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/commercial.png");
commButton.width = 0.15627442;
commButton.height = 0.33;
commButton.left = "12.5%"; 
commButton.top = "25%"; 
commButton.alpha = 0;
commButton.onPointerUpObservable.add(function() {
         alert("3");
 });
commButton.onPointerMoveObservable.add(function() {
             nextState = "state3";
});

var indivButton = new BABYLON.GUI.Image("individuel", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/individuel.png");
indivButton.width = 0.188347;
indivButton.height = 0.33;
indivButton.left = "37.5%"; 
indivButton.top = "25%"; 
indivButton.alpha = 0;
indivButton.onPointerUpObservable.add(function() {
        alert("4");
        });
        
indivButton.onPointerMoveObservable.add(function() {
            nextState = "state4";
        });



advancedTexture.addControl(titreContainer);
advancedTexture.addControl(commContainer);
advancedTexture.addControl(residContainer);
advancedTexture.addControl(indivContainer);
advancedTexture.addControl(indusContainer);
advancedTexture.addControl(residButton);
advancedTexture.addControl(indusButton);
advancedTexture.addControl(indivButton);
advancedTexture.addControl(commButton);
// advancedTexture.addControl(image4);
// container.alpha = 1;
// indiv.detectPointerOnOpaqueOnly = true;
// advancedTexture.addControl(image1); 
// advancedTexture.addControl(image2);  
// advancedTexture.addControl(image3);  
// advancedTexture.addControl(image4);  
// advancedTexture.addControl(titrage);  

// var layer = new BABYLON.Layer('','https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/maquette_v1_noSuject.jpg', scene, true);
// layer.alpha = 0.3;

var planeT = new BABYLON.TransformNode("plantTransform");

videoPlane = new BABYLON.CreatePlane("videoPlane");
videoPlane.scaling = new BABYLON.Vector3(0.25,0.25,0.25);

videoPlane.parent = planeT; 
var dir = camera.getDirection(BABYLON.Vector3.Forward());
var camPos = camera.position;
var planePos = new  BABYLON.Vector3(camPos.x+dir.x, camPos.y+dir.y, camPos.z+dir.z);
// plane.position =planePos;
var vecFwd = camera.getDirection(BABYLON.Vector3.Forward());
var vecRight = camera.getDirection(BABYLON.Vector3.Right());
var vecUp = camera.getDirection(BABYLON.Vector3.Up());
var matT = new BABYLON.Matrix;
matT.setRow(0, new BABYLON.Vector4(vecRight.x,vecRight.y,vecRight.z,0));
matT.setRow(1, new BABYLON.Vector4(vecUp.x,vecUp.y,vecUp.z,0));
matT.setRow(2, new BABYLON.Vector4(vecFwd.x,vecFwd.y,vecFwd.z,0));
matT.setRow(3, new BABYLON.Vector4(planePos.x,planePos.y,planePos.z,1));
planeT.setPreTransformMatrix(matT);
videoMaterial = new BABYLON.StandardMaterial("videoMaterial", scene);
var videoTexture = new BABYLON.VideoTexture("video", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/logoAnim.mp4", scene, true);

videoMaterial.emissiveColor = new BABYLON.Color3.White();
videoMaterial.disableLighting = true;
videoMaterial.diffuseColor = color_ardoise;
videoMaterial.diffuseTexture = videoTexture;
// videoMaterial.alpha =1;
videoPlane.material = videoMaterial;



sceneToRender = scene;
startRenderLoop(engine, canvas);
return scene;
};

var indivContainer;
var indusContainer;
var commContainer;
var residContainer;
var titreContainer;

var meshWellLoaded = false;
async function Init() {
            
          await createScene();
          MeshLoadedChecker();
        StateChangeListener();
        Intro();
        // StateHasChangedListener();
        // TestAnim();
};
var videoMaterial;
var videoPlane;
var introFrame = 0;
var introduced = false;
var introFrameIn = 90;
var introAnimFrame = 226;
function Intro(){
    setInterval(function() {
        if(!meshWellLoaded){
            return;
        }
        if(introduced ){return;}
        introFrame += 1;
        var lerpAlpha = 1.0;
        if(introFrame == 30)
            {
//                 let mymesh =meshElements.getChildMeshes();
// console.log("mesh solides elmements count : "+mymesh.length);
for (var i = 0; i < meshElements.getChildMeshes().length; i++) {
    meshElements.getChildMeshes()[i].isVisible = true;
    }
    for (var i = 0; i < meshSolides.getChildMeshes().length; i++) {
        meshSolides.getChildMeshes()[i].isVisible = true;
        meshSolides.getChildMeshes()[i].diffuseColor = color_1;
        }
        for (var i = 0; i < meshGround.getChildMeshes().length; i++) {
            meshGround.getChildMeshes()[i].isVisible = true;
            }

            scene.animationGroups[0].goToFrame(introAnimFrame);
            scene.animationGroups[1].goToFrame(introAnimFrame);

            }
        if(introFrame > introFrameIn)
            {

                if(introAnimFrame<266){
                introAnimFrame += 1;

                scene.animationGroups[0].goToFrame(introAnimFrame);
                scene.animationGroups[1].goToFrame(introAnimFrame);}
              
                lerpAlpha = 1.0 - (introFrame -introFrameIn)/90;
                indivContainer.alpha =1 - lerpAlpha ;
                indusContainer.alpha =1 - lerpAlpha ;
                commContainer.alpha =1 - lerpAlpha ;
                residContainer.alpha =1 - lerpAlpha ;
                titreContainer.alpha =1 - lerpAlpha ;

                videoPlane.material.alpha = lerpAlpha;
                if(lerpAlpha<=0.0){introduced = true;}
                // console.log(videoPlane.material.alpha);
            }
    }, 33);
}

function LightCasterAssignment()
{
    
}

function MeshLoadedChecker(){
    setInterval(function() {
        if(meshWellLoaded){
            return;
        }
        if(meshSolides != undefined && meshElements != undefined && meshGround != undefined)
            {
                meshWellLoaded = true;
                scene.animationGroups[0].start(false, 1,1, 1);
                scene.animationGroups[1].start(false, 1,1, 1);
                scene.animationGroups[0].pause();
                scene.animationGroups[1].pause();
                scene.animationGroups[0].goToFrame(1);
                scene.animationGroups[1].goToFrame(1);
                // scene.animationGroups[0].stop();
                // scene.animationGroups[1].stop();
                // scene.animationGroups[0].start(false, 1,1, 1);
                // scene.animationGroups[1].start(false, 1,1, 1);
                LightCasterAssignment();
            }
    }, 16);
}
var lastState = "state1";
var curState = "state1";
var nextState = "state1";
var isTransiting = false;
var curFrame = 0;
var startFrame_A = 0;
var endFrame_A = 0;
var startFrame_B = 0;
var endFrame_B = 0;


// bleu 105 160 203 // 0.412, 0.627, 0.796
// vert 160 191 56 // 0.627, 0.749, 0.22
// jaune 234 186 77 // 0.918, 0.729, 0.302
// fushia 195 27 121 // 0.765, 0.106, 0.475

// ardoise 44 45 58 (fond anim logo) // 0.173, 0.176, 0.227

// var color_1 = new BABYLON.Color3(0.412, 0.627 ,0.796);
// var color_2 = new BABYLON.Color3(0.627, 0.749, 0.22);
// var color_3 = new BABYLON.Color3(0.918, 0.729, 0.302);
// var color_4 = new BABYLON.Color3(0.765, 0.106, 0.475);

var color_1 = new BABYLON.Color3(0.918, 0.729, 0.302);
var color_2 = new BABYLON.Color3(0.627, 0.749, 0.22);
var color_3 = new BABYLON.Color3(0.412, 0.627 ,0.796);
var color_4 = new BABYLON.Color3(0.765, 0.106, 0.475);

var color_current = new BABYLON.Color3(1,1,1);
var color_A = new BABYLON.Color3(1,1,1);
var color_B = new BABYLON.Color3(1,1,1);
var color_neutral = new BABYLON.Color3(1,1,1);
var color_ardoise = new BABYLON.Color3(0.173, 0.176, 0.227);

var frame = -1;
var stateSwitched  = false;

var stateHasChanged = false;
var fadingToA = false;
var fadingToB = false;
function StateHasChangedListener()
{
    setInterval(function() {
    if(nextState != lastState)
    {
        stateHasChanged = true;
    }
    lastState = nextState;});
}

function StateChangeListener(){
    setInterval(function() {

        if(!meshWellLoaded){return;}
        // if(curState != nextState)
        // {

        if(nextState != lastState)
            {
                stateHasChanged = true;
            }
        lastState = nextState;
        if(stateHasChanged)
        { 
        
        stateHasChanged = false; 


        stateSwitched = false;
        // startFrame_A = curFrame;
        // color_A = color_current;
        if(frame>0)
            {frame = curFrame;}
    
            if(fadingToA && curState == nextState){
                fadingToA = false;
                frame =  Math.abs(Math.abs(endFrame_A-startFrame_A) - frame) + Math.abs(endFrame_A-startFrame_A);
            }
    
            if(fadingToB){
                fadingToB = false;
                frame =  Math.abs(Math.abs(endFrame_B-startFrame_B) - frame);
            }
        switch (curState) {
            case "state1":
                startFrame_A = 266;
                endFrame_A = 226;
               
                color_A = color_1;
              break;
            case "state2":
                startFrame_A = 1;
                endFrame_A = 61;
               
                color_A = color_2;
              break;
            
            case "state3":
                startFrame_A = 136;
                endFrame_A = 91;
            color_A = color_3;
          break;
          case "state4":
            startFrame_A = 401;
            endFrame_A = 361;
            color_A = color_4;
           break;
          }

          switch (nextState) {
            case "state1":
                startFrame_B = 226;
                endFrame_B = 266;
                
                color_B = color_1;
              break;
            case "state2":
                startFrame_B = 61;
                endFrame_B = 1;
              
                color_B = color_2;
              break;
            
            case "state3":
                startFrame_B = 91;
                endFrame_B = 136;
            color_B = color_3;
          break;
          case "state4":
            startFrame_B = 361;
            endFrame_B = 401;
            color_B = color_4;
           break;
          }
        

        // if(curState == nextState && fadingToA)
        // { 
        //     // var frameTemp = frame;
        //     // frame += Math.abs(endFrame_A-startFrame_A);
        //     frame =  Math.abs(Math.abs(endFrame_A-startFrame_A) - frame) + Math.abs(endFrame_A-startFrame_A);

        // }


        //   console.log("CUR STATE : "+curState+" ::: from frame "+startFrame_A+" to "+endFrame_A);
        //   console.log("NEXT STATE : "+nextState+" ::: from frame "+startFrame_B+" to "+endFrame_B);
        //   console.log("CURRENT VALUES ::: frame : "+frame+ " ::: cur anim frame : "+curFrame);

        // curState = nextState;
        stateSwitched = true;
      }

      if(!stateSwitched){return;}

        frame +=1;
        var animFrame = -1;
        // console.log("FRAME : "+frame);
        if(frame < Math.abs(endFrame_A-startFrame_A))
            {
                fadingToA = true;
                fadingToB = false;
                curFrame = frame;
                if(endFrame_A >= startFrame_A)
                    {animFrame = startFrame_A + frame;}
                else
                    {animFrame = startFrame_A - frame;}
                    // console.log("ANIM FRAME : "+animFrame+" -> trans A");
                scene.animationGroups[0].goToFrame(animFrame);
                scene.animationGroups[1].goToFrame(animFrame);
                color_current = BABYLON.Color3.Lerp(color_A,color_neutral,(Math.abs(animFrame - startFrame_A))/(Math.abs(endFrame_A - startFrame_A)));
                meshSolides.material.diffuseColor = color_current ;
                
            }
        else if(frame - (Math.abs(endFrame_A-startFrame_A)) < Math.abs(endFrame_B-startFrame_B))
            {
                fadingToA = false;
                fadingToB = true;
                curFrame = frame - (Math.abs(endFrame_A-startFrame_A));
                if(endFrame_B >= startFrame_B)
                    {animFrame = startFrame_B + (frame - (Math.abs(endFrame_A-startFrame_A)));}
                else
                    {animFrame = startFrame_B -  (frame - (Math.abs(endFrame_A-startFrame_A)));}
                // console.log("ANIM FRAME : "+animFrame+" -> trans B");
                scene.animationGroups[0].goToFrame(animFrame);
                scene.animationGroups[1].goToFrame(animFrame);
                color_current = BABYLON.Color3.Lerp(color_neutral, color_B,(Math.abs(animFrame - startFrame_B))/(Math.abs(endFrame_B - startFrame_B)));
                meshSolides.material.diffuseColor = color_current ;
                curState = nextState;
            }

        if(animFrame <0)
            {
                fadingToA = false;
                fadingToB = false;
                stateSwitched = false;
                frame = -1;
                isTransiting = false;
            }



    }, 33);
    }

window.addEventListener("resize", function () {
    engine.resize();
});

return {
Init:Init

};
function getForwardVector(_mesh) {
    _mesh.computeWorldMatrix(true);
    var forward_local = new BABYLON.Vector3(0, 0, 1);
    worldMatrix = _mesh.getWorldMatrix();
    return BABYLON.Vector3.TransformNormal(forward_local, worldMatrix);
}
})();

export default MoPopModule;

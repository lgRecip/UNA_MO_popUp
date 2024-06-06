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

        var image3 = new BABYLON.GUI.Image("copropriété", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/copropriété.png");
       // image3.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
     image3.width = 0.15627442;
    image3.height = 0.33;
    image3.left = "12.5%"; 
    // image3.top = "12.5%"; 
    image3.top = "25%"; 
    // image1.height = "300px";
    // image3.populateNinePatchSlicesFromImage = true;
    
    // grid.addControl(image, 0, 0);

    image3.onPointerUpObservable.add(function() {
        alert("3");
        // nextState = "state3";
        });
        image3.onPointerMoveObservable.add(function() {
            nextState = "state3";
        });

        var image4 = new BABYLON.GUI.Image("individuel", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/individuel.png");
      //  image4.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
     image4.width = 0.188347;
    image4.height = 0.33;
    image4.left = "37.5%"; 
    image4.top = "25%"; 

    image4.onPointerUpObservable.add(function() {
        alert("4");
        // nextState = "state4";
        });
        image4.onPointerMoveObservable.add(function() {
            nextState = "state4";
        });


        var titrage = new BABYLON.GUI.Image("titrage", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/titre.png");
        titrage.width = 0.75;
        titrage.height = 0.12866817;
        titrage.top = "-35%";

// var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "2");
// button2.width = 0.05;
// button2.height = 0.05;
// button2.left = "-12.5%"; 
// button2.top = "12.5%"; 
// button2.color = "black";
// button2.cornerRadius = 20;
// button2.background = "white";
// button2.onPointerUpObservable.add(function() {
// alert("2");
// });
// button2.onPointerMoveObservable.add(function() {
//     nextState = "state2";
// });


// var button3 = BABYLON.GUI.Button.CreateSimpleButton("but3", "3");
// button3.width = 0.05;
// button3.height = 0.05;
// button3.left = "12.5%"; 
// button3.top = "12.5%"; 
// button3.color = "black";
// button3.cornerRadius = 20;
// button3.background = "white";
// button3.onPointerUpObservable.add(function() {
// alert("3");
// });
// button3.onPointerMoveObservable.add(function() {
//     nextState = "state3";
// });

// var button4 = BABYLON.GUI.Button.CreateSimpleButton("but4", "4");
// button4.width = 0.05;
// button4.height = 0.05;
// button4.left = "37.5%";
// button4.top = "12.5%"; 
// button4.color = "black";
// button4.cornerRadius = 20;
// button4.background = "white";
// button4.onPointerUpObservable.add(function() {
// alert("4");
// });
// button4.onPointerMoveObservable.add(function() {
//     nextState = "state4";
// });

//  advancedTexture.addControl(button1); 
advancedTexture.addControl(image1); 
advancedTexture.addControl(image2);  
advancedTexture.addControl(image3);  
advancedTexture.addControl(image4);  
advancedTexture.addControl(titrage);  
sceneToRender = scene;
startRenderLoop(engine, canvas);
return scene;
};

var meshWellLoaded = false;
async function Init() {
            
          await createScene();  
          MeshLoadedChecker();
        StateChangeListener();
        // StateHasChangedListener();
        // TestAnim();
};

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
var color_1 = new BABYLON.Color3(0.412, 0.627 ,0.796);
var color_2 = new BABYLON.Color3(0.627, 0.749, 0.22);
var color_3 = new BABYLON.Color3(0.918, 0.729, 0.302);
var color_4 = new BABYLON.Color3(0.765, 0.106, 0.475);
var color_current = new BABYLON.Color3(1,1,1);
var color_A = new BABYLON.Color3(1,1,1);
var color_B = new BABYLON.Color3(1,1,1);
var color_neutral = new BABYLON.Color3(1,1,1);
var color_ardoise = new BABYLON.Color3(0.173, 0.176, 0.227);

var frame = -1;
var stateSwitched  = false;
var lastState = "state1";
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
     
        switch (curState) {
            case "state1":
                startFrame_A = 1;
                endFrame_A = 61;
                color_A = color_1;
              break;
            case "state2":
                startFrame_A = 136;
                endFrame_A = 91;
                color_A = color_2;
              break;
            
            case "state3":
            startFrame_A = 266;
            endFrame_A = 226;
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
                startFrame_B = 61;
                endFrame_B = 1;
                color_B = color_1;
              break;
            case "state2":
                startFrame_B = 91;
                endFrame_B = 136;
                color_B = color_2;
              break;
            
            case "state3":
            startFrame_B = 226;
            endFrame_B = 266;
            color_B = color_3;
          break;
          case "state4":
            startFrame_B = 361;
            endFrame_B = 401;
            color_B = color_4;
           break;
          }
        if(frame>0)
        {frame = curFrame;}
        if(curState == nextState && fadingToA)
        { 
            // var frameTemp = frame;
            // frame += Math.abs(endFrame_A-startFrame_A);
            frame =  Math.abs(Math.abs(endFrame_A-startFrame_A) - frame) + Math.abs(endFrame_A-startFrame_A);

        }


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

})();

export default MoPopModule;

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
// shadowGenerator0.getShadowMap().renderList.push(mymesh[i]);
// shadowGenerator1.getShadowMap().renderList.push(mymesh[i]);
// shadowGenerator0.addShadowCaster(mymesh[i]);
// shadowGenerator1.addShadowCaster(mymesh[i]);
}

});




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
// button1.width = 0.05;
// button1.height = 0.05;
// //button1.left = -40;
// button1.left = "-37.5%"; 
// button1.top = "12.5%"; 
// button1.color = "black";
// button1.cornerRadius = 20;
// button1.background = "white";
// button1.onPointerUpObservable.add(function() {
// alert("1");
// });
// button1.onPointerMoveObservable.add(function() {
//     nextState = "state1";
// });

var image1 = new BABYLON.GUI.Image("industriel", "../industriel.png");
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
        });
        image1.onPointerMoveObservable.add(function() {
            nextState = "state1";
        });

        var image2 = new BABYLON.GUI.Image("commercial", "../commercial.png");
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
        });
        image2.onPointerMoveObservable.add(function() {
            nextState = "state2";
        });

        var image3 = new BABYLON.GUI.Image("copropriété", "../copropriété.png");
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
        });
        image3.onPointerMoveObservable.add(function() {
            nextState = "state3";
        });

        var image4 = new BABYLON.GUI.Image("individuel", "../individuel.png");
      //  image4.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
     image4.width = 0.188347;
    image4.height = 0.33;
    image4.left = "37.5%"; 
    // image4.top = "12.5%"; 
    image4.top = "25%"; 
    // image1.height = "300px";
    // image4.populateNinePatchSlicesFromImage = true;
    
    // grid.addControl(image, 0, 0);

    image4.onPointerUpObservable.add(function() {
        alert("4");
        });
        image4.onPointerMoveObservable.add(function() {
            nextState = "state4";
        });


        var titrage = new BABYLON.GUI.Image("titrage", "../titre.png");
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

// advancedTexture.addControl(button1); 
advancedTexture.addControl(image1); 
advancedTexture.addControl(image2);  
advancedTexture.addControl(image3);  
advancedTexture.addControl(image4);  
advancedTexture.addControl(titrage);  
sceneToRender = scene;
startRenderLoop(engine, canvas);
return scene;
};

var state1 = false;
var state2 = false;
var state3 = false;
var state4 = false;

var lihtCasterAssigned = false;
var meshWellLoaded = false;
async function Init() {
            
          await createScene();  
          MeshLoadedChecker();
        StateChangeListener();
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
               
                scene.animationGroups[0].stop();
                scene.animationGroups[1].stop();
                 scene.animationGroups[0].start(false, 1,1, 1);
                 scene.animationGroups[1].start(false, 1,1, 1);
                LightCasterAssignment();
            }
    }, 16);
}

var curState = "state1";
var nextState = "state1";
var isTransiting = false;
var lerp = 0.0;
var curFrame = 0;
var startFrame_A = 0;
var endFrame_A = 0;
var startFrame_B = 0;
var endFrame_B = 0;
var fadingA = false;
var fadingB = false;
var fadedA = false;
var fadedB = false;


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
function StateChangeListener(){
    setInterval(function() {

        if(!meshWellLoaded){return;}
        if(curState != nextState)
      {
        fadedA =false;
        fadingA =false;
        fadedB = false;
        fadingB = false;
        var endFrame = 1;
        var startFrame = 1;
        isTransiting = true;
        startFrame_A = curFrame;
        color_A = color_current;
        switch (curState) {
            case "state1":
                endFrame = 1;
                endFrame_A = 61;
              break;
            case "state2":
                endFrame = 136;
                endFrame_A = 91;
              break;
            
            case "state3":
            endFrame = 266;
            endFrame_A = 226;
          break;
          case "state4":
            endFrame = 401;
            endFrame_A = 361;
           break;
          }

          switch (nextState) {
            case "state1":
                endFrame = 1;
                startFrame_B = 61;
                endFrame_B = 1;
                color_B = color_1;
              break;
            case "state2":
                endFrame = 136;
                startFrame_B = 91;
                endFrame_B = 136;
                color_B = color_2;
              break;
            
            case "state3":
            endFrame = 266;
            startFrame_B = 226;
            endFrame_B = 266;
            color_B = color_3;
          break;
          case "state4":
            endFrame = 401;
            startFrame_B = 361;
            endFrame_B = 401;
            color_B = color_4;
           break;
          }

        //   console.log("CUR STATE : "+curState+" ::: from frame "+startFrame_A+" to "+endFrame_A);
        //   console.log("NEXT STATE : "+nextState+" ::: from frame "+startFrame_B+" to "+endFrame_B);

          curState = nextState;
          fadingA = true;
        // Transit(curFrame,endFrame);
      }



 if(scene.animationGroups!= undefined)
    { if(scene.animationGroups [0].animatables.length>0)
         {curFrame = scene.animationGroups [0].animatables[0].masterFrame;
 
            //  console.log(curFrame);
         }
 }

    if(isTransiting)
    {
        
        if(fadingA && !fadedA)
            {
                
                Transit(startFrame_A,endFrame_A);
                fadingA = false;
                // console.log("fadingA START");
            }
            else if(!fadedA){
                color_current = BABYLON.Color3.Lerp(color_A,color_neutral,(curFrame - (startFrame_A+2))/((endFrame_A+2) - (startFrame_A+2)) );
                meshSolides.material.diffuseColor =   color_current ;
                if((startFrame_A>endFrame_A && curFrame <= endFrame_A+2)||(startFrame_A<endFrame_A && curFrame >= endFrame_A-2))
                    {
                        fadedA = true;
                        fadingB = true;
                        curFrame = startFrame_B;
                        // console.log("fadingA STOP");
                        color_current = color_neutral;
                        meshSolides.material.diffuseColor =   color_current ;
                    }
            }else if(fadingB && !fadedB){
                Transit(startFrame_B,endFrame_B);
            //  console.log("fadingB START");
                fadingB = false;
            } else if(!fadedB){
                
                color_current = BABYLON.Color3.Lerp(color_neutral,color_B,(curFrame - (startFrame_B+2))/((endFrame_B+2) - (startFrame_B+2)) );
                meshSolides.material.diffuseColor =   color_current ;
                if((startFrame_B>endFrame_B && curFrame <= endFrame_B+2)||(startFrame_B<endFrame_B && curFrame >= endFrame_B-2))
                    {
                        fadedB = true;
                        color_current = color_B;
                        meshSolides.material.diffuseColor =   color_current ;
                        // console.log("fadingB STOP");
                    }
            }

            if(fadedA && fadedB)
                {
                    isTransiting = false;
                    fadedA =false;
                    fadingA =false;
                    fadedB = false;
                    fadingB = false;
                }

    }

    }, 16);
    }

   

    function Transit(frameStart,frameEnd){
      
    scene.animationGroups.forEach((g) => {
            g.stop()
            })
    scene.animationGroups[0].start(false, 1.5,frameStart,frameEnd);
    scene.animationGroups[1].start(false, 1.5,frameStart,frameEnd);
    }

    BABYLON.SceneLoader.OnPluginActivatedObservable.add(function (loader) {
        if (loader.name === "gltf") {
            loader.targetFps = 30;
        }
    });

window.addEventListener("resize", function () {
    engine.resize();
});

return {
Init:Init

};

})();

export default MoPopModule;
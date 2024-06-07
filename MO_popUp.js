import "https://cdn.babylonjs.com/babylon.js";
import "https://cdn.babylonjs.com/loaders/babylonjs.loaders.js";
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

let meshSolides;
let meshElements;
let meshGround;

var createScene = function () {

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

var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);

    var light0 = new BABYLON.SpotLight("spot0", new BABYLON.Vector3(20,40, 10), new BABYLON.Vector3(-10, -20, -5),1.14,100, scene);
    light0.intensity =0.5;
    var light1 = new BABYLON.SpotLight("spot1", new BABYLON.Vector3(20, 40, -10), new BABYLON.Vector3(-10, -20, 5),1.14,100, scene);
    light1.intensity =0.5;
    
    const shadowGenerator0 = new BABYLON.ShadowGenerator(1024, light0);
    const shadowGenerator1 = new BABYLON.ShadowGenerator(1024, light1);
    shadowGenerator0.bias = 0.0001;
    shadowGenerator1.bias = 0.0001;
    shadowGenerator0.usePercentageCloserFiltering = true;
    shadowGenerator1.usePercentageCloserFiltering = true;

    const elementsMaterial = new BABYLON.StandardMaterial("elementsMaterial", scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    const solidesMaterial = new BABYLON.StandardMaterial("solidesMaterial", scene);
    elementsMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    groundMaterial.diffuseColor = color_ardoise;
    solidesMaterial.diffuseColor = color_1;
    color_current = color_1;

    BABYLON.SceneLoader.OnPluginActivatedObservable.add(function (loader) {
        if (loader.name === "gltf") {
            console.log("gltf loader");
            loader.targetFps = 30;
        }
    });

BABYLON.SceneLoader.ImportMesh("","https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/","transCubes_elments.glb", scene, function(newMeshes,particleSystems, skeletons){
newMeshes[0].isVisible = false;
for (var i = 0; i < newMeshes[0].getChildMeshes().length; i++) {
        newMeshes[0].getChildMeshes()[i].isVisible = false;
    }
meshElements = newMeshes[0];
meshElements.receiveShadows = true;
shadowGenerator1.getShadowMap().renderList.push(meshSolides);
shadowGenerator1.addShadowCaster(meshSolides);
shadowGenerator0.getShadowMap().renderList.push(meshSolides);
shadowGenerator0.addShadowCaster(meshSolides);
console.log("mesh solides elmements count : "+meshElements.getChildMeshes().length);
for (var i = 0; i < meshElements.getChildMeshes().length; i++) {
meshElements.getChildMeshes()[i].receiveShadows = true;
meshElements.getChildMeshes()[i].material =elementsMaterial;
shadowGenerator0.getShadowMap().renderList.push(meshElements.getChildMeshes()[i]);
shadowGenerator1.getShadowMap().renderList.push(meshElements.getChildMeshes()[i]);
shadowGenerator0.addShadowCaster(meshElements.getChildMeshes()[i]);
shadowGenerator1.addShadowCaster(meshElements.getChildMeshes()[i]);
meshElements.getChildMeshes()[i].isVisible = false;
}

});

BABYLON.SceneLoader.ImportMesh("","https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/","transCubes_solides.glb", scene, function(newMeshes,particleSystems, skeletons){
newMeshes[0].isVisible = false;
for (var i = 0; i < newMeshes[0].getChildMeshes().length; i++) {
        newMeshes[0].getChildMeshes()[i].isVisible = false;
    }
meshSolides = newMeshes[0];
meshSolides.receiveShadows = true;
meshSolides.material =solidesMaterial;
shadowGenerator1.getShadowMap().renderList.push(meshSolides);
shadowGenerator1.addShadowCaster(meshSolides);
shadowGenerator0.getShadowMap().renderList.push(meshSolides);
shadowGenerator0.addShadowCaster(meshSolides);
console.log("mesh solides elmements count : "+meshSolides.getChildMeshes().length);
for (var i = 0; i < meshSolides.getChildMeshes().length; i++) {
    meshSolides.getChildMeshes()[i].receiveShadows = true;
    meshSolides.getChildMeshes()[i].material =solidesMaterial;
shadowGenerator0.getShadowMap().renderList.push(meshSolides.getChildMeshes()[i]);
shadowGenerator1.getShadowMap().renderList.push(meshSolides.getChildMeshes()[i]);
shadowGenerator0.addShadowCaster(meshSolides.getChildMeshes()[i]);
shadowGenerator1.addShadowCaster(meshSolides.getChildMeshes()[i]);
meshSolides.getChildMeshes()[i].isVisible = false;
}

});

BABYLON.SceneLoader.ImportMesh("","https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/","transCubes_meshGround.glb", scene, function(newMeshes,particleSystems, skeletons){
newMeshes[0].isVisible = false;
for (var i = 0; i < newMeshes[0].getChildMeshes().length; i++) {
    newMeshes[0].getChildMeshes()[i].isVisible = false;
}
meshGround = newMeshes[0];
meshGround.receiveShadows = true;
meshGround.scaling = new BABYLON.Vector3(2.0,2.0,2.0);
meshGround.position = new BABYLON.Vector3(-3.0,0.0,0.0);

console.log("mesh solides elmements count : "+meshGround.getChildMeshes().length);
for (var i = 0; i < meshGround.getChildMeshes().length; i++) {
    meshGround.getChildMeshes()[i].receiveShadows = true;
    meshGround.getChildMeshes()[i].material = groundMaterial;
    meshGround.getChildMeshes()[i].checkCollisions = false;
    meshGround.getChildMeshes()[i].isPickable = false;
}

});

var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

var image1 = new BABYLON.GUI.Image("industriel", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/industriel.png");
    image1.width = 0.19526441;
    image1.height = 0.33;
    image1.left = "-37.5%"; 
    image1.top = "25%"; 

    image1.onPointerUpObservable.add(function() {
         alert("1");
        });
        image1.onPointerMoveObservable.add(function() {
            nextState = "state1";
        });

    var image2 = new BABYLON.GUI.Image("commercial", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/commercial.png");
    
    image2.width = 0.193221;
    image2.height = 0.33;
    image2.left = "-12.5%";
    image2.top = "25%";

    image2.onPointerUpObservable.add(function() {
        alert("2");
        });
        image2.onPointerMoveObservable.add(function() {
            nextState = "state2";
        });


        var titrage = new BABYLON.GUI.Image("titrage", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/titre.png");
        titrage.width = 0.75;
        titrage.height = 0.12866817;
        titrage.top = "-35%";
       

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
videoTexture = new BABYLON.VideoTexture("video", "https://raw.githubusercontent.com/lgRecip/UNA_MO_popUp/main/logoAnim.mp4", scene, true);

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
var videoTexture;

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
var logoAnimDuration = 6.0;
var lastAnimTime = -1.0;
var curAnimTime = -1.0;
var meshShown = false;
function Intro(){
    setInterval(function() {
        if(!meshWellLoaded){
            return;
        }
        if(introduced ){return;}
        curAnimTime = videoTexture.video.currentTime;
        if(curAnimTime <lastAnimTime){videoTexture.video.pause();}
        lastAnimTime = curAnimTime;
        introFrame += 1;
        var lerpAlpha = 1.0;

        if(curAnimTime > 3.0 && !meshShown)
            {

                meshShown = true;
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
                scene.animationGroups[0].goToFrame(introAnimFrame);
                scene.animationGroups[1].goToFrame(introAnimFrame);
                LightCasterAssignment();
            }
    }, 16);
}
var lastState = "state1";
var curState = "state1";
var nextState = "state1";
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

        if(nextState != lastState)
            {
                stateHasChanged = true;
            }
        lastState = nextState;
        if(stateHasChanged)
        { 
        
        stateHasChanged = false; 
        stateSwitched = false;
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
        
        stateSwitched = true;
      }

      if(!stateSwitched){return;}

        frame +=1;
        var animFrame = -1;
        if(frame < Math.abs(endFrame_A-startFrame_A))
            {
                fadingToA = true;
                fadingToB = false;
                curFrame = frame;
                if(endFrame_A >= startFrame_A)
                    {animFrame = startFrame_A + frame;}
                else
                    {animFrame = startFrame_A - frame;}
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

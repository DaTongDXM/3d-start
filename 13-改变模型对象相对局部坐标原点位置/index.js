/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-07-01 12:44:41
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-08-18 10:16:40
 * @Description: 动画
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// threejs可以借助HTML5的API请求动画帧window.requestAnimationFrame实现动画渲染

const scene=new THREE.Scene()

const sphereGeometry=new THREE.SphereGeometry(200,25,25)
const planeGeometry=new THREE.PlaneGeometry(200,100)
const uvs=new Float32Array([
    0,0,
    0.5,0,
    0.5,0.5,
    0,0.5
])
planeGeometry.attributes.uvs=new THREE.BufferAttribute(uvs,2)
const texLoader=new THREE.TextureLoader()
const texture=texLoader.load('./earth.jpg')
const material=new THREE.MeshLambertMaterial({
    map:texture,
    side:THREE.DoubleSide
})
const mesh=new THREE.Mesh(sphereGeometry,material)
const mesh1=new THREE.Mesh(planeGeometry,material)
mesh1.position.set(400,400,0)
mesh1.rotateY(Math.PI/2)
const group=new THREE.Group()
group.add(mesh)
group.add(mesh1)
group.position.set(700, 0, 0);
scene.add(group)


// 设置Group对象围绕[0,1,0]向量公转
var axis = new THREE.Vector3(0, 1, 0);
var angle = 0; // 公转角度
var quaternion = new THREE.Quaternion();
var rotationSpeed = 0.01; // 公转速度

// 自转相关参数
var selfRotationAxis = new THREE.Vector3(1, 0, 0);
var selfRotationSpeed = 0.02; // 自转速度



const pointLight=new THREE.PointLight(0xffffff, 2.0)


const axesHelper=new THREE.AxesHelper(1)

scene.add(axesHelper)
scene.add(pointLight)
const width=window.innerWidth
const height=window.innerHeight
const camera=new THREE.PerspectiveCamera(90,width/height,1,8000)
camera.position.set(800,800,800)
camera.lookAt({x:600,y:1200,z:120})


const renderer=new THREE.WebGLRenderer({
    antialias:true
})
renderer.setSize(width,height)
renderer.setClearColor(0x444444)
document.body.append(renderer.domElement)


const orbitControls=new OrbitControls(camera,renderer.domElement)
orbitControls.addEventListener('change',()=>{
    
    renderer.render(scene,camera)
   
})
function render(){
   // 公转
   scene.rotation.y += 0.01;
   angle += rotationSpeed;
   quaternion.setFromAxisAngle(axis, angle);
   group.quaternion.copy(quaternion);
   // 自转
   group.rotateOnAxis(selfRotationAxis, selfRotationSpeed);

    renderer.render(scene,camera)
    requestAnimationFrame(render)
}
render()
//动态变化
// window.onresize=function(){
//     render.setSize(window.innerWidth,window.innerHeight)
//     camera.aspect=window.innerWidth/window.innerHeight
//      // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
//     // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
//     // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
//     camera.updateProjectionMatrix()
// }

/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-07-01 12:44:41
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-08-17 11:38:43
 * @Description: 动画
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// threejs可以借助HTML5的API请求动画帧window.requestAnimationFrame实现动画渲染

const scene=new THREE.Scene()

const boxGeometry=new THREE.BoxGeometry(200,200,200)

const material=new THREE.MeshLambertMaterial({
    color:0X00ffff,
    transparent:true,
    opacity:0.5
})
const mesh=new THREE.Mesh(boxGeometry,material)
scene.add(mesh)

mesh.translateX(300)
mesh.position.y=100
mesh.scale.set(1,1,1)

const fontGeometry=new THREE.PlaneGeometry(100,300)
const fontMaterial=new THREE.MeshLambertMaterial({color:0x00ff00,transparent:true,opacity:0.5})
fontMaterial.side=THREE.DoubleSide
const plane=new THREE.Mesh(fontGeometry,fontMaterial)
plane.position.x=700
plane.position.y=150
plane.position.z=150
plane.id=1231
scene.add(plane)
console.log(plane)
const pointLight=new THREE.PointLight(0xffffff, 1.0)
pointLight.position.set(300,300,300)

const axesHelper=new THREE.AxesHelper(1000)

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
     mesh.rotateY(0.01)
     mesh.rotateX(0.01)
     plane.rotateX(0.01)
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

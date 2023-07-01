/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-07-01 12:44:41
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-07-01 18:48:07
 * @Description: 帧率，就是每秒完成渲染次数，一般高于60为最佳
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
// threejs可以借助HTML5的API请求动画帧window.requestAnimationFrame实现动画渲染

const scene=new THREE.Scene()

const boxGeometry=new THREE.BoxGeometry(100,100,100)

const material=new THREE.MeshLambertMaterial()

const mesh=new THREE.Mesh(boxGeometry,material)
mesh.position.set(0,0,0)

const pointLight=new THREE.PointLight(0xffffff, 1.0)
pointLight.position.set(100,100,100)

const axesHelper=new THREE.AxesHelper(1000)

scene.add(axesHelper)
scene.add(mesh)
scene.add(pointLight)
const width=window.innerWidth
const height=window.innerHeight
const camera=new THREE.PerspectiveCamera(45,width/height,1,3000)
camera.position.set(400,400,400)
camera.lookAt(mesh.position)


const render=new THREE.WebGLRenderer()
render.setSize(width,height)
document.body.append(render.domElement)


const stats=new Stats();
document.body.appendChild(stats.domElement)

function rendering(){
    stats.update()
    render.render(scene,camera)
    mesh.rotateX(100)
    window.requestAnimationFrame(rendering)
}
rendering()
const orbitControls=new OrbitControls(camera,render.domElement)
orbitControls.addEventListener('change',()=>{})


//动态变化
window.onresize=function(){
    render.setSize(window.innerWidth,window.innerHeight)
    camera.aspect=window.innerWidth/window.innerHeight
     // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix()
}

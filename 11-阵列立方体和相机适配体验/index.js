/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-07-01 12:44:41
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-08-16 16:27:30
 * @Description: 动画
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// threejs可以借助HTML5的API请求动画帧window.requestAnimationFrame实现动画渲染

const scene=new THREE.Scene()

const boxGeometry=new THREE.BoxGeometry(100,100,100)

const material=new THREE.MeshLambertMaterial({
    color:0X00ffff,
    transparent:true,
    opacity:0.5
})
for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
        const mesh=new THREE.Mesh(boxGeometry,material)
        mesh.position.set(i*200,0,j*200)
        scene.add(mesh)
     }
    
}



const pointLight=new THREE.PointLight(0xffffff, 1.0)
pointLight.position.set(100,100,100)

const axesHelper=new THREE.AxesHelper(1000)

scene.add(axesHelper)
scene.add(pointLight)
const width=window.innerWidth
const height=window.innerHeight
const camera=new THREE.PerspectiveCamera(90,width/height,1,8000)
camera.position.set(-1200,800,-800)
camera.lookAt({x:600,y:1200,z:120})


const render=new THREE.WebGLRenderer({
    antialias:true
})
render.setSize(width,height)
render.setClearColor(0x444444)
document.body.append(render.domElement)


const orbitControls=new OrbitControls(camera,render.domElement)
orbitControls.addEventListener('change',()=>{
    render.render(scene,camera)
})
render.render(scene,camera)
//动态变化
// window.onresize=function(){
//     render.setSize(window.innerWidth,window.innerHeight)
//     camera.aspect=window.innerWidth/window.innerHeight
//      // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
//     // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
//     // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
//     camera.updateProjectionMatrix()
// }

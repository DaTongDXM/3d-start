/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-07-01 12:44:41
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-09-12 17:56:19
 * @Description: 动画
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// threejs可以借助HTML5的API请求动画帧window.requestAnimationFrame实现动画渲染

//创建场景
const scene=new THREE.Scene()

const box=new THREE.PlaneGeometry(20,20)
const texture=new THREE.TextureLoader()
//创建材质
const group=new THREE.Group()
for (let j = 0; j < 10; j++) {
for (let i = 0; i < 10; i++) {
   let m=getMaterial(i%8)
    const mesh=new THREE.Mesh(box,m)
    mesh.name='TAISHI'
    mesh.position.set(i*30,0,j*30)
    group.add(mesh)
}
}
scene.add(group)
//添加一个辅助网格地面
const gridHelper=new THREE.GridHelper(600,50,0x00ffff)
gridHelper.position.y=-8
scene.add(gridHelper)

const pointLight=new THREE.PointLight(0xffffff, 1)



scene.add(pointLight)
const width=window.innerWidth
const height=window.innerHeight
const camera=new THREE.PerspectiveCamera(90,width/height,1,8000)
camera.position.set(30,30,30)
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
console.log(group.getObjectByName('TAISHI'))
function render(){
    
    scene.rotateY(-0.001)
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
function getMaterial(name){
   return new THREE.MeshBasicMaterial({
        color:0x00ff00,
        map:texture.load(`./${name}.png`),
        transparent:true,
        side:THREE.DoubleSide
    })
}
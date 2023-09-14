/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-07-01 12:44:41
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-07-01 17:39:43
 * @Description: 轨道控制器扩展库OrbitControls
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//#region  创建场景
//1.创建场景
const scene=new THREE.Scene();
//2.创建形状
const geometry=new THREE.BoxGeometry(100,100,100);
//3.形状外观通过材质Material相关API实现
//MeshBasicMaterial基础网格材质不受光照影响
//MeshLambertMaterial漫反射材质需要有光，不然是黑色的
const material=new THREE.MeshLambertMaterial()
//4.物体：网格模型Mesh
const mesh=new THREE.Mesh(geometry,material)
//5.定义位置
mesh.position.set(0,0,0)
//把物体mesh添加到场景中
scene.add(mesh)
//环境光
// const ambient=new THREE.AmbientLight(0xffffff,0.4)
//平行光
const directionLight=new THREE.DirectionalLight(0xffffff,1)
//平行光的位置不是他的位置，是计算设置位置与目标物体计算的连线
directionLight.position.set(200,200,10)
//不设置目标，默认是坐标原点
directionLight.target=mesh

//用于模拟场景中平行光 DirectionalLight 的辅助对象. 其中包含了表示光位置的平面和表示光方向的线段.
const directional=new THREE.DirectionalLightHelper(directionLight,5,0xffffff)
//#endregion

//#region 创建三维坐标轴  
//R,G,B =>X,Y,Z
const axesHelper=new THREE.AxesHelper(1000)
scene.add(axesHelper)
scene.add(directionLight)
scene.add(directional)
// scene.add(ambient)
//#endregion

//#region 创建相机
//设置canvas画布的宽高
const width=1500
const height=700
//创建一个透视相机对象
const camera=new THREE.PerspectiveCamera(40,width/height,1,3000);
//设置相机的位置
camera.position.set(400,400,400);
//相机观察目标
camera.lookAt(mesh.position);
//#endregion

//#region 执行webgl渲染器
//1.创建渲染器
const render=new THREE.WebGLRenderer()
//2.设置画布
render.setSize(width,height)
//3.执行渲染
render.render(scene,camera)
//4.渲染结果添加到dom
document.body.append(render.domElement)
//#endregion

const controls=new OrbitControls(camera,render.domElement);
controls.addEventListener('change',function(){
    //render只是拍照的一个动作，所以要在事件监听里面不断拍照
    render.render(scene,camera)
})
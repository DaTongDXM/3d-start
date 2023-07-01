/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-07-01 12:44:41
 * @LastEditors: wuxudong wuxudong@zbnsec.com
 * @LastEditTime: 2023-07-01 13:08:43
 * @Description: 
 */
import * as THREE from 'three';

//#region  创建场景
const scene=new THREE.Scene();

//创建形状

const geometry=new THREE.BoxGeometry(100,100,100);

//物体外观通过材质Material相关API实现

const material=new THREE.MeshBasicMaterial({
    color:0xff0000
})

//物体：网格模型Mesh

const mesh=new THREE.Mesh(geometry,material)

//定义位置
mesh.position.set(0,10,0)
//把物体mesh添加到场景中

scene.add(mesh)
//#endregion
//#region 创建相机
//创建一个透视相机对象
const width=800
const height=500
const camera=new THREE.PerspectiveCamera(30,width/height,1,3000);
//设置相机的位置
camera.position.set(200,200,200);
//相机观察目标
camera.lookAt(mesh.position);
//#endregion

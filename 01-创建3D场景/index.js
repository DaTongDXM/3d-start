/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-07-01 12:44:41
 * @LastEditors: wuxudong wuxudong@zbnsec.com
 * @LastEditTime: 2023-07-01 12:54:21
 * @Description: 
 */
import * as THREE from 'three';

//创建场景
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
console.log(mesh)
scene.add(mesh)

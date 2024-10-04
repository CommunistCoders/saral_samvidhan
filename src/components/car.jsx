import React from "react";
import { useGLTF } from "@react-three/drei";

export function Car(props) {
  const { nodes, materials } = useGLTF("/models/Lamborghini V12 Vision.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Цилиндр001.geometry} material={materials.B} />
      <mesh geometry={nodes.Цилиндр003.geometry} material={materials.B} />
      <mesh geometry={nodes.Цилиндр005.geometry} material={materials.B} />
      <mesh geometry={nodes.Куб001.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость003.geometry} material={materials.BC} />
      <mesh geometry={nodes.Плоскость005.geometry} material={materials.BC} />
      <mesh geometry={nodes.Плоскость006.geometry} material={materials.BC} />
      <mesh geometry={nodes.Плоскость010.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость012.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость013.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость015.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость016.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость017.geometry} material={materials.G} />
      <mesh geometry={nodes.Плоскость019.geometry} material={materials.R} />
      <mesh geometry={nodes.Плоскость002.geometry} material={materials.GL} />
      <mesh geometry={nodes.Плоскость023.geometry} material={materials.F} />
      <mesh geometry={nodes.Плоскость020.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость026.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость030.geometry} material={materials.B} />
      <mesh geometry={nodes.Цилиндр017.geometry} material={materials.G} />
      <mesh geometry={nodes.Плоскость034.geometry} material={materials.FR} />
      <mesh geometry={nodes.Плоскость035.geometry} material={materials.GL} />
      <mesh geometry={nodes.Плоскость037.geometry} material={materials.BC} />
      <mesh geometry={nodes.Плоскость038.geometry} material={materials.B} />
      <mesh geometry={nodes.Окружность003.geometry} material={materials.T} />
      <mesh geometry={nodes.Окружность007.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость033.geometry} material={materials.G} />
      <mesh geometry={nodes.Плоскость040.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость043.geometry} material={materials.B} />
      <mesh geometry={nodes.Цилиндр.geometry} material={materials.B} />
      <mesh geometry={nodes.Цилиндр002.geometry} material={materials.W1} />
      <mesh geometry={nodes.Цилиндр006.geometry} material={materials.B} />
      <mesh geometry={nodes.Цилиндр007.geometry} material={materials.BP} />
      <mesh geometry={nodes.Цилиндр009.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость044.geometry} material={materials.RE} />
      <mesh geometry={nodes.Плоскость045.geometry} material={materials.GR} />
      <mesh geometry={nodes.Плоскость046.geometry} material={materials.WH} />
      <mesh geometry={nodes.Окружность002.geometry} material={materials.WH} />
      <mesh geometry={nodes.Object_35002.geometry} material={materials.G} />
      <mesh
        geometry={nodes.Цилиндр014.geometry}
        material={materials["B.002"]}
      />
      <mesh geometry={nodes.Плоскость041.geometry} material={materials.GL} />
      <mesh geometry={nodes.Плоскость050.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость059.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость058.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость025.geometry} material={materials.GL} />
      <mesh geometry={nodes.Плоскость076.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость011.geometry} material={materials.BC} />
      <mesh geometry={nodes.Плоскость021.geometry} material={materials.TD} />
      <mesh geometry={nodes.Плоскость004.geometry} material={materials.L} />
      <mesh geometry={nodes.Плоскость027.geometry} material={materials.S3} />
      <mesh geometry={nodes.Плоскость052.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость054.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость055.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость057.geometry} material={materials.TD} />
      <mesh geometry={nodes.Цилиндр015.geometry} material={materials.BP} />
      <mesh
        geometry={nodes.Плоскость067.geometry}
        material={materials["BP.001"]}
      />
      <mesh geometry={nodes.Плоскость062.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость014.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость064.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость051.geometry} material={materials.G} />
      <mesh geometry={nodes.Плоскость066.geometry} material={materials.WH} />
      <mesh geometry={nodes.Плоскость031.geometry} material={materials.BP} />
      <mesh geometry={nodes.Куб004.geometry} material={materials.BP} />
      <mesh
        geometry={nodes.Плоскость070.geometry}
        material={materials["B.001"]}
      />
      <mesh geometry={nodes.Плоскость071.geometry} material={materials.G} />
      <mesh geometry={nodes.Плоскость009.geometry} material={materials.S3} />
      <mesh geometry={nodes.Плоскость053.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость018.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость061.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость075.geometry} material={materials.TD} />
      <mesh geometry={nodes.Куб.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость001.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость007.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость002_1.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость002_2.geometry} material={materials.WH} />
      <mesh geometry={nodes.Цилиндр004_1.geometry} material={materials.B} />
      <mesh geometry={nodes.Цилиндр004_2.geometry} material={materials.G} />
      <mesh geometry={nodes.Плоскость019_1.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость019_2.geometry} material={materials.G} />
      <mesh geometry={nodes.Цилиндр018.geometry} material={materials.B} />
      <mesh geometry={nodes.Цилиндр018_1.geometry} material={materials.G} />
      <mesh geometry={nodes.Окружность003_1.geometry} material={materials.G} />
      <mesh geometry={nodes.Окружность003_2.geometry} material={materials.TD} />
      <mesh geometry={nodes.Плоскость049_1.geometry} material={materials.S2} />
      <mesh geometry={nodes.Плоскость049_2.geometry} material={materials.BC} />
      <mesh geometry={nodes.Плоскость049_3.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость050_1.geometry} material={materials.B} />
      <mesh geometry={nodes.Плоскость050_2.geometry} material={materials.BC} />
      <mesh geometry={nodes.Плоскость051_1.geometry} material={materials.S1} />
      <mesh geometry={nodes.Плоскость051_2.geometry} material={materials.BC} />
      <mesh geometry={nodes.Плоскость046_1.geometry} material={materials.S3} />
      <mesh geometry={nodes.Плоскость046_2.geometry} material={materials.BP} />
      <mesh geometry={nodes.Плоскость046_3.geometry} material={materials.BC} />
      <mesh geometry={nodes.Object_21001.geometry} material={materials.B} />
      <mesh geometry={nodes.Object_21001_1.geometry} material={materials.LL3} />
      <mesh geometry={nodes.Плоскость037_1.geometry} material={materials.BC} />
      <mesh geometry={nodes.Плоскость037_2.geometry} material={materials.BP} />
    </group>
  );
}

useGLTF.preload("/models/Lamborghini V12 Vision.glb");

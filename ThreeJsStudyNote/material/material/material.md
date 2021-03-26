---
title: Material
author: Shingo Hosoda
published_date: 2021-03-23
modified_date: 2021-03-23
---
# Material

## MeshBasicMaterial

ライティングを考慮しないマテリアル、光源を置かなくても均一に見える。
陰影をつけることもできない、動作確認のために使用する。
```js
new THREE.MeshBasicMaterial({color: 0xffffff});
```

![basicMaterial](images/basicMaterial.png)

複数置いても見え方は均一か？

![basicMaterial1](images/basicMaterial1.png)

複数置いても色は均一に見える。
BasicMaterialはベタ塗りな感じなのでジオメトリの形がはっきりとはわからない。

## MeshNormalMaterial

法線マテリアル
RGBによる指定になる。
Basic Material同様光源を置かなくても良いマテリアル、動作確認のために使用する。。
```js
new THREE.MeshNormalMaterial();
```

![normalMaterial1](images/normalMaterial1.png)

複数置いても見え方は均一か？

![normalMaterial2](images/normalMaterial2.png)

複数置いても色は均一に見える。
BasicMaterialと比べるとNormalMaterialはジオメトリの形がはっきりとわかる。

## MeshLambertMaterial

ランバートマテリアルもしくはランバートシェーディングとも言う。
Specularつまり反射を考慮しないマテリアルになる、反射しないため光沢感はないマットな質感になる。
陰影が必要なため、光源を置く必要がる。

```ts
new THREE.MeshLambertMaterial({ color: 0x00ff00 });
```

そもそも光源が必要なため、光源を置かないとどうなるかと言うと

![lambertMaterial0](images/lambert_material0.png)

光源がないと真っ暗で何も見えない。なので光源おいてみると。

配置する光源は、点光源と平行光源です。

![lambertMaterial1](images/lambert_material1.png)

1. 複数置いた場合見え方はどう変わるだろうか？

![lambertMaterial2](images/lambert_material2.png)

はっきりと見えて、陰影がついているのがわかると思います。

見え方は均一でない、光源の位置やジオメトリの座標や向きに見え方は反映される。

では光源を点光源のみ配置しかつ光源が動いていた場合はどうなるか？

2. 光源が動いていた場合はどうなるか？

![lambertMaterial3](images/lambert_material3.png)

光源の位置によって大きく見方は異なる。

3. 複数の光源が動いていた場合どうなるか？

![lambertMaterial4](images/lambert_material4.png)

## MeshPhongMaterial

フォンマテリアもしくはフォンシェーディングとも言う。

フォンシェーディングはランバートシェーディングとは違い反射を考慮されているマテリアルになるため光沢感のある質感になります。

ランバートシェーディングと同じで光源が必要になります。

```ts
new THREE.MeshPhongMaterial({ color: 0x00ff00 });
```

### 点光源を周回させる。

このときの条件は以下です。
1. 平行光源と点光源を設置する。
2. 点光源は周回させる。

![phongMaterial1](images/mesh_phong_material1.png)

ジオメトリが反射しているのがわかるかと思います。
ただこれだけだでは正直わかりにくいと思います。

### 複数のジオメトリを配置しつつ複数の点光源を周回させる。

このときの条件は以下です
1. このとき平行光源の設置は行わない。
2. 点光源は3つまで配置。
3. 点光源は別々の方向に周回させる。

![phongMaterial2](images/mesh_phong_material2.png)



### ランダムマテリアル

複数のマテリアルをかけたジオメトリをランダムに配置する。

使うマテリアルの種類

1. Basic Material
2. Normal Material
3. Lambert Material
4. Phong Material

の4種類

それぞれ20個ずつランダムに配置する。

![phongMaterial3](images/mesh_phong_material3.png)
import { Matrix } from "./matrix";
import { Fence } from "./fence";

class FenceGroup {
  spu;
  skuList = [];
  fences = [];
  constructor(spu) {
    this.spu = spu;
    this.skuList = spu.sku_list;
  }
  _initFences() {
    const matrix = this._createMatrix(this.skuList);
    const fences = [];
    let currentJ = -1;
    matrix.forEach((element, i, j) => {
      if (currentJ !== j) {
        // 开启一个新列, 创建一个新的fence
        currentJ = j;
        fences[currentJ] = this._createFence(element);
      }
      fences[currentJ].pushValueTitle(element.value);
    });
    console.log(fences);
  }
  initFences() {
    const matrix = this._createMatrix(this.skuList);
    const fences = [];
    const AT = matrix.transpose();
    AT.forEach(r => {
      const fence = new Fence(r);
      fence.init();
      fences.push(fence);
    });
    console.log("transpose");
    console.log(fences);
    this.fences = fences;
  }
  _createFence(element) {
    const fence = new Fence();
    return fence;
  }
  _createMatrix(skuList) {
    const m = [];
    skuList.forEach(sku => {
      m.push(sku.specs);
    });
    return new Matrix(m);
  }
}

export { FenceGroup };

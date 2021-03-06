import { SkuCode } from "./sku-code.js";
import { CellStatus } from "../../core/enum.js";
import { SkuPending } from "./sku-pending.js";
import { Joiner } from "../../utils/joiner.js";
class Judger {
  fenceGroup;
  pathDict = [];
  skuPending;
  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup;
    this._initPathDict();
    this._initSkuPending();
  }
  isSkuIntact() {
    console.log("-----in isSkuIntact");
    console.log(this.skuPending.isIntact());
    return this.skuPending.isIntact();
  }
  getCurrentValues() {
    return this.skuPending.getCurrentSpecValues();
  }

  getMissingKeys() {
    const missingKeysIndex = this.skuPending.getMissingSpecKeysIndex();
    return missingKeysIndex.map(i => {
      return this.fenceGroup.fences[i].title;
    });
  }
  _initSkuPending() {
    const specsLenth = this.fenceGroup.fences.length;
    this.skuPending = new SkuPending(specsLenth);
    const defaultSku = this.fenceGroup.getDefaultSku();
    if (!defaultSku) {
      return;
    }
    this.skuPending.init(defaultSku);
    this._initSelectedCell();
    this.judge(null, null, null, true);
    console.log(this.skuPending);
  }
  _initSelectedCell() {
    this.skuPending.pending.forEach(cell => {
      this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED);
    });
  }
  _initPathDict() {
    this.fenceGroup.spu.sku_list.forEach(s => {
      const skuCode = new SkuCode(s.code);
      this.pathDict = this.pathDict.concat(skuCode.totalSegments);
    });
    console.log(this.pathDict);
  }
  judge(cell, x, y, isInit = false) {
    console.log(cell, x, y);
    if (!isInit) {
      this._changeCurrentCellStatus(cell, x, y);
    }
    this.fenceGroup.eachCell((cell, x, y) => {
      const path = this._findPotentialPath(cell, x, y);
      console.log(path);
      if (!path) {
        return;
      }
      const isIn = this._isInDict(path);
      if (isIn) {
        this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING);
      } else {
        this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN);
      }
    });
  }
  getDeterminateSku() {
    const code = this.skuPending.getSkuCode();
    const sku = this.fenceGroup.getSku(code);
    return sku;
  }
  _isInDict(path) {
    return this.pathDict.includes(path);
  }
  _changeOtherCellStatus(cell, x, y) {
    const path = this._findPotentialPath(cell, x, y);
    console.log("---path---");
    console.log(path);
  }
  _findPotentialPath(cell, x, y) {
    const joiner = new Joiner("#");
    for (let i = 0; i < this.fenceGroup.fences.length; i++) {
      const selected = this.skuPending.findSelectedCellByX(i);
      if (x === i) {
        // 当前行 cell id 1-42
        if (this.skuPending.isSelected(cell, x)) {
          // 当前行选中的元素不再计算潜在路径
          return;
        }
        const cellCode = this._getCellCode(cell.spec);
        joiner.join(cellCode);
      } else {
        if (selected) {
          const selectedCellCode = this._getCellCode(selected.spec);
          joiner.join(selectedCellCode);
        }
      }
    }
    return joiner.getStr();
  }
  _getCellCode(spec) {
    return spec.key_id + "-" + spec.value_id;
  }
  _changeCurrentCellStatus(cell, x, y) {
    if (cell.status === CellStatus.WAITING) {
      this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED);
      this.skuPending.insertCell(cell, x);
    }
    if (cell.status === CellStatus.SELECTED) {
      this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING);
      this.skuPending.removeCell(x);
    }
  }
}

export { Judger };

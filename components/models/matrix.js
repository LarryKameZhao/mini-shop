class Matrix {
  m;
  constructor(matrix) {
    this.m = matrix;
  }
  get rowsNum() {
    return this.m.length;
  }
  get colsNum() {
    return this.m[0].length;
  }
  each(cb) {
    for (let colsNum = 0; colsNum < this.colsNum; colsNum++) {
      for (let rowsNum = 0; rowsNum < this.rowsNum; rowsNum++) {
        const element = this.m[rowsNum][colsNum];
        cb(element, rowsNum, colsNum);
      }
    }
  }
  transpose() {
    const desArr = []; // [[],[],[]]
    for (let colsNum = 0; colsNum < this.colsNum; colsNum++) {
      desArr[colsNum] = [];
      for (let rowsNum = 0; rowsNum < this.rowsNum; rowsNum++) {
        desArr[colsNum][rowsNum] = this.m[rowsNum][colsNum];
      }
    }
    return desArr;
  }
}
export { Matrix };

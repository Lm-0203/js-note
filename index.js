class MySets {
  constructor(int = []) {
    this._datas = [];
    if (typeof int[Symbol.iterator] === "function") {
      for (const item of int) {
        this.add(item);
      }
    } else {
      throw Error(`${int} is not iterator`);
    }
  }

  add(addInfo) {
    if (!this.has(addInfo)) {
      this._datas.push(addInfo);
    }
  }

  has(hasInfo) {
    for (const item of this._datas) {
      if (this.isEqual(item, hasInfo)) {
        return true;
      }
    }
    return false;
  }

  isEqual(data1, data2) {
    if (data1 === 0 && data2 === 0) {
      return true;
    }

    return Object.is(data1, data2);
  }

  delete(deleteInfo) {
    for (let i = 0; i < this._datas.length; i++) {
      if (this.isEqual(deleteInfo, this._datas[i])) {
        this._datas.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  forEach(callBack) {
    for (const iterator of this._datas) {
      callBack(iterator, iterator, this._datas);
    }
  }

  *[Symbol.iterator]() {
    for (const item of this._datas) {
      yield item;
    }
  }
}

const s = new MySets();

const s2 = new MySets([3, 4, 5, 6, 7, 4, 5, 6]);

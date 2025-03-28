Array.prototype.sorts = function (key) {
  return this.sort(function (a, b) {
    if (a[key] > b[key]) {
      return 1;
    } else if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  });
};
Array.prototype.orderBy = function (key) {
  return this.sort(function (a, b) {
    if (a[key] > b[key]) {
      return 1;
    } else if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  });
};
Array.prototype.orderDescendingBy = function (key) {
  return this.sort(function (a, b) {
    if (a[key] < b[key]) {
      return 1;
    } else if (a[key] > b[key]) {
      return -1;
    }
    return 0;
  });
};
Array.prototype.unique = function () {
  const new_array = [];
  this.forEach((item) => {
    if (new_array.indexOf(item) == -1) new_array.push(item);
  });
  return new_array;
};
Array.prototype.uniqueByKey = function (key) {
  return [...new Map(this.map((item) => [item[key], item])).values()];
};
Array.prototype.toChunks = function (size) {
  if (Array.isArray(this)) {
    const splitBy = Math.min(Math.ceil(this.length / size));
    const cache = [];
    const tmp = [...this];
    while (tmp.length) cache.push(tmp.splice(0, splitBy));
    return cache;
  } else {
    return [];
  }
};
Array.prototype.groupBy = function (key) {
  const obj = this;

  return Object.entries(
    obj.reduce((acc, x) => {
      acc[x[key]] = [...(acc[x[key]] || []), x];
      return acc;
    }, {})
  ).map(([dep, staff]) => {
    return { master: dep, children: staff };
  });
};

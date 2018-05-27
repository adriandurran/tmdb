module.exports = {
  removeFromArray: (array, value) => {
    var index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
    }
  },

  addToArray: (array, value) => {
    if (array.indexOf(value) === -1) {
      array.push(value);
    }
  }
};

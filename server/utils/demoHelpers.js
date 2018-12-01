module.exports = {
  demoUserId: () => {
    const possibles = 'ABCDEFGHJKMNPQRSTUVWXYZ1234567890';
    let fakeId = '';
    for (let i = 0; i < 8; i++) {
      fakeId += possibles.charAt(Math.floor(Math.random() * possibles.length));
    }
    return fakeId;
  },
  shortName: (name, lng) => {
    return name.substring(0, lng);
  },

  randomNumberRange: (start, end) => {
    return Math.floor(Math.random() * end) + start;
  }
};

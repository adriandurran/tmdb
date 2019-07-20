const terms = require('./dictTerms');
const contexts = require('./dictContexts');

const getRandomTerm = () => {
  return terms[Math.floor(Math.random() * terms.length)];
};

const getRandomContext = () => {
  return contexts[Math.floor(Math.random() * contexts.length)];
};

const randomNumberRanger = (start, end) => {
  return Math.floor(Math.random() * end) + start;
};

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
  },

  randomCompCourseGenerator: (ids, min, max) => {
    //  decide on the number of courses/comps for the comp/role
    let courseRounds = randomNumberRanger(min, max);
    let idArray = [];
    // if there are no  ids
    if (ids.length === 0) {
      return idArray;
    }
    for (let i = 0; i <= courseRounds; i++) {
      idArray.push(ids[randomNumberRanger(0, ids.length)]);
    }
    // remove duplicates here
    return [...new Set(idArray)];
  },

  randomCourseGenerator: () => {
    const type = Math.floor(Math.random() * 3);
    let course;

    if (type === 0) {
      course =
        getRandomTerm() +
        ' and ' +
        getRandomTerm() +
        ' in ' +
        getRandomContext();
    } else if (type === 1) {
      course =
        getRandomTerm() + ', ' + getRandomTerm() + ', and ' + getRandomTerm();
    } else {
      course =
        getRandomTerm() +
        ', ' +
        getRandomTerm() +
        ', and ' +
        getRandomTerm() +
        ' in ' +
        getRandomContext();
    }

    return course;
  }
};

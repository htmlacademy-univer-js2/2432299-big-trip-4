export const getRandomInt = (a, b) => Math.floor(a + Math.random() * (b - a + 1));

export const getRandomElement = (items) => items[getRandomInt(0, items.length - 1)];

export const isEscapeKey = (key) => key === 'Escape';

export const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);

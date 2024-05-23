export const getRandomInt = (a, b) => Math.floor(a + Math.random() * (b - a + 1));

export const getRandomElement = (items) => items[getRandomInt(0, items.length - 1)];

export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export const removeHandlerOnEscape = (cb) => document.removeEventListener('keydown', cb);

export const onEscapeKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    removeHandlerOnEscape(onEscapeKeyDown);
  }
};

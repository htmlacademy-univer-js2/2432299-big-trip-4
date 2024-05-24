import { getRandomElement, getRandomInt } from '../utils/utils.js';

import { CITIES, DESCRIPTION, PicturesCount } from '../const.js';

const generateDestinations = () => CITIES.map((city) => ({
  id: crypto.randomUUID(),
  name: city,
  description: getRandomElement(DESCRIPTION),
  pictures: Array.from({length: getRandomInt(PicturesCount.MIN, PicturesCount.MAX)}, () => ({
    src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
    description: `${city} description`
  }))
}));

export { generateDestinations };

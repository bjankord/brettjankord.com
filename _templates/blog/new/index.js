const slugify = require('slugify');
const pad = (str, size = 2, fill = '0') => str.toString().padStart(size, fill);
const date =
  new Date().getFullYear() +
  '/' +
  pad(new Date().getMonth() + 1) +
  '/' +
  pad(new Date().getDate());

const dateString =
  new Date().getFullYear() +
  '-' +
  pad(new Date().getMonth() + 1) +
  '-' +
  pad(new Date().getDate());

module.exports = {
  prompt: ({ prompter }) => {
    return new Promise((resolve, reject) => {
      prompter
        .prompt({
          type: 'input',
          name: 'title',
          message: 'What is the title?',
        })
        .then(({ title }) => {
          resolve({
            title,
            date,
            dateString,
            slug: slugify(title, { remove: /[*+~.()'"!:@]/g, lower: true }),
          })
        })
    })
  },
};
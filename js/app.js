// Elements
const section = document.querySelector('section');
const article = document.querySelector('article');
const paragraph = document.querySelector('p');
const fileLabel = document.querySelector('#file-label');
const file = document.querySelector('#file');
const column = document.querySelector('#column');
const row = document.querySelector('#row');
const form = document.querySelector('form');
const image = document.querySelector('img');
const reverseCheckbox = document.querySelector('#reverse-checkbox');
const removeButton = document.querySelector('#remove-button');

// Variables
let isReverse = false;

// Upload font image
file.addEventListener('change', (event) => {
  section.innerHTML = '';
  removeAllPortions();

  const target = event.target;
  const files = target.files;

  const fileReader = new FileReader();
  fileReader.onload = function () {
    image.src = fileReader.result;
  }
  fileReader.readAsDataURL(files[0]);
});

// Submit form
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const numberOfColumns = column.value;
  const numberOfRows = row.value;
  const imageAddress = image.getAttribute('src');

  removeAlertBorder(fileLabel);
  removeAlertBorder(column);
  removeAlertBorder(row);

  if (numberOfColumns && numberOfRows && imageAddress) {
    createPortions();
  }
  else {
    if (!imageAddress) {
      addAlertBorder(fileLabel);
    }
    if (!numberOfColumns) {
      addAlertBorder(column);
    }
    if (!numberOfRows) {
      addAlertBorder(row);
    }
  }
});

window.addEventListener('resize', () => {
  createPortions();
});

// Create portion
const createPortions = () => {
  section.innerHTML = '';

  const imageWidth = image.offsetWidth;
  const imageHeight = image.offsetHeight;

  const numberOfColumns = column.value;
  const numberOfRows = row.value;

  const portionWidth = imageWidth / numberOfColumns;
  const portionHeight = imageHeight / numberOfRows;

  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfColumns; j++) {
      section.insertAdjacentHTML('beforeend',
      `<div class="bg-pink-950 hover:bg-rose-800 transition-colors cursor-pointer relative overflow-hidden w-full" onclick="addPortion(this)" title="Add the block" style="width: ${portionWidth}px; height: ${portionHeight}px;">
        <img src="${image.getAttribute('src')}" alt="Block [${i + 1}][${j + 1}]" class="absolute rendering-pixelated max-w-c" style="width: ${numberOfColumns * 100}%; left: -${j * 100}%; top: -${i * 100}%;">
      </div>`);
    }
  }

  // Bonus part!
  for (let i = 0; i < paragraph.childElementCount; i++) {
    const portion = paragraph.children[i];
    portion.style.width = `${portionWidth}px`;
    portion.style.height = `${portionHeight}px`;
  }
}

// Add portion
const addPortion = (element) => {
  article.classList.remove('hidden');
  paragraph.insertAdjacentHTML('beforeend',
  `<div class="bg-green-900 hover:bg-green-700 transition-colors cursor-pointer relative overflow-hidden" onclick="removePortion(this)" title="Remove the block" style="width: ${element.offsetWidth}px; height: ${element.offsetHeight}px;">
    ${element.innerHTML}
  </div>`);
};

// Remove portion
const removePortion = (element) => {
  element.remove();
  if (!paragraph.childElementCount) {
    article.classList.add('hidden');
  }
};

// Remove all portions
const removeAllPortions = () => {
  paragraph.innerHTML = '';
  article.classList.add('hidden');
};

removeButton.addEventListener('click', () => {
  removeAllPortions();
});

reverseCheckbox.addEventListener('change', () => {
  isReverse = !isReverse;

  if (isReverse) {
    paragraph.classList.add('flex-row-reverse');
  }
  else {
    paragraph.classList.remove('flex-row-reverse');
  }
});

// Add alert border
const addAlertBorder = (element) => {
  element.classList.add('border-2', 'border-red-600');
};

// Remove alert border
const removeAlertBorder = (element) => {
  element.classList.remove('border-2', 'border-red-600');
};
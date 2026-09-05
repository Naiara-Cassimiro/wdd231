const currentYear = document.querySelector('#currentyear');
currentYear.textContent = new Date().getFullYear();

const lastModified = document.querySelector('#lastModified');
lastModified.textContent = `Last Modification: ${document.lastModified}`;
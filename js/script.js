const controlButtons = document.querySelector(".control-buttons");

const buttonClear = document.createElement("button");
buttonClear.textContent = "Clear";
buttonClear.classList.add("btn");
controlButtons.appendChild(buttonClear);

const buttonDelete = document.createElement("button");
buttonDelete.textContent = "Delete";
buttonDelete.classList.add("btn");
controlButtons.appendChild(buttonDelete);

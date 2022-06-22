
function changeColor() {
    const originColor = window.getComputedStyle(this)['backgroundColor']

    if (originColor === 'rgb(0, 0, 0)') {
        this.style['background-color'] = 'rgb(255, 255, 255)';
    } else {
        this.style['background-color'] = 'rgb(0, 0, 0)';
    }
}

function createSquare(grid, range, maxHeight) {
    for (let i = 0; i < range; i++) {
    const wrap = document.createElement('div');

    wrap.classList = 'wrap';
    wrap.style = `height: ${maxHeight}px;`;

    grid.appendChild(wrap);

    for (let i = 0; i < range; i++) {
        const square = document.createElement('div');

        square.classList = 'square';

        wrap.appendChild(square);

        square.addEventListener('mouseover', changeColor);
        square.addEventListener('mouseout', changeColor);
        }
    }
}

function createGrid(rang = 2) {
    if (document.querySelector('.grid')) {
        document.body.removeChild(document.querySelector('.grid'))
    }

    const grid = document.createElement('div');
    grid.classList = 'grid';

    document.body.appendChild(grid);

    const gridRange = rang; // 網格 幾乘幾
    const gridHeight = parseInt(window.getComputedStyle(grid)['height']);
    const wrapHeight = gridHeight / gridRange; // 計算每個 wrap 的高度

    createSquare(grid, gridRange, wrapHeight)

}

function editGrid() {
    let newRage = null;

    do {
        newRage = +prompt('Input number of squares per side for the new grid. (Max = 100)')
    }
    while (!isFinite(newRage) || newRage > 100)
    if (!newRage) return

    createGrid(newRage)
}


const button = document.createElement('button');
button.textContent = 'Edit grid range'
button.classList = 'top_button'

document.body.appendChild(button);

button.addEventListener('click', editGrid)

createGrid();

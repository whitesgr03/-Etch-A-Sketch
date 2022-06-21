
function changeColor() {
    const originColor = window.getComputedStyle(this)['backgroundColor']

    if (originColor === 'rgb(0, 0, 0)') {
        this.style['background-color'] = 'rgb(255, 255, 255)';
    } else {
        this.style['background-color'] = 'rgb(0, 0, 0)';
    }
}

function createSquare(range, maxHeight) {
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


const grid = document.createElement('div');
grid.classList = 'grid';

document.body.appendChild(grid);

const gridRange = 2;
const gridHeight = parseInt(window.getComputedStyle(grid)['height']);
const wrapHeight = Math.trunc(gridHeight / gridRange);

createSquare(gridRange, wrapHeight)


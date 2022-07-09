function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function rgbToHsl(rgb){

    let [r, g, b] = rgb.map(color => color / 255);

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = d / (1 - Math.abs(2 * l - 1));
        switch(max){
            case r:
                h = (g - b) / d % 6;
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
    }

    h = Math.round(h * 60);
        
    if (h < 0)
        h += 360;

    s = Math.round((s * 100));
    l = Math.round((l * 100));

    return [h, s, l];
}

function changeColor() {
    const rgb = window.getComputedStyle(this)['background-color'];

    if (rgb === 'rgb(0, 0, 0)' ) {
        const newColor = `hsl(${randomInteger(0, 360)}, ${randomInteger(0, 100)}%, 50%)`;
        this.style['background-color'] = newColor;
        return
    }
    
    const rgbCode = rgb.match(/\d+/g, "");
    const [Hue, Saturation, Lightness] = rgbToHsl(rgbCode)

    if (Lightness > 0) {
        const newColor = `hsl(${Hue}, ${Saturation}%, ${Lightness - 5}%)`;
        this.style['background-color'] = newColor 
    }

    if (Lightness === 5) {
        this.removeEventListener('mouseover', changeColor);
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

function createEditButton() {
    // 建立一個 button 元素
    const button = document.createElement('button');
    // button 加上文字
    button.textContent = 'Edit row and column'
    // button 加上 class
    button.classList = 'editButton'
    // 將 button 元素插入到 body 中
    document.body.appendChild(button);
    // 使用者點擊時執行編輯網格
    button.addEventListener('click', editGrid)
}

// 建立編輯按鈕
createEditButton();

createGrid();

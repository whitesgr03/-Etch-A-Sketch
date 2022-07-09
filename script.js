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

function createSquare(row, gridRow) {
    for (let i = 0; i < row; i++) {
        // 建立一個 square 元素
        const square = document.createElement('div');
        // square 加上 class
        square.classList = 'square';
        // 將 square 插入到 row 中
        gridRow.appendChild(square);
        // 當使用者把滑鼠移入矩形並在移出後改變 BGC 顏色
        square.addEventListener('mouseover', changeBGC);
    }
}

function createGridRow(row, grid) {
    // 建立一個變數來儲存網格高度
    const gridHeight = parseInt(window.getComputedStyle(grid)['height']);
    // 建立一個變數來儲存網格內每行的高度 Ex: 假設 gridHeight 為 600, gridRow 為 2, 則 gridRow 的高度為 300 
    const gridRowHeight = gridHeight / row;
    
    for (let i = 0; i < row; i++) {
        // 建立一個 row 元素
        const gridRow = document.createElement('div');
        // row 加上 class
        gridRow.classList = 'row';
        // 設定每個行數的高度
        gridRow.style = `height: ${gridRowHeight}px;`;
        // 將 row 插入到 grid 中
        grid.appendChild(gridRow);
        // 建立 row 內部的矩形
        createSquare(row, gridRow);
    }
}

function createGrid(row = 2) {
    // 查詢 grid 元素是否存在, 有的話就清除
    if (document.querySelector('.grid')) {
        document.body.removeChild(document.querySelector('.grid'))
    }
    // 建立一個變數來儲存網格元素
    const grid = document.createElement('div');
    // 網格元素加上 class
    grid.classList = 'grid';
    // 將網格元素插入到 body 中
    document.body.appendChild(grid);
   // 建立網格行數
    createGridRow(row, grid)
}

// 建立編輯按鈕
createEditButton();
// 建立主要網格
createGrid();

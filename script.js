"use strict";
// 建立編輯按鈕
createEditButton();
// 建立主要網格
createGrid();

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

function editGrid() {
    // 建立一個變數來儲存新的網格範圍
    let row = null;
    // 向使用者詢問網格大小
    do {
        row = Math.trunc(prompt('Enter the row of the new grid. (Max = 100)'))
    }
    // 如果輸入的不是數字或大於 100 就重新詢問
    while (!isFinite(row) || row > 100)
    // 如果取消則停止
    if (!row) return
    // 使用新的網格大小重新建立主要網格
    createGrid(row)
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

function changeBGC() {
    // 獲取矩形元素 bgc 屬性
    const rgb = window.getComputedStyle(this)['background-color'];
    // 矩形未變更顏色時隨機變更顏色
    if (rgb === 'rgb(0, 0, 0)' ) {
        const newColor = `hsl(${randomInteger(0, 360)}, ${randomInteger(0, 100)}%, 50%)`;
        this.style['background-color'] = newColor;
        return
    }
    // 建立一個儲存 rgb 三項數值的變數
    const rgbCode = rgb.match(/\d+/g, "");
    // 將 rgb 轉換成 hsl
    const [Hue, Saturation, Lightness] = rgbToHsl(rgbCode)
    // 亮度不是 0 的時候降低亮度
    if (Lightness >= 5) {
        const newColor = `hsl(${Hue}, ${Saturation}%, ${Lightness - 5}%)`;
        this.style['background-color'] = newColor 
    }
    // 亮度是 0 的時候移除監聽
    if (Lightness - 5 === 0) {
        this.removeEventListener('mouseover', changeBGC);
    }
}

function randomInteger(min, max) {
    // 建立 rand 儲存相同機率的隨機數字
  let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function rgbToHsl(rgb){
    // 建立 三個變數儲存 RGB
    let [r, g, b] = rgb.map(color => color / 255);
    // 建立 max 儲存最大的值
    const max = Math.max(r, g, b);
    // 建立 min 儲存最小的值
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
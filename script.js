


function changeColor() {
    const originColor = getComputedStyle(this)['backgroundColor']

    if (originColor === 'rgb(0, 0, 0)') {
        this.style['background-color'] = 'rgb(255, 255, 255)';
    } else {
        this.style['background-color'] = 'rgb(0, 0, 0)';
    }
}



for (let i = 0; i < 16; i++) {
    const wrap = document.createElement('div');

    wrap.classList = 'wrap';

    document.body.appendChild(wrap);

    for (let i = 0; i < 16; i++) {
        const square = document.createElement('div');

        square.classList = 'square';

        wrap.appendChild(square);

        square.addEventListener('mouseover', changeColor);
        square.addEventListener('mouseout', changeColor);
    }

    
}




for (let i = 0; i < 16; i++) {
    const wrap = document.createElement('div')
    wrap.classList = 'wrap'
    document.body.appendChild(wrap);

    for (let i = 0; i < 16; i++) {
        const div = document.createElement('div')
        div.classList = 'square'
        wrap.appendChild(div);
    }
}


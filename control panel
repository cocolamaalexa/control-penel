(function() {
    if (document.getElementById('chaos-control-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'chaos-control-panel';
    Object.assign(panel.style, {
        position: 'fixed', top: '10px', right: '10px', zIndex: '2147483647',
        width: '140px', padding: '10px', background: 'rgba(28, 28, 28, 0.98)', 
        border: '1px solid #444', borderRadius: '10px', cursor: 'grab', 
        userSelect: 'none', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column',
        transition: 'width 0.2s ease, height 0.2s ease, padding 0.2s ease'
    });

    const createEl = (tag, props, style) => {
        const el = document.createElement(tag);
        if (props) {
            for (let key in props) {
                if (key === 'textContent') el.textContent = props[key];
                else el[key] = props[key];
            }
        }
        if (style) Object.assign(el.style, style);
        return el;
    };

    const miniIcon = createEl('div', { textContent: '🚀' }, { 
        display: 'none', fontSize: '20px', cursor: 'grab', 
        width: '40px', height: '40px', alignItems: 'center', justifyContent: 'center',
        borderRadius: '10px', background: '#222', border: '1px solid #444',
        position: 'absolute', top: '0', right: '0'
    });

    const minBtn = createEl('div', { textContent: '−' }, {
        position: 'absolute', top: '2px', right: '6px', cursor: 'pointer',
        color: '#666', fontSize: '16px', fontWeight: 'bold', width: '20px',
        height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '4px', transition: 'all 0.2s', zIndex: '2'
    });
    
    minBtn.onmouseenter = () => { minBtn.style.color = '#fff'; minBtn.style.background = '#444'; };
    minBtn.onmouseleave = () => { minBtn.style.color = '#666'; minBtn.style.background = 'transparent'; };

    const contentWrapper = createEl('div', {}, { display: 'block', marginTop: '8px' });

    let isMinimized = false;
    const updateMiniGlow = () => {
        if (isR || isC1 || isC2 || isActive) {
            miniIcon.style.boxShadow = '0 0 12px #bc13fe';
            miniIcon.style.borderColor = '#bc13fe';
        } else {
            miniIcon.style.boxShadow = 'none';
            miniIcon.style.borderColor = '#444';
        }
    };

    minBtn.onclick = (e) => {
        e.stopPropagation();
        isMinimized = true;
        contentWrapper.style.display = 'none';
        minBtn.style.display = 'none';
        miniIcon.style.display = 'flex';
        panel.style.width = '40px';
        panel.style.height = '40px';
        panel.style.padding = '0px';
        updateMiniGlow();
    };

    let dragDistance = 0;
    miniIcon.onclick = () => {
        if (dragDistance > 5) return;
        isMinimized = false;
        contentWrapper.style.display = 'block';
        minBtn.style.display = 'flex';
        miniIcon.style.display = 'none';
        panel.style.width = '140px';
        panel.style.height = 'auto';
        panel.style.padding = '10px';
    };

    // --- BUTTONS ---
    const rainbowBtn = createEl('button', { textContent: '🌈' }, { width: '100%', height: '28px', background: '#000', border: '1px solid #fff', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginBottom: '8px' });
    const rocketRow = createEl('div', {}, { display: 'flex', gap: '6px', marginBottom: '10px' });
    const createRocketCol = (labelTxt) => {
        const col = createEl('div', {}, { flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' });
        const btn = createEl('button', { textContent: '🚀' }, { width: '100%', height: '24px', background: '#000', border: '1px solid #fff', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' });
        const label = createEl('span', { textContent: labelTxt }, { color: '#888', fontSize: '8px', fontWeight: 'bold', marginTop: '3px' });
        col.append(btn, label);
        return { col, btn };
    };
    const overdrive = createRocketCol('OVERDRIVE'), chaos = createRocketCol('CHAOS');
    rocketRow.append(overdrive.col, chaos.col);

    const createInputRow = (labelTxt, val) => {
        const row = createEl('div', {}, { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' });
        const label = createEl('span', { textContent: labelTxt }, { color: '#bbb', fontSize: '9px', fontWeight: 'bold' });
        const input = createEl('input', { type: 'text', value: val }, { width: '50px', padding: '3px', background: '#2a2a2a', color: '#66d9ff', border: '1px solid #444', borderRadius: '4px', fontSize: '10px', textAlign: 'center', outline: 'none' });
        row.append(label, input);
        return { row, input };
    };
    const distCtrl = createInputRow('DIST', '30'), intvCtrl = createInputRow('INTV', '3'), tranCtrl = createInputRow('TRAN', '1.2');
    const mainToggle = createEl('button', { textContent: 'START' }, { width: '100%', padding: '8px', marginTop: '4px', borderRadius: '6px', border: 'none', background: '#28a745', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' });

    [rainbowBtn, rocketRow, distCtrl.row, intvCtrl.row, tranCtrl.row, mainToggle].forEach(el => contentWrapper.appendChild(el));
    panel.append(minBtn, miniIcon, contentWrapper);
    document.body.appendChild(panel);

    let isActive = false, moveLoop = null, isR = false, rLoop = null, isC1 = false, c1Loop = null, isC2 = false, c2Loop = null;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (isActive) mainToggle.click();
            if (isR) rainbowBtn.click();
            if (isC1) overdrive.btn.click();
            if (isC2) chaos.btn.click();
        }
    });

    // --- LOGIC ---
    mainToggle.onclick = () => {
        isActive = !isActive;
        mainToggle.textContent = isActive ? "STOP" : "START";
        mainToggle.style.background = isActive ? "#dc3545" : "#28a745";
        if (isActive) {
            const runMove = () => {
                const range = parseFloat(distCtrl.input.value) || 0, trans = parseFloat(tranCtrl.input.value) || 0;
                document.querySelectorAll('div, section, article, img, p, h1, h2, h3, h4, h5, h6, button, a, li, span, input').forEach(el => {
                    if (panel.contains(el) || el === panel) return;
                    el.style.setProperty('transition', `transform ${trans}s ease-in-out`, 'important');
                    el.style.setProperty('transform', `translate(${(Math.random()-0.5)*range*2}px, ${(Math.random()-0.5)*range*2}px) rotate(${(Math.random()-0.5)*4}deg)`, 'important');
                });
            };
            moveLoop = setInterval(runMove, (parseFloat(intvCtrl.input.value) || 3) * 1000);
            runMove();
        } else {
            clearInterval(moveLoop);
            document.querySelectorAll('*').forEach(el => {
                if (!panel.contains(el)) {
                    el.style.setProperty('transition', 'transform 0.8s ease-in-out', 'important');
                    el.style.setProperty('transform', 'none', 'important');
                    setTimeout(() => { el.style.removeProperty('transform'); el.style.removeProperty('transition'); }, 800);
                }
            });
        }
        updateMiniGlow();
    };

    rainbowBtn.onclick = () => {
        isR = !isR; rainbowBtn.textContent = isR ? '🛑' : '🌈';
        if (isR) {
            rLoop = setInterval(() => {
                const hue = (Date.now() / 50) % 360;
                document.querySelectorAll('body *').forEach(el => {
                    if (panel.contains(el)) return;
                    const style = window.getComputedStyle(el);
                    if (el.offsetWidth > 20 && el.offsetHeight > 20 && (style.backgroundColor !== 'rgba(0, 0, 0, 0)' || el.tagName === 'BUTTON')) {
                        el.style.setProperty('background-color', `hsla(${hue}, 70%, 50%, 0.12)`, 'important');
                        el.style.setProperty('border', `2px solid hsla(${hue}, 70%, 50%, 0.8)`, 'important');
                    }
                });
                document.body.style.setProperty('background-color', `hsla(${hue}, 70%, 90%, 0.1)`, 'important');
            }, 50);
        } else {
            clearInterval(rLoop);
            document.querySelectorAll('*').forEach(el => { 
                if(!panel.contains(el)) { 
                    el.style.removeProperty('background-color'); 
                    el.style.removeProperty('border'); 
                } 
            });
            document.body.style.removeProperty('background-color');
        }
        updateMiniGlow();
    };

    overdrive.btn.onclick = () => {
        isC1 = !isC1; overdrive.btn.textContent = isC1 ? '🛑' : '🚀';
        if (isC1) {
            const elms = document.querySelectorAll('p, span, div, h1, h2, h3, a, li, button, i, b, cite, section');
            const states = Array.from(elms).map(() => ({ hue: Math.floor(Math.random() * 360), speed: Math.floor(Math.random() * 40) + 30 }));
            c1Loop = setInterval(() => {
                elms.forEach((el, i) => {
                    if (panel.contains(el)) return;
                    states[i].hue = (states[i].hue + states[i].speed) % 360;
                    el.style.setProperty('color', `hsl(${states[i].hue}, 100%, 50%)`, 'important');
                    el.style.setProperty('background-color', `hsl(${(states[i].hue + 180) % 360}, 100%, 50%)`, 'important');
                    el.style.setProperty('outline', `2px solid hsl(${states[i].hue}, 100%, 50%)`, 'important');
                });
            }, 10);
        } else { clearInterval(c1Loop); document.querySelectorAll('*').forEach(el => { if(!panel.contains(el)) { el.style.removeProperty('color'); el.style.removeProperty('background-color'); el.style.removeProperty('outline'); } }); }
        updateMiniGlow();
    };

    chaos.btn.onclick = () => {
        isC2 = !isC2; chaos.btn.textContent = isC2 ? '🛑' : '🚀';
        if (isC2) {
            const elms = document.querySelectorAll('p, span, div, h1, h2, h3, a, li, button, i, b, cite, section');
            const hues = Array.from(elms).map(() => Math.floor(Math.random() * 360));
            c2Loop = setInterval(() => {
                elms.forEach((el, i) => {
                    if (panel.contains(el)) return;
                    hues[i] = (hues[i] + 90) % 360;
                    el.style.setProperty('color', `hsl(${hues[i]}, 100%, 50%)`, 'important');
                    el.style.setProperty('background-color', `hsl(${(hues[i]+180)%360}, 100%, 50%)`, 'important');
                    el.style.setProperty('filter', 'saturate(10) brightness(1.8) contrast(1.5)', 'important');
                    el.style.setProperty('outline', `3px solid hsl(${hues[i]}, 100%, 50%)`, 'important');
                });
            }, 1);
        } else { clearInterval(c2Loop); document.querySelectorAll('*').forEach(el => { if(!panel.contains(el)) { el.style.removeProperty('color'); el.style.removeProperty('background-color'); el.style.removeProperty('filter'); el.style.removeProperty('outline'); } }); }
        updateMiniGlow();
    };

    // --- DRAGGING ---
    panel.onmousedown = (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target === minBtn || e.target === miniIcon) return;
        let startX = e.clientX, startY = e.clientY;
        let rect = panel.getBoundingClientRect();
        let sx = startX - rect.left, sy = startY - rect.top;

        const move = (ev) => { 
            dragDistance = Math.sqrt(Math.pow(ev.clientX - startX, 2) + Math.pow(ev.clientY - startY, 2));
            panel.style.left = (ev.pageX - sx) + 'px'; 
            panel.style.top = (ev.pageY - sy) + 'px'; 
            panel.style.right = 'auto'; 
        };
        document.addEventListener('mousemove', move);
        document.onmouseup = () => {
            document.removeEventListener('mousemove', move);
        };
    };
})();

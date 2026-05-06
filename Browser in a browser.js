javascript:(function() {

    const popupId = "customPopupBrowser";

    let popup = document.getElementById(popupId);



    if (popup) {

        popup.remove();

        return;

    }

  

    const swalScript = document.createElement('script');

    swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';

    document.head.appendChild(swalScript);

  

    popup = document.createElement("div");

    popup.id = popupId;

    popup.style.position = "fixed";

    popup.style.top = "10%";

    popup.style.left = "10%";

    popup.style.width = "80%";

    popup.style.height = "80%";

    popup.style.minWidth = "300px";

    popup.style.minHeight = "200px";

    popup.style.zIndex = "10000";

    popup.style.backgroundColor = "#fff";

    popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

    popup.style.borderRadius = "8px";

    popup.style.overflow = "hidden";

    popup.style.display = "flex";

    popup.style.flexDirection = "column";

    popup.style.transition = "all 0.3s"; 



    /* --- Dragging and Resizing Logic --- */

    let isDragging = false;

    let isResizing = false;

    let currentResizer = null;

    let startX, startY, startWidth, startHeight, startLeft, startTop;



    const corners = [

        { name: 'br', cursor: 'nwse-resize', top: 'auto', left: 'auto', bottom: '0', right: '0' },

        { name: 'bl', cursor: 'nesw-resize', top: 'auto', left: '0', bottom: '0', right: 'auto' },

        { name: 'tr', cursor: 'nesw-resize', top: '0', left: 'auto', bottom: 'auto', right: '0' },

        { name: 'tl', cursor: 'nwse-resize', top: '0', left: '0', bottom: 'auto', right: 'auto' }

    ];



    corners.forEach(corner => {

        const resizer = document.createElement('div');

        resizer.style.width = '15px';

        resizer.style.height = '15px';

        resizer.style.position = 'absolute';

        resizer.style.zIndex = '10001';

        resizer.style.cursor = corner.cursor;

        resizer.style.top = corner.top;

        resizer.style.left = corner.left;

        resizer.style.bottom = corner.bottom;

        resizer.style.right = corner.right;

        

        resizer.addEventListener('mousedown', (e) => {

            isResizing = true;

            currentResizer = corner.name;

            startX = e.clientX;

            startY = e.clientY;

            startWidth = parseInt(document.defaultView.getComputedStyle(popup).width, 10);

            startHeight = parseInt(document.defaultView.getComputedStyle(popup).height, 10);

            startLeft = popup.offsetLeft;

            startTop = popup.offsetTop;

            popup.style.transition = "none";

            e.preventDefault();

        });

        popup.appendChild(resizer);

    });



    const headerBar = document.createElement("div");

    headerBar.style.height = "35px";

    headerBar.style.backgroundColor = "#D3D3D3"; 

    headerBar.style.display = "flex";

    headerBar.style.alignItems = "center";

    headerBar.style.padding = "0 10px";

    headerBar.style.cursor = "move";

    headerBar.style.borderBottom = "1px solid #ccc";

    headerBar.style.userSelect = "none"; 



    headerBar.addEventListener("mousedown", (e) => {

        if (isResizing || e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN') return;

        isDragging = true;

        startX = e.clientX - popup.offsetLeft;

        startY = e.clientY - popup.offsetTop;

        popup.style.transition = "none"; 

    });



    document.addEventListener("mousemove", (e) => {

        if (isDragging) {

            popup.style.left = `${e.clientX - startX}px`;

            popup.style.top = `${e.clientY - startY}px`;

        } else if (isResizing) {

            const dx = e.clientX - startX;

            const dy = e.clientY - startY;

            if (currentResizer === 'br') {

                popup.style.width = `${startWidth + dx}px`;

                popup.style.height = `${startHeight + dy}px`;

            } else if (currentResizer === 'bl') {

                popup.style.width = `${startWidth - dx}px`;

                popup.style.height = `${startHeight + dy}px`;

                popup.style.left = `${startLeft + dx}px`;

            } else if (currentResizer === 'tr') {

                popup.style.width = `${startWidth + dx}px`;

                popup.style.height = `${startHeight - dy}px`;

                popup.style.top = `${startTop + dy}px`;

            } else if (currentResizer === 'tl') {

                popup.style.width = `${startWidth - dx}px`;

                popup.style.height = `${startHeight - dy}px`;

                popup.style.left = `${startLeft + dx}px`;

                popup.style.top = `${startTop + dy}px`;

            }

        }

    });



    document.addEventListener("mouseup", () => {

        isDragging = false;

        isResizing = false;

        popup.style.transition = "all 0.3s"; 

    });



    const tabsContainer = document.createElement("div");

    tabsContainer.style.display = "flex";

    tabsContainer.style.backgroundColor = "#D3D3D3";

    tabsContainer.style.padding = "5px";

    tabsContainer.style.overflowX = "auto";

    tabsContainer.style.overflowY = "hidden";

    tabsContainer.style.flex = "1";

    tabsContainer.style.gap = "4px";



    const controlBar = document.createElement("div");

    controlBar.style.display = "flex";

    controlBar.style.padding = "5px";

    controlBar.style.alignItems = "center";



    function createNavButton(text) {

        const btn = document.createElement("button");

        btn.innerText = text;

        btn.style.margin = "0 5px";

        btn.style.color = "black";

        btn.style.background = "none"; 

        btn.style.border = "none"; 

        btn.style.outline = "none"; 

        btn.style.fontSize = "20px";

        btn.style.cursor = "pointer";

        btn.style.transition = "transform 0.2s ease";

        btn.addEventListener("mouseover", () => btn.style.transform = `scale(1.2)`);

        btn.addEventListener("mouseleave", () => btn.style.transform = `scale(1)`);

        return btn;

    }



    const urlInput = document.createElement("input");

    urlInput.type = "text";

    urlInput.placeholder = "Enter URL or search";

    urlInput.style.flex = "1";

    urlInput.style.margin = "0 5px";



    const addTabButton = createNavButton("+");

    const closeButton = createNavButton("✖");

    closeButton.style.fontSize = "16px";

    closeButton.addEventListener("click", () => popup.remove());



    /* --- Tab Management --- */

    let tabCount = 0;

    let tabButtons = [];

    const contentContainer = document.createElement("div");

    contentContainer.style.flex = "1";

    contentContainer.style.position = "relative";

    contentContainer.style.overflow = "hidden";



    function createTab(url = "https://www.google.com?igu=1") {

        tabCount++;

        const tabId = `tab-${tabCount}`;

        

        const tabWrapper = document.createElement("div");

        tabWrapper.style.display = "flex";

        tabWrapper.style.alignItems = "center";

        tabWrapper.style.backgroundColor = "#fff";

        tabWrapper.style.borderRadius = "15px";

        tabWrapper.style.padding = "0 8px";

        tabWrapper.style.minWidth = "120px";

        tabWrapper.style.maxWidth = "150px";

        tabWrapper.dataset.tabId = tabId;



        const tabTitle = document.createElement("span");

        tabTitle.innerText = "New Tab";

        tabTitle.style.flex = "1";

        tabTitle.style.fontSize = "12px";

        tabTitle.style.cursor = "pointer";

        tabTitle.style.whiteSpace = "nowrap";

        tabTitle.style.overflow = "hidden";

        tabTitle.style.textOverflow = "ellipsis";

        

        const closeTabBtn = document.createElement("span");

        closeTabBtn.innerText = "×";

        closeTabBtn.style.marginLeft = "5px";

        closeTabBtn.style.cursor = "pointer";

        closeTabBtn.style.fontSize = "16px";

        closeTabBtn.style.fontWeight = "bold";

        closeTabBtn.style.color = "#999";



        closeTabBtn.addEventListener("mouseover", () => closeTabBtn.style.color = "red");

        closeTabBtn.addEventListener("mouseleave", () => closeTabBtn.style.color = "#999");



        closeTabBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            const iframe = document.getElementById(tabId);

            if (iframe) iframe.remove();

            tabWrapper.remove();

            tabButtons = tabButtons.filter(b => b !== tabWrapper);

            if (tabWrapper.classList.contains('active') && tabButtons.length > 0) {

                tabButtons[tabButtons.length - 1].click();

            } else if (tabButtons.length === 0) {

                popup.remove();

            }

        });



        tabWrapper.appendChild(tabTitle);

        tabWrapper.appendChild(closeTabBtn);



        tabWrapper.addEventListener("click", () => {

            tabButtons.forEach(b => {

                b.classList.remove('active');

                b.style.backgroundColor = "#eee";

            });

            tabWrapper.classList.add('active');

            tabWrapper.style.backgroundColor = "#fff";

            Array.from(contentContainer.children).forEach(iframe => iframe.style.display = "none");

            const activeIframe = document.getElementById(tabId);

            activeIframe.style.display = "block";

            urlInput.value = activeIframe.src;

        });



        tabsContainer.appendChild(tabWrapper);

        tabButtons.push(tabWrapper);



        const iframe = document.createElement("iframe");

        iframe.src = url;

        iframe.id = tabId;

        iframe.style.width = "100%";

        iframe.style.height = "100%";

        iframe.style.border = "none"; 

        contentContainer.appendChild(iframe);

        tabWrapper.click(); 

    }



    addTabButton.addEventListener("click", () => createTab());



    headerBar.appendChild(tabsContainer);

    headerBar.appendChild(closeButton);

    popup.appendChild(headerBar);

    

    controlBar.appendChild(createNavButton("<"));

    controlBar.appendChild(createNavButton(">"));

    const reloadBtn = createNavButton("⟳");

    controlBar.appendChild(reloadBtn);

    controlBar.appendChild(urlInput);

    controlBar.appendChild(addTabButton);

    popup.appendChild(controlBar);

    popup.appendChild(contentContainer);



    document.body.appendChild(popup);

    createTab();



    reloadBtn.addEventListener("click", () => {

        const active = tabButtons.find(b => b.classList.contains('active'));

        if (active) document.getElementById(active.dataset.tabId).contentWindow.location.reload();

    });



    urlInput.addEventListener("keypress", (e) => {

        if (e.key === "Enter") {

            const active = tabButtons.find(b => b.classList.contains('active'));

            if (active) {

                let val = urlInput.value.trim();

                if (!val.startsWith("http")) val = `https://www.google.com/search?q=${encodeURIComponent(val)}&igu=1`;

                document.getElementById(active.dataset.tabId).src = val;

            }

        }

    });

})();

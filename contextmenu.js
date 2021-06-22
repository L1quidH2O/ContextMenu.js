
document.addEventListener('mousedown', e => {

    //If left click and mouse isnt inside .contextmenu-container
    if (e.which == 1 && !e.target.closest('.contextmenu-container')) {

        //delete all elements with className contextmenu-container
        var deleteElems = document.getElementsByClassName('contextmenu-container')
        while (deleteElems.length > 0) {
            deleteElems[0].parentNode.removeChild(deleteElems[0]);
        }
    }
})

//create style element and prepend it to head
{
    var styleEle = document.createElement('style')
    styleEle.innerHTML = `
        .contextmenu-container{
            position: absolute;
            top:0;
            user-select:none;
            z-index:100000;

            background-color:rgb(250, 250, 250);
            margin:0;
            padding:0px;

            width:auto;
            min-width:250px;
            
            box-shadow:0px 0px 10px rgb(0,0,0,0.2);
            border:3px solid rgb(215, 215, 215);

            font-family: Arial, helvetica, sans-serif, serif;
            font-size: 13px;
            
            color:rgb(0,0,0,0.8);
        }

        .contextmenu-divider{
            width:85%;
            margin:3px auto;
            border: 1px solid rgb(0,0,0,0.15);
        }

        .contextmenu-text{
            margin:0;
            padding:5px 10px;
            pointer-events: none;
            white-space: nowrap;
        }

        .contextmenu-extraText{
            margin:0;
            padding:5px 10px;
            color:rgb(0,0,0,0.6);
        }

        .contextmenu-focus{
            background-color:rgb(220, 220, 220);
        }

        .contextmenu-item:hover{
            background-color:rgb(235, 235, 235);
        }        
    `

    document.head.prepend(styleEle)
}

function buildContextmenu(menu, left, top, loc) {

    var outer = document.createElement('div')
    outer.className = "contextmenu-container"




    //if loc !== document.body then its a submenu, so it needs to have position: relative;
    if (loc === document.body) {

        //delete all elements with className contextmenu-container
        var deleteElems = document.getElementsByClassName('contextmenu-container')
        while (deleteElems.length > 0) {
            deleteElems[0].parentNode.removeChild(deleteElems[0]);
        }

        outer.style.position = 'fixed'
        outer.style.left = left + 'px'
        outer.style.top = top + 'px'
    }
    else {
        outer.style.left = -loc.offsetLeft + loc.offsetWidth + 'px'
    }


    menu.forEach(d => {

        if (typeof d === 'object') {
            let item = document.createElement('div')
            item.style.position = 'relative'

            let hovArea = document.createElement('div')
            hovArea.style.width = '100%'
            hovArea.style.height = '100%'
            hovArea.className = "contextmenu-item"
            hovArea.style.display = 'flex'
            hovArea.style.justifyContent = 'space-between'
            hovArea.style.cursor = 'pointer'

            item.appendChild(hovArea)

            let text = document.createElement('span')
            text.className = "contextmenu-text"
            text.textContent = d.text || 'text'


            hovArea.addEventListener('mouseenter', () => {
                var focused = outer.childNodes
                focused.forEach(d=>{
                    if(d.classList.contains('contextmenu-focus')){
                        d.removeChild(d.getElementsByClassName('contextmenu-container')[0])
                        d.classList.remove('contextmenu-focus')
                    }
                })
            })

            if (d.hasOwnProperty('sub')) {
                text.textContent += " ->"

                hovArea.addEventListener('mouseenter', () => {
                    item.classList.add('contextmenu-focus')
                    buildContextmenu(d.sub, 0, 0, item)
                })
            }

            hovArea.appendChild(text)

            if (d.hasOwnProperty('extraText')) {
                let extraText = document.createElement('span')
                extraText.className = "contextmenu-extraText contextmenu-text"
                extraText.textContent = d.extraText

                hovArea.appendChild(extraText)
            }

            outer.appendChild(item)


            if (d.hasOwnProperty('onclick')) {
                item.addEventListener('click', e => d.onclick(e));
            }
        }
        else {
            if (d === 'divider') {
                var hr = document.createElement('hr')
                hr.className = "contextmenu-divider"
                outer.appendChild(hr)
            }
        }

    })


    loc.appendChild(outer)

    let docWidth = document.documentElement.clientWidth, docHeight = document.documentElement.clientHeight

    //Now determine where the contextmenu will be
    if (loc === document.body) {

        if (left + outer.offsetWidth > docWidth) {
            //Does sub-contextmenu overflow window width?

            outer.style.left = docWidth - outer.offsetWidth + 'px'
        }


        if (outer.offsetHeight > docHeight) {
            //is the contextmenu height larger than the window height?
            outer.style.top = 0
            outer.style.overflowY = 'scroll'
            outer.style.overflowX = 'hidden'
            outer.style.height = docHeight + 'px'
        }
        else if (top + outer.offsetHeight > docHeight) {
            //Does contextmenu overflow window height?

            outer.style.top = docHeight - outer.offsetHeight + 'px'
        }

    }
    else {

        //if its sub-contextmenu

        var dimensionsLoc = loc.getBoundingClientRect(), dimensionsOuter = outer.getBoundingClientRect();

        //Does sub-contextmenu overflow window width?
        if (dimensionsOuter.left + dimensionsOuter.width > docWidth) {
            outer.style.left = -loc.offsetLeft - dimensionsOuter.width + 'px'
        }

        if (dimensionsOuter.height > docHeight) {
            //is the sub-contextmenu height larger than the window height?
            
            outer.style.top = -dimensionsOuter.top + 'px'
            outer.style.overflowY = 'scroll'
            outer.style.overflowX = 'hidden'
            outer.style.height = docHeight + 'px'
        }
        else if (dimensionsOuter.height < docHeight && dimensionsOuter.height > docHeight / 2) {
            //is the sub-contextmenu height smaller than the window height AND larger than half of window height?
            
            if (dimensionsOuter.top - docHeight / 2 >= 0) { //If sub-contextmenu is closer to bottom of the screen
                outer.style.top = -dimensionsOuter.top - dimensionsOuter.height + docHeight + 'px'
            }
            else { //If sub-contextmenu is closer to top of the screen
                outer.style.top = -dimensionsOuter.top + 'px'
            }

        }
        else if (dimensionsOuter.top + dimensionsOuter.height > docHeight) {
            //Does sub-contextmenu overflow window height?

            outer.style.top = -dimensionsOuter.height + dimensionsLoc.height + 'px'
        }

    }

    //diagram:
    {
        /*
            <div class="contextmenu-container">
                <div style="position: relative;">
                    <div class="contextmenu-item">
                        <span class="contextmenu-text">text</span>
                    </div>
                </div>
                <div class="contextmenu-focus" style="position: relative;">
                    <div class="contextmenu-item">
                        <span class="contextmenu-text">(sub) -></span>
                    </div>
                    <div class="contextmenu-container">
                        <div class="contextmenu-item">
                            <span class="contextmenu-text">text</span>
                        </div>
                    </div>
            </div>
        */
    }

}


function createContextmenu(ele, menu, type) {
    const elem = document.querySelector(ele);
    if (elem === undefined) { console.error("Element does not exist"); return }


    // type has value ? click : contextmenu
    type = type !== undefined ? type = 'click' : type = 'contextmenu'

    elem.addEventListener(type, e => {
        e.preventDefault();
        buildContextmenu(menu, e.pageX - document.documentElement.scrollLeft, e.pageY - document.documentElement.scrollTop, document.body)
    })
}

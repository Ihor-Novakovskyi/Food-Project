export default function tabs(tabsWrapperSelector, tabsLinkSelector, tabContentSelector, activeClass) {    
    const tabsWrapper = document.querySelector(tabsWrapperSelector);
    const tabsBox = tabsWrapper.querySelectorAll(tabsLinkSelector);
    const tabsContent = document.querySelectorAll(tabContentSelector);
//
    function hideInfo() {
        tabsBox.forEach(element => {
            element.classList.remove(activeClass);
        })

        tabsContent.forEach(element => {
            element.classList.remove('show');
            element.classList.add('hide');
        })
    }

    function showInfo(i = 0) {
        tabsBox[i].classList.add(activeClass);
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
    }
    hideInfo();
    showInfo();

    tabsWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains(tabsLinkSelector.slice(1))) {
            tabsBox.forEach((button, i) => {
                if (button === event.target) {
                    hideInfo();
                    showInfo(i);
                }
            })
        }
    })
}

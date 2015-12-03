function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.attachEvent) {
        var r = elm.attachEvent("on" + evType, fn); //IE5+
        return r;
    } else {
        elm['on' + evType] = fn; //DOM 0
    }
}

function removeEvent(elm, evType, fn, useCapture) {
    if (elm.removeEventListener) {
        elm.removeEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.detachEvent) {
        var r = elm.detachEvent("on" + evType, fn); //IE5+
        return r;
    }
}

function addScrollEvent(ele, fn, useCapture) {
    if (navigator.userAgent.indexOf('Firefox') >= 0) {
        ele.addEventListener("DOMMouseScroll", fn, useCapture);
    } else if (ele.addEventListener) {
        ele.addEventListener("mousewheel", fn, useCapture); //DOM2.0
        return true;
    } else if (ele.attachEvent) {
        var r = ele.attachEvent("onmousewheel", fn); //IE5+
        return r;
    }
}

function removeScrollEvent(ele, fn, useCapture) {
    if (navigator.userAgent.indexOf('Firefox') >= 0) {
        ele.removeEventListener("DOMMouseScroll", fn, useCapture);
    } else if (ele.addEventListener) {
        ele.removeEventListener("mousewheel", fn, useCapture); //DOM2.0
        return true;
    } else if (ele.attachEvent) {
        var r = ele.detachEvent("onmousewheel", fn); //IE5+
        return r;
    }
}
var nav = document.getElementById('nav');
var menu = document.getElementById('menu');
/**
 * 导航栏隐藏显示函数
 * @return {[type]} [description]
 */
function toggleNav() {
    if (menu.style.display === "block") {
        nav.style.cssText = "transform: translate(0, 0);-o-transform: translate(0, 0);-moz-transform: translate(0, 0);-ms-transform: translate(0, 0);-webkit-transform: translate(0, 0);";
        menu.style.display = "none";
    } else {
        nav.style.cssText = "transform: translate(0, -100%);-o-transform: translate(0, -100%);-moz-transform: translate(0, -100%);-ms-transform: translate(0, -100%);-webkit-transform: translate(0, -100%);";
        menu.style.display = "block";
    }
}
var menuDisappear = document.getElementById('menuDisappear');
addEvent(menu, "click", toggleNav, false);
addEvent(menuDisappear, "click", toggleNav, false);
var height = window.innerHeight;
var width = window.innerWidth;
document.body.style.height = height + "px";
document.getElementById('loadImgContainer').style.height = width * 0.5625 + "px";

//loading脚本
(function() {
    var c = document.getElementById("wave");
    var cxt = c.getContext("2d");
    cxt.fillStyle = "#f7f7f7";
    var j = 0;

    function draw() {
        cxt.clearRect(0, 0, 330, 200);
        cxt.beginPath();
        for (var i = 0; i < 330; i += 10) {
            cxt.lineTo(i, (Math.sin(i / 10 + j) + 1.2) * 60);
        }
        cxt.lineTo(320, 0);
        cxt.lineTo(0, 0);
        cxt.lineTo(0, 20);
        cxt.closePath();
        cxt.fill();
        j += 0.4;
    }
    document.getElementById('cover').style.cssText = "opacity:0;-webkit-opacity:0;filter:alpha(opacity=0);";
    var a = setInterval(function() {
        draw();
        var top = parseFloat(document.getElementById('loadImgCover').style.top);
        document.getElementById('loadImgCover').style.top = top - 1 + "%";
        if (top <= 5) {
            clearInterval(a);
            document.getElementById('loadImgCover').style.top = "5%";
            document.getElementById('loadImgCover').style.opacity = 0;
        }
    }, 20);
})();
//幻灯片效果
function getUsefulList(ele, attribute) {
    var list = [];
    var j = 0;
    for (var i = 0; i < ele.length; i++) {
        if (ele[i].getAttribute(attribute)) {
            list[j] = ele[i];
            j++;
        }
    }
    return list;
}

function getClassList(boxList, className) {
    var result = [];
    var j = 0;
    for (var i = 0; i < boxList.length; i++) {
        if (boxList[i].classList.contains(className)) {
            result[j] = boxList[i];
            j++;
        }
    }
    return result;
}

function del_ff(elem) {
    var elem_child = elem.childNodes;
    for (var i = 0; i < elem_child.length; i++) {
        if (elem_child[i].nodeName === "#text" && !/\s/.test(elem_child.nodeValue)) {
            elem.removeChild(elem_child[i]);
        }
    }
    return elem;
}

function getAttrEle(boxList, attr, value) {
    for (var i = 0; i < boxList.length; i++) {
        if (boxList[i].getAttribute(attr) === value) {
            return boxList[i];
        }
    }
}
var allIconList = document.getElementById('listContainer').getElementsByTagName('li');
var mainBox = document.getElementsByClassName('mainBox');
var iconList = getUsefulList(allIconList, "val");
//介绍
var intrButtonList = document.getElementById('intrButton').getElementsByTagName('a');
var intrImgList = document.getElementById('intrImg').getElementsByTagName('div');
var intrTextList = getUsefulList(document.getElementById('intrRight').getElementsByTagName('div'), "val");
//组别
var groupImgContainer = document.getElementById('groupImgContainer');
var groupButtonList = getUsefulList(document.getElementById('groupButton').getElementsByTagName('a'), "check");
var groupIntrList = document.getElementById('groupIntr').getElementsByTagName('li');
var groupUp = document.getElementById('groupArrowUp');
var groupDown = document.getElementById('groupArrowDown');
//大事件
var eventYear = ['2000', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'];
var yearList = document.getElementById('year').getElementsByTagName('div');
var yearTop = getAttrEle(yearList, 'value', 'top');
var yearCenter = getAttrEle(yearList, 'value', 'center');
var yearBottom = getAttrEle(yearList, 'value', 'bottom');
var eventButtonList = document.getElementById('eventButton').getElementsByTagName('a');
var eventContentList = del_ff(document.getElementById('eventRight')).childNodes;
//作品
var gallery = document.getElementById('gallery');
var worksImgWrap = document.getElementById('workImg');
var worksIntrList = document.getElementById('worksIntr').getElementsByTagName('li');
var worksIntrTitle = document.getElementById('worksIntrTitleList');
var worksIntrTitleList = worksIntrTitle.getElementsByTagName('li');
var worksButtonList = getUsefulList(document.getElementById('workButton').getElementsByTagName('a'), "check");
var prevWork = document.getElementById('workPrevArrow');
var nextWork = document.getElementById('workNextArrow');
worksIntrTitle.style.width = worksIntrTitleList[0].offsetWidth + 20 + "px";
//加入及联系
var radioList = getClassList(document.forms.join.getElementsByTagName('li'), "radio-wrap");
var joinWrap = document.getElementById('joinCon');
var joinButtonList = document.getElementById('joinButton').getElementsByTagName('a');
var animated = false;

function scrollShow(ele) {
    if (parseFloat(ele.style.top) !== 0) {
        ele.style.cssText += "top:0%;";
    }
}

function scrollHide(ele) {
    if (parseFloat(ele.style.top) === 0) {
        ele.style.cssText += "top:-100%;";
    }
}

function changeSection(boxList, iconList) {
    for (var k = 0; k < iconList.length; k++) {
        var activeIndex;
        iconList[k].onclick = (function(k) {
            return function() {
                var i;
                for (i = 0; i < boxList.length; i++) {
                    if (boxList[i].getAttribute("active") === "true") {
                        activeIndex = i;
                    }
                }
                if (del_ff(iconList[k]).firstChild.getAttribute("isselected") === "false") {
                    if (k < activeIndex) {
                        for (i = k; i < activeIndex; i++) {
                            scrollShow(boxList[i]);
                        }
                        boxList[activeIndex].setAttribute("active", "false");
                        boxList[k].setAttribute("active", "true");
                        iconList[k].firstChild.setAttribute("isselected", "true");
                        iconList[activeIndex].firstChild.setAttribute("isselected", "false");
                    } else {
                        for (i = activeIndex; i < k; i++) {
                            scrollHide(boxList[i]);
                        }
                        boxList[activeIndex].setAttribute("active", "false");
                        boxList[k].setAttribute("active", "true");
                        del_ff(iconList[k]).firstChild.setAttribute("isselected", "true");
                        del_ff(iconList[activeIndex]).firstChild.setAttribute("isselected", "false");
                    }
                    judge(activeIndex, k);
                    activeIndex = k;
                }
            }
        })(k);
    }
}

function changeSectionTwo(boxList1, boxList2, buttonList) {
    for (var k = 0; k < buttonList.length; k++) {
        var activeIndex;
        buttonList[k].onclick = (function(k) {
            return function() {
                var i;
                for (i = 0; i < buttonList.length; i++) {
                    if (buttonList[i].getAttribute("check") === "true") {
                        activeIndex = i;
                    }
                }
                if (buttonList[k].getAttribute("check") === "false") {
                    if (k === 1) {
                        for (i = 0; i < boxList1.length; i++) {
                            boxList1[i].setAttribute("aspect", "fan");
                        }
                    } else {
                        for (i = 0; i < boxList1.length; i++) {
                            boxList1[i].setAttribute("aspect", "zheng");
                        }
                    }
                    boxList2[activeIndex].style.cssText += "opacity:0;-webkit-opacity:0;-moz-opacity: 0.5;-khtml-opacity: 0.5;filter:alpha(opacity=50);";
                    boxList2[k].style.cssText += "opacity:1;-webkit-opacity:1;-moz-opacity: 1;-khtml-opacity: 1;filter:alpha(opacity=100);";
                    buttonList[k].setAttribute("check", "true");
                    buttonList[activeIndex].setAttribute("check", "false");
                    activeIndex = k;
                }
            }
        })(k);
    }
}

function changeSectionThree(box, boxList, buttonList) {
    for (var k = 0; k < buttonList.length; k++) {
        var activeIndex;
        buttonList[k].onclick = (function(k) {
            return function() {
                var i;
                for (i = 0; i < buttonList.length; i++) {
                    if (buttonList[i].getAttribute("check") === "true") {
                        activeIndex = i;
                    }
                }
                if (buttonList[k].getAttribute("check") === "false") {
                    box.style.cssText += "top:" + -k * 100 + "%";
                    buttonList[k].setAttribute("check", "true");
                    buttonList[activeIndex].setAttribute("check", "false");
                    boxList[activeIndex].style.cssText = "opacity:0;-webkit-opacity:0;filter:alpha(opacity=0);";
                    boxList[k].style.cssText = "opacity:1;-webkit-opacity:1;filter:alpha(opacity=100);";
                    activeIndex = k;
                }
            }
        })(k);
    }
}

function judgeYear(activeIndex) {
    if (activeIndex === 0) {
        yearTop.getElementsByTagName('span')[0].innerHTML = eventYear[eventYear.length - 1];
    } else {
        yearTop.getElementsByTagName('span')[0].innerHTML = eventYear[activeIndex - 1];
    }
    yearCenter.getElementsByTagName('span')[0].innerHTML = eventYear[activeIndex];
    yearBottom.getElementsByTagName('span')[0].innerHTML = eventYear[activeIndex + 1];
}

function changeYear(prevIndex, activeIndex) {
    yearTop = getAttrEle(yearList, 'value', 'top');
    yearCenter = getAttrEle(yearList, 'value', 'center');
    yearBottom = getAttrEle(yearList, 'value', 'bottom');
    var a, b;
    if (prevIndex < activeIndex) {
        yearTop.style.cssText += "top:100%;";
        a = setInterval(function() {
            yearCenter.style.top = parseFloat(yearCenter.style.top) - 1.5 + "%";
            if (parseFloat(yearCenter.style.top) <= 0) {
                clearInterval(a);
                yearCenter.style.top = "0%";
            }
        }, 20);
        setTimeout(function() {
            judgeYear(activeIndex - 1);
            b = setInterval(function() {
                yearBottom.style.top = parseFloat(yearBottom.style.top) - 1.5 + "%";
                if (parseFloat(yearBottom.style.top) <= 50) {
                    clearInterval(b);
                    yearBottom.style.top = "50%";
                }
            }, 20);
        }, 800);
        yearTop.setAttribute('value', "bottom");
        yearCenter.setAttribute('value', 'top');
        yearBottom.setAttribute('value', 'center');
    } else {
        yearBottom.style.cssText += "top:0%;";
        a = setInterval(function() {
            yearCenter.style.top = parseFloat(yearCenter.style.top) + 1.5 + "%";
            if (parseFloat(yearCenter.style.top) >= 100) {
                clearInterval(a);
                yearCenter.style.top = "100%";
            }
        }, 20);
        setTimeout(function() {
            judgeYear(activeIndex + 1);
            b = setInterval(function() {
                yearTop.style.top = parseFloat(yearTop.style.top) + 1.5 + "%";
                if (parseFloat(yearTop.style.top) >= 50) {
                    clearInterval(b);
                    yearTop.style.top = "50%";
                }
            }, 20);
        }, 1000);
        yearBottom.setAttribute('value', 'top');
        yearTop.setAttribute('value', "center");
        yearCenter.setAttribute('value', 'bottom');
    }
}

function changeEvent(prevIndex, activeIndex) {
    var prevIndexList = del_ff(eventContentList[prevIndex]).childNodes;
    var activeIndexList = del_ff(eventContentList[activeIndex]).childNodes;
    var i;
    for (i = 0; i < prevIndexList.length; i++) {
        prevIndexList[i].style.cssText = "opacity:0;-webkit-opacity:0;filter:alpha(opacity=0);";
    }
    setTimeout(function() {
        eventContentList[prevIndex].setAttribute('see', '0');
        eventContentList[activeIndex].setAttribute('see', '1');
    }, 600);
    setTimeout(function() {
        for (i = 0; i < activeIndexList.length; i++) {
            activeIndexList[i].style.cssText = "opacity:1;-webkit-opacity:1;filter:alpha(opacity=100);";
        }
    }, 800);
}

function changeSectionFour(buttonList) {
    for (var k = 0; k < buttonList.length; k++) {
        var activeIndex;
        buttonList[k].onclick = (function(k) {
            return function() {
                var i;
                for (i = 0; i < buttonList.length; i++) {
                    if (buttonList[i].getAttribute("check") === "true") {
                        activeIndex = i;
                    }
                }
                if (buttonList[k].getAttribute("check") === "false") {
                    changeYear(activeIndex, k);
                    changeEvent(activeIndex, k);
                    buttonList[k].setAttribute("check", "true");
                    buttonList[activeIndex].setAttribute("check", "false");
                    activeIndex = k;
                }
            }
        })(k);
    }
}

function changeWork(prevIndex, activeIndex) {
    worksIntrList[prevIndex].style.cssText = "opacity:0;-webkit-opacity:0;filter:alpha(opacity=0);";
    worksIntrTitleList[prevIndex].style.cssText = "opacity:0;-webkit-opacity:0;filter:alpha(opacity=0);";
    worksImgWrap.style.left = -activeIndex * 100 + "%";
    gallery.style.left = -activeIndex * 500 + "px";
    worksIntrTitle.style.width = worksIntrTitleList[activeIndex].offsetWidth + 20 + "px";
    worksIntrTitle.nextElementSibling.className = "rouleau-shake";
    worksIntrTitle.previousElementSibling.className = "rouleau-shake";
    setTimeout(function() {
        worksIntrTitle.nextElementSibling.className = "";
        worksIntrTitle.previousElementSibling.className = "";
    }, 1500);
    worksIntrList[activeIndex].style.cssText = "opacity:1;-webkit-opacity:1;filter:alpha(opacity=100);";
    worksIntrTitleList[activeIndex].style.cssText = "opacity:1;-webkit-opacity:1;filter:alpha(opacity=100);";
}

function changeSectionFive(buttonList) {
    for (var k = 0; k < buttonList.length; k++) {
        var activeIndex;
        buttonList[k].onclick = (function(k) {
            return function() {
                for (var i = 0; i < buttonList.length; i++) {
                    if (buttonList[i].getAttribute("check") === "true") {
                        activeIndex = i;
                    }
                }
                if (buttonList[k].getAttribute("check") === "false") {
                    changeWork(activeIndex, k);
                    buttonList[k].setAttribute("check", "true");
                    buttonList[activeIndex].setAttribute("check", "false");
                    activeIndex = k;
                }
            }
        })(k);
    }
}

function getSameAttrList(ele, attr, allList) {
    var result = [];
    var i, j = 0;
    for (i = 0; i < allList.length; i++) {
        if (allList[i].getAttribute(attr) === ele.getAttribute(attr)) {
            result[j] = allList[i];
            j++;
        }
    }
    return result;
}

function changeRadio(radioList) {
    for (var k = 0; k < radioList.length; k++) {
        var activeIndex;
        radioList[k].onclick = (function(k) {
            return function() {
                if (radioList[k].getAttribute("checked") !== "true") {
                    var sameAttrList = getSameAttrList(radioList[k], "name", radioList);
                    for (var i = 0; i < sameAttrList.length; i++) {
                        if (radioList[k].getAttribute("checked") !== "true" && sameAttrList[i].getAttribute("checked") === "true") {
                            radioList[k].setAttribute("checked", "true");
                            sameAttrList[i].setAttribute("checked", "");
                            del_ff(radioList[k]).childNodes[0].setAttribute("checked", "true");
                            del_ff(radioList[k]).childNodes[1].setAttribute("checked", "true");
                            del_ff(sameAttrList[i]).childNodes[0].setAttribute("checked", "");
                            del_ff(sameAttrList[i]).childNodes[1].setAttribute("checked", "");
                        }
                    }
                }
            }
        })(k);
    }
}

function changeSectionSix(buttonList) {
    for (var k = 0; k < buttonList.length; k++) {
        var activeIndex;
        buttonList[k].onclick = (function(k) {
            return function() {
                for (var i = 0; i < buttonList.length; i++) {
                    if (buttonList[i].getAttribute("check") === "true") {
                        activeIndex = i;
                    }
                }
                if (buttonList[k].getAttribute("check") === "false") {
                    joinWrap.style.cssText += "top:" + (-k * 100) + "%";
                    buttonList[k].setAttribute("check", "true");
                    buttonList[activeIndex].setAttribute("check", "false");
                    activeIndex = k;
                }
            }
        })(k);
    }
}

function nextSection() {
    var activeIndex;
    for (var i = 0; i < mainBox.length; i++) {
        if (mainBox[i].getAttribute("active") === "true") {
            activeIndex = i;
        }
    }
    if (activeIndex < mainBox.length - 1) {
        scrollHide(mainBox[activeIndex]);
        mainBox[activeIndex].setAttribute("active", "false");
        mainBox[activeIndex + 1].setAttribute("active", "true");
        del_ff(iconList[activeIndex + 1]).firstChild.setAttribute("isselected", "true");
        del_ff(iconList[activeIndex]).firstChild.setAttribute("isselected", "false");
        judge(activeIndex, activeIndex + 1);
    }
}

function prevSection() {
    var activeIndex;
    for (var i = 0; i < mainBox.length; i++) {
        if (mainBox[i].getAttribute("active") === "true") {
            activeIndex = i;
        }
    }
    if (activeIndex > 0) {
        scrollShow(mainBox[activeIndex - 1]);
        mainBox[activeIndex].setAttribute("active", "false");
        mainBox[activeIndex - 1].setAttribute("active", "true");
        del_ff(iconList[activeIndex - 1]).firstChild.setAttribute("isselected", "true");
        del_ff(iconList[activeIndex]).firstChild.setAttribute("isselected", "false");
        judge(activeIndex, activeIndex - 1);
    }
}

function scrollSection(event) {
    event = event || window.event;
    var delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
    var curryKey = event.keyCode || event.which || event.charCode;
    if (!animated) {
        if (delta) {
            if (delta > 0) {
                prevSection();
            } else if (delta < 0) {
                nextSection();
            }
        } else if (curryKey) {
            switch (curryKey) {
                case 40:
                    nextSection();
                    break;
                case 38:
                    prevSection();
                    break;
                default:
                    break;
            }
        }
        animated = true;
        setTimeout(function() {
            animated = false;
        }, 500);
    }
}

function prevSectionTwo() {
    var activeIndex;
    var i;
    for (i = 0; i < intrButtonList.length; i++) {
        if (intrButtonList[i].getAttribute("check") === "true") {
            activeIndex = i;
        }
    }
    if (activeIndex > 0) {
        if (activeIndex === 0) {
            for (i = 0; i < intrImgList.length; i++) {
                intrImgList[i].setAttribute("aspect", "fan");
            }
        } else {
            for (i = 0; i < intrImgList.length; i++) {
                intrImgList[i].setAttribute("aspect", "zheng");
            }
        }
        intrTextList[activeIndex].style.cssText += "opacity:0;-webkit-opacity:0;-moz-opacity: 0.5;-khtml-opacity: 0.5;filter:alpha(opacity=50);";
        intrTextList[activeIndex - 1].style.cssText += "opacity:1;-webkit-opacity:1;-moz-opacity: 1;-khtml-opacity: 1;filter:alpha(opacity=100);";
        intrButtonList[activeIndex - 1].setAttribute("check", "true");
        intrButtonList[activeIndex].setAttribute("check", "false");
    } else {
        removeScrollEvent(document.body, scrollSectionTwo, false);
        prevSection();
        addScrollEvent(document.body, scrollSection, false);
    }
}

function nextSectionTwo() {
    var activeIndex;
    var i;
    for (i = 0; i < intrButtonList.length; i++) {
        if (intrButtonList[i].getAttribute("check") === "true") {
            activeIndex = i;
        }
    }
    if (activeIndex < intrButtonList.length - 1) {
        nextStatus = false;
        if (activeIndex === 0) {
            for (i = 0; i < intrImgList.length; i++) {
                intrImgList[i].setAttribute("aspect", "fan");
            }
        } else {
            for (i = 0; i < intrImgList.length; i++) {
                intrImgList[i].setAttribute("aspect", "zheng");
            }
        }
        intrTextList[activeIndex].style.cssText += "opacity:0;-webkit-opacity:0;-moz-opacity: 0.5;-khtml-opacity: 0.5;filter:alpha(opacity=50);";
        intrTextList[activeIndex + 1].style.cssText += "opacity:1;-webkit-opacity:1;-moz-opacity: 1;-khtml-opacity: 1;filter:alpha(opacity=100);";
        intrButtonList[activeIndex + 1].setAttribute("check", "true");
        intrButtonList[activeIndex].setAttribute("check", "false");
    } else {
        removeScrollEvent(document.body, scrollSectionTwo, false);
        nextSection();
        addScrollEvent(document.body, scrollSectionThree, false);
    }
}

function scrollSectionTwo(event) {
    event = event || window.event;
    var delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
    var curryKey = event.keyCode || event.which || event.charCode;
    if (!animated) {
        if (delta) {
            if (delta > 0) {
                prevSectionTwo();
            } else if (delta < 0) {
                nextSectionTwo();
            }
        } else if (curryKey) {
            switch (curryKey) {
                case 40:
                    nextSectionTwo();
                    break;
                case 38:
                    prevSectionTwo();
                    break;
                default:
                    break;
            }
        }
        animated = true;
        setTimeout(function() {
            animated = false;
        }, 1000);
    }
}

function nextSectionThree() {
    var activeIndex;
    var i;
    for (i = 0; i < groupButtonList.length; i++) {
        if (groupButtonList[i].getAttribute("check") === "true") {
            activeIndex = i;
        }
    }
    if (activeIndex < groupButtonList.length - 1) {
        groupImgContainer.style.cssText += "top:" + -(activeIndex + 1) * 100 + "%";
        groupButtonList[activeIndex + 1].setAttribute("check", "true");
        groupButtonList[activeIndex].setAttribute("check", "false");
        groupIntrList[activeIndex].style.cssText = "opacity:0;-webkit-opacity:0;-moz-opacity: 0;-khtml-opacity: 0;filter:alpha(opacity=0);";
        groupIntrList[activeIndex + 1].style.cssText = "opacity:1;-webkit-opacity:1;-moz-opacity: 1;-khtml-opacity: 1;filter:alpha(opacity=100);";
    } else {
        removeScrollEvent(document.body, scrollSectionThree, false);
        nextSection();
        addScrollEvent(document.body, scrollSectionFour, false)
    }
}

function prevSectionThree() {
    var activeIndex;
    var i;
    for (i = 0; i < groupButtonList.length; i++) {
        if (groupButtonList[i].getAttribute("check") === "true") {
            activeIndex = i;
        }
    }
    if (activeIndex > 0) {
        groupImgContainer.style.cssText += "top:" + -(activeIndex - 1) * 100 + "%";
        groupButtonList[activeIndex - 1].setAttribute("check", "true");
        groupButtonList[activeIndex].setAttribute("check", "false");
        groupIntrList[activeIndex].style.cssText = "opacity:0;-webkit-opacity:0;-moz-opacity: 0;-khtml-opacity: 0;filter:alpha(opacity=0);";
        groupIntrList[activeIndex - 1].style.cssText = "opacity:1;-webkit-opacity:1;-moz-opacity: 1;-khtml-opacity: 1;filter:alpha(opacity=100);";
    } else {
        removeScrollEvent(document.body, scrollSectionThree, false);
        prevSection(mainBox, iconList);
        addScrollEvent(document.body, scrollSectionTwo, false);
    }
}

function scrollSectionThree(event) {
    event = event || window.event;
    var delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
    var curryKey = event.keyCode || event.which || event.charCode;
    if (!animated) {
        if (delta) {
            if (delta > 0) {
                prevSectionThree();
            } else if (delta < 0) {
                nextSectionThree();
            }
        } else if (curryKey) {
            switch (curryKey) {
                case 40:
                    nextSectionThree();
                    break;
                case 38:
                    prevSectionThree();
                    break;
                default:
                    break;
            }
        }
        animated = true;
        setTimeout(function() {
            animated = false;
        }, 1000);
    }
}

function nextSectionFour() {
    var activeIndex;
    var i;
    for (i = 0; i < eventButtonList.length; i++) {
        if (eventButtonList[i].getAttribute("check") === "true") {
            activeIndex = i;
        }
    }
    if (activeIndex < eventButtonList.length - 1) {
        changeYear(activeIndex, activeIndex + 1);
        changeEvent(activeIndex, activeIndex + 1);
        eventButtonList[activeIndex + 1].setAttribute("check", "true");
        eventButtonList[activeIndex].setAttribute("check", "false");
    } else {
        removeScrollEvent(document.body, scrollSectionFour, false);
        nextSection();
        addScrollEvent(document.body, scrollSectionFive, false);
    }
}

function prevSectionFour() {
    var activeIndex;
    var i;
    for (i = 0; i < eventButtonList.length; i++) {
        if (eventButtonList[i].getAttribute("check") === "true") {
            activeIndex = i;
        }
    }
    if (activeIndex > 0) {
        changeYear(activeIndex, activeIndex - 1);
        changeEvent(activeIndex, activeIndex - 1);
        eventButtonList[activeIndex - 1].setAttribute("check", "true");
        eventButtonList[activeIndex].setAttribute("check", "false");
    } else {
        removeScrollEvent(document.body, scrollSectionFour, false);
        prevSection();
        addScrollEvent(document.body, scrollSectionThree, false);
    }
}

function scrollSectionFour(event) {
    event = event || window.event;
    var delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
    var curryKey = event.keyCode || event.which || event.charCode;
    if (!animated) {
        if (delta) {
            if (delta > 0) {
                prevSectionFour();
            } else if (delta < 0) {
                nextSectionFour();
            }
        } else if (curryKey) {
            switch (curryKey) {
                case 40:
                    nextSectionFour();
                    break;
                case 38:
                    prevSectionFour();
                    break;
                default:
                    break;
            }
        }
        animated = true;
        setTimeout(function() {
            animated = false;
        }, 1500);
    }
}

function nextSectionFive() {
    var activeIndex, i;
    for (i = 0; i < worksButtonList.length; i++) {
        if (worksButtonList[i].getAttribute("check") === "true") {
            activeIndex = i;
        }
    }
    if (activeIndex < worksButtonList.length - 1) {
        changeWork(activeIndex, activeIndex + 1);
        worksButtonList[activeIndex + 1].setAttribute("check", "true");
        worksButtonList[activeIndex].setAttribute("check", "false");
    } else {
        removeScrollEvent(document.body, scrollSectionFive, false);
        nextSection();
        addScrollEvent(document.body, scrollSectionSix, false);
    }
}

function prevSectionFive() {
    var activeIndex;
    var i;
    for (i = 0; i < worksButtonList.length; i++) {
        if (worksButtonList[i].getAttribute("check") === "true") {
            activeIndex = i;
        }
    }
    if (activeIndex > 0) {
        changeWork(activeIndex, activeIndex - 1);
        worksButtonList[activeIndex - 1].setAttribute("check", "true");
        worksButtonList[activeIndex].setAttribute("check", "false");
    } else {
        removeScrollEvent(document.body, scrollSectionFive, false);
        prevSection();
        addScrollEvent(document.body, scrollSectionFour, false);
    }
}

function scrollSectionFive(event) {
    event = event || window.event;
    var delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
    var curryKey = event.keyCode || event.which || event.charCode;
    if (!animated) {
        if (delta) {
            if (delta > 0) {
                prevSectionFive();
            } else if (delta < 0) {
                nextSectionFive();
            }
        } else if (curryKey) {
            switch (curryKey) {
                case 39:
                    nextSectionFive();
                    break;
                case 37:
                    prevSectionFive();
                    break;
                default:
                    break;
            }
        }
        animated = true;
        setTimeout(function() {
            animated = false;
        }, 1500);
    }
}

function nextSectionSix() {
    var activeIndex;
    for (var i = 0; i < joinButtonList.length; i++) {
        if (joinButtonList[i].getAttribute("check") === "true") {
            activeIndex = i;
        }
    }
    if (activeIndex < joinButtonList.length - 1) {
        joinWrap.style.cssText += "top:" + (-(activeIndex + 1) * 100) + "%";
        joinButtonList[activeIndex + 1].setAttribute("check", "true");
        joinButtonList[activeIndex].setAttribute("check", "false");
    }
}

function prevSectionSix() {
    var activeIndex;
    for (var i = 0; i < joinButtonList.length; i++) {
        if (joinButtonList[i].getAttribute("check") === "true") {
            activeIndex = i;
        }
    }
    if (activeIndex > 0) {
        joinWrap.style.cssText += "top:" + (-(activeIndex - 1) * 100) + "%";
        joinButtonList[activeIndex - 1].setAttribute("check", "true");
        joinButtonList[activeIndex].setAttribute("check", "false");
    } else {
        removeScrollEvent(document.body, scrollSectionSix, false);
        prevSection();
        addScrollEvent(document.body, scrollSectionFive, false);
    }
}

function scrollSectionSix(event) {
    event = event || window.event;
    var delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
    var curryKey = event.keyCode || event.which || event.charCode;
    if (!animated) {
        if (delta) {
            if (delta > 0) {
                prevSectionSix();
            } else if (delta < 0) {
                nextSectionSix();
            }
        } else if (curryKey) {
            switch (curryKey) {
                case 40:
                    nextSectionSix();
                    break;
                case 38:
                    prevSectionSix();
                    break;
                default:
                    break;
            }
        }
        animated = true;
        setTimeout(function() {
            animated = false;
        }, 800);
    }
}

function judge(prevIndex, activeIndex) {
    removeScrollEvent(document.body, scrollSection, false);
    removeEvent(document, "keydown", scrollSection, false);
    switch (prevIndex) {
        case 0:
            break;
        case 1:
            removeScrollEvent(document.body, scrollSectionTwo, false);
            removeEvent(document, "keydown", scrollSectionTwo, false);
            break;
        case 2:
            removeScrollEvent(document.body, scrollSectionThree, false);
            removeEvent(document, "keydown", scrollSectionThree, false);
            removeEvent(groupUp, "click", prevSectionThree, false);
            removeEvent(groupDown, "click", nextSectionThree, false);
            break;
        case 3:
            removeScrollEvent(document.body, scrollSectionFour, false);
            removeEvent(document, "keydown", scrollSectionFour, false);
            break;
        case 4:
            removeEvent(prevWork, "click", prevSectionFive, false);
            removeEvent(nextWork, "click", nextSectionFive, false);
            removeScrollEvent(document.body, scrollSectionFive, false);
            removeEvent(document, "keydown", scrollSectionFive, false);
            break;
        case 5:
            removeEvent(document, "keydown", scrollSectionSix, false);
            removeScrollEvent(document.body, scrollSectionSix, false);
            break;
        default:
            break;
    }
    switch (activeIndex) {
        case 0:
            addScrollEvent(document.body, scrollSection, false);
            addEvent(document, "keydown", scrollSection, false);
            break;
        case 1:
            addScrollEvent(document.body, scrollSectionTwo, false);
            addEvent(document, "keydown", scrollSectionTwo, false);
            changeSectionTwo(intrImgList, intrTextList, intrButtonList);
            break;
        case 2:
            addScrollEvent(document.body, scrollSectionThree, false);
            addEvent(document, "keydown", scrollSectionThree, false);
            changeSectionThree(groupImgContainer, groupIntrList, groupButtonList);
            addEvent(groupUp, "click", prevSectionThree, false);
            addEvent(groupDown, "click", nextSectionThree, false);
            break;
        case 3:
            judgeYear(0);
            changeSectionFour(eventButtonList);
            addEvent(document, "keydown", scrollSectionFour, false);
            addScrollEvent(document, scrollSectionFour, false);
            break;
        case 4:
            changeSectionFive(worksButtonList);
            addEvent(prevWork, "click", prevSectionFive, false);
            addEvent(nextWork, "click", nextSectionFive, false);
            addScrollEvent(document.body, scrollSectionFive, false);
            addEvent(document, "keydown", scrollSectionFive, false);
            break;
        case 5:
            changeRadio(radioList);
            changeSectionSix(joinButtonList);
            addEvent(document, "keydown", scrollSectionSix, false);
            addScrollEvent(document.body, scrollSectionSix, false);
            break;
        default:
            break;
    }
}

function changeWidth() {
    var i;
    var activeWidth = window.innerWidth;
    document.body.style.height = window.innerHeight + "px";
    if (activeWidth >= 920) {
        for (i = 0; i < eventContentList.length; i++) {
            eventContentList[i].style.height = activeWidth * 0.367 + "px";
        }
    } else {
        for (i = 0; i < eventContentList.length; i++) {
            eventContentList[i].style.height = 920 * 0.367 + "px";
        }
    }
    if (activeWidth <= 1164) {
        console.log(activeWidth);
        document.getElementById('backgroundImgContainer').style.width = "1164px";
        document.getElementById('intrImg').style.height = 1164 * 0.432 + "px";
        document.getElementById('loadImgContainer').style.width = "1164px";
        document.getElementById('loadImgContainer').style.height = 1164 * 0.5625 + "px";
    } else {
        document.getElementById('backgroundImgContainer').style.width = "100%";
        document.getElementById('loadImgContainer').style.width = "100%";
        document.getElementById('loadImgContainer').style.height = activeWidth * 0.5625 + "px";
    }
}
addEvent(window, "resize", changeWidth, false);
changeSection(mainBox, iconList);
addScrollEvent(document.body, scrollSection, false);
addEvent(document, "keydown", scrollSection, false);
for (var i = 0; i < eventContentList.length; i++) {
    eventContentList[i].style.height = width * 0.367 + "px";
}
// start click event of burger icon (show navbar)
function navIconEvent(){
    let navbar = document.getElementById("nav-bar");
    let navIcon = document.getElementById("nav-icon");
    window.addEventListener("click", (e) => {
        if(e.target === navIcon){
            navbar.classList.toggle("hidden");
        }
        if(e.target !== navbar && e.target !== navIcon){
            navbar.classList.add("hidden");
        }
    });
}
navIconEvent();
// end

// start click event of gear icon (show settings)
let gear = document.getElementById("gear");
function gearIconEvent(){
    let setBox = document.querySelector(".settings > div:first-child");
    if(gear.parentElement.parentElement.classList.contains("open")){
        setBox.parentElement.style.cssText = `left: 0px;`;
    }else{
        setBox.parentElement.style.cssText = `left: ${-parseFloat(getComputedStyle(setBox).width)}px;`;
    }
}
gearIconEvent();
gear.parentElement.addEventListener("click", () => {
    gear.classList.toggle("rotate-gear");
    gear.parentElement.parentElement.classList.toggle("open");
    gearIconEvent();
});
// end

// start bullets click event
let bullets = [...document.querySelector(".bullets").children];
bullets.forEach((e)=>{
    e.onclick = ()=>{
        e.children[0].click();
    };
});
// end

// start random landing background-images
let landing = document.getElementById("landing");
let backgroundImagesLCH = ["imgs/01.jpg", "imgs/02.jpg", "imgs/03.jpg", "imgs/04.jpg", "imgs/05.jpg", "imgs/06.png", "imgs/07.jpg", "imgs/08.jpg", "imgs/09.jpg", "imgs/10.jpg"];
const backgroundImagesLC = ["imgs/01.jpg", "imgs/02.jpg", "imgs/03.jpg", "imgs/04.jpg", "imgs/05.jpg", "imgs/06.png", "imgs/07.jpg", "imgs/08.jpg", "imgs/09.jpg", "imgs/10.jpg"];
let randomBck;
let abdo = setInterval(()=>{
    randomBck = backgroundImagesLCH[Math.trunc(Math.random() * backgroundImagesLCH.length)];
    landing.style.cssText = `background-image: url(${randomBck})`;
}, 10000);
// end

// start settings options
let colorsList = document.querySelectorAll(".settings > div > .colors > ul > li");
let randomImages = document.querySelectorAll(".bck > .yes-no-btns > p");
let showBullets = document.querySelectorAll(".show-bullets > .yes-no-btns > p");
let resetBtn = document.getElementById("reset");
let mainOptions = {
    color: colorsList[0].dataset.color,
    randomImages: "true", 
    showBullets: "true",
    img: backgroundImagesLCH,
};
Object.prototype.update = function(prop, val){
    this[prop] = val;
}

function receiveSettingsChanges(e, typeOfdataset, det){
    e.addEventListener("click", () => {
        mainOptions.update(e.dataset.type, e.dataset[typeOfdataset]);
        localStorage.setItem("settings", JSON.stringify(mainOptions));
        applyChangesToSettingsBox(det);
    });
}

function applyChangesToSettingsBox(det){
    if(det === "col" || det === "rst" || det === "first"){
        colorsList.forEach((e)=>{
            e.classList.remove("selected-color");
            if(mainOptions.color === e.dataset.color){
                e.classList.add("selected-color")
            }
        });
    }if(det === "img" || det === "rst" || det === "first"){
        randomImages.forEach((e)=>{
            e.classList.remove("not-selected-choice");
            if(mainOptions.randomImages === "true"){
                randomImages[1].classList.add("not-selected-choice");
            }else{
                randomImages[0].classList.add("not-selected-choice");
            }
        });
    }if(det === "bul" || det === "rst" || det === "first"){
        showBullets.forEach((e)=>{
            e.classList.remove("not-selected-choice");
            if(mainOptions.showBullets === "true"){
                showBullets[1].classList.add("not-selected-choice");
            }else{
                showBullets[0].classList.add("not-selected-choice");
            }
        });
    }
    applyChangesToPage(det);
}

function applyChangesToPage(det){
    if(det === "col" || det === "rst" || det === "first"){
        document.querySelector(":root").style.cssText = `--col: ${mainOptions.color}`;
    }if(det === "img" || det === "rst" || det === "first"){
        if(mainOptions.randomImages === "true"){
            mainOptions.img = backgroundImagesLC;
            localStorage.setItem("settings", JSON.stringify(mainOptions)); 
        }else{
            if(mainOptions.img.length > 1){
                mainOptions.img = [randomBck];
                localStorage.setItem("settings", JSON.stringify(mainOptions)); 
            }
        }
        backgroundImagesLCH = mainOptions.img;
        randomBck = backgroundImagesLCH[Math.trunc(Math.random() * backgroundImagesLCH.length)]
        landing.style.cssText = `background-image: url(${randomBck})`;
        
    }if(det === "bul" || det === "rst" || det === "first"){
        if(mainOptions.showBullets === "true"){
            document.querySelector(".bullets").classList.remove("hidden");
        }else{
            document.querySelector(".bullets").classList.add("hidden");
        }
    }
}

// start the most important part which its role when reload the page
if(localStorage.length){
    mainOptions = JSON.parse(localStorage.getItem("settings"));
} else{
    localStorage.setItem("settings", JSON.stringify(mainOptions));   
}
applyChangesToSettingsBox("first");
// end the most important part

colorsList.forEach((e)=>{
    e.style.cssText = `background-color: ${e.dataset.color}`;
    receiveSettingsChanges(e, "color", "col");
});

randomImages.forEach((e)=>{
    receiveSettingsChanges(e, "choice", "img");
});

showBullets.forEach((e)=>{
    receiveSettingsChanges(e, "choice", "bul");
});

resetBtn.addEventListener("click", function(){
    mainOptions.color = colorsList[0].dataset.color;
    mainOptions.randomImages = "true"; 
    mainOptions.showBullets = "true";
    localStorage.setItem("settings", JSON.stringify(mainOptions));
    applyChangesToSettingsBox("rst")
});
// end

// start create gallery images and features-boxes in a fast way
let featsContainer = document.querySelector(".features > .container");
let gallery = document.querySelector("#gallery > .container");
function creatImg(i, parent){
    let featImgs = ["imgs/programming.svg", "imgs/advertising.svg", "imgs/hosting-icon.svg", "imgs/mobile-app.svg", "imgs/graphic-design.svg", "imgs/web-design.svg"];
    let ele = document.createElement("img");
    if(parent !== gallery){
        ele.src = featImgs[i];
        return ele;
    }
    ele.src = backgroundImagesLC[i];
    parent.append(ele);
}
function createFeatBox(i){
    let featDiscs = ["Development", "Marketing", "Hosting", "Mobile Apps Dev", "Cloud and Servers", "SEO"];
    let h3 = document.createElement("h3");
    h3.append(featDiscs[i]);
    let hr = document.createElement("hr");
    let p = document.createElement("p");
    p.append("We are professional marketeers, we will do anything you imagine in no time.");
    let ele = document.createElement("div");
    ele.append(creatImg(i), h3, hr, p);
    featsContainer.append(ele);
}
for(let i = 0; i < 10; i++){
    if(i < 6){
        createFeatBox(i);
    }
    creatImg(i, gallery);
}
// end

// start create gallery imgs pop up
[...gallery.children].forEach((e, i) => {
    e.onclick = () => {
        createPopUp(e.src, i);
    }
});
function createPopUp(source, order){
    // start overlay
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.style.cssText = `position: fixed; left: 0; top: 0; z-index: 10;`;
    document.body.append(overlay);
    // end

    // start components of pop up
    let title = document.createElement("h4");
    title.append(`Image ${order}`);
    title.style.cssText = `color: var(--col); font-size: 20px; font-weight: bold; text-align: center;`
    
    let img = document.createElement("img");
    img.src = source;
    img.style.cssText = `width: 100%; margin-top: 15px;`;
    
    let exit = document.createElement("div");
    exit.append("X");
    exit.style.cssText = `cursor: pointer; width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; border-radius: 50%; background-color: red; color: #fff; position: absolute; right: -25px; top: -25px;`;
    exit.onclick = () => {
        exit.parentElement.remove();
        overlay.remove();
    }

    let popUp = document.createElement("div");
    popUp.style.cssText = `padding: ${window.innerWidth > 767? 30: 10}px; background-color: #fff; width: ${window.innerWidth > 700 ? 600: window.innerWidth - 100}px; z-index: 20; position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);`;
    popUp.append(title, img, exit);
    document.body.append(popUp);
    // end
}
// end

// start parallax scrolling animation of the website

// start animate about section onscroll
function animateAbout(){
    let aboutEle = [...document.querySelectorAll(".about > .container > div")];
    if(scrollY >= document.querySelector(".about").offsetTop - 400){
        aboutEle.forEach((e) => {
            e.style.cssText = `transform: translateX(0); transition-duration: 2s;`;
        });
    } else{
        aboutEle.forEach((e, i) => {
            if(i === 0){
                e.style.cssText = `transform: translateX(-400%); transition-duration: 2s;`;
            } else{
                e.style.cssText = `transform: translateX(400%); transition-duration: 2s;`;
            }
        });
    }
}
window.addEventListener("scroll", animateAbout);
// end

// start animate skills bars width onscroll
function animateSkillsBars(){
    if(scrollY >= document.getElementById("skills").offsetTop - 300){
        skills.style.cssText = `--wid1: 70%; --wid2: 80%; --wid3: 90%; --skills-col: ${mainOptions.color};`;
    } else{
        skills.style.cssText = `--wid1: 0; --wid2: 0; --wid3: 0;`;
    }
}
addEventListener("scroll", animateSkillsBars);
// end

// start animate gallery section and features section onscroll
function animateTwoCards(container){
    if(scrollY >= container.parentElement.offsetTop - 200){
        [...container.children].forEach((e, i)=>{
            if(i % 2 === 0){
                e.style.cssText = `transform: translateX(0); transition-duration: 1.5s; transition-delay: 0.${i / 2}s;`;
            }else{
                e.style.cssText = `transform: translateX(0); transition-duration: 1.5s; transition-delay: 0.${(i - 1) / 2}s;`;
            }
        });
    }else{
        [...container.children].forEach((e, i)=>{
            if(i % 2 === 0){
                e.style.cssText = `transform: translateX(-400%); transition-duration: 2s;`;
            }else{
                e.style.cssText = `transform: translateX(400%); transition-duration: 2s;`;
            }
        });
    }
}
addEventListener("scroll", ()=>{
    if(innerWidth <= 767){
        animateTwoCards(gallery);
    }
});
addEventListener("scroll", ()=>{
    if(innerWidth <= 991){
        animateTwoCards(featsContainer);
    }
});
// end

// start animate timeline section onscroll
function animateTimeline(){
    let timelineEle = [...document.querySelectorAll(".timeline > .container > div:last-child > div")];
    if(scrollY >= document.querySelector(".timeline").offsetTop - 200){
        timelineEle.forEach((e, i) => {
            if(window.innerWidth <= 767){
                if(i === 1){
                    e.style.cssText = `transform: translateX(-15px); transition-duration: 1.5s;`;
                }else{
                    e.style.cssText = `transform: translateX(10px); transition-duration: 1.5s;`;
                }
            }else{
                e.style.cssText = `transform: translateX(0px); transition-duration: 1.5s;`;
            }
        });
    } else{
        timelineEle.forEach((e, i) => {
            if(i !== 1){
                e.style.cssText = `transform: translateX(-400%); transition-duration: 2s;`;
            } else{
                e.style.cssText = `transform: translateX(400%); transition-duration: 2s;`;
            }
        });
    }
} 
window.addEventListener("scroll", animateTimeline);
// end

// start animate testimonials section onscroll
function animateTestimonials(){
    let testimonials = document.querySelector(".testimonials > .container:last-child");
    if(scrollY >= testimonials.parentElement.offsetTop - 400){
        [...testimonials.children].forEach(()=>{
            [...testimonials.children][0].style.cssText = `transform: translateX(0); transition-duration: 2s;`;
            [...testimonials.children][2].style.cssText = `transform: translateX(0); transition-duration: 2s;`;
        });
    }else{
        [...testimonials.children].forEach(()=>{
            [...testimonials.children][0].style.cssText = `transform: translateX(-400%); transition-duration: 2s;`; 
            [...testimonials.children][2].style.cssText = `transform: translateX(400%); transition-duration: 2s;`; 
        });
    }
}
addEventListener("scroll", animateTestimonials);
// end

// end
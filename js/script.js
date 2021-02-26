const stories = document.querySelector(".stories");
const tap = document.querySelector(".tap");
let indicatorAnim;
let hafWidth = stories.offsetWidth / 2;
let i = 0;
let story = document.querySelectorAll(".story");
 
const next = () => {
 if(i < story.length -1 ) {
  story[i].style.minWidth = 0;
  story[i].style.opacity = 0;
  i++;
  showIndicator()
 }
}
const prev = () => {
 if(i > 0) {
  story[--i].style.minWidth = "360px";
  story[i].style.opacity = 1;
  showIndicator()
 }
}

stories.addEventListener("click", e => {
  let clk = e.pageX;
  tap.style.top = e.pageY + "px";
  tap.style.left = clk + "px";
  tap.animate([
   {opacity:1, transform:"scale(1)"},
   {opacity:0,transform:"scale(2)"},
  ],{
  delay:200,
  duration: 1000
  });
  
  let indicator = document.querySelectorAll(".indicator span > span")[i];
  
  if(clk < hafWidth - 50) {
   indicatorAnim.pause()
   indicator.animate({width:0},{
   duration:100, fill:"forwards" });
   prev()
  } else if(clk > hafWidth + 50){
   indicatorAnim.pause()
   indicator.animate({width:'100%'},{
   duration:100, fill:"forwards" });
   next()
  }    
});

function showIndicator(){
 let indicator = document.querySelectorAll(".indicator span > span")[i];
 
 indicatorAnim = indicator.animate([
 {width:0},
 {width:'100%'}
 ],{
  delay:100,
  duration:5000,
  fill:"forwards"
 });
 Promise.all(
 indicator.getAnimations().map( animation => { 
   return animation.finished 
 })
 ).then(() => next()
);
}
const ready = () => {
 document.querySelector('.loader').remove();
 setTimeout(showIndicator(),3000)
}
stories.addEventListener("touchstart", () => indicatorAnim.pause())
stories.addEventListener("touchend", () => indicatorAnim.play())

window.addEventListener('load', ready);
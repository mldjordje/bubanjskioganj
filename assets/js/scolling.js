/*--------------Scrolling------------------*/
var controller = new ScrollMagic.Controller();
var slides = $('.image');
for (var i = 0; i < slides.length; i++) {
  var image = $('img', slides[i]);
  var tween = TweenMax.to(image, 1, {scale: 1.6, ease:Power0.easeNone});
  var scene = new ScrollMagic
  .Scene({
    triggerElement: slides[i], 
    duration: "150%",
    triggerHook: 'onEnter'
  })
  .setTween(tween)
  .addTo(controller);
}

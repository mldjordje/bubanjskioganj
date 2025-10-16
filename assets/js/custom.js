/*--------------HOmepage1 Testimonials Slider------------------*/
$(".tesimonial-slider-section").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  infinite:true,
  autoplaySpeed: 2000,
  dots: true,
  arrows:false
});
/*--------------HOmepage2 Testimonials Slider------------------*/
$(".home2-test-bottom-full").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  infinite:true,
  autoplaySpeed: 2000,
  dots: false,
  arrows:true,
  nextArrow: '<div class="slick-custom-arrow slick-custom-arrow-right"><i class="fa-solid fa-arrow-right"></i></div>',
  prevArrow: '<div class="slick-custom-arrow slick-custom-arrow-left"><i class="fa-solid fa-arrow-left"></i></div>',
});
/*--------------HOmepage1 Gallery Slider------------------*/
$(".gallery-item-sec").slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  infinite:true,
  autoplaySpeed: 2000,
  dots: false,
  arrows:false,
  responsive: [
  {
    breakpoint: 1199,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 767,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 450,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
  ]
});
/*--------------HOmepage3 Menu Slider------------------*/
$(".homepage3-menu-details").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  infinite:true,
  autoplaySpeed: 2000,
  dots: false,
  arrows:true,
  nextArrow: '<div class="slick-custom-arrow slick-custom-arrow-right"><i class="fa-regular fa-angle-right"></i></div>',
  prevArrow: '<div class="slick-custom-arrow slick-custom-arrow-left"><i class="fa-regular fa-angle-left"></i></div>',
  responsive: [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
  ]
});
/*--------------HOmepage3 Team Slider------------------*/
$(".home3-team-bottom-sec-full").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  infinite:true,
  autoplaySpeed: 2000,
  dots: true,
  arrows:false,
  responsive: [
  {
    breakpoint: 767,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
  ]
});
/*--------------HOmepage3 Gallery Slider------------------*/
$(".homepage3-gallery-bottom-sec").slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  infinite:true,
  autoplaySpeed: 2000,
  dots: false,
  arrows:false,
  responsive: [
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
    } 
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    } 
  }
  ]
});
/*--------------Single Blogpage4  Slider------------------*/
$(".single-blogpage4-slider-full").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  infinite:true,
  autoplaySpeed: 2000,
  dots: false,
  arrows:true,
  nextArrow: '<div class="slick-custom-arrow slick-custom-arrow-right"><i class="fas fa-angle-right"></i></div>',
  prevArrow: '<div class="slick-custom-arrow slick-custom-arrow-left"><i class="fas fa-angle-left"></i></div>',
});
/*--------------HOmepage3 Testimonial Slider------------------*/
$(".home3-testimonial-right-full").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  infinite:true,
  autoplaySpeed: 2000,
  dots: false,
  arrows:true,
  nextArrow: '<div class="slick-custom-arrow slick-custom-arrow-right"><i class="fa-solid fa-arrow-right"></i></div>',
  prevArrow: '<div class="slick-custom-arrow slick-custom-arrow-left"><i class="fa-solid fa-arrow-left"></i></div>',
});
/*--------------Blogpage1 About Slider------------------*/
$(".blog2-slider-sec-img").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  infinite:true,
  autoplaySpeed: 2000,
  dots: true,
  arrows:false
});
/*-------------------------------------  AOS Animation-------------------------------------*/
AOS.init({
  duration: 1000,
  delay: 400
});
AOS.init();
$(window).on('load', function() {
  AOS.refresh();
});
AOS.init({
  disable: function() {
    var maxWidth = 1440;
    return window.innerWidth < maxWidth;
  }
});
AOS.init({once: true});
/*-------------------------------------Specific Function-------------------------------------*/
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);
/*-------------------------------------Search popup Section-------------------------------------*/
$(".fixed-serach-icon").click(function(){
  $(".search-popup").addClass("active");
});

$(".close-search , .search-back-drop").click(function(){
  $(".search-popup ").removeClass("active");
});
/*-------------------------------------  Sticky Header-------------------------------------*/
$(window).scroll(function(){
  if ($(window).scrollTop() >= 20) {
    $('#header , #header-homepage1 , #homepage2-header2').addClass('fixed');
  }
  else {
    $('#header ,#header-homepage1 , #homepage2-header2').removeClass('fixed');
  }
});
/*-------------------------------------  Counter -------------------------------------*/
$('.counter-txt , .coming-counter-txt1').each(function() {
  var $this = $(this),
  countTo = $this.attr('data-count');

  $({ countNum: $this.text()}).animate({
    countNum: countTo
  },
  {
    duration: 8000,
    easing:'linear',
    step: function() {
      $this.text(Math.floor(this.countNum));
    },
    complete: function() {
      $this.text(this.countNum);
    }
  });  
});
/*------------------------------------- Progress Bar Section Start-------------------------------------*/
$(function () {
  function isScrolledIntoView($elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
  function count($this) {
    var current = parseInt($this.html(), 10);
    if (isScrolledIntoView($this) && !$this.data("isCounting") && current < $this.data('count')) {
      $this.html(++current);
      $this.data("isCounting", true);
      setTimeout(function () {
        $this.data("isCounting", false);
        count($this);
      }, 20);
    }
  }
  $(".c-counter").each(function () {
    $(this).data('count', parseInt($(this).html(), 10));
    $(this).html('0');
    $(this).data("isCounting", false);
  });
  function startCount() {
    $(".c-counter").each(function () {
      count($(this));
    });
  };
  $(window).scroll(function () {
    startCount();
  });
  startCount();
});
/*-------------------------------------  Preloader-------------------------------------*/
$(window).on("load" , function () {
  $("#spinner").delay(2000).fadeOut("slow");
  $("#overlayer").delay(2000).fadeOut("slow");
});
/*-------------------------------------  Scroll Bottom to top Event-------------------------------------*/
$(window).scroll(function() 
{
  if ($(this).scrollTop() >= 50) {       
    $('.scroll-top').fadeIn(200);    
  } else {
    $('.scroll-top').fadeOut(200);   
  }
});
$('.scroll-top').click(function() {      
  $('body,html').animate({
    scrollTop : 0                       
  }, 500);
});
/*-------------------------------------  Single Shop Page Slider-------------------------------------*/
$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  adaptiveHeight: true,
  asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: false,
  arrows: false,
  focusOnSelect: true,
  responsive: [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    }
  }, 
  {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 4,
    }
  }, 
  {
    breakpoint: 767,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 4,
    }
  },
  {
    breakpoint: 425,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
    }
  },
  {
    breakpoint: 375,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    }
  }
  ]
});
/*------------------------------------- Incerment Decrement -------------------------------------*/
$('.add').on('click', function () {
  if ($(this).prev().val() < 100) {
    $(this).prev().val(+$(this).prev().val() + 1);
  }
});
$('.sub').on('click', function () {
  if ($(this).next().val() > 1) {
    if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
  }
});
/*-------------------------------------WOW Animation-------------------------------------*/
new WOW().init();

/*-------------------------------------Anchore Tag Link Added-------------------------------------*/
$(".chefspage2-wrapper").wrap('<a href="single-chefs-deatail-page.html" class="single-chefs-des"></a>');
$(".chefs1-team-slide").wrap('<a href="single-chefs-deatail-page.html" class="single-chefs-des1"></a>');

$(".blog-1-wrapper ,.blogpage10-wrapper ,.blogpage6-wrapper ,.blogpage7-wrapper ,.blog2-blog-item, .blogpage5-deatils ,.blogpage8-wrapper, .blog2-post-wrapper").wrap('<a href="single-blogpage1.html"></a>');
$(".menupage-5-bottom").wrap('<a href="single-shop.html"></a>');

/*--------------Mobile Menu------------------*/
$(document).on("click", function(event){
  if($(event.target).closest(".navbar-toggler").length){
    $(".navbar-collapse.collapse.show").toggle();
  } else if(!$(event.target).closest(".navbar-collapse.collapse.show").length){
    $(".navbar-collapse").removeClass('collapse show');
  }
});
$('.close-menu').on( "click", function() {
  $('.navbar-collapse').removeClass('collapse show')  
});
(function($) {
  $.fn.menumaker = function(options) {  
    var cssmenu = $(this), settings = $.extend({
      format: "dropdown",
      sticky: false
    }, options);
    return this.each(function() {
      $(this).find(".button").on('click', function(){
        $(this).toggleClass('menu-opened');
        var mainmenu = $(this).next('ul');
        if (mainmenu.hasClass('open')) { 
          mainmenu.slideToggle().removeClass('open');
        }
        else {
          mainmenu.slideToggle().addClass('open');
          if (settings.format === "dropdown") {
            mainmenu.find('ul').show();
          }
        }
      });
      cssmenu.find('li ul').parent().addClass('has-sub');
      multiTg = function() {
        cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
        cssmenu.find('.submenu-button').on('click', function() {
          $(this).toggleClass('submenu-opened');
          if ($(this).siblings('ul').hasClass('open')) {
            $(this).siblings('ul').removeClass('open').slideToggle();
          }
          else {
            $(this).siblings('ul').addClass('open').slideToggle();
          }
        });
      };
      if (settings.format === 'multitoggle') multiTg();
      else cssmenu.addClass('dropdown');
      if (settings.sticky === true) cssmenu.css('position', 'fixed');
      resizeFix = function() {
        var mediasize = 1199;
        if ($( window ).width() > mediasize) {
          cssmenu.find('ul').show();
        }
        if ($(window).width() <= mediasize) {
          cssmenu.find('ul').hide().removeClass('open');
        }
      };
      resizeFix();
      return $(window).on('resize', resizeFix);
    });
  };
})(jQuery);

(function($){
  $(document).ready(function(){
    $("#cssmenu").menumaker({
      format: "multitoggle"
    });
  });
})(jQuery);






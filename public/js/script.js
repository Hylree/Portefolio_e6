//modal
$(document).ready(function() {

    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      };
      
      TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
      
        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
      
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
      
        var that = this;
        var delta = 300 - Math.random() * 100;
      
        if (this.isDeleting) { delta /= 2; }
      
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }
      
        setTimeout(function() {
          that.tick();
        }, delta);
      };
      
      window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
      };
      
    var variants = {
        'default': {
            args: [
                'This is an alert.'
            ]
        },

        'bowing': {
            args: [
                {
                    title: 'LES MISSIONS',
                    content:
                    '<div class="container">' +
                        '<ul>' +
                            '<li> Service en salle </li>' +
                            '<li> Acceuil client </li>' +
                            '<li> Préparation des menus </li>' +
                            '<li> Barman </li>' +
                        '</ul>' +
                    '</div>'
                }
            ]
        },

        'alert-warning': {
            args: [
                {
                    content: 'This is a warning.',
                    icon: $.sweetModal.ICON_WARNING,
                }
            ]
        },

        'alert-error-with-buttons': {
            args: [
                {
                    content: 'This is an error.',
                    title: 'Oh noes…',
                    icon: $.sweetModal.ICON_ERROR,

                    buttons: [
                        {
                            label: 'That\'s fine',
                            classes: 'redB'
                        }
                    ]
                }
            ]
        },

        'alert-with-title': {
            args: [
                'Titled Alert',
                'This is an alert.'
            ]
        },

        'confirm': {
            fn: $.sweetModal.confirm,

            args: [
                'Confirm please?',

                function() {
                    $.sweetModal('Thanks for confirming!');
                }
            ]
        },

        'confirm-with-title': {
            fn: $.sweetModal.confirm,

            args: [
                'Titled Confirm',
                'Confirm please?',
                function() {
                    $.sweetModal('Thanks for confirming!');
                }, function() {
                    $.sweetModal('You declined. That\'s okay!');
                }
            ]
        },

        'prompt': {
            fn: $.sweetModal.prompt,

            args: [
                'Can I haz cheezeburger?',
                null,
                null,
                function(val) {
                    $.sweetModal('You typed: ' + val);
                }
            ]
        },

        'prompt-with-value': {
            fn: $.sweetModal.prompt,

            args: [
                'Can I haz cheezeburger?',
                'Can I?',
                'Nope',
                function(val) {
                    $.sweetModal('You typed: ' + val);
                }
            ]
        },

        'tabbed': {
            args: [
                {
                    title: {
                        tab1: {
                            label: 'Tab 1'
                        },

                        tab2: {
                            label: 'Tab 2'
                        }
                    },

                    content: {
                        tab1: 'Tab 1',
                        tab2: 'Tab 2'
                    }
                }
            ]
        },

        'tabbed-with-buttons': {
            args: [
                {
                    title: {
                        tab1: {
                            label: 'Tab 1'
                        },

                        tab2: {
                            label: 'Tab 2'
                        }
                    },

                    content: {
                        tab1: 'Tab 1',
                        tab2: 'Tab 2'
                    },

                    buttons: {
                        someOtherAction: {
                            label: 'Action 2',
                            classes: 'secondaryB bordered flat',
                            action: function() {
                                return $.sweetModal('You clicked Action 2!');
                            }
                        },

                        someAction: {
                            label: 'Action 1',
                            classes: '',
                            action: function() {
                                return $.sweetModal('You clicked Action 1!');
                            }
                        },
                    }
                }
            ]
        },

        'tabbed-with-icons': {
            args: [
                {
                    title: {
                        tab1: {
                            label: 'Tab 1',
                            icon: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#000000" d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" /></svg>'
                        },

                        tab2: {
                            label: 'Tab 2',
                            icon: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#000000" d="M12,17L7,12H10V8H14V12H17L12,17M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" /></svg>'
                        }
                    },

                    content: {
                        tab1: 'Tab 1',
                        tab2: 'Tab 2'
                    }
                }
            ]
        },

        'html-content': {
            args: [
                {
                    title: 'HTML Content',
                    content: 'You can place <b>anything</b> <i>you</i> want in here.'
                }
            ]
        },

        'html-content-dark': {
            args: [
                {
                    title: 'HTML Content',
                    content: 'You can place <b>anything</b> <i>you</i> want in here.',
                    theme: $.sweetModal.THEME_DARK
                }
            ]
        },

        'youtube': {
            args: [
                {
                    title: 'Will YouTube Ever Run Out Of Video IDs?',
                    content: 'https://www.youtube.com/watch?v=gocwRvLhDf8',
                    theme: $.sweetModal.THEME_DARK
                }
            ]
        }
    };

    // href="#key"
    for (var key in variants) {
        if (variants.hasOwnProperty(key)) {
            var variant = variants[key];

            $('#' + key).on('click', { variant: variant }, function(e) {
                var variant = e.data.variant;

                variant.fn = variant.fn || $.sweetModal;
                variant.fn.apply(this, variant.args);
            });
        }
    }
});

//fin, modal





 
//Header scroll

const   banner = $("#banner").offset().top +225,
        infos = $("#infos").offset().top + 180,
        exp = $("#exp").offset().top + 135,
        veille = $("#veille").offset().top + 100,
        projet = $("#projet").offset().top + 250;

let     menu = $(window).scroll(scrolling),
        menuMobile = undefined,
        menuMobileEtat = undefined;
        
$(".view-click-infos").click(function (){
    $('html, body').animate({
        scrollTop: $("#infos").offset().top
    }, 750);
});

$(".view-click-exp").click(function (){
    $('html, body').animate({
        scrollTop: $("#exp").offset().top
    }, 750);
});

$(".view-click-projets").click(function (){
    $('html, body').animate({
        scrollTop: $("#projet").offset().top
    }, 750);
});

$(".view-click-veille").click(function (){
    $('html, body').animate({
        scrollTop: $("#veille").offset().top
    }, 750);
});


function scrolling() {
    if (menu != undefined) {
        const scroll_top = $(document).scrollTop() + $(window).height();
        var minDist = 1000;
        var closest = '';
        
        //console.log(scroll_top)
        //console.log("scrool top: " + scroll_top );
        //console.log("banner : " + banner + " infos : " + infos + " exp : " + exp + " veille : " + veille + " projets : " + projet);
        
        
         if(scroll_top < infos) {
            $('.locked-bottom').css('position','fixed').css('transform', 'translateY(-135px)');
            $('.locked-bottom-1').css('position','fixed').css('transform', 'translateY(-90px)');
            $('.locked-bottom-2').css('position','fixed').css('transform', 'translateY(-45px)');
            $('.locked-bottom-3').css('position','fixed').css('transform', 'translateY(0px)');

         }

         if(scroll_top  > infos && scroll_top < exp){
            $('.locked-bottom').css('position','relative').css('transform', 'translateY(0px)');
            $('.locked-bottom-1').css('position','fixed').css('transform', 'translateY(-90px)');
            $('.locked-bottom-2').css('position','fixed').css('transform', 'translateY(-45px)');
            $('.locked-bottom-3').css('position','fixed').css('transform', 'translateY(0px)');
       
         }

         if(scroll_top > exp && scroll_top < projet){
            $('.locked-bottom').css('position','relative').css('transform', 'translateY(0px)');
            $('.locked-bottom-1').css('position','relative').css('transform', 'translateY(0px)');
            $('.locked-bottom-2').css('position','fixed').css('transform', 'translateY(-45px)');
            $('.locked-bottom-3').css('position','fixed').css('transform', 'translateY(0px)');
         
         }

         if(scroll_top > projet && scroll_top < veille){
            $('.locked-bottom').css('position','relative').css('transform', 'translateY(0)');
            $('.locked-bottom-1').css('position','relative').css('transform', 'translateY(0)');
            $('.locked-bottom-2').css('position','relative').css('transform', 'translateY(0)');
            $('.locked-bottom-3').css('position','fixed').css('transform', 'translateY(0px)');
       
         }
         if(scroll_top > veille){
            $('.locked-bottom').css('position','relative').css('transform', 'translateY(0)');
            $('.locked-bottom-1').css('position','relative').css('transform', 'translateY(0)');
            $('.locked-bottom-2').css('position','relative').css('transform', 'translateY(0)');
            $('.locked-bottom-3').css('position','relative').css('transform', 'translateY(0px)');
       
         }
        
    }
}
/** use detect scroll and change css */

$(window).ready(function(){
    let viewportwidth = $(window).width();

    if(viewportwidth < 755){
        menuMobileEtat = "viewFirstTrue";
        $('.locked-bottom').css('position','relative').css('transform', 'translateY(0)');
        $('.locked-bottom-1').css('position','relative').css('transform', 'translateY(0)');
        $('.locked-bottom-2').css('position','relative').css('transform', 'translateY(0px)');
        $('.locked-bottom-3').css('position','relative').css('transform', 'translateY(0px)');


        
        menuMobile = $("#cssmenu").append('<div class="container" onclick="openMenuMobile()">'+
                                                '<div class="bar1"></div>'+
                                                '<div class="bar2"></div>'+
                                                '<div class="bar3"></div>'+
                                            '</div>'+
                                            '<div id="mySidenav" class="sidenav">'+
                                                '<a onclick="closeMenuMobile()" id="closebtn" class="closebtn">&times;</a>'+
                                                '<a  onclick="closeMenuMobile()" class="view-click-infos">Mes informations</a>'+
                                                '<a  onclick="closeMenuMobile()" class="view-click-exp">Mes expériences</a>'+
                                                '<a onclick="closeMenuMobile()" class="view-click-projet">Les Projets</a>'+
                                                '<a onclick="closeMenuMobile()" class="view-click-veille">La veille</a>'+
                                            '</div>');
        
                                        $(".view-click-infos").click(function (){

                                            $('html, body').stop().animate({
                                                scrollTop: $("#infos").offset().top + 50
                                            }, 750, 'swing');
                                        });
                                        
                                        $(".view-click-exp").click(function (){
                                            $('html, body').stop().animate({
                                                scrollTop: $("#exp").offset().top + 50
                                            }, 750, 'swing');
                                        });
                                        
                                        $(".view-click-projet").click(function (){
                                            $('html, body').stop().animate({
                                                scrollTop: $("#projet").offset().top + 50
                                            }, 750, 'swing');
                                        });
                                        
                                        $(".view-click-veille").click(function (){
                                            $('html, body').stop().animate({
                                                scrollTop: $("#veille").offset().top + 50
                                            }, 750, 'swing');
                                        });

        menu = undefined;
        
        $(window).scroll().stop();

    }

    if(viewportwidth > 755){
        menuMobileEtat = "viewFirstfalse";
        menu = $(window).scroll(scrolling);
    }
})

$(window).resize(function(){
    //menu = null;
    let viewportwidth = $(window).width();
    console.log("current : " + viewportwidth);
    if(viewportwidth < 755){

        $('.locked-bottom').css('position','relative').css('transform', 'translateY(0)');
        $('.locked-bottom-1').css('position','relative').css('transform', 'translateY(0)');
        $('.locked-bottom-2').css('position','relative').css('transform', 'translateY(0px)');
        $('.locked-bottom-3').css('position','relative').css('transform', 'translateY(0px)');

        if(menuMobileEtat != "viewFirstTrue"){
        $("#cssmenu").append('<div class="container" onclick="openMenuMobile()">'+
                '<div class="bar1"></div>'+
                '<div class="bar2"></div>'+
                '<div class="bar3"></div>'+
            '</div>'+
            '<div id="mySidenav" class="sidenav">'+
                '<a href="#" onclick="closeMenuMobile()" id="closebtn" class="closebtn">&times;</a>'+
                '<a href="#" onclick="closeMenuMobile()" class="view-click-infos">informations</a>'+
                '<a href="#" onclick="closeMenuMobile()" class="view-click-exp">Mes expériences</a>'+
                '<a href="#" onclick="closeMenuMobile()" class="view-click-projet">Les Projects</a>'+
                '<a href="#" onclick="closeMenuMobile()" class="view-click-veille">La veille</a>'+
            '</div>');
            menuMobileEtat = "viewFirstTrue";
        }


        $(".view-click-infos").click(function (){

            console.log('je passe');
        $('html, body').animate({
            scrollTop: $("#infos").offset().top
        }, 750);
        });
        
        $(".view-click-exp").click(function (){
            $('html, body').animate({
                scrollTop: $("#exp").offset().top
            }, 750);
        });
        
        $(".view-click-projets").click(function (){
            $('html, body').animate({
                scrollTop: $("#projet").offset().top
            }, 750);
        });
        
        $(".view-click-veille").click(function (){
            $('html, body').animate({
                scrollTop: $("#veille").offset().top
            }, 750);
        });
        
        menu = undefined;
        console.log("second vrai");
    }
    if(viewportwidth > 755){
    menuMobileEtat = "viewFirstFalse";
    $("#cssmenu .container").remove();
    $("#cssmenu .sidenav").remove();
    console.log("second faux");
    menu = $(window).scroll(scrolling);
    }
    
    console.log(menuMobile);
})

//close and open the menuMobile
function openMenuMobile() {
        $("#mySidenav").toggle("slide");
}
    
function closeMenuMobile(){
    $('#mySidenav').toggle("slide");
}
/*google map*/
/*--------------------------------google map obj and markers ----------------------------------------*/

function initialize() {

	var myLatlng = new google.maps.LatLng(55.7514015,37.76395);
	var mapOptions = {
	  zoom: 16,
	  center: myLatlng,
	  scrollwheel: false
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	var image = 'images/marker.png';
	var marker = new google.maps.Marker({
	  position: myLatlng,
	  map: map,
	  icon:image
	});
	var theElement = document.getElementById("address_content");
	var contentString = theElement.innerHTML; 
	var infowindow = new google.maps.InfoWindow({
	      content: contentString
	  });
	google.maps.event.addListener(marker,'click',(function(marker){
	   return function(){
	       infowindow.open(map, marker);
	   }
	})(marker));
}



//--------------------------------document.ready ----------------------------------------
$(document).ready(function() {
	if( $('#map-canvas').length ) {
		initialize();
	}
	$('input, textarea').placeholder();
	
    /*validation*/
    $('.js_validate [type="submit"]').on("click", function(){
        return validate($(this).parents(".js_validate"));
    });

    $('.fancy').fancybox({
    	padding:0,
		helpers: {
			overlay: {
				locked: false
	        }
	    }
    });    
    
    /*footer menu*/
	$(document).on('click', '.js_open', function () {
		var collapce = $(this).parents('.foot_block').find('.foot_menu');
		if($(this).hasClass('opened')) {
			$(collapce).slideUp();
			$(this).removeClass('opened');
		} else {
			$('.foot_menu').slideUp();
			$('.js_open').removeClass('opened');	
			$(this).addClass('opened');
			$(collapce).slideDown();
		}
	});

    /*select*/
    $('.selectpicker').selectpicker();

    /*якоря*/
	$('.nav .anchor').on('click', function(){
		var target = $(this).attr('href');
		$('.nav a[href^="#"]').parent('li').removeClass('active');
		console.log(target);
        $('.nav a[href="'+target+'"]').parent('li').addClass('active');
		$('html, body').animate({scrollTop: $(target).offset().top}, 1200);
		return false; 
	});
    
    /*animation*/
    $('.animated').appear(function() {

        var elem = $(this);
        var animation = elem.data('animation');

        if ( !elem.hasClass('visible') ) {
        	var animationDelay = elem.data('animation-delay');
            if ( animationDelay ) {
                setTimeout(function(){
                    elem.addClass( animation + " visible" );
                }, animationDelay);

            } else {
                elem.addClass( animation + " visible" );
            }
        }
    });

    /*carousel*/
    $(".owl-carousel").owlCarousel({
    	items:1,
		autoplay: true,
		loop:true
	});
	$(".owl-carousel-news").owlCarousel({
		nav : true,
    	items:1,
		autoplay: true,
		loop:true,
		dots:false
	});

	/*phone*/
	$('input[name="phone"]').focus(function(){
		$(this).attr('value','+380');
	});
    
});

//--------------------------------end document.ready ----------------------------------------




//--------------------------------FUNCTIONS ----------------------------------------

/*-------------------------------validate------------------------------*/
function validate(form){
    var error_class = "has-error";
    var norma_class = "has-success";
    var item        = form.find("[required]");
    var e           = 0;
    var reg         = undefined;
    function mark (object, expression) {
        if (expression) {
            object.parent('div').addClass(error_class).removeClass(norma_class).find('.success').css('display','none').next('.error_text').css('display','block');
            e++;
        } else
            object.parent('div').addClass(norma_class).removeClass(error_class).find('.success').css('display','block').next('.error_text').css('display','none');
    }
    form.find("[required]").each(function(){
        switch($(this).attr("data-validate")) {
            case undefined:
                mark ($(this), $.trim($(this).val()).length === 0);
            break;
            case "email":
                reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                mark ($(this), !reg.test($.trim($(this).val())));
            break;
            case "phone":
                reg = /[0-9 -()+]{5}$/;
                mark ($(this), !reg.test($.trim($(this).val())));
            break;
            case "age":
                reg = /[0-9 -()+]{2}$/;
                mark ($(this), !reg.test($.trim($(this).val())));
            break;
            default:
                reg = new RegExp($(this).attr("data-validate"), "g");
                mark ($(this), !reg.test($.trim($(this).val())));
            break
        }
    })
    $('.js_valid_radio').each(function(){
    	var inp = $(this).find('[type="radio"]');
        var rezalt = 0;
        for (var i = 0; i < inp.length; i++) {
        	
        	if ($(inp[i]).is(':checked') === true) {
        		rezalt = 1;
        		break;
        	} else {
        		rezalt = 0;
        	}
        };
        if (rezalt === 0) {
            $(this).addClass(error_class).removeClass(norma_class).find('.success').css('display','none').next('.error_text').css('display','block');
            e==1;
        } else {
            $(this).addClass(norma_class).removeClass(error_class).find('.success').css('display','block').next('.error_text').css('display','none');
        }
    })
    if (e == 0) {
    	if (form.hasClass('contact')) {
    		$('#thank').modal('show');
    		return false;
    	} else {
    		return true;
    	}
    }
    else {
        form.find("."+error_class+" input:first").focus();
        return false;
    }
} 


/*----------------------------input file---------------------------*/
$(function(){
    var wrapper = $( ".file_upload" ),
        inp = wrapper.find( "input" ),
        btn = wrapper.find( "button" ),
        lbl = wrapper.find( ".inp" );

    btn.focus(function(){
        inp.focus()
    });
    // Crutches for the :focus style:
    inp.focus(function(){
        wrapper.addClass( "focus" );
    }).blur(function(){
        wrapper.removeClass( "focus" );
    });

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] ) 
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if( ! file_name.length )
            return;

        if( lbl.is( ":visible" ) ){
            lbl.text( file_name );
            btn.text( "Прикрепить" );
        }else
            btn.text( file_name );
    }).change();

});
$( window ).resize(function(){
    $( ".file_upload input" ).triggerHandler( "change" );
});

/*-------------------------------PLACEHOLDER------------------------------*/
/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

	// Opera Mini v7 doesn�t support placeholder although its DOM seems to indicate so
	var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
	var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
	var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
	var prototype = $.fn;
	var valHooks = $.valHooks;
	var propHooks = $.propHooks;
	var hooks;
	var placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value;
				}

				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value = value;
				}

				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != safeActiveElement()) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		if (!isInputSupported) {
			valHooks.input = hooks;
			propHooks.value = hooks;
		}
		if (!isTextareaSupported) {
			valHooks.textarea = hooks;
			propHooks.value = hooks;
		}

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {};
		var rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this;
		var $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == safeActiveElement() && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement;
		var input = this;
		var $input = $(input);
		var id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': $input,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

	function safeActiveElement() {
		// Avoid IE9 `document.activeElement` of death
		// https://github.com/mathiasbynens/jquery-placeholder/pull/99
		try {
			return document.activeElement;
		} catch (err) {}
	}

}(this, document, jQuery));
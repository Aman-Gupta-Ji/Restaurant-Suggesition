(function($){
    $.fn.extend({
        donetyping: function(callback,timeout){
            timeout = timeout || 500;
            var timeoutReference,
                doneTyping = function(el){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i,el){
                var $el = document.querySelector(el);
                $el.is(':input') && $el.addEventListener('keyup keypress',function(e){
                    if (e.type=='keyup' && e.keyCode!=8) return;
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){
                        doneTyping(el);
                    }, timeout);
                }).addEventListener('blur',function(){
                    doneTyping(el);
                });
            });
        }
    });
})(jQuery);

formValidation = {
	init: function(){
		this.$form = document.querySelector('.registration-form');
		this.$firstName = this.$form.querySelector('input[name="firstName"]');
		this.$lastName = this.$form.querySelector('input[name="lastName"]');
		this.$email = this.$form.querySelector('input[name="email"]');
		this.$password = this.$form.querySelector('input[name="password"]');
		this.$passwordToggle = this.$form.querySelector('button.toggle-visibility');
		this.$submitButton = this.$form.querySelector('button.submit');
		
		this.validatedFields = {
			firstName: false,
			lastName: false,
			email: false,
			password: false
		};
		
		this.bindEvents();
	},
	bindEvents: function(){
		this.$firstName.donetyping(this.validateFirstNameHandler.bind(this));
		this.$lastName.donetyping(this.validateLastNameHandler.bind(this));
		this.$email.donetyping(this.validateEmailHandler.bind(this));
		this.$password.donetyping(this.validatePasswordHandler.bind(this));
		this.$passwordToggle.mousedown(this.togglePasswordVisibilityHandler.bind(this));
		this.$passwordToggle.click(function(e){e.preventDefault()});
		this.$form.submit(this.submitFormHandler.bind(this));
	},
	validateFirstNameHandler: function(){
		this.validatedFields.firstName = this.validateText(this.$firstName);
	},
	validateLastNameHandler: function(){
		this.validatedFields.lastName = this.validateText(this.$lastName);
	},
	validateEmailHandler: function(){
		this.validatedFields.email = this.validateText(this.$email) && this.validateEmail(this.$email);
	},
	validatePasswordHandler: function(){
		this.validatedFields.password = this.validateText(this.$password) && this.validatePassword(this.$password);
	},
	togglePasswordVisibilityHandler: function(){
		var html = '<input type="text" value="'+this.$password.value+'">';
		var $passwordParent = this.$password.parent()
		var saved$password = this.$password.detach();
		$passwordParent.insertAdjacentHTML("beforeend",html);
		this.$passwordToggle.querySelector('span').classList.remove('glyphicon-eye-close').classList.add('glyphicon-eye-open');
		this.$passwordToggle.one('mouseup mouseleave', (function(){
			$passwordParent.querySelector('input').remove();
			$passwordParent.insertAdjacentHTML("beforeend",saved$password);
			this.$passwordToggle.querySelector('span').classList.remove('glyphicon-eye-open').classList.add('glyphicon-eye-close');
		}).bind(this));
	},
	submitFormHandler: function(e){
		e.preventDefault();
		this.validateFirstNameHandler();
		this.validateLastNameHandler();
		this.validateEmailHandler();
		this.validatePasswordHandler();
		if(this.validatedFields.firstName && this.validatedFields.lastName && this.validatedFields.email && this.validatedFields.password){
			// Simulate Ajax loading
			this.$submitButton.classList.add('loading').html('<span class="loading-spinner"></span>')
			setTimeout((function(){
				this.$submitButton.classList.remove('loading').classList.add('success').html('Welcome, '+this.$firstName.value)
			}).bind(this), 1500);
		}else{
			this.$submitButton.text('Please Fix the Errors');
			setTimeout((function(){
				if(this.$submitButton.text() == 'Please Fix the Errors'){
					this.$submitButton.text('Sign Me Up');
				}
			}).bind(this), 3000)
		}
	},
	
	validateText: function($input){
		$input.parent().classList.remove('invalid');
		$input.parent().querySelector('span.label-text small.error').remove();
		if($input.value != ''){
			return true;
		}else{
			$input.parent().classList.add('invalid');
			$input.parent().querySelector('span.label-text').insertAdjacentHTML("beforeend",' <small class="error">(Field is empty)</small>');
			return false;
		}
	},
	validateEmail: function($input){
		var regEx = /S+@S+.S+/;
		$input.parent().classList.remove('invalid');
		$input.parent().querySelector('span.label-text small.error').remove();
    if(regEx.test($input.value)){
			return true;
		}else{
			$input.parent().classList.add('invalid');
			$input.parent().querySelector('span.label-text').insertAdjacentHTML("beforeend",' <small class="error">(Email is invalid)</small>');
			return false;
		}
	},
	validatePassword: function($input){
			$input.parent().classList.remove('invalid');
		$input.parent().querySelector('span.label-text small.error').remove();
		if($input.value.length >= 8){
			return true;
		}else{
			$input.parent().classList.add('invalid');
			$input.parent().querySelector('span.label-text').insertAdjacentHTML("beforeend",' <small class="error">(Your password must longer than 7 characters)</small>');
			return false;
		}
	}
}.init();
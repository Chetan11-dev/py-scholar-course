$(document).ready(function(){
	$(".banner").eq(0).addClass('active') 	/* updated by sagar 27nov13 */
	createPagenation();		/* updated by sagar 27nov13 */	
	bannerSlider();
	searchSelect();
	mostActive();
	productDetails();
	

	
	
})



function closeAnimation(){
		$(".overlay").fadeOut();
		$(".int_left").animate({left:0},450).css('border-left-width',"1px");
		$(".indices").removeClass('active');
		setTimeout(function(){$("#main_menu").removeClass('navHidden'); },500); // updated by sagar 25Dec13		
}

var timerId=0;
function bannerSlider(){
	$(".banner.active .dotPagenation li").click(function(){
		
		clearInterval(timerId);
		sliderFun($(this).index());
		timerId=setInterval(function(){ autoSlider();},10000)
	})
	$(".banner.active .dotPagenation li").eq(0).click();
}

function autoSlider(){
	//timerId=setInterval(function(){
			if($(".banner.active .dotPagenation li.active").index()==$(".banner.active .dotPagenation li").length-1){
				sliderFun(0);
				return;
			}
			//$(".dotPagenation li.active").stop().next().click();
				sliderFun($(".banner.active .dotPagenation li.active").next().index());		
		//	},4000)
}
/* start updated by sagar 25Dec13 */
function sliderFun(indexVal){
	var _this=$(".banner.active .dotPagenation li").eq(indexVal);
	_this.addClass('active').siblings().removeClass('active');
	$(".textPannel").hide()
	$(".banner.active .slider li").eq(indexVal).fadeIn(700).siblings().fadeOut();
	setTimeout(function(){ $(".textPannel").eq(indexVal).fadeIn(400)},500);
}
/* end updated by sagar 25Dec13 */

function searchSelect(){
	$(".equity select").each(function () {
		 $(this).find("option").each(function () {
				if ($(this).attr("selected")) {
					$(this).parent().prev(".selectVal").html($(this).html());
				}
		});
	});
	
	$(".equity select").change(function () {
		$(this).prev().html($(this).children("option:selected").text());
	});
	
	$(".searchNSC, .search input").focus(function(){
		$(this).val("");
	})
	
	$(".searchNSC").blur(function(){
		if($(this).val()==""){
			$(this).val("Search NSE");
		}
	})
	
	$(".search input").blur(function(){
		if($(this).val()==""){
			$(this).val("Enter company name or symbol");
		}
	})
	
	$(".equityUl").hide();
	$(".selectVal").click(function(){
		$(".equityUl").toggle();
		$('.overlay').toggleClass('searchOverlay');
		$('.leftPannel').toggleClass('searchOverlay');
		$('#main_menu').toggleClass('searchOverlay');
		$(".footer_nav_main").toggleClass('searchOverlay');

	});
	
	$(".equityUl li").click(function(){
		$(".selectVal").html($(this).text())
		hideEquityUl();
	});
}

function hideEquityUl(){
	$(".equityUl").hide();
	$('.overlay').toggleClass('searchOverlay')
	$('.leftPannel').toggleClass('searchOverlay');
	$('#main_menu').toggleClass('searchOverlay');
	$(".footer_nav_main").toggleClass('searchOverlay');
}

function mostActive(){
	$(".mostActive .topTab li").eq(0).click(function(){
		if($(".Nifty").hasClass('active')) return;
		
		 if(!$(".mostActiveUl").is(":animated")){
			$(this).addClass('active').siblings().removeClass('active');
			$(".mostActiveUl").animate({marginLeft:-314},400);
			setTimeout(function(){
				$(".mostActiveUl").css("marginLeft","0");
				$(".mostActiveUl li:first").clone().appendTo($(".mostActiveUl"));$(".mostActiveUl li").eq(0).remove();
			},500);
			$(".Nifty").addClass('active');
			$(".MostActive").removeClass('active');;
		 }
	})
	$(".mostActive .topTab li").eq(1).click(function(){
		if($(".MostActive").hasClass('active')) return;
		
		 if(!$(".mostActiveUl").is(":animated")){
			$(this).addClass('active').siblings().removeClass('active');
			$(".mostActiveUl").animate({marginLeft:-314},400);
			setTimeout(function(){
				$(".mostActiveUl").css("marginLeft","0");
				$(".mostActiveUl li:first").clone().appendTo($(".mostActiveUl"));$(".mostActiveUl li").eq(0).remove();
			},500);
			$(".MostActive").addClass('active');
			$(".Nifty").removeClass('active');;
		 }
	})
	
	/* start updated by sagar 25Dec13 */
	$(".NSE_News .topTab li").eq(0).click(function(){
		if($(".announcement").hasClass('active')) return;
		
		 if(!$(".animatedUl").is(":animated")){
			 var _this=$(this).parent().parent()
			$(this).addClass('active').siblings().removeClass('active');
			_this.find(".animatedUl").animate({marginLeft:-286},400);
			
			setTimeout(function(){
				_this.find(".animatedUl").css("marginLeft","0");
				_this.find(".animatedUl li:first").clone().appendTo(_this.find(".animatedUl"));
				_this.find(".animatedUl li").eq(0).remove();
			},500);
			_this.find(".announcement").addClass('active');
			$(".nseNews").removeClass('active');;
		 }
	})
	
	$(".NSE_News .topTab li").eq(1).click(function(){
		if($(".nseNews").hasClass('active')) return;
		
		 if(!$(".animatedUl").is(":animated")){
			var _this=$(this).parent().parent()
			$(this).addClass('active').siblings().removeClass('active');
			_this.find(".animatedUl").animate({marginLeft:-286},400);
			setTimeout(function(){
				_this.find(".animatedUl").css("marginLeft","0");
				_this.find(".animatedUl li:first").clone().appendTo(_this.find(".animatedUl"));
				_this.find(".animatedUl li").eq(0).remove();				
			},500);
			_this.find(".nseNews").addClass('active');
			$(".announcement").removeClass('active');
		 }
	})

	
	//Start :Added by Abhijit on 28 Feb 2014 for Asset classes
	$(".NSE_News1 .topTab li").eq(0).click(function(){
		if($(".currency").hasClass('active')) return;
		
		 if(!$(".animatedUl1").is(":animated")){
			 var _this=$(this).parent().parent()
			$(this).addClass('active').siblings().removeClass('active');
			_this.find(".animatedUl1").animate({marginLeft:-286},400);
			
			setTimeout(function(){
				_this.find(".animatedUl1").css("marginLeft","0");
				_this.find(".animatedUl1 li:first").clone().appendTo(_this.find(".animatedUl1"));
				_this.find(".animatedUl1 li").eq(0).remove();
			},500);
			_this.find(".currency").addClass('active');
			$(".irf").removeClass('active');;
		 }
	})
	
	$(".NSE_News1 .topTab li").eq(1).click(function(){
		if($(".irf").hasClass('active')) return;
		
		 if(!$(".animatedUl1").is(":animated")){
			var _this=$(this).parent().parent()
			$(this).addClass('active').siblings().removeClass('active');
			_this.find(".animatedUl1").animate({marginLeft:-286},400);
			setTimeout(function(){
				_this.find(".animatedUl1").css("marginLeft","0");
				_this.find(".animatedUl1 li:first").clone().appendTo(_this.find(".animatedUl1"));
				_this.find(".animatedUl1 li").eq(0).remove();				
			},500);
			_this.find(".irf").addClass('active');
			$(".currency").removeClass('active');
		 }
	})
	//End :Added by Abhijit on 28 Feb 2014 for Asset classes


	/* end  updated by sagar 25Dec13 */
	
	animateNews('investorDiv'); /* updated by sagar 27nov13 */
	animateNews('memberDiv'); /* updated by sagar 27nov13 */
	animateNews('corporateDiv'); /* updated by sagar 27nov13 */
	animateNews('studentAnimatedDiv'); /* updated by sagar 27nov13 */
	
	investorTab()
}


/* start updated by sagar 27nov13 */
function animateNews(divName){
	var _this=$("."+divName);
	
	_this.find(".NSE_News .topTab li").eq(0).click(function(){
		if(_this.find(".announcement").hasClass('active')) return;
		 if(!_this.find(".animatedUl").is(":animated")){
			$(this).addClass('active').siblings().removeClass('active');
			_this.find(".animatedUl").animate({marginLeft:-286},400);
			setTimeout(function(){
				_this.find(".animatedUl").css("marginLeft","0");
				_this.find(".animatedUl li:first").clone().appendTo(_this.find(".animatedUl"));
				_this.find(".animatedUl li").eq(0).remove();
			},500);
			_this.find(".announcement").addClass('active');
			_this.find(".nseNews").removeClass('active');;
		 }
	})
	
	_this.find(".NSE_News .topTab li").eq(1).click(function(){
		
		if(_this.find(".nseNews").hasClass('active')) return;
		
		 if(!_this.find(".animatedUl").is(":animated")){
			$(this).addClass('active').siblings().removeClass('active');
			_this.find(".animatedUl").animate({marginLeft:-286},400);
			setTimeout(function(){
				_this.find(".animatedUl").css("marginLeft","0");
				_this.find(".animatedUl li:first").clone().appendTo(_this.find(".animatedUl"));
				_this.find(".animatedUl li").eq(0).remove();				
			},500);
			_this.find(".nseNews").addClass('active');
			_this.find(".announcement").removeClass('active');
		 }
	})	
}

/* start  updated by sagar 27nov13 */
function investorTab(){
	
	$(".pagenation li").click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$(".int_rightPannel").fadeOut(50);
		$(".int_rightPannel").delay(60).eq($(this).index()).fadeIn();
		//$(".banner").delay(210).eq($(this).index()).fadeIn().addClass('active');
		
		//$(".banner").removeClass('active')
		//$(".banner").delay(210).eq($(this).index()).addClass('active')
		//bannerSlider();
	})
}

function createPagenation(){
	var pagenationHtml="";
	$(".banner").each(function(){
		pagenationHtml="<ul>";
		for(var i=0; i<$(this).find(".slider li").length; i++){
			if(i==0){
				pagenationHtml+="<li class='active'></li>";
			}else{
				pagenationHtml+="<li></li>";
			}
		}
		pagenationHtml+="</ul>";
		$(this).find(".dotPagenation").html(pagenationHtml)
	});
}

/* end  updated by sagar 27nov13 */
/* start  updated by sagar 3Dec13 */
function productDetails(){
	$(".productTableTitle li").click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$(".productDetails").hide();

		$(".productDetails").eq($(this).index()).show();

	}).eq(0).click();
	
	verticalSlider();
}

var nextClicked=1;
function verticalSlider(){
	var countImages=$(".verticalSlider .sliderUl li").size();
	var limitNext=countImages-6;
	var moveSize=60;
	var NextSize=0;
	
	$(".verticalSlider .up").css({"opacity":"0"});
	$(".verticalSlider .up").click(function(){
		var _this=$(this).parent().find('.sliderUl');
		if(nextClicked>1){
			NextSize=NextSize-moveSize;
			_this.find('ul').animate({"margin-top":"-"+NextSize+"px"},"show");
			if(nextClicked!=1){nextClicked--;};
		}
		$(".verticalSlider .down").css({"opacity":"1","cursor":"pointer"});
		if(nextClicked==1) $(".verticalSlider .up").css({"opacity":"0","cursor":"default"});
	})
	
	$(".verticalSlider .down").click(function(){
		var _this=$(this).parent().find('.sliderUl');
		if(nextClicked<=limitNext){
			NextSize=nextClicked*moveSize;
			_this.find('ul').animate({"margin-top":"-"+NextSize+"px"},"show");
			nextClicked++;
		}
		$(".verticalSlider .up").css({"opacity":"1","cursor":"pointer"});
		if(nextClicked==limitNext+1) $(".verticalSlider .down").css({"opacity":"0","cursor":"default"});
	})
	
}
/* end  updated by sagar 3Dec13 */

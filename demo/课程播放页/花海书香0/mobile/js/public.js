/**
 * 用户感言
 */
var objUserFeel = {
	cfg : {'page':1,urlRefresh:'','ob':'2',isdone:1,'existsIds':'-1','clear':0,isdone:1},
	page:1,
	init : function(){
		$(".jqUserFeelRefresh").click(function(){ objUserFeel.getUserFeel(); });
	},
	getUserFeel: function(){
		if(this.cfg.isdone == 1){
			var objAjax = ajax.init()
			  .setUrl( this.cfg.urlRefresh )
			  .setData( {"page":this.cfg.page,"ob":this.cfg.ob,'existsIds':this.cfg.existsIds} )
			  .setCbSuccess("objUserFeel.getUserFeelSuccess(data)")
			  .setCbError("objUserFeel.getUserFeelError(data)")
			  .setLoadingTipId( "#jqAjaxLoadingTipFooter" )
			  .setLoadingTipMsg("")
			  .setIsTip(false)
			  .preRun()
			  .run();
			  this.cfg.isdone = 0;
		}
	},	
	getUserFeelSuccess : function( data )
	{
		//objUserFeel.cfg.page++;
		
		// 获得笔记
		var result = data.DATA;
		var items = result.aryUserFeeling;
		this.cfg.isdone = 1;
		var html = '';
		if(items.length > 0){
			for ( var i = 0; i < items.length; i++ )
			{
				var tmpHtml = $("#feelTempHtml").html();
				var obj = items[i];
				tmpHtml = tmpHtml.replace(/{USERNAME}/g,obj.f_nickname);
				tmpHtml = tmpHtml.replace(/{GANYANURL}/g,obj.userCenterUrl);
				tmpHtml = tmpHtml.replace(/{IMGBIG}/g,obj.imgbigurl);
				//tmpHtml = tmpHtml.replace(/{NOTE}/g,obj.f_feeling.substring(0,45)+"...");
				tmpHtml = tmpHtml.replace(/{NOTE}/g,obj.f_feeling);
				html += tmpHtml;
				objUserFeel.cfg.existsIds = objUserFeel.cfg.existsIds+','+obj.f_id;
			}
			if(objUserFeel.cfg.clear == 0){
				$("#userFeelDiv").empty();
				$("#userFeelDiv").html(html);
				
			}else{
				$("#userFeelDiv").append(html);
			}
			
		} else {
			//objUserFeel.cfg.page=1;
			objUserFeel.cfg.isdone = 0;
		}
		return true;
	},
	getUserFeelError : function( data )
	{
		return false;
		//
		
	}
};

/**
 * 用户感言
 */
var userFeel = {
	getUserFeel: function(){
		var objAjax = ajax.init()
		  .setUrl( GET_USER_FEEL_URL )
		  .setData( {} )
		  .setCbSuccess("userFeel.getUserFeelSuccess(data)")
		  .setCbError("userFeel.getUserFeelError(data)")
		  .setIsTip(false)
		  .preRun()
		  .run();
	},	
	getUserFeelSuccess : function( data )
	{
		// 获得笔记
		var result = data.DATA;
		var items = result.aryUserFeeling;
		var html = '';
		if(items.length > 0){
			for ( var i = 0; i < items.length; i++ )
			{
				var tmpHtml = $("#feelTempHtml").html();
				var obj = items[i];
				tmpHtml = tmpHtml.replace(/{USERNAME}/g,obj.f_nickname);
				tmpHtml = tmpHtml.replace(/{GANYANURL}/g,obj.userCenterUrl);
				tmpHtml = tmpHtml.replace(/{IMGBIG}/g,obj.imgbigurl);
				tmpHtml = tmpHtml.replace(/{NOTE}/g,obj.f_feeling.substring(0,45)+"...");
				html += tmpHtml;
			}
		}
		$("#userFeelDiv").empty();
		$("#userFeelDiv").html(html);
	},
	getUserFeelError : function( data )
	{
		
		//
		
	}
};

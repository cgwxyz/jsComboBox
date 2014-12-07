/*
@name: jQuery Combobox plugins
@author: cgwxyz[cgwxyz@gmail.com]
@
*/
;(function($) {
    
$.jsComboBox = $.jsComboBox || {version:'0.1.0'};

var jsComboBox = function(node,opts) {

    var me=this,$me=$(this);
    var $mine=$(node);

    $.extend(me, {
        options: function() {
            return opts;
        }
    });
      
    var data_source = [];
    
    function __init__(){
        data_source = opts.source;
        __initwrapper__();
        _initPanel__();
    }
    
    __init__();
    
    function __initwrapper__(){
        var tmp_html = '<div class="jscombobox" id="'+opts.spec_id+'">';
        tmp_html = '<div class="jscombobox_input" id="'+opts.spec_id+'"><input type="text" value="" placeholder="请输入" name="'+opts.post_name+'"/></div></div>';
        $(node).parent().append($(tmp_html));
    }
    function _initPanel__(){
        var tmp_panel = '<div class="jscombobox_panel" id="'+opts.spec_id+'"><ul></ul></div>';
        $(tmp_panel).appendTo($('body')).hide();
        
        $(node).hide();
        $('.jscombobox').css('width',$(node).css('width')).show();
        
        $('.jscombobox_input input').on('mouseup',function(){
            var curr_offset = $(this).offset();
            $('.jscombobox_panel')
                .css('top',(curr_offset.top+$(this).height()+7)+'px')
                .css('left',curr_offset.left+'px')
                .css('width',(parseInt($(this).width())+3)+'px')
            var total = $(node).children().length;
            if(total>3){
                $('.jscombobox_panel').css('height','60px');
            }else{
                $('.jscombobox_panel').css('height',total*20+'px');
            }
            $('.jscombobox_panel').show();
        });
        $.each($(node).children(),function(key,val){
            $('.jscombobox_panel ul').append('<li><a href="javascript:void(0)">'+$(this).text()+'</a></li>');
        });
        $('.jscombobox_panel ul li').on('mouseover',function(){
            $(this).css('backgroundColor','#FF6699');
        });
        $('.jscombobox_panel ul li').on('mouseout',function(){
            $(this).css('backgroundColor','#FFF');
        });
        $('.jscombobox_panel ul li').on('mouseup',function(){
            $('.jscombobox_input input').val($(this).children().html());
            $('.jscombobox_panel').hide();
        });
    }
    function __getCurrValue__(){
        return [prov_obj.val().split('_')[1],city_obj.val().split('_')[1],dist_obj.val().split('_')[1]].join('');
    }
};

$.fn.jsComboBox = function(conf) {
    var el = this.eq(typeof conf == 'number' ? conf : 0).data("jsComboBox");
    if (el) { return el; }

    var opts = {
        api:true,
        source:[],
        post_name:'',
        spec_id:''
    };

    $.extend(opts, conf);

    this.each(function() {
        el = new jsComboBox(this, opts);
        $(this).data("jsComboBox", el);
    });
    return opts.api ? el: this;
};

})(jQuery);
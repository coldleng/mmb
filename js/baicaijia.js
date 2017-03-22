/**
 * Created by SAMSUNG on 2017/3/19.
 */
$(function(){

    $('.title').each(function(){
        //console.log($(this).text());
        if($(this).text().length>15){
            $(this).text($(this).text().substring(0,15));
            $(this).text($(this).text()+'...');
        }
    })
    var getParam = function(name){
        var search = document.location.search;
        var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
        var matcher = pattern.exec(search);
        var items = null;
        if(null != matcher){
            try{
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            }catch(e){
                try{
                    items = decodeURIComponent(matcher[1]);
                }catch(e){
                    items = matcher[1];
                }
            }
        }
        return items;
    };


    $.ajax({
        url:'http://192.168.15.112:3000/api/getbaicaijiatitle',
        type:'get',
        dataType:'jsonp',
        success:function(data){
            //console.log(data);
            var list = template('lis',data);
            $('.ullist').html(list);
            //console.log($('.ullist li').width());
            $('.ullist li').on('click',function(){
                var liIndex=$(this).index();
                console.log(liIndex);
                $(this).addClass('active').siblings('li').removeClass('active')
                //alert(11)
                $.ajax({
                    url:'http://192.168.15.112:3000/api/getbaicaijiaproduct?titleid='+liIndex,
                    type:'get',
                    dataType:'jsonp',
                    success:function(data){
                        //console.log(data);
                        var pro=template('product',data)
                        $('.pro_list').html(pro)
                    }
                })
            })
        }
    })

    $.ajax({
        url:'http://192.168.15.112:3000/api/getbaicaijiaproduct?titleid=0',
        type:'get',
        dataType:'jsonp',
        success:function(data){
            //console.log(data);
            var pro=template('product',data)
            $('.pro_list').html(pro);
           $('.ullist li').eq(0).addClass('active');
        }
    })
})
/**
 * Created by SAMSUNG on 2017/3/19.
 */
$(function () {
    //判断字符长度
    $('.cu-content>h3').each(function(){
        if($(this).text().length>28){
            $(this).text($(this).text().substring(0,32));
            $(this).text($(this).text()+'...');
        }
    })
    //  获取productid值
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
    var num=getParam('productid');
    var target=getParam('target');
    console.log(target);
    if(target == 1){
        $.ajax({
            url:'http://192.168.15.112:3000/api/getmoneyctrlproduct?productid='+num,
            type:'get',
            dataType:'json',
            success:function(data){
                console.log(num);
                console.log(data);
                var discount=template('cold',data);
                $('.cu-content').html(discount);
                var pingl=template('pl',data);
                $('.cu-content-pl').html(pingl);
                //var city=template('city',data);
            }
        })
    }else if(target == 2){
        $.ajax({
            url:'http://192.168.15.112:3000/api/getdiscountproduct?productid='+num,
            type:'get',
            dataType:'json',
            success:function(data){
                console.log(num);
                console.log(data);
                var discount=template('ly',data);
                $('.cu-content').html(discount);
                var pingl=template('pl',data);
                $('.cu-content-pl').html(pingl);
            }
        })
    }



})
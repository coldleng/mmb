/**
 * Created by SAMSUNG on 2017/3/18.
 */
$(function(){
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
    var item =getParam('productid')
    $.ajax({
        type:'get',
        dataType:'jsonp',
        url:'http://192.168.15.112:3000/api/getproduct?productid='+item,
        success:function(data){
            //console.log(data);
            var info =template('tmp',data);
            $('.detail').html(info);
            //console.log(info);
            var table =template('tbl',data);
            //console.log(table);
            $('.plist').html(table);
        }
    })
    $.ajax({
        type:'get',
        url:'http://192.168.15.112:3000/api/getproductcom?productid='+item,
        dataType:'jsonp',
        success:function(data){
            //console.log(data);
            var pj =template('pingj',data);
            $('.pj_list').html(pj);
        }
    })
})
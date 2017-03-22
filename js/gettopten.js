/**
 * Created by SAMSUNG on 2017/3/21.
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
    var brandtitleid = getParam('brandtitleid');
    //console.log(brandtitleid);
    $.ajax({
        url:'http://192.168.15.112:3000/api/getbrand?brandtitleid='+brandtitleid,
        type:'get',
        dataType:'jsonp',
        success:function(data){
            //console.log(data);
            var tten = template('TOP',data);
            $('.sortlist>ul').html(tten);
        //    渲染前三
            $('.sortlist>ul li:nth-child(1) em').addClass('top1');
            $('.sortlist>ul li:nth-child(2) em').addClass('top2');
            $('.sortlist>ul li:nth-child(3) em').addClass('top3');
        //排名
            var ems=document.getElementsByTagName('em')
            for(var i = 0 ; i<10;i++){
                //console.log(i);
                ems[i].innerHTML=i+1;
            }
        // 销量排行商品列表
            $.ajax({
                url:'http://192.168.15.112:3000/api/getbrandproductlist?brandtitleid='+brandtitleid+'&pagesize=4',
                type:'get',
                dataType:'jsonp',
                success:function(data){
                    //console.log(data);
                    var prot = template('proTop',data);
                    $('.prolist>ul').html(prot);
                    //var imgs =template()
                //评论
                    var proid =$('.prolist>ul li:first-child').attr('value');
                    //console.log(proid);
                    $.ajax({
                        url:'http://192.168.15.112:3000/api/getproductcom?productid='+proid,
                        type:'get',
                        dataType:'jsonp',
                        success:function(data){
                            //console.log(data);
                            var plhtml=template('pl',data);
                            $('.pl_list>ul').html(plhtml);
                        }
                    })
                    //$.ajax({
                    //    url:'http://192.168.15.112:3000/api/getbrandproductlist?brandtitleid='+brandtitleid+'&pagesize=4',
                    //    type:'get',
                    //    dataType:'jsonp',
                    //    success:function(data){
                    //       var datas = data.result[0];
                    //        console.log(datas);
                    //        var imgbox =template('aaa',datas)
                    //        $('.protit').html(imgbox)
                    //    }
                    //})
                }
            })

        }
    })
})
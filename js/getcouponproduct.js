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
    var cid = getParam('couponid')
    //console.log(cid);
    $.ajax({
        url:'http://192.168.15.112:3000/api/getcouponproduct?couponid='+cid,
        type:'get',
        dataType:'jsonp',
        success:function(data){
            //console.log(data);
            var html =template('ticket',data);
            $('.main_list ul').html(html);

        //    点击显示遮罩
            $('.maskclick').on('click',function(){
                $('.mask').css('display','block');
                console.log($(this).index());
                var index =$(this).index();
                $.ajax({
                    url:'http://192.168.15.112:3000/api/getcouponproduct?couponid='+cid,
                    type:'get',
                    dataType:'jsonp',success:function(data){

                        //    mask遮罩图片
                        var imgs=template('mask_pic',data);
                        $('#imgs').html(imgs);

                        var imgWidth=$('.pic li').width();
                        //最后一个li的索引
                        var lastindex =$('.pic ul li:last-child').index();
                        //ul宽度
                        $('#imgs').css('width',(lastindex+1)*imgWidth);
                        $('#imgs').css('transform','translateX('+-index*imgWidth+'px)')
                        //点击右箭头
                        $('.arrow_r').on('click',function(e){
                            e.stopPropagation();
                            index++;
                            if(index>=lastindex){
                                index=0;
                                $('#imgs').css('transform','translateX('+index*imgWidth+'px)');
                            }
                            $('#imgs').css('transform','translateX('+-index*imgWidth+'px)')
                        })
                        $('.arrow_l').on('click',function(e){
                            e.stopPropagation();
                            index--;
                            if(index<0){
                                index=lastindex;
                                $('#imgs').css('transform','translateX('+-index*imgWidth+'px)');
                            }
                            $('#imgs').css('transform','translateX('+-index*imgWidth+'px)')
                        })
                    }
                })
            })
            $('.mask').on('click',function(){
                $(this).css('display','none')
            })
        }
    })

    $('li .info h3').each(function(){
        var lengthText = $(this).text().length;
        //var text=$(this).text();
        //console.log(text);
        console.log(lengthText);
        if(lengthText>15){
            $(this).text($(this).text().substring(0,15));
            $(this).text($(this).text()+'...');
        }
    })
})
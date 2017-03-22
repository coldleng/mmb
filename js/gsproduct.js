/**
 * Created by SAMSUNG on 2017/3/21.
 */
$(function () {
    //初始渲染
    $.ajax({
        url:'http://192.168.15.112:3000/api/getgsproduct?shopid='+0+'&areaid='+0,
        type:'get',
        dataType:'jsonp',
        success:function(data){
            //console.log(data);
            var prod=template('pdt',data);
            $('.product_gs>ul').html(prod);
        }
    })
    var areaId =0;
    var shopId=0;
    $('.filter ul>li:nth-child(1)').on('click',function(){
        //console.log($('.merchant')[0]);
        //$('.merchant').addClass('on');
        $('.region').css('display','none');
        $('.merchant').toggle();
        $.ajax({
            url:'http://192.168.15.112:3000/api/getgsshop',
            type:'get',
            dataType:'jsonp',
            success:function(data){
                //console.log(data);
                var first=template('jd',data);
                $('.merchant>ul').html(first);

            //店铺选择
                $('.merchant>ul li').on('click', function () {
                    //console.log($(this));
                    $(this).addClass('active_gs');
                    $(this).siblings().removeClass('active_gs');
                    $('.merchant').toggle();
                    shopId=$(this).attr('value');
                    $.ajax({
                        url:'http://192.168.15.112:3000/api/getgsproduct?shopid='+shopId+'&areaid='+areaId,
                        type:'get',
                        dataType:'jsonp',
                        success:function(data){
                            //console.log(data);
                            var prod=template('pdt',data);
                            $('.product_gs>ul').html(prod);
                        }
                    })
                })

            }
        })
    })
    //选择地区
    $('.filter ul>li:nth-child(2)').on('click',function(){
        //$('.merchant').addClass('on');
        $('.merchant').css('display','none');
        $('.region').toggle();

        $.ajax({
            url:'http://192.168.15.112:3000/api/getgsshoparea',
            type:'get',
            dataType:'jsonp',
            success:function(data){
                //console.log(data);
                var two=template('hb',data);
                $('.region>ul').html(two);
            //    地区选择
                $('.region>ul li').on('click', function () {
                    $(this).addClass('active_gs');
                    $(this).siblings().removeClass('active_gs');
                    $('.region').toggle();
                    console.log($(this).attr('value'));
                    areaId=$(this).attr('value');
                    $.ajax({
                        url:'http://192.168.15.112:3000/api/getgsproduct?shopid='+shopId+'&areaid='+areaId,
                        type:'get',
                        dataType:'jsonp',
                        success:function(data){
                            //console.log(data);
                            var prod=template('pdt',data);
                            $('.product_gs>ul').html(prod);
                        }
                    })
                })
            }
        })
    })
})
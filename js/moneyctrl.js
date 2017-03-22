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
    var num=getParam('pageid')
    $.ajax({
        url:'http://192.168.15.112:3000/api/getmoneyctrl',
        dataType:'jsonp',
        type:'get',
        success:function(data){
            console.log(data);
            var ul =template('ulList',data);
            $('.main_product_list').html(ul);
            var totals =Math.ceil((data.totalCount-0)/(data.pagesize-0));
            //console.log(totals);
            var i = 1;
            var str = '';
            for(;i<totals+1;i++){
                str+="<option value="+i+">"+i+'/'+totals+"</option>"
            }
            //console.log(str);
            $('.search select').html(str);
            i = $('.search').find('option').val();
            $('.search select').on('change',function(){
                i = $(this).val();
                window.scrollTo(0,0);
                $.ajax({
                    dataType:'jsonp',
                    type:'get',
                    url:'http://192.168.15.112:3000/api/getmoneyctrl?pageid='+(i-1),
                    success:function(data){
                        //console.log(data);
                        var ul =template('ulList',data);
                        $('.main_product_list').html(ul);
                    }
                })
            })
            $("#next").on('click',function(){
                i++;
                //console.log($('.search').find('option').val());
                $('.search').find('option').eq(i-1).prop('selected','true');
                console.log(i);
                $.ajax({
                    dataType:'jsonp',
                    type:'get',
                    url:'http://192.168.15.112:3000/api/getmoneyctrl?pageid='+(i-1),
                    success:function(data){
                        //console.log(value);
                        //console.log(totals);
                        if(i > totals){
                            alert("这是最后一页");
                            i=totals;
                            return;
                        }
                        window.scrollTo(0,0);
                        var ul =template('ulList',data);
                        $('.main_product_list').html(ul);
                    }
                })
            })
            $('#pre').on('click',function(){
                i--;
                $('.search').find('option').eq(i-1).prop('selected','true');
                if(i<1){
                    i=1;
                    $('.search').find('option').eq(i-1).prop('selected','true');
                    alert("这是第一页");
                    return;
                }
                $.ajax({
                    dataType:'jsonp',
                    url:'http://192.168.15.112:3000/api/getmoneyctrl?pageid='+(i-1),
                    type:'get',
                    success:function(data){
                        window.scrollTo(0,0);
                        var ul =template('ulList',data);
                        $('.main_product_list').html(ul);

                    }
                })
            })
        }
    })
})
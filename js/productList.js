/**
 * Created by SAMSUNG on 2017/3/16.
 */
$(function () {
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
    //console.log(getParam('categoryid'));
    var num = getParam('categoryid')
    $.ajax({
        dataType:'json',
        type:'get',
        url:'http://192.168.15.112:3000/api/getcategorybyid?categoryid='+num,
        success:function(data){
            //console.log(data);
            var name = template('title',data);
            $('.product_title').html(name);
        }
    })
    //console.log('http://192.168.15.164:3000/api/getproductlist?categoryid=' + num);
    $.ajax({
        dataType:'json',
        type:'get',
        url:'http://192.168.15.112:3000/api/getproductlist?categoryid='+num,
        success:function(data){
            var html =template('pro',data);
            $('.product_list').html(html);
        //    下一页
        //    var value = ($('.search').children('select').children('option').val().split("")[0])-1;
            var totals =Math.ceil((data.totalCount-0)/(data.pagesize-0));
            //var value = ($('.search').find('option').val());
            var i=1;
            //option选择框
            $.ajax({
                url:'http://192.168.15.112:3000/api/getproductlist?categoryid='+num,
                type:'get',
                dataType:'jsonp',
                success:function(data){
                    var str = '';
                    for(;i<totals+1;i++){
                        str+="<option value="+i+">"+i+'/'+totals+"</option>"
                    }
                    //console.log(str);
                    $('.search select').html(str);
                    i = ($('.search').find('option').val());
                    //console.log(value);
                    $(".search>select").on('change',function(){
                        i=$(this).val();
                        //console.log(i);
                        $.ajax({
                            dataType:'jsonp',
                            type:'get',
                            url:'http://192.168.15.112:3000/api/getproductlist?categoryid='+num+'&pageid='+i,
                            success:function(data){
                                //console.log(data);
                                var html =template('pro',data);
                                $('.product_list').html(html);
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
                            url:'http://192.168.15.112:3000/api/getproductlist?categoryid='+num+'&pageid='+i,
                            success:function(data){
                                //console.log(value);
                                //console.log(totals);
                                if(i > totals){
                                    alert("这是最后一页");
                                    i=totals;
                                    return;
                                }
                                window.scrollTo(0,0);
                                var html =template('pro',data);
                                $('.product_list').html(html);
                            }
                        })
                    })
                    $('#pre').on('click',function(){
                            i--;
                            $('.search').find('option').eq(i-1).prop('selected','true');
                            if(i<1){
                            i=1
                            alert("这是第一页")
                            return;
                        }
                            $.ajax({
                                dataType:'jsonp',
                                url:'http://192.168.15.112:3000/api/getproductlist?categoryid='+num+'&pageid='+i,
                                type:'get',
                                success:function(data){
                                    window.scrollTo(0,0);
                                    var html =template('pro',data);
                                    $('.product_list').html(html);


                                }
                            })
                        })
                }
            })
        }
    })
})
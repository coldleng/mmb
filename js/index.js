/**
 * Created by SAMSUNG on 2017/3/15.
 */
$(function(){
    $.ajax({
        url:'http://192.168.15.112:3000/api/getindexmenu',
        dataType:'json',
        type:'get',
        success:function(data){
            console.log(data);
        var result =template('nav',data);
         $('.navbar').html(result);

         $('.navbar div:gt(7)').hide();
         $('.navbar div:nth-child(8)').click(function () {
             $('.navbar div:gt(7)').toggle();
         })
        }
    })
    $.ajax({
        url:'http://192.168.15.54:3000/api/getmoneyctrl',
        dataType:'json',
        type:'get',
        success:function(data){
            console.log(data);
            var pro =template('main_pro',data);
            $('.main_product_list').html(pro);
        }
    })
})
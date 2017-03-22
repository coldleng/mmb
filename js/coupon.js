/**
 * Created by SAMSUNG on 2017/3/21.
 */
$(function () {
    $.ajax({
        url:'http://192.168.15.112:3000/api/getcoupon',
        type:'get',
        dataType:'jsonp',
        success:function(data){
            console.log(data);
            var html=template('kfc',data);
            $('.main_tic>ul').html(html)
        }
    })
})
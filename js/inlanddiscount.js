/**
 * Created by SAMSUNG on 2017/3/19.
 */
$(function(){
    $.ajax({
        url:'http://192.168.15.112:3000/api/getinlanddiscount',
        dataType:'json',
        type:'get',
        success:function(data){
            console.log(data);
            var list=template('lists',data);
            $('.ullist').html(list)
        }
    })
})
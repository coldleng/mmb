/**
 * Created by SAMSUNG on 2017/3/21.
 */
$(function(){
    $.ajax({
        url:'http://192.168.15.112:3000/api/getbrandtitle',
        type:'get',
        dataType:'jsonp',
        success:function(data){
            console.log(data);
            var title=template('Title',data);
            $('.top10_title').html(title);
        }
    })

})
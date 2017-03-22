/**
 * Created by SAMSUNG on 2017/3/21.
 */
$(function(){
    $.ajax({
        url:'http://192.168.15.112:3000/api/getsitenav',
        dataType:'jsonp',
        type:'get',
        success:function(data){
            //console.log(data);
            var htmllink =template('link',data);
            $('.link_list').html(htmllink)
        }
    })
})
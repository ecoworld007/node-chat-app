$('#room-name').focus(()=>{
    $.get("/rooms",function(data){
      var list = "";
      data.forEach(function(room){
        list += "<option value='" + room + "'>";
      });
      $('#roomList').html(list);
    });
  });
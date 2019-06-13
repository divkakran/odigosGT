$(document).ready(function() {
    $('#details').click(function() {
      $('#detail-box').slideToggle("fast");
    });
    $(".detail-close").click(function(){
      $("#detail-box").slideToggle("fast");
   });
});
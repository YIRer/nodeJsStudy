$('ul').on("click","li",function(){
 $(this).toggleClass("completed");
});

//click x
$('ul').on("click","span",function(e){
  $(this).parent().fadeOut(200,function(){
    $(this).remove();
  })
  e.stopPropagation();
});

//keypress
$('input[type="text"]').keypress(function(e){
  if(e.which === 13){
    var todoText = $(this).val();
    $("ul").append('<li><span><i class="fa fa-trash" aria-hidden="true"></i></span> '+todoText+'</li>');
    $(this).val("");
  }
});

//add fadeOut
$(".fa-plus").click(function(){
  $('input[type="text"]').fadeToggle(200);
});

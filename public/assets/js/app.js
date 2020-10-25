$(document).ready(function(){
    $.get("/api/notes",function(data){
        // console.log(data);
        for (let index = 0; index <data.length; index++) {
           $(".container").append(`<div class="card">
           <div class="card-body"> ${data[index].title} <span style="color: red" class="del" data-name=${data[index].title}>-</span></div>
           </div>`);
            
        }
    })

    $(document).on("click",".del", function(){
        const id = $(this).attr("data-name");
        $.ajax({
            url:"/api/note/"+id,
            method: "DELETE"
        }).then(function(data){
            console.log(data);
        })
    })
    

})
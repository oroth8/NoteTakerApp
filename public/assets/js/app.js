$(document).ready(function(){

    // grabbing data from json file and appending it to html document using jquery
    $.get("/api/notes",function(data){
        // console.log(data);
        for (let index = 0; index <data.length; index++) {
            $(".container").append(`<div class="card" style="width: 70rem;">
            <div class="card-body">
              <h5 class="card-title">${data[index].title}<button type="button" class="btn btn-danger del" data-name=${data[index].title}>delete</button></h5>
              <h6 class="card-subtitle mb-2 text-muted">${data[index].date}</h6>
              <p class="card-text">${data[index].notes}</p>
            </div>
          </div>`)
        //    $(".container").append(`<div class="card">
        //    <div class="card-body"> ${data[index].title} <span style="color: red" class="del" data-name=${data[index].title}>-</span></div>
        //    </div>`);
        }
    })

    $(document).on("click",".del", function(){
        const id = $(this).attr("data-name");
        $.ajax({
            url:"/api/note/"+id,
            method: "DELETE"
        }).then(function(data){
            console.log(data);
            if (data.status === "Success") {
                window.location = data.redirect;
            }
        })
    })
})
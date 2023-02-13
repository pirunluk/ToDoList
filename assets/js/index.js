$("#add_list").submit(function(event){
    alert("Data inserted successfully")
})

$("#update_list").submit(function(event){
    event.preventDefault()
    
    const unindexed_aray = $(this).serializeArray()
    const data = {}

    $.map(unindexed_aray,function(n,i){
        data[n['name']]=n['value']
    })
    console.log(data);

    let request = {
        "url" : `http://localhost:5555/api/lists/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data updated successfully")
    })
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        let id = $(this).attr("data-id")

        let request = {
            "url" : `http://localhost:5555/api/lists/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this list?")){
            $.ajax(request).done(function(response){
                alert("Data deleted successfully!");
                location.reload
            })
        }
    })
}

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

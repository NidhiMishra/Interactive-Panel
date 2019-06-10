// const fs = require('fs');

function show_error_messages(errors_array){
    console.log("Inside show_error_messages function")
    var errors_div = $('#errors');

    for(var i=0; i<errors_array.length; i++){
        var message = errors_array[i],
            error_html = '<div class="alert alert-danger alert-dismissible"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>' + message + '</strong></div>';
        errors_div.html(error_html);
    }
    errors_div.removeClass('hidden');
}

function submitForm (event) {
    console.log("Inside submitForm function")
    event.stopPropagation();
    event.preventDefault();

    $('#errors').html('');
    
    console.log("typeof files = ", typeof files)

   /* fs.readFile('C:/xampp/htdocs/Reader/chat.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        file = data;

        // Invoke the next step here however you like
        console.log(content);   // Put all of the code here (not the best solution)
        // processFile();          // Or put the next step in a function and invoke it
         uploadFiles(event);
    });*/

    uploadFiles(event);


    
    /*if (typeof files != 'undefined') {
        uploadFiles(event);
    } else {
        show_error_messages(['Please upload a file to proceed.']);
    }*/
}

function prepareUpload(event){
    console.log("Inside prepareUpload function")
    // console.log("full object of file = ", JSON.stringify(files, null, 4))
    files = event.target.files;
    // console.log("full object of file = ", JSON.stringify(files, null, 4))
    // console.log("files = ", files)
    // console.log("type of files = ", typeof files)
    // console.log("control is reaching here")
}

function uploadFiles(event){
    // consloe.log("file uploaded successfully")
    var data = new FormData(),
        submit_button = $('#submit_button'),
        file_input = submit_button.parent('form').children('input[name="file"]');


    console.log("data = ", data)
    console.log("submit_button = ", submit_button)
    console.log("file_input = ", file_input)

    $.each(files, function(key, value){
        console.log("inside each")
        data.append(key, value);
    });

    console.log("data = ", data)

    $.ajax({
        url: 'parse/upload-file.php',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        
        success: function(response){
            console.log("success in reading the chat")
            if(response.success){
                upload_prompt_div.hide();
                back_nav.show();
                // console.log("response.chat = ", response.chat)
                for(var chat in response.chat){
                    // console.log("chat = ", chat)
                    // console.log("response.chat[chat] = ", response.chat[chat])
                    chat_index = response.chat[chat].i;
                    // console.log("chat_index = ", chat_index)
                    chat_line = response.chat[chat].p;
                    // console.log("chat_line = ", chat_line)
                    chat_time = response.chat[chat].t;
                    // console.log("chat_time = ", chat_time)

                    var picture = "PicturePath"
                    var video = "VideoPath"

                    if(chat_line.indexOf(picture) !== -1) {
                        console.log("working for picture")
                        var start_index = 12
                        var end_index = chat_line.length - 1
                        console.log("start_index = ", start_index)
                        console.log("end_index = ", end_index)
                        var res = chat_line.substring(start_index, end_index);
                        console.log("res = ", res)
                        chat_line = '<div class="dropdown">'+
                                        '<img src="'+res+'"  width="100" height="50">'+
                                        '<div class="dropdown-content">'+
                                            '<img src="'+res+'" width="300" height="200">'+
                                        '</div>'+
                                    '</div>'
                        // chat_line = "<img src="+res+""+" height="+"100"+" width="+"100"+">"
                        // chat_line.replace(/(?:\r\n|\r|\n)/g, '<br>');   
                    } 
                    else if(chat_line.indexOf(video) !== -1) {
                        console.log("working for picture")
                        var start_index = 10
                        var end_index = chat_line.length - 1
                        console.log("start_index = ", start_index)
                        console.log("end_index = ", end_index)
                        var res = chat_line.substring(start_index, end_index);
                        console.log("res = ", res)
                        chat_line = '<div class="dropdown">'+
                                        '<img src="http://img.youtube.com/vi/'+res+'/0.jpg"  width="100" height="50">'+
                                        '<div class="dropdown-content">'+
                                            '<iframe src="'+res+'" width="300" height="200" frameborder="0" allowfullscreen></iframe>'+
                                        '</div>'+
                                    '</div>'
                        // chat_line = '<iframe width="300" height="200" src="'+res+'" frameborder="0" allowfullscreen></iframe >'
                    }
                    else if(chat_line != null) {
                        chat_line.replace(/(?:\r\n|\r|\n)/g, '<br>');   
                    } 
                    else {
                        chat_line = "*MEDIA HERE*";
                    }
                    

                    /*var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
                      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
                    if(pattern.test(chat_line)) {
                        console.log("is valid path.");
                        // return false;
                    } else {
                        console.log("check failed")
                    }*/

                    

                    // console.log("chat_line = ", chat_line)

                    if(chat_index % 2 == 0)
                        var chat_html = '<div class="aloo person' + chat_index + '"><div class="text">' + chat_line + '</div><div class="time">' + chat_time + '</div></div>';
                    else
                        var chat_html = '<div class="aloo person' + chat_index + ' left-margin-20"><div class="text">' + chat_line + '</div><div class="time">' + chat_time + '</div></div>';

                    chat_div.append(chat_html);
                }

                console.log("chat_div = ", chat_div)

                console.log("response.users = ", response.users)

                for(var user in response.users){
                    // console.log("user = ", user)
                    if(response.users[user] == 'Nadine') {
                        // console.log("user is nadine")
                        var user_html = '<span class="person' + user + '"><img src="assets/img/Nadine.png">' + response.users[user] + '</span>';
                        users_div.append(user_html);
                    } else {
                        // console.log("user is not nadine")
                        var user_html = '<span class="person' + user + '"><img src="assets/img/default-user-image.png">' + response.users[user] + '</span>';
                        users_div.append(user_html);
                    }
                    
                }
                console.log("---------------------------------------------------")
            } else {
                show_error_messages(response.errors);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("error in reading the chat")
            errors = ['Some technical glitch! Please retry after reloading the page!'];
            console.log("jqXHR = ", jqXHR)
            console.log("textStatus = ", textStatus)
            console.log("errorThrown = ", errorThrown)
            show_error_messages(errors);
        }, 
        beforeSend: function(){
            submit_button.val('Getting Conversation');
            submit_button.attr('disabled', '');

            file_input.attr('disabled', '');
        },
        complete: function(){
            submit_button.val('Get Conversation');
            submit_button.removeAttr('disabled');

            file_input.removeAttr('disabled');
            $('#chat').minEmoji();
        }
    });
}


function restoreForm(event) {
    event.preventDefault();
    
    chat_div.empty();
    users_div.empty();
    back_nav.hide();
    upload_prompt_div.show();
}


$(document).ready(function(){    
    $('form').on('submit', submitForm);
    $('input[type=file]').on('change', prepareUpload);
    $('.nav-back').click(restoreForm);
})


var files,
    upload_prompt_div = $('#upload-prompt'),
    conversation_div = $('#conversation'),
    chat_div = conversation_div.find('#chat'),
    users_div = conversation_div.find('#users_list'),
    logo_nav = $('.navbar-brand'),
    back_nav = $('li.nav-back');
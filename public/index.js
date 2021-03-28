var object_place = 1;
function reset_place() {
    object_place = 1;
}

 function send_message(x) {
    const url = 'http://localhost:3000/';
  let message_value =  x;
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            create_new_message_right_on(1, json.sentence);
            console.log(json.sentence + ", " + json.object_place);
            object_place = json.object_place;
            if (object_place==0) {
                reset_place();
            }
        }
    };
    var data = JSON.stringify({ "sentence": message_value, "object_place": object_place });
    xhr.send(data);
}
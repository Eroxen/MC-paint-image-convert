var base64_list_elements = [];
var copy_mode = "survival";

function update_copy_list() {
    if (mcppf1_encoded_body.length < 1 || mcppf1_encoded_header.length < 1) {
        return;
    }
    console.log('update copy list');
    base64_list_elements = split_long_string(base64ArrayBuffer(mcppf1_encoded_header.concat(mcppf1_encoded_body)));
    document.getElementById("copy_container").hidden = false;
    set_copy_list_selection();
}

function click_copy_mode_button(button, mode) {
    if (mode == copy_mode) {
        return;
    }
    copy_mode = mode;

    let buttons = button.parentElement.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("copy_mode_active");
    }
    button.classList.add("copy_mode_active");
    if (base64_list_elements.length > 0) {
        set_copy_list_selection();
    }
}

function set_copy_list_selection() {
    switch(copy_mode) {
        case "survival":
            set_copy_list_survival();
            break;
        case "cheats_nbt":
            set_copy_list_cheats_nbt();
            break;
        case "cheats_components":
            set_copy_list_cheats_components();
            break;
        default:
            console.log('copy mode not found');
            break;
    }
}

function set_copy_list_survival() {
    let list = document.getElementById("copy_code_list");
    list.innerHTML = "";
    for (let i = 0; i < base64_list_elements.length; i++) {
        let element = base64_list_elements[i];
        list.appendChild(copyable_li_element(element, "Copy<br>" + (i + 1) + "/" + base64_list_elements.length));
    };
}

function set_copy_list_cheats_nbt() {
    let list = document.getElementById("copy_code_list");
    let command = 'give @p minecraft:writable_book{pages:["' + base64_list_elements.join('","') + '"]}';

    list.innerHTML = "";
    list.appendChild(copyable_li_element(command, "Copy"));
}

function set_copy_list_cheats_components() {
    let list = document.getElementById("copy_code_list");
    let command = 'give @p minecraft:writable_book[writable_book_content={pages:["' + base64_list_elements.join('","') + '"]}]';

    list.innerHTML = "";
    list.appendChild(copyable_li_element(command, "Copy"));
}

function copy_li_contents(event) {
    event.target.innerHTML = "Copied!";
    text = event.target.parentElement.parentElement.children[1].innerHTML;
    navigator.clipboard.writeText(text);
}

function copyable_li_element(contents, copy_button_text) {
    let li = document.createElement("li");

    let button_div = document.createElement("div");
    button_div.className = "copy_li_div_button";
    let text_div = document.createElement("div");
    text_div.className = "copy_li_div_text";

    let button = document.createElement("button");
    button.innerHTML = copy_button_text;
    button.addEventListener("click", copy_li_contents);
    button_div.appendChild(button);

    text_div.appendChild(document.createTextNode(contents));

    li.appendChild(button_div);
    li.appendChild(text_div);
    return li;
}
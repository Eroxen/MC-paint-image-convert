var block_width = 1;
var block_height = 1;

var canvas_image = new Image();
canvas_image.src = 'data:image/png;base64,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';
canvas_image.onload = function() {
    update_block_size();
}

async function upload_image(event) {
    let file = event.target.files[0];
    console.log("uploaded " + file.size + " byte file");
    const base64 = await toBase64(file);
    let img = new Image();
    img.src = base64;
    img.onload = function() {
        let canvas = document.getElementById("scene_canvas_ink");
        if (this.width <= 64 && this.height <= 64) {
            canvas.width = this.width;
            canvas.height = this.height;
        }
        else {
            let scale_factor = 64 / Math.max(this.width, this.height);
            canvas.width = Math.max(Math.min(this.width * scale_factor, 64), 1);
            canvas.height = Math.max(Math.min(this.height * scale_factor, 64), 1);
        }
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, canvas.width, canvas.height);

        // project to lower colour resolution
        for (let i = 0; i < canvas.height; i++) {
            for (let j = 0; j < canvas.width; j++) {
                ctx.putImageData(quantise_ImageData(ctx.getImageData(j, i, 1, 1)), j, i);
            }
        }
        calculate_mcppf1_header();
        calculate_mcppf1_body();
        update_copy_list();
    }
}

function click_block_size_button(add_width, add_height) {
    let new_width = Math.min(Math.max(block_width + add_width, 1), 4);
    let new_height = Math.min(Math.max(block_height + add_height, 1), 4);
    if (new_width == block_width && new_height == block_height) {
        return;
    }
    block_width = new_width;
    block_height = new_height;
    update_block_size();
}

function update_block_size() {
    document.getElementById("scene_size_value_width").innerHTML = block_width;
    document.getElementById("scene_size_value_height").innerHTML = block_height;

    let container = document.getElementById("scene_canvas_container");
    container.style.width = 25 * block_width + '%';
    container.style.height = 25 * block_height + '%';
    if (block_width <= 2) {
        container.style.left = '25%';
    }
    else {
        container.style.left = '0%';
    }
    draw_background();
    calculate_mcppf1_header();
    update_copy_list();
}

function draw_background() {
    let w_px = block_width * 16;
    let h_px = block_height * 16;
    let canvas = document.getElementById("scene_canvas_background");
    canvas.width = w_px;
    canvas.height = h_px;
    let ctx = canvas.getContext("2d");
    let half_w = w_px / 2;
    let half_h = h_px / 2;
    ctx.drawImage(canvas_image, 0, 0, half_w, half_h, 0, 0, half_w, half_h);
    ctx.drawImage(canvas_image, 0, 64 - half_h, half_w, half_h, 0, half_h, half_w, half_h);
    ctx.drawImage(canvas_image, 64 - half_w, 0, half_w, half_h, half_w, 0, half_w, half_h);
    ctx.drawImage(canvas_image, 64 - half_w, 64 - half_h, half_w, half_h, half_w, half_h, half_w, half_h);
}
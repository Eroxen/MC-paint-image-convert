var mcppf1_encoded_header = [];
var mcppf1_encoded_body = [];

function quantise_ImageData(id) {
    let d = id.data;
    d[0] = Math.floor(d[0] / 8) * 8;
    d[1] = Math.floor(d[1] / 8) * 8;
    d[2] = Math.floor(d[2] / 8) * 8;
    d[3] = d[3] < 128 ? 0 : 255;
    return id;
}

function pixel_value_to_mcpaint_colour(array) {
    if (array[3] < 128) {
        return -1;
    } else {
        return Math.floor(array[0] / 8) * 1024 + Math.floor(array[1] / 8) * 32 + Math.floor(array[2] / 8);
    }
}

function segment_to_bytes(segment) {
    let colour = segment[0];
    let length = segment[1] - 1; // reduce length by 1 since 0-length segments don't exist

    // special case if the colour is -1 (transparent):
    // always include length and use msb of length byte to indicate transparency
    if (colour == -1) {
        return [128, 255, length + 128];
    }

    let col_byte_1 = Math.floor(colour / 256);
    let col_byte_2 = colour % 256;

    // use msb of first colour byte to indicate next byte as length
    if (length > 0) {
        return [col_byte_1 + 128, col_byte_2, length];
    }

    return [col_byte_1, col_byte_2];
}

function calculate_mcppf1_header() {
    const encoder = new TextEncoder();
    mcppf1_encoded_header = Array.from(encoder.encode("MCPPF1"));
    let canvas = document.getElementById("scene_canvas_ink");
    mcppf1_encoded_header = mcppf1_encoded_header.concat([block_width - 1, block_height - 1, canvas.width - 1, canvas.height - 1]);
    mcppf1_encoded_header = mcppf1_encoded_header.concat([0, 0]);
}

function calculate_mcppf1_body() {
    mcppf1_encoded_body = [];
    let canvas = document.getElementById("scene_canvas_ink");
    let ctx = canvas.getContext("2d");
    const max_segment_length = 128;
    
    let segment_colour = pixel_value_to_mcpaint_colour(ctx.getImageData(0, 0, 1, 1).data);
    let segment_length = 0;

    for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
            let pixel_colour = pixel_value_to_mcpaint_colour(ctx.getImageData(j, i, 1, 1).data);
            if (pixel_colour == segment_colour && segment_length < max_segment_length) {
                segment_length++;
            } else {
                mcppf1_encoded_body = mcppf1_encoded_body.concat(segment_to_bytes([segment_colour, segment_length]));
                segment_colour = pixel_colour;
                segment_length = 1;
            }
        }
    }
    mcppf1_encoded_body = mcppf1_encoded_body.concat(segment_to_bytes([segment_colour, segment_length]));
}
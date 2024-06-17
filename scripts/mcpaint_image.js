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

    col_byte_1 = Math.floor(colour / 256);
    col_byte_2 = colour % 256;

    // use msb of first colour byte to indicate next byte as length
    if (length > 0) {
        return [col_byte_1 + 128, col_byte_2, length];
    }

    return [col_byte_1, col_byte_2];
}

function calculate_painting_code() {
    // header encoding
    const encoder = new TextEncoder();
    var header_bytes = Array.from(encoder.encode("MCPPF1")); // MC Paint Painting Format 1
    // console.log(header_bytes);
    header_bytes = header_bytes.concat([BLOCK_WIDTH - 1, BLOCK_HEIGHT - 1, PIXEL_WIDTH - 1, PIXEL_HEIGHT - 1]);
    header_bytes = header_bytes.concat([0, 0]) // Length of author and painting title in bytes, 0 for now because I haven't implemented that yet

    console.log(IMAGE_DATA)
    b64_encoded_string = base64ArrayBuffer(header_bytes.concat(IMAGE_DATA));

    // console.log(b64_encoded_string);
    set_code_output_list(split_long_string(b64_encoded_string));

}
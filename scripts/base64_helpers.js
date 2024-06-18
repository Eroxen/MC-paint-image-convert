async function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function split_long_string(string, max_length=256) {
    let split_strings = [];

    while (string.length > max_length) {
        split_strings.push(string.substring(0, max_length));
        string = string.substring(max_length);
    }

    split_strings.push(string);
    return split_strings;
}
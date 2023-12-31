export function set(name, value, days) {
    if (!(name || value)) console.error
    name = encodeURIComponent(name)
    value = encodeURIComponent(value)

    let date = new Date("")
    if (days) {
        date = (days * 864e5) + Date.now()
        date = new Date(date).toUTCString()
    }

    document.cookie = `${name}=${value}; expires=${date}; path=/; samesite=none; secure`
}

export function get(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function del(name) {
    document.cookie = `${name}=""; max-age = -1; path=/; samesite=none; secure`
}
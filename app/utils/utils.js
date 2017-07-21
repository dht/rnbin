export const image = (url, retina) => {
    if (retina) {
        url = url.replace('.', '@2x.');
        return `${imageRetinaRoot}${url} 2x`;
    }

    return `${imageRoot}${url}`;
}

export const documentWidth = () => {
    const body = document.body,
        html = document.documentElement;

    return Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
}

export const leadingZero = (number) => {
    return number >= 10 ? number : `0${number}`;
}

export const timestamp = () => {
    return (new Date()).getTime();
}

export const currentLocationWithHash = (newHash) => {
    const href = document.location.href;
    const parts = href.split('#');
    parts.pop();
    parts.push(newHash);
    return parts.join('#');
}
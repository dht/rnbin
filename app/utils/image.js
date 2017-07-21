const UPLOAD_SERVER_URL = 'http://localhost:3001/upload';

export const getImageName = (filename) => {
    return filename
        .split('.')[0]
        .replace('_', ' ');
}

export const getImageSize = (url) => {

    return new Promise((resolve, reject) => {

        const image = new Image();

        image.onload = () => {
            resolve({
                width: image.width,
                height: image.height,
            });
        }
        image.src = url;
    });
}

export const uploadImage = (file) => {

    const data = new FormData()
    data.append('file', file);

    return fetch(UPLOAD_SERVER_URL,
        {
            method: 'POST',
            body: data
        })
        .then(res => res.json());
}

export const uploadImageByUrl = (url, debug) => {

    return fetch(url)
        .then(data => data.blob())
        .then(file => {
            return uploadImage(file);
        });
}

export const originalCloudinary = (url) => {

    if (!url) {
        return;
    }

    const regex = /\/upload\/x_[^\/]+/gi;

    return url.replace(regex, '/upload');
}

export const resolutionFromImageDimensions = (dimensions) => {
    let output = 0;

    if (dimensions.width <= 650) {
        output = 1;
    } else if (dimensions.width <= 1050) {
        output = 2;
    } else if (dimensions.width <= 1300) {
        output = 3;
    } else if (dimensions.width <= 1460) {
        output = 4;
    }

    return output;
}
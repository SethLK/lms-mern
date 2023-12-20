const url = location.pathname;
const uri = url.replace(/\/+$/, '');  // Remove trailing slashes
const segments = uri.split("/");

function getParam(type = 'single') {
    if (type === 'whole') {
        return segments.join('/');
    } else if (type === 'single') {
        return segments[segments.length - 1];
    } else {
        // Handle invalid type (optional)
        console.error('Invalid type provided to getParam');
        return null;
    }
}

export default getParam;

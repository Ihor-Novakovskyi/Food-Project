async function sendingData(url, data) {
    let resObject = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return resObject.json();
}



const getResource = async (url) => {

    const formObj = await fetch(url);
    if (!formObj.ok) {
        throw new Error(`Could not fetch ${url}, status ${formObj.status}`);
    }
    return formObj.json();

};
export { sendingData };
export { getResource };

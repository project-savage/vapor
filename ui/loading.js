export function Loading(loadingDiv, text){
    const text = document.createTextNode(`Loader: ${text}`);
    loadingDiv.appendChild(text);
}
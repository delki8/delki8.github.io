self.addEventListener('install', (event) => {
    console.log('inside the install handler', event);
});

self.addEventListener('activate', (event) => {
    console.log('inside the activate handler', event);
});

self.addEventListener(fetch, (event) => {
    console.log('inside the fetch handler', event);
});
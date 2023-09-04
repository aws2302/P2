export async function fetchSomeData() {
//     try {
//         const response = await fetch('localhost:8080/test');
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         throw new Error('Fehler bei Anfrage: ' + error.message);
//     }
// }

// Test Daten Short URL
const simulatedData = {
    shortURL: 'http://short.url/abc123',
    password: '1234567',
};

return new Promise((resolve) => {
    setTimeout(() => {
        resolve(simulatedData);
    }, 1000);
});
}
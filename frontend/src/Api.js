// export async function fetchSomeData() {
//     //     try {
//     //         const response = await fetch('localhost:8080/test');
//     //         const data = await response.json();
//     //         return data;
//     //     } catch (error) {
//     //         throw new Error('Fehler bei Anfrage: ' + error.message);
//     //     }
//     // }

//     // Interne Test Daten Short URL
//     const simulatedData = {
//         shortURL: 'http://short.url/abc123',
//         password: '1234567',
//     };

//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(simulatedData);
//         }, 1000);
//     });
// }

export async function fetchSomeData(longUrl) {
    try {
        const requestData = { longUrl };

        // POST-Anfrage ans Backend
        const response = await fetch('localhost:8080/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        // Überprüfung
        if (!response.ok) {
            throw new Error('Fehler bei Anfrage');
        }

        // Antwort Backend
        const data = await response.json();

        return data;
    } catch (error) {
        throw new Error('Fehler bei Anfrage: ' + error.message);
    }
}

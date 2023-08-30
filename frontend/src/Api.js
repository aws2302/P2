export async function fetchSomeData() {
    try {
        const response = await fetch('localhost:8080/test');
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Fehler bei Anfrage: ' + error.message);
    }
}

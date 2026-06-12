
export async function fetchComplianceData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP network error encountered. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Critical Failure executing Fetch API operation:", error);
        // Provide user-facing contextual fallback UI messaging here if necessary
        return [];
    }
}
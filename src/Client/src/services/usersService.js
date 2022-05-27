const baseUrl = "https://localhost:7274/api/Users";

export async function getUsers() {
    const response = await fetch(`${baseUrl}`);

    const result = await response.json();

    return result;
}

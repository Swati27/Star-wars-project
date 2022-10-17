export async function fetchJson(url, init) {
    const response = await fetch(
      `https://swapi.dev/api/${url}/`,
      {
        ...init ?? {},
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
  
  
    return response.json()
  }
  
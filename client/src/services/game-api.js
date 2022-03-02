const baseUrl = `${window.API_URL}/api/game`

export async function findAllGames() {
    

    const response = await fetch(baseUrl);
    if (response.status === 200){
        let j = response.json();
        return j;
    } else if (response.status === 403) {
        return Promise.reject(403);
    }
    return Promise.reject("Could not fetch games. ");
}


export async function findGameById(id) {
    const init = { method: "POST", headers: { 
        "Authorization": `Bearer ${localStorage.getItem("TOKEN")}` 
    } };
    const response = await fetch(`${baseUrl}/${id}`);
    if (response.status === 200){
        return response.json();
    } else if (response.status === 404) {
        return Promise.reject(404);
    }
    return Promise.reject("Game not found");
}

export async function addGame(game) {   //"Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
        },
        body: JSON.stringify(game)
    }

    const response = await fetch(`${baseUrl}`, init);
    if (response.status === 201) {
        return response.json();
    } else if (response.status === 400) {
        const messages = await response.json();
        return Promise.reject({ status: response.status, messages });
    }

    return Promise.reject({ status: response.status });
}

export async function updateGame(game) {
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
        },
        body: JSON.stringify(game)
    };
    const response = await fetch(`${baseUrl}/${game.gameId}`, init);
    if (response.status === 204) {
        return Promise.resolve();
    } else if (response.status === 403) {
        return Promise.reject(403);
    }
    return Promise.reject("Could not save game.");
}




export async function deleteGameById(id) {
    const init = { method: "DELETE", headers: { 
        "Authorization": `Bearer ${localStorage.getItem("TOKEN")}` 
    } };
    const response = await fetch(`${baseUrl}/${id}`, init);
    if (response.status === 204) {
        return Promise.resolve();
    } else if (response.status === 403) {
        return Promise.reject(403);
    }
    return Promise.reject("Could not delete game.");
}


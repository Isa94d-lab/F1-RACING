const BASE_URL = "http://localhost:3000/tracks";

async function getTracks(){
    const response = await fetch (BASE_URL);
    return response.json ();
}

async function getTrackById(id){
    const response = await fetch (`${BASE_URL}/${id}`);
    return response.json ();
}

async function addTrack(track){
    const response = await fetch (BASE_URL, {
        method: "POST" ,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify (track)
    });
    return response.json ();
}

async function updateTrack(id, updatedData) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    });
    return response.json();
}

async function deleteTrack(id) {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });
}

export { getTracks, getTrackById, addTrack, updateTrack, deleteTrack};

//Falta definir excepciones(errores)
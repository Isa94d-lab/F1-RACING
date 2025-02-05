export async function deletePiloto(id, BASE_URL) {
    if (!id) {
        alert('Por favor, seleccione un piloto para eliminar');
        return;
    }

    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar a este piloto?');
    if (!confirmDelete) return;

    try {
        // Petición DELETE a la API
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Error al eliminar el piloto');

        alert('Piloto eliminado exitosamente');
        window.dispatchEvent(new CustomEvent('pilotDeleted')); // Notificar actualización
    } catch (error) {
        console.error('Error al eliminar el piloto:', error);
        alert('Error al eliminar el piloto');
    }
}

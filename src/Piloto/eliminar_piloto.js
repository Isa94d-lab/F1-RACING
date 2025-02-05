export async function deletePiloto(id, BASE_URL) {
    if (!id) {
        alert('Por favor, seleccione un piloto para eliminar');
        return;
    }

    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar a este piloto?');
    if (!confirmDelete) return;

    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Error al eliminar el piloto');

        alert('Piloto eliminado exitosamente');
        window.dispatchEvent(new CustomEvent('pilotDeleted'));  // Emitir un evento
    } catch (error) {
        console.error('Error al eliminar el piloto:', error);
        alert('Error al eliminar el piloto');
    }

    
}

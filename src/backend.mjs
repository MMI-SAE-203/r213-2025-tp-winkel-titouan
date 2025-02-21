import PocketBase from "pocketbase";

const db = new PocketBase("http://127.0.0.1:8090");

export async function getOffres() {
    try {
        let data = await db.collection("Maison").getFullList({
            sort: "-created",
        });
        data = data.map((maison) => {
            maison.image_url = db.files.getURL(maison, maison.photo_maison);
            return maison;
        });
        return data;
    } catch (error) {
        console.log(
            "Une erreur est survenue en lisant la liste des maisons",
            error,
        );
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await db.collection('Maison').getOne(id);
        data.imageUrl = db.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function addOffre(house) {
    try {
        await db.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.imageUrl = pb.files.getFileURL(maison, maison.image);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}

export async function setFavori(house) {
    await pb.collection('Maison').update(house.id, { favori: !house.favori });
}
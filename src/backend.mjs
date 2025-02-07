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
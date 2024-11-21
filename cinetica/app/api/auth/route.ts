import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { user } from '../../../repository/user'; // Import des informations de l'utilisateur

export async function POST(req: Request) {
  try {
    // Récupérer les données envoyées dans le corps de la requête
    const { username, password } = await req.json();

    // Vérification si l'objet user est correctement défini
    if (!user || !user.username || !user.password) {
      return NextResponse.json({ success: false, message: 'Informations utilisateur non valides' }, { status: 500 });
    }

    // Vérification si le nom d'utilisateur existe
    if (username !== user.username) {
      return NextResponse.json({ success: false, message: "Nom d'utilisateur incorrect" }, { status: 400 });
    }

    // Vérification du mot de passe en utilisant bcrypt
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Mot de passe incorrect' }, { status: 400 });
    }
  } catch (err) {
    // Gestion des erreurs serveur
    console.error('Error during login:', err);
    return NextResponse.json({ success: false, message: 'Une erreur est survenue. Veuillez réessayer.' }, { status: 500 });
  }
}

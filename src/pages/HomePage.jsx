export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">Rencontres Pongistes</h1>
      <p className="max-w-xl text-center text-lg text-blue-700">
        Trouvez facilement un partenaire de ping-pong près de chez vous !
        <br />
        Publiez une annonce ou explorez la carte interactive des joueurs.
      </p>
    </div>
  );
}

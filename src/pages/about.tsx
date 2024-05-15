import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const About: React.FC = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Header />
      </div>
      <main className="px-[10px] lg:px-[30px] xl:px-[200px] mb-5 flex flex-col gap-4 mt-10">
        <h1 className="text-3xl font-primary text-center text-[#191E8F]">
          A propos
        </h1>
        <section className="flex flex-col gap-5 bg-white p-4">
          <p className="text-lg font-secondary">
            Bien sûr ! Voici un exemple de texte pour une page "À propos" de
            l'entreprise Microbamba :
          </p>
          <p className="text-lg font-secondary">Bienvenue chez Microbamba !</p>
          <p className="text-lg font-secondary">
            Microbamba est bien plus qu'un simple magasin de jeux vidéo. Situé
            au cœur de l'île de la Réunion, nous sommes fiers d'être le lieu de
            rencontre privilégié des passionnés de jeux vidéo. Notre engagement
            envers nos clients est simple : offrir la meilleure sélection de
            jeux et les prix les plus compétitifs de toute l'île.
          </p>
          <p className="text-lg font-secondary">
            Depuis notre création, nous avons constamment élargi notre gamme de
            produits pour répondre aux besoins divers et variés de notre
            communauté de joueurs. Que vous soyez un amateur de jeux de rôle, un
            adepte des jeux de tir ou un fanatique de jeux de sport, nous avons
            tout ce qu'il vous faut pour nourrir votre passion.
          </p>
          <p className="text-lg font-secondary">
            Chez Microbamba, nous comprenons que chaque joueur est unique, c'est
            pourquoi notre équipe dévouée est là pour vous offrir un service
            personnalisé et des conseils d'experts pour vous aider à trouver les
            jeux et les accessoires qui correspondent parfaitement à vos
            besoins.
          </p>
          <p className="text-lg font-secondary">
            Nous sommes fiers d'être le choix numéro un pour les joueurs de
            l'île de la Réunion, et nous nous engageons à continuer à vous
            offrir l'expérience de jeu ultime que vous méritez.
          </p>
          <p className="text-lg font-secondary">
            Merci de faire partie de la famille Microbamba !
          </p>
          <p className="text-lg font-secondary">L'équipe Microbamba</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

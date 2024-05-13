import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Fail: React.FC = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Header />
      </div>
      <main className="px-[10px] lg:px-[30px] xl:px-[200px] mb-5 flex flex-col gap-4 mt-10">
        <h1 className="text-3xl font-primary text-center text-[#191E8F]">
          Erreur lors du paiement
        </h1>
        <section className="flex flex-col gap-5 bg-white p-4">
          <p className="text-lg font-secondary">
            Nous sommes désolés, mais il semble qu'il y ait eu un problème lors
            du traitement de votre paiement.
          </p>
          <p className="text-lg font-secondary">
            Votre commande n'a pas été confirmée pour le moment. Nous vous
            conseillons de vérifier vos informations de paiement et de
            réessayer.
          </p>
          <p className="text-lg font-secondary">
            Si le problème persiste, n'hésitez pas à nous contacter pour obtenir
            de l'aide. Notre équipe d'assistance est là pour vous aider à
            résoudre tout problème lié à votre commande.
          </p>
          <p className="text-lg font-secondary">
            Nous nous excusons pour tout inconvénient que cela pourrait vous
            causer. Nous apprécions votre patience et votre compréhension
            pendant que nous travaillons à résoudre ce problème.
          </p>
          <p className="text-lg font-secondary">
            Merci pour votre intérêt pour Microbamba. Nous espérons pouvoir
            résoudre rapidement cette situation et vous servir avec succès à
            l'avenir.
          </p>
          <p className="text-lg font-secondary">Cordialement,</p>
          <p className="text-lg font-secondary">L'équipe Microbamba</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Fail;

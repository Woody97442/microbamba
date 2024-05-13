import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Success: React.FC = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Header />
      </div>
      <main className="px-[10px] lg:px-[30px] xl:px-[200px] mb-5 flex flex-col gap-4 mt-10">
        <h1 className="text-3xl font-primary text-center text-[#191E8F]">
          Merci pour votre commande
        </h1>
        <section className="flex flex-col gap-5 bg-white p-4">
          <p className="text-lg font-secondary">
            Nous vous remercions d'avoir choisi Microbamba pour votre achat.
            Votre commande a été confirmée et sera traitée dans les plus brefs
            délais.
          </p>
          <p className="text-lg font-secondary">
            Chez Microbamba, la satisfaction de nos clients est notre priorité
            absolue. Nous espérons que vous apprécierez votre nouveau produit et
            que vous en profiterez pleinement.
          </p>
          <p className="text-lg font-secondary">
            Si vous avez des questions concernant votre commande ou si vous avez
            besoin d'assistance, n'hésitez pas à nous contacter. Notre équipe
            est là pour vous aider !
          </p>
          <p className="text-lg font-secondary">
            Encore une fois, merci pour votre confiance en Microbamba. Nous
            avons hâte de vous servir à nouveau à l'avenir.
          </p>
          <p className="text-lg font-secondary">Cordialement,</p>
          <p className="text-lg font-secondary">L'équipe Microbamba</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Success;

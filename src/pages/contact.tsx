import React, { useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const contact: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [disabled, setDisabled] = useState(false);

  const onSubmit = (data: any) => {
    setDisabled(true);

    const templateParams = {
      from_name: data.email,
      name: data.name,
      firstname: data.firstname,
      message: data.message,
    };

    emailjs
      .send("service_4m131ed", "template_6sjnqfw", templateParams, {
        publicKey: "pZV0QI4FINKtyyVSS",
      })
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setDisabled(false);
        },
        (err) => {
          console.log("FAILED...", err);
          setDisabled(false);
        }
      );
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Header />
      </div>
      <main className="px-[10px] lg:px-[30px] xl:px-[200px] mb-5 flex flex-col gap-4 mt-10">
        <h1 className="text-3xl font-primary text-center text-[#191E8F]">
          Formulaire de Contact
        </h1>
        <form
          className="flex flex-col gap-5 bg-white p-4"
          onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Prénom</span>
            </div>
            <input
              type="text"
              placeholder="...."
              className="input input-bordered w-full max-w-xs"
              {...register("firstname", { required: true })}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Nom</span>
            </div>
            <input
              type="text"
              placeholder="...."
              className="input input-bordered w-full max-w-xs"
              {...register("name", { required: true })}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              placeholder="...."
              className="input input-bordered w-full max-w-xs"
              {...register("email", { required: true })}
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Message</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 max-w-md"
              placeholder="...."
              {...register("message", { required: true })}></textarea>
          </label>
          {disabled ? (
            <button
              className="btn btn-secondary text-white max-w-xs "
              type="submit"
              disabled>
              <span className="loading loading-infinity loading-lg"></span>
            </button>
          ) : (
            <button
              className="btn btn-secondary text-white max-w-xs"
              type="submit">
              Envoyer
            </button>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default contact;

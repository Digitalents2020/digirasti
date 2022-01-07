import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../App.css";
import Video3 from "../../Resources/email_anim.mp4"
//React Form Hook library documentation: https://github.com/react-hook-form/react-hook-form

const Email = () => {
  const [submitted, setSubmitted] = useState(false);
  const [attached, setAttached] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  //The above "CriteriaMode: all" means that all errors for the field are displayed at once

  const submitMessage = (data) => {
    if (data.Attachment.length !== 0) {
      setAttached(true);
    }
    setSubmitted(true);
  };

  //Try again button reloads the page back to its original state
  function refreshPage() {
    window.location.reload();
  }

  //If form is submited succesfully the "success" message below is rendered

  if (submitted) {
    return (
      <div className="mainPageFrame">
        <div className="pageContentFrame">
          <h2 className="infoHeader">Onnistuit!</h2>
          <p>
            Hienoa! Näin kirjoitat ja lähetät sähköpostin ja lisäät siihen
            liitteen! Voit nyt siirtyä seuraavaan tehtävään tai odottaa ohjaajan
            antamia ohjeita.
          </p>
          <br></br>
          {/*{!attached && (
            <>
              <h2 className="infoHeader">...Mutta</h2>
              <p>
                Sinulta taisi unohtua liitetiedosto. Ei hätää, voit silti
                halutessasi yrittää uudelleen tai klikata "seuraava tehtävä"
                painiketta.
              </p>
              <button
                className="actionButton"
                type="button"
                onClick={refreshPage}
              >
                {" "}
                <span>Yritä uudelleen</span>{" "}
              </button>
            </>
          )}*/}
        </div>
        <Link to="/Eform" className="nextPracButton" role="button">
          Seuraava tehtävä
        </Link>
      </div>
    );
  }

  //Form validation is made by using React Hook Form library

  //{...register("Vastaanottaja", { required: true })} The Register handles the input and the "required: true" is for validation and error purposes.
  //{errors.Vastaanottaja?.type === "required" && (<p className="errorMessage"> Vastaanottajaa ei voi jättää tyhjäksi </p> In this part we define the type of error and an error message for it, in this case the field cannot be left empty.

  return (
    <div className="mainPageFrame">
      <h1 className="pageHeader">Sähköposti</h1>
      <div className="pageContentFrame">
        <h2 className="infoHeader">Ohje:</h2>
        <p>
          Tehtävässä harjoitellaan sähköpostiviestin kirjoittamista ja
          liitetiedoston liittämistä sähköpostiviestiin. Sähköpostissa on aina:
          Vastaanottaja, aihe ja viesti. Sähköpostiviestiin voi laittaa myös
          liitetiedoston. Tehtävänäsi on kirjoittaa pienimuotoinen työhakemus.
          Vastaanottaja: esimerkki.makkonen@example.com Aihe: Työhakemus
          avoimeen tehtävään Viesti: Aloita viesti tervehdyksellä. Kerro mitä
          viesti koskee. Kerro myös, että CV on liitteenä. Laita viestiin
          lopputervehdys ja oma nimesi. Liitä CV:si sähköpostin liitteeksi. Ei
          huolta, viestisi ei lähde oikeasti mihinkään. Tämä on vain harjoitus.
        </p>
        <br />
        <p>
          Huomioitavaa: Joskus sähköpostien liitteen nappulassa on vain
          paperiliittimen eli klemmarin kuva, älä siis hätäänny, jos tässä
          tehtävässä käytettävää nappia ei tosielämän sähköposteista löydy. Ei
          huolta, kirjoittamasi hakemus ei oikeasti lähde mihinkään!
        </p>
        <video controls src={Video3} type="video/mp4" width="50%" />
      </div>
      <div className="pageContentFrame">
        <h2 className="infoHeader">Sähköposti</h2>
        <form onSubmit={handleSubmit(submitMessage)}>
          <label>Vastaanottaja</label>
          <input
            className="textWritingArea textWriteForm"
            {...register("Vastaanottaja", {
              required: true,
              pattern: /esimerkki\.makkonen@example\.com/,
            })}
          />
          {errors.Vastaanottaja?.type === "pattern" && (
            <p className="errorMessage">
              Tarkistathan kirjoittamasi osoitteen
            </p>
          )}
          {errors.Vastaanottaja?.type === "required" && (
            <p className="errorMessage">
              Vastaanottajaa ei voi jättää tyhjäksi
            </p>
          )}
          <label>Aihe</label>
          <input
            className="textWritingArea textWriteForm"
            {...register("Aihe", { required: true })}
            type="text"
          />
          {errors.Aihe?.type === "required" && (
            <p className="errorMessage">Aihetta ei voi jättää tyhjäksi</p>
          )}
          <label>Viesti</label>
          <textarea
            className="textWritingArea textWriteForm"
            {...register("Viesti", { required: true })}
            type="text"
          />
          {errors.Viesti?.type === "required" && (
            <p className="errorMessage">
              Viestikenttää ei voi jättää tyhjäksi
            </p>
          )}
          <label>Lataa liite</label>
          <input {...register("Attachment")} type="file"></input>
          <button className="actionButton" type="submit">
            Lähetä
          </button>
        </form>
      </div>
    </div>
  );
};

export default Email;

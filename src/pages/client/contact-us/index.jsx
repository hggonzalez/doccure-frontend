import React, { useState } from "react";
import { Link } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
// import mapboxgl from "mapbox-gl";
import FeatherIcon from "feather-icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "@emailjs/browser";
import Layout from "../../../components/layout/client";
import ContactForm from "../../../components/forms/contact";

// Validations
import { contactUsSchema } from "../../../libs/schemas";

import "./index.css";

function ContactUs() {
  // const [mapViewport] = useState({
  //   height: "100%",
  //   width: "100%",
  //   longitude: -87.1493549,
  //   latitude: 12.64470936320111,
  //   zoom: 18,
  // });
  // const mapContainer = useRef(null);
  // const map = useRef(null);

  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID;
  const userId = import.meta.env.VITE_PUBLIC_KEY;
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(contactUsSchema),
  });

  // useEffect(() => {
  //   if (map.current) return;
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/outdoors-v12",
  //     center: [-87.1493549, 12.6451734],
  //     zoom: 18,
  //   });
  // }, []);

  const resetForm = () => {
    reset();
    clearErrors();
  };

  const onSubmit = (data) => {
    emailjs.send(serviceId, templateId, data, userId).then(
      (res) => {
        console.log(res.text);
        resetForm();
      },
      (error) => {
        console.log(error.text);
      },
    );
  };

  return (
    <Layout>
      <div className="content-page">
        <div className="breadcrumb-bar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-12 col-12">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Inicio</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Cont??ctanos
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Cont??ctanos</h2>
              </div>
            </div>
          </div>
        </div>
        <section className="contact-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-12 text-center">
                <h3 className="mb-4">Cont??ctanos</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 d-flex">
                <div className="contact-box flex-fill">
                  <div className="infor-img">
                    <div className="image-circle">
                      <FeatherIcon icon="phone" />
                    </div>
                  </div>
                  <div className="infor-details text-center">
                    <p className="label">N??mero de Tel??fono</p>
                    <p>
                      <a href="tel:+50522222222">2222-2222</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="contact-box flex-fill">
                  <div className="infor-img">
                    <div className="image-circle bg-primary">
                      <FeatherIcon icon="mail" />
                    </div>
                  </div>
                  <div className="infor-details text-center">
                    <p className="label">Email</p>
                    <p>
                      <a href="mailto:contacto@msdental.com">contacto@msdental.com</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="contact-box flex-fill">
                  <div className="infor-img">
                    <div className="image-circle">
                      <FeatherIcon icon="map-pin" />
                    </div>
                  </div>
                  <div className="infor-details text-center">
                    <p className="label">Ubicaci??n</p>
                    <p>Costado Oeste de La Virgen del Camino, Salida de Chinandega</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-form">
          <div className="container">
            <div className="section-header text-center">
              <h2>??Ponerse en Contacto!</h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <ContactForm
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  setValue={setValue}
                  errors={errors}
                  disabled={!isValid}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="contact-map d-flex">
          <Map
            mapboxAccessToken={accessToken}
            mapStyle="mapbox://styles/hggonzalez/cldub1m9c000p01l5ezpgrrh7"
            initialViewState={{
              longitude: -87.14879139251715,
              latitude: 12.64470936320111,
              zoom: 17,
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <Marker latitude={12.64470936320111} longitude={-87.14879139251715}>
              <div className="marker-label">
                <img src="src/assets/images/marker.svg" alt="marker" />
                <p>MS Dental</p>
              </div>
            </Marker>
          </Map>
          {/* <div ref={mapContainer} className="map-container" /> */}
          {/* <iframe
            title="maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.716346058072!2d-95.5565430855612!3d29.872453233633234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640cfe4516785ed%3A0x774974592a609121!2s54%20Northwest%20Fwy%20%23558%2C%20Houston%2C%20TX%2077040%2C%20USA!5e0!3m2!1sen!2sin!4v1631855334452!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          /> */}
        </section>
      </div>
    </Layout>
  );
}

export default ContactUs;

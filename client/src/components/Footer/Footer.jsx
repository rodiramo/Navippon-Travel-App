import { IoHomeOutline, IoMailOutline, IoLogoWhatsapp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { SlSocialFacebook, SlSocialYoutube } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandTiktok } from "react-icons/tb";
import { PiTelegramLogo } from "react-icons/pi";
import "@css/Footer.css";

const Footer = () => {
  return (
    <div className="bg-[#0A0330] text-white py-8 rounded-t-full">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mt-3 text-center md:text-left">
        {/* Primera Columna */}
        <div className="flex justify-center md:ml-20"></div>

        {/* Segunda Columna */}
        <div className="text-center  md:text-left md:ml-20">
          <h5 className="font-bold mb-2">Mapa del sitio</h5>
          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Explora</a>
            </li>
            <li>
              <a href="#">Nosotros</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Ingreso</a>
            </li>
            <li>
              <a href="#">Registro</a>
            </li>
          </ul>
        </div>

        {/* Tercera Columna */}
        <div className="text-center md:text-left">
          <h5 className="font-bold mb-2">Contacto</h5>
          <ul>
            <li className="flex justify-center md:justify-start items-center mb-2">
              <IoHomeOutline className="mr-2" /> Dirección de la empresa 123
            </li>
            <li className="flex justify-center md:justify-start items-center mb-2">
              <IoMailOutline className="mr-2" /> infonavippon@navippon.com
            </li>
            <li className="flex justify-center md:justify-start items-center mb-2">
              <IoLogoWhatsapp className="mr-2" /> +34-1234-4567
            </li>
          </ul>
        </div>

        {/* Cuarta Columna */}
        <div className="text-center md:text-left">
          <h5 className="font-bold mb-2">Redes Sociales</h5>
          <div className="flex justify-center md:justify-start space-x-4 mb-2">
            <a href="#">
              <FaInstagram className="text-2xl md:text-4xl" />
            </a>
            <a href="#">
              <SlSocialFacebook className="text-2xl md:text-3xl" />
            </a>
            <a href="#">
              <FaXTwitter className="text-2xl md:text-3xl" />
            </a>
          </div>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#">
              <TbBrandTiktok className="text-2xl md:text-3xl" />
            </a>
            <a href="#">
              <SlSocialYoutube className="text-2xl md:text-3xl" />
            </a>
            <a href="#">
              <PiTelegramLogo className="text-2xl md:text-3xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

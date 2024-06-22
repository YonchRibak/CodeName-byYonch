import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { backendListItems, frontendListItems } from "./ListItem";
import myPicSrc from "../../assets/images/myPic.jpg";
import emailSrc from "../../assets/images/email.jpg";
import linkedinSrc from "../../assets/images/linkedin.png";
import githubSrc from "../../assets/images/github.png";

function About(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div
      className={`scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-primary scrollbar-track-transparent container flex flex-col gap-12 whitespace-pre-line text-justify ${
        i18n.language === "en-US" ? "ltr" : "rtl"
      } mx-auto px-4 py-8 overflow-y-scroll overflow-x-clip pe-48 font-normal`}
    >
      <h1 className="text-7xl font-bold mb-4 text-secondary">
        {t("about.title.title")}
      </h1>
      <div className="mb-8 flex flex-col items-start gap-5">
        <p className="text-3xl ms-8">{t("about.title.description")}</p>
        <a
          href="https://github.com/YonchRibak/CodeName-byYonch"
          target="_blank"
          className="ms-8"
        >
          <h3 className="text-2xl font-semibold text-pink-400">
            {t("about.repo.title")}
          </h3>
        </a>
      </div>

      <div className="grid grid-cols-3">
        <div>
          <h3 className="text-5xl font-semibold text-primary mb-8">
            {t("about.technologies.title")}
          </h3>
          <h4 className="text-4xl font-semibold mb-4 text-secondary ms-8">
            {t("about.technologies.frontend.title")}
          </h4>
          <ul className="list-none ms-16 space-y-5 ">
            {frontendListItems.map((item, index) => (
              <li key={index} className="flex gap-5">
                <img
                  src={item.icon}
                  className="h-[3vh] rounded-md"
                />
                <span className="text-2xl">{item.text}</span>
              </li>
            ))}
          </ul>
          <h4 className="text-4xl font-semibold mb-4 text-secondary ms-8 mt-8">
            {t("about.technologies.backend.title")}
          </h4>
          <ul className="list-none ms-16 space-y-5 mb-8">
            {backendListItems.map((item, index) => (
              <li key={index} className="flex gap-5">
                <img src={item.icon} className="h-[3vh]  rounded-md" />
                <span className="text-2xl">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-start-2 col-span-2 max-h-fit flex flex-col items-center">
          <img
            src={myPicSrc}
            className="border-primary border-8 rounded-full h-[30vh] mb-16"
          />
          <h5 className="text-5xl font-semibold text-primary mb-8">
            {t("about.contact.name")}
          </h5>

          <div className="flex justify-center gap-16 w-full col-start-2 col-span-2">
            <a
              href="https://mail.google.com/mail/?view=cm&to=yonch.baalil@gmail.com"
              target="_blank"
            >
              <img src={emailSrc} className="h-[7vh]" />
            </a>
            <a
              href="https://linkedin.com/in/jonathan-ribak-546686110"
              target="_blank"
            >
              <img src={linkedinSrc} className="h-[7vh]" />
            </a>
            <a href="https://github.com/YonchRibak" target="_blank">
              <img src={githubSrc} className="h-[7vh] rounded-full" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

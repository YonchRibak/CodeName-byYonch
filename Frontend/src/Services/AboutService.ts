import typeScriptIconSrc from "../assets/images/typeScript.png";
import reactIconSrc from "../assets/images/React-icon.png";
import socketIconSrc from "../assets/images/socket.png";
import wikiIconSrc from "../assets/images/Wikipedia.png";
import i18nIconSrc from "../assets/images/i18n.png";
import tailwindIconSrc from "../assets/images/tailwind.png";
import shadcnIconSrc from "../assets/images/shadcn-ui.png";
import nodeIconSrc from "../assets/images/node.png";
import expressIconSrc from "../assets/images/express.png";
import mysqlIconSrc from "../assets/images/mysql.png";

class AboutService {
  public readonly frontendListItems = [
    { icon: typeScriptIconSrc, text: "typeScript" },
    { icon: reactIconSrc, text: "React" },
    { icon: socketIconSrc, text: "Socket.io" },
    { icon: wikiIconSrc, text: "Wikipedia's REST API" },
    { icon: i18nIconSrc, text: "i18n" },
    { icon: tailwindIconSrc, text: "Tailwind CSS" },
    { icon: shadcnIconSrc, text: "Shadcn-ui" },
  ];

  public readonly backendListItems = [
    { icon: nodeIconSrc, text: "Node.js" },
    { icon: expressIconSrc, text: "Express" },
    { icon: mysqlIconSrc, text: "MySQL" },
  ];
}

export const aboutService = new AboutService();

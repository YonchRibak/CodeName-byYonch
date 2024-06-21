import useGameContext from "@/Hooks/useGameContext";
import { useTranslation } from "react-i18next";

function Score(): JSX.Element {
  const { session } = useGameContext();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <table>
        <tbody className="text-2xl font-semibold">
          <tr key="">
            <td className="text-[#2cb7da]">{t("manageGame.blueScore")}</td>
            <td className="text-[#f04d54]">{t("manageGame.redScore")}</td>
          </tr>
          <tr key="">
            <td>{session.blueScore}</td>
            <td>{session.redScore}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Score;

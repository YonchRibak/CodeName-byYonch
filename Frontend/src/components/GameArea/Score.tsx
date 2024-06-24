import useGameContext from "@/Hooks/useGameContext";
import { useTranslation } from "react-i18next";

function Score(): JSX.Element {
  const { session } = useGameContext();
  const { t } = useTranslation();
  console.log(session.turnsPlayed);
  return (
    <div className="flex flex-col">
      <table className="border-separate">
        <tbody className="text-2xl font-semibold">
          <tr className="">
            <td
              className={`text-[#2cb7da]  ${
                session.turnsPlayed % 2 !== 0
                  ? "border-solid border-[#2cb7da] border-4 rounded-2xl "
                  : ""
              }`}
            >
              {t("manageGame.blueScore")}
            </td>
            <td
              className={`text-[#f04d54] ${
                session.turnsPlayed % 2 === 0
                  ? "border-solid border-[#f04d54] border-4 rounded-2xl "
                  : ""
              }`}
            >
              {t("manageGame.redScore")}
            </td>
          </tr>
          <tr>
            <td>{session.blueScore}</td>
            <td>{session.redScore}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Score;

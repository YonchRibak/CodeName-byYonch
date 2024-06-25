class SessionService {
  public generateRandomTeamAscription(): string[] {
    const reds = Array(8).fill("red");
    const blues = Array(9).fill("blue");
    const neutrals = Array(7).fill("neutral");
    const bomb = "bomb";

    let fullArray: string[] = [];
    const randomizedArray = fullArray
      .concat(reds, blues, neutrals, bomb)
      .sort(() => Math.random() - 0.5);

    return randomizedArray;
  }
}

export const sessionService = new SessionService();

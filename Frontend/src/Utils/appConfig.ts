class AppConfig {
  public readonly baseUrl = "http://localhost:4000";
  public readonly wordBankUrl = "http://localhost:4000/api/words";
  public WikiUrl(lang: string): string {
    return `https://${lang}.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exsentences=1&exintro&explaintext&generator=random&grnnamespace=0&grnlimit=20`;
  }
}

export const appConfig = new AppConfig();

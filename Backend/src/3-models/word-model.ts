export class WordModel {
  id: number;
  English: string;
  Hebrew: string;
  isFamily: boolean;

  public constructor(word: WordModel) {
    this.id = word.id;
    this.English = word.English;
    this.Hebrew = word.Hebrew;
    this.isFamily = word.isFamily;
  }
}

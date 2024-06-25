import { dal } from "../2-utils/dal";
import { WordModel } from "../3-models/word-model";

class DataService {
  // Get all words:
  public async getAllWords(): Promise<WordModel[]> {
    const sql = "SELECT * FROM wordbank";
    const words = await dal.execute(sql);
    return words;
  }
}

export const dataService = new DataService();

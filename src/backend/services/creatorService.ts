import { db } from "../db/db";

export class CreatorService {
  static getCreators(queryParams: {
    search?: string;
    category?: string;
    industry?: string;
    location?: string;
    minFollowers?: number;
    maxPrice?: number;
  }) {
    return db.getCreators(queryParams);
  }

  static getCreatorByUsername(username: string) {
    return db.getCreatorByUsername(username);
  }
}

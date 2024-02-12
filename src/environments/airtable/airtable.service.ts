// airtable.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthserviceService } from './authservice.service';

// Interface representing the structure of your records
interface AirtableRecord {
  rating: number;
  category: string;
  comment: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class AirtableService {
  private records: AirtableRecord[] | null = null;
  private apiUrl = 'https://tsy94v6k27.execute-api.eu-west-3.amazonaws.com/prod';

  constructor(private http: HttpClient, private authService: AuthserviceService) {
    
  }

// Fetch records from Airtable via server-side endpoint
async getRecords(): Promise<AirtableRecord[]> {
  if (this.records === null) {
    try {
      // Make HTTP GET request to the server's /records endpoint
      const response = await this.http.get<AirtableRecord[]>(`${this.apiUrl}/records?tableName=${this.authService.myTable}`).toPromise();
      this.records = response;
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error; // Re-throw error for error handling in components
    }
  }
  return this.records || [];
}

/**async pushRecords(records: AirtableRecord[]): Promise<void> {
  try {
    const apiUrl = `https://api.airtable.com/v0/${this.baseId}/${this.authService.myTable}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    // Adjust the data structure based on your Airtable schema
    const data = {
      records: records.map((record) => ({
        fields: record,
      })),
    };

    await this.http.post(apiUrl, data, { headers }).toPromise();
  } catch (error) {
    console.error('Error pushing records to Airtable:', error);
    throw error;
  }
}**/

}

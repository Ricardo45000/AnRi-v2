import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Chart from 'chart.js';
import { AirtableService } from 'environments/airtable/airtable.service';

interface USERS {
  rating: number;
  category: string;
  comment: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  
  records: USERS[] = [];
  selectedLanguage = 'en';
  labels: string[] = [];
  label: string = null;


  constructor(private airtableService: AirtableService, private translate: TranslateService) {
    
  }

  private updateLabels(): void {
    this.label = this.translate.instant('Number of Reviews');
    this.labels = this.translate.instant(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  }

  public async getChartData(ctx: any): Promise<Chart.ChartData> {
    this.records = await this.airtableService.getRecords();
    return this.generateChartData(ctx);
  }

  private generateChartData(ctx: any): Chart.ChartData {
    const chartColor = "#FFFFFF";
    var gradientStroke = ctx.createLinearGradient(0, 20, 0, 300);
    gradientStroke.addColorStop(0, '#6bd098');
    gradientStroke.addColorStop(1, chartColor);
    this.updateLabels();
    

    const dataset = {
      labels: Object.values(this.labels),
      datasets: [{
        label: this.label,
        borderColor: '#6bd098',
        backgroundColor: gradientStroke,
        pointRadius: 5,
        pointHoverRadius: 10,
        fill: true,
        borderWidth: 3,
        data: this.countDatesForEachMonth(),
      }]
    };
    // Subscribe to language changes
    this.translate.onLangChange.subscribe(() => {
      ctx.labels = this.translate.instant(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    });

    return dataset;
  }

  //need to adjust it for the current year and to stop the line chart if the month did not start yet
  private countDatesForEachMonth(): number[] {
    const currentYear = new Date().getFullYear();

    // Filter records for the current year and only include months that have started in the current year
    const filteredRecords = this.records
      .filter(user => {
        const userDate = new Date(user.date);
        return userDate.getFullYear() === currentYear
      });

    // Count occurrences for each month using map and reduce
    return filteredRecords
      .map(user => new Date(user.date).getMonth())
      .reduce((monthCounts, month) => {
        monthCounts[month]++;
        return monthCounts;
      }, new Array(12).fill(0));
  }
  

  public calculateAverageStars(): string {
    const validRatings = this.records.map(user => user.rating)
                                .filter(stars => !isNaN(stars) || stars === 0);

  
    const totalStars = validRatings.reduce((sum, stars) => sum + stars, 0);
    const recordsCount = validRatings.length;
  
    // Check if there are valid records to avoid division by zero
    return Number(recordsCount > 0 ? totalStars / recordsCount : 0).toFixed(2);
  }
  

  public counterStarsRating(nbstars: number): number {
    return this.records.map(user => user.rating).filter(rating => rating === nbstars).length;
  }

  public numberOfComments(){ 
    const currentYear = new Date().getFullYear();

    // Use map to transform each record's date to the corresponding year
    const years = this.records.map(user => new Date(user.date).getFullYear());

    // Use reduce to count the occurrences of the current year
    const numberOfComments = years.reduce((count, year) => {
      return count + (year === currentYear ? 1 : 0);
    }, 0);

    return numberOfComments;
  }

}

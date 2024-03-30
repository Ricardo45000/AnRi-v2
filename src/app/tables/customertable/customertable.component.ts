import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AirtableService } from 'environments/airtable/airtable.service';
import { AuthserviceService } from 'environments/airtable/authservice.service';

interface USERS {
  category: String;
  rating: number;
  comment: String;
  date: String;
  name: String,
  email: String
}

declare var $:any;

interface DataTable {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'customer-table-cmp',
    templateUrl: 'customertable.component.html'
})

export class CustomerTableComponent implements OnInit, AfterViewInit{

  public dataTable: DataTable = { headerRow: [], dataRows: [] };
  public dtInstance: any;

  constructor(private airtableService: AirtableService, 
    private router: Router, 
    private authService: AuthserviceService,
    public translate: TranslateService) {
      this.translate.setDefaultLang("en");
    }


  // Create a function to convert USERS array to DataTable
  convertToDataTable(users: USERS[]): DataTable {
    // Extract header row from the first user object (assuming all objects have the same structure)
    const headerRow: string[] = Object.keys(users[0]);
    // Extract data rows
    const dataRows: string[][] = users
    .filter(user => user.name !== '' || user.email !== '')
    .map(user =>
      Object.values(user).map(value =>
        (value !== null && value !== undefined && value !== '')
          ? value.toString().replace(/[\r\n]+/g, '\n')
          : '\n'
      )
    );   
    return { headerRow, dataRows };
  }

  ngOnInit() {
    if (this.authService.checkConnection()) { 
      
     this.airtableService.getRecords().then((records) => {

        if (records && records.length > 0) {
          this.dataTable = this.convertToDataTable(records);
        } else {
          console.error('No record found.');
          this.dataTable.headerRow = ["Waiting a customer..."];
          this.dataTable.dataRows = [['']];
        }
      }).catch(error => {
        console.error('Error fetching records:', error);
      });
    } else {
      this.router.navigate(['/pages/lock']);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initDataTable();
    });
  }

  
  initDataTable(): Promise<void> {
    // Wrap the initialization logic in a Promise
    return new Promise<void>((resolve) => {
      const checkCondition = () => {
        if (this.dataTable.dataRows.length > 0) {
          // If the condition is met, proceed with DataTable initialization
          this.dtInstance = $('#datatable').DataTable({
            columnDefs: [
              { targets: [0], width: '15%' }, // Assuming "name" is the first column
              { targets: [1], width: '70%' }, // Assuming "email" is the second column
              { targets: [2], width: '15%' }  // Assuming "date" is the third column
            ],
          
            "pagingType": "full_numbers",
            "lengthMenu": [
              [10, 25, 50, -1],
              [10, 25, 50, "All"]
            ],
            "order": [[this.dataTable.headerRow.indexOf('date'), 'desc']],
            responsive: true,
            language: {
              search: "_INPUT_",
              searchPlaceholder: "Search records",
            },
            initComplete: function () {
              const api = this.api();
  
              // Create a new row below the header row for filter inputs
              const filterRow = $(api.table().header()).closest('thead')[0].insertRow(-1);
  
              // Create an input element for each column and append it to the new row
              api.columns().every(function (index) {
                const column = this;
                const cell = filterRow.insertCell(-1);
                $(cell).addClass('header-filter-cell');
                  const input = document.createElement("input");
                  $(input).appendTo($(cell))
                    .on('keyup change', function () {
                      column.search($(this).val()).draw();
                    }).attr('placeholder', api.column(index).header().textContent)
                    .css('width', '100%');
                }
              );
  
              // Add overflow style to make it scrollable
              $('#datatable_wrapper').css('overflow', 'auto');
  
              // Resolve the Promise after DataTable initialization
              resolve();
            }
          });
        } else {
          setTimeout(checkCondition, 100);
        }
      };
  
      // Start checking the condition
      checkCondition();
    });
  }
  


}

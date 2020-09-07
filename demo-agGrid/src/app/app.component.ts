import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  private gridApi;
  private gridColumnApi;

  title = 'demo-agGrid';

  columnDefs = [];
  colResizeDefault: string;
  statusBar: any;
  rowData: any;
  animateRows: boolean;
  rowDragManaged: boolean;
  enableMultiRowDragging: boolean;
  rowClassRules:any;
  rowSelection: string;

  salaryColVisibility: boolean = true;
  ssoColPinned: boolean = false;
  dragIconVisibility: boolean = false;
  

  constructor() { 
    this.columnDefs = [
      { headerName: 'SSO', field: 'sso', filter: 'agTextColumnFilter', checkboxSelection: true, sortable: true, resizable: true, width: 150, rowDrag: true, floatingFilter: true },
      { headerName: 'Name', marryChildren: true,
        children: [
          { headerName: 'First', field: 'first_name', filter: 'agTextColumnFilter', sortable: true, resizable: true, width: 150, floatingFilter: true },
          { headerName: 'Last', field: 'last_name', filter: 'agTextColumnFilter', sortable: true, resizable: true, width: 150, floatingFilter: true }
        ]},
      { headerName: 'Address', field: 'address', filter: 'agTextColumnFilter', sortable: true, resizable: true, width: 200, floatingFilter: true },
      { headerName: 'Project', field: 'project', filter: 'agTextColumnFilter', sortable: true, resizable: true, width: 150, floatingFilter: true, rowGroup: true, hide: true, },
      { headerName: 'Salary', field: 'salary', sortable: true, resizable: true, width: 100, floatingFilter: false,
      cellClassRules: {
        'tier-a': 'data.salary < 10',
        'tier-b': 'data.salary >= 10 && data.salary <= 50',
        'tier-c': 'data.salary > 50'
      } }
    ];

    this.rowData = [
      { sso: 'GE-001', first_name: 'abc', last_name: 'zyx', address: 'India', project: 'p1', salary: 20 },
      { sso: 'GE-002', first_name: 'bcd', last_name: 'yxw', address: 'India', project: 'p2', salary: 25 },
      { sso: 'GE-003', first_name: 'cde', last_name: 'xwv', address: 'India', project: 'p2', salary: 30 },
      { sso: 'GE-004', first_name: 'def', last_name: 'wvu', address: 'India', project: 'p2', salary: 9 },
      { sso: 'GE-005', first_name: 'efg', last_name: 'vut', address: 'India', project: 'p3', salary: 30 },
      { sso: 'GE-005', first_name: 'abc', last_name: 'uts', address: 'India', project: 'p3', salary: 30 },
      { sso: 'GE-005', first_name: 'efg', last_name: 'uts', address: 'India', project: 'p3', salary: 30 },
      { sso: 'GE-005', first_name: 'efg', last_name: 'zyx', address: 'India', project: 'p3', salary: 60 }
    ];

    this.statusBar = {
      statusPanels: [
        { statusPanel: 'agTotalRowCountComponent', align: 'left', key: 'totalRowComponent' },
        { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
        { statusPanel: 'agSelectedRowCountComponent', align: 'center' },
        { statusPanel: 'agAggregationComponent', statusPanelParams: { aggFuncs: ['min', 'max', 'avg'] } },
      ],
    };

    this.colResizeDefault = 'shift';
    this.animateRows=true;
    this.rowDragManaged=false;
    this.enableMultiRowDragging = false;
    this.rowSelection = 'multiple'

    // this.rowClassRules = {
    //   'tier-a': 'data.salary < 10',
    //   'tier-b': 'data.salary >= 10 && data.salary <= 50',
    //   'tier-c': 'data.salary > 50'
    // }
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.sso).join(', ');
    alert(`Selected SSO: ${selectedDataStringPresentation}`);
  }

  toggleSalaryColView() {
    this.salaryColVisibility = !this.salaryColVisibility;
    this.gridColumnApi.setColumnVisible('salary', this.salaryColVisibility);
  }

  toggleSSOColPin() {
    this.ssoColPinned = !this.ssoColPinned;
    this.gridColumnApi.setColumnPinned('sso', this.ssoColPinned);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  sortByName() {
    this.gridApi.setSortModel([
      { colId: 'first_name', sort: 'asc'},
      { colId: 'last_name', sort: 'asc'}
    ]);
  }

  toggleDragIconView() {
    this.dragIconVisibility = !this.dragIconVisibility;
    this.gridApi.setSuppressRowDrag(this.dragIconVisibility);
  }
}
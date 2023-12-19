import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'primeng/api';
/*
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
*/
import { Table, TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  @ViewChild('dataTable') dataTable!: Table;

  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  selectedUser: User | null = null;
  displayDeleteUserDialog: boolean = false;
  currentSort = { field: '', order: '' };
  totalRecords: number = 0;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadUsersLazy({ first: 0, rows: 10, sortField: '', sortOrder: 1 });
  }
  sortUsers(field: string, order: 'asc' | 'desc') {
    // Sorting logic
    if (field && order) {
      this.currentSort = { field, order };
      this.filteredUsers.sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return order === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          return order === 'asc' ? valueA - valueB : valueB - valueA;
        }
      });
    }
  }
  applySearchFilter() {
    // Search filter logic
    if (this.searchTerm) {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter((user) =>
        Object.entries(user).some(
          ([key, value]) =>
            (typeof value === 'string' &&
              value.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (typeof value === 'number' &&
              value.toString().includes(lowerCaseSearchTerm)) ||
            (typeof value === 'boolean' &&
              value.toString().toLowerCase() === lowerCaseSearchTerm)
        )
      );
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  loadUsersLazy(event: TableLazyLoadEvent) {
    this.loading = true;

    // If 'event' is null, it means the paginator's 'onPageChange' event was triggered directly
    if (!event) {
      if (
        !this.dataTable ||
        this.dataTable.first == null ||
        this.dataTable.rows == null
      ) {
        console.error(
          'Invalid state of the dataTable. Cannot determine page details.'
        );
        this.loading = false;
        return;
      }

      event = {
        first: this.dataTable.first!,
        rows: this.dataTable.rows!,
        sortField: this.dataTable.sortField,
        sortOrder: this.dataTable.sortOrder,
      };
    }

    const offset = event.first || 0;
    const limit = event.rows || 10; // Set the limit to the desired number of users per page

    this.userService.getUsers(offset, limit).subscribe(
      (data) => {
        console.log(data);
        this.users = data.users;
        this.filteredUsers = [...this.users];
        this.totalRecords = data.totalRecords;

        // Update paginator
        if (this.dataTable) {
          this.dataTable.totalRecords = this.totalRecords;
        }

        this.loading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    );
  }

  deleteUser(user: User) {
    this.selectedUser = user;
    this.displayDeleteUserDialog = true;
  }

  confirmDelete() {
    const userId = this.selectedUser?._id?.toString();

    if (userId) {
      console.log('Deleting user with ID:', userId);

      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('User deleted successfully');

          this.users = this.users.filter(
            (u) => u._id !== this.selectedUser?._id
          );
          this.filteredUsers = [...this.users];

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User deleted successfully',
          });
        },
        (error: any) => {
          console.error('Error deleting user:', error);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete user',
          });
        }
      );
    } else {
      console.error('Selected user or its ID is null or undefined.');
    }

    this.displayDeleteUserDialog = false;
  }

  cancelDelete() {
    this.displayDeleteUserDialog = false;
  }
  /*
  exportCSV() {
    const csvData = this.filteredUsers.map(user => ({
      Name: user.name,
      Email: user.email,
      Phone: user.phone,
      Roles: user['roles'][0]
    }));

    const csvContent = this.convertToCSV(csvData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, 'users.csv');
  }

  exportExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredUsers);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'users');
  }
  private convertToCSV(data: any[]): string {
    const csvArray: string[] = [];
    const header = Object.keys(data[0]);
    csvArray.push(header.join(','));

    data.forEach((item) => {
      const values = header.map((field) => this.escapeCSVValue(item[field]));
      csvArray.push(values.join(','));
    });

    return csvArray.join('\r\n');
  }

  private escapeCSVValue(value: any): string {
    if (
      typeof value === 'string' &&
      (value.includes(',') || value.includes('"'))
    ) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
  */
}

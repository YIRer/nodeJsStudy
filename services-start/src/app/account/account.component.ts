import { Component, Input} from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service'
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers :[LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private loggingService: LoggingService, private accountsService : AccountsService){}

  onSetTo(status: string) {
    // this.statusChanged.emit({id: this.id, newStatus: status});
    // console.log('A server status changed, new status: ' + status);
    this.accountsService.updateAccount(this.id, status);
    this.accountsService.statusUpdated.emit(status);
    // this.loggingService.logStatusChange(status);
  }
}

import { Component} from '@angular/core';
import { MessageService } from '../../services/message/message.service';


@Component({
  selector: 'app-messages-lab',
  templateUrl: './messages.lab.html',
  styleUrls: ['./messages.lab.css']
})

  
  /**@param messageService: has a message string array*/
  
export class MessagesForLab {
  private messages: string[] = [];

  constructor(private messageService: MessageService) { }

  add(message: string): void {
    this.messages.push(message);
    this.messageService.add(message);
  }

  getMessages(): string[] {
    return this.messages;
  }

  clear(): void {
    this.messages = [];
  }
}


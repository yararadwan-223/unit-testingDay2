import { MessagesForLab} from './messages.lab';
import { MessageService } from '../../services/message/message.service';

describe('MessagesForLabService', () => {
  let service: MessagesForLab;
  let messageServiceMock: MessageService;

  beforeEach(() => {
    messageServiceMock = jasmine.createSpyObj(['add']);
    service = new MessagesForLab(messageServiceMock);
  });

  it('should have no messages initially', () => {
    expect(service.getMessages().length).toBe(0);
  });

  it('should add a message', () => {
    service.add('Test message');
    expect(service.getMessages()).toContain('Test message');
  });

  it('should clear messages', () => {
    service.add('Another message');
    service.clear();
    expect(service.getMessages().length).toBe(0);
  });
});

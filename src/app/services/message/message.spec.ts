import { MessageService } from "./message.service";

describe('message service:', () => {
  let service:MessageService
  beforeEach(()=>{
    service= new MessageService()
  })
  it('add: should add new message to messages', () => {
    service.add("message 1")
    service.add("message 2")
    expect(service.messages).toHaveSize(2)
  });
  it('clear: should remove all messages', () => {
    service.add("test message 1 ")
    service.add("test message 2 ")

    service.clear()

    expect(service.messages).toHaveSize(0)
  });
});

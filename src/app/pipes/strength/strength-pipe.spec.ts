import { StrengthPipe } from "./strength-pipe";

describe('strength pipe:', () => {
  let pipe:StrengthPipe
  beforeEach(()=>{
    pipe= new StrengthPipe()

  })
    it('transform: should return "weak" when passing 3', () => {
    expect(pipe.transform(3)).toBe("3 (weak)")
  });
  it('transform: should return "strong" when passing 12', () => {
    expect(pipe.transform(12)).toContain("strong")
  });
  it('transform: should return "unbelievable" when passing 22', () => {
    expect(pipe.transform(22)).toMatch(/unbelievable/i)
  });
});

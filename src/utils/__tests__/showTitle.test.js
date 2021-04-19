import { showTitle } from '../showTitle';

describe('showTitle', () => {
  it('showTitle no lives', () => {
    const fails = 5;
    const correct = null;
    const lives = 0;
    expect(showTitle(fails, correct, lives)).toEqual('Ты смог потерять все жизни. Это ещё никому не удавалось. Молодец!:)');
  });

  it('showTitle fails = 1 and lives = 0 > 0', () => {
    const fails = 1;
    const correct = null;
    const lives = 1;
    expect(showTitle(fails, correct, lives)).toEqual('Ты крутой!)');
  });

  it('showTitle fails = 3 and lives = 0 > 0', () => {
    const fails = 3;
    const correct = null;
    const lives = 1;
    expect(showTitle(fails, correct, lives)).toEqual('Очень хорошо!)');
  });

  it('showTitle fails = 5 and lives = 0 > 0', () => {
    const fails = 5;
    const correct = null;
    const lives = 1;
    expect(showTitle(fails, correct, lives)).toEqual('Ты можешь лучше!)');
  });

  it('showTitle fails = 7 and lives = 0 > 0', () => {
    const fails = 7;
    const correct = null;
    const lives = 1;
    expect(showTitle(fails, correct, lives)).toEqual('Давай иди повтори и возвращайся)');
  });

  it('showTitle fails = 9 and lives = 0 > 0', () => {
    const fails = 9;
    const correct = null;
    const lives = 1;
    expect(showTitle(fails, correct, lives)).toEqual('Ну такое :(');
  });

  it('showTitle fails = 11 and lives = 0 > 0', () => {
    const fails = 11;
    const correct = null;
    const lives = 1;
    expect(showTitle(fails, correct, lives)).toEqual('Ты расстроил своего школьного учителя :(');
  });
});

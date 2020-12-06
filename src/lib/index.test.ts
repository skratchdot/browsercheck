import { validate } from './index';

describe('validate', () => {
  it('should report errors for non javascript strings', async () => {
    const result = await validate('hello world`', 'node 10');
    expect(result.inputMatchesNoTargets).toBeUndefined();
    expect(result.error).toMatch('unknown: Unexpected token');
    expect(result.valid).toBe(false);
  });
  it('should report errors for invalid browserlist queries', async () => {
    const result = await validate('var a = 4;', 'ie8');
    expect(result.inputMatchesNoTargets).toBe(true);
    expect(result.error).toMatch('Unknown browser query `ie8`');
    expect(result.valid).toBe(false);
  });
  it('should handle valid ie8 scripts', async () => {
    const result = await validate('var a = 4;', 'ie 8');
    expect(result.inputMatchesNoTargets).toBe(true);
    expect(result.error).toBeUndefined();
    expect(result.valid).toBe(true);
    expect(result.diff).toMatchInlineSnapshot(`
      Array [
        Object {
          "count": 10,
          "value": "var a = 4;",
        },
      ]
    `);
    expect(result.browserslist).toMatchInlineSnapshot(`
      Array [
        "ie 8",
      ]
    `);
    expect(typeof result.browserslistCoverage).toBe('number');
  });
  it('should handle invalid ie8 scripts', async () => {
    const result = await validate('const a = 4;', 'ie 8');
    expect(result.inputMatchesNoTargets).toBe(true);
    expect(result.error).toBeUndefined();
    expect(result.valid).toBe(false);
    expect(result.diff).toMatchInlineSnapshot(`
      Array [
        Object {
          "added": undefined,
          "count": 5,
          "removed": true,
          "value": "const",
        },
        Object {
          "added": true,
          "count": 3,
          "removed": undefined,
          "value": "var",
        },
        Object {
          "count": 7,
          "value": " a = 4;",
        },
      ]
    `);
    expect(result.browserslist).toMatchInlineSnapshot(`
      Array [
        "ie 8",
      ]
    `);
    expect(typeof result.browserslistCoverage).toBe('number');
  });
  it('should set inputMatchesNoTargets=false when spacing is changed', async () => {
    const result = await validate('const    a = () => `neat stuff`', 'node 10');
    expect(result.inputMatchesNoTargets).toBe(false);
    expect(result.error).toBeUndefined();
    expect(result.valid).toBe(true);
  });
  it('should polyfill promises in chrome at versions < 67 or equal to 82. not sure if bug with preset-env or what', async () => {
    let result;
    // chrome 66
    result = await validate('var a = Promise.resolve(1);', 'chrome 66');
    expect(result.valid).toBe(false);
    expect(result.error).toBeUndefined();
    // chrome 67
    result = await validate('var a = Promise.resolve(1);', 'chrome 67');
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
    // chrome 882
    result = await validate('var a = Promise.resolve(1);', 'chrome 82');
    expect(result.valid).toBe(false);
    expect(result.error).toMatch('Unknown version 82 of chrome');
  });
  // chrome 4-89
  (() => {
    for (let chromeVersion = 4; chromeVersion < 90; chromeVersion++) {
      const answer = chromeVersion >= 67 && chromeVersion !== 82;
      it(`should chrome ${chromeVersion} polyfill promises? answer=${answer}`, async () => {
        const result = await validate(
          'var a = Promise.resolve(1);',
          `chrome ${chromeVersion}`
        );
        expect(result.valid).toBe(answer);
      });
    }
  })();
});

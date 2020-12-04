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
  });
  it('should set inputMatchesNoTargets=false when spacing is changed', async () => {
    const result = await validate('const    a = () => `neat stuff`', 'node 10');
    expect(result.inputMatchesNoTargets).toBe(false);
    expect(result.error).toBeUndefined();
    expect(result.valid).toBe(true);
  });
});

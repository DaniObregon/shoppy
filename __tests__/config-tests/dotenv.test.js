const path = require('path');
const dotenv = require('dotenv');

describe("Environment Configuration", () => {
  beforeAll(() => {
    // Carga el archivo .env usando una ruta absoluta
    const envPath = path.resolve(__dirname, '../../.env');
    const result = dotenv.config({ path: envPath });

    if (result.error) {
      throw new Error("Error loading .env file: " + result.error);
    }
  });

  test("should load .env file successfully", () => {
    const envPath = path.resolve(__dirname, '../../.env');
    const result = dotenv.config({ path: envPath });
    expect(result.error).toBeUndefined();
  });

  test("should have DB_USER defined in the environment", () => {
    // expect(process.env.DB_USER).toBe("postgres");
    expect(process.env.DB_USER).toBe("dobregon_user");
  });

  test("shouldn't be undefined", () => {
    expect(process.env.DB_USER).toBeDefined();
  });
});

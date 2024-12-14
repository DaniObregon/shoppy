import firebaseConfig from "../../__mocks__/firebaseConfig";

jest.mock("firebase/app");
jest.mock("firebase/auth");

describe("Firebase Config", () => {
  test("Firebase config initializes correctly", () => {
    expect(firebaseConfig.apiKey).toBe("test-api-key");
  });
});

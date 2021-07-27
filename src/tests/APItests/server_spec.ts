import app from "../../server"
import supertest from "supertest"

describe("Test Endpoints /create", () => {
  it("should response error code 404 'Not Found'", (done) => {
    supertest(app).get("/create").expect(404, done);
  });
});
describe("Test Endpoints /products", () => {
  it("should response error code 404 'Not Found' if endpoint is provided incorrectly", (done) => {
    supertest(app).get("/product").expect(404, done);
  });
  it("should response ok code 200 if request is provided correctly", (done) => {
    supertest(app).get("/products").expect(200, done);
  });
});
describe("Test Endpoints /product/:id", () => {
  it("should response error code 400 if no product with same id is found", (done) => {
    supertest(app).get("/product/4").expect(400, done);
  });
  it("should response ok code 200 if product with same id is found", (done) => {
    supertest(app).get("/product/1").expect(200, done);
  });
});

describe("Test Endpoints /user/create", () => {
  it("should response error code 401 'Unauthorized'", (done) => {
    supertest(app).get("/user/create").expect(401, done);
  });
});
describe("Test Endpoints /authenticate", () => {
  it("should response error code 401 'Unauthorized'", (done) => {
    supertest(app).get("/authenticate").expect(401, done);
  });
});
describe("Test Endpoints /users", () => {
  it("should response error code 401 'Unauthorized'", (done) => {
    supertest(app).get("/users").expect(401, done);
  });
});
describe("Test Endpoints /user/:id", () => {
  it("should response error code 401 'Unauthorized'", (done) => {
    supertest(app).get("/user/1").expect(401, done);
  });
});

describe("Test Endpoints /order/create", () => {
  it("should response error code 401 'Not Found'", (done) => {
    supertest(app).get("/order/create").expect(404, done);
  });
});
describe("Test Endpoints /order/add-product", () => {
  it("should response error code 404 'Not Found'", (done) => {
    supertest(app).get("/order/add-product").expect(404, done);
  });
});
describe("Test Endpoints /order/user/:id", () => {
  it("should response error code 401 'Unauthorized'", (done) => {
    supertest(app).get("/order/user/1").expect(401, done);
  });
});
describe("Test Endpoints /order/complete/user/:id", () => {
    it("should response error code 401 'Unauthorized'", (done) => {
        supertest(app).get("/order/complete/user/1").expect(401, done);
    });
});

describe("Test Endpoints /products-by-category/:category", () => {
  it("should response error code 400", (done) => {
    supertest(app).get("/products-by-category/Desktop").expect(400, done);
  });
});
describe("Test Endpoints /top-five-products", () => {
  it("should response ok code 200", (done) => {
    supertest(app).get("/top-five-products").expect(200, done);
  });
});







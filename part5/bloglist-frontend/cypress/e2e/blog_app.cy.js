describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    // register test user
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "abaig",
      name: "Ali Baig",
      password: "baba",
    });
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    beforeEach(function () {});

    it("succeeds with correct credentials", function () {
      cy.get("#username").type("abaig");
      cy.get("#password").type("baba");
      cy.get("#login-button").click();

      // cy.login({ username: "abaig", password: "baba" });

      cy.contains("Ali Baig logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("abaig");
      cy.get("#password").type("ba");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "abaig", password: "baba" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#blogTitle").type("something something");
      cy.get("#blogAuthor").type("big shatter");
      cy.get("#blogUrl").type("http://localhost:3003");

      cy.get("#submitBlog").click();

      cy.contains("a new blog");
    });
  });
});

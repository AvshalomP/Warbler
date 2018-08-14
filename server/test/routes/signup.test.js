let { _postSignup, _propertiesExist, _removeTestUSerFromDb } = require("../helpers/authHelpers");

describe("auth route", () => {
    /*Testing suite for signup route*/
    describe("/signup route", () => {
        afterAll( (done) => {
            //_removeTestUSerFromDb({username: 'test'});
            done();
        });
        //test user signup
        test("should return object containing {id, token, username}", async () => {
            try {
                //make signup request
                let respBody = await _postSignup();
                let properties = ["id", "username", "token"];
                let hasAllProperties = _propertiesExist(respBody, properties);

                //assert
                expect(hasAllProperties).toBeTruthy();
            } catch(err) {
                    console.error(err.message);
                    expect(err.error).toBeUndefined();
            }
        });
        //test signup with existing user
        test("should return user already taken message", async () => {
            try {
                //make signup request
                let respBody = await _postSignup();
                expect(respBody.error).not.toBeUndefined();
            } catch(err) {  //should reach catch
                //assert
                expect(err.error.message).toBe("Sorry, that username and/or email is taken");
            }
        });
    });

});

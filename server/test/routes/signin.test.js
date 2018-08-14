let { _postSignin, _propertiesExist } = require("../helpers/authHelpers");

describe("auth route", () => {
    /*Testing suite for signin route*/
    describe("/signin route", () => {
        //test signin
        test("should return object containing {id, token, username}", async () => {
            try {
                let email = 'test@test.com';
                let password = 'pass';
                // // signup request to create a test user
                // await _postSignup();

                // signin request
                let respBody = await _postSignin(password, email);
                let properties = ["id", "username", "token"];
                let hasAllProperties = _propertiesExist(respBody, properties);

                //assert
                expect(hasAllProperties).toBeTruthy();
            } catch(err){
                console.error(err.message);
                //should not assert
                expect(err.error).toBeUndefined();
            }
        });
        //test signin with non existing user
        test("should return invalid email/password", async () => {
            try{
                let email = 'notExist@user.com';
                let password = 'pass';
                let respBody = await _postSignin(password, email);
                //should not assert
                expect(respBody.error).not.toBeUndefined();
            } catch (err) {
                //assert
                expect(err.error.message).toBe("Invalid Email/Password.");
            }
        });
    });

});

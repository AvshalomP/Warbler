let Request = require("request");

describe("auth route", () => {
    /*Testing signup route*/
    describe("/signup", () => { //testing signup
        let data = {};
        beforeAll( (done) => {
            let url = "http://localhost:8081/api/auth/signup";
            let headers = {'content-type' : 'application/json'};
            let username = Math.floor(Math.random()*10000);
            let body = JSON.stringify({username, password: 'pass', email: `${username}@test.com`});

            //make the request
            Request.post({headers, url, body}, (err, resp, body) => {
                if (err) {
                    return console.error(err);
                }

                data.status = resp.statusCode;
                data.body = JSON.parse(body);
                done();
            })
         });

        test("should return status code 200", () => {
            expect(data.status).toBe(200);
        });
        test("should return object containing {username, password, email}", () => {
            let hasAllProperties = true;
            let properties = ["id", "username", "token"];
            properties.forEach((key) => {
                if (!data.body.hasOwnProperty(key)) {
                    hasAllProperties = false;
                }
            });
            expect(hasAllProperties).toBeTruthy();
        });
        //     it("should return status code 400", () => {
        //         expect(data.status).toBe(400);
        //     });
        //     it("should return user already taken message", () => {
        //         expect(data.body.message).toBe("Sorry, that username and/or email is taken");
        //     })
    });

});

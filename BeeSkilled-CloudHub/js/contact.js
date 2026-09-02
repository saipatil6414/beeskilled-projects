const API_URL =
    "https://3ta4hphqoc.execute-api.ap-south-1.amazonaws.com/prod/contact";


const form =
    document.getElementById("contactForm");

const result =
    document.getElementById("result");


form.addEventListener("submit", async function(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !message) {

        result.innerText =
            "Please fill in all fields.";

        return;

    }


    result.innerText =
        "Submitting your message...";


    try {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })

            });


        const data =
            await response.json();


        let finalData = data;


        /*
         * Handles Lambda responses
         * wrapped inside API Gateway body.
         */

        if (typeof data.body === "string") {

            try {

                finalData =
                    JSON.parse(data.body);

            } catch (error) {

                finalData = data;

            }

        }


        if (
            response.ok &&
            (
                response.status === 200 ||
                data.statusCode === 200
            )
        ) {

            result.innerText =
                "✓ Message submitted successfully!";

            result.style.color =
                "#16a34a";

            form.reset();

        }

        else {

            result.innerText =
                finalData.message ||
                "Unable to submit message.";

            result.style.color =
                "#dc2626";

        }

    }

    catch (error) {

        console.error(
            "API Error:",
            error
        );

        result.innerText =
            "Unable to connect to AWS API.";

        result.style.color =
            "#dc2626";

    }

});
var Cipher = function (session) {
    var console = {
        log: function(msg) {},
        error: function(msg) {}
    }
    function setFontSize(newsize, selector) {
        try {
            document.querySelectorAll(selector).
             forEach((element) => {
                console.log(element)
                element.style.fontSize = newsize
             })
        } catch (e) {
            console.log("setting font size: " + e.toString())
        }
    }

    function adjustFontSize() {
        setFontSize("4em", "textarea")
        setFontSize("3.2em", "input")
        setFontSize("3em", ".button-label")
        document.querySelectorAll(".form-input").
         forEach((element) => {
            element.classList.add("more-margin");
         })
        // Get viewport dimensions
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;

        // Calculate screen size (you can use a standard size or retrieve actual screen size using media queries)
        var screenWidth = 1920; // Standard screen width
        var screenHeight = 1080; // Standard screen height
        // Example JavaScript for screen size detection
        if (window.innerWidth <= 1000) {
            // Phone
            // Calculate font size based on the ratio of screen to viewport dimensions
            var fontSize = Math.min(viewportWidth / screenWidth, viewportHeight / screenHeight) * 100;
            // Apply the calculated font size to the body element or any specific element you want to resize
            document.body.style.fontSize = fontSize + "%";
            setFontSize("4em", "textarea")
            setFontSize("3.2em", "input")
            setFontSize("3em", ".button-label")
            document.querySelectorAll(".form-input").
             forEach((element) => {
                element.classList.add("more-margin");
             })
        } else if (window.innerWidth > 600 && window.innerWidth <= 1024) {
            // Tablet
            // Calculate font size based on the ratio of screen to viewport dimensions
            var fontSize = Math.min(viewportWidth / screenWidth, viewportHeight / screenHeight) * 100;
            // Apply the calculated font size to the body element or any specific element you want to resize
            document.body.style.fontSize = fontSize + "%";
            setFontSize("4em", "textarea")
            setFontSize("3.2em", "input")
            setFontSize("3em", ".button-label")
            document.querySelectorAll(".form-input").
             forEach((element) => {
                element.classList.add("more-margin");
             })
        } else {
            // If viewport dimensions are smaller or equal to screen dimensions, reset font size to default
            document.body.style.fontSize = "100%";
            setFontSize("1em", "textarea")
            setFontSize("0.8em", "input")
            setFontSize("1em", ".button-label")
            document.querySelectorAll(".form-input").
             forEach((element) => {
                element.classList.remove("more-margin");
             })
        }
        console.log("adjusted font size.")
    }

    function getFormValues() {
        var form = document.getElementById("cipher-form");
        var data = {};
        for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            if ((element.tagName === "INPUT" || element.tagName === "TEXTAREA") && element.type !== "button") {
                data[element.name] = element.value;
            }
        }

        const formData = new URLSearchParams(data)
        console.log(formData.toString());

        return formData
    }

    function callCipher(operation) {
        console.log(operation + ":")
        const formData = getFormValues()
        formData.append("operation", operation)
        session.getAuthenticationCookie('#cipher-form', formData, (data) => {
            const response = JSON.parse(data)
            console.log("new response=[" + JSON.stringify(response, null, 2) + "]")
            const body = response.body
            for (var key in body) {
                if (body.hasOwnProperty(key)) {
                    var element = document.querySelector('[name="' + key + '"]')
                    if (element) {
                        element.value = body[key]
                    }
                }
            }
        })
    }

    // Call the adjustFontSize function when the window is resized
    window.addEventListener("resize", adjustFontSize);

    // Call the adjustFontSize function initially to set font size on page load
    adjustFontSize();

    document.addEventListener("DOMContentLoaded", function() {
        const buttons = [{
            id: "encrypt-operation",
            method: () => { callCipher("encrypt") }
        },{
            id: "decrypt-operation",
            method: () => { callCipher("decrypt") }
        }]
        function bindButton(index) {
            if (index < buttons.length) {
                const button = buttons[index]
                console.log("Bind: " + JSON.stringify(button))
                var element = document.getElementById(button.id);
                element.addEventListener('click', button.method);
                bindButton(index + 1)
            }
        }
        bindButton(0)
        document.querySelectorAll("button").
         forEach((element) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
            })
        })

        const textarea = document.getElementById('plaintextarea');
        textarea.focus();
        const key = "plaintext"
        const textelement = document.querySelector('[name="' + key + '"]')
        textelement.addEventListener("keydown", function(event) {
            console.log("keydown: code=[" + event.keyCode + "] key=[" + event.key + "]")
            const allowedkeys = [
                "Home", "End", "Insert", "Delete", "Backspace",
                "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "
            ]
            function testKey(index) {
                if (index < allowedkeys.length) {
                    if (allowedkeys[index] === event.key) {
                        return true
                    } else {
                        return testKey(index + 1)
                    }
                }
                return false
            }
            if (testKey(0)) {
                return
            } else
            var inputValue = event.key;
            if (/^[A-Z]$/.test(inputValue)) {
                return
            }
            if (/^[a-z]$/.test(inputValue)) {
                return
            }
            event.preventDefault()
        })
        textelement.addEventListener("input", function(event) {
            var inputValue = event.target.value;
            var lowercaseValue = inputValue.toLowerCase();
            textarea.value = lowercaseValue;
        });
    })

    return {
    }
}

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("secretkey");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}
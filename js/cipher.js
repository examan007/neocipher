var Cipher = function () {

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
        // Get viewport dimensions
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;

        // Calculate screen size (you can use a standard size or retrieve actual screen size using media queries)
        var screenWidth = 1920; // Standard screen width
        var screenHeight = 1080; // Standard screen height

        // Check if viewport dimensions are larger than screen dimensions
        if (viewportWidth > screenWidth || viewportHeight > screenHeight) {
            // Calculate font size based on the ratio of screen to viewport dimensions
            var fontSize = Math.min(viewportWidth / screenWidth, viewportHeight / screenHeight) * 100;
            // Apply the calculated font size to the body element or any specific element you want to resize
            document.body.style.fontSize = fontSize + "%";
            setFontSize("4em", "textarea")
            setFontSize("3em", "input")
            setFontSize("3em", ".button-label")
            document.querySelectorAll(".form-input").
             forEach((element) => {
                element.classList.add("more-margin");
             })
        } else {
            // If viewport dimensions are smaller or equal to screen dimensions, reset font size to default
            document.body.style.fontSize = "100%";
            setFontSize("1em", "textarea")
            setFontSize("0.75em", "input")
            setFontSize("1em", ".button-label")
            document.querySelectorAll(input).
             forEach((element) => {
                element.classList.remove("more-margin");
             })
        }
        console.log("adjusted font size.")
    }

    // Call the adjustFontSize function when the window is resized
    window.addEventListener("resize", adjustFontSize);

    // Call the adjustFontSize function initially to set font size on page load
    adjustFontSize();

    return {
    }

}
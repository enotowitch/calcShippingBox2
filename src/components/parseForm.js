export default function parseForm(e) {

    const arr = [];
    let form = {}; // Initialize the form object
    let inputCounter = 0; // Counter for tracking the number of inputs processed

    e.target.querySelectorAll("input").forEach((input) => {
        form = { ...form, [input.name]: Number(input.value) };
        inputCounter++;

        if (inputCounter === 3) {
            // Add the form to the array and reset the form object and input counter
            arr.push(form);
            form = {};
            inputCounter = 0;
        }
    });

    return arr
}

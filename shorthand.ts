// Type is not inferred when using index signature with method shorthand
// https://youtrack.jetbrains.com/issue/WEB-46779
// see shorthand.png

interface Dict {
    [key: string]: (x: number) => void;
}

const dict: Dict = {

    // type is not inferred
    one(x) {
        x.toLowerCase(); // expected error but no error
        x.toExponential(); // expected autocomplete but no it
    },

    // inferred
    two: (x) => {
        x.toLowerCase(); // error, ok
        x.toExponential(); // autocomplete, ok
    },
};

import { expect, test } from "vitest";
import rdct, { Redact } from "./rdct";

// no options
test("short string", () => {
  expect(rdct("foo")).toEqual("*****");
});
test("longer string", () => {
  expect(rdct("lorem ipsum")).toEqual("l*********m");
});
test("whole number", () => {
  expect(rdct(1234567)).toEqual("1*****7");
});
test("fractional number", () => {
  expect(rdct(123.456)).toEqual("1**.**6");
});
test("negative number", () => {
  expect(rdct(-987654)).toEqual("-9****4");
});
test("boolean true", () => {
  expect(rdct(true)).toEqual("*******");
});
test("boolean false", () => {
  expect(rdct(false)).toEqual("*******");
});
test("simple objects", () => {
  let obj = { foo: "bar", baz: "lorem ipsum" };
  let expected = { foo: "*****", baz: "l*********m" };
  let result = rdct(obj);
  expect(result).toMatchObject(expected);
});
test("nested objects", () => {
  let obj = { foo: { bar: "baz" } };
  let expected = { foo: { bar: "*****" } };
  let result = rdct(obj);
  expect(result).toMatchObject(expected);
});
test("null", () => {
  expect(rdct(null)).toEqual(null);
});
test("undefined", () => {
  expect(rdct(void 0)).toEqual(void 0);
});
test("array of short strings", () => {
  expect(rdct(["foo", "bar"])).toEqual(["*****", "*****"]);
});
test("array of longer strings", () => {
  expect(rdct(["lorem ipsum", "bacon ipsum"])).toEqual([
    "l*********m",
    "b*********m",
  ]);
});
test("array of whole numbers", () => {
  expect(rdct([1234567, 9876543])).toEqual(["1*****7", "9*****3"]);
});
test("array of fractional numbers", () => {
  expect(rdct([1234.567, 987.6543])).toEqual(["1***.**7", "9**.***3"]);
});
test("array of negative numbers", () => {
  expect(rdct([-1234567, -9876543])).toEqual(["-1*****7", "-9*****3"]);
});
test("array of boolean trues", () => {
  expect(rdct([true, true])).toEqual(["*******", "*******"]);
});
test("array of boolean falses", () => {
  expect(rdct([false, false])).toEqual(["*******", "*******"]);
});
test("array of nulls", () => {
  expect(rdct([null, null])).toEqual([null, null]);
});
test("array of undefineds", () => {
  expect(rdct([void 0, void 0])).toEqual([void 0, void 0]);
});
test("array of simple objects", () => {
  let input = [
    { foo: "bar", baz: "lorem ipsum" },
    { foo2: "bar2", baz2: "bacon ipsum" },
  ];
  let expected = [
    { foo: "*****", baz: "l*********m" },
    { foo2: "*****", baz2: "b*********m" },
  ];
  let result = rdct(input);
  expect(result).toEqual(expected);
});
test("array of nested objects", () => {
  let input = [{ foo: { bar: "baz" } }, { foo2: { bar: "bacon ipsum" } }];
  let expected = [{ foo: { bar: "*****" } }, { foo2: { bar: "b*********m" } }];
  let result = rdct(input);
  expect(result).toEqual(expected);
});
test("array of mixed types", () => {
  let input = ["foo", 1234567, { bar: "bacon ipsum" }, false];
  let expected = ["*****", "1*****7", { bar: "b*********m" }, "*******"];
  let result = rdct(input);
  expect(result).toEqual(expected);
});

// with `min` option (below default)
const rdctMinBelow: Redact = (input) => rdct(input, { min: 3 });
test("short string", () => {
  expect(rdctMinBelow("foo")).toEqual("f*o");
});
test("longer string", () => {
  expect(rdctMinBelow("lorem ipsum")).toEqual("l*********m");
});
test("whole number", () => {
  expect(rdctMinBelow(123)).toEqual("1*3");
});
test("fractional number", () => {
  expect(rdctMinBelow(123.456)).toEqual("1**.**6");
});
test("negative number", () => {
  expect(rdctMinBelow(-987654)).toEqual("-9****4");
});
test("boolean true", () => {
  expect(rdctMinBelow(true)).toEqual("*******");
});
test("boolean false", () => {
  expect(rdctMinBelow(false)).toEqual("*******");
});
test("simple objects", () => {
  let obj = { foo: "bar", baz: "lorem ipsum" };
  let expected = { foo: "b*r", baz: "l*********m" };
  let result = rdctMinBelow(obj);
  expect(result).toMatchObject(expected);
});
test("nested objects", () => {
  let obj = { foo: { bar: "baz" } };
  let expected = { foo: { bar: "b*z" } };
  let result = rdctMinBelow(obj);
  expect(result).toMatchObject(expected);
});
test("null", () => {
  expect(rdctMinBelow(null)).toEqual(null);
});
test("undefined", () => {
  expect(rdctMinBelow(void 0)).toEqual(void 0);
});
test("array of short strings", () => {
  expect(rdctMinBelow(["foo", "bar"])).toEqual(["f*o", "b*r"]);
});
test("array of longer strings", () => {
  expect(rdctMinBelow(["lorem ipsum", "bacon ipsum"])).toEqual([
    "l*********m",
    "b*********m",
  ]);
});
test("array of whole numbers", () => {
  expect(rdctMinBelow([1234567, 9876543])).toEqual(["1*****7", "9*****3"]);
});
test("array of fractional numbers", () => {
  expect(rdctMinBelow([1234.567, 987.6543])).toEqual(["1***.**7", "9**.***3"]);
});
test("array of negative numbers", () => {
  expect(rdctMinBelow([-1234567, -9876543])).toEqual(["-1*****7", "-9*****3"]);
});
test("array of boolean trues", () => {
  expect(rdctMinBelow([true, true])).toEqual(["*******", "*******"]);
});
test("array of boolean falses", () => {
  expect(rdctMinBelow([false, false])).toEqual(["*******", "*******"]);
});
test("array of nulls", () => {
  expect(rdctMinBelow([null, null])).toEqual([null, null]);
});
test("array of undefineds", () => {
  expect(rdctMinBelow([void 0, void 0])).toEqual([void 0, void 0]);
});
test("array of simple objects", () => {
  let input = [
    { foo: "bar", baz: "lorem ipsum" },
    { foo2: "bar2", baz2: "bacon ipsum" },
  ];
  let expected = [
    { foo: "b*r", baz: "l*********m" },
    { foo2: "b**2", baz2: "b*********m" },
  ];
  let result = rdctMinBelow(input);
  expect(result).toEqual(expected);
});
test("array of nested objects", () => {
  let input = [{ foo: { bar: "baz" } }, { foo2: { bar: "bacon ipsum" } }];
  let expected = [{ foo: { bar: "b*z" } }, { foo2: { bar: "b*********m" } }];
  let result = rdctMinBelow(input);
  expect(result).toEqual(expected);
});
test("array of mixed types", () => {
  let input = ["foo", 1234567, { bar: "bacon ipsum" }, false];
  let expected = ["f*o", "1*****7", { bar: "b*********m" }, "*******"];
  let result = rdctMinBelow(input);
  expect(result).toEqual(expected);
});

// with `min` option (above default)
const rdctMinAbove: Redact = (input) => rdct(input, { min: 10 });
test("short string", () => {
  expect(rdctMinAbove("foo")).toEqual("**********");
});
test("longer string", () => {
  expect(rdctMinAbove("lorem ipsum")).toEqual("l*********m");
});
test("whole number", () => {
  expect(rdctMinAbove(123)).toEqual("**********");
});
test("fractional number", () => {
  expect(rdctMinAbove(123.0456789)).toEqual("1**.******9");
});
test("negative number", () => {
  expect(rdctMinAbove(-9876543210)).toEqual("-9********0");
});
test("boolean true", () => {
  expect(rdctMinAbove(true)).toEqual("**********");
});
test("boolean false", () => {
  expect(rdctMinAbove(false)).toEqual("**********");
});
test("simple objects", () => {
  let obj = { foo: "bar", baz: "lorem ipsum" };
  let expected = { foo: "**********", baz: "l*********m" };
  let result = rdctMinAbove(obj);
  expect(result).toMatchObject(expected);
});
test("nested objects", () => {
  let obj = { foo: { bar: "baz" } };
  let expected = { foo: { bar: "**********" } };
  let result = rdctMinAbove(obj);
  expect(result).toMatchObject(expected);
});
test("null", () => {
  expect(rdctMinAbove(null)).toEqual(null);
});
test("undefined", () => {
  expect(rdctMinAbove(void 0)).toEqual(void 0);
});
test("array of short strings", () => {
  expect(rdctMinAbove(["foo", "bar"])).toEqual(["**********", "**********"]);
});
test("array of longer strings", () => {
  expect(rdctMinAbove(["lorem ipsum", "bacon ipsum"])).toEqual([
    "l*********m",
    "b*********m",
  ]);
});
test("array of whole numbers", () => {
  expect(rdctMinAbove([1234567, 987654321012])).toEqual([
    "**********",
    "9**********2",
  ]);
});
test("array of fractional numbers", () => {
  expect(rdctMinAbove([1234.5678901, 987.6543])).toEqual([
    "1***.******1",
    "**********",
  ]);
});
test("array of negative numbers", () => {
  expect(rdctMinAbove([-123, -9876543])).toEqual(["-*********", "-*********"]);
});
test("array of boolean trues", () => {
  expect(rdctMinAbove([true, true])).toEqual(["**********", "**********"]);
});
test("array of boolean falses", () => {
  expect(rdctMinAbove([false, false])).toEqual(["**********", "**********"]);
});
test("array of nulls", () => {
  expect(rdctMinAbove([null, null])).toEqual([null, null]);
});
test("array of undefineds", () => {
  expect(rdctMinAbove([void 0, void 0])).toEqual([void 0, void 0]);
});
test("array of simple objects", () => {
  let input = [
    { foo: "bar", baz: "lorem ipsum" },
    { foo2: "bar2", baz2: "bacon ipsum" },
  ];
  let expected = [
    { foo: "**********", baz: "l*********m" },
    { foo2: "**********", baz2: "b*********m" },
  ];
  let result = rdctMinAbove(input);
  expect(result).toEqual(expected);
});
test("array of nested objects", () => {
  let input = [{ foo: { bar: "baz" } }, { foo2: { bar: "bacon ipsum" } }];
  let expected = [
    { foo: { bar: "**********" } },
    { foo2: { bar: "b*********m" } },
  ];
  let result = rdctMinAbove(input);
  expect(result).toEqual(expected);
});
test("array of mixed types", () => {
  let input = ["foo", 1234567, { bar: "bacon ipsum" }, false];
  let expected = [
    "**********",
    "**********",
    { bar: "b*********m" },
    "**********",
  ];
  let result = rdctMinAbove(input);
  expect(result).toEqual(expected);
});

// with `includeType` option
const rdctIncludeType: Redact = (input) => rdct(input, { includeType: true });
test("short string", () => {
  expect(rdctIncludeType("foo")).toEqual("***** [String]");
});
test("longer string", () => {
  expect(rdctIncludeType("lorem ipsum")).toEqual("l*********m [String]");
});
test("whole number", () => {
  expect(rdctIncludeType(123)).toEqual("***** [Number]");
});
test("fractional number", () => {
  expect(rdctIncludeType(123.456)).toEqual("1**.**6 [Number]");
});
test("negative number", () => {
  expect(rdctIncludeType(-987654)).toEqual("-9****4 [Number]");
});
test("boolean true", () => {
  expect(rdctIncludeType(true)).toEqual("******* [Boolean]");
});
test("boolean false", () => {
  expect(rdctIncludeType(false)).toEqual("******* [Boolean]");
});
test("simple objects", () => {
  let obj = { foo: "bar", baz: "lorem ipsum" };
  let expected = { foo: "***** [String]", baz: "l*********m [String]" };
  let result = rdctIncludeType(obj);
  expect(result).toMatchObject(expected);
});
test("nested objects", () => {
  let obj = { foo: { bar: "baz" } };
  let expected = { foo: { bar: "***** [String]" } };
  let result = rdctIncludeType(obj);
  expect(result).toMatchObject(expected);
});
test("null", () => {
  expect(rdctIncludeType(null)).toEqual(null);
});
test("undefined", () => {
  expect(rdctIncludeType(void 0)).toEqual(void 0);
});
test("array of short strings", () => {
  expect(rdctIncludeType(["foo", "bar"])).toEqual([
    "***** [String]",
    "***** [String]",
  ]);
});
test("array of longer strings", () => {
  expect(rdctIncludeType(["lorem ipsum", "bacon ipsum"])).toEqual([
    "l*********m [String]",
    "b*********m [String]",
  ]);
});
test("array of whole numbers", () => {
  expect(rdctIncludeType([1234567, 9876543])).toEqual([
    "1*****7 [Number]",
    "9*****3 [Number]",
  ]);
});
test("array of fractional numbers", () => {
  expect(rdctIncludeType([1234.567, 987.6543])).toEqual([
    "1***.**7 [Number]",
    "9**.***3 [Number]",
  ]);
});
test("array of negative numbers", () => {
  expect(rdctIncludeType([-1234567, -9876543])).toEqual([
    "-1*****7 [Number]",
    "-9*****3 [Number]",
  ]);
});
test("array of boolean trues", () => {
  expect(rdctIncludeType([true, true])).toEqual([
    "******* [Boolean]",
    "******* [Boolean]",
  ]);
});
test("array of boolean falses", () => {
  expect(rdctIncludeType([false, false])).toEqual([
    "******* [Boolean]",
    "******* [Boolean]",
  ]);
});
test("array of nulls", () => {
  expect(rdctIncludeType([null, null])).toEqual([null, null]);
});
test("array of undefineds", () => {
  expect(rdctIncludeType([void 0, void 0])).toEqual([void 0, void 0]);
});
test("array of simple objects", () => {
  let input = [
    { foo: "bar", baz: "lorem ipsum" },
    { foo2: "bar2", baz2: "bacon ipsum" },
  ];
  let expected = [
    { foo: "***** [String]", baz: "l*********m [String]" },
    { foo2: "***** [String]", baz2: "b*********m [String]" },
  ];
  let result = rdctIncludeType(input);
  expect(result).toEqual(expected);
});
test("array of nested objects", () => {
  let input = [{ foo: { bar: "baz" } }, { foo2: { bar: "bacon ipsum" } }];
  let expected = [
    { foo: { bar: "***** [String]" } },
    { foo2: { bar: "b*********m [String]" } },
  ];
  let result = rdctIncludeType(input);
  expect(result).toEqual(expected);
});
test("array of mixed types", () => {
  let input = ["foo", 1234567, { bar: "bacon ipsum" }, false];
  let expected = [
    "***** [String]",
    "1*****7 [Number]",
    { bar: "b*********m [String]" },
    "******* [Boolean]",
  ];
  let result = rdctIncludeType(input);
  expect(result).toEqual(expected);
});

// with `char` option
const rdctChar: Redact = (input) => rdct(input, { char: "?" });
test("short string", () => {
  expect(rdctChar("foo")).toEqual("?????");
});
test("longer string", () => {
  expect(rdctChar("lorem ipsum")).toEqual("l?????????m");
});
test("whole number", () => {
  expect(rdctChar(123)).toEqual("?????");
});
test("fractional number", () => {
  expect(rdctChar(123.456)).toEqual("1??.??6");
});
test("negative number", () => {
  expect(rdctChar(-987654)).toEqual("-9????4");
});
test("boolean true", () => {
  expect(rdctChar(true)).toEqual("???????");
});
test("boolean false", () => {
  expect(rdctChar(false)).toEqual("???????");
});
test("simple objects", () => {
  let obj = { foo: "bar", baz: "lorem ipsum" };
  let expected = { foo: "?????", baz: "l?????????m" };
  let result = rdctChar(obj);
  expect(result).toMatchObject(expected);
});
test("nested objects", () => {
  let obj = { foo: { bar: "baz" } };
  let expected = { foo: { bar: "?????" } };
  let result = rdctChar(obj);
  expect(result).toMatchObject(expected);
});
test("null", () => {
  expect(rdctChar(null)).toEqual(null);
});
test("undefined", () => {
  expect(rdctChar(void 0)).toEqual(void 0);
});
test("array of short strings", () => {
  expect(rdctChar(["foo", "bar"])).toEqual(["?????", "?????"]);
});
test("array of longer strings", () => {
  expect(rdctChar(["lorem ipsum", "bacon ipsum"])).toEqual([
    "l?????????m",
    "b?????????m",
  ]);
});
test("array of whole numbers", () => {
  expect(rdctChar([1234567, 9876543])).toEqual(["1?????7", "9?????3"]);
});
test("array of fractional numbers", () => {
  expect(rdctChar([1234.567, 987.6543])).toEqual(["1???.??7", "9??.???3"]);
});
test("array of negative numbers", () => {
  expect(rdctChar([-1234567, -9876543])).toEqual(["-1?????7", "-9?????3"]);
});
test("array of boolean trues", () => {
  expect(rdctChar([true, true])).toEqual(["???????", "???????"]);
});
test("array of boolean falses", () => {
  expect(rdctChar([false, false])).toEqual(["???????", "???????"]);
});
test("array of nulls", () => {
  expect(rdctChar([null, null])).toEqual([null, null]);
});
test("array of undefineds", () => {
  expect(rdctChar([void 0, void 0])).toEqual([void 0, void 0]);
});
test("array of simple objects", () => {
  let input = [
    { foo: "bar", baz: "lorem ipsum" },
    { foo2: "bar2", baz2: "bacon ipsum" },
  ];
  let expected = [
    { foo: "?????", baz: "l?????????m" },
    { foo2: "?????", baz2: "b?????????m" },
  ];
  let result = rdctChar(input);
  expect(result).toEqual(expected);
});
test("array of nested objects", () => {
  let input = [{ foo: { bar: "baz" } }, { foo2: { bar: "bacon ipsum" } }];
  let expected = [{ foo: { bar: "?????" } }, { foo2: { bar: "b?????????m" } }];
  let result = rdctChar(input);
  expect(result).toEqual(expected);
});
test("array of mixed types", () => {
  let input = ["foo", 1234567, { bar: "bacon ipsum" }, false];
  let expected = ["?????", "1?????7", { bar: "b?????????m" }, "???????"];
  let result = rdctChar(input);
  expect(result).toEqual(expected);
});

// prevents abuse
test("does not allow negative `min`", () => {
  let input = "foo";
  let expected = "f*o";
  let result = rdct(input, { min: -3 });
  expect(result).toEqual(expected);
});

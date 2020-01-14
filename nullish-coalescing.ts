
console.log('Nullish coalescing demo: ', undefined ?? 'undefined is falsy'); // for ??, only null and undefined are falsy
console.log('Nullish coalescing demo: ', null ?? 'null is falsy');

console.log('Nullish coalescing demo: ', false ?? 'this won\'t print out'); // false is truthy for ??
console.log('Nullish coalescing demo: ', NaN ?? 'this won\'t print out'); // NaN is truthy for ??
console.log('Nullish coalescing demo: ', 0 ?? 'this won\'t print out'); // 0 is truthy for ??
console.log('Nullish coalescing demo: ', '' ?? 'this won\'t print out'); // empty string is truthy for ??
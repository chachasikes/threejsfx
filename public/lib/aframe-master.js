(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AFRAME = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(_dereq_,module,exports){
var str = Object.prototype.toString

module.exports = anArray

function anArray(arr) {
  return (
       arr.BYTES_PER_ELEMENT
    && str.call(arr.buffer) === '[object ArrayBuffer]'
    || Array.isArray(arr)
  )
}

},{}],2:[function(_dereq_,module,exports){
module.exports = function numtype(num, def) {
	return typeof num === 'number'
		? num
		: (typeof def === 'number' ? def : 0)
}
},{}],3:[function(_dereq_,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = ((uint8[i] << 16) & 0xFF0000) + ((uint8[i + 1] << 8) & 0xFF00) + (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],4:[function(_dereq_,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }

        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            head.appendChild(style);
        } else if (style.styleSheet) { // for IE8 and below
            head.appendChild(style);
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            head.appendChild(style);
        }
    }
};

},{}],5:[function(_dereq_,module,exports){
var Buffer = _dereq_('buffer').Buffer; // for use with browserify

module.exports = function (a, b) {
    if (!Buffer.isBuffer(a)) return undefined;
    if (!Buffer.isBuffer(b)) return undefined;
    if (typeof a.equals === 'function') return a.equals(b);
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
};

},{"buffer":6}],6:[function(_dereq_,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = _dereq_('base64-js')
var ieee754 = _dereq_('ieee754')
var isArray = _dereq_('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"base64-js":3,"ieee754":16,"isarray":21}],7:[function(_dereq_,module,exports){
// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

(function() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    var ce = new window.CustomEvent('test', { cancelable: true });
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
      // IE has problems with .preventDefault() on custom events
      // http://stackoverflow.com/questions/23349191
      throw new Error('Could not prevent default');
    }
  } catch (e) {
    var CustomEvent = function(event, params) {
      var evt, origPrevent;
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };

      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );
      origPrevent = evt.preventDefault;
      evt.preventDefault = function() {
        origPrevent.call(this);
        try {
          Object.defineProperty(this, 'defaultPrevented', {
            get: function() {
              return true;
            }
          });
        } catch (e) {
          this.defaultPrevented = true;
        }
      };
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent; // expose definition to window
  }
})();

},{}],8:[function(_dereq_,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = _dereq_('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ');

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"./debug":9}],9:[function(_dereq_,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{}],10:[function(_dereq_,module,exports){
'use strict';
var isObj = _dereq_('is-obj');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Sources cannot be null or undefined');
	}

	return Object(val);
}

function assignKey(to, from, key) {
	var val = from[key];

	if (val === undefined || val === null) {
		return;
	}

	if (hasOwnProperty.call(to, key)) {
		if (to[key] === undefined || to[key] === null) {
			throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
		}
	}

	if (!hasOwnProperty.call(to, key) || !isObj(val)) {
		to[key] = val;
	} else {
		to[key] = assign(Object(to[key]), from[key]);
	}
}

function assign(to, from) {
	if (to === from) {
		return to;
	}

	from = Object(from);

	for (var key in from) {
		if (hasOwnProperty.call(from, key)) {
			assignKey(to, from, key);
		}
	}

	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(from);

		for (var i = 0; i < symbols.length; i++) {
			if (propIsEnumerable.call(from, symbols[i])) {
				assignKey(to, from, symbols[i]);
			}
		}
	}

	return to;
}

module.exports = function deepAssign(target) {
	target = toObject(target);

	for (var s = 1; s < arguments.length; s++) {
		assign(target, arguments[s]);
	}

	return target;
};

},{"is-obj":20}],11:[function(_dereq_,module,exports){
/*! (C) WebReflection Mit Style License */
(function(t,n,r,i){"use strict";function st(e,t){for(var n=0,r=e.length;n<r;n++)gt(e[n],t)}function ot(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],it(r,w[at(r)])}function ut(e){return function(t){F(t)&&(gt(t,e),st(t.querySelectorAll(E),e))}}function at(e){var t=R.call(e,"is"),n=e.nodeName.toUpperCase(),r=x.call(b,t?m+t.toUpperCase():v+n);return t&&-1<r&&!ft(n,t)?-1:r}function ft(e,t){return-1<E.indexOf(e+'[is="'+t+'"]')}function lt(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target;Y&&(!i||i===t)&&t.attributeChangedCallback&&r!=="style"&&e.prevValue!==e.newValue&&t.attributeChangedCallback(r,n===e[f]?null:e.prevValue,n===e[c]?null:e.newValue)}function ct(e){var t=ut(e);return function(e){$.push(t,e.target)}}function ht(e){G&&(G=!1,e.currentTarget.removeEventListener(p,ht)),st((e.target||n).querySelectorAll(E),e.detail===u?u:o),j&&vt()}function pt(e,t){var n=this;U.call(n,e,t),Z.call(n,{target:n})}function dt(e,t){P(e,t),nt?nt.observe(e,X):(Q&&(e.setAttribute=pt,e[s]=tt(e),e.addEventListener(d,Z)),e.addEventListener(h,lt)),e.createdCallback&&Y&&(e.created=!0,e.createdCallback(),e.created=!1)}function vt(){for(var e,t=0,n=I.length;t<n;t++)e=I[t],S.contains(e)||(n--,I.splice(t--,1),gt(e,u))}function mt(e){throw new Error("A "+e+" type is already registered")}function gt(e,t){var n,r=at(e);-1<r&&(rt(e,w[r]),r=0,t===o&&!e[o]?(e[u]=!1,e[o]=!0,r=1,j&&x.call(I,e)<0&&I.push(e)):t===u&&!e[u]&&(e[o]=!1,e[u]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(i in n)return;var s="__"+i+(Math.random()*1e5>>0),o="attached",u="detached",a="extends",f="ADDITION",l="MODIFICATION",c="REMOVAL",h="DOMAttrModified",p="DOMContentLoaded",d="DOMSubtreeModified",v="<",m="=",g=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,y=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],b=[],w=[],E="",S=n.documentElement,x=b.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},T=r.prototype,N=T.hasOwnProperty,C=T.isPrototypeOf,k=r.defineProperty,L=r.getOwnPropertyDescriptor,A=r.getOwnPropertyNames,O=r.getPrototypeOf,M=r.setPrototypeOf,_=!!r.__proto__,D=r.create||function yt(e){return e?(yt.prototype=e,new yt):this},P=M||(_?function(e,t){return e.__proto__=t,e}:A&&L?function(){function e(e,t){for(var n,r=A(t),i=0,s=r.length;i<s;i++)n=r[i],N.call(e,n)||k(e,n,L(t,n))}return function(t,n){do e(t,n);while((n=O(n))&&!C.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),H=t.MutationObserver||t.WebKitMutationObserver,B=(t.HTMLElement||t.Element||t.Node).prototype,j=!C.call(B,S),F=j?function(e){return e.nodeType===1}:function(e){return C.call(B,e)},I=j&&[],q=B.cloneNode,R=B.getAttribute,U=B.setAttribute,z=B.removeAttribute,W=n.createElement,X=H&&{attributes:!0,characterData:!0,attributeOldValue:!0},V=H||function(e){Q=!1,S.removeEventListener(h,V)},$,J=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,10)},K=!1,Q=!0,G=!0,Y=!0,Z,et,tt,nt,rt,it;M||_?(rt=function(e,t){C.call(t,e)||dt(e,t)},it=dt):(rt=function(e,t){e[s]||(e[s]=r(!0),dt(e,t))},it=rt),j?(Q=!1,function(){var t=L(B,"addEventListener"),n=t.value,r=function(e){var t=new CustomEvent(h,{bubbles:!0});t.attrName=e,t.prevValue=R.call(this,e),t.newValue=null,t[c]=t.attrChange=2,z.call(this,e),this.dispatchEvent(t)},i=function(t,n){var r=this.hasAttribute(t),i=r&&R.call(this,t);e=new CustomEvent(h,{bubbles:!0}),U.call(this,t,n),e.attrName=t,e.prevValue=r?i:null,e.newValue=n,r?e[l]=e.attrChange=1:e[f]=e.attrChange=0,this.dispatchEvent(e)},o=function(e){var t=e.currentTarget,n=t[s],r=e.propertyName,i;n.hasOwnProperty(r)&&(n=n[r],i=new CustomEvent(h,{bubbles:!0}),i.attrName=n.name,i.prevValue=n.value||null,i.newValue=n.value=t[r]||null,i.prevValue==null?i[f]=i.attrChange=0:i[l]=i.attrChange=1,t.dispatchEvent(i))};t.value=function(e,t,u){e===h&&this.attributeChangedCallback&&this.setAttribute!==i&&(this[s]={className:{name:"class",value:this.className}},this.setAttribute=i,this.removeAttribute=r,n.call(this,"propertychange",o)),n.call(this,e,t,u)},k(B,"addEventListener",t)}()):H||(S.addEventListener(h,V),S.setAttribute(s,1),S.removeAttribute(s),Q&&(Z=function(e){var t=this,n,r,i;if(t===e.target){n=t[s],t[s]=r=tt(t);for(i in r){if(!(i in n))return et(0,t,i,n[i],r[i],f);if(r[i]!==n[i])return et(1,t,i,n[i],r[i],l)}for(i in n)if(!(i in r))return et(2,t,i,n[i],r[i],c)}},et=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,lt(o)},tt=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),n[i]=function(t,r){c=t.toUpperCase(),K||(K=!0,H?(nt=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new H(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Y&&s.attributeChangedCallback&&i.attributeName!=="style"&&(o=R.call(s,i.attributeName),o!==i.oldValue&&s.attributeChangedCallback(i.attributeName,i.oldValue,o)))})}(ut(o),ut(u)),nt.observe(n,{childList:!0,subtree:!0})):($=[],J(function d(){while($.length)$.shift().call(null,$.shift());J(d)}),n.addEventListener("DOMNodeInserted",ct(o)),n.addEventListener("DOMNodeRemoved",ct(u))),n.addEventListener(p,ht),n.addEventListener("readystatechange",ht),n.createElement=function(e,t){var r=W.apply(n,arguments),i=""+e,s=x.call(b,(t?m:v)+(t||i).toUpperCase()),o=-1<s;return t&&(r.setAttribute("is",t=t.toLowerCase()),o&&(o=ft(i.toUpperCase(),t))),Y=!n.createElement.innerHTMLHelper,o&&it(r,w[s]),r},B.cloneNode=function(e){var t=q.call(this,!!e),n=at(t);return-1<n&&it(t,w[n]),e&&ot(t.querySelectorAll(E)),t}),-2<x.call(b,m+c)+x.call(b,v+c)&&mt(t);if(!g.test(c)||-1<x.call(y,c))throw new Error("The type "+t+" is invalid");var i=function(){return f?n.createElement(l,c):n.createElement(l)},s=r||T,f=N.call(s,a),l=f?r[a].toUpperCase():c,c,h;return f&&-1<x.call(b,v+l)&&mt(l),h=b.push((f?m:v)+c)-1,E=E.concat(E.length?",":"",f?l+'[is="'+t.toLowerCase()+'"]':l),i.prototype=w[h]=N.call(s,"prototype")?s.prototype:D(B),st(n.querySelectorAll(E),o),i}})(window,document,Object,"registerElement");
},{}],12:[function(_dereq_,module,exports){
module.exports = function(dtype) {
  switch (dtype) {
    case 'int8':
      return Int8Array
    case 'int16':
      return Int16Array
    case 'int32':
      return Int32Array
    case 'uint8':
      return Uint8Array
    case 'uint16':
      return Uint16Array
    case 'uint32':
      return Uint32Array
    case 'float32':
      return Float32Array
    case 'float64':
      return Float64Array
    case 'array':
      return Array
    case 'uint8_clamped':
      return Uint8ClampedArray
  }
}

},{}],13:[function(_dereq_,module,exports){
/*eslint new-cap:0*/
var dtype = _dereq_('dtype')
module.exports = flattenVertexData
function flattenVertexData (data, output, offset) {
  if (!data) throw new TypeError('must specify data as first parameter')
  offset = +(offset || 0) | 0

  if (Array.isArray(data) && Array.isArray(data[0])) {
    var dim = data[0].length
    var length = data.length * dim

    // no output specified, create a new typed array
    if (!output || typeof output === 'string') {
      output = new (dtype(output || 'float32'))(length + offset)
    }

    var dstLength = output.length - offset
    if (length !== dstLength) {
      throw new Error('source length ' + length + ' (' + dim + 'x' + data.length + ')' +
        ' does not match destination length ' + dstLength)
    }

    for (var i = 0, k = offset; i < data.length; i++) {
      for (var j = 0; j < dim; j++) {
        output[k++] = data[i][j]
      }
    }
  } else {
    if (!output || typeof output === 'string') {
      // no output, create a new one
      var Ctor = dtype(output || 'float32')
      if (offset === 0) {
        output = new Ctor(data)
      } else {
        output = new Ctor(data.length + offset)
        output.set(data, offset)
      }
    } else {
      // store output in existing array
      output.set(data, offset)
    }
  }

  return output
}

},{"dtype":12}],14:[function(_dereq_,module,exports){
var isFunction = _dereq_('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }

    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":19}],15:[function(_dereq_,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],16:[function(_dereq_,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],17:[function(_dereq_,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],18:[function(_dereq_,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],19:[function(_dereq_,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],20:[function(_dereq_,module,exports){
'use strict';
module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};

},{}],21:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],22:[function(_dereq_,module,exports){
var wordWrap = _dereq_('word-wrapper')
var xtend = _dereq_('xtend')
var number = _dereq_('as-number')

var X_HEIGHTS = ['x', 'e', 'a', 'o', 'n', 's', 'r', 'c', 'u', 'm', 'v', 'w', 'z']
var M_WIDTHS = ['m', 'w']
var CAP_HEIGHTS = ['H', 'I', 'N', 'E', 'F', 'K', 'L', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


var TAB_ID = '\t'.charCodeAt(0)
var SPACE_ID = ' '.charCodeAt(0)
var ALIGN_LEFT = 0,
    ALIGN_CENTER = 1,
    ALIGN_RIGHT = 2

module.exports = function createLayout(opt) {
  return new TextLayout(opt)
}

function TextLayout(opt) {
  this.glyphs = []
  this._measure = this.computeMetrics.bind(this)
  this.update(opt)
}

TextLayout.prototype.update = function(opt) {
  opt = xtend({
    measure: this._measure
  }, opt)
  this._opt = opt
  this._opt.tabSize = number(this._opt.tabSize, 4)

  if (!opt.font)
    throw new Error('must provide a valid bitmap font')

  var glyphs = this.glyphs
  var text = opt.text||''
  var font = opt.font
  this._setupSpaceGlyphs(font)

  var lines = wordWrap.lines(text, opt)
  var minWidth = opt.width || 0

  //clear glyphs
  glyphs.length = 0

  //get max line width
  var maxLineWidth = lines.reduce(function(prev, line) {
    return Math.max(prev, line.width, minWidth)
  }, 0)

  //the pen position
  var x = 0
  var y = 0
  var lineHeight = number(opt.lineHeight, font.common.lineHeight)
  var baseline = font.common.base
  var descender = lineHeight-baseline
  var letterSpacing = opt.letterSpacing || 0
  var height = lineHeight * lines.length - descender
  var align = getAlignType(this._opt.align)

  //draw text along baseline
  y -= height

  //the metrics for this text layout
  this._width = maxLineWidth
  this._height = height
  this._descender = lineHeight - baseline
  this._baseline = baseline
  this._xHeight = getXHeight(font)
  this._capHeight = getCapHeight(font)
  this._lineHeight = lineHeight
  this._ascender = lineHeight - descender - this._xHeight

  //layout each glyph
  var self = this
  lines.forEach(function(line, lineIndex) {
    var start = line.start
    var end = line.end
    var lineWidth = line.width
    var lastGlyph

    //for each glyph in that line...
    for (var i=start; i<end; i++) {
      var id = text.charCodeAt(i)
      var glyph = self.getGlyph(font, id)
      if (glyph) {
        if (lastGlyph)
          x += getKerning(font, lastGlyph.id, glyph.id)

        var tx = x
        if (align === ALIGN_CENTER)
          tx += (maxLineWidth-lineWidth)/2
        else if (align === ALIGN_RIGHT)
          tx += (maxLineWidth-lineWidth)

        glyphs.push({
          position: [tx, y],
          data: glyph,
          index: i,
          line: lineIndex
        })

        //move pen forward
        x += glyph.xadvance + letterSpacing
        lastGlyph = glyph
      }
    }

    //next line down
    y += lineHeight
    x = 0
  })
  this._linesTotal = lines.length;
}

TextLayout.prototype._setupSpaceGlyphs = function(font) {
  //These are fallbacks, when the font doesn't include
  //' ' or '\t' glyphs
  this._fallbackSpaceGlyph = null
  this._fallbackTabGlyph = null

  if (!font.chars || font.chars.length === 0)
    return

  //try to get space glyph
  //then fall back to the 'm' or 'w' glyphs
  //then fall back to the first glyph available
  var space = getGlyphById(font, SPACE_ID)
          || getMGlyph(font)
          || font.chars[0]

  //and create a fallback for tab
  var tabWidth = this._opt.tabSize * space.xadvance
  this._fallbackSpaceGlyph = space
  this._fallbackTabGlyph = xtend(space, {
    x: 0, y: 0, xadvance: tabWidth, id: TAB_ID,
    xoffset: 0, yoffset: 0, width: 0, height: 0
  })
}

TextLayout.prototype.getGlyph = function(font, id) {
  var glyph = getGlyphById(font, id)
  if (glyph)
    return glyph
  else if (id === TAB_ID)
    return this._fallbackTabGlyph
  else if (id === SPACE_ID)
    return this._fallbackSpaceGlyph
  return null
}

TextLayout.prototype.computeMetrics = function(text, start, end, width) {
  var letterSpacing = this._opt.letterSpacing || 0
  var font = this._opt.font
  var curPen = 0
  var curWidth = 0
  var count = 0
  var glyph
  var lastGlyph

  if (!font.chars || font.chars.length === 0) {
    return {
      start: start,
      end: start,
      width: 0
    }
  }

  end = Math.min(text.length, end)
  for (var i=start; i < end; i++) {
    var id = text.charCodeAt(i)
    var glyph = this.getGlyph(font, id)

    if (glyph) {
      //move pen forward
      var xoff = glyph.xoffset
      var kern = lastGlyph ? getKerning(font, lastGlyph.id, glyph.id) : 0
      curPen += kern

      var nextPen = curPen + glyph.xadvance + letterSpacing
      var nextWidth = curPen + glyph.width

      //we've hit our limit; we can't move onto the next glyph
      if (nextWidth >= width || nextPen >= width)
        break

      //otherwise continue along our line
      curPen = nextPen
      curWidth = nextWidth
      lastGlyph = glyph
    }
    count++
  }

  //make sure rightmost edge lines up with rendered glyphs
  if (lastGlyph)
    curWidth += lastGlyph.xoffset

  return {
    start: start,
    end: start + count,
    width: curWidth
  }
}

//getters for the private vars
;['width', 'height',
  'descender', 'ascender',
  'xHeight', 'baseline',
  'capHeight',
  'lineHeight' ].forEach(addGetter)

function addGetter(name) {
  Object.defineProperty(TextLayout.prototype, name, {
    get: wrapper(name),
    configurable: true
  })
}

//create lookups for private vars
function wrapper(name) {
  return (new Function([
    'return function '+name+'() {',
    '  return this._'+name,
    '}'
  ].join('\n')))()
}

function getGlyphById(font, id) {
  if (!font.chars || font.chars.length === 0)
    return null

  var glyphIdx = findChar(font.chars, id)
  if (glyphIdx >= 0)
    return font.chars[glyphIdx]
  return null
}

function getXHeight(font) {
  for (var i=0; i<X_HEIGHTS.length; i++) {
    var id = X_HEIGHTS[i].charCodeAt(0)
    var idx = findChar(font.chars, id)
    if (idx >= 0)
      return font.chars[idx].height
  }
  return 0
}

function getMGlyph(font) {
  for (var i=0; i<M_WIDTHS.length; i++) {
    var id = M_WIDTHS[i].charCodeAt(0)
    var idx = findChar(font.chars, id)
    if (idx >= 0)
      return font.chars[idx]
  }
  return 0
}

function getCapHeight(font) {
  for (var i=0; i<CAP_HEIGHTS.length; i++) {
    var id = CAP_HEIGHTS[i].charCodeAt(0)
    var idx = findChar(font.chars, id)
    if (idx >= 0)
      return font.chars[idx].height
  }
  return 0
}

function getKerning(font, left, right) {
  if (!font.kernings || font.kernings.length === 0)
    return 0

  var table = font.kernings
  for (var i=0; i<table.length; i++) {
    var kern = table[i]
    if (kern.first === left && kern.second === right)
      return kern.amount
  }
  return 0
}

function getAlignType(align) {
  if (align === 'center')
    return ALIGN_CENTER
  else if (align === 'right')
    return ALIGN_RIGHT
  return ALIGN_LEFT
}

function findChar (array, value, start) {
  start = start || 0
  for (var i = start; i < array.length; i++) {
    if (array[i].id === value) {
      return i
    }
  }
  return -1
}
},{"as-number":2,"word-wrapper":47,"xtend":50}],23:[function(_dereq_,module,exports){
(function (Buffer){
var xhr = _dereq_('xhr')
var noop = function(){}
var parseASCII = _dereq_('parse-bmfont-ascii')
var parseXML = _dereq_('parse-bmfont-xml')
var readBinary = _dereq_('parse-bmfont-binary')
var isBinaryFormat = _dereq_('./lib/is-binary')
var xtend = _dereq_('xtend')

var xml2 = (function hasXML2() {
  return self.XMLHttpRequest && "withCredentials" in new XMLHttpRequest
})()

module.exports = function(opt, cb) {
  cb = typeof cb === 'function' ? cb : noop

  if (typeof opt === 'string')
    opt = { uri: opt }
  else if (!opt)
    opt = {}

  var expectBinary = opt.binary
  if (expectBinary)
    opt = getBinaryOpts(opt)

  xhr(opt, function(err, res, body) {
    if (err)
      return cb(err)
    if (!/^2/.test(res.statusCode))
      return cb(new Error('http status code: '+res.statusCode))
    if (!body)
      return cb(new Error('no body result'))

    var binary = false

    //if the response type is an array buffer,
    //we need to convert it into a regular Buffer object
    if (isArrayBuffer(body)) {
      var array = new Uint8Array(body)
      body = new Buffer(array, 'binary')
    }

    //now check the string/Buffer response
    //and see if it has a binary BMF header
    if (isBinaryFormat(body)) {
      binary = true
      //if we have a string, turn it into a Buffer
      if (typeof body === 'string')
        body = new Buffer(body, 'binary')
    }

    //we are not parsing a binary format, just ASCII/XML/etc
    if (!binary) {
      //might still be a buffer if responseType is 'arraybuffer'
      if (Buffer.isBuffer(body))
        body = body.toString(opt.encoding)
      body = body.trim()
    }

    var result
    try {
      var type = res.headers['content-type']
      if (binary)
        result = readBinary(body)
      else if (/json/.test(type) || body.charAt(0) === '{')
        result = JSON.parse(body)
      else if (/xml/.test(type)  || body.charAt(0) === '<')
        result = parseXML(body)
      else
        result = parseASCII(body)
    } catch (e) {
      cb(new Error('error parsing font '+e.message))
      cb = noop
    }
    cb(null, result)
  })
}

function isArrayBuffer(arr) {
  var str = Object.prototype.toString
  return str.call(arr) === '[object ArrayBuffer]'
}

function getBinaryOpts(opt) {
  //IE10+ and other modern browsers support array buffers
  if (xml2)
    return xtend(opt, { responseType: 'arraybuffer' })

  if (typeof self.XMLHttpRequest === 'undefined')
    throw new Error('your browser does not support XHR loading')

  //IE9 and XML1 browsers could still use an override
  var req = new self.XMLHttpRequest()
  req.overrideMimeType('text/plain; charset=x-user-defined')
  return xtend({
    xhr: req
  }, opt)
}

}).call(this,_dereq_("buffer").Buffer)

},{"./lib/is-binary":24,"buffer":6,"parse-bmfont-ascii":26,"parse-bmfont-binary":27,"parse-bmfont-xml":28,"xhr":48,"xtend":50}],24:[function(_dereq_,module,exports){
(function (Buffer){
var equal = _dereq_('buffer-equal')
var HEADER = new Buffer([66, 77, 70, 3])

module.exports = function(buf) {
  if (typeof buf === 'string')
    return buf.substring(0, 3) === 'BMF'
  return buf.length > 4 && equal(buf.slice(0, 4), HEADER)
}
}).call(this,_dereq_("buffer").Buffer)

},{"buffer":6,"buffer-equal":5}],25:[function(_dereq_,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],26:[function(_dereq_,module,exports){
module.exports = function parseBMFontAscii(data) {
  if (!data)
    throw new Error('no data provided')
  data = data.toString().trim()

  var output = {
    pages: [],
    chars: [],
    kernings: []
  }

  var lines = data.split(/\r\n?|\n/g)

  if (lines.length === 0)
    throw new Error('no data in BMFont file')

  for (var i = 0; i < lines.length; i++) {
    var lineData = splitLine(lines[i], i)
    if (!lineData) //skip empty lines
      continue

    if (lineData.key === 'page') {
      if (typeof lineData.data.id !== 'number')
        throw new Error('malformed file at line ' + i + ' -- needs page id=N')
      if (typeof lineData.data.file !== 'string')
        throw new Error('malformed file at line ' + i + ' -- needs page file="path"')
      output.pages[lineData.data.id] = lineData.data.file
    } else if (lineData.key === 'chars' || lineData.key === 'kernings') {
      //... do nothing for these two ...
    } else if (lineData.key === 'char') {
      output.chars.push(lineData.data)
    } else if (lineData.key === 'kerning') {
      output.kernings.push(lineData.data)
    } else {
      output[lineData.key] = lineData.data
    }
  }

  return output
}

function splitLine(line, idx) {
  line = line.replace(/\t+/g, ' ').trim()
  if (!line)
    return null

  var space = line.indexOf(' ')
  if (space === -1)
    throw new Error("no named row at line " + idx)

  var key = line.substring(0, space)

  line = line.substring(space + 1)
  //clear "letter" field as it is non-standard and
  //requires additional complexity to parse " / = symbols
  line = line.replace(/letter=[\'\"]\S+[\'\"]/gi, '')
  line = line.split("=")
  line = line.map(function(str) {
    return str.trim().match((/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g))
  })

  var data = []
  for (var i = 0; i < line.length; i++) {
    var dt = line[i]
    if (i === 0) {
      data.push({
        key: dt[0],
        data: ""
      })
    } else if (i === line.length - 1) {
      data[data.length - 1].data = parseData(dt[0])
    } else {
      data[data.length - 1].data = parseData(dt[0])
      data.push({
        key: dt[1],
        data: ""
      })
    }
  }

  var out = {
    key: key,
    data: {}
  }

  data.forEach(function(v) {
    out.data[v.key] = v.data;
  })

  return out
}

function parseData(data) {
  if (!data || data.length === 0)
    return ""

  if (data.indexOf('"') === 0 || data.indexOf("'") === 0)
    return data.substring(1, data.length - 1)
  if (data.indexOf(',') !== -1)
    return parseIntList(data)
  return parseInt(data, 10)
}

function parseIntList(data) {
  return data.split(',').map(function(val) {
    return parseInt(val, 10)
  })
}
},{}],27:[function(_dereq_,module,exports){
var HEADER = [66, 77, 70]

module.exports = function readBMFontBinary(buf) {
  if (buf.length < 6)
    throw new Error('invalid buffer length for BMFont')

  var header = HEADER.every(function(byte, i) {
    return buf.readUInt8(i) === byte
  })

  if (!header)
    throw new Error('BMFont missing BMF byte header')

  var i = 3
  var vers = buf.readUInt8(i++)
  if (vers > 3)
    throw new Error('Only supports BMFont Binary v3 (BMFont App v1.10)')

  var target = { kernings: [], chars: [] }
  for (var b=0; b<5; b++)
    i += readBlock(target, buf, i)
  return target
}

function readBlock(target, buf, i) {
  if (i > buf.length-1)
    return 0

  var blockID = buf.readUInt8(i++)
  var blockSize = buf.readInt32LE(i)
  i += 4

  switch(blockID) {
    case 1:
      target.info = readInfo(buf, i)
      break
    case 2:
      target.common = readCommon(buf, i)
      break
    case 3:
      target.pages = readPages(buf, i, blockSize)
      break
    case 4:
      target.chars = readChars(buf, i, blockSize)
      break
    case 5:
      target.kernings = readKernings(buf, i, blockSize)
      break
  }
  return 5 + blockSize
}

function readInfo(buf, i) {
  var info = {}
  info.size = buf.readInt16LE(i)

  var bitField = buf.readUInt8(i+2)
  info.smooth = (bitField >> 7) & 1
  info.unicode = (bitField >> 6) & 1
  info.italic = (bitField >> 5) & 1
  info.bold = (bitField >> 4) & 1

  //fixedHeight is only mentioned in binary spec
  if ((bitField >> 3) & 1)
    info.fixedHeight = 1

  info.charset = buf.readUInt8(i+3) || ''
  info.stretchH = buf.readUInt16LE(i+4)
  info.aa = buf.readUInt8(i+6)
  info.padding = [
    buf.readInt8(i+7),
    buf.readInt8(i+8),
    buf.readInt8(i+9),
    buf.readInt8(i+10)
  ]
  info.spacing = [
    buf.readInt8(i+11),
    buf.readInt8(i+12)
  ]
  info.outline = buf.readUInt8(i+13)
  info.face = readStringNT(buf, i+14)
  return info
}

function readCommon(buf, i) {
  var common = {}
  common.lineHeight = buf.readUInt16LE(i)
  common.base = buf.readUInt16LE(i+2)
  common.scaleW = buf.readUInt16LE(i+4)
  common.scaleH = buf.readUInt16LE(i+6)
  common.pages = buf.readUInt16LE(i+8)
  var bitField = buf.readUInt8(i+10)
  common.packed = 0
  common.alphaChnl = buf.readUInt8(i+11)
  common.redChnl = buf.readUInt8(i+12)
  common.greenChnl = buf.readUInt8(i+13)
  common.blueChnl = buf.readUInt8(i+14)
  return common
}

function readPages(buf, i, size) {
  var pages = []
  var text = readNameNT(buf, i)
  var len = text.length+1
  var count = size / len
  for (var c=0; c<count; c++) {
    pages[c] = buf.slice(i, i+text.length).toString('utf8')
    i += len
  }
  return pages
}

function readChars(buf, i, blockSize) {
  var chars = []

  var count = blockSize / 20
  for (var c=0; c<count; c++) {
    var char = {}
    var off = c*20
    char.id = buf.readUInt32LE(i + 0 + off)
    char.x = buf.readUInt16LE(i + 4 + off)
    char.y = buf.readUInt16LE(i + 6 + off)
    char.width = buf.readUInt16LE(i + 8 + off)
    char.height = buf.readUInt16LE(i + 10 + off)
    char.xoffset = buf.readInt16LE(i + 12 + off)
    char.yoffset = buf.readInt16LE(i + 14 + off)
    char.xadvance = buf.readInt16LE(i + 16 + off)
    char.page = buf.readUInt8(i + 18 + off)
    char.chnl = buf.readUInt8(i + 19 + off)
    chars[c] = char
  }
  return chars
}

function readKernings(buf, i, blockSize) {
  var kernings = []
  var count = blockSize / 10
  for (var c=0; c<count; c++) {
    var kern = {}
    var off = c*10
    kern.first = buf.readUInt32LE(i + 0 + off)
    kern.second = buf.readUInt32LE(i + 4 + off)
    kern.amount = buf.readInt16LE(i + 8 + off)
    kernings[c] = kern
  }
  return kernings
}

function readNameNT(buf, offset) {
  var pos=offset
  for (; pos<buf.length; pos++) {
    if (buf[pos] === 0x00)
      break
  }
  return buf.slice(offset, pos)
}

function readStringNT(buf, offset) {
  return readNameNT(buf, offset).toString('utf8')
}
},{}],28:[function(_dereq_,module,exports){
var parseAttributes = _dereq_('./parse-attribs')
var parseFromString = _dereq_('xml-parse-from-string')

//In some cases element.attribute.nodeName can return
//all lowercase values.. so we need to map them to the correct
//case
var NAME_MAP = {
  scaleh: 'scaleH',
  scalew: 'scaleW',
  stretchh: 'stretchH',
  lineheight: 'lineHeight',
  alphachnl: 'alphaChnl',
  redchnl: 'redChnl',
  greenchnl: 'greenChnl',
  bluechnl: 'blueChnl'
}

module.exports = function parse(data) {
  data = data.toString()

  var xmlRoot = parseFromString(data)
  var output = {
    pages: [],
    chars: [],
    kernings: []
  }

  //get config settings
  ;['info', 'common'].forEach(function(key) {
    var element = xmlRoot.getElementsByTagName(key)[0]
    if (element)
      output[key] = parseAttributes(getAttribs(element))
  })

  //get page info
  var pageRoot = xmlRoot.getElementsByTagName('pages')[0]
  if (!pageRoot)
    throw new Error('malformed file -- no <pages> element')
  var pages = pageRoot.getElementsByTagName('page')
  for (var i=0; i<pages.length; i++) {
    var p = pages[i]
    var id = parseInt(p.getAttribute('id'), 10)
    var file = p.getAttribute('file')
    if (isNaN(id))
      throw new Error('malformed file -- page "id" attribute is NaN')
    if (!file)
      throw new Error('malformed file -- needs page "file" attribute')
    output.pages[parseInt(id, 10)] = file
  }

  //get kernings / chars
  ;['chars', 'kernings'].forEach(function(key) {
    var element = xmlRoot.getElementsByTagName(key)[0]
    if (!element)
      return
    var childTag = key.substring(0, key.length-1)
    var children = element.getElementsByTagName(childTag)
    for (var i=0; i<children.length; i++) {
      var child = children[i]
      output[key].push(parseAttributes(getAttribs(child)))
    }
  })
  return output
}

function getAttribs(element) {
  var attribs = getAttribList(element)
  return attribs.reduce(function(dict, attrib) {
    var key = mapName(attrib.nodeName)
    dict[key] = attrib.nodeValue
    return dict
  }, {})
}

function getAttribList(element) {
  //IE8+ and modern browsers
  var attribs = []
  for (var i=0; i<element.attributes.length; i++)
    attribs.push(element.attributes[i])
  return attribs
}

function mapName(nodeName) {
  return NAME_MAP[nodeName.toLowerCase()] || nodeName
}
},{"./parse-attribs":29,"xml-parse-from-string":49}],29:[function(_dereq_,module,exports){
//Some versions of GlyphDesigner have a typo
//that causes some bugs with parsing.
//Need to confirm with recent version of the software
//to see whether this is still an issue or not.
var GLYPH_DESIGNER_ERROR = 'chasrset'

module.exports = function parseAttributes(obj) {
  if (GLYPH_DESIGNER_ERROR in obj) {
    obj['charset'] = obj[GLYPH_DESIGNER_ERROR]
    delete obj[GLYPH_DESIGNER_ERROR]
  }

  for (var k in obj) {
    if (k === 'face' || k === 'charset')
      continue
    else if (k === 'padding' || k === 'spacing')
      obj[k] = parseIntList(obj[k])
    else
      obj[k] = parseInt(obj[k], 10)
  }
  return obj
}

function parseIntList(data) {
  return data.split(',').map(function(val) {
    return parseInt(val, 10)
  })
}
},{}],30:[function(_dereq_,module,exports){
var trim = _dereq_('trim')
  , forEach = _dereq_('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":14,"trim":45}],31:[function(_dereq_,module,exports){
(function (global){
var performance = global.performance || {};

var present = (function () {
  var names = ['now', 'webkitNow', 'msNow', 'mozNow', 'oNow'];
  while (names.length) {
    var name = names.shift();
    if (name in performance) {
      return performance[name].bind(performance);
    }
  }

  var dateNow = Date.now || function () { return new Date().getTime(); };
  var navigationStart = (performance.timing || {}).navigationStart || dateNow();
  return function () {
    return dateNow() - navigationStart;
  };
}());

present.performanceNow = performance.now;
present.noConflict = function () {
  performance.now = present.performanceNow;
};
present.conflict = function () {
  performance.now = present;
};
present.conflict();

module.exports = present;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],32:[function(_dereq_,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],33:[function(_dereq_,module,exports){
(function(root) {

	// Store setTimeout reference so promise-polyfill will be unaffected by
	// other code modifying setTimeout (like sinon.useFakeTimers())
	var setTimeoutFunc = setTimeout;

	// Use polyfill for setImmediate for performance gains
	var asap = (typeof setImmediate === 'function' && setImmediate) ||
		function(fn) { setTimeoutFunc(fn, 1); };

	// Polyfill for Function.prototype.bind
	function bind(fn, thisArg) {
		return function() {
			fn.apply(thisArg, arguments);
		}
	}

	var isArray = Array.isArray || function(value) { return Object.prototype.toString.call(value) === "[object Array]" };

	function Promise(fn) {
		if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
		if (typeof fn !== 'function') throw new TypeError('not a function');
		this._state = null;
		this._value = null;
		this._deferreds = []

		doResolve(fn, bind(resolve, this), bind(reject, this))
	}

	function handle(deferred) {
		var me = this;
		if (this._state === null) {
			this._deferreds.push(deferred);
			return
		}
		asap(function() {
			var cb = me._state ? deferred.onFulfilled : deferred.onRejected
			if (cb === null) {
				(me._state ? deferred.resolve : deferred.reject)(me._value);
				return;
			}
			var ret;
			try {
				ret = cb(me._value);
			}
			catch (e) {
				deferred.reject(e);
				return;
			}
			deferred.resolve(ret);
		})
	}

	function resolve(newValue) {
		try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
			if (newValue === this) throw new TypeError('A promise cannot be resolved with itself.');
			if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
				var then = newValue.then;
				if (typeof then === 'function') {
					doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
					return;
				}
			}
			this._state = true;
			this._value = newValue;
			finale.call(this);
		} catch (e) { reject.call(this, e); }
	}

	function reject(newValue) {
		this._state = false;
		this._value = newValue;
		finale.call(this);
	}

	function finale() {
		for (var i = 0, len = this._deferreds.length; i < len; i++) {
			handle.call(this, this._deferreds[i]);
		}
		this._deferreds = null;
	}

	function Handler(onFulfilled, onRejected, resolve, reject){
		this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
		this.onRejected = typeof onRejected === 'function' ? onRejected : null;
		this.resolve = resolve;
		this.reject = reject;
	}

	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, onFulfilled, onRejected) {
		var done = false;
		try {
			fn(function (value) {
				if (done) return;
				done = true;
				onFulfilled(value);
			}, function (reason) {
				if (done) return;
				done = true;
				onRejected(reason);
			})
		} catch (ex) {
			if (done) return;
			done = true;
			onRejected(ex);
		}
	}

	Promise.prototype['catch'] = function (onRejected) {
		return this.then(null, onRejected);
	};

	Promise.prototype.then = function(onFulfilled, onRejected) {
		var me = this;
		return new Promise(function(resolve, reject) {
			handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
		})
	};

	Promise.all = function () {
		var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);

		return new Promise(function (resolve, reject) {
			if (args.length === 0) return resolve([]);
			var remaining = args.length;
			function res(i, val) {
				try {
					if (val && (typeof val === 'object' || typeof val === 'function')) {
						var then = val.then;
						if (typeof then === 'function') {
							then.call(val, function (val) { res(i, val) }, reject);
							return;
						}
					}
					args[i] = val;
					if (--remaining === 0) {
						resolve(args);
					}
				} catch (ex) {
					reject(ex);
				}
			}
			for (var i = 0; i < args.length; i++) {
				res(i, args[i]);
			}
		});
	};

	Promise.resolve = function (value) {
		if (value && typeof value === 'object' && value.constructor === Promise) {
			return value;
		}

		return new Promise(function (resolve) {
			resolve(value);
		});
	};

	Promise.reject = function (value) {
		return new Promise(function (resolve, reject) {
			reject(value);
		});
	};

	Promise.race = function (values) {
		return new Promise(function (resolve, reject) {
			for(var i = 0, len = values.length; i < len; i++) {
				values[i].then(resolve, reject);
			}
		});
	};

	/**
	 * Set the immediate function to execute callbacks
	 * @param fn {function} Function to execute
	 * @private
	 */
	Promise._setImmediateFn = function _setImmediateFn(fn) {
		asap = fn;
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Promise;
	} else if (!root.Promise) {
		root.Promise = Promise;
	}

})(this);

},{}],34:[function(_dereq_,module,exports){
var dtype = _dereq_('dtype')
var anArray = _dereq_('an-array')
var isBuffer = _dereq_('is-buffer')

var CW = [0, 2, 3]
var CCW = [2, 1, 3]

module.exports = function createQuadElements(array, opt) {
    //if user didn't specify an output array
    if (!array || !(anArray(array) || isBuffer(array))) {
        opt = array || {}
        array = null
    }

    if (typeof opt === 'number') //backwards-compatible
        opt = { count: opt }
    else
        opt = opt || {}

    var type = typeof opt.type === 'string' ? opt.type : 'uint16'
    var count = typeof opt.count === 'number' ? opt.count : 1
    var start = (opt.start || 0)

    var dir = opt.clockwise !== false ? CW : CCW,
        a = dir[0],
        b = dir[1],
        c = dir[2]

    var numIndices = count * 6

    var indices = array || new (dtype(type))(numIndices)
    for (var i = 0, j = 0; i < numIndices; i += 6, j += 4) {
        var x = i + start
        indices[x + 0] = j + 0
        indices[x + 1] = j + 1
        indices[x + 2] = j + 2
        indices[x + 3] = j + a
        indices[x + 4] = j + b
        indices[x + 5] = j + c
    }
    return indices
}
},{"an-array":1,"dtype":12,"is-buffer":18}],35:[function(_dereq_,module,exports){
/*
 * anime.js v3.0.0
 * (c) 2019 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

'use strict';

// Defaults

var defaultInstanceSettings = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: 'normal',
  autoplay: true,
  timelineOffset: 0
};

var defaultTweenSettings = {
  duration: 1000,
  delay: 0,
  endDelay: 0,
  easing: 'easeOutElastic(1, .5)',
  round: 0
};

var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective'];

// Caching

var cache = {
  CSS: {},
  springs: {}
};

// Utils

function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

function applyArguments(func, args) {
  return func.apply(null, args);
}

var hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
var rgbPrefixRegex = /^rgb/;
var hslRegex = /^hsl/;

var is = {
  arr: function (a) { return Array.isArray(a); },
  obj: function (a) { return stringContains(Object.prototype.toString.call(a), 'Object'); },
  pth: function (a) { return is.obj(a) && a.hasOwnProperty('totalLength'); },
  svg: function (a) { return a instanceof SVGElement; },
  inp: function (a) { return a instanceof HTMLInputElement; },
  dom: function (a) { return a.nodeType || is.svg(a); },
  str: function (a) { return typeof a === 'string'; },
  fnc: function (a) { return typeof a === 'function'; },
  und: function (a) { return typeof a === 'undefined'; },
  hex: function (a) { return hexRegex.test(a); },
  rgb: function (a) { return rgbPrefixRegex.test(a); },
  hsl: function (a) { return hslRegex.test(a); },
  col: function (a) { return (is.hex(a) || is.rgb(a) || is.hsl(a)); },
  key: function (a) { return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes'; }
};

// Easings

var easingFunctionRegex = /\(([^)]+)\)/;

function parseEasingParameters(string) {
  var match = easingFunctionRegex.exec(string);
  return match ? match[1].split(',').map(function (p) { return parseFloat(p); }) : [];
}

// Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js

function spring(string, duration) {

  var params = parseEasingParameters(string);
  var mass = minMax(is.und(params[0]) ? 1 : params[0], .1, 100);
  var stiffness = minMax(is.und(params[1]) ? 100 : params[1], .1, 100);
  var damping = minMax(is.und(params[2]) ? 10 : params[2], .1, 100);
  var velocity =  minMax(is.und(params[3]) ? 0 : params[3], .1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a = 1;
  var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

  function solver(t) {
    var progress = duration ? (duration * t) / 1000 : t;
    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a + b * progress) * Math.exp(-progress * w0);
    }
    if (t === 0 || t === 1) { return t; }
    return 1 - progress;
  }

  function getDuration() {
    var cached = cache.springs[string];
    if (cached) { return cached; }
    var frame = 1/6;
    var elapsed = 0;
    var rest = 0;
    while(true) {
      elapsed += frame;
      if (solver(elapsed) === 1) {
        rest++;
        if (rest >= 16) { break; }
      } else {
        rest = 0;
      }
    }
    var duration = elapsed * frame * 1000;
    cache.springs[string] = duration;
    return duration;
  }

  return duration ? solver : getDuration;

}

// Elastic easing adapted from jQueryUI http://api.jqueryui.com/easings/

function elastic(amplitude, period) {
  if ( amplitude === void 0 ) amplitude = 1;
  if ( period === void 0 ) period = .5;

  var a = minMax(amplitude, 1, 10);
  var p = minMax(period, .1, 2);
  return function (t) {
    return (t === 0 || t === 1) ? t :
      -a * Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2) * Math.asin(1 / a))) * (Math.PI * 2)) / p);
  }
}

// Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function

function steps(steps) {
  if ( steps === void 0 ) steps = 10;

  return function (t) { return Math.round(t * steps) * (1 / steps); };
}

// BezierEasing https://github.com/gre/bezier-easing

var bezier = (function () {

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1 }
  function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1 }
  function C(aA1)      { return 3.0 * aA1 }

  function calcBezier(aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT }
  function getSlope(aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1) }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) { aB = currentT; } else { aA = currentT; }
    } while (Math.abs(currentX) > 0.0000001 && ++i < 10);
    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < 4; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) { return aGuessT; }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  function bezier(mX1, mY1, mX2, mY2) {

    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) { return; }
    var sampleValues = new Float32Array(kSplineTableSize);

    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function getTForX(aX) {

      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }

      --currentSample;

      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);

      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }

    }

    return function (x) {
      if (mX1 === mY1 && mX2 === mY2) { return x; }
      if (x === 0 || x === 1) { return x; }
      return calcBezier(getTForX(x), mY1, mY2);
    }

  }

  return bezier;

})();

var penner = (function () {

  var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Sine', 'Expo', 'Circ', 'Back', 'Elastic'];

  // Approximated Penner equations http://matthewlein.com/ceaser/

  var curves = {
    In: [
      [0.550, 0.085, 0.680, 0.530], /* inQuad */
      [0.550, 0.055, 0.675, 0.190], /* inCubic */
      [0.895, 0.030, 0.685, 0.220], /* inQuart */
      [0.755, 0.050, 0.855, 0.060], /* inQuint */
      [0.470, 0.000, 0.745, 0.715], /* inSine */
      [0.950, 0.050, 0.795, 0.035], /* inExpo */
      [0.600, 0.040, 0.980, 0.335], /* inCirc */
      [0.600,-0.280, 0.735, 0.045], /* inBack */
      elastic /* inElastic */
    ],
    Out: [
      [0.250, 0.460, 0.450, 0.940], /* outQuad */
      [0.215, 0.610, 0.355, 1.000], /* outCubic */
      [0.165, 0.840, 0.440, 1.000], /* outQuart */
      [0.230, 1.000, 0.320, 1.000], /* outQuint */
      [0.390, 0.575, 0.565, 1.000], /* outSine */
      [0.190, 1.000, 0.220, 1.000], /* outExpo */
      [0.075, 0.820, 0.165, 1.000], /* outCirc */
      [0.175, 0.885, 0.320, 1.275], /* outBack */
      function (a, p) { return function (t) { return 1 - elastic(a, p)(1 - t); }; } /* outElastic */
    ],
    InOut: [
      [0.455, 0.030, 0.515, 0.955], /* inOutQuad */
      [0.645, 0.045, 0.355, 1.000], /* inOutCubic */
      [0.770, 0.000, 0.175, 1.000], /* inOutQuart */
      [0.860, 0.000, 0.070, 1.000], /* inOutQuint */
      [0.445, 0.050, 0.550, 0.950], /* inOutSine */
      [1.000, 0.000, 0.000, 1.000], /* inOutExpo */
      [0.785, 0.135, 0.150, 0.860], /* inOutCirc */
      [0.680,-0.550, 0.265, 1.550], /* inOutBack */
      function (a, p) { return function (t) { return t < .5 ? elastic(a, p)(t * 2) / 2 : 1 - elastic(a, p)(t * -2 + 2) / 2; }; } /* inOutElastic */
    ]
  };

  var eases = {
    linear: [0.250, 0.250, 0.750, 0.750]
  };

  for (var coords in curves) {
    for (var i = 0, len = curves[coords].length; i < len; i++) {
      eases['ease'+coords+names[i]] = curves[coords][i];
    }
  }

  return eases;

})();

function parseEasings(easing, duration) {
  if (is.fnc(easing)) { return easing; }
  var name = easing.split('(')[0];
  var ease = penner[name];
  var args = parseEasingParameters(easing);
  switch (name) {
    case 'spring' : return spring(easing, duration);
    case 'cubicBezier' : return applyArguments(bezier, args);
    case 'steps' : return applyArguments(steps, args);
    default : return is.fnc(ease) ? applyArguments(ease, args) : applyArguments(bezier, ease);
  }
}

// Strings

function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch(e) {
    return;
  }
}

// Arrays

var auxArrayFilter = [];

function filterArray(arr, callback) {
  var result = auxArrayFilter;

  var len = arr.length;
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  for (var i = 0; i < len; i++) {
    if (i in arr) {
      var val = arr[i];
      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }

  // arr turns into the auxArray and we return the previously aux array.
  auxArrayFilter = arr;
  auxArrayFilter.length = 0;
  return result;
}

var auxArrayFlatten = [];

function flattenArray(arr) {
  if (!arr.length) { return arr; }

  var result = auxArrayFlatten;
  var node = arr.pop();

  do {
    if (node.constructor === Array) {
      for (var i = 0; i < node.length; i++) {
        arr.push(node[i]);
      }
    } else {
      result.push(node);
    }
  } while (arr.length && (node = arr.pop()) !== undefined);

  result.reverse();  // Reverse result to restore the original order.

  // arr turns into the auxArray and we return the previously aux array.
  auxArrayFlatten = arr;
  auxArrayFilter.length = 0;
  return result;
}

function toArray(o) {
  if (is.arr(o)) { return o; }
  if (is.str(o)) { o = selectString(o) || o; }
  if (o instanceof NodeList || o instanceof HTMLCollection) { return [].slice.call(o); }
  return [o];
}

function arrayContains(arr, val) {
  return arr.some(function (a) { return a === val; });
}

// Objects

function cloneObject(o) {
  var clone = {};
  for (var p in o) { clone[p] = o[p]; }
  return clone;
}

function replaceObjectProps(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o1) { o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p]; }
  return o;
}

function mergeObjects(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o2) { o[p] = is.und(o1[p]) ? o2[p] : o1[p]; }
  return o;
}

// Colors

var rgbRegex = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g;

function rgbToRgba(rgbValue) {
  var rgb = rgbRegex.exec(rgbValue);
  return rgb ? ("rgba(" + (rgb[1]) + ",1)") : rgbValue;
}

var hexToRgbaHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
var hexToRgbaRgbRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

function hexToRgba(hexValue) {
  var hex = hexValue.replace(hexToRgbaHexRegex, function (m, r, g, b) { return r + r + g + g + b + b; } );
  var rgb = hexToRgbaRgbRegex.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return ("rgba(" + r + "," + g + "," + b + ",1)");
}

var hslToRgbaHsl1Regex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
var hslToRgbaHsl2Regex = /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g;

function hslToRgba(hslValue) {
  var hsl = hslToRgbaHsl1Regex.exec(hslValue) || hslToRgbaHsl2Regex.exec(hslValue);
  var h = parseInt(hsl[1], 10) / 360;
  var s = parseInt(hsl[2], 10) / 100;
  var l = parseInt(hsl[3], 10) / 100;
  var a = hsl[4] || 1;
  function hue2rgb(p, q, t) {
    if (t < 0) { t += 1; }
    if (t > 1) { t -= 1; }
    if (t < 1/6) { return p + (q - p) * 6 * t; }
    if (t < 1/2) { return q; }
    if (t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
    return p;
  }
  var r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return ("rgba(" + (r * 255) + "," + (g * 255) + "," + (b * 255) + "," + a + ")");
}

function colorToRgb(val) {
  if (is.rgb(val)) { return rgbToRgba(val); }
  if (is.hex(val)) { return hexToRgba(val); }
  if (is.hsl(val)) { return hslToRgba(val); }
}

// Units

var unitRegex = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/;

function getUnit(val) {
  var split = unitRegex.exec(val);
  if (split) { return split[2]; }
}

function getTransformUnit(propName) {
  if (stringContains(propName, 'translate') || propName === 'perspective') { return 'px'; }
  if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) { return 'deg'; }
}

// Values

function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) { return val; }
  return val(animatable.target, animatable.id, animatable.total);
}

function getAttribute(el, prop) {
  return el.getAttribute(prop);
}

function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, 'deg', 'rad', 'turn'], valueUnit)) { return value; }
  var cached = cache.CSS[value + unit];
  if (!is.und(cached)) { return cached; }
  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl = (el.parentNode && (el.parentNode !== document)) ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = 'absolute';
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}

function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || '0';
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}

function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (getAttribute(el, prop) || (is.svg(el) && el[prop]))) { return 'attribute'; }
  if (is.dom(el) && arrayContains(validTransforms, prop)) { return 'transform'; }
  if (is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) { return 'css'; }
  if (el[prop] != null) { return 'object'; }
}

var transformRegex = /(\w+)\(([^)]*)\)/g;

function getElementTransforms(el) {
  if (!is.dom(el)) { return; }
  var str = el.style.transform || '';
  var transforms = new Map();
  var m; while (m = transformRegex.exec(str)) { transforms.set(m[1], m[2]); }
  return transforms;
}

function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + getTransformUnit(propName);
  var value = getElementTransforms(el).get(propName) || defaultVal;
  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms['last'] = propName;
  }
  return unit ? convertPxToUnit(el, value, unit) : value;
}

function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case 'transform': return getTransformValue(target, propName, animatable, unit);
    case 'css': return getCSSValue(target, propName, unit);
    case 'attribute': return getAttribute(target, propName);
    default: return target[propName] || 0;
  }
}

var operatorRegex = /^(\*=|\+=|-=)/;

function getRelativeValue(to, from) {
  var operator = operatorRegex.exec(to);
  if (!operator) { return to; }
  var u = getUnit(to) || 0;
  var x = parseFloat(from);
  var y = parseFloat(to.replace(operator[0], ''));
  switch (operator[0][0]) {
    case '+': return x + y + u;
    case '-': return x - y + u;
    case '*': return x * y + u;
  }
}

var whitespaceRegex = /\s/g;

function validateValue(val, unit) {
  if (is.col(val)) { return colorToRgb(val); }
  var originalUnit = getUnit(val);
  var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  return unit && !whitespaceRegex.test(val) ? unitLess + unit : unitLess;
}

// getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
// adapted from https://gist.github.com/SebLambla/3e0550c496c236709744

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, 'r');
}

function getRectLength(el) {
  return (getAttribute(el, 'width') * 2) + (getAttribute(el, 'height') * 2);
}

function getLineLength(el) {
  return getDistance(
    {x: getAttribute(el, 'x1'), y: getAttribute(el, 'y1')},
    {x: getAttribute(el, 'x2'), y: getAttribute(el, 'y2')}
  );
}

function getPolylineLength(el) {
  var points = el.points;
  var totalLength = 0;
  var previousPos;
  for (var i = 0 ; i < points.numberOfItems; i++) {
    var currentPos = points.getItem(i);
    if (i > 0) { totalLength += getDistance(previousPos, currentPos); }
    previousPos = currentPos;
  }
  return totalLength;
}

function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}

// Path animation

function getTotalLength(el) {
  if (el.getTotalLength) { return el.getTotalLength(); }
  switch(el.tagName.toLowerCase()) {
    case 'circle': return getCircleLength(el);
    case 'rect': return getRectLength(el);
    case 'line': return getLineLength(el);
    case 'polyline': return getPolylineLength(el);
    case 'polygon': return getPolygonLength(el);
  }
}

function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
}

// Motion path

function getParentSvgEl(el) {
  var parentEl = el.parentNode;
  while (is.svg(parentEl)) {
    parentEl = parentEl.parentNode;
    if (!is.svg(parentEl.parentNode)) { break; }
  }
  return parentEl;
}

function getParentSvg(pathEl, svgData) {
  var svg = svgData || {};
  var parentSvgEl = svg.el || getParentSvgEl(pathEl);
  var rect = parentSvgEl.getBoundingClientRect();
  var viewBoxAttr = getAttribute(parentSvgEl, 'viewBox');
  var width = rect.width;
  var height = rect.height;
  var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(' ') : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox: viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width / viewBox[2],
    h: height / viewBox[3]
  }
}

function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path;
  var p = percent || 100;
  return function(property) {
    return {
      property: property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p / 100)
    }
  }
}

function getPathProgress(path, progress) {
  function point(offset) {
    if ( offset === void 0 ) offset = 0;

    var l = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l);
  }
  var svg = getParentSvg(path.el, path.svg);
  var p = point();
  var p0 = point(-1);
  var p1 = point(+1);
  switch (path.property) {
    case 'x': return (p.x - svg.x) * svg.w;
    case 'y': return (p.y - svg.y) * svg.h;
    case 'angle': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
}

// Decompose value

var valueRegex = /-?\d*\.?\d+/g;

function decomposeValue(val, unit) {
  var value = validateValue((is.pth(val) ? val.totalLength : val), unit) + '';
  return {
    original: value,
    numbers: value.match(valueRegex) ? value.match(valueRegex).map(Number) : [0],
    strings: (is.str(val) || unit) ? value.split(valueRegex) : []
  }
}

// Animatables

function parseTargets(targets) {
  var targetsArray = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
  return filterArray(targetsArray, function (item, pos, self) { return self.indexOf(item) === pos; });
}

function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function (t, i) {
    return {target: t, id: i, total: parsed.length, transforms: { list: getElementTransforms(t) } };
  });
}

// Properties

var springRegex = /^spring/;

function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings);
  // Override duration if easing is a spring
  if (springRegex.test(settings.easing)) { settings.duration = spring(settings.easing); }
  if (is.arr(prop)) {
    var l = prop.length;
    var isFromTo = (l === 2 && !is.obj(prop[0]));
    if (!isFromTo) {
      // Duration divided by the number of tweens
      if (!is.fnc(tweenSettings.duration)) { settings.duration = tweenSettings.duration / l; }
    } else {
      // Transform [from, to] values shorthand to a valid tween value
      prop = {value: prop};
    }
  }
  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function (v, i) {
    var obj = (is.obj(v) && !is.pth(v)) ? v : {value: v};
    // Default delay value should only be applied to the first tween
    if (is.und(obj.delay)) { obj.delay = !i ? tweenSettings.delay : 0; }
    // Default endDelay value should only be applied to the last tween
    if (is.und(obj.endDelay)) { obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0; }
    return obj;
  }).map(function (k) { return mergeObjects(k, settings); });
}


function flattenKeyframes(keyframes) {
  var propertyNames = filterArray(flattenArray(keyframes.map(function (key) { return Object.keys(key); })), function (p) { return is.key(p); })
  .reduce(function (a,b) { if (a.indexOf(b) < 0) { a.push(b); } return a; }, []);
  var properties = {};
  var loop = function ( i ) {
    var propName = propertyNames[i];
    properties[propName] = keyframes.map(function (key) {
      var newKey = {};
      for (var p in key) {
        if (is.key(p)) {
          if (p == propName) { newKey.value = key[p]; }
        } else {
          newKey[p] = key[p];
        }
      }
      return newKey;
    });
  };

  for (var i = 0; i < propertyNames.length; i++) loop( i );
  return properties;
}

function getProperties(tweenSettings, params) {
  var properties = [];
  var keyframes = params.keyframes;
  if (keyframes) { params = mergeObjects(flattenKeyframes(keyframes), params); }
  for (var p in params) {
    if (is.key(p)) {
      properties.push({
        name: p,
        tweens: normalizePropertyTweens(params[p], tweenSettings)
      });
    }
  }
  return properties;
}

// Tweens

function normalizeTweenValues(tween, animatable) {
  var t = {};
  for (var p in tween) {
    var value = getFunctionValue(tween[p], animatable);
    if (is.arr(value)) {
      value = value.map(function (v) { return getFunctionValue(v, animatable); });
      if (value.length === 1) { value = value[0]; }
    }
    t[p] = value;
  }
  t.duration = parseFloat(t.duration);
  t.delay = parseFloat(t.delay);
  return t;
}

function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function (t) {
    var tween = normalizeTweenValues(t, animatable);
    var tweenValue = tween.value;
    var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    var toUnit = getUnit(to);
    var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    var previousValue = previousTween ? previousTween.to.original : originalValue;
    var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    var fromUnit = getUnit(from) || getUnit(originalValue);
    var unit = toUnit || fromUnit;
    if (is.und(to)) { to = previousValue; }
    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isColor = is.col(tween.from.original);
    if (tween.isColor) { tween.round = 1; }
    previousTween = tween;
    return tween;
  });
}

// Tween progress

var setProgressValue = {
  css: function (t, p, v) { return t.style[p] = v; },
  attribute: function (t, p, v) { return t.setAttribute(p, v); },
  object: function (t, p, v) { return t[p] = v; },
  transform: function (t, p, v, transforms, manual) {
    transforms.list.set(p, v);
    if (p === transforms.last || manual) {
      var str = '';
      transforms.list.forEach(function (value, prop) { str += prop + "(" + value + ") "; });
      t.style.transform = str;
    }
  }
};

// Set Value helper

function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);

  for (var i = 0, len = animatables.length; i < len; i++) {
    var animatable = animatables[i];

    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable);
      var target = animatable.target;
      var valueUnit = getUnit(value);
      var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
      var unit = valueUnit || getUnit(originalValue);
      var to = getRelativeValue(validateValue(value, unit), originalValue);
      var animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, true);
    }
  }
}

// Animations

function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    var tweens = normalizeTweens(prop, animatable);
    var lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable: animatable,
      tweens: tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    }
  }
}

function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function (animatable) {
    return properties.map(function (prop) {
      return createAnimation(animatable, prop);
    });
  })), function (a) { return !is.und(a); });
}

// Create Instance

function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length;
  var getTlOffset = function (anim) { return anim.timelineOffset ? anim.timelineOffset : 0; };
  var timings = {};
  timings.duration = animLength ? Math.max.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.duration; })) : tweenSettings.duration;
  timings.delay = animLength ? Math.min.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.delay; })) : tweenSettings.delay;
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.duration - anim.endDelay; })) : tweenSettings.endDelay;
  return timings;
}

var instanceID = 0;

function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  var properties = getProperties(tweenSettings, params);
  var animatables = getAnimatables(params.targets);
  var animations = getAnimations(animatables, properties);
  var timings = getInstanceTimings(animations, tweenSettings);
  var id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id: id,
    children: [],
    animatables: animatables,
    animations: animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}

// Core

var activeInstances = [];
var pausedInstances = [];
var raf;

var engine = (function () {
  function play() {
    raf = requestAnimationFrame(step);
  }
  function step(t) {
    var activeInstancesLength = activeInstances.length;
    if (activeInstancesLength) {
      var i = 0;
      while (i < activeInstancesLength) {
        var activeInstance = activeInstances[i];
        if (!activeInstance.paused) {
          activeInstance.tick(t);
        } else {
          var instanceIndex = activeInstances.indexOf(activeInstance);
          if (instanceIndex > -1) {
            activeInstances.splice(instanceIndex, 1);
            activeInstancesLength = activeInstances.length;
          }
        }
        i++;
      }
      play();
    } else {
      raf = cancelAnimationFrame(raf);
    }
  }
  return play;
})();

function handleVisibilityChange() {
  if (document.hidden) {
    for (var i = 0, len = activeInstances.length; i < len; i++) {
      activeInstance[i].pause();
    }
    pausedInstances = activeInstances.slice(0);
    activeInstances = [];
  } else {
    for (var i$1 = 0, len$1 = pausedInstances.length; i$1 < len$1; i$1++) {
      pausedInstances[i$1].play();
    }
  }
}

document.addEventListener('visibilitychange', handleVisibilityChange);

// Public Instance

function anime(params) {
  if ( params === void 0 ) params = {};


  var startTime = 0, lastTime = 0, now = 0;
  var children, childrenLength = 0;
  var resolve = null;

  function makePromise() {
    return window.Promise && new Promise(function (_resolve) { return resolve = _resolve; });
  }

  var promise = makePromise();

  var instance = createNewInstance(params);

  function toggleInstanceDirection() {
    instance.reversed = !instance.reversed;
    for (var i = 0, len = children.length; i < len; i++) {
      children[i].reversed = instance.reversed;
    }
  }

  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }

  function resetTime() {
    startTime = 0;
    lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }

  function seekCild(time, child) {
    if (child) { child.seek(time - child.timelineOffset); }
  }

  function syncInstanceChildren(time) {
    if (!instance.reversePlayback) {
      for (var i = 0; i < childrenLength; i++) { seekCild(time, children[i]); }
    } else {
      for (var i$1 = childrenLength; i$1--;) { seekCild(time, children[i$1]); }
    }
  }

  function setAnimationsProgress(insTime) {
    var i = 0;
    var animations = instance.animations;
    var animationsLength = animations.length;
    while (i < animationsLength) {
      var anim = animations[i];
      var animatable = anim.animatable;
      var tweens = anim.tweens;
      var tweenLength = tweens.length - 1;
      var tween = tweens[tweenLength];
      // Only check for keyframes if there is more than one tween
      if (tweenLength) { tween = filterArray(tweens, function (t) { return (insTime < t.end); })[0] || tween; }
      var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
      var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
      var strings = tween.to.strings;
      var round = tween.round;
      var numbers = [];
      var toNumbersLength = tween.to.numbers.length;
      var progress = (void 0);
      for (var n = 0; n < toNumbersLength; n++) {
        var value = (void 0);
        var toNumber = tween.to.numbers[n];
        var fromNumber = tween.from.numbers[n] || 0;
        if (!tween.isPath) {
          value = fromNumber + (eased * (toNumber - fromNumber));
        } else {
          value = getPathProgress(tween.value, eased * toNumber);
        }
        if (round) {
          if (!(tween.isColor && n > 2)) {
            value = Math.round(value * round) / round;
          }
        }
        numbers.push(value);
      }
      // Manual Array.reduce for better performances
      var stringsLength = strings.length;
      if (!stringsLength) {
        progress = numbers[0];
      } else {
        progress = strings[0];
        for (var s = 0; s < stringsLength; s++) {
          var a = strings[s];
          var b = strings[s + 1];
          var n$1 = numbers[s];
          if (!isNaN(n$1)) {
            if (!b) {
              progress += n$1 + ' ';
            } else {
              progress += n$1 + b;
            }
          }
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i++;
    }
  }

  function setCallback(cb) {
    if (instance[cb] && !instance.passThrough) { instance[cb](instance); }
  }

  function countIteration() {
    if (instance.remaining && instance.remaining !== true) {
      instance.remaining--;
    }
  }

  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration;
    var insDelay = instance.delay;
    var insEndDelay = insDuration - instance.endDelay;
    var insTime = adjustTime(engineTime);
    instance.progress = minMax((insTime / insDuration) * 100, 0, 100);
    instance.reversePlayback = insTime < instance.currentTime;
    if (children) { syncInstanceChildren(insTime); }
    if (!instance.began && instance.currentTime > 0) {
      instance.began = true;
      setCallback('begin');
      setCallback('loopBegin');
    }
    if (insTime <= insDelay && instance.currentTime !== 0) {
      setAnimationsProgress(0);
    }
    if ((insTime >= insEndDelay && instance.currentTime !== insDuration) || !insDuration) {
      setAnimationsProgress(insDuration);
    }
    if (insTime > insDelay && insTime < insEndDelay) {
      if (!instance.changeBegan) {
        instance.changeBegan = true;
        instance.changeCompleted = false;
        setCallback('changeBegin');
      }
      setCallback('change');
      setAnimationsProgress(insTime);
    } else {
      if (instance.changeBegan) {
        instance.changeCompleted = true;
        instance.changeBegan = false;
        setCallback('changeComplete');
      }
    }
    instance.currentTime = minMax(insTime, 0, insDuration);
    if (instance.began) { setCallback('update'); }
    if (engineTime >= insDuration) {
      lastTime = 0;
      countIteration();
      if (instance.remaining) {
        startTime = now;
        setCallback('loopComplete');
        setCallback('loopBegin');
        if (instance.direction === 'alternate') { toggleInstanceDirection(); }
      } else {
        instance.paused = true;
        if (!instance.completed) {
          instance.completed = true;
          setCallback('loopComplete');
          setCallback('complete');
          if ('Promise' in window) {
            resolve();
            promise = makePromise();
          }
        }
      }
    }
  }

  instance.reset = function() {
    var direction = instance.direction;
    instance.passThrough = false;
    instance.currentTime = 0;
    instance.progress = 0;
    instance.paused = true;
    instance.began = false;
    instance.changeBegan = false;
    instance.completed = false;
    instance.changeCompleted = false;
    instance.reversePlayback = false;
    instance.reversed = direction === 'reverse';
    instance.remaining = instance.loop;
    children = instance.children;
    childrenLength = children.length;
    for (var i = childrenLength; i--;) { instance.children[i].reset(); }
    if (instance.reversed && instance.loop !== true || (direction === 'alternate' && instance.loop === 1)) { instance.remaining++; }
    setAnimationsProgress(0);
  };

  // Set Value helper

  instance.set = function(targets, properties) {
    setTargetsValue(targets, properties);
    return instance;
  };

  instance.tick = function(t) {
    now = t;
    if (!startTime) { startTime = now; }
    setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  };

  instance.seek = function(time) {
    setInstanceProgress(adjustTime(time));
  };

  instance.pause = function() {
    instance.paused = true;
    resetTime();
  };

  instance.play = function() {
    if (!instance.paused) { return; }
    instance.paused = false;
    activeInstances.push(instance);
    resetTime();
    if (!raf) { engine(); }
  };

  instance.reverse = function() {
    toggleInstanceDirection();
    resetTime();
  };

  instance.restart = function() {
    instance.reset();
    instance.play();
  };

  instance.finished = promise;
  instance.reset();

  if (instance.autoplay) { instance.play(); }

  return instance;

}

// Remove targets from animation

function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a = animations.length; a--;) {
    if (arrayContains(targetsArray, animations[a].animatable.target)) {
      animations.splice(a, 1);
    }
  }
}

function removeTargets(targets) {
  var targetsArray = parseTargets(targets);
  for (var i = activeInstances.length; i--;) {
    var instance = activeInstances[i];
    var animations = instance.animations;
    var children = instance.children;
    removeTargetsFromAnimations(targetsArray, animations);
    for (var c = children.length; c--;) {
      var child = children[c];
      var childAnimations = child.animations;
      removeTargetsFromAnimations(targetsArray, childAnimations);
      if (!childAnimations.length && !child.children.length) { children.splice(c, 1); }
    }
    if (!animations.length && !children.length) { instance.pause(); }
  }
}

// Stagger helpers

function stagger(val, params) {
  if ( params === void 0 ) params = {};

  var direction = params.direction || 'normal';
  var easing = params.easing ? parseEasings(params.easing) : null;
  var grid = params.grid;
  var axis = params.axis;
  var fromIndex = params.from || 0;
  var fromFirst = fromIndex === 'first';
  var fromCenter = fromIndex === 'center';
  var fromLast = fromIndex === 'last';
  var isRange = is.arr(val);
  var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  var val2 = isRange ? parseFloat(val[1]) : 0;
  var unit = getUnit(isRange ? val[1] : val) || 0;
  var start = params.start || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function (el, i, t) {
    if (fromFirst) { fromIndex = 0; }
    if (fromCenter) { fromIndex = (t - 1) / 2; }
    if (fromLast) { fromIndex = t - 1; }
    if (!values.length) {
      for (var index = 0; index < t; index++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index));
        } else {
          var fromX = !fromCenter ? fromIndex%grid[0] : (grid[0]-1)/2;
          var fromY = !fromCenter ? Math.floor(fromIndex/grid[0]) : (grid[1]-1)/2;
          var toX = index%grid[0];
          var toY = Math.floor(index/grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;
          var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === 'x') { value = -distanceX; }
          if (axis === 'y') { value = -distanceY; }
          values.push(value);
        }
        maxValue = Math.max.apply(Math, values);
      }
      if (easing) { values = values.map(function (val) { return easing(val / maxValue) * maxValue; }); }
      if (direction === 'reverse') { values = values.map(function (val) { return axis ? (val < 0) ? val * -1 : -val : Math.abs(maxValue - val); }); }
    }
    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + (spacing * (Math.round(values[i] * 100) / 100)) + unit;
  }
}

// Timeline

function timeline(params) {
  if ( params === void 0 ) params = {};

  var tl = anime(params);
  tl.duration = 0;
  tl.add = function(instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl);
    var children = tl.children;
    if (tlIndex > -1) { activeInstances.splice(tlIndex, 1); }
    function passThrough(ins) { ins.passThrough = true; }
    for (var i = 0; i < children.length; i++) { passThrough(children[i]); }
    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = false;
    insParams.direction = tl.direction;
    insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
    passThrough(tl);
    tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins);
    children.push(ins);
    var timings = getInstanceTimings(children, params);
    tl.delay = timings.delay;
    tl.endDelay = timings.endDelay;
    tl.duration = timings.duration;
    tl.seek(0);
    tl.reset();
    if (tl.autoplay) { tl.play(); }
    return tl;
  };
  return tl;
}

anime.version = '3.0.0';
anime.speed = 1;
anime.running = activeInstances;
anime.remove = removeTargets;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

module.exports = anime;

},{}],36:[function(_dereq_,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.THREE = {}));
}(this, function (exports) { 'use strict';

	// Polyfills

	if ( Number.EPSILON === undefined ) {

		Number.EPSILON = Math.pow( 2, - 52 );

	}

	if ( Number.isInteger === undefined ) {

		// Missing in IE
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger

		Number.isInteger = function ( value ) {

			return typeof value === 'number' && isFinite( value ) && Math.floor( value ) === value;

		};

	}

	//

	if ( Math.sign === undefined ) {

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign

		Math.sign = function ( x ) {

			return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : + x;

		};

	}

	if ( 'name' in Function.prototype === false ) {

		// Missing in IE
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name

		Object.defineProperty( Function.prototype, 'name', {

			get: function () {

				return this.toString().match( /^\s*function\s*([^\(\s]*)/ )[ 1 ];

			}

		} );

	}

	if ( Object.assign === undefined ) {

		// Missing in IE
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

		( function () {

			Object.assign = function ( target ) {

				if ( target === undefined || target === null ) {

					throw new TypeError( 'Cannot convert undefined or null to object' );

				}

				var output = Object( target );

				for ( var index = 1; index < arguments.length; index ++ ) {

					var source = arguments[ index ];

					if ( source !== undefined && source !== null ) {

						for ( var nextKey in source ) {

							if ( Object.prototype.hasOwnProperty.call( source, nextKey ) ) {

								output[ nextKey ] = source[ nextKey ];

							}

						}

					}

				}

				return output;

			};

		} )();

	}

	/**
	 * https://github.com/mrdoob/eventdispatcher.js/
	 */

	function EventDispatcher() {}

	Object.assign( EventDispatcher.prototype, {

		addEventListener: function ( type, listener ) {

			if ( this._listeners === undefined ) this._listeners = {};

			var listeners = this._listeners;

			if ( listeners[ type ] === undefined ) {

				listeners[ type ] = [];

			}

			if ( listeners[ type ].indexOf( listener ) === - 1 ) {

				listeners[ type ].push( listener );

			}

		},

		hasEventListener: function ( type, listener ) {

			if ( this._listeners === undefined ) return false;

			var listeners = this._listeners;

			return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

		},

		removeEventListener: function ( type, listener ) {

			if ( this._listeners === undefined ) return;

			var listeners = this._listeners;
			var listenerArray = listeners[ type ];

			if ( listenerArray !== undefined ) {

				var index = listenerArray.indexOf( listener );

				if ( index !== - 1 ) {

					listenerArray.splice( index, 1 );

				}

			}

		},

		dispatchEvent: function ( event ) {

			if ( this._listeners === undefined ) return;

			var listeners = this._listeners;
			var listenerArray = listeners[ event.type ];

			if ( listenerArray !== undefined ) {

				event.target = this;

				var array = listenerArray.slice( 0 );

				for ( var i = 0, l = array.length; i < l; i ++ ) {

					array[ i ].call( this, event );

				}

			}

		}

	} );

	var REVISION = '103dev';
	var MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };
	var CullFaceNone = 0;
	var CullFaceBack = 1;
	var CullFaceFront = 2;
	var CullFaceFrontBack = 3;
	var FrontFaceDirectionCW = 0;
	var FrontFaceDirectionCCW = 1;
	var BasicShadowMap = 0;
	var PCFShadowMap = 1;
	var PCFSoftShadowMap = 2;
	var FrontSide = 0;
	var BackSide = 1;
	var DoubleSide = 2;
	var FlatShading = 1;
	var SmoothShading = 2;
	var NoColors = 0;
	var FaceColors = 1;
	var VertexColors = 2;
	var NoBlending = 0;
	var NormalBlending = 1;
	var AdditiveBlending = 2;
	var SubtractiveBlending = 3;
	var MultiplyBlending = 4;
	var CustomBlending = 5;
	var AddEquation = 100;
	var SubtractEquation = 101;
	var ReverseSubtractEquation = 102;
	var MinEquation = 103;
	var MaxEquation = 104;
	var ZeroFactor = 200;
	var OneFactor = 201;
	var SrcColorFactor = 202;
	var OneMinusSrcColorFactor = 203;
	var SrcAlphaFactor = 204;
	var OneMinusSrcAlphaFactor = 205;
	var DstAlphaFactor = 206;
	var OneMinusDstAlphaFactor = 207;
	var DstColorFactor = 208;
	var OneMinusDstColorFactor = 209;
	var SrcAlphaSaturateFactor = 210;
	var NeverDepth = 0;
	var AlwaysDepth = 1;
	var LessDepth = 2;
	var LessEqualDepth = 3;
	var EqualDepth = 4;
	var GreaterEqualDepth = 5;
	var GreaterDepth = 6;
	var NotEqualDepth = 7;
	var MultiplyOperation = 0;
	var MixOperation = 1;
	var AddOperation = 2;
	var NoToneMapping = 0;
	var LinearToneMapping = 1;
	var ReinhardToneMapping = 2;
	var Uncharted2ToneMapping = 3;
	var CineonToneMapping = 4;
	var ACESFilmicToneMapping = 5;

	var UVMapping = 300;
	var CubeReflectionMapping = 301;
	var CubeRefractionMapping = 302;
	var EquirectangularReflectionMapping = 303;
	var EquirectangularRefractionMapping = 304;
	var SphericalReflectionMapping = 305;
	var CubeUVReflectionMapping = 306;
	var CubeUVRefractionMapping = 307;
	var RepeatWrapping = 1000;
	var ClampToEdgeWrapping = 1001;
	var MirroredRepeatWrapping = 1002;
	var NearestFilter = 1003;
	var NearestMipMapNearestFilter = 1004;
	var NearestMipMapLinearFilter = 1005;
	var LinearFilter = 1006;
	var LinearMipMapNearestFilter = 1007;
	var LinearMipMapLinearFilter = 1008;
	var UnsignedByteType = 1009;
	var ByteType = 1010;
	var ShortType = 1011;
	var UnsignedShortType = 1012;
	var IntType = 1013;
	var UnsignedIntType = 1014;
	var FloatType = 1015;
	var HalfFloatType = 1016;
	var UnsignedShort4444Type = 1017;
	var UnsignedShort5551Type = 1018;
	var UnsignedShort565Type = 1019;
	var UnsignedInt248Type = 1020;
	var AlphaFormat = 1021;
	var RGBFormat = 1022;
	var RGBAFormat = 1023;
	var LuminanceFormat = 1024;
	var LuminanceAlphaFormat = 1025;
	var RGBEFormat = RGBAFormat;
	var DepthFormat = 1026;
	var DepthStencilFormat = 1027;
	var RedFormat = 1028;
	var RGB_S3TC_DXT1_Format = 33776;
	var RGBA_S3TC_DXT1_Format = 33777;
	var RGBA_S3TC_DXT3_Format = 33778;
	var RGBA_S3TC_DXT5_Format = 33779;
	var RGB_PVRTC_4BPPV1_Format = 35840;
	var RGB_PVRTC_2BPPV1_Format = 35841;
	var RGBA_PVRTC_4BPPV1_Format = 35842;
	var RGBA_PVRTC_2BPPV1_Format = 35843;
	var RGB_ETC1_Format = 36196;
	var RGBA_ASTC_4x4_Format = 37808;
	var RGBA_ASTC_5x4_Format = 37809;
	var RGBA_ASTC_5x5_Format = 37810;
	var RGBA_ASTC_6x5_Format = 37811;
	var RGBA_ASTC_6x6_Format = 37812;
	var RGBA_ASTC_8x5_Format = 37813;
	var RGBA_ASTC_8x6_Format = 37814;
	var RGBA_ASTC_8x8_Format = 37815;
	var RGBA_ASTC_10x5_Format = 37816;
	var RGBA_ASTC_10x6_Format = 37817;
	var RGBA_ASTC_10x8_Format = 37818;
	var RGBA_ASTC_10x10_Format = 37819;
	var RGBA_ASTC_12x10_Format = 37820;
	var RGBA_ASTC_12x12_Format = 37821;
	var LoopOnce = 2200;
	var LoopRepeat = 2201;
	var LoopPingPong = 2202;
	var InterpolateDiscrete = 2300;
	var InterpolateLinear = 2301;
	var InterpolateSmooth = 2302;
	var ZeroCurvatureEnding = 2400;
	var ZeroSlopeEnding = 2401;
	var WrapAroundEnding = 2402;
	var TrianglesDrawMode = 0;
	var TriangleStripDrawMode = 1;
	var TriangleFanDrawMode = 2;
	var LinearEncoding = 3000;
	var sRGBEncoding = 3001;
	var GammaEncoding = 3007;
	var RGBEEncoding = 3002;
	var LogLuvEncoding = 3003;
	var RGBM7Encoding = 3004;
	var RGBM16Encoding = 3005;
	var RGBDEncoding = 3006;
	var BasicDepthPacking = 3200;
	var RGBADepthPacking = 3201;
	var TangentSpaceNormalMap = 0;
	var ObjectSpaceNormalMap = 1;

	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 */

	var _Math = {

		DEG2RAD: Math.PI / 180,
		RAD2DEG: 180 / Math.PI,

		generateUUID: ( function () {

			// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

			var lut = [];

			for ( var i = 0; i < 256; i ++ ) {

				lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 );

			}

			return function generateUUID() {

				var d0 = Math.random() * 0xffffffff | 0;
				var d1 = Math.random() * 0xffffffff | 0;
				var d2 = Math.random() * 0xffffffff | 0;
				var d3 = Math.random() * 0xffffffff | 0;
				var uuid = lut[ d0 & 0xff ] + lut[ d0 >> 8 & 0xff ] + lut[ d0 >> 16 & 0xff ] + lut[ d0 >> 24 & 0xff ] + '-' +
					lut[ d1 & 0xff ] + lut[ d1 >> 8 & 0xff ] + '-' + lut[ d1 >> 16 & 0x0f | 0x40 ] + lut[ d1 >> 24 & 0xff ] + '-' +
					lut[ d2 & 0x3f | 0x80 ] + lut[ d2 >> 8 & 0xff ] + '-' + lut[ d2 >> 16 & 0xff ] + lut[ d2 >> 24 & 0xff ] +
					lut[ d3 & 0xff ] + lut[ d3 >> 8 & 0xff ] + lut[ d3 >> 16 & 0xff ] + lut[ d3 >> 24 & 0xff ];

				// .toUpperCase() here flattens concatenated strings to save heap memory space.
				return uuid.toUpperCase();

			};

		} )(),

		clamp: function ( value, min, max ) {

			return Math.max( min, Math.min( max, value ) );

		},

		// compute euclidian modulo of m % n
		// https://en.wikipedia.org/wiki/Modulo_operation

		euclideanModulo: function ( n, m ) {

			return ( ( n % m ) + m ) % m;

		},

		// Linear mapping from range <a1, a2> to range <b1, b2>

		mapLinear: function ( x, a1, a2, b1, b2 ) {

			return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

		},

		// https://en.wikipedia.org/wiki/Linear_interpolation

		lerp: function ( x, y, t ) {

			return ( 1 - t ) * x + t * y;

		},

		// http://en.wikipedia.org/wiki/Smoothstep

		smoothstep: function ( x, min, max ) {

			if ( x <= min ) return 0;
			if ( x >= max ) return 1;

			x = ( x - min ) / ( max - min );

			return x * x * ( 3 - 2 * x );

		},

		smootherstep: function ( x, min, max ) {

			if ( x <= min ) return 0;
			if ( x >= max ) return 1;

			x = ( x - min ) / ( max - min );

			return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

		},

		// Random integer from <low, high> interval

		randInt: function ( low, high ) {

			return low + Math.floor( Math.random() * ( high - low + 1 ) );

		},

		// Random float from <low, high> interval

		randFloat: function ( low, high ) {

			return low + Math.random() * ( high - low );

		},

		// Random float from <-range/2, range/2> interval

		randFloatSpread: function ( range ) {

			return range * ( 0.5 - Math.random() );

		},

		degToRad: function ( degrees ) {

			return degrees * _Math.DEG2RAD;

		},

		radToDeg: function ( radians ) {

			return radians * _Math.RAD2DEG;

		},

		isPowerOfTwo: function ( value ) {

			return ( value & ( value - 1 ) ) === 0 && value !== 0;

		},

		ceilPowerOfTwo: function ( value ) {

			return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );

		},

		floorPowerOfTwo: function ( value ) {

			return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );

		}

	};

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author philogb / http://blog.thejit.org/
	 * @author egraether / http://egraether.com/
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 */

	function Vector2( x, y ) {

		this.x = x || 0;
		this.y = y || 0;

	}

	Object.defineProperties( Vector2.prototype, {

		"width": {

			get: function () {

				return this.x;

			},

			set: function ( value ) {

				this.x = value;

			}

		},

		"height": {

			get: function () {

				return this.y;

			},

			set: function ( value ) {

				this.y = value;

			}

		}

	} );

	Object.assign( Vector2.prototype, {

		isVector2: true,

		set: function ( x, y ) {

			this.x = x;
			this.y = y;

			return this;

		},

		setScalar: function ( scalar ) {

			this.x = scalar;
			this.y = scalar;

			return this;

		},

		setX: function ( x ) {

			this.x = x;

			return this;

		},

		setY: function ( y ) {

			this.y = y;

			return this;

		},

		setComponent: function ( index, value ) {

			switch ( index ) {

				case 0: this.x = value; break;
				case 1: this.y = value; break;
				default: throw new Error( 'index is out of range: ' + index );

			}

			return this;

		},

		getComponent: function ( index ) {

			switch ( index ) {

				case 0: return this.x;
				case 1: return this.y;
				default: throw new Error( 'index is out of range: ' + index );

			}

		},

		clone: function () {

			return new this.constructor( this.x, this.y );

		},

		copy: function ( v ) {

			this.x = v.x;
			this.y = v.y;

			return this;

		},

		add: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
				return this.addVectors( v, w );

			}

			this.x += v.x;
			this.y += v.y;

			return this;

		},

		addScalar: function ( s ) {

			this.x += s;
			this.y += s;

			return this;

		},

		addVectors: function ( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;

			return this;

		},

		addScaledVector: function ( v, s ) {

			this.x += v.x * s;
			this.y += v.y * s;

			return this;

		},

		sub: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
				return this.subVectors( v, w );

			}

			this.x -= v.x;
			this.y -= v.y;

			return this;

		},

		subScalar: function ( s ) {

			this.x -= s;
			this.y -= s;

			return this;

		},

		subVectors: function ( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;

			return this;

		},

		multiply: function ( v ) {

			this.x *= v.x;
			this.y *= v.y;

			return this;

		},

		multiplyScalar: function ( scalar ) {

			this.x *= scalar;
			this.y *= scalar;

			return this;

		},

		divide: function ( v ) {

			this.x /= v.x;
			this.y /= v.y;

			return this;

		},

		divideScalar: function ( scalar ) {

			return this.multiplyScalar( 1 / scalar );

		},

		applyMatrix3: function ( m ) {

			var x = this.x, y = this.y;
			var e = m.elements;

			this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
			this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

			return this;

		},

		min: function ( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );

			return this;

		},

		max: function ( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );

			return this;

		},

		clamp: function ( min, max ) {

			// assumes min < max, componentwise

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );

			return this;

		},

		clampScalar: function () {

			var min = new Vector2();
			var max = new Vector2();

			return function clampScalar( minVal, maxVal ) {

				min.set( minVal, minVal );
				max.set( maxVal, maxVal );

				return this.clamp( min, max );

			};

		}(),

		clampLength: function ( min, max ) {

			var length = this.length();

			return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

		},

		floor: function () {

			this.x = Math.floor( this.x );
			this.y = Math.floor( this.y );

			return this;

		},

		ceil: function () {

			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );

			return this;

		},

		round: function () {

			this.x = Math.round( this.x );
			this.y = Math.round( this.y );

			return this;

		},

		roundToZero: function () {

			this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
			this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

			return this;

		},

		negate: function () {

			this.x = - this.x;
			this.y = - this.y;

			return this;

		},

		dot: function ( v ) {

			return this.x * v.x + this.y * v.y;

		},

		cross: function ( v ) {

			return this.x * v.y - this.y * v.x;

		},

		lengthSq: function () {

			return this.x * this.x + this.y * this.y;

		},

		length: function () {

			return Math.sqrt( this.x * this.x + this.y * this.y );

		},

		manhattanLength: function () {

			return Math.abs( this.x ) + Math.abs( this.y );

		},

		normalize: function () {

			return this.divideScalar( this.length() || 1 );

		},

		angle: function () {

			// computes the angle in radians with respect to the positive x-axis

			var angle = Math.atan2( this.y, this.x );

			if ( angle < 0 ) angle += 2 * Math.PI;

			return angle;

		},

		distanceTo: function ( v ) {

			return Math.sqrt( this.distanceToSquared( v ) );

		},

		distanceToSquared: function ( v ) {

			var dx = this.x - v.x, dy = this.y - v.y;
			return dx * dx + dy * dy;

		},

		manhattanDistanceTo: function ( v ) {

			return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

		},

		setLength: function ( length ) {

			return this.normalize().multiplyScalar( length );

		},

		lerp: function ( v, alpha ) {

			this.x += ( v.x - this.x ) * alpha;
			this.y += ( v.y - this.y ) * alpha;

			return this;

		},

		lerpVectors: function ( v1, v2, alpha ) {

			return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

		},

		equals: function ( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this.x = array[ offset ];
			this.y = array[ offset + 1 ];

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;

			return array;

		},

		fromBufferAttribute: function ( attribute, index, offset ) {

			if ( offset !== undefined ) {

				console.warn( 'THREE.Vector2: offset has been removed from .fromBufferAttribute().' );

			}

			this.x = attribute.getX( index );
			this.y = attribute.getY( index );

			return this;

		},

		rotateAround: function ( center, angle ) {

			var c = Math.cos( angle ), s = Math.sin( angle );

			var x = this.x - center.x;
			var y = this.y - center.y;

			this.x = x * c - y * s + center.x;
			this.y = x * s + y * c + center.y;

			return this;

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author supereggbert / http://www.paulbrunt.co.uk/
	 * @author philogb / http://blog.thejit.org/
	 * @author jordi_ros / http://plattsoft.com
	 * @author D1plo1d / http://github.com/D1plo1d
	 * @author alteredq / http://alteredqualia.com/
	 * @author mikael emtinger / http://gomo.se/
	 * @author timknip / http://www.floorplanner.com/
	 * @author bhouston / http://clara.io
	 * @author WestLangley / http://github.com/WestLangley
	 */

	function Matrix4() {

		this.elements = [

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.' );

		}

	}

	Object.assign( Matrix4.prototype, {

		isMatrix4: true,

		set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

			var te = this.elements;

			te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
			te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
			te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
			te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

			return this;

		},

		identity: function () {

			this.set(

				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1

			);

			return this;

		},

		clone: function () {

			return new Matrix4().fromArray( this.elements );

		},

		copy: function ( m ) {

			var te = this.elements;
			var me = m.elements;

			te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
			te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ]; te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ];
			te[ 8 ] = me[ 8 ]; te[ 9 ] = me[ 9 ]; te[ 10 ] = me[ 10 ]; te[ 11 ] = me[ 11 ];
			te[ 12 ] = me[ 12 ]; te[ 13 ] = me[ 13 ]; te[ 14 ] = me[ 14 ]; te[ 15 ] = me[ 15 ];

			return this;

		},

		copyPosition: function ( m ) {

			var te = this.elements, me = m.elements;

			te[ 12 ] = me[ 12 ];
			te[ 13 ] = me[ 13 ];
			te[ 14 ] = me[ 14 ];

			return this;

		},

		extractBasis: function ( xAxis, yAxis, zAxis ) {

			xAxis.setFromMatrixColumn( this, 0 );
			yAxis.setFromMatrixColumn( this, 1 );
			zAxis.setFromMatrixColumn( this, 2 );

			return this;

		},

		makeBasis: function ( xAxis, yAxis, zAxis ) {

			this.set(
				xAxis.x, yAxis.x, zAxis.x, 0,
				xAxis.y, yAxis.y, zAxis.y, 0,
				xAxis.z, yAxis.z, zAxis.z, 0,
				0, 0, 0, 1
			);

			return this;

		},

		extractRotation: function () {

			var v1 = new Vector3();

			return function extractRotation( m ) {

				// this method does not support reflection matrices

				var te = this.elements;
				var me = m.elements;

				var scaleX = 1 / v1.setFromMatrixColumn( m, 0 ).length();
				var scaleY = 1 / v1.setFromMatrixColumn( m, 1 ).length();
				var scaleZ = 1 / v1.setFromMatrixColumn( m, 2 ).length();

				te[ 0 ] = me[ 0 ] * scaleX;
				te[ 1 ] = me[ 1 ] * scaleX;
				te[ 2 ] = me[ 2 ] * scaleX;
				te[ 3 ] = 0;

				te[ 4 ] = me[ 4 ] * scaleY;
				te[ 5 ] = me[ 5 ] * scaleY;
				te[ 6 ] = me[ 6 ] * scaleY;
				te[ 7 ] = 0;

				te[ 8 ] = me[ 8 ] * scaleZ;
				te[ 9 ] = me[ 9 ] * scaleZ;
				te[ 10 ] = me[ 10 ] * scaleZ;
				te[ 11 ] = 0;

				te[ 12 ] = 0;
				te[ 13 ] = 0;
				te[ 14 ] = 0;
				te[ 15 ] = 1;

				return this;

			};

		}(),

		makeRotationFromEuler: function ( euler ) {

			if ( ! ( euler && euler.isEuler ) ) {

				console.error( 'THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );

			}

			var te = this.elements;

			var x = euler.x, y = euler.y, z = euler.z;
			var a = Math.cos( x ), b = Math.sin( x );
			var c = Math.cos( y ), d = Math.sin( y );
			var e = Math.cos( z ), f = Math.sin( z );

			if ( euler.order === 'XYZ' ) {

				var ae = a * e, af = a * f, be = b * e, bf = b * f;

				te[ 0 ] = c * e;
				te[ 4 ] = - c * f;
				te[ 8 ] = d;

				te[ 1 ] = af + be * d;
				te[ 5 ] = ae - bf * d;
				te[ 9 ] = - b * c;

				te[ 2 ] = bf - ae * d;
				te[ 6 ] = be + af * d;
				te[ 10 ] = a * c;

			} else if ( euler.order === 'YXZ' ) {

				var ce = c * e, cf = c * f, de = d * e, df = d * f;

				te[ 0 ] = ce + df * b;
				te[ 4 ] = de * b - cf;
				te[ 8 ] = a * d;

				te[ 1 ] = a * f;
				te[ 5 ] = a * e;
				te[ 9 ] = - b;

				te[ 2 ] = cf * b - de;
				te[ 6 ] = df + ce * b;
				te[ 10 ] = a * c;

			} else if ( euler.order === 'ZXY' ) {

				var ce = c * e, cf = c * f, de = d * e, df = d * f;

				te[ 0 ] = ce - df * b;
				te[ 4 ] = - a * f;
				te[ 8 ] = de + cf * b;

				te[ 1 ] = cf + de * b;
				te[ 5 ] = a * e;
				te[ 9 ] = df - ce * b;

				te[ 2 ] = - a * d;
				te[ 6 ] = b;
				te[ 10 ] = a * c;

			} else if ( euler.order === 'ZYX' ) {

				var ae = a * e, af = a * f, be = b * e, bf = b * f;

				te[ 0 ] = c * e;
				te[ 4 ] = be * d - af;
				te[ 8 ] = ae * d + bf;

				te[ 1 ] = c * f;
				te[ 5 ] = bf * d + ae;
				te[ 9 ] = af * d - be;

				te[ 2 ] = - d;
				te[ 6 ] = b * c;
				te[ 10 ] = a * c;

			} else if ( euler.order === 'YZX' ) {

				var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

				te[ 0 ] = c * e;
				te[ 4 ] = bd - ac * f;
				te[ 8 ] = bc * f + ad;

				te[ 1 ] = f;
				te[ 5 ] = a * e;
				te[ 9 ] = - b * e;

				te[ 2 ] = - d * e;
				te[ 6 ] = ad * f + bc;
				te[ 10 ] = ac - bd * f;

			} else if ( euler.order === 'XZY' ) {

				var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

				te[ 0 ] = c * e;
				te[ 4 ] = - f;
				te[ 8 ] = d * e;

				te[ 1 ] = ac * f + bd;
				te[ 5 ] = a * e;
				te[ 9 ] = ad * f - bc;

				te[ 2 ] = bc * f - ad;
				te[ 6 ] = b * e;
				te[ 10 ] = bd * f + ac;

			}

			// bottom row
			te[ 3 ] = 0;
			te[ 7 ] = 0;
			te[ 11 ] = 0;

			// last column
			te[ 12 ] = 0;
			te[ 13 ] = 0;
			te[ 14 ] = 0;
			te[ 15 ] = 1;

			return this;

		},

		makeRotationFromQuaternion: function () {

			var zero = new Vector3( 0, 0, 0 );
			var one = new Vector3( 1, 1, 1 );

			return function makeRotationFromQuaternion( q ) {

				return this.compose( zero, q, one );

			};

		}(),

		lookAt: function () {

			var x = new Vector3();
			var y = new Vector3();
			var z = new Vector3();

			return function lookAt( eye, target, up ) {

				var te = this.elements;

				z.subVectors( eye, target );

				if ( z.lengthSq() === 0 ) {

					// eye and target are in the same position

					z.z = 1;

				}

				z.normalize();
				x.crossVectors( up, z );

				if ( x.lengthSq() === 0 ) {

					// up and z are parallel

					if ( Math.abs( up.z ) === 1 ) {

						z.x += 0.0001;

					} else {

						z.z += 0.0001;

					}

					z.normalize();
					x.crossVectors( up, z );

				}

				x.normalize();
				y.crossVectors( z, x );

				te[ 0 ] = x.x; te[ 4 ] = y.x; te[ 8 ] = z.x;
				te[ 1 ] = x.y; te[ 5 ] = y.y; te[ 9 ] = z.y;
				te[ 2 ] = x.z; te[ 6 ] = y.z; te[ 10 ] = z.z;

				return this;

			};

		}(),

		multiply: function ( m, n ) {

			if ( n !== undefined ) {

				console.warn( 'THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.' );
				return this.multiplyMatrices( m, n );

			}

			return this.multiplyMatrices( this, m );

		},

		premultiply: function ( m ) {

			return this.multiplyMatrices( m, this );

		},

		multiplyMatrices: function ( a, b ) {

			var ae = a.elements;
			var be = b.elements;
			var te = this.elements;

			var a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
			var a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
			var a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
			var a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

			var b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
			var b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
			var b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
			var b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

			te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
			te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
			te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
			te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

			te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
			te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
			te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
			te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

			te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
			te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
			te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
			te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

			te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
			te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
			te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
			te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

			return this;

		},

		multiplyScalar: function ( s ) {

			var te = this.elements;

			te[ 0 ] *= s; te[ 4 ] *= s; te[ 8 ] *= s; te[ 12 ] *= s;
			te[ 1 ] *= s; te[ 5 ] *= s; te[ 9 ] *= s; te[ 13 ] *= s;
			te[ 2 ] *= s; te[ 6 ] *= s; te[ 10 ] *= s; te[ 14 ] *= s;
			te[ 3 ] *= s; te[ 7 ] *= s; te[ 11 ] *= s; te[ 15 ] *= s;

			return this;

		},

		applyToBufferAttribute: function () {

			var v1 = new Vector3();

			return function applyToBufferAttribute( attribute ) {

				for ( var i = 0, l = attribute.count; i < l; i ++ ) {

					v1.x = attribute.getX( i );
					v1.y = attribute.getY( i );
					v1.z = attribute.getZ( i );

					v1.applyMatrix4( this );

					attribute.setXYZ( i, v1.x, v1.y, v1.z );

				}

				return attribute;

			};

		}(),

		determinant: function () {

			var te = this.elements;

			var n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
			var n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
			var n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
			var n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

			//TODO: make this more efficient
			//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

			return (
				n41 * (
					+ n14 * n23 * n32
					 - n13 * n24 * n32
					 - n14 * n22 * n33
					 + n12 * n24 * n33
					 + n13 * n22 * n34
					 - n12 * n23 * n34
				) +
				n42 * (
					+ n11 * n23 * n34
					 - n11 * n24 * n33
					 + n14 * n21 * n33
					 - n13 * n21 * n34
					 + n13 * n24 * n31
					 - n14 * n23 * n31
				) +
				n43 * (
					+ n11 * n24 * n32
					 - n11 * n22 * n34
					 - n14 * n21 * n32
					 + n12 * n21 * n34
					 + n14 * n22 * n31
					 - n12 * n24 * n31
				) +
				n44 * (
					- n13 * n22 * n31
					 - n11 * n23 * n32
					 + n11 * n22 * n33
					 + n13 * n21 * n32
					 - n12 * n21 * n33
					 + n12 * n23 * n31
				)

			);

		},

		transpose: function () {

			var te = this.elements;
			var tmp;

			tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
			tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
			tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

			tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
			tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
			tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

			return this;

		},

		setPosition: function ( v ) {

			var te = this.elements;

			te[ 12 ] = v.x;
			te[ 13 ] = v.y;
			te[ 14 ] = v.z;

			return this;

		},

		getInverse: function ( m, throwOnDegenerate ) {

			// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
			var te = this.elements,
				me = m.elements,

				n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ], n41 = me[ 3 ],
				n12 = me[ 4 ], n22 = me[ 5 ], n32 = me[ 6 ], n42 = me[ 7 ],
				n13 = me[ 8 ], n23 = me[ 9 ], n33 = me[ 10 ], n43 = me[ 11 ],
				n14 = me[ 12 ], n24 = me[ 13 ], n34 = me[ 14 ], n44 = me[ 15 ],

				t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
				t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
				t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
				t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

			var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

			if ( det === 0 ) {

				var msg = "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";

				if ( throwOnDegenerate === true ) {

					throw new Error( msg );

				} else {

					console.warn( msg );

				}

				return this.identity();

			}

			var detInv = 1 / det;

			te[ 0 ] = t11 * detInv;
			te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
			te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
			te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

			te[ 4 ] = t12 * detInv;
			te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
			te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
			te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

			te[ 8 ] = t13 * detInv;
			te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
			te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
			te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

			te[ 12 ] = t14 * detInv;
			te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
			te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
			te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

			return this;

		},

		scale: function ( v ) {

			var te = this.elements;
			var x = v.x, y = v.y, z = v.z;

			te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
			te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
			te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
			te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

			return this;

		},

		getMaxScaleOnAxis: function () {

			var te = this.elements;

			var scaleXSq = te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] + te[ 2 ] * te[ 2 ];
			var scaleYSq = te[ 4 ] * te[ 4 ] + te[ 5 ] * te[ 5 ] + te[ 6 ] * te[ 6 ];
			var scaleZSq = te[ 8 ] * te[ 8 ] + te[ 9 ] * te[ 9 ] + te[ 10 ] * te[ 10 ];

			return Math.sqrt( Math.max( scaleXSq, scaleYSq, scaleZSq ) );

		},

		makeTranslation: function ( x, y, z ) {

			this.set(

				1, 0, 0, x,
				0, 1, 0, y,
				0, 0, 1, z,
				0, 0, 0, 1

			);

			return this;

		},

		makeRotationX: function ( theta ) {

			var c = Math.cos( theta ), s = Math.sin( theta );

			this.set(

				1, 0, 0, 0,
				0, c, - s, 0,
				0, s, c, 0,
				0, 0, 0, 1

			);

			return this;

		},

		makeRotationY: function ( theta ) {

			var c = Math.cos( theta ), s = Math.sin( theta );

			this.set(

				 c, 0, s, 0,
				 0, 1, 0, 0,
				- s, 0, c, 0,
				 0, 0, 0, 1

			);

			return this;

		},

		makeRotationZ: function ( theta ) {

			var c = Math.cos( theta ), s = Math.sin( theta );

			this.set(

				c, - s, 0, 0,
				s, c, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1

			);

			return this;

		},

		makeRotationAxis: function ( axis, angle ) {

			// Based on http://www.gamedev.net/reference/articles/article1199.asp

			var c = Math.cos( angle );
			var s = Math.sin( angle );
			var t = 1 - c;
			var x = axis.x, y = axis.y, z = axis.z;
			var tx = t * x, ty = t * y;

			this.set(

				tx * x + c, tx * y - s * z, tx * z + s * y, 0,
				tx * y + s * z, ty * y + c, ty * z - s * x, 0,
				tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
				0, 0, 0, 1

			);

			 return this;

		},

		makeScale: function ( x, y, z ) {

			this.set(

				x, 0, 0, 0,
				0, y, 0, 0,
				0, 0, z, 0,
				0, 0, 0, 1

			);

			return this;

		},

		makeShear: function ( x, y, z ) {

			this.set(

				1, y, z, 0,
				x, 1, z, 0,
				x, y, 1, 0,
				0, 0, 0, 1

			);

			return this;

		},

		compose: function ( position, quaternion, scale ) {

			var te = this.elements;

			var x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
			var x2 = x + x,	y2 = y + y, z2 = z + z;
			var xx = x * x2, xy = x * y2, xz = x * z2;
			var yy = y * y2, yz = y * z2, zz = z * z2;
			var wx = w * x2, wy = w * y2, wz = w * z2;

			var sx = scale.x, sy = scale.y, sz = scale.z;

		        te[ 0 ] = ( 1 - ( yy + zz ) ) * sx;
		        te[ 1 ] = ( xy + wz ) * sx;
		        te[ 2 ] = ( xz - wy ) * sx;
		        te[ 3 ] = 0;

		        te[ 4 ] = ( xy - wz ) * sy;
		        te[ 5 ] = ( 1 - ( xx + zz ) ) * sy;
		        te[ 6 ] = ( yz + wx ) * sy;
		        te[ 7 ] = 0;

		        te[ 8 ] = ( xz + wy ) * sz;
		        te[ 9 ] = ( yz - wx ) * sz;
		        te[ 10 ] = ( 1 - ( xx + yy ) ) * sz;
		        te[ 11 ] = 0;

		        te[ 12 ] = position.x;
		        te[ 13 ] = position.y;
		        te[ 14 ] = position.z;
		        te[ 15 ] = 1;

		        return this;

		},

		decompose: function () {

			var vector = new Vector3();
			var matrix = new Matrix4();

			return function decompose( position, quaternion, scale ) {

				var te = this.elements;

				var sx = vector.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
				var sy = vector.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
				var sz = vector.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

				// if determine is negative, we need to invert one scale
				var det = this.determinant();
				if ( det < 0 ) sx = - sx;

				position.x = te[ 12 ];
				position.y = te[ 13 ];
				position.z = te[ 14 ];

				// scale the rotation part
				matrix.copy( this );

				var invSX = 1 / sx;
				var invSY = 1 / sy;
				var invSZ = 1 / sz;

				matrix.elements[ 0 ] *= invSX;
				matrix.elements[ 1 ] *= invSX;
				matrix.elements[ 2 ] *= invSX;

				matrix.elements[ 4 ] *= invSY;
				matrix.elements[ 5 ] *= invSY;
				matrix.elements[ 6 ] *= invSY;

				matrix.elements[ 8 ] *= invSZ;
				matrix.elements[ 9 ] *= invSZ;
				matrix.elements[ 10 ] *= invSZ;

				quaternion.setFromRotationMatrix( matrix );

				scale.x = sx;
				scale.y = sy;
				scale.z = sz;

				return this;

			};

		}(),

		makePerspective: function ( left, right, top, bottom, near, far ) {

			if ( far === undefined ) {

				console.warn( 'THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.' );

			}

			var te = this.elements;
			var x = 2 * near / ( right - left );
			var y = 2 * near / ( top - bottom );

			var a = ( right + left ) / ( right - left );
			var b = ( top + bottom ) / ( top - bottom );
			var c = - ( far + near ) / ( far - near );
			var d = - 2 * far * near / ( far - near );

			te[ 0 ] = x;	te[ 4 ] = 0;	te[ 8 ] = a;	te[ 12 ] = 0;
			te[ 1 ] = 0;	te[ 5 ] = y;	te[ 9 ] = b;	te[ 13 ] = 0;
			te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = c;	te[ 14 ] = d;
			te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = - 1;	te[ 15 ] = 0;

			return this;

		},

		makeOrthographic: function ( left, right, top, bottom, near, far ) {

			var te = this.elements;
			var w = 1.0 / ( right - left );
			var h = 1.0 / ( top - bottom );
			var p = 1.0 / ( far - near );

			var x = ( right + left ) * w;
			var y = ( top + bottom ) * h;
			var z = ( far + near ) * p;

			te[ 0 ] = 2 * w;	te[ 4 ] = 0;	te[ 8 ] = 0;	te[ 12 ] = - x;
			te[ 1 ] = 0;	te[ 5 ] = 2 * h;	te[ 9 ] = 0;	te[ 13 ] = - y;
			te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = - 2 * p;	te[ 14 ] = - z;
			te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = 0;	te[ 15 ] = 1;

			return this;

		},

		equals: function ( matrix ) {

			var te = this.elements;
			var me = matrix.elements;

			for ( var i = 0; i < 16; i ++ ) {

				if ( te[ i ] !== me[ i ] ) return false;

			}

			return true;

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			for ( var i = 0; i < 16; i ++ ) {

				this.elements[ i ] = array[ i + offset ];

			}

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			var te = this.elements;

			array[ offset ] = te[ 0 ];
			array[ offset + 1 ] = te[ 1 ];
			array[ offset + 2 ] = te[ 2 ];
			array[ offset + 3 ] = te[ 3 ];

			array[ offset + 4 ] = te[ 4 ];
			array[ offset + 5 ] = te[ 5 ];
			array[ offset + 6 ] = te[ 6 ];
			array[ offset + 7 ] = te[ 7 ];

			array[ offset + 8 ] = te[ 8 ];
			array[ offset + 9 ] = te[ 9 ];
			array[ offset + 10 ] = te[ 10 ];
			array[ offset + 11 ] = te[ 11 ];

			array[ offset + 12 ] = te[ 12 ];
			array[ offset + 13 ] = te[ 13 ];
			array[ offset + 14 ] = te[ 14 ];
			array[ offset + 15 ] = te[ 15 ];

			return array;

		}

	} );

	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author bhouston / http://clara.io
	 */

	function Quaternion( x, y, z, w ) {

		this._x = x || 0;
		this._y = y || 0;
		this._z = z || 0;
		this._w = ( w !== undefined ) ? w : 1;

	}

	Object.assign( Quaternion, {

		slerp: function ( qa, qb, qm, t ) {

			return qm.copy( qa ).slerp( qb, t );

		},

		slerpFlat: function ( dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t ) {

			// fuzz-free, array-based Quaternion SLERP operation

			var x0 = src0[ srcOffset0 + 0 ],
				y0 = src0[ srcOffset0 + 1 ],
				z0 = src0[ srcOffset0 + 2 ],
				w0 = src0[ srcOffset0 + 3 ],

				x1 = src1[ srcOffset1 + 0 ],
				y1 = src1[ srcOffset1 + 1 ],
				z1 = src1[ srcOffset1 + 2 ],
				w1 = src1[ srcOffset1 + 3 ];

			if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

				var s = 1 - t,

					cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,

					dir = ( cos >= 0 ? 1 : - 1 ),
					sqrSin = 1 - cos * cos;

				// Skip the Slerp for tiny steps to avoid numeric problems:
				if ( sqrSin > Number.EPSILON ) {

					var sin = Math.sqrt( sqrSin ),
						len = Math.atan2( sin, cos * dir );

					s = Math.sin( s * len ) / sin;
					t = Math.sin( t * len ) / sin;

				}

				var tDir = t * dir;

				x0 = x0 * s + x1 * tDir;
				y0 = y0 * s + y1 * tDir;
				z0 = z0 * s + z1 * tDir;
				w0 = w0 * s + w1 * tDir;

				// Normalize in case we just did a lerp:
				if ( s === 1 - t ) {

					var f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );

					x0 *= f;
					y0 *= f;
					z0 *= f;
					w0 *= f;

				}

			}

			dst[ dstOffset ] = x0;
			dst[ dstOffset + 1 ] = y0;
			dst[ dstOffset + 2 ] = z0;
			dst[ dstOffset + 3 ] = w0;

		}

	} );

	Object.defineProperties( Quaternion.prototype, {

		x: {

			get: function () {

				return this._x;

			},

			set: function ( value ) {

				this._x = value;
				this.onChangeCallback();

			}

		},

		y: {

			get: function () {

				return this._y;

			},

			set: function ( value ) {

				this._y = value;
				this.onChangeCallback();

			}

		},

		z: {

			get: function () {

				return this._z;

			},

			set: function ( value ) {

				this._z = value;
				this.onChangeCallback();

			}

		},

		w: {

			get: function () {

				return this._w;

			},

			set: function ( value ) {

				this._w = value;
				this.onChangeCallback();

			}

		}

	} );

	Object.assign( Quaternion.prototype, {

		isQuaternion: true,

		set: function ( x, y, z, w ) {

			this._x = x;
			this._y = y;
			this._z = z;
			this._w = w;

			this.onChangeCallback();

			return this;

		},

		clone: function () {

			return new this.constructor( this._x, this._y, this._z, this._w );

		},

		copy: function ( quaternion ) {

			this._x = quaternion.x;
			this._y = quaternion.y;
			this._z = quaternion.z;
			this._w = quaternion.w;

			this.onChangeCallback();

			return this;

		},

		setFromEuler: function ( euler, update ) {

			if ( ! ( euler && euler.isEuler ) ) {

				throw new Error( 'THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.' );

			}

			var x = euler._x, y = euler._y, z = euler._z, order = euler.order;

			// http://www.mathworks.com/matlabcentral/fileexchange/
			// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
			//	content/SpinCalc.m

			var cos = Math.cos;
			var sin = Math.sin;

			var c1 = cos( x / 2 );
			var c2 = cos( y / 2 );
			var c3 = cos( z / 2 );

			var s1 = sin( x / 2 );
			var s2 = sin( y / 2 );
			var s3 = sin( z / 2 );

			if ( order === 'XYZ' ) {

				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;

			} else if ( order === 'YXZ' ) {

				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;

			} else if ( order === 'ZXY' ) {

				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;

			} else if ( order === 'ZYX' ) {

				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;

			} else if ( order === 'YZX' ) {

				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;

			} else if ( order === 'XZY' ) {

				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;

			}

			if ( update !== false ) this.onChangeCallback();

			return this;

		},

		setFromAxisAngle: function ( axis, angle ) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

			// assumes axis is normalized

			var halfAngle = angle / 2, s = Math.sin( halfAngle );

			this._x = axis.x * s;
			this._y = axis.y * s;
			this._z = axis.z * s;
			this._w = Math.cos( halfAngle );

			this.onChangeCallback();

			return this;

		},

		setFromRotationMatrix: function ( m ) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			var te = m.elements,

				m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
				m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
				m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

				trace = m11 + m22 + m33,
				s;

			if ( trace > 0 ) {

				s = 0.5 / Math.sqrt( trace + 1.0 );

				this._w = 0.25 / s;
				this._x = ( m32 - m23 ) * s;
				this._y = ( m13 - m31 ) * s;
				this._z = ( m21 - m12 ) * s;

			} else if ( m11 > m22 && m11 > m33 ) {

				s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

				this._w = ( m32 - m23 ) / s;
				this._x = 0.25 * s;
				this._y = ( m12 + m21 ) / s;
				this._z = ( m13 + m31 ) / s;

			} else if ( m22 > m33 ) {

				s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

				this._w = ( m13 - m31 ) / s;
				this._x = ( m12 + m21 ) / s;
				this._y = 0.25 * s;
				this._z = ( m23 + m32 ) / s;

			} else {

				s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

				this._w = ( m21 - m12 ) / s;
				this._x = ( m13 + m31 ) / s;
				this._y = ( m23 + m32 ) / s;
				this._z = 0.25 * s;

			}

			this.onChangeCallback();

			return this;

		},

		setFromUnitVectors: function () {

			// assumes direction vectors vFrom and vTo are normalized

			var v1 = new Vector3();
			var r;

			var EPS = 0.000001;

			return function setFromUnitVectors( vFrom, vTo ) {

				if ( v1 === undefined ) v1 = new Vector3();

				r = vFrom.dot( vTo ) + 1;

				if ( r < EPS ) {

					r = 0;

					if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

						v1.set( - vFrom.y, vFrom.x, 0 );

					} else {

						v1.set( 0, - vFrom.z, vFrom.y );

					}

				} else {

					v1.crossVectors( vFrom, vTo );

				}

				this._x = v1.x;
				this._y = v1.y;
				this._z = v1.z;
				this._w = r;

				return this.normalize();

			};

		}(),

		angleTo: function ( q ) {

			return 2 * Math.acos( Math.abs( _Math.clamp( this.dot( q ), - 1, 1 ) ) );

		},

		rotateTowards: function ( q, step ) {

			var angle = this.angleTo( q );

			if ( angle === 0 ) return this;

			var t = Math.min( 1, step / angle );

			this.slerp( q, t );

			return this;

		},

		inverse: function () {

			// quaternion is assumed to have unit length

			return this.conjugate();

		},

		conjugate: function () {

			this._x *= - 1;
			this._y *= - 1;
			this._z *= - 1;

			this.onChangeCallback();

			return this;

		},

		dot: function ( v ) {

			return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

		},

		lengthSq: function () {

			return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

		},

		length: function () {

			return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

		},

		normalize: function () {

			var l = this.length();

			if ( l === 0 ) {

				this._x = 0;
				this._y = 0;
				this._z = 0;
				this._w = 1;

			} else {

				l = 1 / l;

				this._x = this._x * l;
				this._y = this._y * l;
				this._z = this._z * l;
				this._w = this._w * l;

			}

			this.onChangeCallback();

			return this;

		},

		multiply: function ( q, p ) {

			if ( p !== undefined ) {

				console.warn( 'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
				return this.multiplyQuaternions( q, p );

			}

			return this.multiplyQuaternions( this, q );

		},

		premultiply: function ( q ) {

			return this.multiplyQuaternions( q, this );

		},

		multiplyQuaternions: function ( a, b ) {

			// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

			var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
			var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

			this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
			this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
			this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
			this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

			this.onChangeCallback();

			return this;

		},

		slerp: function ( qb, t ) {

			if ( t === 0 ) return this;
			if ( t === 1 ) return this.copy( qb );

			var x = this._x, y = this._y, z = this._z, w = this._w;

			// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

			var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

			if ( cosHalfTheta < 0 ) {

				this._w = - qb._w;
				this._x = - qb._x;
				this._y = - qb._y;
				this._z = - qb._z;

				cosHalfTheta = - cosHalfTheta;

			} else {

				this.copy( qb );

			}

			if ( cosHalfTheta >= 1.0 ) {

				this._w = w;
				this._x = x;
				this._y = y;
				this._z = z;

				return this;

			}

			var sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

			if ( sqrSinHalfTheta <= Number.EPSILON ) {

				var s = 1 - t;
				this._w = s * w + t * this._w;
				this._x = s * x + t * this._x;
				this._y = s * y + t * this._y;
				this._z = s * z + t * this._z;

				return this.normalize();

			}

			var sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
			var halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
			var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
				ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

			this._w = ( w * ratioA + this._w * ratioB );
			this._x = ( x * ratioA + this._x * ratioB );
			this._y = ( y * ratioA + this._y * ratioB );
			this._z = ( z * ratioA + this._z * ratioB );

			this.onChangeCallback();

			return this;

		},

		equals: function ( quaternion ) {

			return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this._x = array[ offset ];
			this._y = array[ offset + 1 ];
			this._z = array[ offset + 2 ];
			this._w = array[ offset + 3 ];

			this.onChangeCallback();

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this._x;
			array[ offset + 1 ] = this._y;
			array[ offset + 2 ] = this._z;
			array[ offset + 3 ] = this._w;

			return array;

		},

		onChange: function ( callback ) {

			this.onChangeCallback = callback;

			return this;

		},

		onChangeCallback: function () {}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author kile / http://kile.stravaganza.org/
	 * @author philogb / http://blog.thejit.org/
	 * @author mikael emtinger / http://gomo.se/
	 * @author egraether / http://egraether.com/
	 * @author WestLangley / http://github.com/WestLangley
	 */

	function Vector3( x, y, z ) {

		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;

	}

	Object.assign( Vector3.prototype, {

		isVector3: true,

		set: function ( x, y, z ) {

			this.x = x;
			this.y = y;
			this.z = z;

			return this;

		},

		setScalar: function ( scalar ) {

			this.x = scalar;
			this.y = scalar;
			this.z = scalar;

			return this;

		},

		setX: function ( x ) {

			this.x = x;

			return this;

		},

		setY: function ( y ) {

			this.y = y;

			return this;

		},

		setZ: function ( z ) {

			this.z = z;

			return this;

		},

		setComponent: function ( index, value ) {

			switch ( index ) {

				case 0: this.x = value; break;
				case 1: this.y = value; break;
				case 2: this.z = value; break;
				default: throw new Error( 'index is out of range: ' + index );

			}

			return this;

		},

		getComponent: function ( index ) {

			switch ( index ) {

				case 0: return this.x;
				case 1: return this.y;
				case 2: return this.z;
				default: throw new Error( 'index is out of range: ' + index );

			}

		},

		clone: function () {

			return new this.constructor( this.x, this.y, this.z );

		},

		copy: function ( v ) {

			this.x = v.x;
			this.y = v.y;
			this.z = v.z;

			return this;

		},

		add: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
				return this.addVectors( v, w );

			}

			this.x += v.x;
			this.y += v.y;
			this.z += v.z;

			return this;

		},

		addScalar: function ( s ) {

			this.x += s;
			this.y += s;
			this.z += s;

			return this;

		},

		addVectors: function ( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;
			this.z = a.z + b.z;

			return this;

		},

		addScaledVector: function ( v, s ) {

			this.x += v.x * s;
			this.y += v.y * s;
			this.z += v.z * s;

			return this;

		},

		sub: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
				return this.subVectors( v, w );

			}

			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;

			return this;

		},

		subScalar: function ( s ) {

			this.x -= s;
			this.y -= s;
			this.z -= s;

			return this;

		},

		subVectors: function ( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;
			this.z = a.z - b.z;

			return this;

		},

		multiply: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
				return this.multiplyVectors( v, w );

			}

			this.x *= v.x;
			this.y *= v.y;
			this.z *= v.z;

			return this;

		},

		multiplyScalar: function ( scalar ) {

			this.x *= scalar;
			this.y *= scalar;
			this.z *= scalar;

			return this;

		},

		multiplyVectors: function ( a, b ) {

			this.x = a.x * b.x;
			this.y = a.y * b.y;
			this.z = a.z * b.z;

			return this;

		},

		applyEuler: function () {

			var quaternion = new Quaternion();

			return function applyEuler( euler ) {

				if ( ! ( euler && euler.isEuler ) ) {

					console.error( 'THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.' );

				}

				return this.applyQuaternion( quaternion.setFromEuler( euler ) );

			};

		}(),

		applyAxisAngle: function () {

			var quaternion = new Quaternion();

			return function applyAxisAngle( axis, angle ) {

				return this.applyQuaternion( quaternion.setFromAxisAngle( axis, angle ) );

			};

		}(),

		applyMatrix3: function ( m ) {

			var x = this.x, y = this.y, z = this.z;
			var e = m.elements;

			this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
			this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
			this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

			return this;

		},

		applyMatrix4: function ( m ) {

			var x = this.x, y = this.y, z = this.z;
			var e = m.elements;

			var w = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] );

			this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * w;
			this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * w;
			this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * w;

			return this;

		},

		applyQuaternion: function ( q ) {

			var x = this.x, y = this.y, z = this.z;
			var qx = q.x, qy = q.y, qz = q.z, qw = q.w;

			// calculate quat * vector

			var ix = qw * x + qy * z - qz * y;
			var iy = qw * y + qz * x - qx * z;
			var iz = qw * z + qx * y - qy * x;
			var iw = - qx * x - qy * y - qz * z;

			// calculate result * inverse quat

			this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
			this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
			this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

			return this;

		},

		project: function ( camera ) {

			return this.applyMatrix4( camera.matrixWorldInverse ).applyMatrix4( camera.projectionMatrix );

		},

		unproject: function () {

			var matrix = new Matrix4();

			return function unproject( camera ) {

				return this.applyMatrix4( matrix.getInverse( camera.projectionMatrix ) ).applyMatrix4( camera.matrixWorld );

			};

		}(),

		transformDirection: function ( m ) {

			// input: THREE.Matrix4 affine matrix
			// vector interpreted as a direction

			var x = this.x, y = this.y, z = this.z;
			var e = m.elements;

			this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z;
			this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z;
			this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

			return this.normalize();

		},

		divide: function ( v ) {

			this.x /= v.x;
			this.y /= v.y;
			this.z /= v.z;

			return this;

		},

		divideScalar: function ( scalar ) {

			return this.multiplyScalar( 1 / scalar );

		},

		min: function ( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );
			this.z = Math.min( this.z, v.z );

			return this;

		},

		max: function ( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );
			this.z = Math.max( this.z, v.z );

			return this;

		},

		clamp: function ( min, max ) {

			// assumes min < max, componentwise

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );
			this.z = Math.max( min.z, Math.min( max.z, this.z ) );

			return this;

		},

		clampScalar: function () {

			var min = new Vector3();
			var max = new Vector3();

			return function clampScalar( minVal, maxVal ) {

				min.set( minVal, minVal, minVal );
				max.set( maxVal, maxVal, maxVal );

				return this.clamp( min, max );

			};

		}(),

		clampLength: function ( min, max ) {

			var length = this.length();

			return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

		},

		floor: function () {

			this.x = Math.floor( this.x );
			this.y = Math.floor( this.y );
			this.z = Math.floor( this.z );

			return this;

		},

		ceil: function () {

			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );
			this.z = Math.ceil( this.z );

			return this;

		},

		round: function () {

			this.x = Math.round( this.x );
			this.y = Math.round( this.y );
			this.z = Math.round( this.z );

			return this;

		},

		roundToZero: function () {

			this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
			this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
			this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

			return this;

		},

		negate: function () {

			this.x = - this.x;
			this.y = - this.y;
			this.z = - this.z;

			return this;

		},

		dot: function ( v ) {

			return this.x * v.x + this.y * v.y + this.z * v.z;

		},

		// TODO lengthSquared?

		lengthSq: function () {

			return this.x * this.x + this.y * this.y + this.z * this.z;

		},

		length: function () {

			return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

		},

		manhattanLength: function () {

			return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

		},

		normalize: function () {

			return this.divideScalar( this.length() || 1 );

		},

		setLength: function ( length ) {

			return this.normalize().multiplyScalar( length );

		},

		lerp: function ( v, alpha ) {

			this.x += ( v.x - this.x ) * alpha;
			this.y += ( v.y - this.y ) * alpha;
			this.z += ( v.z - this.z ) * alpha;

			return this;

		},

		lerpVectors: function ( v1, v2, alpha ) {

			return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

		},

		cross: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
				return this.crossVectors( v, w );

			}

			return this.crossVectors( this, v );

		},

		crossVectors: function ( a, b ) {

			var ax = a.x, ay = a.y, az = a.z;
			var bx = b.x, by = b.y, bz = b.z;

			this.x = ay * bz - az * by;
			this.y = az * bx - ax * bz;
			this.z = ax * by - ay * bx;

			return this;

		},

		projectOnVector: function ( vector ) {

			var scalar = vector.dot( this ) / vector.lengthSq();

			return this.copy( vector ).multiplyScalar( scalar );

		},

		projectOnPlane: function () {

			var v1 = new Vector3();

			return function projectOnPlane( planeNormal ) {

				v1.copy( this ).projectOnVector( planeNormal );

				return this.sub( v1 );

			};

		}(),

		reflect: function () {

			// reflect incident vector off plane orthogonal to normal
			// normal is assumed to have unit length

			var v1 = new Vector3();

			return function reflect( normal ) {

				return this.sub( v1.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

			};

		}(),

		angleTo: function ( v ) {

			var theta = this.dot( v ) / ( Math.sqrt( this.lengthSq() * v.lengthSq() ) );

			// clamp, to handle numerical problems

			return Math.acos( _Math.clamp( theta, - 1, 1 ) );

		},

		distanceTo: function ( v ) {

			return Math.sqrt( this.distanceToSquared( v ) );

		},

		distanceToSquared: function ( v ) {

			var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

			return dx * dx + dy * dy + dz * dz;

		},

		manhattanDistanceTo: function ( v ) {

			return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );

		},

		setFromSpherical: function ( s ) {

			return this.setFromSphericalCoords( s.radius, s.phi, s.theta );

		},

		setFromSphericalCoords: function ( radius, phi, theta ) {

			var sinPhiRadius = Math.sin( phi ) * radius;

			this.x = sinPhiRadius * Math.sin( theta );
			this.y = Math.cos( phi ) * radius;
			this.z = sinPhiRadius * Math.cos( theta );

			return this;

		},

		setFromCylindrical: function ( c ) {

			return this.setFromCylindricalCoords( c.radius, c.theta, c.y );

		},

		setFromCylindricalCoords: function ( radius, theta, y ) {

			this.x = radius * Math.sin( theta );
			this.y = y;
			this.z = radius * Math.cos( theta );

			return this;

		},

		setFromMatrixPosition: function ( m ) {

			var e = m.elements;

			this.x = e[ 12 ];
			this.y = e[ 13 ];
			this.z = e[ 14 ];

			return this;

		},

		setFromMatrixScale: function ( m ) {

			var sx = this.setFromMatrixColumn( m, 0 ).length();
			var sy = this.setFromMatrixColumn( m, 1 ).length();
			var sz = this.setFromMatrixColumn( m, 2 ).length();

			this.x = sx;
			this.y = sy;
			this.z = sz;

			return this;

		},

		setFromMatrixColumn: function ( m, index ) {

			return this.fromArray( m.elements, index * 4 );

		},

		equals: function ( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this.x = array[ offset ];
			this.y = array[ offset + 1 ];
			this.z = array[ offset + 2 ];

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;
			array[ offset + 2 ] = this.z;

			return array;

		},

		fromBufferAttribute: function ( attribute, index, offset ) {

			if ( offset !== undefined ) {

				console.warn( 'THREE.Vector3: offset has been removed from .fromBufferAttribute().' );

			}

			this.x = attribute.getX( index );
			this.y = attribute.getY( index );
			this.z = attribute.getZ( index );

			return this;

		}

	} );

	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author bhouston / http://clara.io
	 * @author tschw
	 */

	function Matrix3() {

		this.elements = [

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.' );

		}

	}

	Object.assign( Matrix3.prototype, {

		isMatrix3: true,

		set: function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

			var te = this.elements;

			te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
			te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
			te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;

			return this;

		},

		identity: function () {

			this.set(

				1, 0, 0,
				0, 1, 0,
				0, 0, 1

			);

			return this;

		},

		clone: function () {

			return new this.constructor().fromArray( this.elements );

		},

		copy: function ( m ) {

			var te = this.elements;
			var me = m.elements;

			te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
			te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
			te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];

			return this;

		},

		setFromMatrix4: function ( m ) {

			var me = m.elements;

			this.set(

				me[ 0 ], me[ 4 ], me[ 8 ],
				me[ 1 ], me[ 5 ], me[ 9 ],
				me[ 2 ], me[ 6 ], me[ 10 ]

			);

			return this;

		},

		applyToBufferAttribute: function () {

			var v1 = new Vector3();

			return function applyToBufferAttribute( attribute ) {

				for ( var i = 0, l = attribute.count; i < l; i ++ ) {

					v1.x = attribute.getX( i );
					v1.y = attribute.getY( i );
					v1.z = attribute.getZ( i );

					v1.applyMatrix3( this );

					attribute.setXYZ( i, v1.x, v1.y, v1.z );

				}

				return attribute;

			};

		}(),

		multiply: function ( m ) {

			return this.multiplyMatrices( this, m );

		},

		premultiply: function ( m ) {

			return this.multiplyMatrices( m, this );

		},

		multiplyMatrices: function ( a, b ) {

			var ae = a.elements;
			var be = b.elements;
			var te = this.elements;

			var a11 = ae[ 0 ], a12 = ae[ 3 ], a13 = ae[ 6 ];
			var a21 = ae[ 1 ], a22 = ae[ 4 ], a23 = ae[ 7 ];
			var a31 = ae[ 2 ], a32 = ae[ 5 ], a33 = ae[ 8 ];

			var b11 = be[ 0 ], b12 = be[ 3 ], b13 = be[ 6 ];
			var b21 = be[ 1 ], b22 = be[ 4 ], b23 = be[ 7 ];
			var b31 = be[ 2 ], b32 = be[ 5 ], b33 = be[ 8 ];

			te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31;
			te[ 3 ] = a11 * b12 + a12 * b22 + a13 * b32;
			te[ 6 ] = a11 * b13 + a12 * b23 + a13 * b33;

			te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31;
			te[ 4 ] = a21 * b12 + a22 * b22 + a23 * b32;
			te[ 7 ] = a21 * b13 + a22 * b23 + a23 * b33;

			te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31;
			te[ 5 ] = a31 * b12 + a32 * b22 + a33 * b32;
			te[ 8 ] = a31 * b13 + a32 * b23 + a33 * b33;

			return this;

		},

		multiplyScalar: function ( s ) {

			var te = this.elements;

			te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
			te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
			te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

			return this;

		},

		determinant: function () {

			var te = this.elements;

			var a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
				d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
				g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

			return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

		},

		getInverse: function ( matrix, throwOnDegenerate ) {

			if ( matrix && matrix.isMatrix4 ) {

				console.error( "THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument." );

			}

			var me = matrix.elements,
				te = this.elements,

				n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ],
				n12 = me[ 3 ], n22 = me[ 4 ], n32 = me[ 5 ],
				n13 = me[ 6 ], n23 = me[ 7 ], n33 = me[ 8 ],

				t11 = n33 * n22 - n32 * n23,
				t12 = n32 * n13 - n33 * n12,
				t13 = n23 * n12 - n22 * n13,

				det = n11 * t11 + n21 * t12 + n31 * t13;

			if ( det === 0 ) {

				var msg = "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";

				if ( throwOnDegenerate === true ) {

					throw new Error( msg );

				} else {

					console.warn( msg );

				}

				return this.identity();

			}

			var detInv = 1 / det;

			te[ 0 ] = t11 * detInv;
			te[ 1 ] = ( n31 * n23 - n33 * n21 ) * detInv;
			te[ 2 ] = ( n32 * n21 - n31 * n22 ) * detInv;

			te[ 3 ] = t12 * detInv;
			te[ 4 ] = ( n33 * n11 - n31 * n13 ) * detInv;
			te[ 5 ] = ( n31 * n12 - n32 * n11 ) * detInv;

			te[ 6 ] = t13 * detInv;
			te[ 7 ] = ( n21 * n13 - n23 * n11 ) * detInv;
			te[ 8 ] = ( n22 * n11 - n21 * n12 ) * detInv;

			return this;

		},

		transpose: function () {

			var tmp, m = this.elements;

			tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
			tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
			tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

			return this;

		},

		getNormalMatrix: function ( matrix4 ) {

			return this.setFromMatrix4( matrix4 ).getInverse( this ).transpose();

		},

		transposeIntoArray: function ( r ) {

			var m = this.elements;

			r[ 0 ] = m[ 0 ];
			r[ 1 ] = m[ 3 ];
			r[ 2 ] = m[ 6 ];
			r[ 3 ] = m[ 1 ];
			r[ 4 ] = m[ 4 ];
			r[ 5 ] = m[ 7 ];
			r[ 6 ] = m[ 2 ];
			r[ 7 ] = m[ 5 ];
			r[ 8 ] = m[ 8 ];

			return this;

		},

		setUvTransform: function ( tx, ty, sx, sy, rotation, cx, cy ) {

			var c = Math.cos( rotation );
			var s = Math.sin( rotation );

			this.set(
				sx * c, sx * s, - sx * ( c * cx + s * cy ) + cx + tx,
				- sy * s, sy * c, - sy * ( - s * cx + c * cy ) + cy + ty,
				0, 0, 1
			);

		},

		scale: function ( sx, sy ) {

			var te = this.elements;

			te[ 0 ] *= sx; te[ 3 ] *= sx; te[ 6 ] *= sx;
			te[ 1 ] *= sy; te[ 4 ] *= sy; te[ 7 ] *= sy;

			return this;

		},

		rotate: function ( theta ) {

			var c = Math.cos( theta );
			var s = Math.sin( theta );

			var te = this.elements;

			var a11 = te[ 0 ], a12 = te[ 3 ], a13 = te[ 6 ];
			var a21 = te[ 1 ], a22 = te[ 4 ], a23 = te[ 7 ];

			te[ 0 ] = c * a11 + s * a21;
			te[ 3 ] = c * a12 + s * a22;
			te[ 6 ] = c * a13 + s * a23;

			te[ 1 ] = - s * a11 + c * a21;
			te[ 4 ] = - s * a12 + c * a22;
			te[ 7 ] = - s * a13 + c * a23;

			return this;

		},

		translate: function ( tx, ty ) {

			var te = this.elements;

			te[ 0 ] += tx * te[ 2 ]; te[ 3 ] += tx * te[ 5 ]; te[ 6 ] += tx * te[ 8 ];
			te[ 1 ] += ty * te[ 2 ]; te[ 4 ] += ty * te[ 5 ]; te[ 7 ] += ty * te[ 8 ];

			return this;

		},

		equals: function ( matrix ) {

			var te = this.elements;
			var me = matrix.elements;

			for ( var i = 0; i < 9; i ++ ) {

				if ( te[ i ] !== me[ i ] ) return false;

			}

			return true;

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			for ( var i = 0; i < 9; i ++ ) {

				this.elements[ i ] = array[ i + offset ];

			}

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			var te = this.elements;

			array[ offset ] = te[ 0 ];
			array[ offset + 1 ] = te[ 1 ];
			array[ offset + 2 ] = te[ 2 ];

			array[ offset + 3 ] = te[ 3 ];
			array[ offset + 4 ] = te[ 4 ];
			array[ offset + 5 ] = te[ 5 ];

			array[ offset + 6 ] = te[ 6 ];
			array[ offset + 7 ] = te[ 7 ];
			array[ offset + 8 ] = te[ 8 ];

			return array;

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author szimek / https://github.com/szimek/
	 */

	var _canvas;

	var ImageUtils = {

		getDataURL: function ( image ) {

			var canvas;

			if ( typeof HTMLCanvasElement == 'undefined' ) {

				return image.src;

			} else if ( image instanceof HTMLCanvasElement ) {

				canvas = image;

			} else {

				if ( _canvas === undefined ) _canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );

				_canvas.width = image.width;
				_canvas.height = image.height;

				var context = _canvas.getContext( '2d' );

				if ( image instanceof ImageData ) {

					context.putImageData( image, 0, 0 );

				} else {

					context.drawImage( image, 0, 0, image.width, image.height );

				}

				canvas = _canvas;

			}

			if ( canvas.width > 2048 || canvas.height > 2048 ) {

				return canvas.toDataURL( 'image/jpeg', 0.6 );

			} else {

				return canvas.toDataURL( 'image/png' );

			}

		}

	};

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author szimek / https://github.com/szimek/
	 */

	var textureId = 0;

	function Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding ) {

		Object.defineProperty( this, 'id', { value: textureId ++ } );

		this.uuid = _Math.generateUUID();

		this.name = '';

		this.image = image !== undefined ? image : Texture.DEFAULT_IMAGE;
		this.mipmaps = [];

		this.mapping = mapping !== undefined ? mapping : Texture.DEFAULT_MAPPING;

		this.wrapS = wrapS !== undefined ? wrapS : ClampToEdgeWrapping;
		this.wrapT = wrapT !== undefined ? wrapT : ClampToEdgeWrapping;

		this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
		this.minFilter = minFilter !== undefined ? minFilter : LinearMipMapLinearFilter;

		this.anisotropy = anisotropy !== undefined ? anisotropy : 1;

		this.format = format !== undefined ? format : RGBAFormat;
		this.type = type !== undefined ? type : UnsignedByteType;

		this.offset = new Vector2( 0, 0 );
		this.repeat = new Vector2( 1, 1 );
		this.center = new Vector2( 0, 0 );
		this.rotation = 0;

		this.matrixAutoUpdate = true;
		this.matrix = new Matrix3();

		this.generateMipmaps = true;
		this.premultiplyAlpha = false;
		this.flipY = true;
		this.unpackAlignment = 4;	// valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

		// Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
		//
		// Also changing the encoding after already used by a Material will not automatically make the Material
		// update.  You need to explicitly call Material.needsUpdate to trigger it to recompile.
		this.encoding = encoding !== undefined ? encoding : LinearEncoding;

		this.version = 0;
		this.onUpdate = null;

	}

	Texture.DEFAULT_IMAGE = undefined;
	Texture.DEFAULT_MAPPING = UVMapping;

	Texture.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Texture,

		isTexture: true,

		updateMatrix: function () {

			this.matrix.setUvTransform( this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y );

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.name = source.name;

			this.image = source.image;
			this.mipmaps = source.mipmaps.slice( 0 );

			this.mapping = source.mapping;

			this.wrapS = source.wrapS;
			this.wrapT = source.wrapT;

			this.magFilter = source.magFilter;
			this.minFilter = source.minFilter;

			this.anisotropy = source.anisotropy;

			this.format = source.format;
			this.type = source.type;

			this.offset.copy( source.offset );
			this.repeat.copy( source.repeat );
			this.center.copy( source.center );
			this.rotation = source.rotation;

			this.matrixAutoUpdate = source.matrixAutoUpdate;
			this.matrix.copy( source.matrix );

			this.generateMipmaps = source.generateMipmaps;
			this.premultiplyAlpha = source.premultiplyAlpha;
			this.flipY = source.flipY;
			this.unpackAlignment = source.unpackAlignment;
			this.encoding = source.encoding;

			return this;

		},

		toJSON: function ( meta ) {

			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			if ( ! isRootObject && meta.textures[ this.uuid ] !== undefined ) {

				return meta.textures[ this.uuid ];

			}

			var output = {

				metadata: {
					version: 4.5,
					type: 'Texture',
					generator: 'Texture.toJSON'
				},

				uuid: this.uuid,
				name: this.name,

				mapping: this.mapping,

				repeat: [ this.repeat.x, this.repeat.y ],
				offset: [ this.offset.x, this.offset.y ],
				center: [ this.center.x, this.center.y ],
				rotation: this.rotation,

				wrap: [ this.wrapS, this.wrapT ],

				format: this.format,
				type: this.type,
				encoding: this.encoding,

				minFilter: this.minFilter,
				magFilter: this.magFilter,
				anisotropy: this.anisotropy,

				flipY: this.flipY,

				premultiplyAlpha: this.premultiplyAlpha,
				unpackAlignment: this.unpackAlignment

			};

			if ( this.image !== undefined ) {

				// TODO: Move to THREE.Image

				var image = this.image;

				if ( image.uuid === undefined ) {

					image.uuid = _Math.generateUUID(); // UGH

				}

				if ( ! isRootObject && meta.images[ image.uuid ] === undefined ) {

					var url;

					if ( Array.isArray( image ) ) {

						// process array of images e.g. CubeTexture

						url = [];

						for ( var i = 0, l = image.length; i < l; i ++ ) {

							url.push( ImageUtils.getDataURL( image[ i ] ) );

						}

					} else {

						// process single image

						url = ImageUtils.getDataURL( image );

					}

					meta.images[ image.uuid ] = {
						uuid: image.uuid,
						url: url
					};

				}

				output.image = image.uuid;

			}

			if ( ! isRootObject ) {

				meta.textures[ this.uuid ] = output;

			}

			return output;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		},

		transformUv: function ( uv ) {

			if ( this.mapping !== UVMapping ) return uv;

			uv.applyMatrix3( this.matrix );

			if ( uv.x < 0 || uv.x > 1 ) {

				switch ( this.wrapS ) {

					case RepeatWrapping:

						uv.x = uv.x - Math.floor( uv.x );
						break;

					case ClampToEdgeWrapping:

						uv.x = uv.x < 0 ? 0 : 1;
						break;

					case MirroredRepeatWrapping:

						if ( Math.abs( Math.floor( uv.x ) % 2 ) === 1 ) {

							uv.x = Math.ceil( uv.x ) - uv.x;

						} else {

							uv.x = uv.x - Math.floor( uv.x );

						}
						break;

				}

			}

			if ( uv.y < 0 || uv.y > 1 ) {

				switch ( this.wrapT ) {

					case RepeatWrapping:

						uv.y = uv.y - Math.floor( uv.y );
						break;

					case ClampToEdgeWrapping:

						uv.y = uv.y < 0 ? 0 : 1;
						break;

					case MirroredRepeatWrapping:

						if ( Math.abs( Math.floor( uv.y ) % 2 ) === 1 ) {

							uv.y = Math.ceil( uv.y ) - uv.y;

						} else {

							uv.y = uv.y - Math.floor( uv.y );

						}
						break;

				}

			}

			if ( this.flipY ) {

				uv.y = 1 - uv.y;

			}

			return uv;

		}

	} );

	Object.defineProperty( Texture.prototype, "needsUpdate", {

		set: function ( value ) {

			if ( value === true ) this.version ++;

		}

	} );

	/**
	 * @author supereggbert / http://www.paulbrunt.co.uk/
	 * @author philogb / http://blog.thejit.org/
	 * @author mikael emtinger / http://gomo.se/
	 * @author egraether / http://egraether.com/
	 * @author WestLangley / http://github.com/WestLangley
	 */

	function Vector4( x, y, z, w ) {

		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = ( w !== undefined ) ? w : 1;

	}

	Object.assign( Vector4.prototype, {

		isVector4: true,

		set: function ( x, y, z, w ) {

			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;

			return this;

		},

		setScalar: function ( scalar ) {

			this.x = scalar;
			this.y = scalar;
			this.z = scalar;
			this.w = scalar;

			return this;

		},

		setX: function ( x ) {

			this.x = x;

			return this;

		},

		setY: function ( y ) {

			this.y = y;

			return this;

		},

		setZ: function ( z ) {

			this.z = z;

			return this;

		},

		setW: function ( w ) {

			this.w = w;

			return this;

		},

		setComponent: function ( index, value ) {

			switch ( index ) {

				case 0: this.x = value; break;
				case 1: this.y = value; break;
				case 2: this.z = value; break;
				case 3: this.w = value; break;
				default: throw new Error( 'index is out of range: ' + index );

			}

			return this;

		},

		getComponent: function ( index ) {

			switch ( index ) {

				case 0: return this.x;
				case 1: return this.y;
				case 2: return this.z;
				case 3: return this.w;
				default: throw new Error( 'index is out of range: ' + index );

			}

		},

		clone: function () {

			return new this.constructor( this.x, this.y, this.z, this.w );

		},

		copy: function ( v ) {

			this.x = v.x;
			this.y = v.y;
			this.z = v.z;
			this.w = ( v.w !== undefined ) ? v.w : 1;

			return this;

		},

		add: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
				return this.addVectors( v, w );

			}

			this.x += v.x;
			this.y += v.y;
			this.z += v.z;
			this.w += v.w;

			return this;

		},

		addScalar: function ( s ) {

			this.x += s;
			this.y += s;
			this.z += s;
			this.w += s;

			return this;

		},

		addVectors: function ( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;
			this.z = a.z + b.z;
			this.w = a.w + b.w;

			return this;

		},

		addScaledVector: function ( v, s ) {

			this.x += v.x * s;
			this.y += v.y * s;
			this.z += v.z * s;
			this.w += v.w * s;

			return this;

		},

		sub: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
				return this.subVectors( v, w );

			}

			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;
			this.w -= v.w;

			return this;

		},

		subScalar: function ( s ) {

			this.x -= s;
			this.y -= s;
			this.z -= s;
			this.w -= s;

			return this;

		},

		subVectors: function ( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;
			this.z = a.z - b.z;
			this.w = a.w - b.w;

			return this;

		},

		multiplyScalar: function ( scalar ) {

			this.x *= scalar;
			this.y *= scalar;
			this.z *= scalar;
			this.w *= scalar;

			return this;

		},

		applyMatrix4: function ( m ) {

			var x = this.x, y = this.y, z = this.z, w = this.w;
			var e = m.elements;

			this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] * w;
			this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] * w;
			this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] * w;
			this.w = e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] * w;

			return this;

		},

		divideScalar: function ( scalar ) {

			return this.multiplyScalar( 1 / scalar );

		},

		setAxisAngleFromQuaternion: function ( q ) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

			// q is assumed to be normalized

			this.w = 2 * Math.acos( q.w );

			var s = Math.sqrt( 1 - q.w * q.w );

			if ( s < 0.0001 ) {

				this.x = 1;
				this.y = 0;
				this.z = 0;

			} else {

				this.x = q.x / s;
				this.y = q.y / s;
				this.z = q.z / s;

			}

			return this;

		},

		setAxisAngleFromRotationMatrix: function ( m ) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			var angle, x, y, z,		// variables for result
				epsilon = 0.01,		// margin to allow for rounding errors
				epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

				te = m.elements,

				m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
				m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
				m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

			if ( ( Math.abs( m12 - m21 ) < epsilon ) &&
			     ( Math.abs( m13 - m31 ) < epsilon ) &&
			     ( Math.abs( m23 - m32 ) < epsilon ) ) {

				// singularity found
				// first check for identity matrix which must have +1 for all terms
				// in leading diagonal and zero in other terms

				if ( ( Math.abs( m12 + m21 ) < epsilon2 ) &&
				     ( Math.abs( m13 + m31 ) < epsilon2 ) &&
				     ( Math.abs( m23 + m32 ) < epsilon2 ) &&
				     ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

					// this singularity is identity matrix so angle = 0

					this.set( 1, 0, 0, 0 );

					return this; // zero angle, arbitrary axis

				}

				// otherwise this singularity is angle = 180

				angle = Math.PI;

				var xx = ( m11 + 1 ) / 2;
				var yy = ( m22 + 1 ) / 2;
				var zz = ( m33 + 1 ) / 2;
				var xy = ( m12 + m21 ) / 4;
				var xz = ( m13 + m31 ) / 4;
				var yz = ( m23 + m32 ) / 4;

				if ( ( xx > yy ) && ( xx > zz ) ) {

					// m11 is the largest diagonal term

					if ( xx < epsilon ) {

						x = 0;
						y = 0.707106781;
						z = 0.707106781;

					} else {

						x = Math.sqrt( xx );
						y = xy / x;
						z = xz / x;

					}

				} else if ( yy > zz ) {

					// m22 is the largest diagonal term

					if ( yy < epsilon ) {

						x = 0.707106781;
						y = 0;
						z = 0.707106781;

					} else {

						y = Math.sqrt( yy );
						x = xy / y;
						z = yz / y;

					}

				} else {

					// m33 is the largest diagonal term so base result on this

					if ( zz < epsilon ) {

						x = 0.707106781;
						y = 0.707106781;
						z = 0;

					} else {

						z = Math.sqrt( zz );
						x = xz / z;
						y = yz / z;

					}

				}

				this.set( x, y, z, angle );

				return this; // return 180 deg rotation

			}

			// as we have reached here there are no singularities so we can handle normally

			var s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 ) +
			                   ( m13 - m31 ) * ( m13 - m31 ) +
			                   ( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

			if ( Math.abs( s ) < 0.001 ) s = 1;

			// prevent divide by zero, should not happen if matrix is orthogonal and should be
			// caught by singularity test above, but I've left it in just in case

			this.x = ( m32 - m23 ) / s;
			this.y = ( m13 - m31 ) / s;
			this.z = ( m21 - m12 ) / s;
			this.w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );

			return this;

		},

		min: function ( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );
			this.z = Math.min( this.z, v.z );
			this.w = Math.min( this.w, v.w );

			return this;

		},

		max: function ( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );
			this.z = Math.max( this.z, v.z );
			this.w = Math.max( this.w, v.w );

			return this;

		},

		clamp: function ( min, max ) {

			// assumes min < max, componentwise

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );
			this.z = Math.max( min.z, Math.min( max.z, this.z ) );
			this.w = Math.max( min.w, Math.min( max.w, this.w ) );

			return this;

		},

		clampScalar: function () {

			var min, max;

			return function clampScalar( minVal, maxVal ) {

				if ( min === undefined ) {

					min = new Vector4();
					max = new Vector4();

				}

				min.set( minVal, minVal, minVal, minVal );
				max.set( maxVal, maxVal, maxVal, maxVal );

				return this.clamp( min, max );

			};

		}(),

		clampLength: function ( min, max ) {

			var length = this.length();

			return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

		},

		floor: function () {

			this.x = Math.floor( this.x );
			this.y = Math.floor( this.y );
			this.z = Math.floor( this.z );
			this.w = Math.floor( this.w );

			return this;

		},

		ceil: function () {

			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );
			this.z = Math.ceil( this.z );
			this.w = Math.ceil( this.w );

			return this;

		},

		round: function () {

			this.x = Math.round( this.x );
			this.y = Math.round( this.y );
			this.z = Math.round( this.z );
			this.w = Math.round( this.w );

			return this;

		},

		roundToZero: function () {

			this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
			this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
			this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );
			this.w = ( this.w < 0 ) ? Math.ceil( this.w ) : Math.floor( this.w );

			return this;

		},

		negate: function () {

			this.x = - this.x;
			this.y = - this.y;
			this.z = - this.z;
			this.w = - this.w;

			return this;

		},

		dot: function ( v ) {

			return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

		},

		lengthSq: function () {

			return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

		},

		length: function () {

			return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

		},

		manhattanLength: function () {

			return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );

		},

		normalize: function () {

			return this.divideScalar( this.length() || 1 );

		},

		setLength: function ( length ) {

			return this.normalize().multiplyScalar( length );

		},

		lerp: function ( v, alpha ) {

			this.x += ( v.x - this.x ) * alpha;
			this.y += ( v.y - this.y ) * alpha;
			this.z += ( v.z - this.z ) * alpha;
			this.w += ( v.w - this.w ) * alpha;

			return this;

		},

		lerpVectors: function ( v1, v2, alpha ) {

			return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

		},

		equals: function ( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) && ( v.w === this.w ) );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this.x = array[ offset ];
			this.y = array[ offset + 1 ];
			this.z = array[ offset + 2 ];
			this.w = array[ offset + 3 ];

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;
			array[ offset + 2 ] = this.z;
			array[ offset + 3 ] = this.w;

			return array;

		},

		fromBufferAttribute: function ( attribute, index, offset ) {

			if ( offset !== undefined ) {

				console.warn( 'THREE.Vector4: offset has been removed from .fromBufferAttribute().' );

			}

			this.x = attribute.getX( index );
			this.y = attribute.getY( index );
			this.z = attribute.getZ( index );
			this.w = attribute.getW( index );

			return this;

		}

	} );

	/**
	 * @author szimek / https://github.com/szimek/
	 * @author alteredq / http://alteredqualia.com/
	 * @author Marius Kintel / https://github.com/kintel
	 */

	/*
	 In options, we can specify:
	 * Texture parameters for an auto-generated target texture
	 * depthBuffer/stencilBuffer: Booleans to indicate if we should generate these buffers
	*/
	function WebGLRenderTarget( width, height, options ) {

		this.width = width;
		this.height = height;

		this.scissor = new Vector4( 0, 0, width, height );
		this.scissorTest = false;

		this.viewport = new Vector4( 0, 0, width, height );

		options = options || {};

		this.texture = new Texture( undefined, undefined, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding );

		this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : false;
		this.texture.minFilter = options.minFilter !== undefined ? options.minFilter : LinearFilter;

		this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
		this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;
		this.depthTexture = options.depthTexture !== undefined ? options.depthTexture : null;

	}

	WebGLRenderTarget.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: WebGLRenderTarget,

		isWebGLRenderTarget: true,

		setSize: function ( width, height ) {

			if ( this.width !== width || this.height !== height ) {

				this.width = width;
				this.height = height;

				this.dispose();

			}

			this.viewport.set( 0, 0, width, height );
			this.scissor.set( 0, 0, width, height );

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.width = source.width;
			this.height = source.height;

			this.viewport.copy( source.viewport );

			this.texture = source.texture.clone();

			this.depthBuffer = source.depthBuffer;
			this.stencilBuffer = source.stencilBuffer;
			this.depthTexture = source.depthTexture;

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 * @author Matt DesLauriers / @mattdesl
	 */

	function WebGLMultisampleRenderTarget( width, height, options ) {

		WebGLRenderTarget.call( this, width, height, options );

		this.samples = 4;

	}

	WebGLMultisampleRenderTarget.prototype = Object.assign( Object.create( WebGLRenderTarget.prototype ), {

		constructor: WebGLMultisampleRenderTarget,

		isWebGLMultisampleRenderTarget: true,

		copy: function ( source ) {

			WebGLRenderTarget.prototype.copy.call( this, source );

			this.samples = source.samples;

			return this;

		}

	} );

	/**
	 * @author alteredq / http://alteredqualia.com
	 */

	function WebGLRenderTargetCube( width, height, options ) {

		WebGLRenderTarget.call( this, width, height, options );

	}

	WebGLRenderTargetCube.prototype = Object.create( WebGLRenderTarget.prototype );
	WebGLRenderTargetCube.prototype.constructor = WebGLRenderTargetCube;

	WebGLRenderTargetCube.prototype.isWebGLRenderTargetCube = true;

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */

	function DataTexture( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding ) {

		Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

		this.image = { data: data, width: width, height: height };

		this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
		this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;

		this.generateMipmaps = false;
		this.flipY = false;
		this.unpackAlignment = 1;

	}

	DataTexture.prototype = Object.create( Texture.prototype );
	DataTexture.prototype.constructor = DataTexture;

	DataTexture.prototype.isDataTexture = true;

	/**
	 * @author bhouston / http://clara.io
	 * @author WestLangley / http://github.com/WestLangley
	 */

	function Box3( min, max ) {

		this.min = ( min !== undefined ) ? min : new Vector3( + Infinity, + Infinity, + Infinity );
		this.max = ( max !== undefined ) ? max : new Vector3( - Infinity, - Infinity, - Infinity );

	}

	Object.assign( Box3.prototype, {

		isBox3: true,

		set: function ( min, max ) {

			this.min.copy( min );
			this.max.copy( max );

			return this;

		},

		setFromArray: function ( array ) {

			var minX = + Infinity;
			var minY = + Infinity;
			var minZ = + Infinity;

			var maxX = - Infinity;
			var maxY = - Infinity;
			var maxZ = - Infinity;

			for ( var i = 0, l = array.length; i < l; i += 3 ) {

				var x = array[ i ];
				var y = array[ i + 1 ];
				var z = array[ i + 2 ];

				if ( x < minX ) minX = x;
				if ( y < minY ) minY = y;
				if ( z < minZ ) minZ = z;

				if ( x > maxX ) maxX = x;
				if ( y > maxY ) maxY = y;
				if ( z > maxZ ) maxZ = z;

			}

			this.min.set( minX, minY, minZ );
			this.max.set( maxX, maxY, maxZ );

			return this;

		},

		setFromBufferAttribute: function ( attribute ) {

			var minX = + Infinity;
			var minY = + Infinity;
			var minZ = + Infinity;

			var maxX = - Infinity;
			var maxY = - Infinity;
			var maxZ = - Infinity;

			for ( var i = 0, l = attribute.count; i < l; i ++ ) {

				var x = attribute.getX( i );
				var y = attribute.getY( i );
				var z = attribute.getZ( i );

				if ( x < minX ) minX = x;
				if ( y < minY ) minY = y;
				if ( z < minZ ) minZ = z;

				if ( x > maxX ) maxX = x;
				if ( y > maxY ) maxY = y;
				if ( z > maxZ ) maxZ = z;

			}

			this.min.set( minX, minY, minZ );
			this.max.set( maxX, maxY, maxZ );

			return this;

		},

		setFromPoints: function ( points ) {

			this.makeEmpty();

			for ( var i = 0, il = points.length; i < il; i ++ ) {

				this.expandByPoint( points[ i ] );

			}

			return this;

		},

		setFromCenterAndSize: function () {

			var v1 = new Vector3();

			return function setFromCenterAndSize( center, size ) {

				var halfSize = v1.copy( size ).multiplyScalar( 0.5 );

				this.min.copy( center ).sub( halfSize );
				this.max.copy( center ).add( halfSize );

				return this;

			};

		}(),

		setFromObject: function ( object ) {

			this.makeEmpty();

			return this.expandByObject( object );

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( box ) {

			this.min.copy( box.min );
			this.max.copy( box.max );

			return this;

		},

		makeEmpty: function () {

			this.min.x = this.min.y = this.min.z = + Infinity;
			this.max.x = this.max.y = this.max.z = - Infinity;

			return this;

		},

		isEmpty: function () {

			// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

			return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z );

		},

		getCenter: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Box3: .getCenter() target is now required' );
				target = new Vector3();

			}

			return this.isEmpty() ? target.set( 0, 0, 0 ) : target.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

		},

		getSize: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Box3: .getSize() target is now required' );
				target = new Vector3();

			}

			return this.isEmpty() ? target.set( 0, 0, 0 ) : target.subVectors( this.max, this.min );

		},

		expandByPoint: function ( point ) {

			this.min.min( point );
			this.max.max( point );

			return this;

		},

		expandByVector: function ( vector ) {

			this.min.sub( vector );
			this.max.add( vector );

			return this;

		},

		expandByScalar: function ( scalar ) {

			this.min.addScalar( - scalar );
			this.max.addScalar( scalar );

			return this;

		},

		expandByObject: function () {

			// Computes the world-axis-aligned bounding box of an object (including its children),
			// accounting for both the object's, and children's, world transforms

			var scope, i, l;

			var v1 = new Vector3();

			function traverse( node ) {

				var geometry = node.geometry;

				if ( geometry !== undefined ) {

					if ( geometry.isGeometry ) {

						var vertices = geometry.vertices;

						for ( i = 0, l = vertices.length; i < l; i ++ ) {

							v1.copy( vertices[ i ] );
							v1.applyMatrix4( node.matrixWorld );

							scope.expandByPoint( v1 );

						}

					} else if ( geometry.isBufferGeometry ) {

						var attribute = geometry.attributes.position;

						if ( attribute !== undefined ) {

							for ( i = 0, l = attribute.count; i < l; i ++ ) {

								v1.fromBufferAttribute( attribute, i ).applyMatrix4( node.matrixWorld );

								scope.expandByPoint( v1 );

							}

						}

					}

				}

			}

			return function expandByObject( object ) {

				scope = this;

				object.updateMatrixWorld( true );

				object.traverse( traverse );

				return this;

			};

		}(),

		containsPoint: function ( point ) {

			return point.x < this.min.x || point.x > this.max.x ||
				point.y < this.min.y || point.y > this.max.y ||
				point.z < this.min.z || point.z > this.max.z ? false : true;

		},

		containsBox: function ( box ) {

			return this.min.x <= box.min.x && box.max.x <= this.max.x &&
				this.min.y <= box.min.y && box.max.y <= this.max.y &&
				this.min.z <= box.min.z && box.max.z <= this.max.z;

		},

		getParameter: function ( point, target ) {

			// This can potentially have a divide by zero if the box
			// has a size dimension of 0.

			if ( target === undefined ) {

				console.warn( 'THREE.Box3: .getParameter() target is now required' );
				target = new Vector3();

			}

			return target.set(
				( point.x - this.min.x ) / ( this.max.x - this.min.x ),
				( point.y - this.min.y ) / ( this.max.y - this.min.y ),
				( point.z - this.min.z ) / ( this.max.z - this.min.z )
			);

		},

		intersectsBox: function ( box ) {

			// using 6 splitting planes to rule out intersections.
			return box.max.x < this.min.x || box.min.x > this.max.x ||
				box.max.y < this.min.y || box.min.y > this.max.y ||
				box.max.z < this.min.z || box.min.z > this.max.z ? false : true;

		},

		intersectsSphere: ( function () {

			var closestPoint = new Vector3();

			return function intersectsSphere( sphere ) {

				// Find the point on the AABB closest to the sphere center.
				this.clampPoint( sphere.center, closestPoint );

				// If that point is inside the sphere, the AABB and sphere intersect.
				return closestPoint.distanceToSquared( sphere.center ) <= ( sphere.radius * sphere.radius );

			};

		} )(),

		intersectsPlane: function ( plane ) {

			// We compute the minimum and maximum dot product values. If those values
			// are on the same side (back or front) of the plane, then there is no intersection.

			var min, max;

			if ( plane.normal.x > 0 ) {

				min = plane.normal.x * this.min.x;
				max = plane.normal.x * this.max.x;

			} else {

				min = plane.normal.x * this.max.x;
				max = plane.normal.x * this.min.x;

			}

			if ( plane.normal.y > 0 ) {

				min += plane.normal.y * this.min.y;
				max += plane.normal.y * this.max.y;

			} else {

				min += plane.normal.y * this.max.y;
				max += plane.normal.y * this.min.y;

			}

			if ( plane.normal.z > 0 ) {

				min += plane.normal.z * this.min.z;
				max += plane.normal.z * this.max.z;

			} else {

				min += plane.normal.z * this.max.z;
				max += plane.normal.z * this.min.z;

			}

			return ( min <= - plane.constant && max >= - plane.constant );

		},

		intersectsTriangle: ( function () {

			// triangle centered vertices
			var v0 = new Vector3();
			var v1 = new Vector3();
			var v2 = new Vector3();

			// triangle edge vectors
			var f0 = new Vector3();
			var f1 = new Vector3();
			var f2 = new Vector3();

			var testAxis = new Vector3();

			var center = new Vector3();
			var extents = new Vector3();

			var triangleNormal = new Vector3();

			function satForAxes( axes ) {

				var i, j;

				for ( i = 0, j = axes.length - 3; i <= j; i += 3 ) {

					testAxis.fromArray( axes, i );
					// project the aabb onto the seperating axis
					var r = extents.x * Math.abs( testAxis.x ) + extents.y * Math.abs( testAxis.y ) + extents.z * Math.abs( testAxis.z );
					// project all 3 vertices of the triangle onto the seperating axis
					var p0 = v0.dot( testAxis );
					var p1 = v1.dot( testAxis );
					var p2 = v2.dot( testAxis );
					// actual test, basically see if either of the most extreme of the triangle points intersects r
					if ( Math.max( - Math.max( p0, p1, p2 ), Math.min( p0, p1, p2 ) ) > r ) {

						// points of the projected triangle are outside the projected half-length of the aabb
						// the axis is seperating and we can exit
						return false;

					}

				}

				return true;

			}

			return function intersectsTriangle( triangle ) {

				if ( this.isEmpty() ) {

					return false;

				}

				// compute box center and extents
				this.getCenter( center );
				extents.subVectors( this.max, center );

				// translate triangle to aabb origin
				v0.subVectors( triangle.a, center );
				v1.subVectors( triangle.b, center );
				v2.subVectors( triangle.c, center );

				// compute edge vectors for triangle
				f0.subVectors( v1, v0 );
				f1.subVectors( v2, v1 );
				f2.subVectors( v0, v2 );

				// test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
				// make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
				// axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
				var axes = [
					0, - f0.z, f0.y, 0, - f1.z, f1.y, 0, - f2.z, f2.y,
					f0.z, 0, - f0.x, f1.z, 0, - f1.x, f2.z, 0, - f2.x,
					- f0.y, f0.x, 0, - f1.y, f1.x, 0, - f2.y, f2.x, 0
				];
				if ( ! satForAxes( axes ) ) {

					return false;

				}

				// test 3 face normals from the aabb
				axes = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
				if ( ! satForAxes( axes ) ) {

					return false;

				}

				// finally testing the face normal of the triangle
				// use already existing triangle edge vectors here
				triangleNormal.crossVectors( f0, f1 );
				axes = [ triangleNormal.x, triangleNormal.y, triangleNormal.z ];
				return satForAxes( axes );

			};

		} )(),

		clampPoint: function ( point, target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Box3: .clampPoint() target is now required' );
				target = new Vector3();

			}

			return target.copy( point ).clamp( this.min, this.max );

		},

		distanceToPoint: function () {

			var v1 = new Vector3();

			return function distanceToPoint( point ) {

				var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
				return clampedPoint.sub( point ).length();

			};

		}(),

		getBoundingSphere: function () {

			var v1 = new Vector3();

			return function getBoundingSphere( target ) {

				if ( target === undefined ) {

					console.warn( 'THREE.Box3: .getBoundingSphere() target is now required' );
					target = new Sphere();

				}

				this.getCenter( target.center );

				target.radius = this.getSize( v1 ).length() * 0.5;

				return target;

			};

		}(),

		intersect: function ( box ) {

			this.min.max( box.min );
			this.max.min( box.max );

			// ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
			if ( this.isEmpty() ) this.makeEmpty();

			return this;

		},

		union: function ( box ) {

			this.min.min( box.min );
			this.max.max( box.max );

			return this;

		},

		applyMatrix4: function () {

			var points = [
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3(),
				new Vector3()
			];

			return function applyMatrix4( matrix ) {

				// transform of empty box is an empty box.
				if ( this.isEmpty() ) return this;

				// NOTE: I am using a binary pattern to specify all 2^3 combinations below
				points[ 0 ].set( this.min.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 000
				points[ 1 ].set( this.min.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 001
				points[ 2 ].set( this.min.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 010
				points[ 3 ].set( this.min.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 011
				points[ 4 ].set( this.max.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 100
				points[ 5 ].set( this.max.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 101
				points[ 6 ].set( this.max.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 110
				points[ 7 ].set( this.max.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 111

				this.setFromPoints( points );

				return this;

			};

		}(),

		translate: function ( offset ) {

			this.min.add( offset );
			this.max.add( offset );

			return this;

		},

		equals: function ( box ) {

			return box.min.equals( this.min ) && box.max.equals( this.max );

		}

	} );

	/**
	 * @author bhouston / http://clara.io
	 * @author mrdoob / http://mrdoob.com/
	 */

	function Sphere( center, radius ) {

		this.center = ( center !== undefined ) ? center : new Vector3();
		this.radius = ( radius !== undefined ) ? radius : 0;

	}

	Object.assign( Sphere.prototype, {

		set: function ( center, radius ) {

			this.center.copy( center );
			this.radius = radius;

			return this;

		},

		setFromPoints: function () {

			var box = new Box3();

			return function setFromPoints( points, optionalCenter ) {

				var center = this.center;

				if ( optionalCenter !== undefined ) {

					center.copy( optionalCenter );

				} else {

					box.setFromPoints( points ).getCenter( center );

				}

				var maxRadiusSq = 0;

				for ( var i = 0, il = points.length; i < il; i ++ ) {

					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );

				}

				this.radius = Math.sqrt( maxRadiusSq );

				return this;

			};

		}(),

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( sphere ) {

			this.center.copy( sphere.center );
			this.radius = sphere.radius;

			return this;

		},

		empty: function () {

			return ( this.radius <= 0 );

		},

		containsPoint: function ( point ) {

			return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

		},

		distanceToPoint: function ( point ) {

			return ( point.distanceTo( this.center ) - this.radius );

		},

		intersectsSphere: function ( sphere ) {

			var radiusSum = this.radius + sphere.radius;

			return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

		},

		intersectsBox: function ( box ) {

			return box.intersectsSphere( this );

		},

		intersectsPlane: function ( plane ) {

			return Math.abs( plane.distanceToPoint( this.center ) ) <= this.radius;

		},

		clampPoint: function ( point, target ) {

			var deltaLengthSq = this.center.distanceToSquared( point );

			if ( target === undefined ) {

				console.warn( 'THREE.Sphere: .clampPoint() target is now required' );
				target = new Vector3();

			}

			target.copy( point );

			if ( deltaLengthSq > ( this.radius * this.radius ) ) {

				target.sub( this.center ).normalize();
				target.multiplyScalar( this.radius ).add( this.center );

			}

			return target;

		},

		getBoundingBox: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Sphere: .getBoundingBox() target is now required' );
				target = new Box3();

			}

			target.set( this.center, this.center );
			target.expandByScalar( this.radius );

			return target;

		},

		applyMatrix4: function ( matrix ) {

			this.center.applyMatrix4( matrix );
			this.radius = this.radius * matrix.getMaxScaleOnAxis();

			return this;

		},

		translate: function ( offset ) {

			this.center.add( offset );

			return this;

		},

		equals: function ( sphere ) {

			return sphere.center.equals( this.center ) && ( sphere.radius === this.radius );

		}

	} );

	/**
	 * @author bhouston / http://clara.io
	 */

	function Plane( normal, constant ) {

		// normal is assumed to be normalized

		this.normal = ( normal !== undefined ) ? normal : new Vector3( 1, 0, 0 );
		this.constant = ( constant !== undefined ) ? constant : 0;

	}

	Object.assign( Plane.prototype, {

		set: function ( normal, constant ) {

			this.normal.copy( normal );
			this.constant = constant;

			return this;

		},

		setComponents: function ( x, y, z, w ) {

			this.normal.set( x, y, z );
			this.constant = w;

			return this;

		},

		setFromNormalAndCoplanarPoint: function ( normal, point ) {

			this.normal.copy( normal );
			this.constant = - point.dot( this.normal );

			return this;

		},

		setFromCoplanarPoints: function () {

			var v1 = new Vector3();
			var v2 = new Vector3();

			return function setFromCoplanarPoints( a, b, c ) {

				var normal = v1.subVectors( c, b ).cross( v2.subVectors( a, b ) ).normalize();

				// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

				this.setFromNormalAndCoplanarPoint( normal, a );

				return this;

			};

		}(),

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( plane ) {

			this.normal.copy( plane.normal );
			this.constant = plane.constant;

			return this;

		},

		normalize: function () {

			// Note: will lead to a divide by zero if the plane is invalid.

			var inverseNormalLength = 1.0 / this.normal.length();
			this.normal.multiplyScalar( inverseNormalLength );
			this.constant *= inverseNormalLength;

			return this;

		},

		negate: function () {

			this.constant *= - 1;
			this.normal.negate();

			return this;

		},

		distanceToPoint: function ( point ) {

			return this.normal.dot( point ) + this.constant;

		},

		distanceToSphere: function ( sphere ) {

			return this.distanceToPoint( sphere.center ) - sphere.radius;

		},

		projectPoint: function ( point, target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Plane: .projectPoint() target is now required' );
				target = new Vector3();

			}

			return target.copy( this.normal ).multiplyScalar( - this.distanceToPoint( point ) ).add( point );

		},

		intersectLine: function () {

			var v1 = new Vector3();

			return function intersectLine( line, target ) {

				if ( target === undefined ) {

					console.warn( 'THREE.Plane: .intersectLine() target is now required' );
					target = new Vector3();

				}

				var direction = line.delta( v1 );

				var denominator = this.normal.dot( direction );

				if ( denominator === 0 ) {

					// line is coplanar, return origin
					if ( this.distanceToPoint( line.start ) === 0 ) {

						return target.copy( line.start );

					}

					// Unsure if this is the correct method to handle this case.
					return undefined;

				}

				var t = - ( line.start.dot( this.normal ) + this.constant ) / denominator;

				if ( t < 0 || t > 1 ) {

					return undefined;

				}

				return target.copy( direction ).multiplyScalar( t ).add( line.start );

			};

		}(),

		intersectsLine: function ( line ) {

			// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

			var startSign = this.distanceToPoint( line.start );
			var endSign = this.distanceToPoint( line.end );

			return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );

		},

		intersectsBox: function ( box ) {

			return box.intersectsPlane( this );

		},

		intersectsSphere: function ( sphere ) {

			return sphere.intersectsPlane( this );

		},

		coplanarPoint: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Plane: .coplanarPoint() target is now required' );
				target = new Vector3();

			}

			return target.copy( this.normal ).multiplyScalar( - this.constant );

		},

		applyMatrix4: function () {

			var v1 = new Vector3();
			var m1 = new Matrix3();

			return function applyMatrix4( matrix, optionalNormalMatrix ) {

				var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix( matrix );

				var referencePoint = this.coplanarPoint( v1 ).applyMatrix4( matrix );

				var normal = this.normal.applyMatrix3( normalMatrix ).normalize();

				this.constant = - referencePoint.dot( normal );

				return this;

			};

		}(),

		translate: function ( offset ) {

			this.constant -= offset.dot( this.normal );

			return this;

		},

		equals: function ( plane ) {

			return plane.normal.equals( this.normal ) && ( plane.constant === this.constant );

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author bhouston / http://clara.io
	 */

	function Frustum( p0, p1, p2, p3, p4, p5 ) {

		this.planes = [

			( p0 !== undefined ) ? p0 : new Plane(),
			( p1 !== undefined ) ? p1 : new Plane(),
			( p2 !== undefined ) ? p2 : new Plane(),
			( p3 !== undefined ) ? p3 : new Plane(),
			( p4 !== undefined ) ? p4 : new Plane(),
			( p5 !== undefined ) ? p5 : new Plane()

		];

	}

	Object.assign( Frustum.prototype, {

		set: function ( p0, p1, p2, p3, p4, p5 ) {

			var planes = this.planes;

			planes[ 0 ].copy( p0 );
			planes[ 1 ].copy( p1 );
			planes[ 2 ].copy( p2 );
			planes[ 3 ].copy( p3 );
			planes[ 4 ].copy( p4 );
			planes[ 5 ].copy( p5 );

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( frustum ) {

			var planes = this.planes;

			for ( var i = 0; i < 6; i ++ ) {

				planes[ i ].copy( frustum.planes[ i ] );

			}

			return this;

		},

		setFromMatrix: function ( m ) {

			var planes = this.planes;
			var me = m.elements;
			var me0 = me[ 0 ], me1 = me[ 1 ], me2 = me[ 2 ], me3 = me[ 3 ];
			var me4 = me[ 4 ], me5 = me[ 5 ], me6 = me[ 6 ], me7 = me[ 7 ];
			var me8 = me[ 8 ], me9 = me[ 9 ], me10 = me[ 10 ], me11 = me[ 11 ];
			var me12 = me[ 12 ], me13 = me[ 13 ], me14 = me[ 14 ], me15 = me[ 15 ];

			planes[ 0 ].setComponents( me3 - me0, me7 - me4, me11 - me8, me15 - me12 ).normalize();
			planes[ 1 ].setComponents( me3 + me0, me7 + me4, me11 + me8, me15 + me12 ).normalize();
			planes[ 2 ].setComponents( me3 + me1, me7 + me5, me11 + me9, me15 + me13 ).normalize();
			planes[ 3 ].setComponents( me3 - me1, me7 - me5, me11 - me9, me15 - me13 ).normalize();
			planes[ 4 ].setComponents( me3 - me2, me7 - me6, me11 - me10, me15 - me14 ).normalize();
			planes[ 5 ].setComponents( me3 + me2, me7 + me6, me11 + me10, me15 + me14 ).normalize();

			return this;

		},

		intersectsObject: function () {

			var sphere = new Sphere();

			return function intersectsObject( object ) {

				var geometry = object.geometry;

				if ( geometry.boundingSphere === null )
					geometry.computeBoundingSphere();

				sphere.copy( geometry.boundingSphere )
					.applyMatrix4( object.matrixWorld );

				return this.intersectsSphere( sphere );

			};

		}(),

		intersectsSprite: function () {

			var sphere = new Sphere();

			return function intersectsSprite( sprite ) {

				sphere.center.set( 0, 0, 0 );
				sphere.radius = 0.7071067811865476;
				sphere.applyMatrix4( sprite.matrixWorld );

				return this.intersectsSphere( sphere );

			};

		}(),

		intersectsSphere: function ( sphere ) {

			var planes = this.planes;
			var center = sphere.center;
			var negRadius = - sphere.radius;

			for ( var i = 0; i < 6; i ++ ) {

				var distance = planes[ i ].distanceToPoint( center );

				if ( distance < negRadius ) {

					return false;

				}

			}

			return true;

		},

		intersectsBox: function () {

			var p = new Vector3();

			return function intersectsBox( box ) {

				var planes = this.planes;

				for ( var i = 0; i < 6; i ++ ) {

					var plane = planes[ i ];

					// corner at max distance

					p.x = plane.normal.x > 0 ? box.max.x : box.min.x;
					p.y = plane.normal.y > 0 ? box.max.y : box.min.y;
					p.z = plane.normal.z > 0 ? box.max.z : box.min.z;

					if ( plane.distanceToPoint( p ) < 0 ) {

						return false;

					}

				}

				return true;

			};

		}(),

		containsPoint: function ( point ) {

			var planes = this.planes;

			for ( var i = 0; i < 6; i ++ ) {

				if ( planes[ i ].distanceToPoint( point ) < 0 ) {

					return false;

				}

			}

			return true;

		}

	} );

	var alphamap_fragment = "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif";

	var alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif";

	var alphatest_fragment = "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif";

	var aomap_fragment = "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif";

	var aomap_pars_fragment = "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif";

	var begin_vertex = "vec3 transformed = vec3( position );";

	var beginnormal_vertex = "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif";

	var bsdfs = "vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick( specularColor, dotNV );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}";

	var bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif";

	var clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t#endif\n#endif";

	var clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif";

	var clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvarying vec3 vViewPosition;\n#endif";

	var clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif";

	var color_fragment = "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif";

	var color_pars_fragment = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif";

	var color_pars_vertex = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif";

	var color_vertex = "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif";

	var common = "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}";

	var cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV( sampler2D envMap, vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif";

	var defaultnormal_vertex = "vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = normalMatrix * objectTangent;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif";

	var displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif";

	var displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif";

	var emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif";

	var emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif";

	var encodings_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );";

	var encodings_pars_fragment = "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}";

	var envmap_fragment = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif";

	var envmap_pars_fragment = "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif";

	var envmap_pars_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif";

	var envmap_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif";

	var fog_vertex = "#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif";

	var fog_pars_vertex = "#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif";

	var fog_fragment = "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif";

	var fog_pars_fragment = "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif";

	var gradientmap_pars_fragment = "#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif";

	var lightmap_fragment = "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif";

	var lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif";

	var lights_lambert_vertex = "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif";

	var lights_pars_begin = "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif";

	var envmap_physical_pars_fragment = "#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent ));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif";

	var lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;";

	var lights_phong_pars_fragment = "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)";

	var lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif";

	var lights_physical_pars_fragment = "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\t\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#endif\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\tfloat clearCoatInv = 1.0 - clearCoatDHR;\n\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec3 singleScattering = vec3( 0.0 );\n\t\tvec3 multiScattering = vec3( 0.0 );\n\t\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\t\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\t\tvec3 diffuse = material.diffuseColor;\n\t\treflectedLight.indirectSpecular += clearCoatInv * radiance * singleScattering;\n\t\treflectedLight.indirectDiffuse += multiScattering * cosineWeightedIrradiance;\n\t\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n\t#else\n\t\treflectedLight.indirectSpecular += clearCoatInv * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#endif\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}";

	var lights_fragment_begin = "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearCoatRadiance = vec3( 0.0 );\n#endif";

	var lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), maxMipLevel );\n\t#ifndef STANDARD\n\t\tclearCoatRadiance += getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );\n\t#endif\n#endif";

	var lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, irradiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif";

	var logdepthbuf_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";

	var logdepthbuf_pars_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n#endif";

	var logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif";

	var logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\tgl_Position.z *= gl_Position.w;\n\t#endif\n#endif";

	var map_fragment = "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif";

	var map_pars_fragment = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif";

	var map_particle_fragment = "#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif";

	var map_particle_pars_fragment = "#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif";

	var metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif";

	var metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif";

	var morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif";

	var morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif";

	var morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif";

	var normal_fragment_begin = "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\tbitangent = bitangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t#endif\n#endif";

	var normal_fragment_maps = "#ifdef USE_NORMALMAP\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t#ifdef FLIP_SIDED\n\t\t\tnormal = - normal;\n\t\t#endif\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\tnormal = normalize( normalMatrix * normal );\n\t#else\n\t\t#ifdef USE_TANGENT\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t\tmapN.xy = normalScale * mapN.xy;\n\t\t\tnormal = normalize( vTBN * mapN );\n\t\t#else\n\t\t\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\t\t#endif\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif";

	var normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tuniform mat3 normalMatrix;\n\t#else\n\t\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\t\tvec2 st0 = dFdx( vUv.st );\n\t\t\tvec2 st1 = dFdy( vUv.st );\n\t\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\t\tvec3 N = normalize( surf_norm );\n\t\t\tmat3 tsn = mat3( S, T, N );\n\t\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t\tmapN.xy *= normalScale;\n\t\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\treturn normalize( tsn * mapN );\n\t\t}\n\t#endif\n#endif";

	var packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}";

	var premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif";

	var project_vertex = "vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;";

	var dithering_fragment = "#if defined( DITHERING )\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif";

	var dithering_pars_fragment = "#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif";

	var roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif";

	var roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif";

	var shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif";

	var shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif";

	var shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif";

	var shadowmask_pars_fragment = "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}";

	var skinbase_vertex = "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";

	var skinning_pars_vertex = "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif";

	var skinning_vertex = "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif";

	var skinnormal_vertex = "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif";

	var specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif";

	var specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif";

	var tonemapping_fragment = "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif";

	var tonemapping_pars_fragment = "#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );\n}";

	var uv_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif";

	var uv_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif";

	var uv_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif";

	var uv2_pars_fragment = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif";

	var uv2_pars_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif";

	var uv2_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif";

	var worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif";

	var background_frag = "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";

	var background_vert = "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}";

	var cube_frag = "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";

	var cube_vert = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}";

	var depth_frag = "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}";

	var depth_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}";

	var distanceRGBA_frag = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}";

	var distanceRGBA_vert = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}";

	var equirect_frag = "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";

	var equirect_vert = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}";

	var linedashed_frag = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";

	var linedashed_vert = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";

	var meshbasic_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";

	var meshbasic_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}";

	var meshlambert_frag = "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	var meshlambert_vert = "#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	var meshmatcap_frag = "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";

	var meshmatcap_vert = "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}";

	var meshphong_frag = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	var meshphong_vert = "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	var meshphysical_frag = "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	var meshphysical_vert = "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	var normal_frag = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}";

	var normal_vert = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}";

	var points_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";

	var points_vert = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}";

	var shadow_frag = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}";

	var shadow_vert = "#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	var sprite_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";

	var sprite_vert = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";

	var ShaderChunk = {
		alphamap_fragment: alphamap_fragment,
		alphamap_pars_fragment: alphamap_pars_fragment,
		alphatest_fragment: alphatest_fragment,
		aomap_fragment: aomap_fragment,
		aomap_pars_fragment: aomap_pars_fragment,
		begin_vertex: begin_vertex,
		beginnormal_vertex: beginnormal_vertex,
		bsdfs: bsdfs,
		bumpmap_pars_fragment: bumpmap_pars_fragment,
		clipping_planes_fragment: clipping_planes_fragment,
		clipping_planes_pars_fragment: clipping_planes_pars_fragment,
		clipping_planes_pars_vertex: clipping_planes_pars_vertex,
		clipping_planes_vertex: clipping_planes_vertex,
		color_fragment: color_fragment,
		color_pars_fragment: color_pars_fragment,
		color_pars_vertex: color_pars_vertex,
		color_vertex: color_vertex,
		common: common,
		cube_uv_reflection_fragment: cube_uv_reflection_fragment,
		defaultnormal_vertex: defaultnormal_vertex,
		displacementmap_pars_vertex: displacementmap_pars_vertex,
		displacementmap_vertex: displacementmap_vertex,
		emissivemap_fragment: emissivemap_fragment,
		emissivemap_pars_fragment: emissivemap_pars_fragment,
		encodings_fragment: encodings_fragment,
		encodings_pars_fragment: encodings_pars_fragment,
		envmap_fragment: envmap_fragment,
		envmap_pars_fragment: envmap_pars_fragment,
		envmap_pars_vertex: envmap_pars_vertex,
		envmap_physical_pars_fragment: envmap_physical_pars_fragment,
		envmap_vertex: envmap_vertex,
		fog_vertex: fog_vertex,
		fog_pars_vertex: fog_pars_vertex,
		fog_fragment: fog_fragment,
		fog_pars_fragment: fog_pars_fragment,
		gradientmap_pars_fragment: gradientmap_pars_fragment,
		lightmap_fragment: lightmap_fragment,
		lightmap_pars_fragment: lightmap_pars_fragment,
		lights_lambert_vertex: lights_lambert_vertex,
		lights_pars_begin: lights_pars_begin,
		lights_phong_fragment: lights_phong_fragment,
		lights_phong_pars_fragment: lights_phong_pars_fragment,
		lights_physical_fragment: lights_physical_fragment,
		lights_physical_pars_fragment: lights_physical_pars_fragment,
		lights_fragment_begin: lights_fragment_begin,
		lights_fragment_maps: lights_fragment_maps,
		lights_fragment_end: lights_fragment_end,
		logdepthbuf_fragment: logdepthbuf_fragment,
		logdepthbuf_pars_fragment: logdepthbuf_pars_fragment,
		logdepthbuf_pars_vertex: logdepthbuf_pars_vertex,
		logdepthbuf_vertex: logdepthbuf_vertex,
		map_fragment: map_fragment,
		map_pars_fragment: map_pars_fragment,
		map_particle_fragment: map_particle_fragment,
		map_particle_pars_fragment: map_particle_pars_fragment,
		metalnessmap_fragment: metalnessmap_fragment,
		metalnessmap_pars_fragment: metalnessmap_pars_fragment,
		morphnormal_vertex: morphnormal_vertex,
		morphtarget_pars_vertex: morphtarget_pars_vertex,
		morphtarget_vertex: morphtarget_vertex,
		normal_fragment_begin: normal_fragment_begin,
		normal_fragment_maps: normal_fragment_maps,
		normalmap_pars_fragment: normalmap_pars_fragment,
		packing: packing,
		premultiplied_alpha_fragment: premultiplied_alpha_fragment,
		project_vertex: project_vertex,
		dithering_fragment: dithering_fragment,
		dithering_pars_fragment: dithering_pars_fragment,
		roughnessmap_fragment: roughnessmap_fragment,
		roughnessmap_pars_fragment: roughnessmap_pars_fragment,
		shadowmap_pars_fragment: shadowmap_pars_fragment,
		shadowmap_pars_vertex: shadowmap_pars_vertex,
		shadowmap_vertex: shadowmap_vertex,
		shadowmask_pars_fragment: shadowmask_pars_fragment,
		skinbase_vertex: skinbase_vertex,
		skinning_pars_vertex: skinning_pars_vertex,
		skinning_vertex: skinning_vertex,
		skinnormal_vertex: skinnormal_vertex,
		specularmap_fragment: specularmap_fragment,
		specularmap_pars_fragment: specularmap_pars_fragment,
		tonemapping_fragment: tonemapping_fragment,
		tonemapping_pars_fragment: tonemapping_pars_fragment,
		uv_pars_fragment: uv_pars_fragment,
		uv_pars_vertex: uv_pars_vertex,
		uv_vertex: uv_vertex,
		uv2_pars_fragment: uv2_pars_fragment,
		uv2_pars_vertex: uv2_pars_vertex,
		uv2_vertex: uv2_vertex,
		worldpos_vertex: worldpos_vertex,

		background_frag: background_frag,
		background_vert: background_vert,
		cube_frag: cube_frag,
		cube_vert: cube_vert,
		depth_frag: depth_frag,
		depth_vert: depth_vert,
		distanceRGBA_frag: distanceRGBA_frag,
		distanceRGBA_vert: distanceRGBA_vert,
		equirect_frag: equirect_frag,
		equirect_vert: equirect_vert,
		linedashed_frag: linedashed_frag,
		linedashed_vert: linedashed_vert,
		meshbasic_frag: meshbasic_frag,
		meshbasic_vert: meshbasic_vert,
		meshlambert_frag: meshlambert_frag,
		meshlambert_vert: meshlambert_vert,
		meshmatcap_frag: meshmatcap_frag,
		meshmatcap_vert: meshmatcap_vert,
		meshphong_frag: meshphong_frag,
		meshphong_vert: meshphong_vert,
		meshphysical_frag: meshphysical_frag,
		meshphysical_vert: meshphysical_vert,
		normal_frag: normal_frag,
		normal_vert: normal_vert,
		points_frag: points_frag,
		points_vert: points_vert,
		shadow_frag: shadow_frag,
		shadow_vert: shadow_vert,
		sprite_frag: sprite_frag,
		sprite_vert: sprite_vert
	};

	/**
	 * Uniform Utilities
	 */

	function cloneUniforms( src ) {

		var dst = {};

		for ( var u in src ) {

			dst[ u ] = {};

			for ( var p in src[ u ] ) {

				var property = src[ u ][ p ];

				if ( property && ( property.isColor ||
					property.isMatrix3 || property.isMatrix4 ||
					property.isVector2 || property.isVector3 || property.isVector4 ||
					property.isTexture ) ) {

					dst[ u ][ p ] = property.clone();

				} else if ( Array.isArray( property ) ) {

					dst[ u ][ p ] = property.slice();

				} else {

					dst[ u ][ p ] = property;

				}

			}

		}

		return dst;

	}

	function mergeUniforms( uniforms ) {

		var merged = {};

		for ( var u = 0; u < uniforms.length; u ++ ) {

			var tmp = cloneUniforms( uniforms[ u ] );

			for ( var p in tmp ) {

				merged[ p ] = tmp[ p ];

			}

		}

		return merged;

	}

	// Legacy

	var UniformsUtils = { clone: cloneUniforms, merge: mergeUniforms };

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	var ColorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
		'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
		'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
		'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
		'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
		'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
		'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
		'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
		'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
		'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
		'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
		'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
		'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
		'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
		'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
		'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
		'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
		'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
		'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
		'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
		'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
		'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
		'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
		'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };

	function Color( r, g, b ) {

		if ( g === undefined && b === undefined ) {

			// r is THREE.Color, hex or string
			return this.set( r );

		}

		return this.setRGB( r, g, b );

	}

	Object.assign( Color.prototype, {

		isColor: true,

		r: 1, g: 1, b: 1,

		set: function ( value ) {

			if ( value && value.isColor ) {

				this.copy( value );

			} else if ( typeof value === 'number' ) {

				this.setHex( value );

			} else if ( typeof value === 'string' ) {

				this.setStyle( value );

			}

			return this;

		},

		setScalar: function ( scalar ) {

			this.r = scalar;
			this.g = scalar;
			this.b = scalar;

			return this;

		},

		setHex: function ( hex ) {

			hex = Math.floor( hex );

			this.r = ( hex >> 16 & 255 ) / 255;
			this.g = ( hex >> 8 & 255 ) / 255;
			this.b = ( hex & 255 ) / 255;

			return this;

		},

		setRGB: function ( r, g, b ) {

			this.r = r;
			this.g = g;
			this.b = b;

			return this;

		},

		setHSL: function () {

			function hue2rgb( p, q, t ) {

				if ( t < 0 ) t += 1;
				if ( t > 1 ) t -= 1;
				if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
				if ( t < 1 / 2 ) return q;
				if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
				return p;

			}

			return function setHSL( h, s, l ) {

				// h,s,l ranges are in 0.0 - 1.0
				h = _Math.euclideanModulo( h, 1 );
				s = _Math.clamp( s, 0, 1 );
				l = _Math.clamp( l, 0, 1 );

				if ( s === 0 ) {

					this.r = this.g = this.b = l;

				} else {

					var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
					var q = ( 2 * l ) - p;

					this.r = hue2rgb( q, p, h + 1 / 3 );
					this.g = hue2rgb( q, p, h );
					this.b = hue2rgb( q, p, h - 1 / 3 );

				}

				return this;

			};

		}(),

		setStyle: function ( style ) {

			function handleAlpha( string ) {

				if ( string === undefined ) return;

				if ( parseFloat( string ) < 1 ) {

					console.warn( 'THREE.Color: Alpha component of ' + style + ' will be ignored.' );

				}

			}


			var m;

			if ( m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec( style ) ) {

				// rgb / hsl

				var color;
				var name = m[ 1 ];
				var components = m[ 2 ];

				switch ( name ) {

					case 'rgb':
					case 'rgba':

						if ( color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

							// rgb(255,0,0) rgba(255,0,0,0.5)
							this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
							this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
							this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

							handleAlpha( color[ 5 ] );

							return this;

						}

						if ( color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

							// rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
							this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
							this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
							this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

							handleAlpha( color[ 5 ] );

							return this;

						}

						break;

					case 'hsl':
					case 'hsla':

						if ( color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

							// hsl(120,50%,50%) hsla(120,50%,50%,0.5)
							var h = parseFloat( color[ 1 ] ) / 360;
							var s = parseInt( color[ 2 ], 10 ) / 100;
							var l = parseInt( color[ 3 ], 10 ) / 100;

							handleAlpha( color[ 5 ] );

							return this.setHSL( h, s, l );

						}

						break;

				}

			} else if ( m = /^\#([A-Fa-f0-9]+)$/.exec( style ) ) {

				// hex color

				var hex = m[ 1 ];
				var size = hex.length;

				if ( size === 3 ) {

					// #ff0
					this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 0 ), 16 ) / 255;
					this.g = parseInt( hex.charAt( 1 ) + hex.charAt( 1 ), 16 ) / 255;
					this.b = parseInt( hex.charAt( 2 ) + hex.charAt( 2 ), 16 ) / 255;

					return this;

				} else if ( size === 6 ) {

					// #ff0000
					this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 1 ), 16 ) / 255;
					this.g = parseInt( hex.charAt( 2 ) + hex.charAt( 3 ), 16 ) / 255;
					this.b = parseInt( hex.charAt( 4 ) + hex.charAt( 5 ), 16 ) / 255;

					return this;

				}

			}

			if ( style && style.length > 0 ) {

				// color keywords
				var hex = ColorKeywords[ style ];

				if ( hex !== undefined ) {

					// red
					this.setHex( hex );

				} else {

					// unknown color
					console.warn( 'THREE.Color: Unknown color ' + style );

				}

			}

			return this;

		},

		clone: function () {

			return new this.constructor( this.r, this.g, this.b );

		},

		copy: function ( color ) {

			this.r = color.r;
			this.g = color.g;
			this.b = color.b;

			return this;

		},

		copyGammaToLinear: function ( color, gammaFactor ) {

			if ( gammaFactor === undefined ) gammaFactor = 2.0;

			this.r = Math.pow( color.r, gammaFactor );
			this.g = Math.pow( color.g, gammaFactor );
			this.b = Math.pow( color.b, gammaFactor );

			return this;

		},

		copyLinearToGamma: function ( color, gammaFactor ) {

			if ( gammaFactor === undefined ) gammaFactor = 2.0;

			var safeInverse = ( gammaFactor > 0 ) ? ( 1.0 / gammaFactor ) : 1.0;

			this.r = Math.pow( color.r, safeInverse );
			this.g = Math.pow( color.g, safeInverse );
			this.b = Math.pow( color.b, safeInverse );

			return this;

		},

		convertGammaToLinear: function ( gammaFactor ) {

			this.copyGammaToLinear( this, gammaFactor );

			return this;

		},

		convertLinearToGamma: function ( gammaFactor ) {

			this.copyLinearToGamma( this, gammaFactor );

			return this;

		},

		copySRGBToLinear: function () {

			function SRGBToLinear( c ) {

				return ( c < 0.04045 ) ? c * 0.0773993808 : Math.pow( c * 0.9478672986 + 0.0521327014, 2.4 );

			}

			return function copySRGBToLinear( color ) {

				this.r = SRGBToLinear( color.r );
				this.g = SRGBToLinear( color.g );
				this.b = SRGBToLinear( color.b );

				return this;

			};

		}(),

		copyLinearToSRGB: function () {

			function LinearToSRGB( c ) {

				return ( c < 0.0031308 ) ? c * 12.92 : 1.055 * ( Math.pow( c, 0.41666 ) ) - 0.055;

			}

			return function copyLinearToSRGB( color ) {

				this.r = LinearToSRGB( color.r );
				this.g = LinearToSRGB( color.g );
				this.b = LinearToSRGB( color.b );

				return this;

			};

		}(),

		convertSRGBToLinear: function () {

			this.copySRGBToLinear( this );

			return this;

		},

		convertLinearToSRGB: function () {

			this.copyLinearToSRGB( this );

			return this;

		},

		getHex: function () {

			return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

		},

		getHexString: function () {

			return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

		},

		getHSL: function ( target ) {

			// h,s,l ranges are in 0.0 - 1.0

			if ( target === undefined ) {

				console.warn( 'THREE.Color: .getHSL() target is now required' );
				target = { h: 0, s: 0, l: 0 };

			}

			var r = this.r, g = this.g, b = this.b;

			var max = Math.max( r, g, b );
			var min = Math.min( r, g, b );

			var hue, saturation;
			var lightness = ( min + max ) / 2.0;

			if ( min === max ) {

				hue = 0;
				saturation = 0;

			} else {

				var delta = max - min;

				saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

				switch ( max ) {

					case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
					case g: hue = ( b - r ) / delta + 2; break;
					case b: hue = ( r - g ) / delta + 4; break;

				}

				hue /= 6;

			}

			target.h = hue;
			target.s = saturation;
			target.l = lightness;

			return target;

		},

		getStyle: function () {

			return 'rgb(' + ( ( this.r * 255 ) | 0 ) + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

		},

		offsetHSL: function () {

			var hsl = {};

			return function ( h, s, l ) {

				this.getHSL( hsl );

				hsl.h += h; hsl.s += s; hsl.l += l;

				this.setHSL( hsl.h, hsl.s, hsl.l );

				return this;

			};

		}(),

		add: function ( color ) {

			this.r += color.r;
			this.g += color.g;
			this.b += color.b;

			return this;

		},

		addColors: function ( color1, color2 ) {

			this.r = color1.r + color2.r;
			this.g = color1.g + color2.g;
			this.b = color1.b + color2.b;

			return this;

		},

		addScalar: function ( s ) {

			this.r += s;
			this.g += s;
			this.b += s;

			return this;

		},

		sub: function ( color ) {

			this.r = Math.max( 0, this.r - color.r );
			this.g = Math.max( 0, this.g - color.g );
			this.b = Math.max( 0, this.b - color.b );

			return this;

		},

		multiply: function ( color ) {

			this.r *= color.r;
			this.g *= color.g;
			this.b *= color.b;

			return this;

		},

		multiplyScalar: function ( s ) {

			this.r *= s;
			this.g *= s;
			this.b *= s;

			return this;

		},

		lerp: function ( color, alpha ) {

			this.r += ( color.r - this.r ) * alpha;
			this.g += ( color.g - this.g ) * alpha;
			this.b += ( color.b - this.b ) * alpha;

			return this;

		},

		lerpHSL: function () {

			var hslA = { h: 0, s: 0, l: 0 };
			var hslB = { h: 0, s: 0, l: 0 };

			return function lerpHSL( color, alpha ) {

				this.getHSL( hslA );
				color.getHSL( hslB );

				var h = _Math.lerp( hslA.h, hslB.h, alpha );
				var s = _Math.lerp( hslA.s, hslB.s, alpha );
				var l = _Math.lerp( hslA.l, hslB.l, alpha );

				this.setHSL( h, s, l );

				return this;

			};

		}(),

		equals: function ( c ) {

			return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this.r = array[ offset ];
			this.g = array[ offset + 1 ];
			this.b = array[ offset + 2 ];

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this.r;
			array[ offset + 1 ] = this.g;
			array[ offset + 2 ] = this.b;

			return array;

		},

		toJSON: function () {

			return this.getHex();

		}

	} );

	/**
	 * Uniforms library for shared webgl shaders
	 */

	var UniformsLib = {

		common: {

			diffuse: { value: new Color( 0xeeeeee ) },
			opacity: { value: 1.0 },

			map: { value: null },
			uvTransform: { value: new Matrix3() },

			alphaMap: { value: null },

		},

		specularmap: {

			specularMap: { value: null },

		},

		envmap: {

			envMap: { value: null },
			flipEnvMap: { value: - 1 },
			reflectivity: { value: 1.0 },
			refractionRatio: { value: 0.98 },
			maxMipLevel: { value: 0 }

		},

		aomap: {

			aoMap: { value: null },
			aoMapIntensity: { value: 1 }

		},

		lightmap: {

			lightMap: { value: null },
			lightMapIntensity: { value: 1 }

		},

		emissivemap: {

			emissiveMap: { value: null }

		},

		bumpmap: {

			bumpMap: { value: null },
			bumpScale: { value: 1 }

		},

		normalmap: {

			normalMap: { value: null },
			normalScale: { value: new Vector2( 1, 1 ) }

		},

		displacementmap: {

			displacementMap: { value: null },
			displacementScale: { value: 1 },
			displacementBias: { value: 0 }

		},

		roughnessmap: {

			roughnessMap: { value: null }

		},

		metalnessmap: {

			metalnessMap: { value: null }

		},

		gradientmap: {

			gradientMap: { value: null }

		},

		fog: {

			fogDensity: { value: 0.00025 },
			fogNear: { value: 1 },
			fogFar: { value: 2000 },
			fogColor: { value: new Color( 0xffffff ) }

		},

		lights: {

			ambientLightColor: { value: [] },

			directionalLights: { value: [], properties: {
				direction: {},
				color: {},

				shadow: {},
				shadowBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			} },

			directionalShadowMap: { value: [] },
			directionalShadowMatrix: { value: [] },

			spotLights: { value: [], properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {},

				shadow: {},
				shadowBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			} },

			spotShadowMap: { value: [] },
			spotShadowMatrix: { value: [] },

			pointLights: { value: [], properties: {
				color: {},
				position: {},
				decay: {},
				distance: {},

				shadow: {},
				shadowBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			} },

			pointShadowMap: { value: [] },
			pointShadowMatrix: { value: [] },

			hemisphereLights: { value: [], properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			} },

			// TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
			rectAreaLights: { value: [], properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			} }

		},

		points: {

			diffuse: { value: new Color( 0xeeeeee ) },
			opacity: { value: 1.0 },
			size: { value: 1.0 },
			scale: { value: 1.0 },
			map: { value: null },
			uvTransform: { value: new Matrix3() }

		},

		sprite: {

			diffuse: { value: new Color( 0xeeeeee ) },
			opacity: { value: 1.0 },
			center: { value: new Vector2( 0.5, 0.5 ) },
			rotation: { value: 0.0 },
			map: { value: null },
			uvTransform: { value: new Matrix3() }

		}

	};

	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 * @author mikael emtinger / http://gomo.se/
	 */

	var ShaderLib = {

		basic: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.meshbasic_vert,
			fragmentShader: ShaderChunk.meshbasic_frag

		},

		lambert: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) }
				}
			] ),

			vertexShader: ShaderChunk.meshlambert_vert,
			fragmentShader: ShaderChunk.meshlambert_frag

		},

		phong: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.gradientmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) },
					specular: { value: new Color( 0x111111 ) },
					shininess: { value: 30 }
				}
			] ),

			vertexShader: ShaderChunk.meshphong_vert,
			fragmentShader: ShaderChunk.meshphong_frag

		},

		standard: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.roughnessmap,
				UniformsLib.metalnessmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: new Color( 0x000000 ) },
					roughness: { value: 0.5 },
					metalness: { value: 0.5 },
					envMapIntensity: { value: 1 } // temporary
				}
			] ),

			vertexShader: ShaderChunk.meshphysical_vert,
			fragmentShader: ShaderChunk.meshphysical_frag

		},

		matcap: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.fog,
				{
					matcap: { value: null }
				}
			] ),

			vertexShader: ShaderChunk.meshmatcap_vert,
			fragmentShader: ShaderChunk.meshmatcap_frag

		},

		points: {

			uniforms: mergeUniforms( [
				UniformsLib.points,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.points_vert,
			fragmentShader: ShaderChunk.points_frag

		},

		dashed: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.fog,
				{
					scale: { value: 1 },
					dashSize: { value: 1 },
					totalSize: { value: 2 }
				}
			] ),

			vertexShader: ShaderChunk.linedashed_vert,
			fragmentShader: ShaderChunk.linedashed_frag

		},

		depth: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.displacementmap
			] ),

			vertexShader: ShaderChunk.depth_vert,
			fragmentShader: ShaderChunk.depth_frag

		},

		normal: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				{
					opacity: { value: 1.0 }
				}
			] ),

			vertexShader: ShaderChunk.normal_vert,
			fragmentShader: ShaderChunk.normal_frag

		},

		sprite: {

			uniforms: mergeUniforms( [
				UniformsLib.sprite,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.sprite_vert,
			fragmentShader: ShaderChunk.sprite_frag

		},

		background: {

			uniforms: {
				uvTransform: { value: new Matrix3() },
				t2D: { value: null },
			},

			vertexShader: ShaderChunk.background_vert,
			fragmentShader: ShaderChunk.background_frag

		},
		/* -------------------------------------------------------------------------
		//	Cube map shader
		 ------------------------------------------------------------------------- */

		cube: {

			uniforms: {
				tCube: { value: null },
				tFlip: { value: - 1 },
				opacity: { value: 1.0 }
			},

			vertexShader: ShaderChunk.cube_vert,
			fragmentShader: ShaderChunk.cube_frag

		},

		equirect: {

			uniforms: {
				tEquirect: { value: null },
			},

			vertexShader: ShaderChunk.equirect_vert,
			fragmentShader: ShaderChunk.equirect_frag

		},

		distanceRGBA: {

			uniforms: mergeUniforms( [
				UniformsLib.common,
				UniformsLib.displacementmap,
				{
					referencePosition: { value: new Vector3() },
					nearDistance: { value: 1 },
					farDistance: { value: 1000 }
				}
			] ),

			vertexShader: ShaderChunk.distanceRGBA_vert,
			fragmentShader: ShaderChunk.distanceRGBA_frag

		},

		shadow: {

			uniforms: mergeUniforms( [
				UniformsLib.lights,
				UniformsLib.fog,
				{
					color: { value: new Color( 0x00000 ) },
					opacity: { value: 1.0 }
				},
			] ),

			vertexShader: ShaderChunk.shadow_vert,
			fragmentShader: ShaderChunk.shadow_frag

		}

	};

	ShaderLib.physical = {

		uniforms: mergeUniforms( [
			ShaderLib.standard.uniforms,
			{
				clearCoat: { value: 0 },
				clearCoatRoughness: { value: 0 }
			}
		] ),

		vertexShader: ShaderChunk.meshphysical_vert,
		fragmentShader: ShaderChunk.meshphysical_frag

	};

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLAnimation() {

		var context = null;
		var isAnimating = false;
		var animationLoop = null;

		function onAnimationFrame( time, frame ) {

			if ( isAnimating === false ) return;

			animationLoop( time, frame );

			context.requestAnimationFrame( onAnimationFrame );

		}

		return {

			start: function () {

				if ( isAnimating === true ) return;
				if ( animationLoop === null ) return;

				context.requestAnimationFrame( onAnimationFrame );

				isAnimating = true;

			},

			stop: function () {

				isAnimating = false;

			},

			setAnimationLoop: function ( callback ) {

				animationLoop = callback;

			},

			setContext: function ( value ) {

				context = value;

			}

		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLAttributes( gl ) {

		var buffers = new WeakMap();

		function createBuffer( attribute, bufferType ) {

			var array = attribute.array;
			var usage = attribute.dynamic ? 35048 : 35044;

			var buffer = gl.createBuffer();

			gl.bindBuffer( bufferType, buffer );
			gl.bufferData( bufferType, array, usage );

			attribute.onUploadCallback();

			var type = 5126;

			if ( array instanceof Float32Array ) {

				type = 5126;

			} else if ( array instanceof Float64Array ) {

				console.warn( 'THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.' );

			} else if ( array instanceof Uint16Array ) {

				type = 5123;

			} else if ( array instanceof Int16Array ) {

				type = 5122;

			} else if ( array instanceof Uint32Array ) {

				type = 5125;

			} else if ( array instanceof Int32Array ) {

				type = 5124;

			} else if ( array instanceof Int8Array ) {

				type = 5120;

			} else if ( array instanceof Uint8Array ) {

				type = 5121;

			}

			return {
				buffer: buffer,
				type: type,
				bytesPerElement: array.BYTES_PER_ELEMENT,
				version: attribute.version
			};

		}

		function updateBuffer( buffer, attribute, bufferType ) {

			var array = attribute.array;
			var updateRange = attribute.updateRange;

			gl.bindBuffer( bufferType, buffer );

			if ( attribute.dynamic === false ) {

				gl.bufferData( bufferType, array, 35044 );

			} else if ( updateRange.count === - 1 ) {

				// Not using update ranges

				gl.bufferSubData( bufferType, 0, array );

			} else if ( updateRange.count === 0 ) {

				console.error( 'THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.' );

			} else {

				gl.bufferSubData( bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
					array.subarray( updateRange.offset, updateRange.offset + updateRange.count ) );

				updateRange.count = - 1; // reset range

			}

		}

		//

		function get( attribute ) {

			if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

			return buffers.get( attribute );

		}

		function remove( attribute ) {

			if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

			var data = buffers.get( attribute );

			if ( data ) {

				gl.deleteBuffer( data.buffer );

				buffers.delete( attribute );

			}

		}

		function update( attribute, bufferType ) {

			if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

			var data = buffers.get( attribute );

			if ( data === undefined ) {

				buffers.set( attribute, createBuffer( attribute, bufferType ) );

			} else if ( data.version < attribute.version ) {

				updateBuffer( data.buffer, attribute, bufferType );

				data.version = attribute.version;

			}

		}

		return {

			get: get,
			remove: remove,
			update: update

		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */

	function Face3( a, b, c, normal, color, materialIndex ) {

		this.a = a;
		this.b = b;
		this.c = c;

		this.normal = ( normal && normal.isVector3 ) ? normal : new Vector3();
		this.vertexNormals = Array.isArray( normal ) ? normal : [];

		this.color = ( color && color.isColor ) ? color : new Color();
		this.vertexColors = Array.isArray( color ) ? color : [];

		this.materialIndex = materialIndex !== undefined ? materialIndex : 0;

	}

	Object.assign( Face3.prototype, {

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.a = source.a;
			this.b = source.b;
			this.c = source.c;

			this.normal.copy( source.normal );
			this.color.copy( source.color );

			this.materialIndex = source.materialIndex;

			for ( var i = 0, il = source.vertexNormals.length; i < il; i ++ ) {

				this.vertexNormals[ i ] = source.vertexNormals[ i ].clone();

			}

			for ( var i = 0, il = source.vertexColors.length; i < il; i ++ ) {

				this.vertexColors[ i ] = source.vertexColors[ i ].clone();

			}

			return this;

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author bhouston / http://clara.io
	 */

	function Euler( x, y, z, order ) {

		this._x = x || 0;
		this._y = y || 0;
		this._z = z || 0;
		this._order = order || Euler.DefaultOrder;

	}

	Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

	Euler.DefaultOrder = 'XYZ';

	Object.defineProperties( Euler.prototype, {

		x: {

			get: function () {

				return this._x;

			},

			set: function ( value ) {

				this._x = value;
				this.onChangeCallback();

			}

		},

		y: {

			get: function () {

				return this._y;

			},

			set: function ( value ) {

				this._y = value;
				this.onChangeCallback();

			}

		},

		z: {

			get: function () {

				return this._z;

			},

			set: function ( value ) {

				this._z = value;
				this.onChangeCallback();

			}

		},

		order: {

			get: function () {

				return this._order;

			},

			set: function ( value ) {

				this._order = value;
				this.onChangeCallback();

			}

		}

	} );

	Object.assign( Euler.prototype, {

		isEuler: true,

		set: function ( x, y, z, order ) {

			this._x = x;
			this._y = y;
			this._z = z;
			this._order = order || this._order;

			this.onChangeCallback();

			return this;

		},

		clone: function () {

			return new this.constructor( this._x, this._y, this._z, this._order );

		},

		copy: function ( euler ) {

			this._x = euler._x;
			this._y = euler._y;
			this._z = euler._z;
			this._order = euler._order;

			this.onChangeCallback();

			return this;

		},

		setFromRotationMatrix: function ( m, order, update ) {

			var clamp = _Math.clamp;

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			var te = m.elements;
			var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
			var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
			var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

			order = order || this._order;

			if ( order === 'XYZ' ) {

				this._y = Math.asin( clamp( m13, - 1, 1 ) );

				if ( Math.abs( m13 ) < 0.99999 ) {

					this._x = Math.atan2( - m23, m33 );
					this._z = Math.atan2( - m12, m11 );

				} else {

					this._x = Math.atan2( m32, m22 );
					this._z = 0;

				}

			} else if ( order === 'YXZ' ) {

				this._x = Math.asin( - clamp( m23, - 1, 1 ) );

				if ( Math.abs( m23 ) < 0.99999 ) {

					this._y = Math.atan2( m13, m33 );
					this._z = Math.atan2( m21, m22 );

				} else {

					this._y = Math.atan2( - m31, m11 );
					this._z = 0;

				}

			} else if ( order === 'ZXY' ) {

				this._x = Math.asin( clamp( m32, - 1, 1 ) );

				if ( Math.abs( m32 ) < 0.99999 ) {

					this._y = Math.atan2( - m31, m33 );
					this._z = Math.atan2( - m12, m22 );

				} else {

					this._y = 0;
					this._z = Math.atan2( m21, m11 );

				}

			} else if ( order === 'ZYX' ) {

				this._y = Math.asin( - clamp( m31, - 1, 1 ) );

				if ( Math.abs( m31 ) < 0.99999 ) {

					this._x = Math.atan2( m32, m33 );
					this._z = Math.atan2( m21, m11 );

				} else {

					this._x = 0;
					this._z = Math.atan2( - m12, m22 );

				}

			} else if ( order === 'YZX' ) {

				this._z = Math.asin( clamp( m21, - 1, 1 ) );

				if ( Math.abs( m21 ) < 0.99999 ) {

					this._x = Math.atan2( - m23, m22 );
					this._y = Math.atan2( - m31, m11 );

				} else {

					this._x = 0;
					this._y = Math.atan2( m13, m33 );

				}

			} else if ( order === 'XZY' ) {

				this._z = Math.asin( - clamp( m12, - 1, 1 ) );

				if ( Math.abs( m12 ) < 0.99999 ) {

					this._x = Math.atan2( m32, m22 );
					this._y = Math.atan2( m13, m11 );

				} else {

					this._x = Math.atan2( - m23, m33 );
					this._y = 0;

				}

			} else {

				console.warn( 'THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order );

			}

			this._order = order;

			if ( update !== false ) this.onChangeCallback();

			return this;

		},

		setFromQuaternion: function () {

			var matrix = new Matrix4();

			return function setFromQuaternion( q, order, update ) {

				matrix.makeRotationFromQuaternion( q );

				return this.setFromRotationMatrix( matrix, order, update );

			};

		}(),

		setFromVector3: function ( v, order ) {

			return this.set( v.x, v.y, v.z, order || this._order );

		},

		reorder: function () {

			// WARNING: this discards revolution information -bhouston

			var q = new Quaternion();

			return function reorder( newOrder ) {

				q.setFromEuler( this );

				return this.setFromQuaternion( q, newOrder );

			};

		}(),

		equals: function ( euler ) {

			return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

		},

		fromArray: function ( array ) {

			this._x = array[ 0 ];
			this._y = array[ 1 ];
			this._z = array[ 2 ];
			if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

			this.onChangeCallback();

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this._x;
			array[ offset + 1 ] = this._y;
			array[ offset + 2 ] = this._z;
			array[ offset + 3 ] = this._order;

			return array;

		},

		toVector3: function ( optionalResult ) {

			if ( optionalResult ) {

				return optionalResult.set( this._x, this._y, this._z );

			} else {

				return new Vector3( this._x, this._y, this._z );

			}

		},

		onChange: function ( callback ) {

			this.onChangeCallback = callback;

			return this;

		},

		onChangeCallback: function () {}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function Layers() {

		this.mask = 1 | 0;

	}

	Object.assign( Layers.prototype, {

		set: function ( channel ) {

			this.mask = 1 << channel | 0;

		},

		enable: function ( channel ) {

			this.mask |= 1 << channel | 0;

		},

		toggle: function ( channel ) {

			this.mask ^= 1 << channel | 0;

		},

		disable: function ( channel ) {

			this.mask &= ~ ( 1 << channel | 0 );

		},

		test: function ( layers ) {

			return ( this.mask & layers.mask ) !== 0;

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author elephantatwork / www.elephantatwork.ch
	 */

	var object3DId = 0;

	function Object3D() {

		Object.defineProperty( this, 'id', { value: object3DId ++ } );

		this.uuid = _Math.generateUUID();

		this.name = '';
		this.type = 'Object3D';

		this.parent = null;
		this.children = [];

		this.up = Object3D.DefaultUp.clone();

		var position = new Vector3();
		var rotation = new Euler();
		var quaternion = new Quaternion();
		var scale = new Vector3( 1, 1, 1 );

		function onRotationChange() {

			quaternion.setFromEuler( rotation, false );

		}

		function onQuaternionChange() {

			rotation.setFromQuaternion( quaternion, undefined, false );

		}

		rotation.onChange( onRotationChange );
		quaternion.onChange( onQuaternionChange );

		Object.defineProperties( this, {
			position: {
				configurable: true,
				enumerable: true,
				value: position
			},
			rotation: {
				configurable: true,
				enumerable: true,
				value: rotation
			},
			quaternion: {
				configurable: true,
				enumerable: true,
				value: quaternion
			},
			scale: {
				configurable: true,
				enumerable: true,
				value: scale
			},
			modelViewMatrix: {
				value: new Matrix4()
			},
			normalMatrix: {
				value: new Matrix3()
			}
		} );

		this.matrix = new Matrix4();
		this.matrixWorld = new Matrix4();

		this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
		this.matrixWorldNeedsUpdate = false;

		this.layers = new Layers();
		this.visible = true;

		this.castShadow = false;
		this.receiveShadow = false;

		this.frustumCulled = true;
		this.renderOrder = 0;

		this.userData = {};

	}

	Object3D.DefaultUp = new Vector3( 0, 1, 0 );
	Object3D.DefaultMatrixAutoUpdate = true;

	Object3D.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Object3D,

		isObject3D: true,

		onBeforeRender: function () {},
		onAfterRender: function () {},

		applyMatrix: function ( matrix ) {

			this.matrix.multiplyMatrices( matrix, this.matrix );

			this.matrix.decompose( this.position, this.quaternion, this.scale );

		},

		applyQuaternion: function ( q ) {

			this.quaternion.premultiply( q );

			return this;

		},

		setRotationFromAxisAngle: function ( axis, angle ) {

			// assumes axis is normalized

			this.quaternion.setFromAxisAngle( axis, angle );

		},

		setRotationFromEuler: function ( euler ) {

			this.quaternion.setFromEuler( euler, true );

		},

		setRotationFromMatrix: function ( m ) {

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			this.quaternion.setFromRotationMatrix( m );

		},

		setRotationFromQuaternion: function ( q ) {

			// assumes q is normalized

			this.quaternion.copy( q );

		},

		rotateOnAxis: function () {

			// rotate object on axis in object space
			// axis is assumed to be normalized

			var q1 = new Quaternion();

			return function rotateOnAxis( axis, angle ) {

				q1.setFromAxisAngle( axis, angle );

				this.quaternion.multiply( q1 );

				return this;

			};

		}(),

		rotateOnWorldAxis: function () {

			// rotate object on axis in world space
			// axis is assumed to be normalized
			// method assumes no rotated parent

			var q1 = new Quaternion();

			return function rotateOnWorldAxis( axis, angle ) {

				q1.setFromAxisAngle( axis, angle );

				this.quaternion.premultiply( q1 );

				return this;

			};

		}(),

		rotateX: function () {

			var v1 = new Vector3( 1, 0, 0 );

			return function rotateX( angle ) {

				return this.rotateOnAxis( v1, angle );

			};

		}(),

		rotateY: function () {

			var v1 = new Vector3( 0, 1, 0 );

			return function rotateY( angle ) {

				return this.rotateOnAxis( v1, angle );

			};

		}(),

		rotateZ: function () {

			var v1 = new Vector3( 0, 0, 1 );

			return function rotateZ( angle ) {

				return this.rotateOnAxis( v1, angle );

			};

		}(),

		translateOnAxis: function () {

			// translate object by distance along axis in object space
			// axis is assumed to be normalized

			var v1 = new Vector3();

			return function translateOnAxis( axis, distance ) {

				v1.copy( axis ).applyQuaternion( this.quaternion );

				this.position.add( v1.multiplyScalar( distance ) );

				return this;

			};

		}(),

		translateX: function () {

			var v1 = new Vector3( 1, 0, 0 );

			return function translateX( distance ) {

				return this.translateOnAxis( v1, distance );

			};

		}(),

		translateY: function () {

			var v1 = new Vector3( 0, 1, 0 );

			return function translateY( distance ) {

				return this.translateOnAxis( v1, distance );

			};

		}(),

		translateZ: function () {

			var v1 = new Vector3( 0, 0, 1 );

			return function translateZ( distance ) {

				return this.translateOnAxis( v1, distance );

			};

		}(),

		localToWorld: function ( vector ) {

			return vector.applyMatrix4( this.matrixWorld );

		},

		worldToLocal: function () {

			var m1 = new Matrix4();

			return function worldToLocal( vector ) {

				return vector.applyMatrix4( m1.getInverse( this.matrixWorld ) );

			};

		}(),

		lookAt: function () {

			// This method does not support objects having non-uniformly-scaled parent(s)

			var q1 = new Quaternion();
			var m1 = new Matrix4();
			var target = new Vector3();
			var position = new Vector3();

			return function lookAt( x, y, z ) {

				if ( x.isVector3 ) {

					target.copy( x );

				} else {

					target.set( x, y, z );

				}

				var parent = this.parent;

				this.updateWorldMatrix( true, false );

				position.setFromMatrixPosition( this.matrixWorld );

				if ( this.isCamera || this.isLight ) {

					m1.lookAt( position, target, this.up );

				} else {

					m1.lookAt( target, position, this.up );

				}

				this.quaternion.setFromRotationMatrix( m1 );

				if ( parent ) {

					m1.extractRotation( parent.matrixWorld );
					q1.setFromRotationMatrix( m1 );
					this.quaternion.premultiply( q1.inverse() );

				}

			};

		}(),

		add: function ( object ) {

			if ( arguments.length > 1 ) {

				for ( var i = 0; i < arguments.length; i ++ ) {

					this.add( arguments[ i ] );

				}

				return this;

			}

			if ( object === this ) {

				console.error( "THREE.Object3D.add: object can't be added as a child of itself.", object );
				return this;

			}

			if ( ( object && object.isObject3D ) ) {

				if ( object.parent !== null ) {

					object.parent.remove( object );

				}

				object.parent = this;
				object.dispatchEvent( { type: 'added' } );

				this.children.push( object );

			} else {

				console.error( "THREE.Object3D.add: object not an instance of THREE.Object3D.", object );

			}

			return this;

		},

		remove: function ( object ) {

			if ( arguments.length > 1 ) {

				for ( var i = 0; i < arguments.length; i ++ ) {

					this.remove( arguments[ i ] );

				}

				return this;

			}

			var index = this.children.indexOf( object );

			if ( index !== - 1 ) {

				object.parent = null;

				object.dispatchEvent( { type: 'removed' } );

				this.children.splice( index, 1 );

			}

			return this;

		},

		getObjectById: function ( id ) {

			return this.getObjectByProperty( 'id', id );

		},

		getObjectByName: function ( name ) {

			return this.getObjectByProperty( 'name', name );

		},

		getObjectByProperty: function ( name, value ) {

			if ( this[ name ] === value ) return this;

			for ( var i = 0, l = this.children.length; i < l; i ++ ) {

				var child = this.children[ i ];
				var object = child.getObjectByProperty( name, value );

				if ( object !== undefined ) {

					return object;

				}

			}

			return undefined;

		},

		getWorldPosition: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Object3D: .getWorldPosition() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			return target.setFromMatrixPosition( this.matrixWorld );

		},

		getWorldQuaternion: function () {

			var position = new Vector3();
			var scale = new Vector3();

			return function getWorldQuaternion( target ) {

				if ( target === undefined ) {

					console.warn( 'THREE.Object3D: .getWorldQuaternion() target is now required' );
					target = new Quaternion();

				}

				this.updateMatrixWorld( true );

				this.matrixWorld.decompose( position, target, scale );

				return target;

			};

		}(),

		getWorldScale: function () {

			var position = new Vector3();
			var quaternion = new Quaternion();

			return function getWorldScale( target ) {

				if ( target === undefined ) {

					console.warn( 'THREE.Object3D: .getWorldScale() target is now required' );
					target = new Vector3();

				}

				this.updateMatrixWorld( true );

				this.matrixWorld.decompose( position, quaternion, target );

				return target;

			};

		}(),

		getWorldDirection: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Object3D: .getWorldDirection() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			var e = this.matrixWorld.elements;

			return target.set( e[ 8 ], e[ 9 ], e[ 10 ] ).normalize();

		},

		raycast: function () {},

		traverse: function ( callback ) {

			callback( this );

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].traverse( callback );

			}

		},

		traverseVisible: function ( callback ) {

			if ( this.visible === false ) return;

			callback( this );

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].traverseVisible( callback );

			}

		},

		traverseAncestors: function ( callback ) {

			var parent = this.parent;

			if ( parent !== null ) {

				callback( parent );

				parent.traverseAncestors( callback );

			}

		},

		updateMatrix: function () {

			this.matrix.compose( this.position, this.quaternion, this.scale );

			this.matrixWorldNeedsUpdate = true;

		},

		updateMatrixWorld: function ( force ) {

			if ( this.matrixAutoUpdate ) this.updateMatrix();

			if ( this.matrixWorldNeedsUpdate || force ) {

				if ( this.parent === null ) {

					this.matrixWorld.copy( this.matrix );

				} else {

					this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

				}

				this.matrixWorldNeedsUpdate = false;

				force = true;

			}

			// update children

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].updateMatrixWorld( force );

			}

		},

		updateWorldMatrix: function ( updateParents, updateChildren ) {

			var parent = this.parent;

			if ( updateParents === true && parent !== null ) {

				parent.updateWorldMatrix( true, false );

			}

			if ( this.matrixAutoUpdate ) this.updateMatrix();

			if ( this.parent === null ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			}

			// update children

			if ( updateChildren === true ) {

				var children = this.children;

				for ( var i = 0, l = children.length; i < l; i ++ ) {

					children[ i ].updateWorldMatrix( false, true );

				}

			}

		},

		toJSON: function ( meta ) {

			// meta is a string when called from JSON.stringify
			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			var output = {};

			// meta is a hash used to collect geometries, materials.
			// not providing it implies that this is the root object
			// being serialized.
			if ( isRootObject ) {

				// initialize meta obj
				meta = {
					geometries: {},
					materials: {},
					textures: {},
					images: {},
					shapes: {}
				};

				output.metadata = {
					version: 4.5,
					type: 'Object',
					generator: 'Object3D.toJSON'
				};

			}

			// standard Object3D serialization

			var object = {};

			object.uuid = this.uuid;
			object.type = this.type;

			if ( this.name !== '' ) object.name = this.name;
			if ( this.castShadow === true ) object.castShadow = true;
			if ( this.receiveShadow === true ) object.receiveShadow = true;
			if ( this.visible === false ) object.visible = false;
			if ( this.frustumCulled === false ) object.frustumCulled = false;
			if ( this.renderOrder !== 0 ) object.renderOrder = this.renderOrder;
			if ( JSON.stringify( this.userData ) !== '{}' ) object.userData = this.userData;

			object.layers = this.layers.mask;
			object.matrix = this.matrix.toArray();

			if ( this.matrixAutoUpdate === false ) object.matrixAutoUpdate = false;

			// object specific properties

			if ( this.isMesh && this.drawMode !== TrianglesDrawMode ) object.drawMode = this.drawMode;

			//

			function serialize( library, element ) {

				if ( library[ element.uuid ] === undefined ) {

					library[ element.uuid ] = element.toJSON( meta );

				}

				return element.uuid;

			}

			if ( this.isMesh || this.isLine || this.isPoints ) {

				object.geometry = serialize( meta.geometries, this.geometry );

				var parameters = this.geometry.parameters;

				if ( parameters !== undefined && parameters.shapes !== undefined ) {

					var shapes = parameters.shapes;

					if ( Array.isArray( shapes ) ) {

						for ( var i = 0, l = shapes.length; i < l; i ++ ) {

							var shape = shapes[ i ];

							serialize( meta.shapes, shape );

						}

					} else {

						serialize( meta.shapes, shapes );

					}

				}

			}

			if ( this.material !== undefined ) {

				if ( Array.isArray( this.material ) ) {

					var uuids = [];

					for ( var i = 0, l = this.material.length; i < l; i ++ ) {

						uuids.push( serialize( meta.materials, this.material[ i ] ) );

					}

					object.material = uuids;

				} else {

					object.material = serialize( meta.materials, this.material );

				}

			}

			//

			if ( this.children.length > 0 ) {

				object.children = [];

				for ( var i = 0; i < this.children.length; i ++ ) {

					object.children.push( this.children[ i ].toJSON( meta ).object );

				}

			}

			if ( isRootObject ) {

				var geometries = extractFromCache( meta.geometries );
				var materials = extractFromCache( meta.materials );
				var textures = extractFromCache( meta.textures );
				var images = extractFromCache( meta.images );
				var shapes = extractFromCache( meta.shapes );

				if ( geometries.length > 0 ) output.geometries = geometries;
				if ( materials.length > 0 ) output.materials = materials;
				if ( textures.length > 0 ) output.textures = textures;
				if ( images.length > 0 ) output.images = images;
				if ( shapes.length > 0 ) output.shapes = shapes;

			}

			output.object = object;

			return output;

			// extract data from the cache hash
			// remove metadata on each item
			// and return as array
			function extractFromCache( cache ) {

				var values = [];
				for ( var key in cache ) {

					var data = cache[ key ];
					delete data.metadata;
					values.push( data );

				}
				return values;

			}

		},

		clone: function ( recursive ) {

			return new this.constructor().copy( this, recursive );

		},

		copy: function ( source, recursive ) {

			if ( recursive === undefined ) recursive = true;

			this.name = source.name;

			this.up.copy( source.up );

			this.position.copy( source.position );
			this.quaternion.copy( source.quaternion );
			this.scale.copy( source.scale );

			this.matrix.copy( source.matrix );
			this.matrixWorld.copy( source.matrixWorld );

			this.matrixAutoUpdate = source.matrixAutoUpdate;
			this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

			this.layers.mask = source.layers.mask;
			this.visible = source.visible;

			this.castShadow = source.castShadow;
			this.receiveShadow = source.receiveShadow;

			this.frustumCulled = source.frustumCulled;
			this.renderOrder = source.renderOrder;

			this.userData = JSON.parse( JSON.stringify( source.userData ) );

			if ( recursive === true ) {

				for ( var i = 0; i < source.children.length; i ++ ) {

					var child = source.children[ i ];
					this.add( child.clone() );

				}

			}

			return this;

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author kile / http://kile.stravaganza.org/
	 * @author alteredq / http://alteredqualia.com/
	 * @author mikael emtinger / http://gomo.se/
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 * @author bhouston / http://clara.io
	 */

	var geometryId = 0; // Geometry uses even numbers as Id

	function Geometry() {

		Object.defineProperty( this, 'id', { value: geometryId += 2 } );

		this.uuid = _Math.generateUUID();

		this.name = '';
		this.type = 'Geometry';

		this.vertices = [];
		this.colors = [];
		this.faces = [];
		this.faceVertexUvs = [[]];

		this.morphTargets = [];
		this.morphNormals = [];

		this.skinWeights = [];
		this.skinIndices = [];

		this.lineDistances = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		// update flags

		this.elementsNeedUpdate = false;
		this.verticesNeedUpdate = false;
		this.uvsNeedUpdate = false;
		this.normalsNeedUpdate = false;
		this.colorsNeedUpdate = false;
		this.lineDistancesNeedUpdate = false;
		this.groupsNeedUpdate = false;

	}

	Geometry.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Geometry,

		isGeometry: true,

		applyMatrix: function ( matrix ) {

			var normalMatrix = new Matrix3().getNormalMatrix( matrix );

			for ( var i = 0, il = this.vertices.length; i < il; i ++ ) {

				var vertex = this.vertices[ i ];
				vertex.applyMatrix4( matrix );

			}

			for ( var i = 0, il = this.faces.length; i < il; i ++ ) {

				var face = this.faces[ i ];
				face.normal.applyMatrix3( normalMatrix ).normalize();

				for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

					face.vertexNormals[ j ].applyMatrix3( normalMatrix ).normalize();

				}

			}

			if ( this.boundingBox !== null ) {

				this.computeBoundingBox();

			}

			if ( this.boundingSphere !== null ) {

				this.computeBoundingSphere();

			}

			this.verticesNeedUpdate = true;
			this.normalsNeedUpdate = true;

			return this;

		},

		rotateX: function () {

			// rotate geometry around world x-axis

			var m1 = new Matrix4();

			return function rotateX( angle ) {

				m1.makeRotationX( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		rotateY: function () {

			// rotate geometry around world y-axis

			var m1 = new Matrix4();

			return function rotateY( angle ) {

				m1.makeRotationY( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		rotateZ: function () {

			// rotate geometry around world z-axis

			var m1 = new Matrix4();

			return function rotateZ( angle ) {

				m1.makeRotationZ( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		translate: function () {

			// translate geometry

			var m1 = new Matrix4();

			return function translate( x, y, z ) {

				m1.makeTranslation( x, y, z );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		scale: function () {

			// scale geometry

			var m1 = new Matrix4();

			return function scale( x, y, z ) {

				m1.makeScale( x, y, z );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		lookAt: function () {

			var obj = new Object3D();

			return function lookAt( vector ) {

				obj.lookAt( vector );

				obj.updateMatrix();

				this.applyMatrix( obj.matrix );

			};

		}(),

		fromBufferGeometry: function ( geometry ) {

			var scope = this;

			var indices = geometry.index !== null ? geometry.index.array : undefined;
			var attributes = geometry.attributes;

			var positions = attributes.position.array;
			var normals = attributes.normal !== undefined ? attributes.normal.array : undefined;
			var colors = attributes.color !== undefined ? attributes.color.array : undefined;
			var uvs = attributes.uv !== undefined ? attributes.uv.array : undefined;
			var uvs2 = attributes.uv2 !== undefined ? attributes.uv2.array : undefined;

			if ( uvs2 !== undefined ) this.faceVertexUvs[ 1 ] = [];

			for ( var i = 0, j = 0; i < positions.length; i += 3, j += 2 ) {

				scope.vertices.push( new Vector3().fromArray( positions, i ) );

				if ( colors !== undefined ) {

					scope.colors.push( new Color().fromArray( colors, i ) );

				}

			}

			function addFace( a, b, c, materialIndex ) {

				var vertexColors = ( colors === undefined ) ? [] : [
					scope.colors[ a ].clone(),
					scope.colors[ b ].clone(),
					scope.colors[ c ].clone() ];

				var vertexNormals = ( normals === undefined ) ? [] : [
					new Vector3().fromArray( normals, a * 3 ),
					new Vector3().fromArray( normals, b * 3 ),
					new Vector3().fromArray( normals, c * 3 )
				];

				var face = new Face3( a, b, c, vertexNormals, vertexColors, materialIndex );

				scope.faces.push( face );

				if ( uvs !== undefined ) {

					scope.faceVertexUvs[ 0 ].push( [
						new Vector2().fromArray( uvs, a * 2 ),
						new Vector2().fromArray( uvs, b * 2 ),
						new Vector2().fromArray( uvs, c * 2 )
					] );

				}

				if ( uvs2 !== undefined ) {

					scope.faceVertexUvs[ 1 ].push( [
						new Vector2().fromArray( uvs2, a * 2 ),
						new Vector2().fromArray( uvs2, b * 2 ),
						new Vector2().fromArray( uvs2, c * 2 )
					] );

				}

			}

			var groups = geometry.groups;

			if ( groups.length > 0 ) {

				for ( var i = 0; i < groups.length; i ++ ) {

					var group = groups[ i ];

					var start = group.start;
					var count = group.count;

					for ( var j = start, jl = start + count; j < jl; j += 3 ) {

						if ( indices !== undefined ) {

							addFace( indices[ j ], indices[ j + 1 ], indices[ j + 2 ], group.materialIndex );

						} else {

							addFace( j, j + 1, j + 2, group.materialIndex );

						}

					}

				}

			} else {

				if ( indices !== undefined ) {

					for ( var i = 0; i < indices.length; i += 3 ) {

						addFace( indices[ i ], indices[ i + 1 ], indices[ i + 2 ] );

					}

				} else {

					for ( var i = 0; i < positions.length / 3; i += 3 ) {

						addFace( i, i + 1, i + 2 );

					}

				}

			}

			this.computeFaceNormals();

			if ( geometry.boundingBox !== null ) {

				this.boundingBox = geometry.boundingBox.clone();

			}

			if ( geometry.boundingSphere !== null ) {

				this.boundingSphere = geometry.boundingSphere.clone();

			}

			return this;

		},

		center: function () {

			var offset = new Vector3();

			return function center() {

				this.computeBoundingBox();

				this.boundingBox.getCenter( offset ).negate();

				this.translate( offset.x, offset.y, offset.z );

				return this;

			};

		}(),

		normalize: function () {

			this.computeBoundingSphere();

			var center = this.boundingSphere.center;
			var radius = this.boundingSphere.radius;

			var s = radius === 0 ? 1 : 1.0 / radius;

			var matrix = new Matrix4();
			matrix.set(
				s, 0, 0, - s * center.x,
				0, s, 0, - s * center.y,
				0, 0, s, - s * center.z,
				0, 0, 0, 1
			);

			this.applyMatrix( matrix );

			return this;

		},

		computeFaceNormals: function () {

			var cb = new Vector3(), ab = new Vector3();

			for ( var f = 0, fl = this.faces.length; f < fl; f ++ ) {

				var face = this.faces[ f ];

				var vA = this.vertices[ face.a ];
				var vB = this.vertices[ face.b ];
				var vC = this.vertices[ face.c ];

				cb.subVectors( vC, vB );
				ab.subVectors( vA, vB );
				cb.cross( ab );

				cb.normalize();

				face.normal.copy( cb );

			}

		},

		computeVertexNormals: function ( areaWeighted ) {

			if ( areaWeighted === undefined ) areaWeighted = true;

			var v, vl, f, fl, face, vertices;

			vertices = new Array( this.vertices.length );

			for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

				vertices[ v ] = new Vector3();

			}

			if ( areaWeighted ) {

				// vertex normals weighted by triangle areas
				// http://www.iquilezles.org/www/articles/normals/normals.htm

				var vA, vB, vC;
				var cb = new Vector3(), ab = new Vector3();

				for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

					face = this.faces[ f ];

					vA = this.vertices[ face.a ];
					vB = this.vertices[ face.b ];
					vC = this.vertices[ face.c ];

					cb.subVectors( vC, vB );
					ab.subVectors( vA, vB );
					cb.cross( ab );

					vertices[ face.a ].add( cb );
					vertices[ face.b ].add( cb );
					vertices[ face.c ].add( cb );

				}

			} else {

				this.computeFaceNormals();

				for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

					face = this.faces[ f ];

					vertices[ face.a ].add( face.normal );
					vertices[ face.b ].add( face.normal );
					vertices[ face.c ].add( face.normal );

				}

			}

			for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

				vertices[ v ].normalize();

			}

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				var vertexNormals = face.vertexNormals;

				if ( vertexNormals.length === 3 ) {

					vertexNormals[ 0 ].copy( vertices[ face.a ] );
					vertexNormals[ 1 ].copy( vertices[ face.b ] );
					vertexNormals[ 2 ].copy( vertices[ face.c ] );

				} else {

					vertexNormals[ 0 ] = vertices[ face.a ].clone();
					vertexNormals[ 1 ] = vertices[ face.b ].clone();
					vertexNormals[ 2 ] = vertices[ face.c ].clone();

				}

			}

			if ( this.faces.length > 0 ) {

				this.normalsNeedUpdate = true;

			}

		},

		computeFlatVertexNormals: function () {

			var f, fl, face;

			this.computeFaceNormals();

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				var vertexNormals = face.vertexNormals;

				if ( vertexNormals.length === 3 ) {

					vertexNormals[ 0 ].copy( face.normal );
					vertexNormals[ 1 ].copy( face.normal );
					vertexNormals[ 2 ].copy( face.normal );

				} else {

					vertexNormals[ 0 ] = face.normal.clone();
					vertexNormals[ 1 ] = face.normal.clone();
					vertexNormals[ 2 ] = face.normal.clone();

				}

			}

			if ( this.faces.length > 0 ) {

				this.normalsNeedUpdate = true;

			}

		},

		computeMorphNormals: function () {

			var i, il, f, fl, face;

			// save original normals
			// - create temp variables on first access
			//   otherwise just copy (for faster repeated calls)

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				if ( ! face.__originalFaceNormal ) {

					face.__originalFaceNormal = face.normal.clone();

				} else {

					face.__originalFaceNormal.copy( face.normal );

				}

				if ( ! face.__originalVertexNormals ) face.__originalVertexNormals = [];

				for ( i = 0, il = face.vertexNormals.length; i < il; i ++ ) {

					if ( ! face.__originalVertexNormals[ i ] ) {

						face.__originalVertexNormals[ i ] = face.vertexNormals[ i ].clone();

					} else {

						face.__originalVertexNormals[ i ].copy( face.vertexNormals[ i ] );

					}

				}

			}

			// use temp geometry to compute face and vertex normals for each morph

			var tmpGeo = new Geometry();
			tmpGeo.faces = this.faces;

			for ( i = 0, il = this.morphTargets.length; i < il; i ++ ) {

				// create on first access

				if ( ! this.morphNormals[ i ] ) {

					this.morphNormals[ i ] = {};
					this.morphNormals[ i ].faceNormals = [];
					this.morphNormals[ i ].vertexNormals = [];

					var dstNormalsFace = this.morphNormals[ i ].faceNormals;
					var dstNormalsVertex = this.morphNormals[ i ].vertexNormals;

					var faceNormal, vertexNormals;

					for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

						faceNormal = new Vector3();
						vertexNormals = { a: new Vector3(), b: new Vector3(), c: new Vector3() };

						dstNormalsFace.push( faceNormal );
						dstNormalsVertex.push( vertexNormals );

					}

				}

				var morphNormals = this.morphNormals[ i ];

				// set vertices to morph target

				tmpGeo.vertices = this.morphTargets[ i ].vertices;

				// compute morph normals

				tmpGeo.computeFaceNormals();
				tmpGeo.computeVertexNormals();

				// store morph normals

				var faceNormal, vertexNormals;

				for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

					face = this.faces[ f ];

					faceNormal = morphNormals.faceNormals[ f ];
					vertexNormals = morphNormals.vertexNormals[ f ];

					faceNormal.copy( face.normal );

					vertexNormals.a.copy( face.vertexNormals[ 0 ] );
					vertexNormals.b.copy( face.vertexNormals[ 1 ] );
					vertexNormals.c.copy( face.vertexNormals[ 2 ] );

				}

			}

			// restore original normals

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				face.normal = face.__originalFaceNormal;
				face.vertexNormals = face.__originalVertexNormals;

			}

		},

		computeBoundingBox: function () {

			if ( this.boundingBox === null ) {

				this.boundingBox = new Box3();

			}

			this.boundingBox.setFromPoints( this.vertices );

		},

		computeBoundingSphere: function () {

			if ( this.boundingSphere === null ) {

				this.boundingSphere = new Sphere();

			}

			this.boundingSphere.setFromPoints( this.vertices );

		},

		merge: function ( geometry, matrix, materialIndexOffset ) {

			if ( ! ( geometry && geometry.isGeometry ) ) {

				console.error( 'THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.', geometry );
				return;

			}

			var normalMatrix,
				vertexOffset = this.vertices.length,
				vertices1 = this.vertices,
				vertices2 = geometry.vertices,
				faces1 = this.faces,
				faces2 = geometry.faces,
				uvs1 = this.faceVertexUvs[ 0 ],
				uvs2 = geometry.faceVertexUvs[ 0 ],
				colors1 = this.colors,
				colors2 = geometry.colors;

			if ( materialIndexOffset === undefined ) materialIndexOffset = 0;

			if ( matrix !== undefined ) {

				normalMatrix = new Matrix3().getNormalMatrix( matrix );

			}

			// vertices

			for ( var i = 0, il = vertices2.length; i < il; i ++ ) {

				var vertex = vertices2[ i ];

				var vertexCopy = vertex.clone();

				if ( matrix !== undefined ) vertexCopy.applyMatrix4( matrix );

				vertices1.push( vertexCopy );

			}

			// colors

			for ( var i = 0, il = colors2.length; i < il; i ++ ) {

				colors1.push( colors2[ i ].clone() );

			}

			// faces

			for ( i = 0, il = faces2.length; i < il; i ++ ) {

				var face = faces2[ i ], faceCopy, normal, color,
					faceVertexNormals = face.vertexNormals,
					faceVertexColors = face.vertexColors;

				faceCopy = new Face3( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset );
				faceCopy.normal.copy( face.normal );

				if ( normalMatrix !== undefined ) {

					faceCopy.normal.applyMatrix3( normalMatrix ).normalize();

				}

				for ( var j = 0, jl = faceVertexNormals.length; j < jl; j ++ ) {

					normal = faceVertexNormals[ j ].clone();

					if ( normalMatrix !== undefined ) {

						normal.applyMatrix3( normalMatrix ).normalize();

					}

					faceCopy.vertexNormals.push( normal );

				}

				faceCopy.color.copy( face.color );

				for ( var j = 0, jl = faceVertexColors.length; j < jl; j ++ ) {

					color = faceVertexColors[ j ];
					faceCopy.vertexColors.push( color.clone() );

				}

				faceCopy.materialIndex = face.materialIndex + materialIndexOffset;

				faces1.push( faceCopy );

			}

			// uvs

			for ( i = 0, il = uvs2.length; i < il; i ++ ) {

				var uv = uvs2[ i ], uvCopy = [];

				if ( uv === undefined ) {

					continue;

				}

				for ( var j = 0, jl = uv.length; j < jl; j ++ ) {

					uvCopy.push( uv[ j ].clone() );

				}

				uvs1.push( uvCopy );

			}

		},

		mergeMesh: function ( mesh ) {

			if ( ! ( mesh && mesh.isMesh ) ) {

				console.error( 'THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.', mesh );
				return;

			}

			if ( mesh.matrixAutoUpdate ) mesh.updateMatrix();

			this.merge( mesh.geometry, mesh.matrix );

		},

		/*
		 * Checks for duplicate vertices with hashmap.
		 * Duplicated vertices are removed
		 * and faces' vertices are updated.
		 */

		mergeVertices: function () {

			var verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
			var unique = [], changes = [];

			var v, key;
			var precisionPoints = 4; // number of decimal points, e.g. 4 for epsilon of 0.0001
			var precision = Math.pow( 10, precisionPoints );
			var i, il, face;
			var indices, j, jl;

			for ( i = 0, il = this.vertices.length; i < il; i ++ ) {

				v = this.vertices[ i ];
				key = Math.round( v.x * precision ) + '_' + Math.round( v.y * precision ) + '_' + Math.round( v.z * precision );

				if ( verticesMap[ key ] === undefined ) {

					verticesMap[ key ] = i;
					unique.push( this.vertices[ i ] );
					changes[ i ] = unique.length - 1;

				} else {

					//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
					changes[ i ] = changes[ verticesMap[ key ] ];

				}

			}


			// if faces are completely degenerate after merging vertices, we
			// have to remove them from the geometry.
			var faceIndicesToRemove = [];

			for ( i = 0, il = this.faces.length; i < il; i ++ ) {

				face = this.faces[ i ];

				face.a = changes[ face.a ];
				face.b = changes[ face.b ];
				face.c = changes[ face.c ];

				indices = [ face.a, face.b, face.c ];

				// if any duplicate vertices are found in a Face3
				// we have to remove the face as nothing can be saved
				for ( var n = 0; n < 3; n ++ ) {

					if ( indices[ n ] === indices[ ( n + 1 ) % 3 ] ) {

						faceIndicesToRemove.push( i );
						break;

					}

				}

			}

			for ( i = faceIndicesToRemove.length - 1; i >= 0; i -- ) {

				var idx = faceIndicesToRemove[ i ];

				this.faces.splice( idx, 1 );

				for ( j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {

					this.faceVertexUvs[ j ].splice( idx, 1 );

				}

			}

			// Use unique set of vertices

			var diff = this.vertices.length - unique.length;
			this.vertices = unique;
			return diff;

		},

		setFromPoints: function ( points ) {

			this.vertices = [];

			for ( var i = 0, l = points.length; i < l; i ++ ) {

				var point = points[ i ];
				this.vertices.push( new Vector3( point.x, point.y, point.z || 0 ) );

			}

			return this;

		},

		sortFacesByMaterialIndex: function () {

			var faces = this.faces;
			var length = faces.length;

			// tag faces

			for ( var i = 0; i < length; i ++ ) {

				faces[ i ]._id = i;

			}

			// sort faces

			function materialIndexSort( a, b ) {

				return a.materialIndex - b.materialIndex;

			}

			faces.sort( materialIndexSort );

			// sort uvs

			var uvs1 = this.faceVertexUvs[ 0 ];
			var uvs2 = this.faceVertexUvs[ 1 ];

			var newUvs1, newUvs2;

			if ( uvs1 && uvs1.length === length ) newUvs1 = [];
			if ( uvs2 && uvs2.length === length ) newUvs2 = [];

			for ( var i = 0; i < length; i ++ ) {

				var id = faces[ i ]._id;

				if ( newUvs1 ) newUvs1.push( uvs1[ id ] );
				if ( newUvs2 ) newUvs2.push( uvs2[ id ] );

			}

			if ( newUvs1 ) this.faceVertexUvs[ 0 ] = newUvs1;
			if ( newUvs2 ) this.faceVertexUvs[ 1 ] = newUvs2;

		},

		toJSON: function () {

			var data = {
				metadata: {
					version: 4.5,
					type: 'Geometry',
					generator: 'Geometry.toJSON'
				}
			};

			// standard Geometry serialization

			data.uuid = this.uuid;
			data.type = this.type;
			if ( this.name !== '' ) data.name = this.name;

			if ( this.parameters !== undefined ) {

				var parameters = this.parameters;

				for ( var key in parameters ) {

					if ( parameters[ key ] !== undefined ) data[ key ] = parameters[ key ];

				}

				return data;

			}

			var vertices = [];

			for ( var i = 0; i < this.vertices.length; i ++ ) {

				var vertex = this.vertices[ i ];
				vertices.push( vertex.x, vertex.y, vertex.z );

			}

			var faces = [];
			var normals = [];
			var normalsHash = {};
			var colors = [];
			var colorsHash = {};
			var uvs = [];
			var uvsHash = {};

			for ( var i = 0; i < this.faces.length; i ++ ) {

				var face = this.faces[ i ];

				var hasMaterial = true;
				var hasFaceUv = false; // deprecated
				var hasFaceVertexUv = this.faceVertexUvs[ 0 ][ i ] !== undefined;
				var hasFaceNormal = face.normal.length() > 0;
				var hasFaceVertexNormal = face.vertexNormals.length > 0;
				var hasFaceColor = face.color.r !== 1 || face.color.g !== 1 || face.color.b !== 1;
				var hasFaceVertexColor = face.vertexColors.length > 0;

				var faceType = 0;

				faceType = setBit( faceType, 0, 0 ); // isQuad
				faceType = setBit( faceType, 1, hasMaterial );
				faceType = setBit( faceType, 2, hasFaceUv );
				faceType = setBit( faceType, 3, hasFaceVertexUv );
				faceType = setBit( faceType, 4, hasFaceNormal );
				faceType = setBit( faceType, 5, hasFaceVertexNormal );
				faceType = setBit( faceType, 6, hasFaceColor );
				faceType = setBit( faceType, 7, hasFaceVertexColor );

				faces.push( faceType );
				faces.push( face.a, face.b, face.c );
				faces.push( face.materialIndex );

				if ( hasFaceVertexUv ) {

					var faceVertexUvs = this.faceVertexUvs[ 0 ][ i ];

					faces.push(
						getUvIndex( faceVertexUvs[ 0 ] ),
						getUvIndex( faceVertexUvs[ 1 ] ),
						getUvIndex( faceVertexUvs[ 2 ] )
					);

				}

				if ( hasFaceNormal ) {

					faces.push( getNormalIndex( face.normal ) );

				}

				if ( hasFaceVertexNormal ) {

					var vertexNormals = face.vertexNormals;

					faces.push(
						getNormalIndex( vertexNormals[ 0 ] ),
						getNormalIndex( vertexNormals[ 1 ] ),
						getNormalIndex( vertexNormals[ 2 ] )
					);

				}

				if ( hasFaceColor ) {

					faces.push( getColorIndex( face.color ) );

				}

				if ( hasFaceVertexColor ) {

					var vertexColors = face.vertexColors;

					faces.push(
						getColorIndex( vertexColors[ 0 ] ),
						getColorIndex( vertexColors[ 1 ] ),
						getColorIndex( vertexColors[ 2 ] )
					);

				}

			}

			function setBit( value, position, enabled ) {

				return enabled ? value | ( 1 << position ) : value & ( ~ ( 1 << position ) );

			}

			function getNormalIndex( normal ) {

				var hash = normal.x.toString() + normal.y.toString() + normal.z.toString();

				if ( normalsHash[ hash ] !== undefined ) {

					return normalsHash[ hash ];

				}

				normalsHash[ hash ] = normals.length / 3;
				normals.push( normal.x, normal.y, normal.z );

				return normalsHash[ hash ];

			}

			function getColorIndex( color ) {

				var hash = color.r.toString() + color.g.toString() + color.b.toString();

				if ( colorsHash[ hash ] !== undefined ) {

					return colorsHash[ hash ];

				}

				colorsHash[ hash ] = colors.length;
				colors.push( color.getHex() );

				return colorsHash[ hash ];

			}

			function getUvIndex( uv ) {

				var hash = uv.x.toString() + uv.y.toString();

				if ( uvsHash[ hash ] !== undefined ) {

					return uvsHash[ hash ];

				}

				uvsHash[ hash ] = uvs.length / 2;
				uvs.push( uv.x, uv.y );

				return uvsHash[ hash ];

			}

			data.data = {};

			data.data.vertices = vertices;
			data.data.normals = normals;
			if ( colors.length > 0 ) data.data.colors = colors;
			if ( uvs.length > 0 ) data.data.uvs = [ uvs ]; // temporal backward compatibility
			data.data.faces = faces;

			return data;

		},

		clone: function () {

			/*
			 // Handle primitives

			 var parameters = this.parameters;

			 if ( parameters !== undefined ) {

			 var values = [];

			 for ( var key in parameters ) {

			 values.push( parameters[ key ] );

			 }

			 var geometry = Object.create( this.constructor.prototype );
			 this.constructor.apply( geometry, values );
			 return geometry;

			 }

			 return new this.constructor().copy( this );
			 */

			return new Geometry().copy( this );

		},

		copy: function ( source ) {

			var i, il, j, jl, k, kl;

			// reset

			this.vertices = [];
			this.colors = [];
			this.faces = [];
			this.faceVertexUvs = [[]];
			this.morphTargets = [];
			this.morphNormals = [];
			this.skinWeights = [];
			this.skinIndices = [];
			this.lineDistances = [];
			this.boundingBox = null;
			this.boundingSphere = null;

			// name

			this.name = source.name;

			// vertices

			var vertices = source.vertices;

			for ( i = 0, il = vertices.length; i < il; i ++ ) {

				this.vertices.push( vertices[ i ].clone() );

			}

			// colors

			var colors = source.colors;

			for ( i = 0, il = colors.length; i < il; i ++ ) {

				this.colors.push( colors[ i ].clone() );

			}

			// faces

			var faces = source.faces;

			for ( i = 0, il = faces.length; i < il; i ++ ) {

				this.faces.push( faces[ i ].clone() );

			}

			// face vertex uvs

			for ( i = 0, il = source.faceVertexUvs.length; i < il; i ++ ) {

				var faceVertexUvs = source.faceVertexUvs[ i ];

				if ( this.faceVertexUvs[ i ] === undefined ) {

					this.faceVertexUvs[ i ] = [];

				}

				for ( j = 0, jl = faceVertexUvs.length; j < jl; j ++ ) {

					var uvs = faceVertexUvs[ j ], uvsCopy = [];

					for ( k = 0, kl = uvs.length; k < kl; k ++ ) {

						var uv = uvs[ k ];

						uvsCopy.push( uv.clone() );

					}

					this.faceVertexUvs[ i ].push( uvsCopy );

				}

			}

			// morph targets

			var morphTargets = source.morphTargets;

			for ( i = 0, il = morphTargets.length; i < il; i ++ ) {

				var morphTarget = {};
				morphTarget.name = morphTargets[ i ].name;

				// vertices

				if ( morphTargets[ i ].vertices !== undefined ) {

					morphTarget.vertices = [];

					for ( j = 0, jl = morphTargets[ i ].vertices.length; j < jl; j ++ ) {

						morphTarget.vertices.push( morphTargets[ i ].vertices[ j ].clone() );

					}

				}

				// normals

				if ( morphTargets[ i ].normals !== undefined ) {

					morphTarget.normals = [];

					for ( j = 0, jl = morphTargets[ i ].normals.length; j < jl; j ++ ) {

						morphTarget.normals.push( morphTargets[ i ].normals[ j ].clone() );

					}

				}

				this.morphTargets.push( morphTarget );

			}

			// morph normals

			var morphNormals = source.morphNormals;

			for ( i = 0, il = morphNormals.length; i < il; i ++ ) {

				var morphNormal = {};

				// vertex normals

				if ( morphNormals[ i ].vertexNormals !== undefined ) {

					morphNormal.vertexNormals = [];

					for ( j = 0, jl = morphNormals[ i ].vertexNormals.length; j < jl; j ++ ) {

						var srcVertexNormal = morphNormals[ i ].vertexNormals[ j ];
						var destVertexNormal = {};

						destVertexNormal.a = srcVertexNormal.a.clone();
						destVertexNormal.b = srcVertexNormal.b.clone();
						destVertexNormal.c = srcVertexNormal.c.clone();

						morphNormal.vertexNormals.push( destVertexNormal );

					}

				}

				// face normals

				if ( morphNormals[ i ].faceNormals !== undefined ) {

					morphNormal.faceNormals = [];

					for ( j = 0, jl = morphNormals[ i ].faceNormals.length; j < jl; j ++ ) {

						morphNormal.faceNormals.push( morphNormals[ i ].faceNormals[ j ].clone() );

					}

				}

				this.morphNormals.push( morphNormal );

			}

			// skin weights

			var skinWeights = source.skinWeights;

			for ( i = 0, il = skinWeights.length; i < il; i ++ ) {

				this.skinWeights.push( skinWeights[ i ].clone() );

			}

			// skin indices

			var skinIndices = source.skinIndices;

			for ( i = 0, il = skinIndices.length; i < il; i ++ ) {

				this.skinIndices.push( skinIndices[ i ].clone() );

			}

			// line distances

			var lineDistances = source.lineDistances;

			for ( i = 0, il = lineDistances.length; i < il; i ++ ) {

				this.lineDistances.push( lineDistances[ i ] );

			}

			// bounding box

			var boundingBox = source.boundingBox;

			if ( boundingBox !== null ) {

				this.boundingBox = boundingBox.clone();

			}

			// bounding sphere

			var boundingSphere = source.boundingSphere;

			if ( boundingSphere !== null ) {

				this.boundingSphere = boundingSphere.clone();

			}

			// update flags

			this.elementsNeedUpdate = source.elementsNeedUpdate;
			this.verticesNeedUpdate = source.verticesNeedUpdate;
			this.uvsNeedUpdate = source.uvsNeedUpdate;
			this.normalsNeedUpdate = source.normalsNeedUpdate;
			this.colorsNeedUpdate = source.colorsNeedUpdate;
			this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
			this.groupsNeedUpdate = source.groupsNeedUpdate;

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function BufferAttribute( array, itemSize, normalized ) {

		if ( Array.isArray( array ) ) {

			throw new TypeError( 'THREE.BufferAttribute: array should be a Typed Array.' );

		}

		this.name = '';

		this.array = array;
		this.itemSize = itemSize;
		this.count = array !== undefined ? array.length / itemSize : 0;
		this.normalized = normalized === true;

		this.dynamic = false;
		this.updateRange = { offset: 0, count: - 1 };

		this.version = 0;

	}

	Object.defineProperty( BufferAttribute.prototype, 'needsUpdate', {

		set: function ( value ) {

			if ( value === true ) this.version ++;

		}

	} );

	Object.assign( BufferAttribute.prototype, {

		isBufferAttribute: true,

		onUploadCallback: function () {},

		setArray: function ( array ) {

			if ( Array.isArray( array ) ) {

				throw new TypeError( 'THREE.BufferAttribute: array should be a Typed Array.' );

			}

			this.count = array !== undefined ? array.length / this.itemSize : 0;
			this.array = array;

			return this;

		},

		setDynamic: function ( value ) {

			this.dynamic = value;

			return this;

		},

		copy: function ( source ) {

			this.name = source.name;
			this.array = new source.array.constructor( source.array );
			this.itemSize = source.itemSize;
			this.count = source.count;
			this.normalized = source.normalized;

			this.dynamic = source.dynamic;

			return this;

		},

		copyAt: function ( index1, attribute, index2 ) {

			index1 *= this.itemSize;
			index2 *= attribute.itemSize;

			for ( var i = 0, l = this.itemSize; i < l; i ++ ) {

				this.array[ index1 + i ] = attribute.array[ index2 + i ];

			}

			return this;

		},

		copyArray: function ( array ) {

			this.array.set( array );

			return this;

		},

		copyColorsArray: function ( colors ) {

			var array = this.array, offset = 0;

			for ( var i = 0, l = colors.length; i < l; i ++ ) {

				var color = colors[ i ];

				if ( color === undefined ) {

					console.warn( 'THREE.BufferAttribute.copyColorsArray(): color is undefined', i );
					color = new Color();

				}

				array[ offset ++ ] = color.r;
				array[ offset ++ ] = color.g;
				array[ offset ++ ] = color.b;

			}

			return this;

		},

		copyVector2sArray: function ( vectors ) {

			var array = this.array, offset = 0;

			for ( var i = 0, l = vectors.length; i < l; i ++ ) {

				var vector = vectors[ i ];

				if ( vector === undefined ) {

					console.warn( 'THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i );
					vector = new Vector2();

				}

				array[ offset ++ ] = vector.x;
				array[ offset ++ ] = vector.y;

			}

			return this;

		},

		copyVector3sArray: function ( vectors ) {

			var array = this.array, offset = 0;

			for ( var i = 0, l = vectors.length; i < l; i ++ ) {

				var vector = vectors[ i ];

				if ( vector === undefined ) {

					console.warn( 'THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i );
					vector = new Vector3();

				}

				array[ offset ++ ] = vector.x;
				array[ offset ++ ] = vector.y;
				array[ offset ++ ] = vector.z;

			}

			return this;

		},

		copyVector4sArray: function ( vectors ) {

			var array = this.array, offset = 0;

			for ( var i = 0, l = vectors.length; i < l; i ++ ) {

				var vector = vectors[ i ];

				if ( vector === undefined ) {

					console.warn( 'THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i );
					vector = new Vector4();

				}

				array[ offset ++ ] = vector.x;
				array[ offset ++ ] = vector.y;
				array[ offset ++ ] = vector.z;
				array[ offset ++ ] = vector.w;

			}

			return this;

		},

		set: function ( value, offset ) {

			if ( offset === undefined ) offset = 0;

			this.array.set( value, offset );

			return this;

		},

		getX: function ( index ) {

			return this.array[ index * this.itemSize ];

		},

		setX: function ( index, x ) {

			this.array[ index * this.itemSize ] = x;

			return this;

		},

		getY: function ( index ) {

			return this.array[ index * this.itemSize + 1 ];

		},

		setY: function ( index, y ) {

			this.array[ index * this.itemSize + 1 ] = y;

			return this;

		},

		getZ: function ( index ) {

			return this.array[ index * this.itemSize + 2 ];

		},

		setZ: function ( index, z ) {

			this.array[ index * this.itemSize + 2 ] = z;

			return this;

		},

		getW: function ( index ) {

			return this.array[ index * this.itemSize + 3 ];

		},

		setW: function ( index, w ) {

			this.array[ index * this.itemSize + 3 ] = w;

			return this;

		},

		setXY: function ( index, x, y ) {

			index *= this.itemSize;

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;

			return this;

		},

		setXYZ: function ( index, x, y, z ) {

			index *= this.itemSize;

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;
			this.array[ index + 2 ] = z;

			return this;

		},

		setXYZW: function ( index, x, y, z, w ) {

			index *= this.itemSize;

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;
			this.array[ index + 2 ] = z;
			this.array[ index + 3 ] = w;

			return this;

		},

		onUpload: function ( callback ) {

			this.onUploadCallback = callback;

			return this;

		},

		clone: function () {

			return new this.constructor( this.array, this.itemSize ).copy( this );

		}

	} );

	//

	function Int8BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Int8Array( array ), itemSize, normalized );

	}

	Int8BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Int8BufferAttribute.prototype.constructor = Int8BufferAttribute;


	function Uint8BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint8Array( array ), itemSize, normalized );

	}

	Uint8BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint8BufferAttribute.prototype.constructor = Uint8BufferAttribute;


	function Uint8ClampedBufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint8ClampedArray( array ), itemSize, normalized );

	}

	Uint8ClampedBufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint8ClampedBufferAttribute.prototype.constructor = Uint8ClampedBufferAttribute;


	function Int16BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Int16Array( array ), itemSize, normalized );

	}

	Int16BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Int16BufferAttribute.prototype.constructor = Int16BufferAttribute;


	function Uint16BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint16Array( array ), itemSize, normalized );

	}

	Uint16BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint16BufferAttribute.prototype.constructor = Uint16BufferAttribute;


	function Int32BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Int32Array( array ), itemSize, normalized );

	}

	Int32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Int32BufferAttribute.prototype.constructor = Int32BufferAttribute;


	function Uint32BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Uint32Array( array ), itemSize, normalized );

	}

	Uint32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Uint32BufferAttribute.prototype.constructor = Uint32BufferAttribute;


	function Float32BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Float32Array( array ), itemSize, normalized );

	}

	Float32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Float32BufferAttribute.prototype.constructor = Float32BufferAttribute;


	function Float64BufferAttribute( array, itemSize, normalized ) {

		BufferAttribute.call( this, new Float64Array( array ), itemSize, normalized );

	}

	Float64BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
	Float64BufferAttribute.prototype.constructor = Float64BufferAttribute;

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function DirectGeometry() {

		this.vertices = [];
		this.normals = [];
		this.colors = [];
		this.uvs = [];
		this.uvs2 = [];

		this.groups = [];

		this.morphTargets = {};

		this.skinWeights = [];
		this.skinIndices = [];

		// this.lineDistances = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		// update flags

		this.verticesNeedUpdate = false;
		this.normalsNeedUpdate = false;
		this.colorsNeedUpdate = false;
		this.uvsNeedUpdate = false;
		this.groupsNeedUpdate = false;

	}

	Object.assign( DirectGeometry.prototype, {

		computeGroups: function ( geometry ) {

			var group;
			var groups = [];
			var materialIndex = undefined;

			var faces = geometry.faces;

			for ( var i = 0; i < faces.length; i ++ ) {

				var face = faces[ i ];

				// materials

				if ( face.materialIndex !== materialIndex ) {

					materialIndex = face.materialIndex;

					if ( group !== undefined ) {

						group.count = ( i * 3 ) - group.start;
						groups.push( group );

					}

					group = {
						start: i * 3,
						materialIndex: materialIndex
					};

				}

			}

			if ( group !== undefined ) {

				group.count = ( i * 3 ) - group.start;
				groups.push( group );

			}

			this.groups = groups;

		},

		fromGeometry: function ( geometry ) {

			var faces = geometry.faces;
			var vertices = geometry.vertices;
			var faceVertexUvs = geometry.faceVertexUvs;

			var hasFaceVertexUv = faceVertexUvs[ 0 ] && faceVertexUvs[ 0 ].length > 0;
			var hasFaceVertexUv2 = faceVertexUvs[ 1 ] && faceVertexUvs[ 1 ].length > 0;

			// morphs

			var morphTargets = geometry.morphTargets;
			var morphTargetsLength = morphTargets.length;

			var morphTargetsPosition;

			if ( morphTargetsLength > 0 ) {

				morphTargetsPosition = [];

				for ( var i = 0; i < morphTargetsLength; i ++ ) {

					morphTargetsPosition[ i ] = {
						name: morphTargets[ i ].name,
					 	data: []
					};

				}

				this.morphTargets.position = morphTargetsPosition;

			}

			var morphNormals = geometry.morphNormals;
			var morphNormalsLength = morphNormals.length;

			var morphTargetsNormal;

			if ( morphNormalsLength > 0 ) {

				morphTargetsNormal = [];

				for ( var i = 0; i < morphNormalsLength; i ++ ) {

					morphTargetsNormal[ i ] = {
						name: morphNormals[ i ].name,
					 	data: []
					};

				}

				this.morphTargets.normal = morphTargetsNormal;

			}

			// skins

			var skinIndices = geometry.skinIndices;
			var skinWeights = geometry.skinWeights;

			var hasSkinIndices = skinIndices.length === vertices.length;
			var hasSkinWeights = skinWeights.length === vertices.length;

			//

			if ( vertices.length > 0 && faces.length === 0 ) {

				console.error( 'THREE.DirectGeometry: Faceless geometries are not supported.' );

			}

			for ( var i = 0; i < faces.length; i ++ ) {

				var face = faces[ i ];

				this.vertices.push( vertices[ face.a ], vertices[ face.b ], vertices[ face.c ] );

				var vertexNormals = face.vertexNormals;

				if ( vertexNormals.length === 3 ) {

					this.normals.push( vertexNormals[ 0 ], vertexNormals[ 1 ], vertexNormals[ 2 ] );

				} else {

					var normal = face.normal;

					this.normals.push( normal, normal, normal );

				}

				var vertexColors = face.vertexColors;

				if ( vertexColors.length === 3 ) {

					this.colors.push( vertexColors[ 0 ], vertexColors[ 1 ], vertexColors[ 2 ] );

				} else {

					var color = face.color;

					this.colors.push( color, color, color );

				}

				if ( hasFaceVertexUv === true ) {

					var vertexUvs = faceVertexUvs[ 0 ][ i ];

					if ( vertexUvs !== undefined ) {

						this.uvs.push( vertexUvs[ 0 ], vertexUvs[ 1 ], vertexUvs[ 2 ] );

					} else {

						console.warn( 'THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ', i );

						this.uvs.push( new Vector2(), new Vector2(), new Vector2() );

					}

				}

				if ( hasFaceVertexUv2 === true ) {

					var vertexUvs = faceVertexUvs[ 1 ][ i ];

					if ( vertexUvs !== undefined ) {

						this.uvs2.push( vertexUvs[ 0 ], vertexUvs[ 1 ], vertexUvs[ 2 ] );

					} else {

						console.warn( 'THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ', i );

						this.uvs2.push( new Vector2(), new Vector2(), new Vector2() );

					}

				}

				// morphs

				for ( var j = 0; j < morphTargetsLength; j ++ ) {

					var morphTarget = morphTargets[ j ].vertices;

					morphTargetsPosition[ j ].data.push( morphTarget[ face.a ], morphTarget[ face.b ], morphTarget[ face.c ] );

				}

				for ( var j = 0; j < morphNormalsLength; j ++ ) {

					var morphNormal = morphNormals[ j ].vertexNormals[ i ];

					morphTargetsNormal[ j ].data.push( morphNormal.a, morphNormal.b, morphNormal.c );

				}

				// skins

				if ( hasSkinIndices ) {

					this.skinIndices.push( skinIndices[ face.a ], skinIndices[ face.b ], skinIndices[ face.c ] );

				}

				if ( hasSkinWeights ) {

					this.skinWeights.push( skinWeights[ face.a ], skinWeights[ face.b ], skinWeights[ face.c ] );

				}

			}

			this.computeGroups( geometry );

			this.verticesNeedUpdate = geometry.verticesNeedUpdate;
			this.normalsNeedUpdate = geometry.normalsNeedUpdate;
			this.colorsNeedUpdate = geometry.colorsNeedUpdate;
			this.uvsNeedUpdate = geometry.uvsNeedUpdate;
			this.groupsNeedUpdate = geometry.groupsNeedUpdate;

			return this;

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function arrayMax( array ) {

		if ( array.length === 0 ) return - Infinity;

		var max = array[ 0 ];

		for ( var i = 1, l = array.length; i < l; ++ i ) {

			if ( array[ i ] > max ) max = array[ i ];

		}

		return max;

	}

	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 */

	var bufferGeometryId = 1; // BufferGeometry uses odd numbers as Id

	function BufferGeometry() {

		Object.defineProperty( this, 'id', { value: bufferGeometryId += 2 } );

		this.uuid = _Math.generateUUID();

		this.name = '';
		this.type = 'BufferGeometry';

		this.index = null;
		this.attributes = {};

		this.morphAttributes = {};

		this.groups = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		this.drawRange = { start: 0, count: Infinity };

		this.userData = {};

	}

	BufferGeometry.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: BufferGeometry,

		isBufferGeometry: true,

		getIndex: function () {

			return this.index;

		},

		setIndex: function ( index ) {

			if ( Array.isArray( index ) ) {

				this.index = new ( arrayMax( index ) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute )( index, 1 );

			} else {

				this.index = index;

			}

		},

		addAttribute: function ( name, attribute ) {

			if ( ! ( attribute && attribute.isBufferAttribute ) && ! ( attribute && attribute.isInterleavedBufferAttribute ) ) {

				console.warn( 'THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).' );

				return this.addAttribute( name, new BufferAttribute( arguments[ 1 ], arguments[ 2 ] ) );

			}

			if ( name === 'index' ) {

				console.warn( 'THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute.' );
				this.setIndex( attribute );

				return this;

			}

			this.attributes[ name ] = attribute;

			return this;

		},

		getAttribute: function ( name ) {

			return this.attributes[ name ];

		},

		removeAttribute: function ( name ) {

			delete this.attributes[ name ];

			return this;

		},

		addGroup: function ( start, count, materialIndex ) {

			this.groups.push( {

				start: start,
				count: count,
				materialIndex: materialIndex !== undefined ? materialIndex : 0

			} );

		},

		clearGroups: function () {

			this.groups = [];

		},

		setDrawRange: function ( start, count ) {

			this.drawRange.start = start;
			this.drawRange.count = count;

		},

		applyMatrix: function ( matrix ) {

			var position = this.attributes.position;

			if ( position !== undefined ) {

				matrix.applyToBufferAttribute( position );
				position.needsUpdate = true;

			}

			var normal = this.attributes.normal;

			if ( normal !== undefined ) {

				var normalMatrix = new Matrix3().getNormalMatrix( matrix );

				normalMatrix.applyToBufferAttribute( normal );
				normal.needsUpdate = true;

			}

			var tangent = this.attributes.tangent;

			if ( tangent !== undefined ) {

				var normalMatrix = new Matrix3().getNormalMatrix( matrix );

				// Tangent is vec4, but the '.w' component is a sign value (+1/-1).
				normalMatrix.applyToBufferAttribute( tangent );
				tangent.needsUpdate = true;

			}

			if ( this.boundingBox !== null ) {

				this.computeBoundingBox();

			}

			if ( this.boundingSphere !== null ) {

				this.computeBoundingSphere();

			}

			return this;

		},

		rotateX: function () {

			// rotate geometry around world x-axis

			var m1 = new Matrix4();

			return function rotateX( angle ) {

				m1.makeRotationX( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		rotateY: function () {

			// rotate geometry around world y-axis

			var m1 = new Matrix4();

			return function rotateY( angle ) {

				m1.makeRotationY( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		rotateZ: function () {

			// rotate geometry around world z-axis

			var m1 = new Matrix4();

			return function rotateZ( angle ) {

				m1.makeRotationZ( angle );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		translate: function () {

			// translate geometry

			var m1 = new Matrix4();

			return function translate( x, y, z ) {

				m1.makeTranslation( x, y, z );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		scale: function () {

			// scale geometry

			var m1 = new Matrix4();

			return function scale( x, y, z ) {

				m1.makeScale( x, y, z );

				this.applyMatrix( m1 );

				return this;

			};

		}(),

		lookAt: function () {

			var obj = new Object3D();

			return function lookAt( vector ) {

				obj.lookAt( vector );

				obj.updateMatrix();

				this.applyMatrix( obj.matrix );

			};

		}(),

		center: function () {

			var offset = new Vector3();

			return function center() {

				this.computeBoundingBox();

				this.boundingBox.getCenter( offset ).negate();

				this.translate( offset.x, offset.y, offset.z );

				return this;

			};

		}(),

		setFromObject: function ( object ) {

			// console.log( 'THREE.BufferGeometry.setFromObject(). Converting', object, this );

			var geometry = object.geometry;

			if ( object.isPoints || object.isLine ) {

				var positions = new Float32BufferAttribute( geometry.vertices.length * 3, 3 );
				var colors = new Float32BufferAttribute( geometry.colors.length * 3, 3 );

				this.addAttribute( 'position', positions.copyVector3sArray( geometry.vertices ) );
				this.addAttribute( 'color', colors.copyColorsArray( geometry.colors ) );

				if ( geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length ) {

					var lineDistances = new Float32BufferAttribute( geometry.lineDistances.length, 1 );

					this.addAttribute( 'lineDistance', lineDistances.copyArray( geometry.lineDistances ) );

				}

				if ( geometry.boundingSphere !== null ) {

					this.boundingSphere = geometry.boundingSphere.clone();

				}

				if ( geometry.boundingBox !== null ) {

					this.boundingBox = geometry.boundingBox.clone();

				}

			} else if ( object.isMesh ) {

				if ( geometry && geometry.isGeometry ) {

					this.fromGeometry( geometry );

				}

			}

			return this;

		},

		setFromPoints: function ( points ) {

			var position = [];

			for ( var i = 0, l = points.length; i < l; i ++ ) {

				var point = points[ i ];
				position.push( point.x, point.y, point.z || 0 );

			}

			this.addAttribute( 'position', new Float32BufferAttribute( position, 3 ) );

			return this;

		},

		updateFromObject: function ( object ) {

			var geometry = object.geometry;

			if ( object.isMesh ) {

				var direct = geometry.__directGeometry;

				if ( geometry.elementsNeedUpdate === true ) {

					direct = undefined;
					geometry.elementsNeedUpdate = false;

				}

				if ( direct === undefined ) {

					return this.fromGeometry( geometry );

				}

				direct.verticesNeedUpdate = geometry.verticesNeedUpdate;
				direct.normalsNeedUpdate = geometry.normalsNeedUpdate;
				direct.colorsNeedUpdate = geometry.colorsNeedUpdate;
				direct.uvsNeedUpdate = geometry.uvsNeedUpdate;
				direct.groupsNeedUpdate = geometry.groupsNeedUpdate;

				geometry.verticesNeedUpdate = false;
				geometry.normalsNeedUpdate = false;
				geometry.colorsNeedUpdate = false;
				geometry.uvsNeedUpdate = false;
				geometry.groupsNeedUpdate = false;

				geometry = direct;

			}

			var attribute;

			if ( geometry.verticesNeedUpdate === true ) {

				attribute = this.attributes.position;

				if ( attribute !== undefined ) {

					attribute.copyVector3sArray( geometry.vertices );
					attribute.needsUpdate = true;

				}

				geometry.verticesNeedUpdate = false;

			}

			if ( geometry.normalsNeedUpdate === true ) {

				attribute = this.attributes.normal;

				if ( attribute !== undefined ) {

					attribute.copyVector3sArray( geometry.normals );
					attribute.needsUpdate = true;

				}

				geometry.normalsNeedUpdate = false;

			}

			if ( geometry.colorsNeedUpdate === true ) {

				attribute = this.attributes.color;

				if ( attribute !== undefined ) {

					attribute.copyColorsArray( geometry.colors );
					attribute.needsUpdate = true;

				}

				geometry.colorsNeedUpdate = false;

			}

			if ( geometry.uvsNeedUpdate ) {

				attribute = this.attributes.uv;

				if ( attribute !== undefined ) {

					attribute.copyVector2sArray( geometry.uvs );
					attribute.needsUpdate = true;

				}

				geometry.uvsNeedUpdate = false;

			}

			if ( geometry.lineDistancesNeedUpdate ) {

				attribute = this.attributes.lineDistance;

				if ( attribute !== undefined ) {

					attribute.copyArray( geometry.lineDistances );
					attribute.needsUpdate = true;

				}

				geometry.lineDistancesNeedUpdate = false;

			}

			if ( geometry.groupsNeedUpdate ) {

				geometry.computeGroups( object.geometry );
				this.groups = geometry.groups;

				geometry.groupsNeedUpdate = false;

			}

			return this;

		},

		fromGeometry: function ( geometry ) {

			geometry.__directGeometry = new DirectGeometry().fromGeometry( geometry );

			return this.fromDirectGeometry( geometry.__directGeometry );

		},

		fromDirectGeometry: function ( geometry ) {

			var positions = new Float32Array( geometry.vertices.length * 3 );
			this.addAttribute( 'position', new BufferAttribute( positions, 3 ).copyVector3sArray( geometry.vertices ) );

			if ( geometry.normals.length > 0 ) {

				var normals = new Float32Array( geometry.normals.length * 3 );
				this.addAttribute( 'normal', new BufferAttribute( normals, 3 ).copyVector3sArray( geometry.normals ) );

			}

			if ( geometry.colors.length > 0 ) {

				var colors = new Float32Array( geometry.colors.length * 3 );
				this.addAttribute( 'color', new BufferAttribute( colors, 3 ).copyColorsArray( geometry.colors ) );

			}

			if ( geometry.uvs.length > 0 ) {

				var uvs = new Float32Array( geometry.uvs.length * 2 );
				this.addAttribute( 'uv', new BufferAttribute( uvs, 2 ).copyVector2sArray( geometry.uvs ) );

			}

			if ( geometry.uvs2.length > 0 ) {

				var uvs2 = new Float32Array( geometry.uvs2.length * 2 );
				this.addAttribute( 'uv2', new BufferAttribute( uvs2, 2 ).copyVector2sArray( geometry.uvs2 ) );

			}

			// groups

			this.groups = geometry.groups;

			// morphs

			for ( var name in geometry.morphTargets ) {

				var array = [];
				var morphTargets = geometry.morphTargets[ name ];

				for ( var i = 0, l = morphTargets.length; i < l; i ++ ) {

					var morphTarget = morphTargets[ i ];

					var attribute = new Float32BufferAttribute( morphTarget.data.length * 3, 3 );
					attribute.name = morphTarget.name;

					array.push( attribute.copyVector3sArray( morphTarget.data ) );

				}

				this.morphAttributes[ name ] = array;

			}

			// skinning

			if ( geometry.skinIndices.length > 0 ) {

				var skinIndices = new Float32BufferAttribute( geometry.skinIndices.length * 4, 4 );
				this.addAttribute( 'skinIndex', skinIndices.copyVector4sArray( geometry.skinIndices ) );

			}

			if ( geometry.skinWeights.length > 0 ) {

				var skinWeights = new Float32BufferAttribute( geometry.skinWeights.length * 4, 4 );
				this.addAttribute( 'skinWeight', skinWeights.copyVector4sArray( geometry.skinWeights ) );

			}

			//

			if ( geometry.boundingSphere !== null ) {

				this.boundingSphere = geometry.boundingSphere.clone();

			}

			if ( geometry.boundingBox !== null ) {

				this.boundingBox = geometry.boundingBox.clone();

			}

			return this;

		},

		computeBoundingBox: function () {

			var box = new Box3();

			return function computeBoundingBox() {

				if ( this.boundingBox === null ) {

					this.boundingBox = new Box3();

				}

				var position = this.attributes.position;
				var morphAttributesPosition = this.morphAttributes.position;

				if ( position !== undefined ) {

					this.boundingBox.setFromBufferAttribute( position );

					// process morph attributes if present

					if ( morphAttributesPosition ) {

						for ( var i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

							var morphAttribute = morphAttributesPosition[ i ];
							box.setFromBufferAttribute( morphAttribute );

							this.boundingBox.expandByPoint( box.min );
							this.boundingBox.expandByPoint( box.max );

						}

					}

				} else {

					this.boundingBox.makeEmpty();

				}

				if ( isNaN( this.boundingBox.min.x ) || isNaN( this.boundingBox.min.y ) || isNaN( this.boundingBox.min.z ) ) {

					console.error( 'THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this );

				}

			};

		}(),

		computeBoundingSphere: function () {

			var box = new Box3();
			var boxMorphTargets = new Box3();
			var vector = new Vector3();

			return function computeBoundingSphere() {

				if ( this.boundingSphere === null ) {

					this.boundingSphere = new Sphere();

				}

				var position = this.attributes.position;
				var morphAttributesPosition = this.morphAttributes.position;

				if ( position ) {

					// first, find the center of the bounding sphere

					var center = this.boundingSphere.center;

					box.setFromBufferAttribute( position );

					// process morph attributes if present

					if ( morphAttributesPosition ) {

						for ( var i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

							var morphAttribute = morphAttributesPosition[ i ];
							boxMorphTargets.setFromBufferAttribute( morphAttribute );

							box.expandByPoint( boxMorphTargets.min );
							box.expandByPoint( boxMorphTargets.max );

						}

					}

					box.getCenter( center );

					// second, try to find a boundingSphere with a radius smaller than the
					// boundingSphere of the boundingBox: sqrt(3) smaller in the best case

					var maxRadiusSq = 0;

					for ( var i = 0, il = position.count; i < il; i ++ ) {

						vector.fromBufferAttribute( position, i );

						maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

					}

					// process morph attributes if present

					if ( morphAttributesPosition ) {

						for ( var i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

							var morphAttribute = morphAttributesPosition[ i ];

							for ( var j = 0, jl = morphAttribute.count; j < jl; j ++ ) {

								vector.fromBufferAttribute( morphAttribute, i );

								maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

							}

						}

					}

					this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

					if ( isNaN( this.boundingSphere.radius ) ) {

						console.error( 'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this );

					}

				}

			};

		}(),

		computeFaceNormals: function () {

			// backwards compatibility

		},

		computeVertexNormals: function () {

			var index = this.index;
			var attributes = this.attributes;

			if ( attributes.position ) {

				var positions = attributes.position.array;

				if ( attributes.normal === undefined ) {

					this.addAttribute( 'normal', new BufferAttribute( new Float32Array( positions.length ), 3 ) );

				} else {

					// reset existing normals to zero

					var array = attributes.normal.array;

					for ( var i = 0, il = array.length; i < il; i ++ ) {

						array[ i ] = 0;

					}

				}

				var normals = attributes.normal.array;

				var vA, vB, vC;
				var pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
				var cb = new Vector3(), ab = new Vector3();

				// indexed elements

				if ( index ) {

					var indices = index.array;

					for ( var i = 0, il = index.count; i < il; i += 3 ) {

						vA = indices[ i + 0 ] * 3;
						vB = indices[ i + 1 ] * 3;
						vC = indices[ i + 2 ] * 3;

						pA.fromArray( positions, vA );
						pB.fromArray( positions, vB );
						pC.fromArray( positions, vC );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						normals[ vA ] += cb.x;
						normals[ vA + 1 ] += cb.y;
						normals[ vA + 2 ] += cb.z;

						normals[ vB ] += cb.x;
						normals[ vB + 1 ] += cb.y;
						normals[ vB + 2 ] += cb.z;

						normals[ vC ] += cb.x;
						normals[ vC + 1 ] += cb.y;
						normals[ vC + 2 ] += cb.z;

					}

				} else {

					// non-indexed elements (unconnected triangle soup)

					for ( var i = 0, il = positions.length; i < il; i += 9 ) {

						pA.fromArray( positions, i );
						pB.fromArray( positions, i + 3 );
						pC.fromArray( positions, i + 6 );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						normals[ i ] = cb.x;
						normals[ i + 1 ] = cb.y;
						normals[ i + 2 ] = cb.z;

						normals[ i + 3 ] = cb.x;
						normals[ i + 4 ] = cb.y;
						normals[ i + 5 ] = cb.z;

						normals[ i + 6 ] = cb.x;
						normals[ i + 7 ] = cb.y;
						normals[ i + 8 ] = cb.z;

					}

				}

				this.normalizeNormals();

				attributes.normal.needsUpdate = true;

			}

		},

		merge: function ( geometry, offset ) {

			if ( ! ( geometry && geometry.isBufferGeometry ) ) {

				console.error( 'THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.', geometry );
				return;

			}

			if ( offset === undefined ) {

				offset = 0;

				console.warn(
					'THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. '
					+ 'Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.'
				);

			}

			var attributes = this.attributes;

			for ( var key in attributes ) {

				if ( geometry.attributes[ key ] === undefined ) continue;

				var attribute1 = attributes[ key ];
				var attributeArray1 = attribute1.array;

				var attribute2 = geometry.attributes[ key ];
				var attributeArray2 = attribute2.array;

				var attributeSize = attribute2.itemSize;

				for ( var i = 0, j = attributeSize * offset; i < attributeArray2.length; i ++, j ++ ) {

					attributeArray1[ j ] = attributeArray2[ i ];

				}

			}

			return this;

		},

		normalizeNormals: function () {

			var vector = new Vector3();

			return function normalizeNormals() {

				var normals = this.attributes.normal;

				for ( var i = 0, il = normals.count; i < il; i ++ ) {

					vector.x = normals.getX( i );
					vector.y = normals.getY( i );
					vector.z = normals.getZ( i );

					vector.normalize();

					normals.setXYZ( i, vector.x, vector.y, vector.z );

				}

			};

		}(),

		toNonIndexed: function () {

			function convertBufferAttribute( attribute, indices ) {

				var array = attribute.array;
				var itemSize = attribute.itemSize;

				var array2 = new array.constructor( indices.length * itemSize );

				var index = 0, index2 = 0;

				for ( var i = 0, l = indices.length; i < l; i ++ ) {

					index = indices[ i ] * itemSize;

					for ( var j = 0; j < itemSize; j ++ ) {

						array2[ index2 ++ ] = array[ index ++ ];

					}

				}

				return new BufferAttribute( array2, itemSize );

			}

			//

			if ( this.index === null ) {

				console.warn( 'THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed.' );
				return this;

			}

			var geometry2 = new BufferGeometry();

			var indices = this.index.array;
			var attributes = this.attributes;

			// attributes

			for ( var name in attributes ) {

				var attribute = attributes[ name ];

				var newAttribute = convertBufferAttribute( attribute, indices );

				geometry2.addAttribute( name, newAttribute );

			}

			// morph attributes

			var morphAttributes = this.morphAttributes;

			for ( name in morphAttributes ) {

				var morphArray = [];
				var morphAttribute = morphAttributes[ name ]; // morphAttribute: array of Float32BufferAttributes

				for ( var i = 0, il = morphAttribute.length; i < il; i ++ ) {

					var attribute = morphAttribute[ i ];

					var newAttribute = convertBufferAttribute( attribute, indices );

					morphArray.push( newAttribute );

				}

				geometry2.morphAttributes[ name ] = morphArray;

			}

			// groups

			var groups = this.groups;

			for ( var i = 0, l = groups.length; i < l; i ++ ) {

				var group = groups[ i ];
				geometry2.addGroup( group.start, group.count, group.materialIndex );

			}

			return geometry2;

		},

		toJSON: function () {

			var data = {
				metadata: {
					version: 4.5,
					type: 'BufferGeometry',
					generator: 'BufferGeometry.toJSON'
				}
			};

			// standard BufferGeometry serialization

			data.uuid = this.uuid;
			data.type = this.type;
			if ( this.name !== '' ) data.name = this.name;
			if ( Object.keys( this.userData ).length > 0 ) data.userData = this.userData;

			if ( this.parameters !== undefined ) {

				var parameters = this.parameters;

				for ( var key in parameters ) {

					if ( parameters[ key ] !== undefined ) data[ key ] = parameters[ key ];

				}

				return data;

			}

			data.data = { attributes: {} };

			var index = this.index;

			if ( index !== null ) {

				data.data.index = {
					type: index.array.constructor.name,
					array: Array.prototype.slice.call( index.array )
				};

			}

			var attributes = this.attributes;

			for ( var key in attributes ) {

				var attribute = attributes[ key ];

				var attributeData = {
					itemSize: attribute.itemSize,
					type: attribute.array.constructor.name,
					array: Array.prototype.slice.call( attribute.array ),
					normalized: attribute.normalized
				};

				if ( attribute.name !== '' ) attributeData.name = attribute.name;

				data.data.attributes[ key ] = attributeData;

			}

			var morphAttributes = {};
			var hasMorphAttributes = false;

			for ( var key in this.morphAttributes ) {

				var attributeArray = this.morphAttributes[ key ];

				var array = [];

				for ( var i = 0, il = attributeArray.length; i < il; i ++ ) {

					var attribute = attributeArray[ i ];

					var attributeData = {
						itemSize: attribute.itemSize,
						type: attribute.array.constructor.name,
						array: Array.prototype.slice.call( attribute.array ),
						normalized: attribute.normalized
					};

					if ( attribute.name !== '' ) attributeData.name = attribute.name;

					array.push( attributeData );

				}

				if ( array.length > 0 ) {

					morphAttributes[ key ] = array;

					hasMorphAttributes = true;

				}

			}

			if ( hasMorphAttributes ) data.data.morphAttributes = morphAttributes;

			var groups = this.groups;

			if ( groups.length > 0 ) {

				data.data.groups = JSON.parse( JSON.stringify( groups ) );

			}

			var boundingSphere = this.boundingSphere;

			if ( boundingSphere !== null ) {

				data.data.boundingSphere = {
					center: boundingSphere.center.toArray(),
					radius: boundingSphere.radius
				};

			}

			return data;

		},

		clone: function () {

			/*
			 // Handle primitives

			 var parameters = this.parameters;

			 if ( parameters !== undefined ) {

			 var values = [];

			 for ( var key in parameters ) {

			 values.push( parameters[ key ] );

			 }

			 var geometry = Object.create( this.constructor.prototype );
			 this.constructor.apply( geometry, values );
			 return geometry;

			 }

			 return new this.constructor().copy( this );
			 */

			return new BufferGeometry().copy( this );

		},

		copy: function ( source ) {

			var name, i, l;

			// reset

			this.index = null;
			this.attributes = {};
			this.morphAttributes = {};
			this.groups = [];
			this.boundingBox = null;
			this.boundingSphere = null;

			// name

			this.name = source.name;

			// index

			var index = source.index;

			if ( index !== null ) {

				this.setIndex( index.clone() );

			}

			// attributes

			var attributes = source.attributes;

			for ( name in attributes ) {

				var attribute = attributes[ name ];
				this.addAttribute( name, attribute.clone() );

			}

			// morph attributes

			var morphAttributes = source.morphAttributes;

			for ( name in morphAttributes ) {

				var array = [];
				var morphAttribute = morphAttributes[ name ]; // morphAttribute: array of Float32BufferAttributes

				for ( i = 0, l = morphAttribute.length; i < l; i ++ ) {

					array.push( morphAttribute[ i ].clone() );

				}

				this.morphAttributes[ name ] = array;

			}

			// groups

			var groups = source.groups;

			for ( i = 0, l = groups.length; i < l; i ++ ) {

				var group = groups[ i ];
				this.addGroup( group.start, group.count, group.materialIndex );

			}

			// bounding box

			var boundingBox = source.boundingBox;

			if ( boundingBox !== null ) {

				this.boundingBox = boundingBox.clone();

			}

			// bounding sphere

			var boundingSphere = source.boundingSphere;

			if ( boundingSphere !== null ) {

				this.boundingSphere = boundingSphere.clone();

			}

			// draw range

			this.drawRange.start = source.drawRange.start;
			this.drawRange.count = source.drawRange.count;

			// user data

			this.userData = source.userData;

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// BoxGeometry

	function BoxGeometry( width, height, depth, widthSegments, heightSegments, depthSegments ) {

		Geometry.call( this );

		this.type = 'BoxGeometry';

		this.parameters = {
			width: width,
			height: height,
			depth: depth,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			depthSegments: depthSegments
		};

		this.fromBufferGeometry( new BoxBufferGeometry( width, height, depth, widthSegments, heightSegments, depthSegments ) );
		this.mergeVertices();

	}

	BoxGeometry.prototype = Object.create( Geometry.prototype );
	BoxGeometry.prototype.constructor = BoxGeometry;

	// BoxBufferGeometry

	function BoxBufferGeometry( width, height, depth, widthSegments, heightSegments, depthSegments ) {

		BufferGeometry.call( this );

		this.type = 'BoxBufferGeometry';

		this.parameters = {
			width: width,
			height: height,
			depth: depth,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			depthSegments: depthSegments
		};

		var scope = this;

		width = width || 1;
		height = height || 1;
		depth = depth || 1;

		// segments

		widthSegments = Math.floor( widthSegments ) || 1;
		heightSegments = Math.floor( heightSegments ) || 1;
		depthSegments = Math.floor( depthSegments ) || 1;

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// helper variables

		var numberOfVertices = 0;
		var groupStart = 0;

		// build each side of the box geometry

		buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0 ); // px
		buildPlane( 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1 ); // nx
		buildPlane( 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2 ); // py
		buildPlane( 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3 ); // ny
		buildPlane( 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4 ); // pz
		buildPlane( 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5 ); // nz

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

		function buildPlane( u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex ) {

			var segmentWidth = width / gridX;
			var segmentHeight = height / gridY;

			var widthHalf = width / 2;
			var heightHalf = height / 2;
			var depthHalf = depth / 2;

			var gridX1 = gridX + 1;
			var gridY1 = gridY + 1;

			var vertexCounter = 0;
			var groupCount = 0;

			var ix, iy;

			var vector = new Vector3();

			// generate vertices, normals and uvs

			for ( iy = 0; iy < gridY1; iy ++ ) {

				var y = iy * segmentHeight - heightHalf;

				for ( ix = 0; ix < gridX1; ix ++ ) {

					var x = ix * segmentWidth - widthHalf;

					// set values to correct vector component

					vector[ u ] = x * udir;
					vector[ v ] = y * vdir;
					vector[ w ] = depthHalf;

					// now apply vector to vertex buffer

					vertices.push( vector.x, vector.y, vector.z );

					// set values to correct vector component

					vector[ u ] = 0;
					vector[ v ] = 0;
					vector[ w ] = depth > 0 ? 1 : - 1;

					// now apply vector to normal buffer

					normals.push( vector.x, vector.y, vector.z );

					// uvs

					uvs.push( ix / gridX );
					uvs.push( 1 - ( iy / gridY ) );

					// counters

					vertexCounter += 1;

				}

			}

			// indices

			// 1. you need three indices to draw a single face
			// 2. a single segment consists of two faces
			// 3. so we need to generate six (2*3) indices per segment

			for ( iy = 0; iy < gridY; iy ++ ) {

				for ( ix = 0; ix < gridX; ix ++ ) {

					var a = numberOfVertices + ix + gridX1 * iy;
					var b = numberOfVertices + ix + gridX1 * ( iy + 1 );
					var c = numberOfVertices + ( ix + 1 ) + gridX1 * ( iy + 1 );
					var d = numberOfVertices + ( ix + 1 ) + gridX1 * iy;

					// faces

					indices.push( a, b, d );
					indices.push( b, c, d );

					// increase counter

					groupCount += 6;

				}

			}

			// add a group to the geometry. this will ensure multi material support

			scope.addGroup( groupStart, groupCount, materialIndex );

			// calculate new start value for groups

			groupStart += groupCount;

			// update total number of vertices

			numberOfVertices += vertexCounter;

		}

	}

	BoxBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	BoxBufferGeometry.prototype.constructor = BoxBufferGeometry;

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// PlaneGeometry

	function PlaneGeometry( width, height, widthSegments, heightSegments ) {

		Geometry.call( this );

		this.type = 'PlaneGeometry';

		this.parameters = {
			width: width,
			height: height,
			widthSegments: widthSegments,
			heightSegments: heightSegments
		};

		this.fromBufferGeometry( new PlaneBufferGeometry( width, height, widthSegments, heightSegments ) );
		this.mergeVertices();

	}

	PlaneGeometry.prototype = Object.create( Geometry.prototype );
	PlaneGeometry.prototype.constructor = PlaneGeometry;

	// PlaneBufferGeometry

	function PlaneBufferGeometry( width, height, widthSegments, heightSegments ) {

		BufferGeometry.call( this );

		this.type = 'PlaneBufferGeometry';

		this.parameters = {
			width: width,
			height: height,
			widthSegments: widthSegments,
			heightSegments: heightSegments
		};

		width = width || 1;
		height = height || 1;

		var width_half = width / 2;
		var height_half = height / 2;

		var gridX = Math.floor( widthSegments ) || 1;
		var gridY = Math.floor( heightSegments ) || 1;

		var gridX1 = gridX + 1;
		var gridY1 = gridY + 1;

		var segment_width = width / gridX;
		var segment_height = height / gridY;

		var ix, iy;

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// generate vertices, normals and uvs

		for ( iy = 0; iy < gridY1; iy ++ ) {

			var y = iy * segment_height - height_half;

			for ( ix = 0; ix < gridX1; ix ++ ) {

				var x = ix * segment_width - width_half;

				vertices.push( x, - y, 0 );

				normals.push( 0, 0, 1 );

				uvs.push( ix / gridX );
				uvs.push( 1 - ( iy / gridY ) );

			}

		}

		// indices

		for ( iy = 0; iy < gridY; iy ++ ) {

			for ( ix = 0; ix < gridX; ix ++ ) {

				var a = ix + gridX1 * iy;
				var b = ix + gridX1 * ( iy + 1 );
				var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
				var d = ( ix + 1 ) + gridX1 * iy;

				// faces

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	}

	PlaneBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	PlaneBufferGeometry.prototype.constructor = PlaneBufferGeometry;

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */

	var materialId = 0;

	function Material() {

		Object.defineProperty( this, 'id', { value: materialId ++ } );

		this.uuid = _Math.generateUUID();

		this.name = '';
		this.type = 'Material';

		this.fog = true;
		this.lights = true;

		this.blending = NormalBlending;
		this.side = FrontSide;
		this.flatShading = false;
		this.vertexTangents = false;
		this.vertexColors = NoColors; // THREE.NoColors, THREE.VertexColors, THREE.FaceColors

		this.opacity = 1;
		this.transparent = false;

		this.blendSrc = SrcAlphaFactor;
		this.blendDst = OneMinusSrcAlphaFactor;
		this.blendEquation = AddEquation;
		this.blendSrcAlpha = null;
		this.blendDstAlpha = null;
		this.blendEquationAlpha = null;

		this.depthFunc = LessEqualDepth;
		this.depthTest = true;
		this.depthWrite = true;

		this.clippingPlanes = null;
		this.clipIntersection = false;
		this.clipShadows = false;

		this.shadowSide = null;

		this.colorWrite = true;

		this.precision = null; // override the renderer's default precision for this material

		this.polygonOffset = false;
		this.polygonOffsetFactor = 0;
		this.polygonOffsetUnits = 0;

		this.dithering = false;

		this.alphaTest = 0;
		this.premultipliedAlpha = false;

		this.visible = true;

		this.userData = {};

		this.needsUpdate = true;

	}

	Material.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

		constructor: Material,

		isMaterial: true,

		onBeforeCompile: function () {},

		setValues: function ( values ) {

			if ( values === undefined ) return;

			for ( var key in values ) {

				var newValue = values[ key ];

				if ( newValue === undefined ) {

					console.warn( "THREE.Material: '" + key + "' parameter is undefined." );
					continue;

				}

				// for backward compatability if shading is set in the constructor
				if ( key === 'shading' ) {

					console.warn( 'THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.' );
					this.flatShading = ( newValue === FlatShading ) ? true : false;
					continue;

				}

				var currentValue = this[ key ];

				if ( currentValue === undefined ) {

					console.warn( "THREE." + this.type + ": '" + key + "' is not a property of this material." );
					continue;

				}

				if ( currentValue && currentValue.isColor ) {

					currentValue.set( newValue );

				} else if ( ( currentValue && currentValue.isVector3 ) && ( newValue && newValue.isVector3 ) ) {

					currentValue.copy( newValue );

				} else {

					this[ key ] = newValue;

				}

			}

		},

		toJSON: function ( meta ) {

			var isRoot = ( meta === undefined || typeof meta === 'string' );

			if ( isRoot ) {

				meta = {
					textures: {},
					images: {}
				};

			}

			var data = {
				metadata: {
					version: 4.5,
					type: 'Material',
					generator: 'Material.toJSON'
				}
			};

			// standard Material serialization
			data.uuid = this.uuid;
			data.type = this.type;

			if ( this.name !== '' ) data.name = this.name;

			if ( this.color && this.color.isColor ) data.color = this.color.getHex();

			if ( this.roughness !== undefined ) data.roughness = this.roughness;
			if ( this.metalness !== undefined ) data.metalness = this.metalness;

			if ( this.emissive && this.emissive.isColor ) data.emissive = this.emissive.getHex();
			if ( this.emissiveIntensity !== 1 ) data.emissiveIntensity = this.emissiveIntensity;

			if ( this.specular && this.specular.isColor ) data.specular = this.specular.getHex();
			if ( this.shininess !== undefined ) data.shininess = this.shininess;
			if ( this.clearCoat !== undefined ) data.clearCoat = this.clearCoat;
			if ( this.clearCoatRoughness !== undefined ) data.clearCoatRoughness = this.clearCoatRoughness;

			if ( this.map && this.map.isTexture ) data.map = this.map.toJSON( meta ).uuid;
			if ( this.alphaMap && this.alphaMap.isTexture ) data.alphaMap = this.alphaMap.toJSON( meta ).uuid;
			if ( this.lightMap && this.lightMap.isTexture ) data.lightMap = this.lightMap.toJSON( meta ).uuid;

			if ( this.aoMap && this.aoMap.isTexture ) {

				data.aoMap = this.aoMap.toJSON( meta ).uuid;
				data.aoMapIntensity = this.aoMapIntensity;

			}

			if ( this.bumpMap && this.bumpMap.isTexture ) {

				data.bumpMap = this.bumpMap.toJSON( meta ).uuid;
				data.bumpScale = this.bumpScale;

			}

			if ( this.normalMap && this.normalMap.isTexture ) {

				data.normalMap = this.normalMap.toJSON( meta ).uuid;
				data.normalMapType = this.normalMapType;
				data.normalScale = this.normalScale.toArray();

			}

			if ( this.displacementMap && this.displacementMap.isTexture ) {

				data.displacementMap = this.displacementMap.toJSON( meta ).uuid;
				data.displacementScale = this.displacementScale;
				data.displacementBias = this.displacementBias;

			}

			if ( this.roughnessMap && this.roughnessMap.isTexture ) data.roughnessMap = this.roughnessMap.toJSON( meta ).uuid;
			if ( this.metalnessMap && this.metalnessMap.isTexture ) data.metalnessMap = this.metalnessMap.toJSON( meta ).uuid;

			if ( this.emissiveMap && this.emissiveMap.isTexture ) data.emissiveMap = this.emissiveMap.toJSON( meta ).uuid;
			if ( this.specularMap && this.specularMap.isTexture ) data.specularMap = this.specularMap.toJSON( meta ).uuid;

			if ( this.envMap && this.envMap.isTexture ) {

				data.envMap = this.envMap.toJSON( meta ).uuid;
				data.reflectivity = this.reflectivity; // Scale behind envMap

				if ( this.combine !== undefined ) data.combine = this.combine;
				if ( this.envMapIntensity !== undefined ) data.envMapIntensity = this.envMapIntensity;

			}

			if ( this.gradientMap && this.gradientMap.isTexture ) {

				data.gradientMap = this.gradientMap.toJSON( meta ).uuid;

			}

			if ( this.size !== undefined ) data.size = this.size;
			if ( this.sizeAttenuation !== undefined ) data.sizeAttenuation = this.sizeAttenuation;

			if ( this.blending !== NormalBlending ) data.blending = this.blending;
			if ( this.flatShading === true ) data.flatShading = this.flatShading;
			if ( this.side !== FrontSide ) data.side = this.side;
			if ( this.vertexColors !== NoColors ) data.vertexColors = this.vertexColors;

			if ( this.opacity < 1 ) data.opacity = this.opacity;
			if ( this.transparent === true ) data.transparent = this.transparent;

			data.depthFunc = this.depthFunc;
			data.depthTest = this.depthTest;
			data.depthWrite = this.depthWrite;

			// rotation (SpriteMaterial)
			if ( this.rotation !== 0 ) data.rotation = this.rotation;

			if ( this.polygonOffset === true ) data.polygonOffset = true;
			if ( this.polygonOffsetFactor !== 0 ) data.polygonOffsetFactor = this.polygonOffsetFactor;
			if ( this.polygonOffsetUnits !== 0 ) data.polygonOffsetUnits = this.polygonOffsetUnits;

			if ( this.linewidth !== 1 ) data.linewidth = this.linewidth;
			if ( this.dashSize !== undefined ) data.dashSize = this.dashSize;
			if ( this.gapSize !== undefined ) data.gapSize = this.gapSize;
			if ( this.scale !== undefined ) data.scale = this.scale;

			if ( this.dithering === true ) data.dithering = true;

			if ( this.alphaTest > 0 ) data.alphaTest = this.alphaTest;
			if ( this.premultipliedAlpha === true ) data.premultipliedAlpha = this.premultipliedAlpha;

			if ( this.wireframe === true ) data.wireframe = this.wireframe;
			if ( this.wireframeLinewidth > 1 ) data.wireframeLinewidth = this.wireframeLinewidth;
			if ( this.wireframeLinecap !== 'round' ) data.wireframeLinecap = this.wireframeLinecap;
			if ( this.wireframeLinejoin !== 'round' ) data.wireframeLinejoin = this.wireframeLinejoin;

			if ( this.morphTargets === true ) data.morphTargets = true;
			if ( this.skinning === true ) data.skinning = true;

			if ( this.visible === false ) data.visible = false;
			if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

			// TODO: Copied from Object3D.toJSON

			function extractFromCache( cache ) {

				var values = [];

				for ( var key in cache ) {

					var data = cache[ key ];
					delete data.metadata;
					values.push( data );

				}

				return values;

			}

			if ( isRoot ) {

				var textures = extractFromCache( meta.textures );
				var images = extractFromCache( meta.images );

				if ( textures.length > 0 ) data.textures = textures;
				if ( images.length > 0 ) data.images = images;

			}

			return data;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( source ) {

			this.name = source.name;

			this.fog = source.fog;
			this.lights = source.lights;

			this.blending = source.blending;
			this.side = source.side;
			this.flatShading = source.flatShading;
			this.vertexColors = source.vertexColors;

			this.opacity = source.opacity;
			this.transparent = source.transparent;

			this.blendSrc = source.blendSrc;
			this.blendDst = source.blendDst;
			this.blendEquation = source.blendEquation;
			this.blendSrcAlpha = source.blendSrcAlpha;
			this.blendDstAlpha = source.blendDstAlpha;
			this.blendEquationAlpha = source.blendEquationAlpha;

			this.depthFunc = source.depthFunc;
			this.depthTest = source.depthTest;
			this.depthWrite = source.depthWrite;

			this.colorWrite = source.colorWrite;

			this.precision = source.precision;

			this.polygonOffset = source.polygonOffset;
			this.polygonOffsetFactor = source.polygonOffsetFactor;
			this.polygonOffsetUnits = source.polygonOffsetUnits;

			this.dithering = source.dithering;

			this.alphaTest = source.alphaTest;
			this.premultipliedAlpha = source.premultipliedAlpha;

			this.visible = source.visible;
			this.userData = JSON.parse( JSON.stringify( source.userData ) );

			this.clipShadows = source.clipShadows;
			this.clipIntersection = source.clipIntersection;

			var srcPlanes = source.clippingPlanes,
				dstPlanes = null;

			if ( srcPlanes !== null ) {

				var n = srcPlanes.length;
				dstPlanes = new Array( n );

				for ( var i = 0; i !== n; ++ i )
					dstPlanes[ i ] = srcPlanes[ i ].clone();

			}

			this.clippingPlanes = dstPlanes;

			this.shadowSide = source.shadowSide;

			return this;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	var default_vertex = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";

	var default_fragment = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";

	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  defines: { "label" : "value" },
	 *  uniforms: { "parameter1": { value: 1.0 }, "parameter2": { value2: 2 } },
	 *
	 *  fragmentShader: <string>,
	 *  vertexShader: <string>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>,
	 *
	 *  lights: <bool>,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *  morphNormals: <bool>
	 * }
	 */

	function ShaderMaterial( parameters ) {

		Material.call( this );

		this.type = 'ShaderMaterial';

		this.defines = {};
		this.uniforms = {};

		this.vertexShader = default_vertex;
		this.fragmentShader = default_fragment;

		this.linewidth = 1;

		this.wireframe = false;
		this.wireframeLinewidth = 1;

		this.fog = false; // set to use scene fog
		this.lights = false; // set to use scene lights
		this.clipping = false; // set to use user-defined clipping planes

		this.skinning = false; // set to use skinning attribute streams
		this.morphTargets = false; // set to use morph targets
		this.morphNormals = false; // set to use morph normals

		this.extensions = {
			derivatives: false, // set to use derivatives
			fragDepth: false, // set to use fragment depth values
			drawBuffers: false, // set to use draw buffers
			shaderTextureLOD: false // set to use shader texture LOD
		};

		// When rendered geometry doesn't include these attributes but the material does,
		// use these default values in WebGL. This avoids errors when buffer data is missing.
		this.defaultAttributeValues = {
			'color': [ 1, 1, 1 ],
			'uv': [ 0, 0 ],
			'uv2': [ 0, 0 ]
		};

		this.index0AttributeName = undefined;
		this.uniformsNeedUpdate = false;

		if ( parameters !== undefined ) {

			if ( parameters.attributes !== undefined ) {

				console.error( 'THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.' );

			}

			this.setValues( parameters );

		}

	}

	ShaderMaterial.prototype = Object.create( Material.prototype );
	ShaderMaterial.prototype.constructor = ShaderMaterial;

	ShaderMaterial.prototype.isShaderMaterial = true;

	ShaderMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.fragmentShader = source.fragmentShader;
		this.vertexShader = source.vertexShader;

		this.uniforms = cloneUniforms( source.uniforms );

		this.defines = Object.assign( {}, source.defines );

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;

		this.lights = source.lights;
		this.clipping = source.clipping;

		this.skinning = source.skinning;

		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		this.extensions = source.extensions;

		return this;

	};

	ShaderMaterial.prototype.toJSON = function ( meta ) {

		var data = Material.prototype.toJSON.call( this, meta );

		data.uniforms = {};

		for ( var name in this.uniforms ) {

			var uniform = this.uniforms[ name ];
			var value = uniform.value;

			if ( value && value.isTexture ) {

				data.uniforms[ name ] = {
					type: 't',
					value: value.toJSON( meta ).uuid
				};

			} else if ( value && value.isColor ) {

				data.uniforms[ name ] = {
					type: 'c',
					value: value.getHex()
				};

			} else if ( value && value.isVector2 ) {

				data.uniforms[ name ] = {
					type: 'v2',
					value: value.toArray()
				};

			} else if ( value && value.isVector3 ) {

				data.uniforms[ name ] = {
					type: 'v3',
					value: value.toArray()
				};

			} else if ( value && value.isVector4 ) {

				data.uniforms[ name ] = {
					type: 'v4',
					value: value.toArray()
				};

			} else if ( value && value.isMatrix3 ) {

				data.uniforms[ name ] = {
					type: 'm3',
					value: value.toArray()
				};

			} else if ( value && value.isMatrix4 ) {

				data.uniforms[ name ] = {
					type: 'm4',
					value: value.toArray()
				};

			} else {

				data.uniforms[ name ] = {
					value: value
				};

				// note: the array variants v2v, v3v, v4v, m4v and tv are not supported so far

			}

		}

		if ( Object.keys( this.defines ).length > 0 ) data.defines = this.defines;

		data.vertexShader = this.vertexShader;
		data.fragmentShader = this.fragmentShader;

		var extensions = {};

		for ( var key in this.extensions ) {

			if ( this.extensions[ key ] === true ) extensions[ key ] = true;

		}

		if ( Object.keys( extensions ).length > 0 ) data.extensions = extensions;

		return data;

	};

	/**
	 * @author bhouston / http://clara.io
	 */

	function Ray( origin, direction ) {

		this.origin = ( origin !== undefined ) ? origin : new Vector3();
		this.direction = ( direction !== undefined ) ? direction : new Vector3();

	}

	Object.assign( Ray.prototype, {

		set: function ( origin, direction ) {

			this.origin.copy( origin );
			this.direction.copy( direction );

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( ray ) {

			this.origin.copy( ray.origin );
			this.direction.copy( ray.direction );

			return this;

		},

		at: function ( t, target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Ray: .at() target is now required' );
				target = new Vector3();

			}

			return target.copy( this.direction ).multiplyScalar( t ).add( this.origin );

		},

		lookAt: function ( v ) {

			this.direction.copy( v ).sub( this.origin ).normalize();

			return this;

		},

		recast: function () {

			var v1 = new Vector3();

			return function recast( t ) {

				this.origin.copy( this.at( t, v1 ) );

				return this;

			};

		}(),

		closestPointToPoint: function ( point, target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Ray: .closestPointToPoint() target is now required' );
				target = new Vector3();

			}

			target.subVectors( point, this.origin );

			var directionDistance = target.dot( this.direction );

			if ( directionDistance < 0 ) {

				return target.copy( this.origin );

			}

			return target.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

		},

		distanceToPoint: function ( point ) {

			return Math.sqrt( this.distanceSqToPoint( point ) );

		},

		distanceSqToPoint: function () {

			var v1 = new Vector3();

			return function distanceSqToPoint( point ) {

				var directionDistance = v1.subVectors( point, this.origin ).dot( this.direction );

				// point behind the ray

				if ( directionDistance < 0 ) {

					return this.origin.distanceToSquared( point );

				}

				v1.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

				return v1.distanceToSquared( point );

			};

		}(),

		distanceSqToSegment: function () {

			var segCenter = new Vector3();
			var segDir = new Vector3();
			var diff = new Vector3();

			return function distanceSqToSegment( v0, v1, optionalPointOnRay, optionalPointOnSegment ) {

				// from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
				// It returns the min distance between the ray and the segment
				// defined by v0 and v1
				// It can also set two optional targets :
				// - The closest point on the ray
				// - The closest point on the segment

				segCenter.copy( v0 ).add( v1 ).multiplyScalar( 0.5 );
				segDir.copy( v1 ).sub( v0 ).normalize();
				diff.copy( this.origin ).sub( segCenter );

				var segExtent = v0.distanceTo( v1 ) * 0.5;
				var a01 = - this.direction.dot( segDir );
				var b0 = diff.dot( this.direction );
				var b1 = - diff.dot( segDir );
				var c = diff.lengthSq();
				var det = Math.abs( 1 - a01 * a01 );
				var s0, s1, sqrDist, extDet;

				if ( det > 0 ) {

					// The ray and segment are not parallel.

					s0 = a01 * b1 - b0;
					s1 = a01 * b0 - b1;
					extDet = segExtent * det;

					if ( s0 >= 0 ) {

						if ( s1 >= - extDet ) {

							if ( s1 <= extDet ) {

								// region 0
								// Minimum at interior points of ray and segment.

								var invDet = 1 / det;
								s0 *= invDet;
								s1 *= invDet;
								sqrDist = s0 * ( s0 + a01 * s1 + 2 * b0 ) + s1 * ( a01 * s0 + s1 + 2 * b1 ) + c;

							} else {

								// region 1

								s1 = segExtent;
								s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
								sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

							}

						} else {

							// region 5

							s1 = - segExtent;
							s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
							sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

						}

					} else {

						if ( s1 <= - extDet ) {

							// region 4

							s0 = Math.max( 0, - ( - a01 * segExtent + b0 ) );
							s1 = ( s0 > 0 ) ? - segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
							sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

						} else if ( s1 <= extDet ) {

							// region 3

							s0 = 0;
							s1 = Math.min( Math.max( - segExtent, - b1 ), segExtent );
							sqrDist = s1 * ( s1 + 2 * b1 ) + c;

						} else {

							// region 2

							s0 = Math.max( 0, - ( a01 * segExtent + b0 ) );
							s1 = ( s0 > 0 ) ? segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
							sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

						}

					}

				} else {

					// Ray and segment are parallel.

					s1 = ( a01 > 0 ) ? - segExtent : segExtent;
					s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				}

				if ( optionalPointOnRay ) {

					optionalPointOnRay.copy( this.direction ).multiplyScalar( s0 ).add( this.origin );

				}

				if ( optionalPointOnSegment ) {

					optionalPointOnSegment.copy( segDir ).multiplyScalar( s1 ).add( segCenter );

				}

				return sqrDist;

			};

		}(),

		intersectSphere: function () {

			var v1 = new Vector3();

			return function intersectSphere( sphere, target ) {

				v1.subVectors( sphere.center, this.origin );
				var tca = v1.dot( this.direction );
				var d2 = v1.dot( v1 ) - tca * tca;
				var radius2 = sphere.radius * sphere.radius;

				if ( d2 > radius2 ) return null;

				var thc = Math.sqrt( radius2 - d2 );

				// t0 = first intersect point - entrance on front of sphere
				var t0 = tca - thc;

				// t1 = second intersect point - exit point on back of sphere
				var t1 = tca + thc;

				// test to see if both t0 and t1 are behind the ray - if so, return null
				if ( t0 < 0 && t1 < 0 ) return null;

				// test to see if t0 is behind the ray:
				// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
				// in order to always return an intersect point that is in front of the ray.
				if ( t0 < 0 ) return this.at( t1, target );

				// else t0 is in front of the ray, so return the first collision point scaled by t0
				return this.at( t0, target );

			};

		}(),

		intersectsSphere: function ( sphere ) {

			return this.distanceSqToPoint( sphere.center ) <= ( sphere.radius * sphere.radius );

		},

		distanceToPlane: function ( plane ) {

			var denominator = plane.normal.dot( this.direction );

			if ( denominator === 0 ) {

				// line is coplanar, return origin
				if ( plane.distanceToPoint( this.origin ) === 0 ) {

					return 0;

				}

				// Null is preferable to undefined since undefined means.... it is undefined

				return null;

			}

			var t = - ( this.origin.dot( plane.normal ) + plane.constant ) / denominator;

			// Return if the ray never intersects the plane

			return t >= 0 ? t : null;

		},

		intersectPlane: function ( plane, target ) {

			var t = this.distanceToPlane( plane );

			if ( t === null ) {

				return null;

			}

			return this.at( t, target );

		},

		intersectsPlane: function ( plane ) {

			// check if the ray lies on the plane first

			var distToPoint = plane.distanceToPoint( this.origin );

			if ( distToPoint === 0 ) {

				return true;

			}

			var denominator = plane.normal.dot( this.direction );

			if ( denominator * distToPoint < 0 ) {

				return true;

			}

			// ray origin is behind the plane (and is pointing behind it)

			return false;

		},

		intersectBox: function ( box, target ) {

			var tmin, tmax, tymin, tymax, tzmin, tzmax;

			var invdirx = 1 / this.direction.x,
				invdiry = 1 / this.direction.y,
				invdirz = 1 / this.direction.z;

			var origin = this.origin;

			if ( invdirx >= 0 ) {

				tmin = ( box.min.x - origin.x ) * invdirx;
				tmax = ( box.max.x - origin.x ) * invdirx;

			} else {

				tmin = ( box.max.x - origin.x ) * invdirx;
				tmax = ( box.min.x - origin.x ) * invdirx;

			}

			if ( invdiry >= 0 ) {

				tymin = ( box.min.y - origin.y ) * invdiry;
				tymax = ( box.max.y - origin.y ) * invdiry;

			} else {

				tymin = ( box.max.y - origin.y ) * invdiry;
				tymax = ( box.min.y - origin.y ) * invdiry;

			}

			if ( ( tmin > tymax ) || ( tymin > tmax ) ) return null;

			// These lines also handle the case where tmin or tmax is NaN
			// (result of 0 * Infinity). x !== x returns true if x is NaN

			if ( tymin > tmin || tmin !== tmin ) tmin = tymin;

			if ( tymax < tmax || tmax !== tmax ) tmax = tymax;

			if ( invdirz >= 0 ) {

				tzmin = ( box.min.z - origin.z ) * invdirz;
				tzmax = ( box.max.z - origin.z ) * invdirz;

			} else {

				tzmin = ( box.max.z - origin.z ) * invdirz;
				tzmax = ( box.min.z - origin.z ) * invdirz;

			}

			if ( ( tmin > tzmax ) || ( tzmin > tmax ) ) return null;

			if ( tzmin > tmin || tmin !== tmin ) tmin = tzmin;

			if ( tzmax < tmax || tmax !== tmax ) tmax = tzmax;

			//return point closest to the ray (positive side)

			if ( tmax < 0 ) return null;

			return this.at( tmin >= 0 ? tmin : tmax, target );

		},

		intersectsBox: ( function () {

			var v = new Vector3();

			return function intersectsBox( box ) {

				return this.intersectBox( box, v ) !== null;

			};

		} )(),

		intersectTriangle: function () {

			// Compute the offset origin, edges, and normal.
			var diff = new Vector3();
			var edge1 = new Vector3();
			var edge2 = new Vector3();
			var normal = new Vector3();

			return function intersectTriangle( a, b, c, backfaceCulling, target ) {

				// from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

				edge1.subVectors( b, a );
				edge2.subVectors( c, a );
				normal.crossVectors( edge1, edge2 );

				// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
				// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
				//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
				//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
				//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
				var DdN = this.direction.dot( normal );
				var sign;

				if ( DdN > 0 ) {

					if ( backfaceCulling ) return null;
					sign = 1;

				} else if ( DdN < 0 ) {

					sign = - 1;
					DdN = - DdN;

				} else {

					return null;

				}

				diff.subVectors( this.origin, a );
				var DdQxE2 = sign * this.direction.dot( edge2.crossVectors( diff, edge2 ) );

				// b1 < 0, no intersection
				if ( DdQxE2 < 0 ) {

					return null;

				}

				var DdE1xQ = sign * this.direction.dot( edge1.cross( diff ) );

				// b2 < 0, no intersection
				if ( DdE1xQ < 0 ) {

					return null;

				}

				// b1+b2 > 1, no intersection
				if ( DdQxE2 + DdE1xQ > DdN ) {

					return null;

				}

				// Line intersects triangle, check if ray does.
				var QdN = - sign * diff.dot( normal );

				// t < 0, no intersection
				if ( QdN < 0 ) {

					return null;

				}

				// Ray intersects triangle.
				return this.at( QdN / DdN, target );

			};

		}(),

		applyMatrix4: function ( matrix4 ) {

			this.origin.applyMatrix4( matrix4 );
			this.direction.transformDirection( matrix4 );

			return this;

		},

		equals: function ( ray ) {

			return ray.origin.equals( this.origin ) && ray.direction.equals( this.direction );

		}

	} );

	/**
	 * @author bhouston / http://clara.io
	 * @author mrdoob / http://mrdoob.com/
	 */

	function Triangle( a, b, c ) {

		this.a = ( a !== undefined ) ? a : new Vector3();
		this.b = ( b !== undefined ) ? b : new Vector3();
		this.c = ( c !== undefined ) ? c : new Vector3();

	}

	Object.assign( Triangle, {

		getNormal: function () {

			var v0 = new Vector3();

			return function getNormal( a, b, c, target ) {

				if ( target === undefined ) {

					console.warn( 'THREE.Triangle: .getNormal() target is now required' );
					target = new Vector3();

				}

				target.subVectors( c, b );
				v0.subVectors( a, b );
				target.cross( v0 );

				var targetLengthSq = target.lengthSq();
				if ( targetLengthSq > 0 ) {

					return target.multiplyScalar( 1 / Math.sqrt( targetLengthSq ) );

				}

				return target.set( 0, 0, 0 );

			};

		}(),

		// static/instance method to calculate barycentric coordinates
		// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
		getBarycoord: function () {

			var v0 = new Vector3();
			var v1 = new Vector3();
			var v2 = new Vector3();

			return function getBarycoord( point, a, b, c, target ) {

				v0.subVectors( c, a );
				v1.subVectors( b, a );
				v2.subVectors( point, a );

				var dot00 = v0.dot( v0 );
				var dot01 = v0.dot( v1 );
				var dot02 = v0.dot( v2 );
				var dot11 = v1.dot( v1 );
				var dot12 = v1.dot( v2 );

				var denom = ( dot00 * dot11 - dot01 * dot01 );

				if ( target === undefined ) {

					console.warn( 'THREE.Triangle: .getBarycoord() target is now required' );
					target = new Vector3();

				}

				// collinear or singular triangle
				if ( denom === 0 ) {

					// arbitrary location outside of triangle?
					// not sure if this is the best idea, maybe should be returning undefined
					return target.set( - 2, - 1, - 1 );

				}

				var invDenom = 1 / denom;
				var u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
				var v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

				// barycentric coordinates must always sum to 1
				return target.set( 1 - u - v, v, u );

			};

		}(),

		containsPoint: function () {

			var v1 = new Vector3();

			return function containsPoint( point, a, b, c ) {

				Triangle.getBarycoord( point, a, b, c, v1 );

				return ( v1.x >= 0 ) && ( v1.y >= 0 ) && ( ( v1.x + v1.y ) <= 1 );

			};

		}(),

		getUV: function () {

			var barycoord = new Vector3();

			return function getUV( point, p1, p2, p3, uv1, uv2, uv3, target ) {

				this.getBarycoord( point, p1, p2, p3, barycoord );

				target.set( 0, 0 );
				target.addScaledVector( uv1, barycoord.x );
				target.addScaledVector( uv2, barycoord.y );
				target.addScaledVector( uv3, barycoord.z );

				return target;

			};

		}()

	} );

	Object.assign( Triangle.prototype, {

		set: function ( a, b, c ) {

			this.a.copy( a );
			this.b.copy( b );
			this.c.copy( c );

			return this;

		},

		setFromPointsAndIndices: function ( points, i0, i1, i2 ) {

			this.a.copy( points[ i0 ] );
			this.b.copy( points[ i1 ] );
			this.c.copy( points[ i2 ] );

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		copy: function ( triangle ) {

			this.a.copy( triangle.a );
			this.b.copy( triangle.b );
			this.c.copy( triangle.c );

			return this;

		},

		getArea: function () {

			var v0 = new Vector3();
			var v1 = new Vector3();

			return function getArea() {

				v0.subVectors( this.c, this.b );
				v1.subVectors( this.a, this.b );

				return v0.cross( v1 ).length() * 0.5;

			};

		}(),

		getMidpoint: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Triangle: .getMidpoint() target is now required' );
				target = new Vector3();

			}

			return target.addVectors( this.a, this.b ).add( this.c ).multiplyScalar( 1 / 3 );

		},

		getNormal: function ( target ) {

			return Triangle.getNormal( this.a, this.b, this.c, target );

		},

		getPlane: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Triangle: .getPlane() target is now required' );
				target = new Vector3();

			}

			return target.setFromCoplanarPoints( this.a, this.b, this.c );

		},

		getBarycoord: function ( point, target ) {

			return Triangle.getBarycoord( point, this.a, this.b, this.c, target );

		},

		containsPoint: function ( point ) {

			return Triangle.containsPoint( point, this.a, this.b, this.c );

		},

		getUV: function ( point, uv1, uv2, uv3, result ) {

			return Triangle.getUV( point, this.a, this.b, this.c, uv1, uv2, uv3, result );

		},

		intersectsBox: function ( box ) {

			return box.intersectsTriangle( this );

		},

		closestPointToPoint: function () {

			var vab = new Vector3();
			var vac = new Vector3();
			var vbc = new Vector3();
			var vap = new Vector3();
			var vbp = new Vector3();
			var vcp = new Vector3();

			return function closestPointToPoint( p, target ) {

				if ( target === undefined ) {

					console.warn( 'THREE.Triangle: .closestPointToPoint() target is now required' );
					target = new Vector3();

				}

				var a = this.a, b = this.b, c = this.c;
				var v, w;

				// algorithm thanks to Real-Time Collision Detection by Christer Ericson,
				// published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
				// under the accompanying license; see chapter 5.1.5 for detailed explanation.
				// basically, we're distinguishing which of the voronoi regions of the triangle
				// the point lies in with the minimum amount of redundant computation.

				vab.subVectors( b, a );
				vac.subVectors( c, a );
				vap.subVectors( p, a );
				var d1 = vab.dot( vap );
				var d2 = vac.dot( vap );
				if ( d1 <= 0 && d2 <= 0 ) {

					// vertex region of A; barycentric coords (1, 0, 0)
					return target.copy( a );

				}

				vbp.subVectors( p, b );
				var d3 = vab.dot( vbp );
				var d4 = vac.dot( vbp );
				if ( d3 >= 0 && d4 <= d3 ) {

					// vertex region of B; barycentric coords (0, 1, 0)
					return target.copy( b );

				}

				var vc = d1 * d4 - d3 * d2;
				if ( vc <= 0 && d1 >= 0 && d3 <= 0 ) {

					v = d1 / ( d1 - d3 );
					// edge region of AB; barycentric coords (1-v, v, 0)
					return target.copy( a ).addScaledVector( vab, v );

				}

				vcp.subVectors( p, c );
				var d5 = vab.dot( vcp );
				var d6 = vac.dot( vcp );
				if ( d6 >= 0 && d5 <= d6 ) {

					// vertex region of C; barycentric coords (0, 0, 1)
					return target.copy( c );

				}

				var vb = d5 * d2 - d1 * d6;
				if ( vb <= 0 && d2 >= 0 && d6 <= 0 ) {

					w = d2 / ( d2 - d6 );
					// edge region of AC; barycentric coords (1-w, 0, w)
					return target.copy( a ).addScaledVector( vac, w );

				}

				var va = d3 * d6 - d5 * d4;
				if ( va <= 0 && ( d4 - d3 ) >= 0 && ( d5 - d6 ) >= 0 ) {

					vbc.subVectors( c, b );
					w = ( d4 - d3 ) / ( ( d4 - d3 ) + ( d5 - d6 ) );
					// edge region of BC; barycentric coords (0, 1-w, w)
					return target.copy( b ).addScaledVector( vbc, w ); // edge region of BC

				}

				// face region
				var denom = 1 / ( va + vb + vc );
				// u = va * denom
				v = vb * denom;
				w = vc * denom;
				return target.copy( a ).addScaledVector( vab, v ).addScaledVector( vac, w );

			};

		}(),

		equals: function ( triangle ) {

			return triangle.a.equals( this.a ) && triangle.b.equals( this.b ) && triangle.c.equals( this.c );

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  lightMap: new THREE.Texture( <Image> ),
	 *  lightMapIntensity: <float>
	 *
	 *  aoMap: new THREE.Texture( <Image> ),
	 *  aoMapIntensity: <float>
	 *
	 *  specularMap: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
	 *  combine: THREE.Multiply,
	 *  reflectivity: <float>,
	 *  refractionRatio: <float>,
	 *
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>
	 * }
	 */

	function MeshBasicMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshBasicMaterial';

		this.color = new Color( 0xffffff ); // emissive

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.specularMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.combine = MultiplyOperation;
		this.reflectivity = 1;
		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.skinning = false;
		this.morphTargets = false;

		this.lights = false;

		this.setValues( parameters );

	}

	MeshBasicMaterial.prototype = Object.create( Material.prototype );
	MeshBasicMaterial.prototype.constructor = MeshBasicMaterial;

	MeshBasicMaterial.prototype.isMeshBasicMaterial = true;

	MeshBasicMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.specularMap = source.specularMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.combine = source.combine;
		this.reflectivity = source.reflectivity;
		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		return this;

	};

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author mikael emtinger / http://gomo.se/
	 * @author jonobr1 / http://jonobr1.com/
	 */

	function Mesh( geometry, material ) {

		Object3D.call( this );

		this.type = 'Mesh';

		this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
		this.material = material !== undefined ? material : new MeshBasicMaterial( { color: Math.random() * 0xffffff } );

		this.drawMode = TrianglesDrawMode;

		this.updateMorphTargets();

	}

	Mesh.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Mesh,

		isMesh: true,

		setDrawMode: function ( value ) {

			this.drawMode = value;

		},

		copy: function ( source ) {

			Object3D.prototype.copy.call( this, source );

			this.drawMode = source.drawMode;

			if ( source.morphTargetInfluences !== undefined ) {

				this.morphTargetInfluences = source.morphTargetInfluences.slice();

			}

			if ( source.morphTargetDictionary !== undefined ) {

				this.morphTargetDictionary = Object.assign( {}, source.morphTargetDictionary );

			}

			return this;

		},

		updateMorphTargets: function () {

			var geometry = this.geometry;
			var m, ml, name;

			if ( geometry.isBufferGeometry ) {

				var morphAttributes = geometry.morphAttributes;
				var keys = Object.keys( morphAttributes );

				if ( keys.length > 0 ) {

					var morphAttribute = morphAttributes[ keys[ 0 ] ];

					if ( morphAttribute !== undefined ) {

						this.morphTargetInfluences = [];
						this.morphTargetDictionary = {};

						for ( m = 0, ml = morphAttribute.length; m < ml; m ++ ) {

							name = morphAttribute[ m ].name || String( m );

							this.morphTargetInfluences.push( 0 );
							this.morphTargetDictionary[ name ] = m;

						}

					}

				}

			} else {

				var morphTargets = geometry.morphTargets;

				if ( morphTargets !== undefined && morphTargets.length > 0 ) {

					console.error( 'THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.' );

				}

			}

		},

		raycast: ( function () {

			var inverseMatrix = new Matrix4();
			var ray = new Ray();
			var sphere = new Sphere();

			var vA = new Vector3();
			var vB = new Vector3();
			var vC = new Vector3();

			var tempA = new Vector3();
			var tempB = new Vector3();
			var tempC = new Vector3();

			var morphA = new Vector3();
			var morphB = new Vector3();
			var morphC = new Vector3();

			var uvA = new Vector2();
			var uvB = new Vector2();
			var uvC = new Vector2();

			var intersectionPoint = new Vector3();
			var intersectionPointWorld = new Vector3();

			function checkIntersection( object, material, raycaster, ray, pA, pB, pC, point ) {

				var intersect;

				if ( material.side === BackSide ) {

					intersect = ray.intersectTriangle( pC, pB, pA, true, point );

				} else {

					intersect = ray.intersectTriangle( pA, pB, pC, material.side !== DoubleSide, point );

				}

				if ( intersect === null ) return null;

				intersectionPointWorld.copy( point );
				intersectionPointWorld.applyMatrix4( object.matrixWorld );

				var distance = raycaster.ray.origin.distanceTo( intersectionPointWorld );

				if ( distance < raycaster.near || distance > raycaster.far ) return null;

				return {
					distance: distance,
					point: intersectionPointWorld.clone(),
					object: object
				};

			}

			function checkBufferGeometryIntersection( object, material, raycaster, ray, position, morphPosition, uv, a, b, c ) {

				vA.fromBufferAttribute( position, a );
				vB.fromBufferAttribute( position, b );
				vC.fromBufferAttribute( position, c );

				var morphInfluences = object.morphTargetInfluences;

				if ( material.morphTargets && morphPosition && morphInfluences ) {

					morphA.set( 0, 0, 0 );
					morphB.set( 0, 0, 0 );
					morphC.set( 0, 0, 0 );

					for ( var i = 0, il = morphPosition.length; i < il; i ++ ) {

						var influence = morphInfluences[ i ];
						var morphAttribute = morphPosition[ i ];

						if ( influence === 0 ) continue;

						tempA.fromBufferAttribute( morphAttribute, a );
						tempB.fromBufferAttribute( morphAttribute, b );
						tempC.fromBufferAttribute( morphAttribute, c );

						morphA.addScaledVector( tempA.sub( vA ), influence );
						morphB.addScaledVector( tempB.sub( vB ), influence );
						morphC.addScaledVector( tempC.sub( vC ), influence );

					}

					vA.add( morphA );
					vB.add( morphB );
					vC.add( morphC );

				}

				var intersection = checkIntersection( object, material, raycaster, ray, vA, vB, vC, intersectionPoint );

				if ( intersection ) {

					if ( uv ) {

						uvA.fromBufferAttribute( uv, a );
						uvB.fromBufferAttribute( uv, b );
						uvC.fromBufferAttribute( uv, c );

						intersection.uv = Triangle.getUV( intersectionPoint, vA, vB, vC, uvA, uvB, uvC, new Vector2() );

					}

					var face = new Face3( a, b, c );
					Triangle.getNormal( vA, vB, vC, face.normal );

					intersection.face = face;

				}

				return intersection;

			}

			return function raycast( raycaster, intersects ) {

				var geometry = this.geometry;
				var material = this.material;
				var matrixWorld = this.matrixWorld;

				if ( material === undefined ) return;

				// Checking boundingSphere distance to ray

				if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

				sphere.copy( geometry.boundingSphere );
				sphere.applyMatrix4( matrixWorld );

				if ( raycaster.ray.intersectsSphere( sphere ) === false ) return;

				//

				inverseMatrix.getInverse( matrixWorld );
				ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );

				// Check boundingBox before continuing

				if ( geometry.boundingBox !== null ) {

					if ( ray.intersectsBox( geometry.boundingBox ) === false ) return;

				}

				var intersection;

				if ( geometry.isBufferGeometry ) {

					var a, b, c;
					var index = geometry.index;
					var position = geometry.attributes.position;
					var morphPosition = geometry.morphAttributes.position;
					var uv = geometry.attributes.uv;
					var groups = geometry.groups;
					var drawRange = geometry.drawRange;
					var i, j, il, jl;
					var group, groupMaterial;
					var start, end;

					if ( index !== null ) {

						// indexed buffer geometry

						if ( Array.isArray( material ) ) {

							for ( i = 0, il = groups.length; i < il; i ++ ) {

								group = groups[ i ];
								groupMaterial = material[ group.materialIndex ];

								start = Math.max( group.start, drawRange.start );
								end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

								for ( j = start, jl = end; j < jl; j += 3 ) {

									a = index.getX( j );
									b = index.getX( j + 1 );
									c = index.getX( j + 2 );

									intersection = checkBufferGeometryIntersection( this, groupMaterial, raycaster, ray, position, morphPosition, uv, a, b, c );

									if ( intersection ) {

										intersection.faceIndex = Math.floor( j / 3 ); // triangle number in indexed buffer semantics
										intersection.face.materialIndex = group.materialIndex;
										intersects.push( intersection );

									}

								}

							}

						} else {

							start = Math.max( 0, drawRange.start );
							end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

							for ( i = start, il = end; i < il; i += 3 ) {

								a = index.getX( i );
								b = index.getX( i + 1 );
								c = index.getX( i + 2 );

								intersection = checkBufferGeometryIntersection( this, material, raycaster, ray, position, morphPosition, uv, a, b, c );

								if ( intersection ) {

									intersection.faceIndex = Math.floor( i / 3 ); // triangle number in indexed buffer semantics
									intersects.push( intersection );

								}

							}

						}

					} else if ( position !== undefined ) {

						// non-indexed buffer geometry

						if ( Array.isArray( material ) ) {

							for ( i = 0, il = groups.length; i < il; i ++ ) {

								group = groups[ i ];
								groupMaterial = material[ group.materialIndex ];

								start = Math.max( group.start, drawRange.start );
								end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

								for ( j = start, jl = end; j < jl; j += 3 ) {

									a = j;
									b = j + 1;
									c = j + 2;

									intersection = checkBufferGeometryIntersection( this, groupMaterial, raycaster, ray, position, morphPosition, uv, a, b, c );

									if ( intersection ) {

										intersection.faceIndex = Math.floor( j / 3 ); // triangle number in non-indexed buffer semantics
										intersection.face.materialIndex = group.materialIndex;
										intersects.push( intersection );

									}

								}

							}

						} else {

							start = Math.max( 0, drawRange.start );
							end = Math.min( position.count, ( drawRange.start + drawRange.count ) );

							for ( i = start, il = end; i < il; i += 3 ) {

								a = i;
								b = i + 1;
								c = i + 2;

								intersection = checkBufferGeometryIntersection( this, material, raycaster, ray, position, morphPosition, uv, a, b, c );

								if ( intersection ) {

									intersection.faceIndex = Math.floor( i / 3 ); // triangle number in non-indexed buffer semantics
									intersects.push( intersection );

								}

							}

						}

					}

				} else if ( geometry.isGeometry ) {

					var fvA, fvB, fvC;
					var isMultiMaterial = Array.isArray( material );

					var vertices = geometry.vertices;
					var faces = geometry.faces;
					var uvs;

					var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
					if ( faceVertexUvs.length > 0 ) uvs = faceVertexUvs;

					for ( var f = 0, fl = faces.length; f < fl; f ++ ) {

						var face = faces[ f ];
						var faceMaterial = isMultiMaterial ? material[ face.materialIndex ] : material;

						if ( faceMaterial === undefined ) continue;

						fvA = vertices[ face.a ];
						fvB = vertices[ face.b ];
						fvC = vertices[ face.c ];

						intersection = checkIntersection( this, faceMaterial, raycaster, ray, fvA, fvB, fvC, intersectionPoint );

						if ( intersection ) {

							if ( uvs && uvs[ f ] ) {

								var uvs_f = uvs[ f ];
								uvA.copy( uvs_f[ 0 ] );
								uvB.copy( uvs_f[ 1 ] );
								uvC.copy( uvs_f[ 2 ] );

								intersection.uv = Triangle.getUV( intersectionPoint, fvA, fvB, fvC, uvA, uvB, uvC, new Vector2() );

							}

							intersection.face = face;
							intersection.faceIndex = f;
							intersects.push( intersection );

						}

					}

				}

			};

		}() ),

		clone: function () {

			return new this.constructor( this.geometry, this.material ).copy( this );

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLBackground( renderer, state, objects, premultipliedAlpha ) {

		var clearColor = new Color( 0x000000 );
		var clearAlpha = 0;

		var planeMesh;
		var boxMesh;
		// Store the current background texture and its `version`
		// so we can recompile the material accordingly.
		var currentBackground = null;
		var currentBackgroundVersion = 0;

		function render( renderList, scene, camera, forceClear ) {

			var background = scene.background;

			// Ignore background in AR
			// TODO: Reconsider this.

			var vr = renderer.vr;
			var session = vr.getSession && vr.getSession();

			if ( session && session.environmentBlendMode === 'additive' ) {

				background = null;

			}

			if ( background === null ) {

				setClear( clearColor, clearAlpha );
				currentBackground = null;
				currentBackgroundVersion = 0;

			} else if ( background && background.isColor ) {

				setClear( background, 1 );
				forceClear = true;
				currentBackground = null;
				currentBackgroundVersion = 0;

			}

			if ( renderer.autoClear || forceClear ) {

				renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );

			}

			if ( background && ( background.isCubeTexture || background.isWebGLRenderTargetCube ) ) {

				if ( boxMesh === undefined ) {

					boxMesh = new Mesh(
						new BoxBufferGeometry( 1, 1, 1 ),
						new ShaderMaterial( {
							type: 'BackgroundCubeMaterial',
							uniforms: cloneUniforms( ShaderLib.cube.uniforms ),
							vertexShader: ShaderLib.cube.vertexShader,
							fragmentShader: ShaderLib.cube.fragmentShader,
							side: BackSide,
							depthTest: false,
							depthWrite: false,
							fog: false
						} )
					);

					boxMesh.geometry.removeAttribute( 'normal' );
					boxMesh.geometry.removeAttribute( 'uv' );

					boxMesh.onBeforeRender = function ( renderer, scene, camera ) {

						this.matrixWorld.copyPosition( camera.matrixWorld );

					};

					// enable code injection for non-built-in material
					Object.defineProperty( boxMesh.material, 'map', {

						get: function () {

							return this.uniforms.tCube.value;

						}

					} );

					objects.update( boxMesh );

				}

				var texture = background.isWebGLRenderTargetCube ? background.texture : background;
				boxMesh.material.uniforms.tCube.value = texture;
				boxMesh.material.uniforms.tFlip.value = ( background.isWebGLRenderTargetCube ) ? 1 : - 1;

				if ( currentBackground !== background ||
				     currentBackgroundVersion !== texture.version ) {

					boxMesh.material.needsUpdate = true;

					currentBackground = background;
					currentBackgroundVersion = texture.version;

				}

				// push to the pre-sorted opaque render list
				renderList.unshift( boxMesh, boxMesh.geometry, boxMesh.material, 0, 0, null );

			} else if ( background && background.isTexture ) {

				if ( planeMesh === undefined ) {

					planeMesh = new Mesh(
						new PlaneBufferGeometry( 2, 2 ),
						new ShaderMaterial( {
							type: 'BackgroundMaterial',
							uniforms: cloneUniforms( ShaderLib.background.uniforms ),
							vertexShader: ShaderLib.background.vertexShader,
							fragmentShader: ShaderLib.background.fragmentShader,
							side: FrontSide,
							depthTest: false,
							depthWrite: false,
							fog: false
						} )
					);

					planeMesh.geometry.removeAttribute( 'normal' );

					// enable code injection for non-built-in material
					Object.defineProperty( planeMesh.material, 'map', {

						get: function () {

							return this.uniforms.t2D.value;

						}

					} );

					objects.update( planeMesh );

				}

				planeMesh.material.uniforms.t2D.value = background;

				if ( background.matrixAutoUpdate === true ) {

					background.updateMatrix();

				}

				planeMesh.material.uniforms.uvTransform.value.copy( background.matrix );

				if ( currentBackground !== background ||
					   currentBackgroundVersion !== background.version ) {

					planeMesh.material.needsUpdate = true;

					currentBackground = background;
					currentBackgroundVersion = background.version;

				}


				// push to the pre-sorted opaque render list
				renderList.unshift( planeMesh, planeMesh.geometry, planeMesh.material, 0, 0, null );

			}

		}

		function setClear( color, alpha ) {

			state.buffers.color.setClear( color.r, color.g, color.b, alpha, premultipliedAlpha );

		}

		return {

			getClearColor: function () {

				return clearColor;

			},
			setClearColor: function ( color, alpha ) {

				clearColor.set( color );
				clearAlpha = alpha !== undefined ? alpha : 1;
				setClear( clearColor, clearAlpha );

			},
			getClearAlpha: function () {

				return clearAlpha;

			},
			setClearAlpha: function ( alpha ) {

				clearAlpha = alpha;
				setClear( clearColor, clearAlpha );

			},
			render: render

		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLBufferRenderer( gl, extensions, info, capabilities ) {

		var mode;

		function setMode( value ) {

			mode = value;

		}

		function render( start, count ) {

			gl.drawArrays( mode, start, count );

			info.update( count, mode );

		}

		function renderInstances( geometry, start, count ) {

			var extension;

			if ( capabilities.isWebGL2 ) {

				extension = gl;

			} else {

				extension = extensions.get( 'ANGLE_instanced_arrays' );

				if ( extension === null ) {

					console.error( 'THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
					return;

				}

			}

			extension[ capabilities.isWebGL2 ? 'drawArraysInstanced' : 'drawArraysInstancedANGLE' ]( mode, start, count, geometry.maxInstancedCount );

			info.update( count, mode, geometry.maxInstancedCount );

		}

		//

		this.setMode = setMode;
		this.render = render;
		this.renderInstances = renderInstances;

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLCapabilities( gl, extensions, parameters ) {

		var maxAnisotropy;

		function getMaxAnisotropy() {

			if ( maxAnisotropy !== undefined ) return maxAnisotropy;

			var extension = extensions.get( 'EXT_texture_filter_anisotropic' );

			if ( extension !== null ) {

				maxAnisotropy = gl.getParameter( extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT );

			} else {

				maxAnisotropy = 0;

			}

			return maxAnisotropy;

		}

		function getMaxPrecision( precision ) {

			if ( precision === 'highp' ) {

				if ( gl.getShaderPrecisionFormat( 35633, 36338 ).precision > 0 &&
				     gl.getShaderPrecisionFormat( 35632, 36338 ).precision > 0 ) {

					return 'highp';

				}

				precision = 'mediump';

			}

			if ( precision === 'mediump' ) {

				if ( gl.getShaderPrecisionFormat( 35633, 36337 ).precision > 0 &&
				     gl.getShaderPrecisionFormat( 35632, 36337 ).precision > 0 ) {

					return 'mediump';

				}

			}

			return 'lowp';

		}

		var isWebGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;

		var precision = parameters.precision !== undefined ? parameters.precision : 'highp';
		var maxPrecision = getMaxPrecision( precision );

		if ( maxPrecision !== precision ) {

			console.warn( 'THREE.WebGLRenderer:', precision, 'not supported, using', maxPrecision, 'instead.' );
			precision = maxPrecision;

		}

		var logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;

		var maxTextures = gl.getParameter( 34930 );
		var maxVertexTextures = gl.getParameter( 35660 );
		var maxTextureSize = gl.getParameter( 3379 );
		var maxCubemapSize = gl.getParameter( 34076 );

		var maxAttributes = gl.getParameter( 34921 );
		var maxVertexUniforms = gl.getParameter( 36347 );
		var maxVaryings = gl.getParameter( 36348 );
		var maxFragmentUniforms = gl.getParameter( 36349 );

		var vertexTextures = maxVertexTextures > 0;
		var floatFragmentTextures = isWebGL2 || !! extensions.get( 'OES_texture_float' );
		var floatVertexTextures = vertexTextures && floatFragmentTextures;

		var maxSamples = isWebGL2 ? gl.getParameter( 36183 ) : 0;

		return {

			isWebGL2: isWebGL2,

			getMaxAnisotropy: getMaxAnisotropy,
			getMaxPrecision: getMaxPrecision,

			precision: precision,
			logarithmicDepthBuffer: logarithmicDepthBuffer,

			maxTextures: maxTextures,
			maxVertexTextures: maxVertexTextures,
			maxTextureSize: maxTextureSize,
			maxCubemapSize: maxCubemapSize,

			maxAttributes: maxAttributes,
			maxVertexUniforms: maxVertexUniforms,
			maxVaryings: maxVaryings,
			maxFragmentUniforms: maxFragmentUniforms,

			vertexTextures: vertexTextures,
			floatFragmentTextures: floatFragmentTextures,
			floatVertexTextures: floatVertexTextures,

			maxSamples: maxSamples

		};

	}

	/**
	 * @author tschw
	 */

	function WebGLClipping() {

		var scope = this,

			globalState = null,
			numGlobalPlanes = 0,
			localClippingEnabled = false,
			renderingShadows = false,

			plane = new Plane(),
			viewNormalMatrix = new Matrix3(),

			uniform = { value: null, needsUpdate: false };

		this.uniform = uniform;
		this.numPlanes = 0;
		this.numIntersection = 0;

		this.init = function ( planes, enableLocalClipping, camera ) {

			var enabled =
				planes.length !== 0 ||
				enableLocalClipping ||
				// enable state of previous frame - the clipping code has to
				// run another frame in order to reset the state:
				numGlobalPlanes !== 0 ||
				localClippingEnabled;

			localClippingEnabled = enableLocalClipping;

			globalState = projectPlanes( planes, camera, 0 );
			numGlobalPlanes = planes.length;

			return enabled;

		};

		this.beginShadows = function () {

			renderingShadows = true;
			projectPlanes( null );

		};

		this.endShadows = function () {

			renderingShadows = false;
			resetGlobalState();

		};

		this.setState = function ( planes, clipIntersection, clipShadows, camera, cache, fromCache ) {

			if ( ! localClippingEnabled || planes === null || planes.length === 0 || renderingShadows && ! clipShadows ) {

				// there's no local clipping

				if ( renderingShadows ) {

					// there's no global clipping

					projectPlanes( null );

				} else {

					resetGlobalState();

				}

			} else {

				var nGlobal = renderingShadows ? 0 : numGlobalPlanes,
					lGlobal = nGlobal * 4,

					dstArray = cache.clippingState || null;

				uniform.value = dstArray; // ensure unique state

				dstArray = projectPlanes( planes, camera, lGlobal, fromCache );

				for ( var i = 0; i !== lGlobal; ++ i ) {

					dstArray[ i ] = globalState[ i ];

				}

				cache.clippingState = dstArray;
				this.numIntersection = clipIntersection ? this.numPlanes : 0;
				this.numPlanes += nGlobal;

			}


		};

		function resetGlobalState() {

			if ( uniform.value !== globalState ) {

				uniform.value = globalState;
				uniform.needsUpdate = numGlobalPlanes > 0;

			}

			scope.numPlanes = numGlobalPlanes;
			scope.numIntersection = 0;

		}

		function projectPlanes( planes, camera, dstOffset, skipTransform ) {

			var nPlanes = planes !== null ? planes.length : 0,
				dstArray = null;

			if ( nPlanes !== 0 ) {

				dstArray = uniform.value;

				if ( skipTransform !== true || dstArray === null ) {

					var flatSize = dstOffset + nPlanes * 4,
						viewMatrix = camera.matrixWorldInverse;

					viewNormalMatrix.getNormalMatrix( viewMatrix );

					if ( dstArray === null || dstArray.length < flatSize ) {

						dstArray = new Float32Array( flatSize );

					}

					for ( var i = 0, i4 = dstOffset; i !== nPlanes; ++ i, i4 += 4 ) {

						plane.copy( planes[ i ] ).applyMatrix4( viewMatrix, viewNormalMatrix );

						plane.normal.toArray( dstArray, i4 );
						dstArray[ i4 + 3 ] = plane.constant;

					}

				}

				uniform.value = dstArray;
				uniform.needsUpdate = true;

			}

			scope.numPlanes = nPlanes;

			return dstArray;

		}

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLExtensions( gl ) {

		var extensions = {};

		return {

			get: function ( name ) {

				if ( extensions[ name ] !== undefined ) {

					return extensions[ name ];

				}

				var extension;

				switch ( name ) {

					case 'WEBGL_depth_texture':
						extension = gl.getExtension( 'WEBGL_depth_texture' ) || gl.getExtension( 'MOZ_WEBGL_depth_texture' ) || gl.getExtension( 'WEBKIT_WEBGL_depth_texture' );
						break;

					case 'EXT_texture_filter_anisotropic':
						extension = gl.getExtension( 'EXT_texture_filter_anisotropic' ) || gl.getExtension( 'MOZ_EXT_texture_filter_anisotropic' ) || gl.getExtension( 'WEBKIT_EXT_texture_filter_anisotropic' );
						break;

					case 'WEBGL_compressed_texture_s3tc':
						extension = gl.getExtension( 'WEBGL_compressed_texture_s3tc' ) || gl.getExtension( 'MOZ_WEBGL_compressed_texture_s3tc' ) || gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_s3tc' );
						break;

					case 'WEBGL_compressed_texture_pvrtc':
						extension = gl.getExtension( 'WEBGL_compressed_texture_pvrtc' ) || gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_pvrtc' );
						break;

					default:
						extension = gl.getExtension( name );

				}

				if ( extension === null ) {

					console.warn( 'THREE.WebGLRenderer: ' + name + ' extension not supported.' );

				}

				extensions[ name ] = extension;

				return extension;

			}

		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLGeometries( gl, attributes, info ) {

		var geometries = {};
		var wireframeAttributes = {};

		function onGeometryDispose( event ) {

			var geometry = event.target;
			var buffergeometry = geometries[ geometry.id ];

			if ( buffergeometry.index !== null ) {

				attributes.remove( buffergeometry.index );

			}

			for ( var name in buffergeometry.attributes ) {

				attributes.remove( buffergeometry.attributes[ name ] );

			}

			geometry.removeEventListener( 'dispose', onGeometryDispose );

			delete geometries[ geometry.id ];

			var attribute = wireframeAttributes[ buffergeometry.id ];

			if ( attribute ) {

				attributes.remove( attribute );
				delete wireframeAttributes[ buffergeometry.id ];

			}

			//

			info.memory.geometries --;

		}

		function get( object, geometry ) {

			var buffergeometry = geometries[ geometry.id ];

			if ( buffergeometry ) return buffergeometry;

			geometry.addEventListener( 'dispose', onGeometryDispose );

			if ( geometry.isBufferGeometry ) {

				buffergeometry = geometry;

			} else if ( geometry.isGeometry ) {

				if ( geometry._bufferGeometry === undefined ) {

					geometry._bufferGeometry = new BufferGeometry().setFromObject( object );

				}

				buffergeometry = geometry._bufferGeometry;

			}

			geometries[ geometry.id ] = buffergeometry;

			info.memory.geometries ++;

			return buffergeometry;

		}

		function update( geometry ) {

			var index = geometry.index;
			var geometryAttributes = geometry.attributes;

			if ( index !== null ) {

				attributes.update( index, 34963 );

			}

			for ( var name in geometryAttributes ) {

				attributes.update( geometryAttributes[ name ], 34962 );

			}

			// morph targets

			var morphAttributes = geometry.morphAttributes;

			for ( var name in morphAttributes ) {

				var array = morphAttributes[ name ];

				for ( var i = 0, l = array.length; i < l; i ++ ) {

					attributes.update( array[ i ], 34962 );

				}

			}

		}

		function getWireframeAttribute( geometry ) {

			var attribute = wireframeAttributes[ geometry.id ];

			if ( attribute ) return attribute;

			var indices = [];

			var geometryIndex = geometry.index;
			var geometryAttributes = geometry.attributes;

			// console.time( 'wireframe' );

			if ( geometryIndex !== null ) {

				var array = geometryIndex.array;

				for ( var i = 0, l = array.length; i < l; i += 3 ) {

					var a = array[ i + 0 ];
					var b = array[ i + 1 ];
					var c = array[ i + 2 ];

					indices.push( a, b, b, c, c, a );

				}

			} else {

				var array = geometryAttributes.position.array;

				for ( var i = 0, l = ( array.length / 3 ) - 1; i < l; i += 3 ) {

					var a = i + 0;
					var b = i + 1;
					var c = i + 2;

					indices.push( a, b, b, c, c, a );

				}

			}

			// console.timeEnd( 'wireframe' );

			attribute = new ( arrayMax( indices ) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute )( indices, 1 );

			attributes.update( attribute, 34963 );

			wireframeAttributes[ geometry.id ] = attribute;

			return attribute;

		}

		return {

			get: get,
			update: update,

			getWireframeAttribute: getWireframeAttribute

		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLIndexedBufferRenderer( gl, extensions, info, capabilities ) {

		var mode;

		function setMode( value ) {

			mode = value;

		}

		var type, bytesPerElement;

		function setIndex( value ) {

			type = value.type;
			bytesPerElement = value.bytesPerElement;

		}

		function render( start, count ) {

			gl.drawElements( mode, count, type, start * bytesPerElement );

			info.update( count, mode );

		}

		function renderInstances( geometry, start, count ) {

			var extension;

			if ( capabilities.isWebGL2 ) {

				extension = gl;

			} else {

				var extension = extensions.get( 'ANGLE_instanced_arrays' );

				if ( extension === null ) {

					console.error( 'THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
					return;

				}

			}

			extension[ capabilities.isWebGL2 ? 'drawElementsInstanced' : 'drawElementsInstancedANGLE' ]( mode, count, type, start * bytesPerElement, geometry.maxInstancedCount );

			info.update( count, mode, geometry.maxInstancedCount );

		}

		//

		this.setMode = setMode;
		this.setIndex = setIndex;
		this.render = render;
		this.renderInstances = renderInstances;

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	function WebGLInfo( gl ) {

		var memory = {
			geometries: 0,
			textures: 0
		};

		var render = {
			frame: 0,
			calls: 0,
			triangles: 0,
			points: 0,
			lines: 0
		};

		function update( count, mode, instanceCount ) {

			instanceCount = instanceCount || 1;

			render.calls ++;

			switch ( mode ) {

				case 4:
					render.triangles += instanceCount * ( count / 3 );
					break;

				case 5:
				case 6:
					render.triangles += instanceCount * ( count - 2 );
					break;

				case 1:
					render.lines += instanceCount * ( count / 2 );
					break;

				case 3:
					render.lines += instanceCount * ( count - 1 );
					break;

				case 2:
					render.lines += instanceCount * count;
					break;

				case 0:
					render.points += instanceCount * count;
					break;

				default:
					console.error( 'THREE.WebGLInfo: Unknown draw mode:', mode );
					break;

			}

		}

		function reset() {

			render.frame ++;
			render.calls = 0;
			render.triangles = 0;
			render.points = 0;
			render.lines = 0;

		}

		return {
			memory: memory,
			render: render,
			programs: null,
			autoReset: true,
			reset: reset,
			update: update
		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function absNumericalSort( a, b ) {

		return Math.abs( b[ 1 ] ) - Math.abs( a[ 1 ] );

	}

	function WebGLMorphtargets( gl ) {

		var influencesList = {};
		var morphInfluences = new Float32Array( 8 );

		function update( object, geometry, material, program ) {

			var objectInfluences = object.morphTargetInfluences;

			var length = objectInfluences.length;

			var influences = influencesList[ geometry.id ];

			if ( influences === undefined ) {

				// initialise list

				influences = [];

				for ( var i = 0; i < length; i ++ ) {

					influences[ i ] = [ i, 0 ];

				}

				influencesList[ geometry.id ] = influences;

			}

			var morphTargets = material.morphTargets && geometry.morphAttributes.position;
			var morphNormals = material.morphNormals && geometry.morphAttributes.normal;

			// Remove current morphAttributes

			for ( var i = 0; i < length; i ++ ) {

				var influence = influences[ i ];

				if ( influence[ 1 ] !== 0 ) {

					if ( morphTargets ) geometry.removeAttribute( 'morphTarget' + i );
					if ( morphNormals ) geometry.removeAttribute( 'morphNormal' + i );

				}

			}

			// Collect influences

			for ( var i = 0; i < length; i ++ ) {

				var influence = influences[ i ];

				influence[ 0 ] = i;
				influence[ 1 ] = objectInfluences[ i ];

			}

			influences.sort( absNumericalSort );

			// Add morphAttributes

			for ( var i = 0; i < 8; i ++ ) {

				var influence = influences[ i ];

				if ( influence ) {

					var index = influence[ 0 ];
					var value = influence[ 1 ];

					if ( value ) {

						if ( morphTargets ) geometry.addAttribute( 'morphTarget' + i, morphTargets[ index ] );
						if ( morphNormals ) geometry.addAttribute( 'morphNormal' + i, morphNormals[ index ] );

						morphInfluences[ i ] = value;
						continue;

					}

				}

				morphInfluences[ i ] = 0;

			}

			program.getUniforms().setValue( gl, 'morphTargetInfluences', morphInfluences );

		}

		return {

			update: update

		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLObjects( geometries, info ) {

		var updateList = {};

		function update( object ) {

			var frame = info.render.frame;

			var geometry = object.geometry;
			var buffergeometry = geometries.get( object, geometry );

			// Update once per frame

			if ( updateList[ buffergeometry.id ] !== frame ) {

				if ( geometry.isGeometry ) {

					buffergeometry.updateFromObject( object );

				}

				geometries.update( buffergeometry );

				updateList[ buffergeometry.id ] = frame;

			}

			return buffergeometry;

		}

		function dispose() {

			updateList = {};

		}

		return {

			update: update,
			dispose: dispose

		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function CubeTexture( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding ) {

		images = images !== undefined ? images : [];
		mapping = mapping !== undefined ? mapping : CubeReflectionMapping;
		format = format !== undefined ? format : RGBFormat;

		Texture.call( this, images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

		this.flipY = false;

	}

	CubeTexture.prototype = Object.create( Texture.prototype );
	CubeTexture.prototype.constructor = CubeTexture;

	CubeTexture.prototype.isCubeTexture = true;

	Object.defineProperty( CubeTexture.prototype, 'images', {

		get: function () {

			return this.image;

		},

		set: function ( value ) {

			this.image = value;

		}

	} );

	/**
	 * @author Takahiro https://github.com/takahirox
	 */

	function DataTexture2DArray( data, width, height, depth ) {

		Texture.call( this, null );

		this.image = { data: data, width: width, height: height, depth: depth };

		this.magFilter = NearestFilter;
		this.minFilter = NearestFilter;

		this.wrapR = ClampToEdgeWrapping;

		this.generateMipmaps = false;
		this.flipY = false;

	}

	DataTexture2DArray.prototype = Object.create( Texture.prototype );
	DataTexture2DArray.prototype.constructor = DataTexture2DArray;
	DataTexture2DArray.prototype.isDataTexture2DArray = true;

	/**
	 * @author Artur Trzesiok
	 */

	function DataTexture3D( data, width, height, depth ) {

		// We're going to add .setXXX() methods for setting properties later.
		// Users can still set in DataTexture3D directly.
		//
		//	var texture = new THREE.DataTexture3D( data, width, height, depth );
		// 	texture.anisotropy = 16;
		//
		// See #14839

		Texture.call( this, null );

		this.image = { data: data, width: width, height: height, depth: depth };

		this.magFilter = NearestFilter;
		this.minFilter = NearestFilter;

		this.wrapR = ClampToEdgeWrapping;

		this.generateMipmaps = false;
		this.flipY = false;

	}

	DataTexture3D.prototype = Object.create( Texture.prototype );
	DataTexture3D.prototype.constructor = DataTexture3D;
	DataTexture3D.prototype.isDataTexture3D = true;

	/**
	 * @author tschw
	 * @author Mugen87 / https://github.com/Mugen87
	 * @author mrdoob / http://mrdoob.com/
	 *
	 * Uniforms of a program.
	 * Those form a tree structure with a special top-level container for the root,
	 * which you get by calling 'new WebGLUniforms( gl, program, renderer )'.
	 *
	 *
	 * Properties of inner nodes including the top-level container:
	 *
	 * .seq - array of nested uniforms
	 * .map - nested uniforms by name
	 *
	 *
	 * Methods of all nodes except the top-level container:
	 *
	 * .setValue( gl, value, [renderer] )
	 *
	 * 		uploads a uniform value(s)
	 *  	the 'renderer' parameter is needed for sampler uniforms
	 *
	 *
	 * Static methods of the top-level container (renderer factorizations):
	 *
	 * .upload( gl, seq, values, renderer )
	 *
	 * 		sets uniforms in 'seq' to 'values[id].value'
	 *
	 * .seqWithValue( seq, values ) : filteredSeq
	 *
	 * 		filters 'seq' entries with corresponding entry in values
	 *
	 *
	 * Methods of the top-level container (renderer factorizations):
	 *
	 * .setValue( gl, name, value )
	 *
	 * 		sets uniform with  name 'name' to 'value'
	 *
	 * .set( gl, obj, prop )
	 *
	 * 		sets uniform from object and property with same name than uniform
	 *
	 * .setOptional( gl, obj, prop )
	 *
	 * 		like .set for an optional property of the object
	 *
	 */

	var emptyTexture = new Texture();
	var emptyTexture2dArray = new DataTexture2DArray();
	var emptyTexture3d = new DataTexture3D();
	var emptyCubeTexture = new CubeTexture();

	// --- Base for inner nodes (including the root) ---

	function UniformContainer() {

		this.seq = [];
		this.map = {};

	}

	// --- Utilities ---

	// Array Caches (provide typed arrays for temporary by size)

	var arrayCacheF32 = [];
	var arrayCacheI32 = [];

	// Float32Array caches used for uploading Matrix uniforms

	var mat4array = new Float32Array( 16 );
	var mat3array = new Float32Array( 9 );
	var mat2array = new Float32Array( 4 );

	// Flattening for arrays of vectors and matrices

	function flatten( array, nBlocks, blockSize ) {

		var firstElem = array[ 0 ];

		if ( firstElem <= 0 || firstElem > 0 ) return array;
		// unoptimized: ! isNaN( firstElem )
		// see http://jacksondunstan.com/articles/983

		var n = nBlocks * blockSize,
			r = arrayCacheF32[ n ];

		if ( r === undefined ) {

			r = new Float32Array( n );
			arrayCacheF32[ n ] = r;

		}

		if ( nBlocks !== 0 ) {

			firstElem.toArray( r, 0 );

			for ( var i = 1, offset = 0; i !== nBlocks; ++ i ) {

				offset += blockSize;
				array[ i ].toArray( r, offset );

			}

		}

		return r;

	}

	function arraysEqual( a, b ) {

		if ( a.length !== b.length ) return false;

		for ( var i = 0, l = a.length; i < l; i ++ ) {

			if ( a[ i ] !== b[ i ] ) return false;

		}

		return true;

	}

	function copyArray( a, b ) {

		for ( var i = 0, l = b.length; i < l; i ++ ) {

			a[ i ] = b[ i ];

		}

	}

	// Texture unit allocation

	function allocTexUnits( renderer, n ) {

		var r = arrayCacheI32[ n ];

		if ( r === undefined ) {

			r = new Int32Array( n );
			arrayCacheI32[ n ] = r;

		}

		for ( var i = 0; i !== n; ++ i )
			r[ i ] = renderer.allocTextureUnit();

		return r;

	}

	// --- Setters ---

	// Note: Defining these methods externally, because they come in a bunch
	// and this way their names minify.

	// Single scalar

	function setValue1f( gl, v ) {

		var cache = this.cache;

		if ( cache[ 0 ] === v ) return;

		gl.uniform1f( this.addr, v );

		cache[ 0 ] = v;

	}

	function setValue1i( gl, v ) {

		var cache = this.cache;

		if ( cache[ 0 ] === v ) return;

		gl.uniform1i( this.addr, v );

		cache[ 0 ] = v;

	}

	// Single float vector (from flat array or THREE.VectorN)

	function setValue2fv( gl, v ) {

		var cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y ) {

				gl.uniform2f( this.addr, v.x, v.y );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform2fv( this.addr, v );

			copyArray( cache, v );

		}

	}

	function setValue3fv( gl, v ) {

		var cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z ) {

				gl.uniform3f( this.addr, v.x, v.y, v.z );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;
				cache[ 2 ] = v.z;

			}

		} else if ( v.r !== undefined ) {

			if ( cache[ 0 ] !== v.r || cache[ 1 ] !== v.g || cache[ 2 ] !== v.b ) {

				gl.uniform3f( this.addr, v.r, v.g, v.b );

				cache[ 0 ] = v.r;
				cache[ 1 ] = v.g;
				cache[ 2 ] = v.b;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform3fv( this.addr, v );

			copyArray( cache, v );

		}

	}

	function setValue4fv( gl, v ) {

		var cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z || cache[ 3 ] !== v.w ) {

				gl.uniform4f( this.addr, v.x, v.y, v.z, v.w );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;
				cache[ 2 ] = v.z;
				cache[ 3 ] = v.w;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform4fv( this.addr, v );

			copyArray( cache, v );

		}

	}

	// Single matrix (from flat array or MatrixN)

	function setValue2fm( gl, v ) {

		var cache = this.cache;
		var elements = v.elements;

		if ( elements === undefined ) {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniformMatrix2fv( this.addr, false, v );

			copyArray( cache, v );

		} else {

			if ( arraysEqual( cache, elements ) ) return;

			mat2array.set( elements );

			gl.uniformMatrix2fv( this.addr, false, mat2array );

			copyArray( cache, elements );

		}

	}

	function setValue3fm( gl, v ) {

		var cache = this.cache;
		var elements = v.elements;

		if ( elements === undefined ) {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniformMatrix3fv( this.addr, false, v );

			copyArray( cache, v );

		} else {

			if ( arraysEqual( cache, elements ) ) return;

			mat3array.set( elements );

			gl.uniformMatrix3fv( this.addr, false, mat3array );

			copyArray( cache, elements );

		}

	}

	function setValue4fm( gl, v ) {

		var cache = this.cache;
		var elements = v.elements;

		if ( elements === undefined ) {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniformMatrix4fv( this.addr, false, v );

			copyArray( cache, v );

		} else {

			if ( arraysEqual( cache, elements ) ) return;

			mat4array.set( elements );

			gl.uniformMatrix4fv( this.addr, false, mat4array );

			copyArray( cache, elements );

		}

	}

	// Single texture (2D / Cube)

	function setValueT1( gl, v, renderer ) {

		var cache = this.cache;
		var unit = renderer.allocTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		renderer.setTexture2D( v || emptyTexture, unit );

	}

	function setValueT2DArray1( gl, v, renderer ) {

		var cache = this.cache;
		var unit = renderer.allocTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		renderer.setTexture2DArray( v || emptyTexture2dArray, unit );

	}

	function setValueT3D1( gl, v, renderer ) {

		var cache = this.cache;
		var unit = renderer.allocTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		renderer.setTexture3D( v || emptyTexture3d, unit );

	}

	function setValueT6( gl, v, renderer ) {

		var cache = this.cache;
		var unit = renderer.allocTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		renderer.setTextureCube( v || emptyCubeTexture, unit );

	}

	// Integer / Boolean vectors or arrays thereof (always flat arrays)

	function setValue2iv( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform2iv( this.addr, v );

		copyArray( cache, v );

	}

	function setValue3iv( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform3iv( this.addr, v );

		copyArray( cache, v );

	}

	function setValue4iv( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform4iv( this.addr, v );

		copyArray( cache, v );

	}

	// Helper to pick the right setter for the singular case

	function getSingularSetter( type ) {

		switch ( type ) {

			case 0x1406: return setValue1f; // FLOAT
			case 0x8b50: return setValue2fv; // _VEC2
			case 0x8b51: return setValue3fv; // _VEC3
			case 0x8b52: return setValue4fv; // _VEC4

			case 0x8b5a: return setValue2fm; // _MAT2
			case 0x8b5b: return setValue3fm; // _MAT3
			case 0x8b5c: return setValue4fm; // _MAT4

			case 0x8b5e: case 0x8d66: return setValueT1; // SAMPLER_2D, SAMPLER_EXTERNAL_OES
			case 0x8b5f: return setValueT3D1; // SAMPLER_3D
			case 0x8b60: return setValueT6; // SAMPLER_CUBE
			case 0x8DC1: return setValueT2DArray1; // SAMPLER_2D_ARRAY

			case 0x1404: case 0x8b56: return setValue1i; // INT, BOOL
			case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
			case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
			case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4

		}

	}

	// Array of scalars

	function setValue1fv( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform1fv( this.addr, v );

		copyArray( cache, v );

	}
	function setValue1iv( gl, v ) {

		var cache = this.cache;

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform1iv( this.addr, v );

		copyArray( cache, v );

	}

	// Array of vectors (flat or from THREE classes)

	function setValueV2a( gl, v ) {

		var cache = this.cache;
		var data = flatten( v, this.size, 2 );

		if ( arraysEqual( cache, data ) ) return;

		gl.uniform2fv( this.addr, data );

		this.updateCache( data );

	}

	function setValueV3a( gl, v ) {

		var cache = this.cache;
		var data = flatten( v, this.size, 3 );

		if ( arraysEqual( cache, data ) ) return;

		gl.uniform3fv( this.addr, data );

		this.updateCache( data );

	}

	function setValueV4a( gl, v ) {

		var cache = this.cache;
		var data = flatten( v, this.size, 4 );

		if ( arraysEqual( cache, data ) ) return;

		gl.uniform4fv( this.addr, data );

		this.updateCache( data );

	}

	// Array of matrices (flat or from THREE clases)

	function setValueM2a( gl, v ) {

		var cache = this.cache;
		var data = flatten( v, this.size, 4 );

		if ( arraysEqual( cache, data ) ) return;

		gl.uniformMatrix2fv( this.addr, false, data );

		this.updateCache( data );

	}

	function setValueM3a( gl, v ) {

		var cache = this.cache;
		var data = flatten( v, this.size, 9 );

		if ( arraysEqual( cache, data ) ) return;

		gl.uniformMatrix3fv( this.addr, false, data );

		this.updateCache( data );

	}

	function setValueM4a( gl, v ) {

		var cache = this.cache;
		var data = flatten( v, this.size, 16 );

		if ( arraysEqual( cache, data ) ) return;

		gl.uniformMatrix4fv( this.addr, false, data );

		this.updateCache( data );

	}

	// Array of textures (2D / Cube)

	function setValueT1a( gl, v, renderer ) {

		var cache = this.cache;
		var n = v.length;

		var units = allocTexUnits( renderer, n );

		if ( arraysEqual( cache, units ) === false ) {

			gl.uniform1iv( this.addr, units );
			copyArray( cache, units );

		}

		for ( var i = 0; i !== n; ++ i ) {

			renderer.setTexture2D( v[ i ] || emptyTexture, units[ i ] );

		}

	}

	function setValueT6a( gl, v, renderer ) {

		var cache = this.cache;
		var n = v.length;

		var units = allocTexUnits( renderer, n );

		if ( arraysEqual( cache, units ) === false ) {

			gl.uniform1iv( this.addr, units );
			copyArray( cache, units );

		}

		for ( var i = 0; i !== n; ++ i ) {

			renderer.setTextureCube( v[ i ] || emptyCubeTexture, units[ i ] );

		}

	}

	// Helper to pick the right setter for a pure (bottom-level) array

	function getPureArraySetter( type ) {

		switch ( type ) {

			case 0x1406: return setValue1fv; // FLOAT
			case 0x8b50: return setValueV2a; // _VEC2
			case 0x8b51: return setValueV3a; // _VEC3
			case 0x8b52: return setValueV4a; // _VEC4

			case 0x8b5a: return setValueM2a; // _MAT2
			case 0x8b5b: return setValueM3a; // _MAT3
			case 0x8b5c: return setValueM4a; // _MAT4

			case 0x8b5e: return setValueT1a; // SAMPLER_2D
			case 0x8b60: return setValueT6a; // SAMPLER_CUBE

			case 0x1404: case 0x8b56: return setValue1iv; // INT, BOOL
			case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
			case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
			case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4

		}

	}

	// --- Uniform Classes ---

	function SingleUniform( id, activeInfo, addr ) {

		this.id = id;
		this.addr = addr;
		this.cache = [];
		this.setValue = getSingularSetter( activeInfo.type );

		// this.path = activeInfo.name; // DEBUG

	}

	function PureArrayUniform( id, activeInfo, addr ) {

		this.id = id;
		this.addr = addr;
		this.cache = [];
		this.size = activeInfo.size;
		this.setValue = getPureArraySetter( activeInfo.type );

		// this.path = activeInfo.name; // DEBUG

	}

	PureArrayUniform.prototype.updateCache = function ( data ) {

		var cache = this.cache;

		if ( data instanceof Float32Array && cache.length !== data.length ) {

			this.cache = new Float32Array( data.length );

		}

		copyArray( cache, data );

	};

	function StructuredUniform( id ) {

		this.id = id;

		UniformContainer.call( this ); // mix-in

	}

	StructuredUniform.prototype.setValue = function ( gl, value, renderer ) {

		var seq = this.seq;

		for ( var i = 0, n = seq.length; i !== n; ++ i ) {

			var u = seq[ i ];
			u.setValue( gl, value[ u.id ], renderer );

		}

	};

	// --- Top-level ---

	// Parser - builds up the property tree from the path strings

	var RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;

	// extracts
	// 	- the identifier (member name or array index)
	//  - followed by an optional right bracket (found when array index)
	//  - followed by an optional left bracket or dot (type of subscript)
	//
	// Note: These portions can be read in a non-overlapping fashion and
	// allow straightforward parsing of the hierarchy that WebGL encodes
	// in the uniform names.

	function addUniform( container, uniformObject ) {

		container.seq.push( uniformObject );
		container.map[ uniformObject.id ] = uniformObject;

	}

	function parseUniform( activeInfo, addr, container ) {

		var path = activeInfo.name,
			pathLength = path.length;

		// reset RegExp object, because of the early exit of a previous run
		RePathPart.lastIndex = 0;

		while ( true ) {

			var match = RePathPart.exec( path ),
				matchEnd = RePathPart.lastIndex,

				id = match[ 1 ],
				idIsIndex = match[ 2 ] === ']',
				subscript = match[ 3 ];

			if ( idIsIndex ) id = id | 0; // convert to integer

			if ( subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength ) {

				// bare name or "pure" bottom-level array "[0]" suffix

				addUniform( container, subscript === undefined ?
					new SingleUniform( id, activeInfo, addr ) :
					new PureArrayUniform( id, activeInfo, addr ) );

				break;

			} else {

				// step into inner node / create it in case it doesn't exist

				var map = container.map, next = map[ id ];

				if ( next === undefined ) {

					next = new StructuredUniform( id );
					addUniform( container, next );

				}

				container = next;

			}

		}

	}

	// Root Container

	function WebGLUniforms( gl, program, renderer ) {

		UniformContainer.call( this );

		this.renderer = renderer;

		var n = gl.getProgramParameter( program, 35718 );

		for ( var i = 0; i < n; ++ i ) {

			var info = gl.getActiveUniform( program, i ),
				addr = gl.getUniformLocation( program, info.name );

			parseUniform( info, addr, this );

		}

	}

	WebGLUniforms.prototype.setValue = function ( gl, name, value ) {

		var u = this.map[ name ];

		if ( u !== undefined ) u.setValue( gl, value, this.renderer );

	};

	WebGLUniforms.prototype.setOptional = function ( gl, object, name ) {

		var v = object[ name ];

		if ( v !== undefined ) this.setValue( gl, name, v );

	};


	// Static interface

	WebGLUniforms.upload = function ( gl, seq, values, renderer ) {

		for ( var i = 0, n = seq.length; i !== n; ++ i ) {

			var u = seq[ i ],
				v = values[ u.id ];

			if ( v.needsUpdate !== false ) {

				// note: always updating when .needsUpdate is undefined
				u.setValue( gl, v.value, renderer );

			}

		}

	};

	WebGLUniforms.seqWithValue = function ( seq, values ) {

		var r = [];

		for ( var i = 0, n = seq.length; i !== n; ++ i ) {

			var u = seq[ i ];
			if ( u.id in values ) r.push( u );

		}

		return r;

	};

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function addLineNumbers( string ) {

		var lines = string.split( '\n' );

		for ( var i = 0; i < lines.length; i ++ ) {

			lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];

		}

		return lines.join( '\n' );

	}

	function WebGLShader( gl, type, string ) {

		var shader = gl.createShader( type );

		gl.shaderSource( shader, string );
		gl.compileShader( shader );

		if ( gl.getShaderParameter( shader, 35713 ) === false ) {

			console.error( 'THREE.WebGLShader: Shader couldn\'t compile.' );

		}

		if ( gl.getShaderInfoLog( shader ) !== '' ) {

			console.warn( 'THREE.WebGLShader: gl.getShaderInfoLog()', type === 35633 ? 'vertex' : 'fragment', gl.getShaderInfoLog( shader ), addLineNumbers( string ) );

		}

		// --enable-privileged-webgl-extension
		// console.log( type, gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

		return shader;

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	var programIdCount = 0;

	function getEncodingComponents( encoding ) {

		switch ( encoding ) {

			case LinearEncoding:
				return [ 'Linear', '( value )' ];
			case sRGBEncoding:
				return [ 'sRGB', '( value )' ];
			case RGBEEncoding:
				return [ 'RGBE', '( value )' ];
			case RGBM7Encoding:
				return [ 'RGBM', '( value, 7.0 )' ];
			case RGBM16Encoding:
				return [ 'RGBM', '( value, 16.0 )' ];
			case RGBDEncoding:
				return [ 'RGBD', '( value, 256.0 )' ];
			case GammaEncoding:
				return [ 'Gamma', '( value, float( GAMMA_FACTOR ) )' ];
			default:
				throw new Error( 'unsupported encoding: ' + encoding );

		}

	}

	function getTexelDecodingFunction( functionName, encoding ) {

		var components = getEncodingComponents( encoding );
		return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[ 0 ] + 'ToLinear' + components[ 1 ] + '; }';

	}

	function getTexelEncodingFunction( functionName, encoding ) {

		var components = getEncodingComponents( encoding );
		return 'vec4 ' + functionName + '( vec4 value ) { return LinearTo' + components[ 0 ] + components[ 1 ] + '; }';

	}

	function getToneMappingFunction( functionName, toneMapping ) {

		var toneMappingName;

		switch ( toneMapping ) {

			case LinearToneMapping:
				toneMappingName = 'Linear';
				break;

			case ReinhardToneMapping:
				toneMappingName = 'Reinhard';
				break;

			case Uncharted2ToneMapping:
				toneMappingName = 'Uncharted2';
				break;

			case CineonToneMapping:
				toneMappingName = 'OptimizedCineon';
				break;

			case ACESFilmicToneMapping:
				toneMappingName = 'ACESFilmic';
				break;

			default:
				throw new Error( 'unsupported toneMapping: ' + toneMapping );

		}

		return 'vec3 ' + functionName + '( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';

	}

	function generateExtensions( extensions, parameters, rendererExtensions ) {

		extensions = extensions || {};

		var chunks = [
			( extensions.derivatives || parameters.envMapCubeUV || parameters.bumpMap || ( parameters.normalMap && ! parameters.objectSpaceNormalMap ) || parameters.flatShading ) ? '#extension GL_OES_standard_derivatives : enable' : '',
			( extensions.fragDepth || parameters.logarithmicDepthBuffer ) && rendererExtensions.get( 'EXT_frag_depth' ) ? '#extension GL_EXT_frag_depth : enable' : '',
			( extensions.drawBuffers ) && rendererExtensions.get( 'WEBGL_draw_buffers' ) ? '#extension GL_EXT_draw_buffers : require' : '',
			( extensions.shaderTextureLOD || parameters.envMap ) && rendererExtensions.get( 'EXT_shader_texture_lod' ) ? '#extension GL_EXT_shader_texture_lod : enable' : ''
		];

		return chunks.filter( filterEmptyLine ).join( '\n' );

	}

	function generateDefines( defines ) {

		var chunks = [];

		for ( var name in defines ) {

			var value = defines[ name ];

			if ( value === false ) continue;

			chunks.push( '#define ' + name + ' ' + value );

		}

		return chunks.join( '\n' );

	}

	function fetchAttributeLocations( gl, program ) {

		var attributes = {};

		var n = gl.getProgramParameter( program, 35721 );

		for ( var i = 0; i < n; i ++ ) {

			var info = gl.getActiveAttrib( program, i );
			var name = info.name;

			// console.log( 'THREE.WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i );

			attributes[ name ] = gl.getAttribLocation( program, name );

		}

		return attributes;

	}

	function filterEmptyLine( string ) {

		return string !== '';

	}

	function replaceLightNums( string, parameters ) {

		return string
			.replace( /NUM_DIR_LIGHTS/g, parameters.numDirLights )
			.replace( /NUM_SPOT_LIGHTS/g, parameters.numSpotLights )
			.replace( /NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights )
			.replace( /NUM_POINT_LIGHTS/g, parameters.numPointLights )
			.replace( /NUM_HEMI_LIGHTS/g, parameters.numHemiLights );

	}

	function replaceClippingPlaneNums( string, parameters ) {

		return string
			.replace( /NUM_CLIPPING_PLANES/g, parameters.numClippingPlanes )
			.replace( /UNION_CLIPPING_PLANES/g, ( parameters.numClippingPlanes - parameters.numClipIntersection ) );

	}

	function parseIncludes( string ) {

		var pattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

		function replace( match, include ) {

			var replace = ShaderChunk[ include ];

			if ( replace === undefined ) {

				throw new Error( 'Can not resolve #include <' + include + '>' );

			}

			return parseIncludes( replace );

		}

		return string.replace( pattern, replace );

	}

	function unrollLoops( string ) {

		var pattern = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;

		function replace( match, start, end, snippet ) {

			var unroll = '';

			for ( var i = parseInt( start ); i < parseInt( end ); i ++ ) {

				unroll += snippet.replace( /\[ i \]/g, '[ ' + i + ' ]' );

			}

			return unroll;

		}

		return string.replace( pattern, replace );

	}

	function WebGLProgram( renderer, extensions, code, material, shader, parameters, capabilities ) {

		var gl = renderer.context;

		var defines = material.defines;

		var vertexShader = shader.vertexShader;
		var fragmentShader = shader.fragmentShader;

		var shadowMapTypeDefine = 'SHADOWMAP_TYPE_BASIC';

		if ( parameters.shadowMapType === PCFShadowMap ) {

			shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF';

		} else if ( parameters.shadowMapType === PCFSoftShadowMap ) {

			shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF_SOFT';

		}

		var envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
		var envMapModeDefine = 'ENVMAP_MODE_REFLECTION';
		var envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';

		if ( parameters.envMap ) {

			switch ( material.envMap.mapping ) {

				case CubeReflectionMapping:
				case CubeRefractionMapping:
					envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
					break;

				case CubeUVReflectionMapping:
				case CubeUVRefractionMapping:
					envMapTypeDefine = 'ENVMAP_TYPE_CUBE_UV';
					break;

				case EquirectangularReflectionMapping:
				case EquirectangularRefractionMapping:
					envMapTypeDefine = 'ENVMAP_TYPE_EQUIREC';
					break;

				case SphericalReflectionMapping:
					envMapTypeDefine = 'ENVMAP_TYPE_SPHERE';
					break;

			}

			switch ( material.envMap.mapping ) {

				case CubeRefractionMapping:
				case EquirectangularRefractionMapping:
					envMapModeDefine = 'ENVMAP_MODE_REFRACTION';
					break;

			}

			switch ( material.combine ) {

				case MultiplyOperation:
					envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
					break;

				case MixOperation:
					envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
					break;

				case AddOperation:
					envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
					break;

			}

		}

		var gammaFactorDefine = ( renderer.gammaFactor > 0 ) ? renderer.gammaFactor : 1.0;

		// console.log( 'building new program ' );

		//

		var customExtensions = capabilities.isWebGL2 ? '' : generateExtensions( material.extensions, parameters, extensions );

		var customDefines = generateDefines( defines );

		//

		var program = gl.createProgram();

		var prefixVertex, prefixFragment;

		if ( material.isRawShaderMaterial ) {

			prefixVertex = [

				customDefines

			].filter( filterEmptyLine ).join( '\n' );

			if ( prefixVertex.length > 0 ) {

				prefixVertex += '\n';

			}

			prefixFragment = [

				customExtensions,
				customDefines

			].filter( filterEmptyLine ).join( '\n' );

			if ( prefixFragment.length > 0 ) {

				prefixFragment += '\n';

			}

		} else {

			prefixVertex = [

				'precision ' + parameters.precision + ' float;',
				'precision ' + parameters.precision + ' int;',

				'#define SHADER_NAME ' + shader.name,

				customDefines,

				parameters.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '',

				'#define GAMMA_FACTOR ' + gammaFactorDefine,

				'#define MAX_BONES ' + parameters.maxBones,
				( parameters.useFog && parameters.fog ) ? '#define USE_FOG' : '',
				( parameters.useFog && parameters.fogExp ) ? '#define FOG_EXP2' : '',

				parameters.map ? '#define USE_MAP' : '',
				parameters.envMap ? '#define USE_ENVMAP' : '',
				parameters.envMap ? '#define ' + envMapModeDefine : '',
				parameters.lightMap ? '#define USE_LIGHTMAP' : '',
				parameters.aoMap ? '#define USE_AOMAP' : '',
				parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
				parameters.bumpMap ? '#define USE_BUMPMAP' : '',
				parameters.normalMap ? '#define USE_NORMALMAP' : '',
				( parameters.normalMap && parameters.objectSpaceNormalMap ) ? '#define OBJECTSPACE_NORMALMAP' : '',
				parameters.displacementMap && parameters.supportsVertexTextures ? '#define USE_DISPLACEMENTMAP' : '',
				parameters.specularMap ? '#define USE_SPECULARMAP' : '',
				parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
				parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
				parameters.alphaMap ? '#define USE_ALPHAMAP' : '',

				parameters.vertexTangents ? '#define USE_TANGENT' : '',
				parameters.vertexColors ? '#define USE_COLOR' : '',

				parameters.flatShading ? '#define FLAT_SHADED' : '',

				parameters.skinning ? '#define USE_SKINNING' : '',
				parameters.useVertexTexture ? '#define BONE_TEXTURE' : '',

				parameters.morphTargets ? '#define USE_MORPHTARGETS' : '',
				parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '',
				parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
				parameters.flipSided ? '#define FLIP_SIDED' : '',

				parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
				parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

				parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',

				parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
				parameters.logarithmicDepthBuffer && ( capabilities.isWebGL2 || extensions.get( 'EXT_frag_depth' ) ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

				'uniform mat4 modelMatrix;',
				'uniform mat4 modelViewMatrix;',
				'uniform mat4 projectionMatrix;',
				'uniform mat4 viewMatrix;',
				'uniform mat3 normalMatrix;',
				'uniform vec3 cameraPosition;',

				'attribute vec3 position;',
				'attribute vec3 normal;',
				'attribute vec2 uv;',

				'#ifdef USE_TANGENT',

				'	attribute vec4 tangent;',

				'#endif',

				'#ifdef USE_COLOR',

				'	attribute vec3 color;',

				'#endif',

				'#ifdef USE_MORPHTARGETS',

				'	attribute vec3 morphTarget0;',
				'	attribute vec3 morphTarget1;',
				'	attribute vec3 morphTarget2;',
				'	attribute vec3 morphTarget3;',

				'	#ifdef USE_MORPHNORMALS',

				'		attribute vec3 morphNormal0;',
				'		attribute vec3 morphNormal1;',
				'		attribute vec3 morphNormal2;',
				'		attribute vec3 morphNormal3;',

				'	#else',

				'		attribute vec3 morphTarget4;',
				'		attribute vec3 morphTarget5;',
				'		attribute vec3 morphTarget6;',
				'		attribute vec3 morphTarget7;',

				'	#endif',

				'#endif',

				'#ifdef USE_SKINNING',

				'	attribute vec4 skinIndex;',
				'	attribute vec4 skinWeight;',

				'#endif',

				'\n'

			].filter( filterEmptyLine ).join( '\n' );

			prefixFragment = [

				customExtensions,

				'precision ' + parameters.precision + ' float;',
				'precision ' + parameters.precision + ' int;',

				'#define SHADER_NAME ' + shader.name,

				customDefines,

				parameters.alphaTest ? '#define ALPHATEST ' + parameters.alphaTest + ( parameters.alphaTest % 1 ? '' : '.0' ) : '', // add '.0' if integer

				'#define GAMMA_FACTOR ' + gammaFactorDefine,

				( parameters.useFog && parameters.fog ) ? '#define USE_FOG' : '',
				( parameters.useFog && parameters.fogExp ) ? '#define FOG_EXP2' : '',

				parameters.map ? '#define USE_MAP' : '',
				parameters.matcap ? '#define USE_MATCAP' : '',
				parameters.envMap ? '#define USE_ENVMAP' : '',
				parameters.envMap ? '#define ' + envMapTypeDefine : '',
				parameters.envMap ? '#define ' + envMapModeDefine : '',
				parameters.envMap ? '#define ' + envMapBlendingDefine : '',
				parameters.lightMap ? '#define USE_LIGHTMAP' : '',
				parameters.aoMap ? '#define USE_AOMAP' : '',
				parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
				parameters.bumpMap ? '#define USE_BUMPMAP' : '',
				parameters.normalMap ? '#define USE_NORMALMAP' : '',
				( parameters.normalMap && parameters.objectSpaceNormalMap ) ? '#define OBJECTSPACE_NORMALMAP' : '',
				parameters.specularMap ? '#define USE_SPECULARMAP' : '',
				parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
				parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
				parameters.alphaMap ? '#define USE_ALPHAMAP' : '',

				parameters.vertexTangents ? '#define USE_TANGENT' : '',
				parameters.vertexColors ? '#define USE_COLOR' : '',

				parameters.gradientMap ? '#define USE_GRADIENTMAP' : '',

				parameters.flatShading ? '#define FLAT_SHADED' : '',

				parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
				parameters.flipSided ? '#define FLIP_SIDED' : '',

				parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
				parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

				parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',

				parameters.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',

				parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
				parameters.logarithmicDepthBuffer && ( capabilities.isWebGL2 || extensions.get( 'EXT_frag_depth' ) ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

				parameters.envMap && ( capabilities.isWebGL2 || extensions.get( 'EXT_shader_texture_lod' ) ) ? '#define TEXTURE_LOD_EXT' : '',

				'uniform mat4 viewMatrix;',
				'uniform vec3 cameraPosition;',

				( parameters.toneMapping !== NoToneMapping ) ? '#define TONE_MAPPING' : '',
				( parameters.toneMapping !== NoToneMapping ) ? ShaderChunk[ 'tonemapping_pars_fragment' ] : '', // this code is required here because it is used by the toneMapping() function defined below
				( parameters.toneMapping !== NoToneMapping ) ? getToneMappingFunction( 'toneMapping', parameters.toneMapping ) : '',

				parameters.dithering ? '#define DITHERING' : '',

				( parameters.outputEncoding || parameters.mapEncoding || parameters.matcapEncoding || parameters.envMapEncoding || parameters.emissiveMapEncoding ) ?
					ShaderChunk[ 'encodings_pars_fragment' ] : '', // this code is required here because it is used by the various encoding/decoding function defined below
				parameters.mapEncoding ? getTexelDecodingFunction( 'mapTexelToLinear', parameters.mapEncoding ) : '',
				parameters.matcapEncoding ? getTexelDecodingFunction( 'matcapTexelToLinear', parameters.matcapEncoding ) : '',
				parameters.envMapEncoding ? getTexelDecodingFunction( 'envMapTexelToLinear', parameters.envMapEncoding ) : '',
				parameters.emissiveMapEncoding ? getTexelDecodingFunction( 'emissiveMapTexelToLinear', parameters.emissiveMapEncoding ) : '',
				parameters.outputEncoding ? getTexelEncodingFunction( 'linearToOutputTexel', parameters.outputEncoding ) : '',

				parameters.depthPacking ? '#define DEPTH_PACKING ' + material.depthPacking : '',

				'\n'

			].filter( filterEmptyLine ).join( '\n' );

		}

		vertexShader = parseIncludes( vertexShader );
		vertexShader = replaceLightNums( vertexShader, parameters );
		vertexShader = replaceClippingPlaneNums( vertexShader, parameters );

		fragmentShader = parseIncludes( fragmentShader );
		fragmentShader = replaceLightNums( fragmentShader, parameters );
		fragmentShader = replaceClippingPlaneNums( fragmentShader, parameters );

		vertexShader = unrollLoops( vertexShader );
		fragmentShader = unrollLoops( fragmentShader );

		if ( capabilities.isWebGL2 && ! material.isRawShaderMaterial ) {

			var isGLSL3ShaderMaterial = false;

			var versionRegex = /^\s*#version\s+300\s+es\s*\n/;

			if ( material.isShaderMaterial &&
				vertexShader.match( versionRegex ) !== null &&
				fragmentShader.match( versionRegex ) !== null ) {

				isGLSL3ShaderMaterial = true;

				vertexShader = vertexShader.replace( versionRegex, '' );
				fragmentShader = fragmentShader.replace( versionRegex, '' );

			}

			// GLSL 3.0 conversion
			prefixVertex = [
				'#version 300 es\n',
				'#define attribute in',
				'#define varying out',
				'#define texture2D texture'
			].join( '\n' ) + '\n' + prefixVertex;

			prefixFragment = [
				'#version 300 es\n',
				'#define varying in',
				isGLSL3ShaderMaterial ? '' : 'out highp vec4 pc_fragColor;',
				isGLSL3ShaderMaterial ? '' : '#define gl_FragColor pc_fragColor',
				'#define gl_FragDepthEXT gl_FragDepth',
				'#define texture2D texture',
				'#define textureCube texture',
				'#define texture2DProj textureProj',
				'#define texture2DLodEXT textureLod',
				'#define texture2DProjLodEXT textureProjLod',
				'#define textureCubeLodEXT textureLod',
				'#define texture2DGradEXT textureGrad',
				'#define texture2DProjGradEXT textureProjGrad',
				'#define textureCubeGradEXT textureGrad'
			].join( '\n' ) + '\n' + prefixFragment;

		}

		var vertexGlsl = prefixVertex + vertexShader;
		var fragmentGlsl = prefixFragment + fragmentShader;

		// console.log( '*VERTEX*', vertexGlsl );
		// console.log( '*FRAGMENT*', fragmentGlsl );

		var glVertexShader = WebGLShader( gl, 35633, vertexGlsl );
		var glFragmentShader = WebGLShader( gl, 35632, fragmentGlsl );

		gl.attachShader( program, glVertexShader );
		gl.attachShader( program, glFragmentShader );

		// Force a particular attribute to index 0.

		if ( material.index0AttributeName !== undefined ) {

			gl.bindAttribLocation( program, 0, material.index0AttributeName );

		} else if ( parameters.morphTargets === true ) {

			// programs with morphTargets displace position out of attribute 0
			gl.bindAttribLocation( program, 0, 'position' );

		}

		gl.linkProgram( program );

		var programLog = gl.getProgramInfoLog( program ).trim();
		var vertexLog = gl.getShaderInfoLog( glVertexShader ).trim();
		var fragmentLog = gl.getShaderInfoLog( glFragmentShader ).trim();

		var runnable = true;
		var haveDiagnostics = true;

		// console.log( '**VERTEX**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glVertexShader ) );
		// console.log( '**FRAGMENT**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glFragmentShader ) );

		if ( gl.getProgramParameter( program, 35714 ) === false ) {

			runnable = false;

			console.error( 'THREE.WebGLProgram: shader error: ', gl.getError(), '35715', gl.getProgramParameter( program, 35715 ), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog );

		} else if ( programLog !== '' ) {

			console.warn( 'THREE.WebGLProgram: gl.getProgramInfoLog()', programLog );

		} else if ( vertexLog === '' || fragmentLog === '' ) {

			haveDiagnostics = false;

		}

		if ( haveDiagnostics ) {

			this.diagnostics = {

				runnable: runnable,
				material: material,

				programLog: programLog,

				vertexShader: {

					log: vertexLog,
					prefix: prefixVertex

				},

				fragmentShader: {

					log: fragmentLog,
					prefix: prefixFragment

				}

			};

		}

		// clean up

		gl.deleteShader( glVertexShader );
		gl.deleteShader( glFragmentShader );

		// set up caching for uniform locations

		var cachedUniforms;

		this.getUniforms = function () {

			if ( cachedUniforms === undefined ) {

				cachedUniforms = new WebGLUniforms( gl, program, renderer );

			}

			return cachedUniforms;

		};

		// set up caching for attribute locations

		var cachedAttributes;

		this.getAttributes = function () {

			if ( cachedAttributes === undefined ) {

				cachedAttributes = fetchAttributeLocations( gl, program );

			}

			return cachedAttributes;

		};

		// free resource

		this.destroy = function () {

			gl.deleteProgram( program );
			this.program = undefined;

		};

		// DEPRECATED

		Object.defineProperties( this, {

			uniforms: {
				get: function () {

					console.warn( 'THREE.WebGLProgram: .uniforms is now .getUniforms().' );
					return this.getUniforms();

				}
			},

			attributes: {
				get: function () {

					console.warn( 'THREE.WebGLProgram: .attributes is now .getAttributes().' );
					return this.getAttributes();

				}
			}

		} );


		//

		this.name = shader.name;
		this.id = programIdCount ++;
		this.code = code;
		this.usedTimes = 1;
		this.program = program;
		this.vertexShader = glVertexShader;
		this.fragmentShader = glFragmentShader;

		return this;

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLPrograms( renderer, extensions, capabilities ) {

		var programs = [];

		var shaderIDs = {
			MeshDepthMaterial: 'depth',
			MeshDistanceMaterial: 'distanceRGBA',
			MeshNormalMaterial: 'normal',
			MeshBasicMaterial: 'basic',
			MeshLambertMaterial: 'lambert',
			MeshPhongMaterial: 'phong',
			MeshToonMaterial: 'phong',
			MeshStandardMaterial: 'physical',
			MeshPhysicalMaterial: 'physical',
			MeshMatcapMaterial: 'matcap',
			LineBasicMaterial: 'basic',
			LineDashedMaterial: 'dashed',
			PointsMaterial: 'points',
			ShadowMaterial: 'shadow',
			SpriteMaterial: 'sprite'
		};

		var parameterNames = [
			"precision", "supportsVertexTextures", "map", "mapEncoding", "matcap", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding",
			"lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "displacementMap", "specularMap",
			"roughnessMap", "metalnessMap", "gradientMap",
			"alphaMap", "combine", "vertexColors", "vertexTangents", "fog", "useFog", "fogExp",
			"flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning",
			"maxBones", "useVertexTexture", "morphTargets", "morphNormals",
			"maxMorphTargets", "maxMorphNormals", "premultipliedAlpha",
			"numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights",
			"shadowMapEnabled", "shadowMapType", "toneMapping", 'physicallyCorrectLights',
			"alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering"
		];


		function allocateBones( object ) {

			var skeleton = object.skeleton;
			var bones = skeleton.bones;

			if ( capabilities.floatVertexTextures ) {

				return 1024;

			} else {

				// default for when object is not specified
				// ( for example when prebuilding shader to be used with multiple objects )
				//
				//  - leave some extra space for other uniforms
				//  - limit here is ANGLE's 254 max uniform vectors
				//    (up to 54 should be safe)

				var nVertexUniforms = capabilities.maxVertexUniforms;
				var nVertexMatrices = Math.floor( ( nVertexUniforms - 20 ) / 4 );

				var maxBones = Math.min( nVertexMatrices, bones.length );

				if ( maxBones < bones.length ) {

					console.warn( 'THREE.WebGLRenderer: Skeleton has ' + bones.length + ' bones. This GPU supports ' + maxBones + '.' );
					return 0;

				}

				return maxBones;

			}

		}

		function getTextureEncodingFromMap( map, gammaOverrideLinear ) {

			var encoding;

			if ( ! map ) {

				encoding = LinearEncoding;

			} else if ( map.isTexture ) {

				encoding = map.encoding;

			} else if ( map.isWebGLRenderTarget ) {

				console.warn( "THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead." );
				encoding = map.texture.encoding;

			}

			// add backwards compatibility for WebGLRenderer.gammaInput/gammaOutput parameter, should probably be removed at some point.
			if ( encoding === LinearEncoding && gammaOverrideLinear ) {

				encoding = GammaEncoding;

			}

			return encoding;

		}

		this.getParameters = function ( material, lights, shadows, fog, nClipPlanes, nClipIntersection, object ) {

			var shaderID = shaderIDs[ material.type ];

			// heuristics to create shader parameters according to lights in the scene
			// (not to blow over maxLights budget)

			var maxBones = object.isSkinnedMesh ? allocateBones( object ) : 0;
			var precision = capabilities.precision;

			if ( material.precision !== null ) {

				precision = capabilities.getMaxPrecision( material.precision );

				if ( precision !== material.precision ) {

					console.warn( 'THREE.WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.' );

				}

			}

			var currentRenderTarget = renderer.getRenderTarget();

			var parameters = {

				shaderID: shaderID,

				precision: precision,
				supportsVertexTextures: capabilities.vertexTextures,
				outputEncoding: getTextureEncodingFromMap( ( ! currentRenderTarget ) ? null : currentRenderTarget.texture, renderer.gammaOutput ),
				map: !! material.map,
				mapEncoding: getTextureEncodingFromMap( material.map, renderer.gammaInput ),
				matcap: !! material.matcap,
				matcapEncoding: getTextureEncodingFromMap( material.matcap, renderer.gammaInput ),
				envMap: !! material.envMap,
				envMapMode: material.envMap && material.envMap.mapping,
				envMapEncoding: getTextureEncodingFromMap( material.envMap, renderer.gammaInput ),
				envMapCubeUV: ( !! material.envMap ) && ( ( material.envMap.mapping === CubeUVReflectionMapping ) || ( material.envMap.mapping === CubeUVRefractionMapping ) ),
				lightMap: !! material.lightMap,
				aoMap: !! material.aoMap,
				emissiveMap: !! material.emissiveMap,
				emissiveMapEncoding: getTextureEncodingFromMap( material.emissiveMap, renderer.gammaInput ),
				bumpMap: !! material.bumpMap,
				normalMap: !! material.normalMap,
				objectSpaceNormalMap: material.normalMapType === ObjectSpaceNormalMap,
				displacementMap: !! material.displacementMap,
				roughnessMap: !! material.roughnessMap,
				metalnessMap: !! material.metalnessMap,
				specularMap: !! material.specularMap,
				alphaMap: !! material.alphaMap,

				gradientMap: !! material.gradientMap,

				combine: material.combine,

				vertexTangents: ( material.normalMap && material.vertexTangents ),
				vertexColors: material.vertexColors,

				fog: !! fog,
				useFog: material.fog,
				fogExp: ( fog && fog.isFogExp2 ),

				flatShading: material.flatShading,

				sizeAttenuation: material.sizeAttenuation,
				logarithmicDepthBuffer: capabilities.logarithmicDepthBuffer,

				skinning: material.skinning && maxBones > 0,
				maxBones: maxBones,
				useVertexTexture: capabilities.floatVertexTextures,

				morphTargets: material.morphTargets,
				morphNormals: material.morphNormals,
				maxMorphTargets: renderer.maxMorphTargets,
				maxMorphNormals: renderer.maxMorphNormals,

				numDirLights: lights.directional.length,
				numPointLights: lights.point.length,
				numSpotLights: lights.spot.length,
				numRectAreaLights: lights.rectArea.length,
				numHemiLights: lights.hemi.length,

				numClippingPlanes: nClipPlanes,
				numClipIntersection: nClipIntersection,

				dithering: material.dithering,

				shadowMapEnabled: renderer.shadowMap.enabled && object.receiveShadow && shadows.length > 0,
				shadowMapType: renderer.shadowMap.type,

				toneMapping: renderer.toneMapping,
				physicallyCorrectLights: renderer.physicallyCorrectLights,

				premultipliedAlpha: material.premultipliedAlpha,

				alphaTest: material.alphaTest,
				doubleSided: material.side === DoubleSide,
				flipSided: material.side === BackSide,

				depthPacking: ( material.depthPacking !== undefined ) ? material.depthPacking : false

			};

			return parameters;

		};

		this.getProgramCode = function ( material, parameters ) {

			var array = [];

			if ( parameters.shaderID ) {

				array.push( parameters.shaderID );

			} else {

				array.push( material.fragmentShader );
				array.push( material.vertexShader );

			}

			if ( material.defines !== undefined ) {

				for ( var name in material.defines ) {

					array.push( name );
					array.push( material.defines[ name ] );

				}

			}

			for ( var i = 0; i < parameterNames.length; i ++ ) {

				array.push( parameters[ parameterNames[ i ] ] );

			}

			array.push( material.onBeforeCompile.toString() );

			array.push( renderer.gammaOutput );

			array.push( renderer.gammaFactor );

			return array.join();

		};

		this.acquireProgram = function ( material, shader, parameters, code ) {

			var program;

			// Check if code has been already compiled
			for ( var p = 0, pl = programs.length; p < pl; p ++ ) {

				var programInfo = programs[ p ];

				if ( programInfo.code === code ) {

					program = programInfo;
					++ program.usedTimes;

					break;

				}

			}

			if ( program === undefined ) {

				program = new WebGLProgram( renderer, extensions, code, material, shader, parameters, capabilities );
				programs.push( program );

			}

			return program;

		};

		this.releaseProgram = function ( program ) {

			if ( -- program.usedTimes === 0 ) {

				// Remove from unordered set
				var i = programs.indexOf( program );
				programs[ i ] = programs[ programs.length - 1 ];
				programs.pop();

				// Free WebGL resources
				program.destroy();

			}

		};

		// Exposed for resource monitoring & error feedback via renderer.info:
		this.programs = programs;

	}

	/**
	 * @author fordacious / fordacious.github.io
	 */

	function WebGLProperties() {

		var properties = new WeakMap();

		function get( object ) {

			var map = properties.get( object );

			if ( map === undefined ) {

				map = {};
				properties.set( object, map );

			}

			return map;

		}

		function remove( object ) {

			properties.delete( object );

		}

		function update( object, key, value ) {

			properties.get( object )[ key ] = value;

		}

		function dispose() {

			properties = new WeakMap();

		}

		return {
			get: get,
			remove: remove,
			update: update,
			dispose: dispose
		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function painterSortStable( a, b ) {

		if ( a.groupOrder !== b.groupOrder ) {

			return a.groupOrder - b.groupOrder;

		} else if ( a.renderOrder !== b.renderOrder ) {

			return a.renderOrder - b.renderOrder;

		} else if ( a.program && b.program && a.program !== b.program ) {

			return a.program.id - b.program.id;

		} else if ( a.material.id !== b.material.id ) {

			return a.material.id - b.material.id;

		} else if ( a.z !== b.z ) {

			return a.z - b.z;

		} else {

			return a.id - b.id;

		}

	}

	function reversePainterSortStable( a, b ) {

		if ( a.groupOrder !== b.groupOrder ) {

			return a.groupOrder - b.groupOrder;

		} else if ( a.renderOrder !== b.renderOrder ) {

			return a.renderOrder - b.renderOrder;

		} else if ( a.z !== b.z ) {

			return b.z - a.z;

		} else {

			return a.id - b.id;

		}

	}


	function WebGLRenderList() {

		var renderItems = [];
		var renderItemsIndex = 0;

		var opaque = [];
		var transparent = [];

		function init() {

			renderItemsIndex = 0;

			opaque.length = 0;
			transparent.length = 0;

		}

		function getNextRenderItem( object, geometry, material, groupOrder, z, group ) {

			var renderItem = renderItems[ renderItemsIndex ];

			if ( renderItem === undefined ) {

				renderItem = {
					id: object.id,
					object: object,
					geometry: geometry,
					material: material,
					program: material.program,
					groupOrder: groupOrder,
					renderOrder: object.renderOrder,
					z: z,
					group: group
				};

				renderItems[ renderItemsIndex ] = renderItem;

			} else {

				renderItem.id = object.id;
				renderItem.object = object;
				renderItem.geometry = geometry;
				renderItem.material = material;
				renderItem.program = material.program;
				renderItem.groupOrder = groupOrder;
				renderItem.renderOrder = object.renderOrder;
				renderItem.z = z;
				renderItem.group = group;

			}

			renderItemsIndex ++;

			return renderItem;

		}

		function push( object, geometry, material, groupOrder, z, group ) {

			var renderItem = getNextRenderItem( object, geometry, material, groupOrder, z, group );

			( material.transparent === true ? transparent : opaque ).push( renderItem );

		}

		function unshift( object, geometry, material, groupOrder, z, group ) {

			var renderItem = getNextRenderItem( object, geometry, material, groupOrder, z, group );

			( material.transparent === true ? transparent : opaque ).unshift( renderItem );

		}

		function sort() {

			if ( opaque.length > 1 ) opaque.sort( painterSortStable );
			if ( transparent.length > 1 ) transparent.sort( reversePainterSortStable );

		}

		return {
			opaque: opaque,
			transparent: transparent,

			init: init,
			push: push,
			unshift: unshift,

			sort: sort
		};

	}

	function WebGLRenderLists() {

		var lists = {};

		function onSceneDispose( event ) {

			var scene = event.target;

			scene.removeEventListener( 'dispose', onSceneDispose );

			delete lists[ scene.id ];

		}

		function get( scene, camera ) {

			var cameras = lists[ scene.id ];
			var list;
			if ( cameras === undefined ) {

				list = new WebGLRenderList();
				lists[ scene.id ] = {};
				lists[ scene.id ][ camera.id ] = list;

				scene.addEventListener( 'dispose', onSceneDispose );

			} else {

				list = cameras[ camera.id ];
				if ( list === undefined ) {

					list = new WebGLRenderList();
					cameras[ camera.id ] = list;

				}

			}

			return list;

		}

		function dispose() {

			lists = {};

		}

		return {
			get: get,
			dispose: dispose
		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function UniformsCache() {

		var lights = {};

		return {

			get: function ( light ) {

				if ( lights[ light.id ] !== undefined ) {

					return lights[ light.id ];

				}

				var uniforms;

				switch ( light.type ) {

					case 'DirectionalLight':
						uniforms = {
							direction: new Vector3(),
							color: new Color(),

							shadow: false,
							shadowBias: 0,
							shadowRadius: 1,
							shadowMapSize: new Vector2()
						};
						break;

					case 'SpotLight':
						uniforms = {
							position: new Vector3(),
							direction: new Vector3(),
							color: new Color(),
							distance: 0,
							coneCos: 0,
							penumbraCos: 0,
							decay: 0,

							shadow: false,
							shadowBias: 0,
							shadowRadius: 1,
							shadowMapSize: new Vector2()
						};
						break;

					case 'PointLight':
						uniforms = {
							position: new Vector3(),
							color: new Color(),
							distance: 0,
							decay: 0,

							shadow: false,
							shadowBias: 0,
							shadowRadius: 1,
							shadowMapSize: new Vector2(),
							shadowCameraNear: 1,
							shadowCameraFar: 1000
						};
						break;

					case 'HemisphereLight':
						uniforms = {
							direction: new Vector3(),
							skyColor: new Color(),
							groundColor: new Color()
						};
						break;

					case 'RectAreaLight':
						uniforms = {
							color: new Color(),
							position: new Vector3(),
							halfWidth: new Vector3(),
							halfHeight: new Vector3()
							// TODO (abelnation): set RectAreaLight shadow uniforms
						};
						break;

				}

				lights[ light.id ] = uniforms;

				return uniforms;

			}

		};

	}

	var count = 0;

	function WebGLLights() {

		var cache = new UniformsCache();

		var state = {

			id: count ++,

			hash: {
				stateID: - 1,
				directionalLength: - 1,
				pointLength: - 1,
				spotLength: - 1,
				rectAreaLength: - 1,
				hemiLength: - 1,
				shadowsLength: - 1
			},

			ambient: [ 0, 0, 0 ],
			directional: [],
			directionalShadowMap: [],
			directionalShadowMatrix: [],
			spot: [],
			spotShadowMap: [],
			spotShadowMatrix: [],
			rectArea: [],
			point: [],
			pointShadowMap: [],
			pointShadowMatrix: [],
			hemi: []

		};

		var vector3 = new Vector3();
		var matrix4 = new Matrix4();
		var matrix42 = new Matrix4();

		function setup( lights, shadows, camera ) {

			var r = 0, g = 0, b = 0;

			var directionalLength = 0;
			var pointLength = 0;
			var spotLength = 0;
			var rectAreaLength = 0;
			var hemiLength = 0;

			var viewMatrix = camera.matrixWorldInverse;

			for ( var i = 0, l = lights.length; i < l; i ++ ) {

				var light = lights[ i ];

				var color = light.color;
				var intensity = light.intensity;
				var distance = light.distance;

				var shadowMap = ( light.shadow && light.shadow.map ) ? light.shadow.map.texture : null;

				if ( light.isAmbientLight ) {

					r += color.r * intensity;
					g += color.g * intensity;
					b += color.b * intensity;

				} else if ( light.isDirectionalLight ) {

					var uniforms = cache.get( light );

					uniforms.color.copy( light.color ).multiplyScalar( light.intensity );
					uniforms.direction.setFromMatrixPosition( light.matrixWorld );
					vector3.setFromMatrixPosition( light.target.matrixWorld );
					uniforms.direction.sub( vector3 );
					uniforms.direction.transformDirection( viewMatrix );

					uniforms.shadow = light.castShadow;

					if ( light.castShadow ) {

						var shadow = light.shadow;

						uniforms.shadowBias = shadow.bias;
						uniforms.shadowRadius = shadow.radius;
						uniforms.shadowMapSize = shadow.mapSize;

					}

					state.directionalShadowMap[ directionalLength ] = shadowMap;
					state.directionalShadowMatrix[ directionalLength ] = light.shadow.matrix;
					state.directional[ directionalLength ] = uniforms;

					directionalLength ++;

				} else if ( light.isSpotLight ) {

					var uniforms = cache.get( light );

					uniforms.position.setFromMatrixPosition( light.matrixWorld );
					uniforms.position.applyMatrix4( viewMatrix );

					uniforms.color.copy( color ).multiplyScalar( intensity );
					uniforms.distance = distance;

					uniforms.direction.setFromMatrixPosition( light.matrixWorld );
					vector3.setFromMatrixPosition( light.target.matrixWorld );
					uniforms.direction.sub( vector3 );
					uniforms.direction.transformDirection( viewMatrix );

					uniforms.coneCos = Math.cos( light.angle );
					uniforms.penumbraCos = Math.cos( light.angle * ( 1 - light.penumbra ) );
					uniforms.decay = light.decay;

					uniforms.shadow = light.castShadow;

					if ( light.castShadow ) {

						var shadow = light.shadow;

						uniforms.shadowBias = shadow.bias;
						uniforms.shadowRadius = shadow.radius;
						uniforms.shadowMapSize = shadow.mapSize;

					}

					state.spotShadowMap[ spotLength ] = shadowMap;
					state.spotShadowMatrix[ spotLength ] = light.shadow.matrix;
					state.spot[ spotLength ] = uniforms;

					spotLength ++;

				} else if ( light.isRectAreaLight ) {

					var uniforms = cache.get( light );

					// (a) intensity is the total visible light emitted
					//uniforms.color.copy( color ).multiplyScalar( intensity / ( light.width * light.height * Math.PI ) );

					// (b) intensity is the brightness of the light
					uniforms.color.copy( color ).multiplyScalar( intensity );

					uniforms.position.setFromMatrixPosition( light.matrixWorld );
					uniforms.position.applyMatrix4( viewMatrix );

					// extract local rotation of light to derive width/height half vectors
					matrix42.identity();
					matrix4.copy( light.matrixWorld );
					matrix4.premultiply( viewMatrix );
					matrix42.extractRotation( matrix4 );

					uniforms.halfWidth.set( light.width * 0.5, 0.0, 0.0 );
					uniforms.halfHeight.set( 0.0, light.height * 0.5, 0.0 );

					uniforms.halfWidth.applyMatrix4( matrix42 );
					uniforms.halfHeight.applyMatrix4( matrix42 );

					// TODO (abelnation): RectAreaLight distance?
					// uniforms.distance = distance;

					state.rectArea[ rectAreaLength ] = uniforms;

					rectAreaLength ++;

				} else if ( light.isPointLight ) {

					var uniforms = cache.get( light );

					uniforms.position.setFromMatrixPosition( light.matrixWorld );
					uniforms.position.applyMatrix4( viewMatrix );

					uniforms.color.copy( light.color ).multiplyScalar( light.intensity );
					uniforms.distance = light.distance;
					uniforms.decay = light.decay;

					uniforms.shadow = light.castShadow;

					if ( light.castShadow ) {

						var shadow = light.shadow;

						uniforms.shadowBias = shadow.bias;
						uniforms.shadowRadius = shadow.radius;
						uniforms.shadowMapSize = shadow.mapSize;
						uniforms.shadowCameraNear = shadow.camera.near;
						uniforms.shadowCameraFar = shadow.camera.far;

					}

					state.pointShadowMap[ pointLength ] = shadowMap;
					state.pointShadowMatrix[ pointLength ] = light.shadow.matrix;
					state.point[ pointLength ] = uniforms;

					pointLength ++;

				} else if ( light.isHemisphereLight ) {

					var uniforms = cache.get( light );

					uniforms.direction.setFromMatrixPosition( light.matrixWorld );
					uniforms.direction.transformDirection( viewMatrix );
					uniforms.direction.normalize();

					uniforms.skyColor.copy( light.color ).multiplyScalar( intensity );
					uniforms.groundColor.copy( light.groundColor ).multiplyScalar( intensity );

					state.hemi[ hemiLength ] = uniforms;

					hemiLength ++;

				}

			}

			state.ambient[ 0 ] = r;
			state.ambient[ 1 ] = g;
			state.ambient[ 2 ] = b;

			state.directional.length = directionalLength;
			state.spot.length = spotLength;
			state.rectArea.length = rectAreaLength;
			state.point.length = pointLength;
			state.hemi.length = hemiLength;

			state.hash.stateID = state.id;
			state.hash.directionalLength = directionalLength;
			state.hash.pointLength = pointLength;
			state.hash.spotLength = spotLength;
			state.hash.rectAreaLength = rectAreaLength;
			state.hash.hemiLength = hemiLength;
			state.hash.shadowsLength = shadows.length;

		}

		return {
			setup: setup,
			state: state
		};

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	function WebGLRenderState() {

		var lights = new WebGLLights();

		var lightsArray = [];
		var shadowsArray = [];

		function init() {

			lightsArray.length = 0;
			shadowsArray.length = 0;

		}

		function pushLight( light ) {

			lightsArray.push( light );

		}

		function pushShadow( shadowLight ) {

			shadowsArray.push( shadowLight );

		}

		function setupLights( camera ) {

			lights.setup( lightsArray, shadowsArray, camera );

		}

		var state = {
			lightsArray: lightsArray,
			shadowsArray: shadowsArray,

			lights: lights
		};

		return {
			init: init,
			state: state,
			setupLights: setupLights,

			pushLight: pushLight,
			pushShadow: pushShadow
		};

	}

	function WebGLRenderStates() {

		var renderStates = {};

		function onSceneDispose( event ) {

			var scene = event.target;

			scene.removeEventListener( 'dispose', onSceneDispose );

			delete renderStates[ scene.id ];

		}

		function get( scene, camera ) {

			var renderState;

			if ( renderStates[ scene.id ] === undefined ) {

				renderState = new WebGLRenderState();
				renderStates[ scene.id ] = {};
				renderStates[ scene.id ][ camera.id ] = renderState;

				scene.addEventListener( 'dispose', onSceneDispose );

			} else {

				if ( renderStates[ scene.id ][ camera.id ] === undefined ) {

					renderState = new WebGLRenderState();
					renderStates[ scene.id ][ camera.id ] = renderState;

				} else {

					renderState = renderStates[ scene.id ][ camera.id ];

				}

			}

			return renderState;

		}

		function dispose() {

			renderStates = {};

		}

		return {
			get: get,
			dispose: dispose
		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author bhouston / https://clara.io
	 * @author WestLangley / http://github.com/WestLangley
	 *
	 * parameters = {
	 *
	 *  opacity: <float>,
	 *
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  displacementMap: new THREE.Texture( <Image> ),
	 *  displacementScale: <float>,
	 *  displacementBias: <float>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>
	 * }
	 */

	function MeshDepthMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshDepthMaterial';

		this.depthPacking = BasicDepthPacking;

		this.skinning = false;
		this.morphTargets = false;

		this.map = null;

		this.alphaMap = null;

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.wireframe = false;
		this.wireframeLinewidth = 1;

		this.fog = false;
		this.lights = false;

		this.setValues( parameters );

	}

	MeshDepthMaterial.prototype = Object.create( Material.prototype );
	MeshDepthMaterial.prototype.constructor = MeshDepthMaterial;

	MeshDepthMaterial.prototype.isMeshDepthMaterial = true;

	MeshDepthMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.depthPacking = source.depthPacking;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		this.map = source.map;

		this.alphaMap = source.alphaMap;

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;

		return this;

	};

	/**
	 * @author WestLangley / http://github.com/WestLangley
	 *
	 * parameters = {
	 *
	 *  referencePosition: <float>,
	 *  nearDistance: <float>,
	 *  farDistance: <float>,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  displacementMap: new THREE.Texture( <Image> ),
	 *  displacementScale: <float>,
	 *  displacementBias: <float>
	 *
	 * }
	 */

	function MeshDistanceMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshDistanceMaterial';

		this.referencePosition = new Vector3();
		this.nearDistance = 1;
		this.farDistance = 1000;

		this.skinning = false;
		this.morphTargets = false;

		this.map = null;

		this.alphaMap = null;

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.fog = false;
		this.lights = false;

		this.setValues( parameters );

	}

	MeshDistanceMaterial.prototype = Object.create( Material.prototype );
	MeshDistanceMaterial.prototype.constructor = MeshDistanceMaterial;

	MeshDistanceMaterial.prototype.isMeshDistanceMaterial = true;

	MeshDistanceMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.referencePosition.copy( source.referencePosition );
		this.nearDistance = source.nearDistance;
		this.farDistance = source.farDistance;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		this.map = source.map;

		this.alphaMap = source.alphaMap;

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		return this;

	};

	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLShadowMap( _renderer, _objects, maxTextureSize ) {

		var _frustum = new Frustum(),
			_projScreenMatrix = new Matrix4(),

			_shadowMapSize = new Vector2(),
			_maxShadowMapSize = new Vector2( maxTextureSize, maxTextureSize ),

			_lookTarget = new Vector3(),
			_lightPositionWorld = new Vector3(),

			_MorphingFlag = 1,
			_SkinningFlag = 2,

			_NumberOfMaterialVariants = ( _MorphingFlag | _SkinningFlag ) + 1,

			_depthMaterials = new Array( _NumberOfMaterialVariants ),
			_distanceMaterials = new Array( _NumberOfMaterialVariants ),

			_materialCache = {};

		var shadowSide = { 0: BackSide, 1: FrontSide, 2: DoubleSide };

		var cubeDirections = [
			new Vector3( 1, 0, 0 ), new Vector3( - 1, 0, 0 ), new Vector3( 0, 0, 1 ),
			new Vector3( 0, 0, - 1 ), new Vector3( 0, 1, 0 ), new Vector3( 0, - 1, 0 )
		];

		var cubeUps = [
			new Vector3( 0, 1, 0 ), new Vector3( 0, 1, 0 ), new Vector3( 0, 1, 0 ),
			new Vector3( 0, 1, 0 ), new Vector3( 0, 0, 1 ),	new Vector3( 0, 0, - 1 )
		];

		var cube2DViewPorts = [
			new Vector4(), new Vector4(), new Vector4(),
			new Vector4(), new Vector4(), new Vector4()
		];

		// init

		for ( var i = 0; i !== _NumberOfMaterialVariants; ++ i ) {

			var useMorphing = ( i & _MorphingFlag ) !== 0;
			var useSkinning = ( i & _SkinningFlag ) !== 0;

			var depthMaterial = new MeshDepthMaterial( {

				depthPacking: RGBADepthPacking,

				morphTargets: useMorphing,
				skinning: useSkinning

			} );

			_depthMaterials[ i ] = depthMaterial;

			//

			var distanceMaterial = new MeshDistanceMaterial( {

				morphTargets: useMorphing,
				skinning: useSkinning

			} );

			_distanceMaterials[ i ] = distanceMaterial;

		}

		//

		var scope = this;

		this.enabled = false;

		this.autoUpdate = true;
		this.needsUpdate = false;

		this.type = PCFShadowMap;

		this.render = function ( lights, scene, camera ) {

			if ( scope.enabled === false ) return;
			if ( scope.autoUpdate === false && scope.needsUpdate === false ) return;

			if ( lights.length === 0 ) return;

			var currentRenderTarget = _renderer.getRenderTarget();

			var _state = _renderer.state;

			// Set GL state for depth map.
			_state.setBlending( NoBlending );
			_state.buffers.color.setClear( 1, 1, 1, 1 );
			_state.buffers.depth.setTest( true );
			_state.setScissorTest( false );

			// render depth map

			var faceCount;

			for ( var i = 0, il = lights.length; i < il; i ++ ) {

				var light = lights[ i ];
				var shadow = light.shadow;
				var isPointLight = light && light.isPointLight;

				if ( shadow === undefined ) {

					console.warn( 'THREE.WebGLShadowMap:', light, 'has no shadow.' );
					continue;

				}

				var shadowCamera = shadow.camera;

				_shadowMapSize.copy( shadow.mapSize );
				_shadowMapSize.min( _maxShadowMapSize );

				if ( isPointLight ) {

					var vpWidth = _shadowMapSize.x;
					var vpHeight = _shadowMapSize.y;

					// These viewports map a cube-map onto a 2D texture with the
					// following orientation:
					//
					//  xzXZ
					//   y Y
					//
					// X - Positive x direction
					// x - Negative x direction
					// Y - Positive y direction
					// y - Negative y direction
					// Z - Positive z direction
					// z - Negative z direction

					// positive X
					cube2DViewPorts[ 0 ].set( vpWidth * 2, vpHeight, vpWidth, vpHeight );
					// negative X
					cube2DViewPorts[ 1 ].set( 0, vpHeight, vpWidth, vpHeight );
					// positive Z
					cube2DViewPorts[ 2 ].set( vpWidth * 3, vpHeight, vpWidth, vpHeight );
					// negative Z
					cube2DViewPorts[ 3 ].set( vpWidth, vpHeight, vpWidth, vpHeight );
					// positive Y
					cube2DViewPorts[ 4 ].set( vpWidth * 3, 0, vpWidth, vpHeight );
					// negative Y
					cube2DViewPorts[ 5 ].set( vpWidth, 0, vpWidth, vpHeight );

					_shadowMapSize.x *= 4.0;
					_shadowMapSize.y *= 2.0;

				}

				if ( shadow.map === null ) {

					var pars = { minFilter: NearestFilter, magFilter: NearestFilter, format: RGBAFormat };

					shadow.map = new WebGLRenderTarget( _shadowMapSize.x, _shadowMapSize.y, pars );
					shadow.map.texture.name = light.name + ".shadowMap";

					shadowCamera.updateProjectionMatrix();

				}

				if ( shadow.isSpotLightShadow ) {

					shadow.update( light );

				}

				var shadowMap = shadow.map;
				var shadowMatrix = shadow.matrix;

				_lightPositionWorld.setFromMatrixPosition( light.matrixWorld );
				shadowCamera.position.copy( _lightPositionWorld );

				if ( isPointLight ) {

					faceCount = 6;

					// for point lights we set the shadow matrix to be a translation-only matrix
					// equal to inverse of the light's position

					shadowMatrix.makeTranslation( - _lightPositionWorld.x, - _lightPositionWorld.y, - _lightPositionWorld.z );

				} else {

					faceCount = 1;

					_lookTarget.setFromMatrixPosition( light.target.matrixWorld );
					shadowCamera.lookAt( _lookTarget );
					shadowCamera.updateMatrixWorld();

					// compute shadow matrix

					shadowMatrix.set(
						0.5, 0.0, 0.0, 0.5,
						0.0, 0.5, 0.0, 0.5,
						0.0, 0.0, 0.5, 0.5,
						0.0, 0.0, 0.0, 1.0
					);

					shadowMatrix.multiply( shadowCamera.projectionMatrix );
					shadowMatrix.multiply( shadowCamera.matrixWorldInverse );

				}

				_renderer.setRenderTarget( shadowMap );
				_renderer.clear();

				// render shadow map for each cube face (if omni-directional) or
				// run a single pass if not

				for ( var face = 0; face < faceCount; face ++ ) {

					if ( isPointLight ) {

						_lookTarget.copy( shadowCamera.position );
						_lookTarget.add( cubeDirections[ face ] );
						shadowCamera.up.copy( cubeUps[ face ] );
						shadowCamera.lookAt( _lookTarget );
						shadowCamera.updateMatrixWorld();

						var vpDimensions = cube2DViewPorts[ face ];
						_state.viewport( vpDimensions );

					}

					// update camera matrices and frustum

					_projScreenMatrix.multiplyMatrices( shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse );
					_frustum.setFromMatrix( _projScreenMatrix );

					// set object matrices & frustum culling

					renderObject( scene, camera, shadowCamera, isPointLight );

				}

			}

			scope.needsUpdate = false;

			_renderer.setRenderTarget( currentRenderTarget );

		};

		function getDepthMaterial( object, material, isPointLight, lightPositionWorld, shadowCameraNear, shadowCameraFar ) {

			var geometry = object.geometry;

			var result = null;

			var materialVariants = _depthMaterials;
			var customMaterial = object.customDepthMaterial;

			if ( isPointLight ) {

				materialVariants = _distanceMaterials;
				customMaterial = object.customDistanceMaterial;

			}

			if ( ! customMaterial ) {

				var useMorphing = false;

				if ( material.morphTargets ) {

					if ( geometry && geometry.isBufferGeometry ) {

						useMorphing = geometry.morphAttributes && geometry.morphAttributes.position && geometry.morphAttributes.position.length > 0;

					} else if ( geometry && geometry.isGeometry ) {

						useMorphing = geometry.morphTargets && geometry.morphTargets.length > 0;

					}

				}

				if ( object.isSkinnedMesh && material.skinning === false ) {

					console.warn( 'THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:', object );

				}

				var useSkinning = object.isSkinnedMesh && material.skinning;

				var variantIndex = 0;

				if ( useMorphing ) variantIndex |= _MorphingFlag;
				if ( useSkinning ) variantIndex |= _SkinningFlag;

				result = materialVariants[ variantIndex ];

			} else {

				result = customMaterial;

			}

			if ( _renderer.localClippingEnabled &&
					material.clipShadows === true &&
					material.clippingPlanes.length !== 0 ) {

				// in this case we need a unique material instance reflecting the
				// appropriate state

				var keyA = result.uuid, keyB = material.uuid;

				var materialsForVariant = _materialCache[ keyA ];

				if ( materialsForVariant === undefined ) {

					materialsForVariant = {};
					_materialCache[ keyA ] = materialsForVariant;

				}

				var cachedMaterial = materialsForVariant[ keyB ];

				if ( cachedMaterial === undefined ) {

					cachedMaterial = result.clone();
					materialsForVariant[ keyB ] = cachedMaterial;

				}

				result = cachedMaterial;

			}

			result.visible = material.visible;
			result.wireframe = material.wireframe;

			result.side = ( material.shadowSide != null ) ? material.shadowSide : shadowSide[ material.side ];

			result.clipShadows = material.clipShadows;
			result.clippingPlanes = material.clippingPlanes;
			result.clipIntersection = material.clipIntersection;

			result.wireframeLinewidth = material.wireframeLinewidth;
			result.linewidth = material.linewidth;

			if ( isPointLight && result.isMeshDistanceMaterial ) {

				result.referencePosition.copy( lightPositionWorld );
				result.nearDistance = shadowCameraNear;
				result.farDistance = shadowCameraFar;

			}

			return result;

		}

		function renderObject( object, camera, shadowCamera, isPointLight ) {

			if ( object.visible === false ) return;

			var visible = object.layers.test( camera.layers );

			if ( visible && ( object.isMesh || object.isLine || object.isPoints ) ) {

				if ( object.castShadow && ( ! object.frustumCulled || _frustum.intersectsObject( object ) ) ) {

					object.modelViewMatrix.multiplyMatrices( shadowCamera.matrixWorldInverse, object.matrixWorld );

					var geometry = _objects.update( object );
					var material = object.material;

					if ( Array.isArray( material ) ) {

						var groups = geometry.groups;

						for ( var k = 0, kl = groups.length; k < kl; k ++ ) {

							var group = groups[ k ];
							var groupMaterial = material[ group.materialIndex ];

							if ( groupMaterial && groupMaterial.visible ) {

								var depthMaterial = getDepthMaterial( object, groupMaterial, isPointLight, _lightPositionWorld, shadowCamera.near, shadowCamera.far );
								_renderer.renderBufferDirect( shadowCamera, null, geometry, depthMaterial, object, group );

							}

						}

					} else if ( material.visible ) {

						var depthMaterial = getDepthMaterial( object, material, isPointLight, _lightPositionWorld, shadowCamera.near, shadowCamera.far );
						_renderer.renderBufferDirect( shadowCamera, null, geometry, depthMaterial, object, null );

					}

				}

			}

			var children = object.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				renderObject( children[ i ], camera, shadowCamera, isPointLight );

			}

		}

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLState( gl, extensions, utils, capabilities ) {

		function ColorBuffer() {

			var locked = false;

			var color = new Vector4();
			var currentColorMask = null;
			var currentColorClear = new Vector4( 0, 0, 0, 0 );

			return {

				setMask: function ( colorMask ) {

					if ( currentColorMask !== colorMask && ! locked ) {

						gl.colorMask( colorMask, colorMask, colorMask, colorMask );
						currentColorMask = colorMask;

					}

				},

				setLocked: function ( lock ) {

					locked = lock;

				},

				setClear: function ( r, g, b, a, premultipliedAlpha ) {

					if ( premultipliedAlpha === true ) {

						r *= a; g *= a; b *= a;

					}

					color.set( r, g, b, a );

					if ( currentColorClear.equals( color ) === false ) {

						gl.clearColor( r, g, b, a );
						currentColorClear.copy( color );

					}

				},

				reset: function () {

					locked = false;

					currentColorMask = null;
					currentColorClear.set( - 1, 0, 0, 0 ); // set to invalid state

				}

			};

		}

		function DepthBuffer() {

			var locked = false;

			var currentDepthMask = null;
			var currentDepthFunc = null;
			var currentDepthClear = null;

			return {

				setTest: function ( depthTest ) {

					if ( depthTest ) {

						enable( 2929 );

					} else {

						disable( 2929 );

					}

				},

				setMask: function ( depthMask ) {

					if ( currentDepthMask !== depthMask && ! locked ) {

						gl.depthMask( depthMask );
						currentDepthMask = depthMask;

					}

				},

				setFunc: function ( depthFunc ) {

					if ( currentDepthFunc !== depthFunc ) {

						if ( depthFunc ) {

							switch ( depthFunc ) {

								case NeverDepth:

									gl.depthFunc( 512 );
									break;

								case AlwaysDepth:

									gl.depthFunc( 519 );
									break;

								case LessDepth:

									gl.depthFunc( 513 );
									break;

								case LessEqualDepth:

									gl.depthFunc( 515 );
									break;

								case EqualDepth:

									gl.depthFunc( 514 );
									break;

								case GreaterEqualDepth:

									gl.depthFunc( 518 );
									break;

								case GreaterDepth:

									gl.depthFunc( 516 );
									break;

								case NotEqualDepth:

									gl.depthFunc( 517 );
									break;

								default:

									gl.depthFunc( 515 );

							}

						} else {

							gl.depthFunc( 515 );

						}

						currentDepthFunc = depthFunc;

					}

				},

				setLocked: function ( lock ) {

					locked = lock;

				},

				setClear: function ( depth ) {

					if ( currentDepthClear !== depth ) {

						gl.clearDepth( depth );
						currentDepthClear = depth;

					}

				},

				reset: function () {

					locked = false;

					currentDepthMask = null;
					currentDepthFunc = null;
					currentDepthClear = null;

				}

			};

		}

		function StencilBuffer() {

			var locked = false;

			var currentStencilMask = null;
			var currentStencilFunc = null;
			var currentStencilRef = null;
			var currentStencilFuncMask = null;
			var currentStencilFail = null;
			var currentStencilZFail = null;
			var currentStencilZPass = null;
			var currentStencilClear = null;

			return {

				setTest: function ( stencilTest ) {

					if ( stencilTest ) {

						enable( 2960 );

					} else {

						disable( 2960 );

					}

				},

				setMask: function ( stencilMask ) {

					if ( currentStencilMask !== stencilMask && ! locked ) {

						gl.stencilMask( stencilMask );
						currentStencilMask = stencilMask;

					}

				},

				setFunc: function ( stencilFunc, stencilRef, stencilMask ) {

					if ( currentStencilFunc !== stencilFunc ||
					     currentStencilRef 	!== stencilRef 	||
					     currentStencilFuncMask !== stencilMask ) {

						gl.stencilFunc( stencilFunc, stencilRef, stencilMask );

						currentStencilFunc = stencilFunc;
						currentStencilRef = stencilRef;
						currentStencilFuncMask = stencilMask;

					}

				},

				setOp: function ( stencilFail, stencilZFail, stencilZPass ) {

					if ( currentStencilFail	 !== stencilFail 	||
					     currentStencilZFail !== stencilZFail ||
					     currentStencilZPass !== stencilZPass ) {

						gl.stencilOp( stencilFail, stencilZFail, stencilZPass );

						currentStencilFail = stencilFail;
						currentStencilZFail = stencilZFail;
						currentStencilZPass = stencilZPass;

					}

				},

				setLocked: function ( lock ) {

					locked = lock;

				},

				setClear: function ( stencil ) {

					if ( currentStencilClear !== stencil ) {

						gl.clearStencil( stencil );
						currentStencilClear = stencil;

					}

				},

				reset: function () {

					locked = false;

					currentStencilMask = null;
					currentStencilFunc = null;
					currentStencilRef = null;
					currentStencilFuncMask = null;
					currentStencilFail = null;
					currentStencilZFail = null;
					currentStencilZPass = null;
					currentStencilClear = null;

				}

			};

		}

		//

		var colorBuffer = new ColorBuffer();
		var depthBuffer = new DepthBuffer();
		var stencilBuffer = new StencilBuffer();

		var maxVertexAttributes = gl.getParameter( 34921 );
		var newAttributes = new Uint8Array( maxVertexAttributes );
		var enabledAttributes = new Uint8Array( maxVertexAttributes );
		var attributeDivisors = new Uint8Array( maxVertexAttributes );

		var enabledCapabilities = {};

		var compressedTextureFormats = null;

		var currentProgram = null;

		var currentBlendingEnabled = null;
		var currentBlending = null;
		var currentBlendEquation = null;
		var currentBlendSrc = null;
		var currentBlendDst = null;
		var currentBlendEquationAlpha = null;
		var currentBlendSrcAlpha = null;
		var currentBlendDstAlpha = null;
		var currentPremultipledAlpha = false;

		var currentFlipSided = null;
		var currentCullFace = null;

		var currentLineWidth = null;

		var currentPolygonOffsetFactor = null;
		var currentPolygonOffsetUnits = null;

		var maxTextures = gl.getParameter( 35661 );

		var lineWidthAvailable = false;
		var version = 0;
		var glVersion = gl.getParameter( 7938 );

		if ( glVersion.indexOf( 'WebGL' ) !== - 1 ) {

			version = parseFloat( /^WebGL\ ([0-9])/.exec( glVersion )[ 1 ] );
			lineWidthAvailable = ( version >= 1.0 );

		} else if ( glVersion.indexOf( 'OpenGL ES' ) !== - 1 ) {

			version = parseFloat( /^OpenGL\ ES\ ([0-9])/.exec( glVersion )[ 1 ] );
			lineWidthAvailable = ( version >= 2.0 );

		}

		var currentTextureSlot = null;
		var currentBoundTextures = {};

		var currentScissor = new Vector4();
		var currentViewport = new Vector4();

		function createTexture( type, target, count ) {

			var data = new Uint8Array( 4 ); // 4 is required to match default unpack alignment of 4.
			var texture = gl.createTexture();

			gl.bindTexture( type, texture );
			gl.texParameteri( type, 10241, 9728 );
			gl.texParameteri( type, 10240, 9728 );

			for ( var i = 0; i < count; i ++ ) {

				gl.texImage2D( target + i, 0, 6408, 1, 1, 0, 6408, 5121, data );

			}

			return texture;

		}

		var emptyTextures = {};
		emptyTextures[ 3553 ] = createTexture( 3553, 3553, 1 );
		emptyTextures[ 34067 ] = createTexture( 34067, 34069, 6 );

		// init

		colorBuffer.setClear( 0, 0, 0, 1 );
		depthBuffer.setClear( 1 );
		stencilBuffer.setClear( 0 );

		enable( 2929 );
		depthBuffer.setFunc( LessEqualDepth );

		setFlipSided( false );
		setCullFace( CullFaceBack );
		enable( 2884 );

		setBlending( NoBlending );

		//

		function initAttributes() {

			for ( var i = 0, l = newAttributes.length; i < l; i ++ ) {

				newAttributes[ i ] = 0;

			}

		}

		function enableAttribute( attribute ) {

			enableAttributeAndDivisor( attribute, 0 );

		}

		function enableAttributeAndDivisor( attribute, meshPerAttribute ) {

			newAttributes[ attribute ] = 1;

			if ( enabledAttributes[ attribute ] === 0 ) {

				gl.enableVertexAttribArray( attribute );
				enabledAttributes[ attribute ] = 1;

			}

			if ( attributeDivisors[ attribute ] !== meshPerAttribute ) {

				var extension = capabilities.isWebGL2 ? gl : extensions.get( 'ANGLE_instanced_arrays' );

				extension[ capabilities.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE' ]( attribute, meshPerAttribute );
				attributeDivisors[ attribute ] = meshPerAttribute;

			}

		}

		function disableUnusedAttributes() {

			for ( var i = 0, l = enabledAttributes.length; i !== l; ++ i ) {

				if ( enabledAttributes[ i ] !== newAttributes[ i ] ) {

					gl.disableVertexAttribArray( i );
					enabledAttributes[ i ] = 0;

				}

			}

		}

		function enable( id ) {

			if ( enabledCapabilities[ id ] !== true ) {

				gl.enable( id );
				enabledCapabilities[ id ] = true;

			}

		}

		function disable( id ) {

			if ( enabledCapabilities[ id ] !== false ) {

				gl.disable( id );
				enabledCapabilities[ id ] = false;

			}

		}

		function getCompressedTextureFormats() {

			if ( compressedTextureFormats === null ) {

				compressedTextureFormats = [];

				if ( extensions.get( 'WEBGL_compressed_texture_pvrtc' ) ||
				     extensions.get( 'WEBGL_compressed_texture_s3tc' ) ||
				     extensions.get( 'WEBGL_compressed_texture_etc1' ) ||
				     extensions.get( 'WEBGL_compressed_texture_astc' ) ) {

					var formats = gl.getParameter( 34467 );

					for ( var i = 0; i < formats.length; i ++ ) {

						compressedTextureFormats.push( formats[ i ] );

					}

				}

			}

			return compressedTextureFormats;

		}

		function useProgram( program ) {

			if ( currentProgram !== program ) {

				gl.useProgram( program );

				currentProgram = program;

				return true;

			}

			return false;

		}

		function setBlending( blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha ) {

			if ( blending === NoBlending ) {

				if ( currentBlendingEnabled ) {

					disable( 3042 );
					currentBlendingEnabled = false;

				}

				return;

			}

			if ( ! currentBlendingEnabled ) {

				enable( 3042 );
				currentBlendingEnabled = true;

			}

			if ( blending !== CustomBlending ) {

				if ( blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha ) {

					if ( currentBlendEquation !== AddEquation || currentBlendEquationAlpha !== AddEquation ) {

						gl.blendEquation( 32774 );

						currentBlendEquation = AddEquation;
						currentBlendEquationAlpha = AddEquation;

					}

					if ( premultipliedAlpha ) {

						switch ( blending ) {

							case NormalBlending:
								gl.blendFuncSeparate( 1, 771, 1, 771 );
								break;

							case AdditiveBlending:
								gl.blendFunc( 1, 1 );
								break;

							case SubtractiveBlending:
								gl.blendFuncSeparate( 0, 0, 769, 771 );
								break;

							case MultiplyBlending:
								gl.blendFuncSeparate( 0, 768, 0, 770 );
								break;

							default:
								console.error( 'THREE.WebGLState: Invalid blending: ', blending );
								break;

						}

					} else {

						switch ( blending ) {

							case NormalBlending:
								gl.blendFuncSeparate( 770, 771, 1, 771 );
								break;

							case AdditiveBlending:
								gl.blendFunc( 770, 1 );
								break;

							case SubtractiveBlending:
								gl.blendFunc( 0, 769 );
								break;

							case MultiplyBlending:
								gl.blendFunc( 0, 768 );
								break;

							default:
								console.error( 'THREE.WebGLState: Invalid blending: ', blending );
								break;

						}

					}

					currentBlendSrc = null;
					currentBlendDst = null;
					currentBlendSrcAlpha = null;
					currentBlendDstAlpha = null;

					currentBlending = blending;
					currentPremultipledAlpha = premultipliedAlpha;

				}

				return;

			}

			// custom blending

			blendEquationAlpha = blendEquationAlpha || blendEquation;
			blendSrcAlpha = blendSrcAlpha || blendSrc;
			blendDstAlpha = blendDstAlpha || blendDst;

			if ( blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha ) {

				gl.blendEquationSeparate( utils.convert( blendEquation ), utils.convert( blendEquationAlpha ) );

				currentBlendEquation = blendEquation;
				currentBlendEquationAlpha = blendEquationAlpha;

			}

			if ( blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha ) {

				gl.blendFuncSeparate( utils.convert( blendSrc ), utils.convert( blendDst ), utils.convert( blendSrcAlpha ), utils.convert( blendDstAlpha ) );

				currentBlendSrc = blendSrc;
				currentBlendDst = blendDst;
				currentBlendSrcAlpha = blendSrcAlpha;
				currentBlendDstAlpha = blendDstAlpha;

			}

			currentBlending = blending;
			currentPremultipledAlpha = null;

		}

		function setMaterial( material, frontFaceCW ) {

			material.side === DoubleSide
				? disable( 2884 )
				: enable( 2884 );

			var flipSided = ( material.side === BackSide );
			if ( frontFaceCW ) flipSided = ! flipSided;

			setFlipSided( flipSided );

			( material.blending === NormalBlending && material.transparent === false )
				? setBlending( NoBlending )
				: setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha );

			depthBuffer.setFunc( material.depthFunc );
			depthBuffer.setTest( material.depthTest );
			depthBuffer.setMask( material.depthWrite );
			colorBuffer.setMask( material.colorWrite );

			setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

		}

		//

		function setFlipSided( flipSided ) {

			if ( currentFlipSided !== flipSided ) {

				if ( flipSided ) {

					gl.frontFace( 2304 );

				} else {

					gl.frontFace( 2305 );

				}

				currentFlipSided = flipSided;

			}

		}

		function setCullFace( cullFace ) {

			if ( cullFace !== CullFaceNone ) {

				enable( 2884 );

				if ( cullFace !== currentCullFace ) {

					if ( cullFace === CullFaceBack ) {

						gl.cullFace( 1029 );

					} else if ( cullFace === CullFaceFront ) {

						gl.cullFace( 1028 );

					} else {

						gl.cullFace( 1032 );

					}

				}

			} else {

				disable( 2884 );

			}

			currentCullFace = cullFace;

		}

		function setLineWidth( width ) {

			if ( width !== currentLineWidth ) {

				if ( lineWidthAvailable ) gl.lineWidth( width );

				currentLineWidth = width;

			}

		}

		function setPolygonOffset( polygonOffset, factor, units ) {

			if ( polygonOffset ) {

				enable( 32823 );

				if ( currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units ) {

					gl.polygonOffset( factor, units );

					currentPolygonOffsetFactor = factor;
					currentPolygonOffsetUnits = units;

				}

			} else {

				disable( 32823 );

			}

		}

		function setScissorTest( scissorTest ) {

			if ( scissorTest ) {

				enable( 3089 );

			} else {

				disable( 3089 );

			}

		}

		// texture

		function activeTexture( webglSlot ) {

			if ( webglSlot === undefined ) webglSlot = 33984 + maxTextures - 1;

			if ( currentTextureSlot !== webglSlot ) {

				gl.activeTexture( webglSlot );
				currentTextureSlot = webglSlot;

			}

		}

		function bindTexture( webglType, webglTexture ) {

			if ( currentTextureSlot === null ) {

				activeTexture();

			}

			var boundTexture = currentBoundTextures[ currentTextureSlot ];

			if ( boundTexture === undefined ) {

				boundTexture = { type: undefined, texture: undefined };
				currentBoundTextures[ currentTextureSlot ] = boundTexture;

			}

			if ( boundTexture.type !== webglType || boundTexture.texture !== webglTexture ) {

				gl.bindTexture( webglType, webglTexture || emptyTextures[ webglType ] );

				boundTexture.type = webglType;
				boundTexture.texture = webglTexture;

			}

		}

		function compressedTexImage2D() {

			try {

				gl.compressedTexImage2D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function texImage2D() {

			try {

				gl.texImage2D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function texImage3D() {

			try {

				gl.texImage3D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		//

		function scissor( scissor ) {

			if ( currentScissor.equals( scissor ) === false ) {

				gl.scissor( scissor.x, scissor.y, scissor.z, scissor.w );
				currentScissor.copy( scissor );

			}

		}

		function viewport( viewport ) {

			if ( currentViewport.equals( viewport ) === false ) {

				gl.viewport( viewport.x, viewport.y, viewport.z, viewport.w );
				currentViewport.copy( viewport );

			}

		}

		//

		function reset() {

			for ( var i = 0; i < enabledAttributes.length; i ++ ) {

				if ( enabledAttributes[ i ] === 1 ) {

					gl.disableVertexAttribArray( i );
					enabledAttributes[ i ] = 0;

				}

			}

			enabledCapabilities = {};

			compressedTextureFormats = null;

			currentTextureSlot = null;
			currentBoundTextures = {};

			currentProgram = null;

			currentBlending = null;

			currentFlipSided = null;
			currentCullFace = null;

			colorBuffer.reset();
			depthBuffer.reset();
			stencilBuffer.reset();

		}

		return {

			buffers: {
				color: colorBuffer,
				depth: depthBuffer,
				stencil: stencilBuffer
			},

			initAttributes: initAttributes,
			enableAttribute: enableAttribute,
			enableAttributeAndDivisor: enableAttributeAndDivisor,
			disableUnusedAttributes: disableUnusedAttributes,
			enable: enable,
			disable: disable,
			getCompressedTextureFormats: getCompressedTextureFormats,

			useProgram: useProgram,

			setBlending: setBlending,
			setMaterial: setMaterial,

			setFlipSided: setFlipSided,
			setCullFace: setCullFace,

			setLineWidth: setLineWidth,
			setPolygonOffset: setPolygonOffset,

			setScissorTest: setScissorTest,

			activeTexture: activeTexture,
			bindTexture: bindTexture,
			compressedTexImage2D: compressedTexImage2D,
			texImage2D: texImage2D,
			texImage3D: texImage3D,

			scissor: scissor,
			viewport: viewport,

			reset: reset

		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebGLTextures( _gl, extensions, state, properties, capabilities, utils, info ) {

		var _videoTextures = {};
		var _canvas;

		//

		var useOffscreenCanvas = typeof OffscreenCanvas !== 'undefined';

		function createCanvas( width, height ) {

			// Use OffscreenCanvas when available. Specially needed in web workers

			return useOffscreenCanvas ?
				new OffscreenCanvas( width, height ) :
				document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );

		}

		function resizeImage( image, needsPowerOfTwo, needsNewCanvas, maxSize ) {

			var scale = 1;

			// handle case if texture exceeds max size

			if ( image.width > maxSize || image.height > maxSize ) {

				scale = maxSize / Math.max( image.width, image.height );

			}

			// only perform resize if necessary

			if ( scale < 1 || needsPowerOfTwo === true ) {

				// only perform resize for certain image types

				if ( ( typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement ) ||
					( typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement ) ||
					( typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap ) ) {

					var floor = needsPowerOfTwo ? _Math.floorPowerOfTwo : Math.floor;

					var width = floor( scale * image.width );
					var height = floor( scale * image.height );

					if ( _canvas === undefined ) _canvas = createCanvas( width, height );

					// cube textures can't reuse the same canvas

					var canvas = needsNewCanvas ? createCanvas( width, height ) : _canvas;

					canvas.width = width;
					canvas.height = height;

					var context = canvas.getContext( '2d' );
					context.drawImage( image, 0, 0, width, height );

					console.warn( 'THREE.WebGLRenderer: Texture has been resized from (' + image.width + 'x' + image.height + ') to (' + width + 'x' + height + ').' );

					return canvas;

				} else {

					if ( 'data' in image ) {

						console.warn( 'THREE.WebGLRenderer: Image in DataTexture is too big (' + image.width + 'x' + image.height + ').' );

					}

					return image;

				}

			}

			return image;

		}

		function isPowerOfTwo( image ) {

			return _Math.isPowerOfTwo( image.width ) && _Math.isPowerOfTwo( image.height );

		}

		function textureNeedsPowerOfTwo( texture ) {

			if ( capabilities.isWebGL2 ) return false;

			return ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) ||
				( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter );

		}

		function textureNeedsGenerateMipmaps( texture, supportsMips ) {

			return texture.generateMipmaps && supportsMips &&
				texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;

		}

		function generateMipmap( target, texture, width, height ) {

			_gl.generateMipmap( target );

			var textureProperties = properties.get( texture );

			// Note: Math.log( x ) * Math.LOG2E used instead of Math.log2( x ) which is not supported by IE11
			textureProperties.__maxMipLevel = Math.log( Math.max( width, height ) ) * Math.LOG2E;

		}

		function getInternalFormat( glFormat, glType ) {

			if ( ! capabilities.isWebGL2 ) return glFormat;

			var internalFormat = glFormat;

			if ( glFormat === 6403 ) {

				if ( glType === 5126 ) internalFormat = 33326;
				if ( glType === 5131 ) internalFormat = 33325;
				if ( glType === 5121 ) internalFormat = 33321;

			}

			if ( glFormat === 6407 ) {

				if ( glType === 5126 ) internalFormat = 34837;
				if ( glType === 5131 ) internalFormat = 34843;
				if ( glType === 5121 ) internalFormat = 32849;

			}

			if ( glFormat === 6408 ) {

				if ( glType === 5126 ) internalFormat = 34836;
				if ( glType === 5131 ) internalFormat = 34842;
				if ( glType === 5121 ) internalFormat = 32856;

			}

			if ( internalFormat === 33325 || internalFormat === 33326 ||
				internalFormat === 34842 || internalFormat === 34836 ) {

				extensions.get( 'EXT_color_buffer_float' );

			} else if ( internalFormat === 34843 || internalFormat === 34837 ) {

				console.warn( 'THREE.WebGLRenderer: Floating point textures with RGB format not supported. Please use RGBA instead.' );

			}

			return internalFormat;

		}

		// Fallback filters for non-power-of-2 textures

		function filterFallback( f ) {

			if ( f === NearestFilter || f === NearestMipMapNearestFilter || f === NearestMipMapLinearFilter ) {

				return 9728;

			}

			return 9729;

		}

		//

		function onTextureDispose( event ) {

			var texture = event.target;

			texture.removeEventListener( 'dispose', onTextureDispose );

			deallocateTexture( texture );

			if ( texture.isVideoTexture ) {

				delete _videoTextures[ texture.id ];

			}

			info.memory.textures --;

		}

		function onRenderTargetDispose( event ) {

			var renderTarget = event.target;

			renderTarget.removeEventListener( 'dispose', onRenderTargetDispose );

			deallocateRenderTarget( renderTarget );

			info.memory.textures --;

		}

		//

		function deallocateTexture( texture ) {

			var textureProperties = properties.get( texture );

			if ( textureProperties.__webglInit === undefined ) return;

			_gl.deleteTexture( textureProperties.__webglTexture );

			properties.remove( texture );

		}

		function deallocateRenderTarget( renderTarget ) {

			var renderTargetProperties = properties.get( renderTarget );
			var textureProperties = properties.get( renderTarget.texture );

			if ( ! renderTarget ) return;

			if ( textureProperties.__webglTexture !== undefined ) {

				_gl.deleteTexture( textureProperties.__webglTexture );

			}

			if ( renderTarget.depthTexture ) {

				renderTarget.depthTexture.dispose();

			}

			if ( renderTarget.isWebGLRenderTargetCube ) {

				for ( var i = 0; i < 6; i ++ ) {

					_gl.deleteFramebuffer( renderTargetProperties.__webglFramebuffer[ i ] );
					if ( renderTargetProperties.__webglDepthbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthbuffer[ i ] );

				}

			} else {

				_gl.deleteFramebuffer( renderTargetProperties.__webglFramebuffer );
				if ( renderTargetProperties.__webglDepthbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthbuffer );

			}

			properties.remove( renderTarget.texture );
			properties.remove( renderTarget );

		}

		//



		function setTexture2D( texture, slot ) {

			var textureProperties = properties.get( texture );

			if ( texture.isVideoTexture ) updateVideoTexture( texture );

			if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

				var image = texture.image;

				if ( image === undefined ) {

					console.warn( 'THREE.WebGLRenderer: Texture marked for update but image is undefined' );

				} else if ( image.complete === false ) {

					console.warn( 'THREE.WebGLRenderer: Texture marked for update but image is incomplete' );

				} else {

					uploadTexture( textureProperties, texture, slot );
					return;

				}

			}

			state.activeTexture( 33984 + slot );
			state.bindTexture( 3553, textureProperties.__webglTexture );

		}

		function setTexture2DArray( texture, slot ) {

			var textureProperties = properties.get( texture );

			if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

				uploadTexture( textureProperties, texture, slot );
				return;

			}

			state.activeTexture( 33984 + slot );
			state.bindTexture( 35866, textureProperties.__webglTexture );

		}

		function setTexture3D( texture, slot ) {

			var textureProperties = properties.get( texture );

			if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

				uploadTexture( textureProperties, texture, slot );
				return;

			}

			state.activeTexture( 33984 + slot );
			state.bindTexture( 32879, textureProperties.__webglTexture );

		}

		function setTextureCube( texture, slot ) {

			var textureProperties = properties.get( texture );

			if ( texture.image.length === 6 ) {

				if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

					initTexture( textureProperties, texture );

					state.activeTexture( 33984 + slot );
					state.bindTexture( 34067, textureProperties.__webglTexture );

					_gl.pixelStorei( 37440, texture.flipY );

					var isCompressed = ( texture && texture.isCompressedTexture );
					var isDataTexture = ( texture.image[ 0 ] && texture.image[ 0 ].isDataTexture );

					var cubeImage = [];

					for ( var i = 0; i < 6; i ++ ) {

						if ( ! isCompressed && ! isDataTexture ) {

							cubeImage[ i ] = resizeImage( texture.image[ i ], false, true, capabilities.maxCubemapSize );

						} else {

							cubeImage[ i ] = isDataTexture ? texture.image[ i ].image : texture.image[ i ];

						}

					}

					var image = cubeImage[ 0 ],
						supportsMips = isPowerOfTwo( image ) || capabilities.isWebGL2,
						glFormat = utils.convert( texture.format ),
						glType = utils.convert( texture.type ),
						glInternalFormat = getInternalFormat( glFormat, glType );

					setTextureParameters( 34067, texture, supportsMips );

					for ( var i = 0; i < 6; i ++ ) {

						if ( ! isCompressed ) {

							if ( isDataTexture ) {

								state.texImage2D( 34069 + i, 0, glInternalFormat, cubeImage[ i ].width, cubeImage[ i ].height, 0, glFormat, glType, cubeImage[ i ].data );

							} else {

								state.texImage2D( 34069 + i, 0, glInternalFormat, glFormat, glType, cubeImage[ i ] );

							}

						} else {

							var mipmap, mipmaps = cubeImage[ i ].mipmaps;

							for ( var j = 0, jl = mipmaps.length; j < jl; j ++ ) {

								mipmap = mipmaps[ j ];

								if ( texture.format !== RGBAFormat && texture.format !== RGBFormat ) {

									if ( state.getCompressedTextureFormats().indexOf( glFormat ) > - 1 ) {

										state.compressedTexImage2D( 34069 + i, j, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data );

									} else {

										console.warn( 'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()' );

									}

								} else {

									state.texImage2D( 34069 + i, j, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

								}

							}

						}

					}

					if ( ! isCompressed ) {

						textureProperties.__maxMipLevel = 0;

					} else {

						textureProperties.__maxMipLevel = mipmaps.length - 1;

					}

					if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

						// We assume images for cube map have the same size.
						generateMipmap( 34067, texture, image.width, image.height );

					}

					textureProperties.__version = texture.version;

					if ( texture.onUpdate ) texture.onUpdate( texture );

				} else {

					state.activeTexture( 33984 + slot );
					state.bindTexture( 34067, textureProperties.__webglTexture );

				}

			}

		}

		function setTextureCubeDynamic( texture, slot ) {

			state.activeTexture( 33984 + slot );
			state.bindTexture( 34067, properties.get( texture ).__webglTexture );

		}

		function setTextureParameters( textureType, texture, supportsMips ) {

			var extension;

			if ( supportsMips ) {

				_gl.texParameteri( textureType, 10242, utils.convert( texture.wrapS ) );
				_gl.texParameteri( textureType, 10243, utils.convert( texture.wrapT ) );

				if ( textureType === 32879 || textureType === 35866 ) {

					_gl.texParameteri( textureType, 32882, utils.convert( texture.wrapR ) );

				}

				_gl.texParameteri( textureType, 10240, utils.convert( texture.magFilter ) );
				_gl.texParameteri( textureType, 10241, utils.convert( texture.minFilter ) );

			} else {

				_gl.texParameteri( textureType, 10242, 33071 );
				_gl.texParameteri( textureType, 10243, 33071 );

				if ( textureType === 32879 || textureType === 35866 ) {

					_gl.texParameteri( textureType, 32882, 33071 );

				}

				if ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) {

					console.warn( 'THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.' );

				}

				_gl.texParameteri( textureType, 10240, filterFallback( texture.magFilter ) );
				_gl.texParameteri( textureType, 10241, filterFallback( texture.minFilter ) );

				if ( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter ) {

					console.warn( 'THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.' );

				}

			}

			extension = extensions.get( 'EXT_texture_filter_anisotropic' );

			if ( extension ) {

				if ( texture.type === FloatType && extensions.get( 'OES_texture_float_linear' ) === null ) return;
				if ( texture.type === HalfFloatType && ( capabilities.isWebGL2 || extensions.get( 'OES_texture_half_float_linear' ) ) === null ) return;

				if ( texture.anisotropy > 1 || properties.get( texture ).__currentAnisotropy ) {

					_gl.texParameterf( textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min( texture.anisotropy, capabilities.getMaxAnisotropy() ) );
					properties.get( texture ).__currentAnisotropy = texture.anisotropy;

				}

			}

		}

		function initTexture( textureProperties, texture ) {

			if ( textureProperties.__webglInit === undefined ) {

				textureProperties.__webglInit = true;

				texture.addEventListener( 'dispose', onTextureDispose );

				textureProperties.__webglTexture = _gl.createTexture();

				info.memory.textures ++;

			}

		}

		function uploadTexture( textureProperties, texture, slot ) {

			var textureType = 3553;

			if ( texture.isDataTexture2DArray ) textureType = 35866;
			if ( texture.isDataTexture3D ) textureType = 32879;

			initTexture( textureProperties, texture );

			state.activeTexture( 33984 + slot );
			state.bindTexture( textureType, textureProperties.__webglTexture );

			_gl.pixelStorei( 37440, texture.flipY );
			_gl.pixelStorei( 37441, texture.premultiplyAlpha );
			_gl.pixelStorei( 3317, texture.unpackAlignment );

			var needsPowerOfTwo = textureNeedsPowerOfTwo( texture ) && isPowerOfTwo( texture.image ) === false;
			var image = resizeImage( texture.image, needsPowerOfTwo, false, capabilities.maxTextureSize );

			var supportsMips = isPowerOfTwo( image ) || capabilities.isWebGL2,
				glFormat = utils.convert( texture.format ),
				glType = utils.convert( texture.type ),
				glInternalFormat = getInternalFormat( glFormat, glType );

			setTextureParameters( textureType, texture, supportsMips );

			var mipmap, mipmaps = texture.mipmaps;

			if ( texture.isDepthTexture ) {

				// populate depth texture with dummy data

				glInternalFormat = 6402;

				if ( texture.type === FloatType ) {

					if ( ! capabilities.isWebGL2 ) throw new Error( 'Float Depth Texture only supported in WebGL2.0' );
					glInternalFormat = 36012;

				} else if ( capabilities.isWebGL2 ) {

					// WebGL 2.0 requires signed internalformat for glTexImage2D
					glInternalFormat = 33189;

				}

				if ( texture.format === DepthFormat && glInternalFormat === 6402 ) {

					// The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
					// DEPTH_COMPONENT and type is not UNSIGNED_SHORT or UNSIGNED_INT
					// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
					if ( texture.type !== UnsignedShortType && texture.type !== UnsignedIntType ) {

						console.warn( 'THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.' );

						texture.type = UnsignedShortType;
						glType = utils.convert( texture.type );

					}

				}

				// Depth stencil textures need the DEPTH_STENCIL internal format
				// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
				if ( texture.format === DepthStencilFormat ) {

					glInternalFormat = 34041;

					// The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
					// DEPTH_STENCIL and type is not UNSIGNED_INT_24_8_WEBGL.
					// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
					if ( texture.type !== UnsignedInt248Type ) {

						console.warn( 'THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.' );

						texture.type = UnsignedInt248Type;
						glType = utils.convert( texture.type );

					}

				}

				state.texImage2D( 3553, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, null );

			} else if ( texture.isDataTexture ) {

				// use manually created mipmaps if available
				// if there are no manual mipmaps
				// set 0 level mipmap and then use GL to generate other mipmap levels

				if ( mipmaps.length > 0 && supportsMips ) {

					for ( var i = 0, il = mipmaps.length; i < il; i ++ ) {

						mipmap = mipmaps[ i ];
						state.texImage2D( 3553, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

					}

					texture.generateMipmaps = false;
					textureProperties.__maxMipLevel = mipmaps.length - 1;

				} else {

					state.texImage2D( 3553, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, image.data );
					textureProperties.__maxMipLevel = 0;

				}

			} else if ( texture.isCompressedTexture ) {

				for ( var i = 0, il = mipmaps.length; i < il; i ++ ) {

					mipmap = mipmaps[ i ];

					if ( texture.format !== RGBAFormat && texture.format !== RGBFormat ) {

						if ( state.getCompressedTextureFormats().indexOf( glFormat ) > - 1 ) {

							state.compressedTexImage2D( 3553, i, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data );

						} else {

							console.warn( 'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()' );

						}

					} else {

						state.texImage2D( 3553, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

					}

				}

				textureProperties.__maxMipLevel = mipmaps.length - 1;

			} else if ( texture.isDataTexture2DArray ) {

				state.texImage3D( 35866, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data );
				textureProperties.__maxMipLevel = 0;

			} else if ( texture.isDataTexture3D ) {

				state.texImage3D( 32879, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data );
				textureProperties.__maxMipLevel = 0;

			} else {

				// regular Texture (image, video, canvas)

				// use manually created mipmaps if available
				// if there are no manual mipmaps
				// set 0 level mipmap and then use GL to generate other mipmap levels

				if ( mipmaps.length > 0 && supportsMips ) {

					for ( var i = 0, il = mipmaps.length; i < il; i ++ ) {

						mipmap = mipmaps[ i ];
						state.texImage2D( 3553, i, glInternalFormat, glFormat, glType, mipmap );

					}

					texture.generateMipmaps = false;
					textureProperties.__maxMipLevel = mipmaps.length - 1;

				} else {

					state.texImage2D( 3553, 0, glInternalFormat, glFormat, glType, image );
					textureProperties.__maxMipLevel = 0;

				}

			}

			if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

				generateMipmap( 3553, texture, image.width, image.height );

			}

			textureProperties.__version = texture.version;

			if ( texture.onUpdate ) texture.onUpdate( texture );

		}

		// Render targets

		// Setup storage for target texture and bind it to correct framebuffer
		function setupFrameBufferTexture( framebuffer, renderTarget, attachment, textureTarget ) {

			var glFormat = utils.convert( renderTarget.texture.format );
			var glType = utils.convert( renderTarget.texture.type );
			var glInternalFormat = getInternalFormat( glFormat, glType );
			state.texImage2D( textureTarget, 0, glInternalFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );
			_gl.bindFramebuffer( 36160, framebuffer );
			_gl.framebufferTexture2D( 36160, attachment, textureTarget, properties.get( renderTarget.texture ).__webglTexture, 0 );
			_gl.bindFramebuffer( 36160, null );

		}

		// Setup storage for internal depth/stencil buffers and bind to correct framebuffer
		function setupRenderBufferStorage( renderbuffer, renderTarget, isMultisample ) {

			_gl.bindRenderbuffer( 36161, renderbuffer );

			if ( renderTarget.depthBuffer && ! renderTarget.stencilBuffer ) {

				if ( isMultisample ) {

					var samples = getRenderTargetSamples( renderTarget );

					_gl.renderbufferStorageMultisample( 36161, samples, 33189, renderTarget.width, renderTarget.height );

				} else {

					_gl.renderbufferStorage( 36161, 33189, renderTarget.width, renderTarget.height );

				}

				_gl.framebufferRenderbuffer( 36160, 36096, 36161, renderbuffer );

			} else if ( renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

				if ( isMultisample ) {

					var samples = getRenderTargetSamples( renderTarget );

					_gl.renderbufferStorageMultisample( 36161, samples, 34041, renderTarget.width, renderTarget.height );

				} else {

					_gl.renderbufferStorage( 36161, 34041, renderTarget.width, renderTarget.height );

				}


				_gl.framebufferRenderbuffer( 36160, 33306, 36161, renderbuffer );

			} else {

				var glFormat = utils.convert( renderTarget.texture.format );
				var glType = utils.convert( renderTarget.texture.type );
				var glInternalFormat = getInternalFormat( glFormat, glType );

				if ( isMultisample ) {

					var samples = getRenderTargetSamples( renderTarget );

					_gl.renderbufferStorageMultisample( 36161, samples, glInternalFormat, renderTarget.width, renderTarget.height );

				} else {

					_gl.renderbufferStorage( 36161, glInternalFormat, renderTarget.width, renderTarget.height );

				}

			}

			_gl.bindRenderbuffer( 36161, null );

		}

		// Setup resources for a Depth Texture for a FBO (needs an extension)
		function setupDepthTexture( framebuffer, renderTarget ) {

			var isCube = ( renderTarget && renderTarget.isWebGLRenderTargetCube );
			if ( isCube ) throw new Error( 'Depth Texture with cube render targets is not supported' );

			_gl.bindFramebuffer( 36160, framebuffer );

			if ( ! ( renderTarget.depthTexture && renderTarget.depthTexture.isDepthTexture ) ) {

				throw new Error( 'renderTarget.depthTexture must be an instance of THREE.DepthTexture' );

			}

			// upload an empty depth texture with framebuffer size
			if ( ! properties.get( renderTarget.depthTexture ).__webglTexture ||
					renderTarget.depthTexture.image.width !== renderTarget.width ||
					renderTarget.depthTexture.image.height !== renderTarget.height ) {

				renderTarget.depthTexture.image.width = renderTarget.width;
				renderTarget.depthTexture.image.height = renderTarget.height;
				renderTarget.depthTexture.needsUpdate = true;

			}

			setTexture2D( renderTarget.depthTexture, 0 );

			var webglDepthTexture = properties.get( renderTarget.depthTexture ).__webglTexture;

			if ( renderTarget.depthTexture.format === DepthFormat ) {

				_gl.framebufferTexture2D( 36160, 36096, 3553, webglDepthTexture, 0 );

			} else if ( renderTarget.depthTexture.format === DepthStencilFormat ) {

				_gl.framebufferTexture2D( 36160, 33306, 3553, webglDepthTexture, 0 );

			} else {

				throw new Error( 'Unknown depthTexture format' );

			}

		}

		// Setup GL resources for a non-texture depth buffer
		function setupDepthRenderbuffer( renderTarget ) {

			var renderTargetProperties = properties.get( renderTarget );

			var isCube = ( renderTarget.isWebGLRenderTargetCube === true );

			if ( renderTarget.depthTexture ) {

				if ( isCube ) throw new Error( 'target.depthTexture not supported in Cube render targets' );

				setupDepthTexture( renderTargetProperties.__webglFramebuffer, renderTarget );

			} else {

				if ( isCube ) {

					renderTargetProperties.__webglDepthbuffer = [];

					for ( var i = 0; i < 6; i ++ ) {

						_gl.bindFramebuffer( 36160, renderTargetProperties.__webglFramebuffer[ i ] );
						renderTargetProperties.__webglDepthbuffer[ i ] = _gl.createRenderbuffer();
						setupRenderBufferStorage( renderTargetProperties.__webglDepthbuffer[ i ], renderTarget );

					}

				} else {

					_gl.bindFramebuffer( 36160, renderTargetProperties.__webglFramebuffer );
					renderTargetProperties.__webglDepthbuffer = _gl.createRenderbuffer();
					setupRenderBufferStorage( renderTargetProperties.__webglDepthbuffer, renderTarget );

				}

			}

			_gl.bindFramebuffer( 36160, null );

		}

		// Set up GL resources for the render target
		function setupRenderTarget( renderTarget ) {

			var renderTargetProperties = properties.get( renderTarget );
			var textureProperties = properties.get( renderTarget.texture );

			renderTarget.addEventListener( 'dispose', onRenderTargetDispose );

			textureProperties.__webglTexture = _gl.createTexture();

			info.memory.textures ++;

			var isCube = ( renderTarget.isWebGLRenderTargetCube === true );
			var isMultisample = ( renderTarget.isWebGLMultisampleRenderTarget === true );
			var supportsMips = isPowerOfTwo( renderTarget ) || capabilities.isWebGL2;

			// Setup framebuffer

			if ( isCube ) {

				renderTargetProperties.__webglFramebuffer = [];

				for ( var i = 0; i < 6; i ++ ) {

					renderTargetProperties.__webglFramebuffer[ i ] = _gl.createFramebuffer();

				}

			} else {

				renderTargetProperties.__webglFramebuffer = _gl.createFramebuffer();

				if ( isMultisample ) {

					if ( capabilities.isWebGL2 ) {

						renderTargetProperties.__webglMultisampledFramebuffer = _gl.createFramebuffer();
						renderTargetProperties.__webglColorRenderbuffer = _gl.createRenderbuffer();

						_gl.bindRenderbuffer( 36161, renderTargetProperties.__webglColorRenderbuffer );
						var glFormat = utils.convert( renderTarget.texture.format );
						var glType = utils.convert( renderTarget.texture.type );
						var glInternalFormat = getInternalFormat( glFormat, glType );
						var samples = getRenderTargetSamples( renderTarget );
						_gl.renderbufferStorageMultisample( 36161, samples, glInternalFormat, renderTarget.width, renderTarget.height );

						_gl.bindFramebuffer( 36160, renderTargetProperties.__webglMultisampledFramebuffer );
						_gl.framebufferRenderbuffer( 36160, 36064, 36161, renderTargetProperties.__webglColorRenderbuffer );
						_gl.bindRenderbuffer( 36161, null );

						if ( renderTarget.depthBuffer ) {

							renderTargetProperties.__webglDepthRenderbuffer = _gl.createRenderbuffer();
							setupRenderBufferStorage( renderTargetProperties.__webglDepthRenderbuffer, renderTarget, true );

						}

						_gl.bindFramebuffer( 36160, null );


					} else {

						console.warn( 'THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.' );

					}

				}

			}

			// Setup color buffer

			if ( isCube ) {

				state.bindTexture( 34067, textureProperties.__webglTexture );
				setTextureParameters( 34067, renderTarget.texture, supportsMips );

				for ( var i = 0; i < 6; i ++ ) {

					setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer[ i ], renderTarget, 36064, 34069 + i );

				}

				if ( textureNeedsGenerateMipmaps( renderTarget.texture, supportsMips ) ) {

					generateMipmap( 34067, renderTarget.texture, renderTarget.width, renderTarget.height );

				}

				state.bindTexture( 34067, null );

			} else {

				state.bindTexture( 3553, textureProperties.__webglTexture );
				setTextureParameters( 3553, renderTarget.texture, supportsMips );
				setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer, renderTarget, 36064, 3553 );

				if ( textureNeedsGenerateMipmaps( renderTarget.texture, supportsMips ) ) {

					generateMipmap( 3553, renderTarget.texture, renderTarget.width, renderTarget.height );

				}

				state.bindTexture( 3553, null );

			}

			// Setup depth and stencil buffers

			if ( renderTarget.depthBuffer ) {

				setupDepthRenderbuffer( renderTarget );

			}

		}

		function updateRenderTargetMipmap( renderTarget ) {

			var texture = renderTarget.texture;
			var supportsMips = isPowerOfTwo( renderTarget ) || capabilities.isWebGL2;

			if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

				var target = renderTarget.isWebGLRenderTargetCube ? 34067 : 3553;
				var webglTexture = properties.get( texture ).__webglTexture;

				state.bindTexture( target, webglTexture );
				generateMipmap( target, texture, renderTarget.width, renderTarget.height );
				state.bindTexture( target, null );

			}

		}

		function updateMultisampleRenderTarget( renderTarget ) {

			if ( renderTarget.isWebGLMultisampleRenderTarget ) {

				if ( capabilities.isWebGL2 ) {

					var renderTargetProperties = properties.get( renderTarget );

					_gl.bindFramebuffer( 36008, renderTargetProperties.__webglMultisampledFramebuffer );
					_gl.bindFramebuffer( 36009, renderTargetProperties.__webglFramebuffer );

					var width = renderTarget.width;
					var height = renderTarget.height;
					var mask = 16384;

					if ( renderTarget.depthBuffer ) mask |= 256;
					if ( renderTarget.stencilBuffer ) mask |= 1024;

					_gl.blitFramebuffer( 0, 0, width, height, 0, 0, width, height, mask, 9728 );

				} else {

					console.warn( 'THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.' );

				}

			}

		}

		function getRenderTargetSamples( renderTarget ) {

			return ( capabilities.isWebGL2 && renderTarget.isWebGLMultisampleRenderTarget ) ?
				Math.min( capabilities.maxSamples, renderTarget.samples ) : 0;

		}

		function updateVideoTexture( texture ) {

			var id = texture.id;
			var frame = info.render.frame;

			// Check the last frame we updated the VideoTexture

			if ( _videoTextures[ id ] !== frame ) {

				_videoTextures[ id ] = frame;
				texture.update();

			}

		}

		this.setTexture2D = setTexture2D;
		this.setTexture2DArray = setTexture2DArray;
		this.setTexture3D = setTexture3D;
		this.setTextureCube = setTextureCube;
		this.setTextureCubeDynamic = setTextureCubeDynamic;
		this.setupRenderTarget = setupRenderTarget;
		this.updateRenderTargetMipmap = updateRenderTargetMipmap;
		this.updateMultisampleRenderTarget = updateMultisampleRenderTarget;

	}

	/**
	 * @author thespite / http://www.twitter.com/thespite
	 */

	function WebGLUtils( gl, extensions, capabilities ) {

		function convert( p ) {

			var extension;

			if ( p === RepeatWrapping ) return 10497;
			if ( p === ClampToEdgeWrapping ) return 33071;
			if ( p === MirroredRepeatWrapping ) return 33648;

			if ( p === NearestFilter ) return 9728;
			if ( p === NearestMipMapNearestFilter ) return 9984;
			if ( p === NearestMipMapLinearFilter ) return 9986;

			if ( p === LinearFilter ) return 9729;
			if ( p === LinearMipMapNearestFilter ) return 9985;
			if ( p === LinearMipMapLinearFilter ) return 9987;

			if ( p === UnsignedByteType ) return 5121;
			if ( p === UnsignedShort4444Type ) return 32819;
			if ( p === UnsignedShort5551Type ) return 32820;
			if ( p === UnsignedShort565Type ) return 33635;

			if ( p === ByteType ) return 5120;
			if ( p === ShortType ) return 5122;
			if ( p === UnsignedShortType ) return 5123;
			if ( p === IntType ) return 5124;
			if ( p === UnsignedIntType ) return 5125;
			if ( p === FloatType ) return 5126;

			if ( p === HalfFloatType ) {

				if ( capabilities.isWebGL2 ) return 5131;

				extension = extensions.get( 'OES_texture_half_float' );

				if ( extension !== null ) return extension.HALF_FLOAT_OES;

			}

			if ( p === AlphaFormat ) return 6406;
			if ( p === RGBFormat ) return 6407;
			if ( p === RGBAFormat ) return 6408;
			if ( p === LuminanceFormat ) return 6409;
			if ( p === LuminanceAlphaFormat ) return 6410;
			if ( p === DepthFormat ) return 6402;
			if ( p === DepthStencilFormat ) return 34041;
			if ( p === RedFormat ) return 6403;

			if ( p === AddEquation ) return 32774;
			if ( p === SubtractEquation ) return 32778;
			if ( p === ReverseSubtractEquation ) return 32779;

			if ( p === ZeroFactor ) return 0;
			if ( p === OneFactor ) return 1;
			if ( p === SrcColorFactor ) return 768;
			if ( p === OneMinusSrcColorFactor ) return 769;
			if ( p === SrcAlphaFactor ) return 770;
			if ( p === OneMinusSrcAlphaFactor ) return 771;
			if ( p === DstAlphaFactor ) return 772;
			if ( p === OneMinusDstAlphaFactor ) return 773;

			if ( p === DstColorFactor ) return 774;
			if ( p === OneMinusDstColorFactor ) return 775;
			if ( p === SrcAlphaSaturateFactor ) return 776;

			if ( p === RGB_S3TC_DXT1_Format || p === RGBA_S3TC_DXT1_Format ||
				p === RGBA_S3TC_DXT3_Format || p === RGBA_S3TC_DXT5_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_s3tc' );

				if ( extension !== null ) {

					if ( p === RGB_S3TC_DXT1_Format ) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
					if ( p === RGBA_S3TC_DXT1_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
					if ( p === RGBA_S3TC_DXT3_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
					if ( p === RGBA_S3TC_DXT5_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;

				}

			}

			if ( p === RGB_PVRTC_4BPPV1_Format || p === RGB_PVRTC_2BPPV1_Format ||
				p === RGBA_PVRTC_4BPPV1_Format || p === RGBA_PVRTC_2BPPV1_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_pvrtc' );

				if ( extension !== null ) {

					if ( p === RGB_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
					if ( p === RGB_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
					if ( p === RGBA_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
					if ( p === RGBA_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

				}

			}

			if ( p === RGB_ETC1_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_etc1' );

				if ( extension !== null ) return extension.COMPRESSED_RGB_ETC1_WEBGL;

			}

			if ( p === RGBA_ASTC_4x4_Format || p === RGBA_ASTC_5x4_Format || p === RGBA_ASTC_5x5_Format ||
				p === RGBA_ASTC_6x5_Format || p === RGBA_ASTC_6x6_Format || p === RGBA_ASTC_8x5_Format ||
				p === RGBA_ASTC_8x6_Format || p === RGBA_ASTC_8x8_Format || p === RGBA_ASTC_10x5_Format ||
				p === RGBA_ASTC_10x6_Format || p === RGBA_ASTC_10x8_Format || p === RGBA_ASTC_10x10_Format ||
				p === RGBA_ASTC_12x10_Format || p === RGBA_ASTC_12x12_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_astc' );

				if ( extension !== null ) {

					return p;

				}

			}

			if ( p === MinEquation || p === MaxEquation ) {

				if ( capabilities.isWebGL2 ) {

					if ( p === MinEquation ) return 32775;
					if ( p === MaxEquation ) return 32776;

				}

				extension = extensions.get( 'EXT_blend_minmax' );

				if ( extension !== null ) {

					if ( p === MinEquation ) return extension.MIN_EXT;
					if ( p === MaxEquation ) return extension.MAX_EXT;

				}

			}

			if ( p === UnsignedInt248Type ) {

				if ( capabilities.isWebGL2 ) return 34042;

				extension = extensions.get( 'WEBGL_depth_texture' );

				if ( extension !== null ) return extension.UNSIGNED_INT_24_8_WEBGL;

			}

			return 0;

		}

		return { convert: convert };

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function Group() {

		Object3D.call( this );

		this.type = 'Group';

	}

	Group.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Group,

		isGroup: true

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author mikael emtinger / http://gomo.se/
	 * @author WestLangley / http://github.com/WestLangley
	*/

	function Camera() {

		Object3D.call( this );

		this.type = 'Camera';

		this.matrixWorldInverse = new Matrix4();

		this.projectionMatrix = new Matrix4();
		this.projectionMatrixInverse = new Matrix4();

	}

	Camera.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Camera,

		isCamera: true,

		copy: function ( source, recursive ) {

			Object3D.prototype.copy.call( this, source, recursive );

			this.matrixWorldInverse.copy( source.matrixWorldInverse );

			this.projectionMatrix.copy( source.projectionMatrix );
			this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

			return this;

		},

		getWorldDirection: function ( target ) {

			if ( target === undefined ) {

				console.warn( 'THREE.Camera: .getWorldDirection() target is now required' );
				target = new Vector3();

			}

			this.updateMatrixWorld( true );

			var e = this.matrixWorld.elements;

			return target.set( - e[ 8 ], - e[ 9 ], - e[ 10 ] ).normalize();

		},

		updateMatrixWorld: function ( force ) {

			Object3D.prototype.updateMatrixWorld.call( this, force );

			this.matrixWorldInverse.getInverse( this.matrixWorld );

		},

		clone: function () {

			return new this.constructor().copy( this );

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author greggman / http://games.greggman.com/
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 * @author tschw
	 */

	function PerspectiveCamera( fov, aspect, near, far ) {

		Camera.call( this );

		this.type = 'PerspectiveCamera';

		this.fov = fov !== undefined ? fov : 50;
		this.zoom = 1;

		this.near = near !== undefined ? near : 0.1;
		this.far = far !== undefined ? far : 2000;
		this.focus = 10;

		this.aspect = aspect !== undefined ? aspect : 1;
		this.view = null;

		this.filmGauge = 35;	// width of the film (default in millimeters)
		this.filmOffset = 0;	// horizontal film offset (same unit as gauge)

		this.updateProjectionMatrix();

	}

	PerspectiveCamera.prototype = Object.assign( Object.create( Camera.prototype ), {

		constructor: PerspectiveCamera,

		isPerspectiveCamera: true,

		copy: function ( source, recursive ) {

			Camera.prototype.copy.call( this, source, recursive );

			this.fov = source.fov;
			this.zoom = source.zoom;

			this.near = source.near;
			this.far = source.far;
			this.focus = source.focus;

			this.aspect = source.aspect;
			this.view = source.view === null ? null : Object.assign( {}, source.view );

			this.filmGauge = source.filmGauge;
			this.filmOffset = source.filmOffset;

			return this;

		},

		/**
		 * Sets the FOV by focal length in respect to the current .filmGauge.
		 *
		 * The default film gauge is 35, so that the focal length can be specified for
		 * a 35mm (full frame) camera.
		 *
		 * Values for focal length and film gauge must have the same unit.
		 */
		setFocalLength: function ( focalLength ) {

			// see http://www.bobatkins.com/photography/technical/field_of_view.html
			var vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;

			this.fov = _Math.RAD2DEG * 2 * Math.atan( vExtentSlope );
			this.updateProjectionMatrix();

		},

		/**
		 * Calculates the focal length from the current .fov and .filmGauge.
		 */
		getFocalLength: function () {

			var vExtentSlope = Math.tan( _Math.DEG2RAD * 0.5 * this.fov );

			return 0.5 * this.getFilmHeight() / vExtentSlope;

		},

		getEffectiveFOV: function () {

			return _Math.RAD2DEG * 2 * Math.atan(
				Math.tan( _Math.DEG2RAD * 0.5 * this.fov ) / this.zoom );

		},

		getFilmWidth: function () {

			// film not completely covered in portrait format (aspect < 1)
			return this.filmGauge * Math.min( this.aspect, 1 );

		},

		getFilmHeight: function () {

			// film not completely covered in landscape format (aspect > 1)
			return this.filmGauge / Math.max( this.aspect, 1 );

		},

		/**
		 * Sets an offset in a larger frustum. This is useful for multi-window or
		 * multi-monitor/multi-machine setups.
		 *
		 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
		 * the monitors are in grid like this
		 *
		 *   +---+---+---+
		 *   | A | B | C |
		 *   +---+---+---+
		 *   | D | E | F |
		 *   +---+---+---+
		 *
		 * then for each monitor you would call it like this
		 *
		 *   var w = 1920;
		 *   var h = 1080;
		 *   var fullWidth = w * 3;
		 *   var fullHeight = h * 2;
		 *
		 *   --A--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
		 *   --B--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
		 *   --C--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
		 *   --D--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
		 *   --E--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
		 *   --F--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
		 *
		 *   Note there is no reason monitors have to be the same size or in a grid.
		 */
		setViewOffset: function ( fullWidth, fullHeight, x, y, width, height ) {

			this.aspect = fullWidth / fullHeight;

			if ( this.view === null ) {

				this.view = {
					enabled: true,
					fullWidth: 1,
					fullHeight: 1,
					offsetX: 0,
					offsetY: 0,
					width: 1,
					height: 1
				};

			}

			this.view.enabled = true;
			this.view.fullWidth = fullWidth;
			this.view.fullHeight = fullHeight;
			this.view.offsetX = x;
			this.view.offsetY = y;
			this.view.width = width;
			this.view.height = height;

			this.updateProjectionMatrix();

		},

		clearViewOffset: function () {

			if ( this.view !== null ) {

				this.view.enabled = false;

			}

			this.updateProjectionMatrix();

		},

		updateProjectionMatrix: function () {

			var near = this.near,
				top = near * Math.tan( _Math.DEG2RAD * 0.5 * this.fov ) / this.zoom,
				height = 2 * top,
				width = this.aspect * height,
				left = - 0.5 * width,
				view = this.view;

			if ( this.view !== null && this.view.enabled ) {

				var fullWidth = view.fullWidth,
					fullHeight = view.fullHeight;

				left += view.offsetX * width / fullWidth;
				top -= view.offsetY * height / fullHeight;
				width *= view.width / fullWidth;
				height *= view.height / fullHeight;

			}

			var skew = this.filmOffset;
			if ( skew !== 0 ) left += near * skew / this.getFilmWidth();

			this.projectionMatrix.makePerspective( left, left + width, top, top - height, near, this.far );

			this.projectionMatrixInverse.getInverse( this.projectionMatrix );

		},

		toJSON: function ( meta ) {

			var data = Object3D.prototype.toJSON.call( this, meta );

			data.object.fov = this.fov;
			data.object.zoom = this.zoom;

			data.object.near = this.near;
			data.object.far = this.far;
			data.object.focus = this.focus;

			data.object.aspect = this.aspect;

			if ( this.view !== null ) data.object.view = Object.assign( {}, this.view );

			data.object.filmGauge = this.filmGauge;
			data.object.filmOffset = this.filmOffset;

			return data;

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function ArrayCamera( array ) {

		PerspectiveCamera.call( this );

		this.cameras = array || [];

	}

	ArrayCamera.prototype = Object.assign( Object.create( PerspectiveCamera.prototype ), {

		constructor: ArrayCamera,

		isArrayCamera: true

	} );

	/**
	 * @author jsantell / https://www.jsantell.com/
	 * @author mrdoob / http://mrdoob.com/
	 */

	var cameraLPos = new Vector3();
	var cameraRPos = new Vector3();

	/**
	 * Assumes 2 cameras that are parallel and share an X-axis, and that
	 * the cameras' projection and world matrices have already been set.
	 * And that near and far planes are identical for both cameras.
	 * Visualization of this technique: https://computergraphics.stackexchange.com/a/4765
	 */
	function setProjectionFromUnion( camera, cameraL, cameraR ) {

		cameraLPos.setFromMatrixPosition( cameraL.matrixWorld );
		cameraRPos.setFromMatrixPosition( cameraR.matrixWorld );

		var ipd = cameraLPos.distanceTo( cameraRPos );

		var projL = cameraL.projectionMatrix.elements;
		var projR = cameraR.projectionMatrix.elements;

		// VR systems will have identical far and near planes, and
		// most likely identical top and bottom frustum extents.
		// Use the left camera for these values.
		var near = projL[ 14 ] / ( projL[ 10 ] - 1 );
		var far = projL[ 14 ] / ( projL[ 10 ] + 1 );
		var topFov = ( projL[ 9 ] + 1 ) / projL[ 5 ];
		var bottomFov = ( projL[ 9 ] - 1 ) / projL[ 5 ];

		var leftFov = ( projL[ 8 ] - 1 ) / projL[ 0 ];
		var rightFov = ( projR[ 8 ] + 1 ) / projR[ 0 ];
		var left = near * leftFov;
		var right = near * rightFov;

		// Calculate the new camera's position offset from the
		// left camera. xOffset should be roughly half `ipd`.
		var zOffset = ipd / ( - leftFov + rightFov );
		var xOffset = zOffset * - leftFov;

		// TODO: Better way to apply this offset?
		cameraL.matrixWorld.decompose( camera.position, camera.quaternion, camera.scale );
		camera.translateX( xOffset );
		camera.translateZ( zOffset );
		camera.matrixWorld.compose( camera.position, camera.quaternion, camera.scale );
		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		// Find the union of the frustum values of the cameras and scale
		// the values so that the near plane's position does not change in world space,
		// although must now be relative to the new union camera.
		var near2 = near + zOffset;
		var far2 = far + zOffset;
		var left2 = left - xOffset;
		var right2 = right + ( ipd - xOffset );
		var top2 = topFov * far / far2 * near2;
		var bottom2 = bottomFov * far / far2 * near2;

		camera.projectionMatrix.makePerspective( left2, right2, top2, bottom2, near2, far2 );

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebVRManager( renderer ) {

		var scope = this;

		var device = null;
		var frameData = null;

		var poseTarget = null;

		var controllers = [];
		var standingMatrix = new Matrix4();
		var standingMatrixInverse = new Matrix4();

		var framebufferScaleFactor = 1.0;

		var frameOfReferenceType = 'stage';

		if ( typeof window !== 'undefined' && 'VRFrameData' in window ) {

			frameData = new window.VRFrameData();
			window.addEventListener( 'vrdisplaypresentchange', onVRDisplayPresentChange, false );

		}

		var matrixWorldInverse = new Matrix4();
		var tempQuaternion = new Quaternion();
		var tempPosition = new Vector3();

		var cameraL = new PerspectiveCamera();
		cameraL.bounds = new Vector4( 0.0, 0.0, 0.5, 1.0 );
		cameraL.layers.enable( 1 );

		var cameraR = new PerspectiveCamera();
		cameraR.bounds = new Vector4( 0.5, 0.0, 0.5, 1.0 );
		cameraR.layers.enable( 2 );

		var cameraVR = new ArrayCamera( [ cameraL, cameraR ] );
		cameraVR.layers.enable( 1 );
		cameraVR.layers.enable( 2 );

		//

		function isPresenting() {

			return device !== null && device.isPresenting === true;

		}

		var currentSize = new Vector2(), currentPixelRatio;

		function onVRDisplayPresentChange() {

			updateDrawingBufferSize();

			if ( isPresenting() ) {

				animation.start();

			} else {

				animation.stop();

			}

		}

		//

		var triggers = [];

		function findGamepad( id ) {

			var gamepads = navigator.getGamepads && navigator.getGamepads();

			for ( var i = 0, j = 0, l = gamepads.length; i < l; i ++ ) {

				var gamepad = gamepads[ i ];

				if ( gamepad && ( gamepad.id === 'Daydream Controller' ||
					gamepad.id === 'Gear VR Controller' || gamepad.id === 'Oculus Go Controller' ||
					gamepad.id === 'OpenVR Gamepad' || gamepad.id.startsWith( 'Oculus Touch' ) ||
					gamepad.id.startsWith( 'Spatial Controller' ) ) ) {

					if ( j === id ) return gamepad;

					j ++;

				}

			}

		}

		function updateDrawingBufferSize() {

			if ( isPresenting() ) {

				var eyeParameters = device.getEyeParameters( 'left' );
				var renderWidth = eyeParameters.renderWidth * framebufferScaleFactor;
				var renderHeight = eyeParameters.renderHeight * framebufferScaleFactor;

				renderer.setDrawingBufferSize( renderWidth * 2, renderHeight, 1 );

			} else {

				if ( scope.enabled ) {

					currentPixelRatio = renderer.getPixelRatio();
					renderer.getSize( currentSize );

					renderer.setDrawingBufferSize( currentSize.width, currentSize.height, currentPixelRatio );

				}

			}

		}

		function updateControllers() {

			for ( var i = 0; i < controllers.length; i ++ ) {

				var controller = controllers[ i ];

				var gamepad = findGamepad( i );

				if ( gamepad !== undefined && gamepad.pose !== undefined ) {

					if ( gamepad.pose === null ) return;

					//  Pose

					var pose = gamepad.pose;

					if ( pose.hasPosition === false ) controller.position.set( 0.2, - 0.6, - 0.05 );

					if ( pose.position !== null ) controller.position.fromArray( pose.position );
					if ( pose.orientation !== null ) controller.quaternion.fromArray( pose.orientation );
					controller.matrix.compose( controller.position, controller.quaternion, controller.scale );
					controller.matrix.premultiply( standingMatrix );
					controller.matrix.decompose( controller.position, controller.quaternion, controller.scale );
					controller.matrixWorldNeedsUpdate = true;
					controller.visible = true;

					//  Trigger

					var buttonId = gamepad.id === 'Daydream Controller' ? 0 : 1;

					if ( triggers[ i ] !== gamepad.buttons[ buttonId ].pressed ) {

						triggers[ i ] = gamepad.buttons[ buttonId ].pressed;

						if ( triggers[ i ] === true ) {

							controller.dispatchEvent( { type: 'selectstart' } );

						} else {

							controller.dispatchEvent( { type: 'selectend' } );
							controller.dispatchEvent( { type: 'select' } );

						}

					}

				} else {

					controller.visible = false;

				}

			}

		}

		//

		this.enabled = false;

		this.getController = function ( id ) {

			var controller = controllers[ id ];

			if ( controller === undefined ) {

				controller = new Group();
				controller.matrixAutoUpdate = false;
				controller.visible = false;

				controllers[ id ] = controller;

			}

			return controller;

		};

		this.getDevice = function () {

			return device;

		};

		this.setDevice = function ( value ) {

			if ( value !== undefined ) device = value;

			animation.setContext( value );

			updateDrawingBufferSize();

			if ( isPresenting() ) animation.start();

		};

		this.setFramebufferScaleFactor = function ( value ) {

			framebufferScaleFactor = value;

		};

		this.setFrameOfReferenceType = function ( value ) {

			frameOfReferenceType = value;

		};

		this.setPoseTarget = function ( object ) {

			if ( object !== undefined ) poseTarget = object;

		};

		this.getCamera = function ( camera ) {

			var userHeight = frameOfReferenceType === 'stage' ? 1.6 : 0;

			if ( isPresenting() === false ) {

				camera.position.set( 0, userHeight, 0 );
				camera.rotation.set( 0, 0, 0 );

				return camera;

			}

			device.depthNear = camera.near;
			device.depthFar = camera.far;

			device.getFrameData( frameData );

			//

			if ( frameOfReferenceType === 'stage' ) {

				var stageParameters = device.stageParameters;

				if ( stageParameters ) {

					standingMatrix.fromArray( stageParameters.sittingToStandingTransform );

				} else {

					standingMatrix.makeTranslation( 0, userHeight, 0 );

				}

			}


			var pose = frameData.pose;
			var poseObject = poseTarget !== null ? poseTarget : camera;

			// We want to manipulate poseObject by its position and quaternion components since users may rely on them.
			poseObject.matrix.copy( standingMatrix );
			poseObject.matrix.decompose( poseObject.position, poseObject.quaternion, poseObject.scale );

			if ( pose.orientation !== null ) {

				tempQuaternion.fromArray( pose.orientation );
				poseObject.quaternion.multiply( tempQuaternion );

			}

			if ( pose.position !== null ) {

				tempQuaternion.setFromRotationMatrix( standingMatrix );
				tempPosition.fromArray( pose.position );
				tempPosition.applyQuaternion( tempQuaternion );
				poseObject.position.add( tempPosition );

			}

			poseObject.updateMatrixWorld();

			//

			cameraL.near = camera.near;
			cameraR.near = camera.near;

			cameraL.far = camera.far;
			cameraR.far = camera.far;

			cameraL.matrixWorldInverse.fromArray( frameData.leftViewMatrix );
			cameraR.matrixWorldInverse.fromArray( frameData.rightViewMatrix );

			// TODO (mrdoob) Double check this code

			standingMatrixInverse.getInverse( standingMatrix );

			if ( frameOfReferenceType === 'stage' ) {

				cameraL.matrixWorldInverse.multiply( standingMatrixInverse );
				cameraR.matrixWorldInverse.multiply( standingMatrixInverse );

			}

			var parent = poseObject.parent;

			if ( parent !== null ) {

				matrixWorldInverse.getInverse( parent.matrixWorld );

				cameraL.matrixWorldInverse.multiply( matrixWorldInverse );
				cameraR.matrixWorldInverse.multiply( matrixWorldInverse );

			}

			// envMap and Mirror needs camera.matrixWorld

			cameraL.matrixWorld.getInverse( cameraL.matrixWorldInverse );
			cameraR.matrixWorld.getInverse( cameraR.matrixWorldInverse );

			cameraL.projectionMatrix.fromArray( frameData.leftProjectionMatrix );
			cameraR.projectionMatrix.fromArray( frameData.rightProjectionMatrix );

			setProjectionFromUnion( cameraVR, cameraL, cameraR );

			//

			var layers = device.getLayers();

			if ( layers.length ) {

				var layer = layers[ 0 ];

				if ( layer.leftBounds !== null && layer.leftBounds.length === 4 ) {

					cameraL.bounds.fromArray( layer.leftBounds );

				}

				if ( layer.rightBounds !== null && layer.rightBounds.length === 4 ) {

					cameraR.bounds.fromArray( layer.rightBounds );

				}

			}

			updateControllers();

			return cameraVR;

		};

		this.getStandingMatrix = function () {

			return standingMatrix;

		};

		this.isPresenting = isPresenting;

		// Animation Loop

		var animation = new WebGLAnimation();

		this.setAnimationLoop = function ( callback ) {

			animation.setAnimationLoop( callback );

			if ( isPresenting() ) animation.start();

		};

		this.submitFrame = function () {

			if ( isPresenting() ) device.submitFrame();

		};

		this.dispose = function () {

			if ( typeof window !== 'undefined' ) {

				window.removeEventListener( 'vrdisplaypresentchange', onVRDisplayPresentChange );

			}

		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function WebXRManager( renderer ) {

		var gl = renderer.context;

		var device = null;
		var session = null;

		var framebufferScaleFactor = 1.0;

		var frameOfReference = null;
		var frameOfReferenceType = 'stage';

		var pose = null;
		var poseTarget = null;

		var controllers = [];
		var inputSources = [];

		function isPresenting() {

			return session !== null && frameOfReference !== null;

		}

		//

		var cameraL = new PerspectiveCamera();
		cameraL.layers.enable( 1 );
		cameraL.viewport = new Vector4();

		var cameraR = new PerspectiveCamera();
		cameraR.layers.enable( 2 );
		cameraR.viewport = new Vector4();

		var cameraVR = new ArrayCamera( [ cameraL, cameraR ] );
		cameraVR.layers.enable( 1 );
		cameraVR.layers.enable( 2 );

		//

		this.enabled = false;

		this.getController = function ( id ) {

			var controller = controllers[ id ];

			if ( controller === undefined ) {

				controller = new Group();
				controller.matrixAutoUpdate = false;
				controller.visible = false;

				controllers[ id ] = controller;

			}

			return controller;

		};

		this.getDevice = function () {

			return device;

		};

		this.setDevice = function ( value ) {

			if ( value !== undefined ) device = value;
			if ( value instanceof XRDevice ) gl.setCompatibleXRDevice( value );

		};

		//

		function onSessionEvent( event ) {

			var controller = controllers[ inputSources.indexOf( event.inputSource ) ];
			if ( controller ) controller.dispatchEvent( { type: event.type } );

		}

		function onSessionEnd() {

			renderer.setFramebuffer( null );
			renderer.setRenderTarget( renderer.getRenderTarget() ); // Hack #15830
			animation.stop();

		}

		this.setFramebufferScaleFactor = function ( value ) {

			framebufferScaleFactor = value;

		};

		this.setFrameOfReferenceType = function ( value ) {

			frameOfReferenceType = value;

		};

		this.setSession = function ( value ) {

			session = value;

			if ( session !== null ) {

				session.addEventListener( 'select', onSessionEvent );
				session.addEventListener( 'selectstart', onSessionEvent );
				session.addEventListener( 'selectend', onSessionEvent );
				session.addEventListener( 'end', onSessionEnd );

				session.baseLayer = new XRWebGLLayer( session, gl, { framebufferScaleFactor: framebufferScaleFactor } );
				session.requestFrameOfReference( frameOfReferenceType ).then( function ( value ) {

					frameOfReference = value;

					renderer.setFramebuffer( session.baseLayer.framebuffer );

					animation.setContext( session );
					animation.start();

				} );

				//

				inputSources = session.getInputSources();

				session.addEventListener( 'inputsourceschange', function () {

					inputSources = session.getInputSources();
					console.log( inputSources );

					for ( var i = 0; i < controllers.length; i ++ ) {

						var controller = controllers[ i ];
						controller.userData.inputSource = inputSources[ i ];

					}

				} );

			}

		};

		function updateCamera( camera, parent ) {

			if ( parent === null ) {

				camera.matrixWorld.copy( camera.matrix );

			} else {

				camera.matrixWorld.multiplyMatrices( parent.matrixWorld, camera.matrix );

			}

			camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		}

		this.setPoseTarget = function ( object ) {

			if ( object !== undefined ) poseTarget = object;

		};

		this.getCamera = function ( camera ) {

			if ( isPresenting() ) {

				var parent = camera.parent;
				var cameras = cameraVR.cameras;
				var object = poseTarget || camera;

				updateCamera( cameraVR, parent );

				for ( var i = 0; i < cameras.length; i ++ ) {

					updateCamera( cameras[ i ], parent );

				}

				// update camera and its children
				object.matrixWorld.copy( cameraVR.matrixWorld );

				var children = object.children;

				for ( var i = 0, l = children.length; i < l; i ++ ) {

					children[ i ].updateMatrixWorld( true );

				}

				setProjectionFromUnion( cameraVR, cameraL, cameraR );

				return cameraVR;

			}

			return camera;

		};

		this.getCameraPose = function ( ) {

			return pose;

		};

		this.isPresenting = isPresenting;

		// Animation Loop

		var onAnimationFrameCallback = null;

		function onAnimationFrame( time, frame ) {

			pose = frame.getDevicePose( frameOfReference );

			if ( pose !== null ) {

				var layer = session.baseLayer;
				var views = frame.views;

				for ( var i = 0; i < views.length; i ++ ) {

					var view = views[ i ];
					var viewport = layer.getViewport( view );
					var viewMatrix = pose.getViewMatrix( view );

					var camera = cameraVR.cameras[ i ];
					camera.matrix.fromArray( viewMatrix ).getInverse( camera.matrix );
					camera.projectionMatrix.fromArray( view.projectionMatrix );
					camera.viewport.set( viewport.x, viewport.y, viewport.width, viewport.height );

					if ( i === 0 ) {

						cameraVR.matrix.copy( camera.matrix );

					}

				}

			}

			//

			for ( var i = 0; i < controllers.length; i ++ ) {

				var controller = controllers[ i ];

				var inputSource = inputSources[ i ];

				if ( inputSource ) {

					var inputPose = frame.getInputPose( inputSource, frameOfReference );

					if ( inputPose !== null ) {

						if ( 'targetRay' in inputPose ) {

							controller.matrix.elements = inputPose.targetRay.transformMatrix;

						} else if ( 'pointerMatrix' in inputPose ) {

							// DEPRECATED

							controller.matrix.elements = inputPose.pointerMatrix;

						}

						controller.matrix.decompose( controller.position, controller.rotation, controller.scale );
						controller.visible = true;

						continue;

					}

				}

				controller.visible = false;

			}

			if ( onAnimationFrameCallback ) onAnimationFrameCallback( time, frame );

		}

		var animation = new WebGLAnimation();
		animation.setAnimationLoop( onAnimationFrame );

		this.setAnimationLoop = function ( callback ) {

			onAnimationFrameCallback = callback;

		};

		this.dispose = function () {};

		// DEPRECATED

		this.getStandingMatrix = function () {

			console.warn( 'THREE.WebXRManager: getStandingMatrix() is no longer needed.' );
			return new Matrix4();

		};

		this.submitFrame = function () {};

	}

	/**
	 * @author supereggbert / http://www.paulbrunt.co.uk/
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author szimek / https://github.com/szimek/
	 * @author tschw
	 */

	function WebGLRenderer( parameters ) {

		console.log( 'THREE.WebGLRenderer', REVISION );

		parameters = parameters || {};

		var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' ),
			_context = parameters.context !== undefined ? parameters.context : null,

			_alpha = parameters.alpha !== undefined ? parameters.alpha : false,
			_depth = parameters.depth !== undefined ? parameters.depth : true,
			_stencil = parameters.stencil !== undefined ? parameters.stencil : true,
			_antialias = parameters.antialias !== undefined ? parameters.antialias : false,
			_premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
			_preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
			_powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default';

		var currentRenderList = null;
		var currentRenderState = null;

		// public properties

		this.domElement = _canvas;
		this.context = null;

		// clearing

		this.autoClear = true;
		this.autoClearColor = true;
		this.autoClearDepth = true;
		this.autoClearStencil = true;

		// scene graph

		this.sortObjects = true;

		// user-defined clipping

		this.clippingPlanes = [];
		this.localClippingEnabled = false;

		// physically based shading

		this.gammaFactor = 2.0;	// for backwards compatibility
		this.gammaInput = false;
		this.gammaOutput = false;

		// physical lights

		this.physicallyCorrectLights = false;

		// tone mapping

		this.toneMapping = LinearToneMapping;
		this.toneMappingExposure = 1.0;
		this.toneMappingWhitePoint = 1.0;

		// morphs

		this.maxMorphTargets = 8;
		this.maxMorphNormals = 4;

		// internal properties

		var _this = this,

			_isContextLost = false,

			// internal state cache

			_framebuffer = null,

			_currentRenderTarget = null,
			_currentFramebuffer = null,
			_currentMaterialId = - 1,

			// geometry and program caching

			_currentGeometryProgram = {
				geometry: null,
				program: null,
				wireframe: false
			},

			_currentCamera = null,
			_currentArrayCamera = null,

			_currentViewport = new Vector4(),
			_currentScissor = new Vector4(),
			_currentScissorTest = null,

			//

			_usedTextureUnits = 0,

			//

			_width = _canvas.width,
			_height = _canvas.height,

			_pixelRatio = 1,

			_viewport = new Vector4( 0, 0, _width, _height ),
			_scissor = new Vector4( 0, 0, _width, _height ),
			_scissorTest = false,

			// frustum

			_frustum = new Frustum(),

			// clipping

			_clipping = new WebGLClipping(),
			_clippingEnabled = false,
			_localClippingEnabled = false,

			// camera matrices cache

			_projScreenMatrix = new Matrix4(),

			_vector3 = new Vector3();

		function getTargetPixelRatio() {

			return _currentRenderTarget === null ? _pixelRatio : 1;

		}

		// initialize

		var _gl;

		try {

			var contextAttributes = {
				alpha: _alpha,
				depth: _depth,
				stencil: _stencil,
				antialias: _antialias,
				premultipliedAlpha: _premultipliedAlpha,
				preserveDrawingBuffer: _preserveDrawingBuffer,
				powerPreference: _powerPreference
			};

			// event listeners must be registered before WebGL context is created, see #12753

			_canvas.addEventListener( 'webglcontextlost', onContextLost, false );
			_canvas.addEventListener( 'webglcontextrestored', onContextRestore, false );

			_gl = _context || _canvas.getContext( 'webgl', contextAttributes ) || _canvas.getContext( 'experimental-webgl', contextAttributes );

			if ( _gl === null ) {

				if ( _canvas.getContext( 'webgl' ) !== null ) {

					throw new Error( 'Error creating WebGL context with your selected attributes.' );

				} else {

					throw new Error( 'Error creating WebGL context.' );

				}

			}

			// Some experimental-webgl implementations do not have getShaderPrecisionFormat

			if ( _gl.getShaderPrecisionFormat === undefined ) {

				_gl.getShaderPrecisionFormat = function () {

					return { 'rangeMin': 1, 'rangeMax': 1, 'precision': 1 };

				};

			}

		} catch ( error ) {

			console.error( 'THREE.WebGLRenderer: ' + error.message );
			throw error;

		}

		var extensions, capabilities, state, info;
		var properties, textures, attributes, geometries, objects;
		var programCache, renderLists, renderStates;

		var background, morphtargets, bufferRenderer, indexedBufferRenderer;

		var utils;

		function initGLContext() {

			extensions = new WebGLExtensions( _gl );

			capabilities = new WebGLCapabilities( _gl, extensions, parameters );

			if ( ! capabilities.isWebGL2 ) {

				extensions.get( 'WEBGL_depth_texture' );
				extensions.get( 'OES_texture_float' );
				extensions.get( 'OES_texture_half_float' );
				extensions.get( 'OES_texture_half_float_linear' );
				extensions.get( 'OES_standard_derivatives' );
				extensions.get( 'OES_element_index_uint' );
				extensions.get( 'ANGLE_instanced_arrays' );

			}

			extensions.get( 'OES_texture_float_linear' );

			utils = new WebGLUtils( _gl, extensions, capabilities );

			state = new WebGLState( _gl, extensions, utils, capabilities );
			state.scissor( _currentScissor.copy( _scissor ).multiplyScalar( _pixelRatio ) );
			state.viewport( _currentViewport.copy( _viewport ).multiplyScalar( _pixelRatio ) );

			info = new WebGLInfo( _gl );
			properties = new WebGLProperties();
			textures = new WebGLTextures( _gl, extensions, state, properties, capabilities, utils, info );
			attributes = new WebGLAttributes( _gl );
			geometries = new WebGLGeometries( _gl, attributes, info );
			objects = new WebGLObjects( geometries, info );
			morphtargets = new WebGLMorphtargets( _gl );
			programCache = new WebGLPrograms( _this, extensions, capabilities );
			renderLists = new WebGLRenderLists();
			renderStates = new WebGLRenderStates();

			background = new WebGLBackground( _this, state, objects, _premultipliedAlpha );

			bufferRenderer = new WebGLBufferRenderer( _gl, extensions, info, capabilities );
			indexedBufferRenderer = new WebGLIndexedBufferRenderer( _gl, extensions, info, capabilities );

			info.programs = programCache.programs;

			_this.context = _gl;
			_this.capabilities = capabilities;
			_this.extensions = extensions;
			_this.properties = properties;
			_this.renderLists = renderLists;
			_this.state = state;
			_this.info = info;

		}

		initGLContext();

		// vr

		var vr = null;

		if ( typeof navigator !== 'undefined' ) {

			vr = ( 'xr' in navigator ) ? new WebXRManager( _this ) : new WebVRManager( _this );

		}

		this.vr = vr;

		// shadow map

		var shadowMap = new WebGLShadowMap( _this, objects, capabilities.maxTextureSize );

		this.shadowMap = shadowMap;

		// API

		this.getContext = function () {

			return _gl;

		};

		this.getContextAttributes = function () {

			return _gl.getContextAttributes();

		};

		this.forceContextLoss = function () {

			var extension = extensions.get( 'WEBGL_lose_context' );
			if ( extension ) extension.loseContext();

		};

		this.forceContextRestore = function () {

			var extension = extensions.get( 'WEBGL_lose_context' );
			if ( extension ) extension.restoreContext();

		};

		this.getPixelRatio = function () {

			return _pixelRatio;

		};

		this.setPixelRatio = function ( value ) {

			if ( value === undefined ) return;

			_pixelRatio = value;

			this.setSize( _width, _height, false );

		};

		this.getSize = function ( target ) {

			if ( target === undefined ) {

				console.warn( 'WebGLRenderer: .getsize() now requires a Vector2 as an argument' );

				target = new Vector2();

			}

			return target.set( _width, _height );

		};

		this.setSize = function ( width, height, updateStyle ) {

			if ( vr.isPresenting() ) {

				console.warn( 'THREE.WebGLRenderer: Can\'t change size while VR device is presenting.' );
				return;

			}

			_width = width;
			_height = height;

			_canvas.width = width * _pixelRatio;
			_canvas.height = height * _pixelRatio;

			if ( updateStyle !== false ) {

				_canvas.style.width = width + 'px';
				_canvas.style.height = height + 'px';

			}

			this.setViewport( 0, 0, width, height );

		};

		this.getDrawingBufferSize = function ( target ) {

			if ( target === undefined ) {

				console.warn( 'WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument' );

				target = new Vector2();

			}

			return target.set( _width * _pixelRatio, _height * _pixelRatio );

		};

		this.setDrawingBufferSize = function ( width, height, pixelRatio ) {

			_width = width;
			_height = height;

			_pixelRatio = pixelRatio;

			_canvas.width = width * pixelRatio;
			_canvas.height = height * pixelRatio;

			this.setViewport( 0, 0, width, height );

		};

		this.getCurrentViewport = function ( target ) {

			if ( target === undefined ) {

				console.warn( 'WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument' );

				target = new Vector4();

			}

			return target.copy( _currentViewport );

		};

		this.getViewport = function ( target ) {

			return target.copy( _viewport );

		};

		this.setViewport = function ( x, y, width, height ) {

			if ( x.isVector4 ) {

				_viewport.set( x.x, x.y, x.z, x.w );

			} else {

				_viewport.set( x, y, width, height );

			}

			state.viewport( _currentViewport.copy( _viewport ).multiplyScalar( _pixelRatio ) );

		};

		this.getScissor = function ( target ) {

			return target.copy( _scissor );

		};

		this.setScissor = function ( x, y, width, height ) {

			if ( x.isVector4 ) {

				_scissor.set( x.x, x.y, x.z, x.w );

			} else {

				_scissor.set( x, y, width, height );

			}

			state.scissor( _currentScissor.copy( _scissor ).multiplyScalar( _pixelRatio ) );

		};

		this.getScissorTest = function () {

			return _scissorTest;

		};

		this.setScissorTest = function ( boolean ) {

			state.setScissorTest( _scissorTest = boolean );

		};

		// Clearing

		this.getClearColor = function () {

			return background.getClearColor();

		};

		this.setClearColor = function () {

			background.setClearColor.apply( background, arguments );

		};

		this.getClearAlpha = function () {

			return background.getClearAlpha();

		};

		this.setClearAlpha = function () {

			background.setClearAlpha.apply( background, arguments );

		};

		this.clear = function ( color, depth, stencil ) {

			var bits = 0;

			if ( color === undefined || color ) bits |= 16384;
			if ( depth === undefined || depth ) bits |= 256;
			if ( stencil === undefined || stencil ) bits |= 1024;

			_gl.clear( bits );

		};

		this.clearColor = function () {

			this.clear( true, false, false );

		};

		this.clearDepth = function () {

			this.clear( false, true, false );

		};

		this.clearStencil = function () {

			this.clear( false, false, true );

		};

		//

		this.dispose = function () {

			_canvas.removeEventListener( 'webglcontextlost', onContextLost, false );
			_canvas.removeEventListener( 'webglcontextrestored', onContextRestore, false );

			renderLists.dispose();
			renderStates.dispose();
			properties.dispose();
			objects.dispose();

			vr.dispose();

			animation.stop();

		};

		// Events

		function onContextLost( event ) {

			event.preventDefault();

			console.log( 'THREE.WebGLRenderer: Context Lost.' );

			_isContextLost = true;

		}

		function onContextRestore( /* event */ ) {

			console.log( 'THREE.WebGLRenderer: Context Restored.' );

			_isContextLost = false;

			initGLContext();

		}

		function onMaterialDispose( event ) {

			var material = event.target;

			material.removeEventListener( 'dispose', onMaterialDispose );

			deallocateMaterial( material );

		}

		// Buffer deallocation

		function deallocateMaterial( material ) {

			releaseMaterialProgramReference( material );

			properties.remove( material );

		}


		function releaseMaterialProgramReference( material ) {

			var programInfo = properties.get( material ).program;

			material.program = undefined;

			if ( programInfo !== undefined ) {

				programCache.releaseProgram( programInfo );

			}

		}

		// Buffer rendering

		function renderObjectImmediate( object, program ) {

			object.render( function ( object ) {

				_this.renderBufferImmediate( object, program );

			} );

		}

		this.renderBufferImmediate = function ( object, program ) {

			state.initAttributes();

			var buffers = properties.get( object );

			if ( object.hasPositions && ! buffers.position ) buffers.position = _gl.createBuffer();
			if ( object.hasNormals && ! buffers.normal ) buffers.normal = _gl.createBuffer();
			if ( object.hasUvs && ! buffers.uv ) buffers.uv = _gl.createBuffer();
			if ( object.hasColors && ! buffers.color ) buffers.color = _gl.createBuffer();

			var programAttributes = program.getAttributes();

			if ( object.hasPositions ) {

				_gl.bindBuffer( 34962, buffers.position );
				_gl.bufferData( 34962, object.positionArray, 35048 );

				state.enableAttribute( programAttributes.position );
				_gl.vertexAttribPointer( programAttributes.position, 3, 5126, false, 0, 0 );

			}

			if ( object.hasNormals ) {

				_gl.bindBuffer( 34962, buffers.normal );
				_gl.bufferData( 34962, object.normalArray, 35048 );

				state.enableAttribute( programAttributes.normal );
				_gl.vertexAttribPointer( programAttributes.normal, 3, 5126, false, 0, 0 );

			}

			if ( object.hasUvs ) {

				_gl.bindBuffer( 34962, buffers.uv );
				_gl.bufferData( 34962, object.uvArray, 35048 );

				state.enableAttribute( programAttributes.uv );
				_gl.vertexAttribPointer( programAttributes.uv, 2, 5126, false, 0, 0 );

			}

			if ( object.hasColors ) {

				_gl.bindBuffer( 34962, buffers.color );
				_gl.bufferData( 34962, object.colorArray, 35048 );

				state.enableAttribute( programAttributes.color );
				_gl.vertexAttribPointer( programAttributes.color, 3, 5126, false, 0, 0 );

			}

			state.disableUnusedAttributes();

			_gl.drawArrays( 4, 0, object.count );

			object.count = 0;

		};

		this.renderBufferDirect = function ( camera, fog, geometry, material, object, group ) {

			var frontFaceCW = ( object.isMesh && object.matrixWorld.determinant() < 0 );

			state.setMaterial( material, frontFaceCW );

			var program = setProgram( camera, fog, material, object );

			var updateBuffers = false;

			if ( _currentGeometryProgram.geometry !== geometry.id ||
				_currentGeometryProgram.program !== program.id ||
				_currentGeometryProgram.wireframe !== ( material.wireframe === true ) ) {

				_currentGeometryProgram.geometry = geometry.id;
				_currentGeometryProgram.program = program.id;
				_currentGeometryProgram.wireframe = material.wireframe === true;
				updateBuffers = true;

			}

			if ( object.morphTargetInfluences ) {

				morphtargets.update( object, geometry, material, program );

				updateBuffers = true;

			}

			//

			var index = geometry.index;
			var position = geometry.attributes.position;
			var rangeFactor = 1;

			if ( material.wireframe === true ) {

				index = geometries.getWireframeAttribute( geometry );
				rangeFactor = 2;

			}

			var attribute;
			var renderer = bufferRenderer;

			if ( index !== null ) {

				attribute = attributes.get( index );

				renderer = indexedBufferRenderer;
				renderer.setIndex( attribute );

			}

			if ( updateBuffers ) {

				setupVertexAttributes( material, program, geometry );

				if ( index !== null ) {

					_gl.bindBuffer( 34963, attribute.buffer );

				}

			}

			//

			var dataCount = Infinity;

			if ( index !== null ) {

				dataCount = index.count;

			} else if ( position !== undefined ) {

				dataCount = position.count;

			}

			var rangeStart = geometry.drawRange.start * rangeFactor;
			var rangeCount = geometry.drawRange.count * rangeFactor;

			var groupStart = group !== null ? group.start * rangeFactor : 0;
			var groupCount = group !== null ? group.count * rangeFactor : Infinity;

			var drawStart = Math.max( rangeStart, groupStart );
			var drawEnd = Math.min( dataCount, rangeStart + rangeCount, groupStart + groupCount ) - 1;

			var drawCount = Math.max( 0, drawEnd - drawStart + 1 );

			if ( drawCount === 0 ) return;

			//

			if ( object.isMesh ) {

				if ( material.wireframe === true ) {

					state.setLineWidth( material.wireframeLinewidth * getTargetPixelRatio() );
					renderer.setMode( 1 );

				} else {

					switch ( object.drawMode ) {

						case TrianglesDrawMode:
							renderer.setMode( 4 );
							break;

						case TriangleStripDrawMode:
							renderer.setMode( 5 );
							break;

						case TriangleFanDrawMode:
							renderer.setMode( 6 );
							break;

					}

				}


			} else if ( object.isLine ) {

				var lineWidth = material.linewidth;

				if ( lineWidth === undefined ) lineWidth = 1; // Not using Line*Material

				state.setLineWidth( lineWidth * getTargetPixelRatio() );

				if ( object.isLineSegments ) {

					renderer.setMode( 1 );

				} else if ( object.isLineLoop ) {

					renderer.setMode( 2 );

				} else {

					renderer.setMode( 3 );

				}

			} else if ( object.isPoints ) {

				renderer.setMode( 0 );

			} else if ( object.isSprite ) {

				renderer.setMode( 4 );

			}

			if ( geometry && geometry.isInstancedBufferGeometry ) {

				if ( geometry.maxInstancedCount > 0 ) {

					renderer.renderInstances( geometry, drawStart, drawCount );

				}

			} else {

				renderer.render( drawStart, drawCount );

			}

		};

		function setupVertexAttributes( material, program, geometry ) {

			if ( geometry && geometry.isInstancedBufferGeometry && ! capabilities.isWebGL2 ) {

				if ( extensions.get( 'ANGLE_instanced_arrays' ) === null ) {

					console.error( 'THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
					return;

				}

			}

			state.initAttributes();

			var geometryAttributes = geometry.attributes;

			var programAttributes = program.getAttributes();

			var materialDefaultAttributeValues = material.defaultAttributeValues;

			for ( var name in programAttributes ) {

				var programAttribute = programAttributes[ name ];

				if ( programAttribute >= 0 ) {

					var geometryAttribute = geometryAttributes[ name ];

					if ( geometryAttribute !== undefined ) {

						var normalized = geometryAttribute.normalized;
						var size = geometryAttribute.itemSize;

						var attribute = attributes.get( geometryAttribute );

						// TODO Attribute may not be available on context restore

						if ( attribute === undefined ) continue;

						var buffer = attribute.buffer;
						var type = attribute.type;
						var bytesPerElement = attribute.bytesPerElement;

						if ( geometryAttribute.isInterleavedBufferAttribute ) {

							var data = geometryAttribute.data;
							var stride = data.stride;
							var offset = geometryAttribute.offset;

							if ( data && data.isInstancedInterleavedBuffer ) {

								state.enableAttributeAndDivisor( programAttribute, data.meshPerAttribute );

								if ( geometry.maxInstancedCount === undefined ) {

									geometry.maxInstancedCount = data.meshPerAttribute * data.count;

								}

							} else {

								state.enableAttribute( programAttribute );

							}

							_gl.bindBuffer( 34962, buffer );
							_gl.vertexAttribPointer( programAttribute, size, type, normalized, stride * bytesPerElement, offset * bytesPerElement );

						} else {

							if ( geometryAttribute.isInstancedBufferAttribute ) {

								state.enableAttributeAndDivisor( programAttribute, geometryAttribute.meshPerAttribute );

								if ( geometry.maxInstancedCount === undefined ) {

									geometry.maxInstancedCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;

								}

							} else {

								state.enableAttribute( programAttribute );

							}

							_gl.bindBuffer( 34962, buffer );
							_gl.vertexAttribPointer( programAttribute, size, type, normalized, 0, 0 );

						}

					} else if ( materialDefaultAttributeValues !== undefined ) {

						var value = materialDefaultAttributeValues[ name ];

						if ( value !== undefined ) {

							switch ( value.length ) {

								case 2:
									_gl.vertexAttrib2fv( programAttribute, value );
									break;

								case 3:
									_gl.vertexAttrib3fv( programAttribute, value );
									break;

								case 4:
									_gl.vertexAttrib4fv( programAttribute, value );
									break;

								default:
									_gl.vertexAttrib1fv( programAttribute, value );

							}

						}

					}

				}

			}

			state.disableUnusedAttributes();

		}

		// Compile

		this.compile = function ( scene, camera ) {

			currentRenderState = renderStates.get( scene, camera );
			currentRenderState.init();

			scene.traverse( function ( object ) {

				if ( object.isLight ) {

					currentRenderState.pushLight( object );

					if ( object.castShadow ) {

						currentRenderState.pushShadow( object );

					}

				}

			} );

			currentRenderState.setupLights( camera );

			scene.traverse( function ( object ) {

				if ( object.material ) {

					if ( Array.isArray( object.material ) ) {

						for ( var i = 0; i < object.material.length; i ++ ) {

							initMaterial( object.material[ i ], scene.fog, object );

						}

					} else {

						initMaterial( object.material, scene.fog, object );

					}

				}

			} );

		};

		// Animation Loop

		var onAnimationFrameCallback = null;

		function onAnimationFrame( time ) {

			if ( vr.isPresenting() ) return;
			if ( onAnimationFrameCallback ) onAnimationFrameCallback( time );

		}

		var animation = new WebGLAnimation();
		animation.setAnimationLoop( onAnimationFrame );

		if ( typeof window !== 'undefined' ) animation.setContext( window );

		this.setAnimationLoop = function ( callback ) {

			onAnimationFrameCallback = callback;
			vr.setAnimationLoop( callback );

			animation.start();

		};

		// Rendering

		this.render = function ( scene, camera ) {

			var renderTarget, forceClear;

			if ( arguments[ 2 ] !== undefined ) {

				console.warn( 'THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead.' );
				renderTarget = arguments[ 2 ];

			}

			if ( arguments[ 3 ] !== undefined ) {

				console.warn( 'THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead.' );
				forceClear = arguments[ 3 ];

			}

			if ( ! ( camera && camera.isCamera ) ) {

				console.error( 'THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.' );
				return;

			}

			if ( _isContextLost ) return;

			// reset caching for this frame

			_currentGeometryProgram.geometry = null;
			_currentGeometryProgram.program = null;
			_currentGeometryProgram.wireframe = false;
			_currentMaterialId = - 1;
			_currentCamera = null;

			// update scene graph

			if ( scene.autoUpdate === true ) scene.updateMatrixWorld();

			// update camera matrices and frustum

			if ( camera.parent === null ) camera.updateMatrixWorld();

			if ( vr.enabled ) {

				camera = vr.getCamera( camera );

			}

			//

			currentRenderState = renderStates.get( scene, camera );
			currentRenderState.init();

			scene.onBeforeRender( _this, scene, camera, renderTarget || _currentRenderTarget );

			_projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
			_frustum.setFromMatrix( _projScreenMatrix );

			_localClippingEnabled = this.localClippingEnabled;
			_clippingEnabled = _clipping.init( this.clippingPlanes, _localClippingEnabled, camera );

			currentRenderList = renderLists.get( scene, camera );
			currentRenderList.init();

			projectObject( scene, camera, 0, _this.sortObjects );

			if ( _this.sortObjects === true ) {

				currentRenderList.sort();

			}

			//

			if ( _clippingEnabled ) _clipping.beginShadows();

			var shadowsArray = currentRenderState.state.shadowsArray;

			shadowMap.render( shadowsArray, scene, camera );

			currentRenderState.setupLights( camera );

			if ( _clippingEnabled ) _clipping.endShadows();

			//

			if ( this.info.autoReset ) this.info.reset();

			if ( renderTarget !== undefined ) {

				this.setRenderTarget( renderTarget );

			}

			//

			background.render( currentRenderList, scene, camera, forceClear );

			// render scene

			var opaqueObjects = currentRenderList.opaque;
			var transparentObjects = currentRenderList.transparent;

			if ( scene.overrideMaterial ) {

				var overrideMaterial = scene.overrideMaterial;

				if ( opaqueObjects.length ) renderObjects( opaqueObjects, scene, camera, overrideMaterial );
				if ( transparentObjects.length ) renderObjects( transparentObjects, scene, camera, overrideMaterial );

			} else {

				// opaque pass (front-to-back order)

				if ( opaqueObjects.length ) renderObjects( opaqueObjects, scene, camera );

				// transparent pass (back-to-front order)

				if ( transparentObjects.length ) renderObjects( transparentObjects, scene, camera );

			}

			//

			scene.onAfterRender( _this, scene, camera );

			//

			if ( _currentRenderTarget !== null ) {

				// Generate mipmap if we're using any kind of mipmap filtering

				textures.updateRenderTargetMipmap( _currentRenderTarget );

				// resolve multisample renderbuffers to a single-sample texture if necessary

				textures.updateMultisampleRenderTarget( _currentRenderTarget );

			}

			// Ensure depth buffer writing is enabled so it can be cleared on next render

			state.buffers.depth.setTest( true );
			state.buffers.depth.setMask( true );
			state.buffers.color.setMask( true );

			state.setPolygonOffset( false );

			if ( vr.enabled ) {

				vr.submitFrame();

			}

			// _gl.finish();

			currentRenderList = null;
			currentRenderState = null;

		};

		function projectObject( object, camera, groupOrder, sortObjects ) {

			if ( object.visible === false ) return;

			var visible = object.layers.test( camera.layers );

			if ( visible ) {

				if ( object.isGroup ) {

					groupOrder = object.renderOrder;

				} else if ( object.isLight ) {

					currentRenderState.pushLight( object );

					if ( object.castShadow ) {

						currentRenderState.pushShadow( object );

					}

				} else if ( object.isSprite ) {

					if ( ! object.frustumCulled || _frustum.intersectsSprite( object ) ) {

						if ( sortObjects ) {

							_vector3.setFromMatrixPosition( object.matrixWorld )
								.applyMatrix4( _projScreenMatrix );

						}

						var geometry = objects.update( object );
						var material = object.material;

						if ( material.visible ) {

							currentRenderList.push( object, geometry, material, groupOrder, _vector3.z, null );

						}

					}

				} else if ( object.isImmediateRenderObject ) {

					if ( sortObjects ) {

						_vector3.setFromMatrixPosition( object.matrixWorld )
							.applyMatrix4( _projScreenMatrix );

					}

					currentRenderList.push( object, null, object.material, groupOrder, _vector3.z, null );

				} else if ( object.isMesh || object.isLine || object.isPoints ) {

					if ( object.isSkinnedMesh ) {

						object.skeleton.update();

					}

					if ( ! object.frustumCulled || _frustum.intersectsObject( object ) ) {

						if ( sortObjects ) {

							_vector3.setFromMatrixPosition( object.matrixWorld )
								.applyMatrix4( _projScreenMatrix );

						}

						var geometry = objects.update( object );
						var material = object.material;

						if ( Array.isArray( material ) ) {

							var groups = geometry.groups;

							for ( var i = 0, l = groups.length; i < l; i ++ ) {

								var group = groups[ i ];
								var groupMaterial = material[ group.materialIndex ];

								if ( groupMaterial && groupMaterial.visible ) {

									currentRenderList.push( object, geometry, groupMaterial, groupOrder, _vector3.z, group );

								}

							}

						} else if ( material.visible ) {

							currentRenderList.push( object, geometry, material, groupOrder, _vector3.z, null );

						}

					}

				}

			}

			var children = object.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				projectObject( children[ i ], camera, groupOrder, sortObjects );

			}

		}

		function renderObjects( renderList, scene, camera, overrideMaterial ) {

			for ( var i = 0, l = renderList.length; i < l; i ++ ) {

				var renderItem = renderList[ i ];

				var object = renderItem.object;
				var geometry = renderItem.geometry;
				var material = overrideMaterial === undefined ? renderItem.material : overrideMaterial;
				var group = renderItem.group;

				if ( camera.isArrayCamera ) {

					_currentArrayCamera = camera;

					var cameras = camera.cameras;

					for ( var j = 0, jl = cameras.length; j < jl; j ++ ) {

						var camera2 = cameras[ j ];

						if ( object.layers.test( camera2.layers ) ) {

							if ( 'viewport' in camera2 ) { // XR

								state.viewport( _currentViewport.copy( camera2.viewport ) );

							} else {

								var bounds = camera2.bounds;

								var x = bounds.x * _width;
								var y = bounds.y * _height;
								var width = bounds.z * _width;
								var height = bounds.w * _height;

								state.viewport( _currentViewport.set( x, y, width, height ).multiplyScalar( _pixelRatio ) );

							}

							currentRenderState.setupLights( camera2 );

							renderObject( object, scene, camera2, geometry, material, group );

						}

					}

				} else {

					_currentArrayCamera = null;

					renderObject( object, scene, camera, geometry, material, group );

				}

			}

		}

		function renderObject( object, scene, camera, geometry, material, group ) {

			object.onBeforeRender( _this, scene, camera, geometry, material, group );
			currentRenderState = renderStates.get( scene, _currentArrayCamera || camera );

			object.modelViewMatrix.multiplyMatrices( camera.matrixWorldInverse, object.matrixWorld );
			object.normalMatrix.getNormalMatrix( object.modelViewMatrix );

			if ( object.isImmediateRenderObject ) {

				state.setMaterial( material );

				var program = setProgram( camera, scene.fog, material, object );

				_currentGeometryProgram.geometry = null;
				_currentGeometryProgram.program = null;
				_currentGeometryProgram.wireframe = false;

				renderObjectImmediate( object, program );

			} else {

				_this.renderBufferDirect( camera, scene.fog, geometry, material, object, group );

			}

			object.onAfterRender( _this, scene, camera, geometry, material, group );
			currentRenderState = renderStates.get( scene, _currentArrayCamera || camera );

		}

		function initMaterial( material, fog, object ) {

			var materialProperties = properties.get( material );

			var lights = currentRenderState.state.lights;
			var shadowsArray = currentRenderState.state.shadowsArray;

			var lightsHash = materialProperties.lightsHash;
			var lightsStateHash = lights.state.hash;

			var parameters = programCache.getParameters(
				material, lights.state, shadowsArray, fog, _clipping.numPlanes, _clipping.numIntersection, object );

			var code = programCache.getProgramCode( material, parameters );

			var program = materialProperties.program;
			var programChange = true;

			if ( program === undefined ) {

				// new material
				material.addEventListener( 'dispose', onMaterialDispose );

			} else if ( program.code !== code ) {

				// changed glsl or parameters
				releaseMaterialProgramReference( material );

			} else if ( lightsHash.stateID !== lightsStateHash.stateID ||
				lightsHash.directionalLength !== lightsStateHash.directionalLength ||
				lightsHash.pointLength !== lightsStateHash.pointLength ||
				lightsHash.spotLength !== lightsStateHash.spotLength ||
				lightsHash.rectAreaLength !== lightsStateHash.rectAreaLength ||
				lightsHash.hemiLength !== lightsStateHash.hemiLength ||
				lightsHash.shadowsLength !== lightsStateHash.shadowsLength ) {

				lightsHash.stateID = lightsStateHash.stateID;
				lightsHash.directionalLength = lightsStateHash.directionalLength;
				lightsHash.pointLength = lightsStateHash.pointLength;
				lightsHash.spotLength = lightsStateHash.spotLength;
				lightsHash.rectAreaLength = lightsStateHash.rectAreaLength;
				lightsHash.hemiLength = lightsStateHash.hemiLength;
				lightsHash.shadowsLength = lightsStateHash.shadowsLength;

				programChange = false;

			} else if ( parameters.shaderID !== undefined ) {

				// same glsl and uniform list
				return;

			} else {

				// only rebuild uniform list
				programChange = false;

			}

			if ( programChange ) {

				if ( parameters.shaderID ) {

					var shader = ShaderLib[ parameters.shaderID ];

					materialProperties.shader = {
						name: material.type,
						uniforms: cloneUniforms( shader.uniforms ),
						vertexShader: shader.vertexShader,
						fragmentShader: shader.fragmentShader
					};

				} else {

					materialProperties.shader = {
						name: material.type,
						uniforms: material.uniforms,
						vertexShader: material.vertexShader,
						fragmentShader: material.fragmentShader
					};

				}

				material.onBeforeCompile( materialProperties.shader, _this );

				// Computing code again as onBeforeCompile may have changed the shaders
				code = programCache.getProgramCode( material, parameters );

				program = programCache.acquireProgram( material, materialProperties.shader, parameters, code );

				materialProperties.program = program;
				material.program = program;

			}

			var programAttributes = program.getAttributes();

			if ( material.morphTargets ) {

				material.numSupportedMorphTargets = 0;

				for ( var i = 0; i < _this.maxMorphTargets; i ++ ) {

					if ( programAttributes[ 'morphTarget' + i ] >= 0 ) {

						material.numSupportedMorphTargets ++;

					}

				}

			}

			if ( material.morphNormals ) {

				material.numSupportedMorphNormals = 0;

				for ( var i = 0; i < _this.maxMorphNormals; i ++ ) {

					if ( programAttributes[ 'morphNormal' + i ] >= 0 ) {

						material.numSupportedMorphNormals ++;

					}

				}

			}

			var uniforms = materialProperties.shader.uniforms;

			if ( ! material.isShaderMaterial &&
				! material.isRawShaderMaterial ||
				material.clipping === true ) {

				materialProperties.numClippingPlanes = _clipping.numPlanes;
				materialProperties.numIntersection = _clipping.numIntersection;
				uniforms.clippingPlanes = _clipping.uniform;

			}

			materialProperties.fog = fog;

			// store the light setup it was created for
			if ( lightsHash === undefined ) {

				materialProperties.lightsHash = lightsHash = {};

			}

			lightsHash.stateID = lightsStateHash.stateID;
			lightsHash.directionalLength = lightsStateHash.directionalLength;
			lightsHash.pointLength = lightsStateHash.pointLength;
			lightsHash.spotLength = lightsStateHash.spotLength;
			lightsHash.rectAreaLength = lightsStateHash.rectAreaLength;
			lightsHash.hemiLength = lightsStateHash.hemiLength;
			lightsHash.shadowsLength = lightsStateHash.shadowsLength;

			if ( material.lights ) {

				// wire up the material to this renderer's lighting state

				uniforms.ambientLightColor.value = lights.state.ambient;
				uniforms.directionalLights.value = lights.state.directional;
				uniforms.spotLights.value = lights.state.spot;
				uniforms.rectAreaLights.value = lights.state.rectArea;
				uniforms.pointLights.value = lights.state.point;
				uniforms.hemisphereLights.value = lights.state.hemi;

				uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
				uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
				uniforms.spotShadowMap.value = lights.state.spotShadowMap;
				uniforms.spotShadowMatrix.value = lights.state.spotShadowMatrix;
				uniforms.pointShadowMap.value = lights.state.pointShadowMap;
				uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
				// TODO (abelnation): add area lights shadow info to uniforms

			}

			var progUniforms = materialProperties.program.getUniforms(),
				uniformsList =
					WebGLUniforms.seqWithValue( progUniforms.seq, uniforms );

			materialProperties.uniformsList = uniformsList;

		}

		function setProgram( camera, fog, material, object ) {

			_usedTextureUnits = 0;

			var materialProperties = properties.get( material );
			var lights = currentRenderState.state.lights;

			var lightsHash = materialProperties.lightsHash;
			var lightsStateHash = lights.state.hash;

			if ( _clippingEnabled ) {

				if ( _localClippingEnabled || camera !== _currentCamera ) {

					var useCache =
						camera === _currentCamera &&
						material.id === _currentMaterialId;

					// we might want to call this function with some ClippingGroup
					// object instead of the material, once it becomes feasible
					// (#8465, #8379)
					_clipping.setState(
						material.clippingPlanes, material.clipIntersection, material.clipShadows,
						camera, materialProperties, useCache );

				}

			}

			if ( material.needsUpdate === false ) {

				if ( materialProperties.program === undefined ) {

					material.needsUpdate = true;

				} else if ( material.fog && materialProperties.fog !== fog ) {

					material.needsUpdate = true;

				} else if ( material.lights && ( lightsHash.stateID !== lightsStateHash.stateID ||
					lightsHash.directionalLength !== lightsStateHash.directionalLength ||
					lightsHash.pointLength !== lightsStateHash.pointLength ||
					lightsHash.spotLength !== lightsStateHash.spotLength ||
					lightsHash.rectAreaLength !== lightsStateHash.rectAreaLength ||
					lightsHash.hemiLength !== lightsStateHash.hemiLength ||
					lightsHash.shadowsLength !== lightsStateHash.shadowsLength ) ) {

					material.needsUpdate = true;

				} else if ( materialProperties.numClippingPlanes !== undefined &&
					( materialProperties.numClippingPlanes !== _clipping.numPlanes ||
					materialProperties.numIntersection !== _clipping.numIntersection ) ) {

					material.needsUpdate = true;

				}

			}

			if ( material.needsUpdate ) {

				initMaterial( material, fog, object );
				material.needsUpdate = false;

			}

			var refreshProgram = false;
			var refreshMaterial = false;
			var refreshLights = false;

			var program = materialProperties.program,
				p_uniforms = program.getUniforms(),
				m_uniforms = materialProperties.shader.uniforms;

			if ( state.useProgram( program.program ) ) {

				refreshProgram = true;
				refreshMaterial = true;
				refreshLights = true;

			}

			if ( material.id !== _currentMaterialId ) {

				_currentMaterialId = material.id;

				refreshMaterial = true;

			}

			if ( refreshProgram || _currentCamera !== camera ) {

				p_uniforms.setValue( _gl, 'projectionMatrix', camera.projectionMatrix );

				if ( capabilities.logarithmicDepthBuffer ) {

					p_uniforms.setValue( _gl, 'logDepthBufFC',
						2.0 / ( Math.log( camera.far + 1.0 ) / Math.LN2 ) );

				}

				if ( _currentCamera !== camera ) {

					_currentCamera = camera;

					// lighting uniforms depend on the camera so enforce an update
					// now, in case this material supports lights - or later, when
					// the next material that does gets activated:

					refreshMaterial = true;		// set to true on material change
					refreshLights = true;		// remains set until update done

				}

				// load material specific uniforms
				// (shader material also gets them for the sake of genericity)

				if ( material.isShaderMaterial ||
					material.isMeshPhongMaterial ||
					material.isMeshStandardMaterial ||
					material.envMap ) {

					var uCamPos = p_uniforms.map.cameraPosition;

					if ( uCamPos !== undefined ) {

						uCamPos.setValue( _gl,
							_vector3.setFromMatrixPosition( camera.matrixWorld ) );

					}

				}

				if ( material.isMeshPhongMaterial ||
					material.isMeshLambertMaterial ||
					material.isMeshBasicMaterial ||
					material.isMeshStandardMaterial ||
					material.isShaderMaterial ||
					material.skinning ) {

					p_uniforms.setValue( _gl, 'viewMatrix', camera.matrixWorldInverse );

				}

			}

			// skinning uniforms must be set even if material didn't change
			// auto-setting of texture unit for bone texture must go before other textures
			// not sure why, but otherwise weird things happen

			if ( material.skinning ) {

				p_uniforms.setOptional( _gl, object, 'bindMatrix' );
				p_uniforms.setOptional( _gl, object, 'bindMatrixInverse' );

				var skeleton = object.skeleton;

				if ( skeleton ) {

					var bones = skeleton.bones;

					if ( capabilities.floatVertexTextures ) {

						if ( skeleton.boneTexture === undefined ) {

							// layout (1 matrix = 4 pixels)
							//      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
							//  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
							//       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
							//       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
							//       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)


							var size = Math.sqrt( bones.length * 4 ); // 4 pixels needed for 1 matrix
							size = _Math.ceilPowerOfTwo( size );
							size = Math.max( size, 4 );

							var boneMatrices = new Float32Array( size * size * 4 ); // 4 floats per RGBA pixel
							boneMatrices.set( skeleton.boneMatrices ); // copy current values

							var boneTexture = new DataTexture( boneMatrices, size, size, RGBAFormat, FloatType );
							boneTexture.needsUpdate = true;

							skeleton.boneMatrices = boneMatrices;
							skeleton.boneTexture = boneTexture;
							skeleton.boneTextureSize = size;

						}

						p_uniforms.setValue( _gl, 'boneTexture', skeleton.boneTexture );
						p_uniforms.setValue( _gl, 'boneTextureSize', skeleton.boneTextureSize );

					} else {

						p_uniforms.setOptional( _gl, skeleton, 'boneMatrices' );

					}

				}

			}

			if ( refreshMaterial ) {

				p_uniforms.setValue( _gl, 'toneMappingExposure', _this.toneMappingExposure );
				p_uniforms.setValue( _gl, 'toneMappingWhitePoint', _this.toneMappingWhitePoint );

				if ( material.lights ) {

					// the current material requires lighting info

					// note: all lighting uniforms are always set correctly
					// they simply reference the renderer's state for their
					// values
					//
					// use the current material's .needsUpdate flags to set
					// the GL state when required

					markUniformsLightsNeedsUpdate( m_uniforms, refreshLights );

				}

				// refresh uniforms common to several materials

				if ( fog && material.fog ) {

					refreshUniformsFog( m_uniforms, fog );

				}

				if ( material.isMeshBasicMaterial ) {

					refreshUniformsCommon( m_uniforms, material );

				} else if ( material.isMeshLambertMaterial ) {

					refreshUniformsCommon( m_uniforms, material );
					refreshUniformsLambert( m_uniforms, material );

				} else if ( material.isMeshPhongMaterial ) {

					refreshUniformsCommon( m_uniforms, material );

					if ( material.isMeshToonMaterial ) {

						refreshUniformsToon( m_uniforms, material );

					} else {

						refreshUniformsPhong( m_uniforms, material );

					}

				} else if ( material.isMeshStandardMaterial ) {

					refreshUniformsCommon( m_uniforms, material );

					if ( material.isMeshPhysicalMaterial ) {

						refreshUniformsPhysical( m_uniforms, material );

					} else {

						refreshUniformsStandard( m_uniforms, material );

					}

				} else if ( material.isMeshMatcapMaterial ) {

					refreshUniformsCommon( m_uniforms, material );

					refreshUniformsMatcap( m_uniforms, material );

				} else if ( material.isMeshDepthMaterial ) {

					refreshUniformsCommon( m_uniforms, material );
					refreshUniformsDepth( m_uniforms, material );

				} else if ( material.isMeshDistanceMaterial ) {

					refreshUniformsCommon( m_uniforms, material );
					refreshUniformsDistance( m_uniforms, material );

				} else if ( material.isMeshNormalMaterial ) {

					refreshUniformsCommon( m_uniforms, material );
					refreshUniformsNormal( m_uniforms, material );

				} else if ( material.isLineBasicMaterial ) {

					refreshUniformsLine( m_uniforms, material );

					if ( material.isLineDashedMaterial ) {

						refreshUniformsDash( m_uniforms, material );

					}

				} else if ( material.isPointsMaterial ) {

					refreshUniformsPoints( m_uniforms, material );

				} else if ( material.isSpriteMaterial ) {

					refreshUniformsSprites( m_uniforms, material );

				} else if ( material.isShadowMaterial ) {

					m_uniforms.color.value = material.color;
					m_uniforms.opacity.value = material.opacity;

				}

				// RectAreaLight Texture
				// TODO (mrdoob): Find a nicer implementation

				if ( m_uniforms.ltc_1 !== undefined ) m_uniforms.ltc_1.value = UniformsLib.LTC_1;
				if ( m_uniforms.ltc_2 !== undefined ) m_uniforms.ltc_2.value = UniformsLib.LTC_2;

				WebGLUniforms.upload( _gl, materialProperties.uniformsList, m_uniforms, _this );

			}

			if ( material.isShaderMaterial && material.uniformsNeedUpdate === true ) {

				WebGLUniforms.upload( _gl, materialProperties.uniformsList, m_uniforms, _this );
				material.uniformsNeedUpdate = false;

			}

			if ( material.isSpriteMaterial ) {

				p_uniforms.setValue( _gl, 'center', object.center );

			}

			// common matrices

			p_uniforms.setValue( _gl, 'modelViewMatrix', object.modelViewMatrix );
			p_uniforms.setValue( _gl, 'normalMatrix', object.normalMatrix );
			p_uniforms.setValue( _gl, 'modelMatrix', object.matrixWorld );

			return program;

		}

		// Uniforms (refresh uniforms objects)

		function refreshUniformsCommon( uniforms, material ) {

			uniforms.opacity.value = material.opacity;

			if ( material.color ) {

				uniforms.diffuse.value = material.color;

			}

			if ( material.emissive ) {

				uniforms.emissive.value.copy( material.emissive ).multiplyScalar( material.emissiveIntensity );

			}

			if ( material.map ) {

				uniforms.map.value = material.map;

			}

			if ( material.alphaMap ) {

				uniforms.alphaMap.value = material.alphaMap;

			}

			if ( material.specularMap ) {

				uniforms.specularMap.value = material.specularMap;

			}

			if ( material.envMap ) {

				uniforms.envMap.value = material.envMap;

				// don't flip CubeTexture envMaps, flip everything else:
				//  WebGLRenderTargetCube will be flipped for backwards compatibility
				//  WebGLRenderTargetCube.texture will be flipped because it's a Texture and NOT a CubeTexture
				// this check must be handled differently, or removed entirely, if WebGLRenderTargetCube uses a CubeTexture in the future
				uniforms.flipEnvMap.value = material.envMap.isCubeTexture ? - 1 : 1;

				uniforms.reflectivity.value = material.reflectivity;
				uniforms.refractionRatio.value = material.refractionRatio;

				uniforms.maxMipLevel.value = properties.get( material.envMap ).__maxMipLevel;

			}

			if ( material.lightMap ) {

				uniforms.lightMap.value = material.lightMap;
				uniforms.lightMapIntensity.value = material.lightMapIntensity;

			}

			if ( material.aoMap ) {

				uniforms.aoMap.value = material.aoMap;
				uniforms.aoMapIntensity.value = material.aoMapIntensity;

			}

			// uv repeat and offset setting priorities
			// 1. color map
			// 2. specular map
			// 3. normal map
			// 4. bump map
			// 5. alpha map
			// 6. emissive map

			var uvScaleMap;

			if ( material.map ) {

				uvScaleMap = material.map;

			} else if ( material.specularMap ) {

				uvScaleMap = material.specularMap;

			} else if ( material.displacementMap ) {

				uvScaleMap = material.displacementMap;

			} else if ( material.normalMap ) {

				uvScaleMap = material.normalMap;

			} else if ( material.bumpMap ) {

				uvScaleMap = material.bumpMap;

			} else if ( material.roughnessMap ) {

				uvScaleMap = material.roughnessMap;

			} else if ( material.metalnessMap ) {

				uvScaleMap = material.metalnessMap;

			} else if ( material.alphaMap ) {

				uvScaleMap = material.alphaMap;

			} else if ( material.emissiveMap ) {

				uvScaleMap = material.emissiveMap;

			}

			if ( uvScaleMap !== undefined ) {

				// backwards compatibility
				if ( uvScaleMap.isWebGLRenderTarget ) {

					uvScaleMap = uvScaleMap.texture;

				}

				if ( uvScaleMap.matrixAutoUpdate === true ) {

					uvScaleMap.updateMatrix();

				}

				uniforms.uvTransform.value.copy( uvScaleMap.matrix );

			}

		}

		function refreshUniformsLine( uniforms, material ) {

			uniforms.diffuse.value = material.color;
			uniforms.opacity.value = material.opacity;

		}

		function refreshUniformsDash( uniforms, material ) {

			uniforms.dashSize.value = material.dashSize;
			uniforms.totalSize.value = material.dashSize + material.gapSize;
			uniforms.scale.value = material.scale;

		}

		function refreshUniformsPoints( uniforms, material ) {

			uniforms.diffuse.value = material.color;
			uniforms.opacity.value = material.opacity;
			uniforms.size.value = material.size * _pixelRatio;
			uniforms.scale.value = _height * 0.5;

			uniforms.map.value = material.map;

			if ( material.map !== null ) {

				if ( material.map.matrixAutoUpdate === true ) {

					material.map.updateMatrix();

				}

				uniforms.uvTransform.value.copy( material.map.matrix );

			}

		}

		function refreshUniformsSprites( uniforms, material ) {

			uniforms.diffuse.value = material.color;
			uniforms.opacity.value = material.opacity;
			uniforms.rotation.value = material.rotation;
			uniforms.map.value = material.map;

			if ( material.map !== null ) {

				if ( material.map.matrixAutoUpdate === true ) {

					material.map.updateMatrix();

				}

				uniforms.uvTransform.value.copy( material.map.matrix );

			}

		}

		function refreshUniformsFog( uniforms, fog ) {

			uniforms.fogColor.value = fog.color;

			if ( fog.isFog ) {

				uniforms.fogNear.value = fog.near;
				uniforms.fogFar.value = fog.far;

			} else if ( fog.isFogExp2 ) {

				uniforms.fogDensity.value = fog.density;

			}

		}

		function refreshUniformsLambert( uniforms, material ) {

			if ( material.emissiveMap ) {

				uniforms.emissiveMap.value = material.emissiveMap;

			}

		}

		function refreshUniformsPhong( uniforms, material ) {

			uniforms.specular.value = material.specular;
			uniforms.shininess.value = Math.max( material.shininess, 1e-4 ); // to prevent pow( 0.0, 0.0 )

			if ( material.emissiveMap ) {

				uniforms.emissiveMap.value = material.emissiveMap;

			}

			if ( material.bumpMap ) {

				uniforms.bumpMap.value = material.bumpMap;
				uniforms.bumpScale.value = material.bumpScale;
				if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

			}

			if ( material.normalMap ) {

				uniforms.normalMap.value = material.normalMap;
				uniforms.normalScale.value.copy( material.normalScale );
				if ( material.side === BackSide ) uniforms.normalScale.value.negate();

			}

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

		}

		function refreshUniformsToon( uniforms, material ) {

			refreshUniformsPhong( uniforms, material );

			if ( material.gradientMap ) {

				uniforms.gradientMap.value = material.gradientMap;

			}

		}

		function refreshUniformsStandard( uniforms, material ) {

			uniforms.roughness.value = material.roughness;
			uniforms.metalness.value = material.metalness;

			if ( material.roughnessMap ) {

				uniforms.roughnessMap.value = material.roughnessMap;

			}

			if ( material.metalnessMap ) {

				uniforms.metalnessMap.value = material.metalnessMap;

			}

			if ( material.emissiveMap ) {

				uniforms.emissiveMap.value = material.emissiveMap;

			}

			if ( material.bumpMap ) {

				uniforms.bumpMap.value = material.bumpMap;
				uniforms.bumpScale.value = material.bumpScale;
				if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

			}

			if ( material.normalMap ) {

				uniforms.normalMap.value = material.normalMap;
				uniforms.normalScale.value.copy( material.normalScale );
				if ( material.side === BackSide ) uniforms.normalScale.value.negate();

			}

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

			if ( material.envMap ) {

				//uniforms.envMap.value = material.envMap; // part of uniforms common
				uniforms.envMapIntensity.value = material.envMapIntensity;

			}

		}

		function refreshUniformsPhysical( uniforms, material ) {

			refreshUniformsStandard( uniforms, material );

			uniforms.reflectivity.value = material.reflectivity; // also part of uniforms common

			uniforms.clearCoat.value = material.clearCoat;
			uniforms.clearCoatRoughness.value = material.clearCoatRoughness;

		}

		function refreshUniformsMatcap( uniforms, material ) {

			if ( material.matcap ) {

				uniforms.matcap.value = material.matcap;

			}

			if ( material.bumpMap ) {

				uniforms.bumpMap.value = material.bumpMap;
				uniforms.bumpScale.value = material.bumpScale;
				if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

			}

			if ( material.normalMap ) {

				uniforms.normalMap.value = material.normalMap;
				uniforms.normalScale.value.copy( material.normalScale );
				if ( material.side === BackSide ) uniforms.normalScale.value.negate();

			}

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

		}

		function refreshUniformsDepth( uniforms, material ) {

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

		}

		function refreshUniformsDistance( uniforms, material ) {

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

			uniforms.referencePosition.value.copy( material.referencePosition );
			uniforms.nearDistance.value = material.nearDistance;
			uniforms.farDistance.value = material.farDistance;

		}

		function refreshUniformsNormal( uniforms, material ) {

			if ( material.bumpMap ) {

				uniforms.bumpMap.value = material.bumpMap;
				uniforms.bumpScale.value = material.bumpScale;
				if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

			}

			if ( material.normalMap ) {

				uniforms.normalMap.value = material.normalMap;
				uniforms.normalScale.value.copy( material.normalScale );
				if ( material.side === BackSide ) uniforms.normalScale.value.negate();

			}

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

		}

		// If uniforms are marked as clean, they don't need to be loaded to the GPU.

		function markUniformsLightsNeedsUpdate( uniforms, value ) {

			uniforms.ambientLightColor.needsUpdate = value;

			uniforms.directionalLights.needsUpdate = value;
			uniforms.pointLights.needsUpdate = value;
			uniforms.spotLights.needsUpdate = value;
			uniforms.rectAreaLights.needsUpdate = value;
			uniforms.hemisphereLights.needsUpdate = value;

		}

		// Textures

		function allocTextureUnit() {

			var textureUnit = _usedTextureUnits;

			if ( textureUnit >= capabilities.maxTextures ) {

				console.warn( 'THREE.WebGLRenderer: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + capabilities.maxTextures );

			}

			_usedTextureUnits += 1;

			return textureUnit;

		}

		this.allocTextureUnit = allocTextureUnit;

		// this.setTexture2D = setTexture2D;
		this.setTexture2D = ( function () {

			var warned = false;

			// backwards compatibility: peel texture.texture
			return function setTexture2D( texture, slot ) {

				if ( texture && texture.isWebGLRenderTarget ) {

					if ( ! warned ) {

						console.warn( "THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead." );
						warned = true;

					}

					texture = texture.texture;

				}

				textures.setTexture2D( texture, slot );

			};

		}() );

		this.setTexture2DArray = function ( texture, slot ) {

			textures.setTexture2DArray( texture, slot );

		};

		this.setTexture3D = function ( texture, slot ) {

			textures.setTexture3D( texture, slot );

		};

		this.setTexture = ( function () {

			var warned = false;

			return function setTexture( texture, slot ) {

				if ( ! warned ) {

					console.warn( "THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead." );
					warned = true;

				}

				textures.setTexture2D( texture, slot );

			};

		}() );

		this.setTextureCube = ( function () {

			var warned = false;

			return function setTextureCube( texture, slot ) {

				// backwards compatibility: peel texture.texture
				if ( texture && texture.isWebGLRenderTargetCube ) {

					if ( ! warned ) {

						console.warn( "THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead." );
						warned = true;

					}

					texture = texture.texture;

				}

				// currently relying on the fact that WebGLRenderTargetCube.texture is a Texture and NOT a CubeTexture
				// TODO: unify these code paths
				if ( ( texture && texture.isCubeTexture ) ||
					( Array.isArray( texture.image ) && texture.image.length === 6 ) ) {

					// CompressedTexture can have Array in image :/

					// this function alone should take care of cube textures
					textures.setTextureCube( texture, slot );

				} else {

					// assumed: texture property of THREE.WebGLRenderTargetCube

					textures.setTextureCubeDynamic( texture, slot );

				}

			};

		}() );

		//

		this.setFramebuffer = function ( value ) {

			_framebuffer = value;

		};

		this.getRenderTarget = function () {

			return _currentRenderTarget;

		};

		this.setRenderTarget = function ( renderTarget, activeCubeFace, activeMipMapLevel ) {

			_currentRenderTarget = renderTarget;

			if ( renderTarget && properties.get( renderTarget ).__webglFramebuffer === undefined ) {

				textures.setupRenderTarget( renderTarget );

			}

			var framebuffer = _framebuffer;
			var isCube = false;

			if ( renderTarget ) {

				var __webglFramebuffer = properties.get( renderTarget ).__webglFramebuffer;

				if ( renderTarget.isWebGLRenderTargetCube ) {

					framebuffer = __webglFramebuffer[ activeCubeFace || 0 ];
					isCube = true;

				} else if ( renderTarget.isWebGLMultisampleRenderTarget ) {

					framebuffer = properties.get( renderTarget ).__webglMultisampledFramebuffer;

				} else {

					framebuffer = __webglFramebuffer;

				}

				_currentViewport.copy( renderTarget.viewport );
				_currentScissor.copy( renderTarget.scissor );
				_currentScissorTest = renderTarget.scissorTest;

			} else {

				_currentViewport.copy( _viewport ).multiplyScalar( _pixelRatio );
				_currentScissor.copy( _scissor ).multiplyScalar( _pixelRatio );
				_currentScissorTest = _scissorTest;

			}

			if ( _currentFramebuffer !== framebuffer ) {

				_gl.bindFramebuffer( 36160, framebuffer );
				_currentFramebuffer = framebuffer;

			}

			state.viewport( _currentViewport );
			state.scissor( _currentScissor );
			state.setScissorTest( _currentScissorTest );

			if ( isCube ) {

				var textureProperties = properties.get( renderTarget.texture );
				_gl.framebufferTexture2D( 36160, 36064, 34069 + ( activeCubeFace || 0 ), textureProperties.__webglTexture, activeMipMapLevel || 0 );

			}

		};

		this.readRenderTargetPixels = function ( renderTarget, x, y, width, height, buffer ) {

			if ( ! ( renderTarget && renderTarget.isWebGLRenderTarget ) ) {

				console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.' );
				return;

			}

			var framebuffer = properties.get( renderTarget ).__webglFramebuffer;

			if ( framebuffer ) {

				var restore = false;

				if ( framebuffer !== _currentFramebuffer ) {

					_gl.bindFramebuffer( 36160, framebuffer );

					restore = true;

				}

				try {

					var texture = renderTarget.texture;
					var textureFormat = texture.format;
					var textureType = texture.type;

					if ( textureFormat !== RGBAFormat && utils.convert( textureFormat ) !== _gl.getParameter( 35739 ) ) {

						console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.' );
						return;

					}

					if ( textureType !== UnsignedByteType && utils.convert( textureType ) !== _gl.getParameter( 35738 ) && // IE11, Edge and Chrome Mac < 52 (#9513)
						! ( textureType === FloatType && ( capabilities.isWebGL2 || extensions.get( 'OES_texture_float' ) || extensions.get( 'WEBGL_color_buffer_float' ) ) ) && // Chrome Mac >= 52 and Firefox
						! ( textureType === HalfFloatType && ( capabilities.isWebGL2 ? extensions.get( 'EXT_color_buffer_float' ) : extensions.get( 'EXT_color_buffer_half_float' ) ) ) ) {

						console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.' );
						return;

					}

					if ( _gl.checkFramebufferStatus( 36160 ) === 36053 ) {

						// the following if statement ensures valid read requests (no out-of-bounds pixels, see #8604)

						if ( ( x >= 0 && x <= ( renderTarget.width - width ) ) && ( y >= 0 && y <= ( renderTarget.height - height ) ) ) {

							_gl.readPixels( x, y, width, height, utils.convert( textureFormat ), utils.convert( textureType ), buffer );

						}

					} else {

						console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.' );

					}

				} finally {

					if ( restore ) {

						_gl.bindFramebuffer( 36160, _currentFramebuffer );

					}

				}

			}

		};

		this.copyFramebufferToTexture = function ( position, texture, level ) {

			var width = texture.image.width;
			var height = texture.image.height;
			var glFormat = utils.convert( texture.format );

			this.setTexture2D( texture, 0 );

			_gl.copyTexImage2D( 3553, level || 0, glFormat, position.x, position.y, width, height, 0 );

		};

		this.copyTextureToTexture = function ( position, srcTexture, dstTexture, level ) {

			var width = srcTexture.image.width;
			var height = srcTexture.image.height;
			var glFormat = utils.convert( dstTexture.format );
			var glType = utils.convert( dstTexture.type );

			this.setTexture2D( dstTexture, 0 );

			if ( srcTexture.isDataTexture ) {

				_gl.texSubImage2D( 3553, level || 0, position.x, position.y, width, height, glFormat, glType, srcTexture.image.data );

			} else {

				_gl.texSubImage2D( 3553, level || 0, position.x, position.y, glFormat, glType, srcTexture.image );

			}

		};

	}

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */

	function FogExp2( color, density ) {

		this.name = '';

		this.color = new Color( color );
		this.density = ( density !== undefined ) ? density : 0.00025;

	}

	Object.assign( FogExp2.prototype, {

		isFogExp2: true,

		clone: function () {

			return new FogExp2( this.color, this.density );

		},

		toJSON: function ( /* meta */ ) {

			return {
				type: 'FogExp2',
				color: this.color.getHex(),
				density: this.density
			};

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */

	function Fog( color, near, far ) {

		this.name = '';

		this.color = new Color( color );

		this.near = ( near !== undefined ) ? near : 1;
		this.far = ( far !== undefined ) ? far : 1000;

	}

	Object.assign( Fog.prototype, {

		isFog: true,

		clone: function () {

			return new Fog( this.color, this.near, this.far );

		},

		toJSON: function ( /* meta */ ) {

			return {
				type: 'Fog',
				color: this.color.getHex(),
				near: this.near,
				far: this.far
			};

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function Scene() {

		Object3D.call( this );

		this.type = 'Scene';

		this.background = null;
		this.fog = null;
		this.overrideMaterial = null;

		this.autoUpdate = true; // checked by the renderer

	}

	Scene.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Scene,

		isScene: true,

		copy: function ( source, recursive ) {

			Object3D.prototype.copy.call( this, source, recursive );

			if ( source.background !== null ) this.background = source.background.clone();
			if ( source.fog !== null ) this.fog = source.fog.clone();
			if ( source.overrideMaterial !== null ) this.overrideMaterial = source.overrideMaterial.clone();

			this.autoUpdate = source.autoUpdate;
			this.matrixAutoUpdate = source.matrixAutoUpdate;

			return this;

		},

		toJSON: function ( meta ) {

			var data = Object3D.prototype.toJSON.call( this, meta );

			if ( this.background !== null ) data.object.background = this.background.toJSON( meta );
			if ( this.fog !== null ) data.object.fog = this.fog.toJSON();

			return data;

		},

		dispose: function () {

			this.dispatchEvent( { type: 'dispose' } );

		}

	} );

	/**
	 * @author benaadams / https://twitter.com/ben_a_adams
	 */

	function InterleavedBuffer( array, stride ) {

		this.array = array;
		this.stride = stride;
		this.count = array !== undefined ? array.length / stride : 0;

		this.dynamic = false;
		this.updateRange = { offset: 0, count: - 1 };

		this.version = 0;

	}

	Object.defineProperty( InterleavedBuffer.prototype, 'needsUpdate', {

		set: function ( value ) {

			if ( value === true ) this.version ++;

		}

	} );

	Object.assign( InterleavedBuffer.prototype, {

		isInterleavedBuffer: true,

		onUploadCallback: function () {},

		setArray: function ( array ) {

			if ( Array.isArray( array ) ) {

				throw new TypeError( 'THREE.BufferAttribute: array should be a Typed Array.' );

			}

			this.count = array !== undefined ? array.length / this.stride : 0;
			this.array = array;

			return this;

		},

		setDynamic: function ( value ) {

			this.dynamic = value;

			return this;

		},

		copy: function ( source ) {

			this.array = new source.array.constructor( source.array );
			this.count = source.count;
			this.stride = source.stride;
			this.dynamic = source.dynamic;

			return this;

		},

		copyAt: function ( index1, attribute, index2 ) {

			index1 *= this.stride;
			index2 *= attribute.stride;

			for ( var i = 0, l = this.stride; i < l; i ++ ) {

				this.array[ index1 + i ] = attribute.array[ index2 + i ];

			}

			return this;

		},

		set: function ( value, offset ) {

			if ( offset === undefined ) offset = 0;

			this.array.set( value, offset );

			return this;

		},

		clone: function () {

			return new this.constructor().copy( this );

		},

		onUpload: function ( callback ) {

			this.onUploadCallback = callback;

			return this;

		}

	} );

	/**
	 * @author benaadams / https://twitter.com/ben_a_adams
	 */

	function InterleavedBufferAttribute( interleavedBuffer, itemSize, offset, normalized ) {

		this.data = interleavedBuffer;
		this.itemSize = itemSize;
		this.offset = offset;

		this.normalized = normalized === true;

	}

	Object.defineProperties( InterleavedBufferAttribute.prototype, {

		count: {

			get: function () {

				return this.data.count;

			}

		},

		array: {

			get: function () {

				return this.data.array;

			}

		}

	} );

	Object.assign( InterleavedBufferAttribute.prototype, {

		isInterleavedBufferAttribute: true,

		setX: function ( index, x ) {

			this.data.array[ index * this.data.stride + this.offset ] = x;

			return this;

		},

		setY: function ( index, y ) {

			this.data.array[ index * this.data.stride + this.offset + 1 ] = y;

			return this;

		},

		setZ: function ( index, z ) {

			this.data.array[ index * this.data.stride + this.offset + 2 ] = z;

			return this;

		},

		setW: function ( index, w ) {

			this.data.array[ index * this.data.stride + this.offset + 3 ] = w;

			return this;

		},

		getX: function ( index ) {

			return this.data.array[ index * this.data.stride + this.offset ];

		},

		getY: function ( index ) {

			return this.data.array[ index * this.data.stride + this.offset + 1 ];

		},

		getZ: function ( index ) {

			return this.data.array[ index * this.data.stride + this.offset + 2 ];

		},

		getW: function ( index ) {

			return this.data.array[ index * this.data.stride + this.offset + 3 ];

		},

		setXY: function ( index, x, y ) {

			index = index * this.data.stride + this.offset;

			this.data.array[ index + 0 ] = x;
			this.data.array[ index + 1 ] = y;

			return this;

		},

		setXYZ: function ( index, x, y, z ) {

			index = index * this.data.stride + this.offset;

			this.data.array[ index + 0 ] = x;
			this.data.array[ index + 1 ] = y;
			this.data.array[ index + 2 ] = z;

			return this;

		},

		setXYZW: function ( index, x, y, z, w ) {

			index = index * this.data.stride + this.offset;

			this.data.array[ index + 0 ] = x;
			this.data.array[ index + 1 ] = y;
			this.data.array[ index + 2 ] = z;
			this.data.array[ index + 3 ] = w;

			return this;

		}

	} );

	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  map: new THREE.Texture( <Image> ),
	 *  rotation: <float>,
	 *  sizeAttenuation: <bool>
	 * }
	 */

	function SpriteMaterial( parameters ) {

		Material.call( this );

		this.type = 'SpriteMaterial';

		this.color = new Color( 0xffffff );
		this.map = null;

		this.rotation = 0;

		this.sizeAttenuation = true;

		this.lights = false;
		this.transparent = true;

		this.setValues( parameters );

	}

	SpriteMaterial.prototype = Object.create( Material.prototype );
	SpriteMaterial.prototype.constructor = SpriteMaterial;
	SpriteMaterial.prototype.isSpriteMaterial = true;

	SpriteMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );
		this.map = source.map;

		this.rotation = source.rotation;

		this.sizeAttenuation = source.sizeAttenuation;

		return this;

	};

	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 */

	var geometry;

	function Sprite( material ) {

		Object3D.call( this );

		this.type = 'Sprite';

		if ( geometry === undefined ) {

			geometry = new BufferGeometry();

			var float32Array = new Float32Array( [
				- 0.5, - 0.5, 0, 0, 0,
				0.5, - 0.5, 0, 1, 0,
				0.5, 0.5, 0, 1, 1,
				- 0.5, 0.5, 0, 0, 1
			] );

			var interleavedBuffer = new InterleavedBuffer( float32Array, 5 );

			geometry.setIndex( [ 0, 1, 2,	0, 2, 3 ] );
			geometry.addAttribute( 'position', new InterleavedBufferAttribute( interleavedBuffer, 3, 0, false ) );
			geometry.addAttribute( 'uv', new InterleavedBufferAttribute( interleavedBuffer, 2, 3, false ) );

		}

		this.geometry = geometry;
		this.material = ( material !== undefined ) ? material : new SpriteMaterial();

		this.center = new Vector2( 0.5, 0.5 );

	}

	Sprite.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Sprite,

		isSprite: true,

		raycast: ( function () {

			var intersectPoint = new Vector3();
			var worldScale = new Vector3();
			var mvPosition = new Vector3();

			var alignedPosition = new Vector2();
			var rotatedPosition = new Vector2();
			var viewWorldMatrix = new Matrix4();

			var vA = new Vector3();
			var vB = new Vector3();
			var vC = new Vector3();

			var uvA = new Vector2();
			var uvB = new Vector2();
			var uvC = new Vector2();

			function transformVertex( vertexPosition, mvPosition, center, scale, sin, cos ) {

				// compute position in camera space
				alignedPosition.subVectors( vertexPosition, center ).addScalar( 0.5 ).multiply( scale );

				// to check if rotation is not zero
				if ( sin !== undefined ) {

					rotatedPosition.x = ( cos * alignedPosition.x ) - ( sin * alignedPosition.y );
					rotatedPosition.y = ( sin * alignedPosition.x ) + ( cos * alignedPosition.y );

				} else {

					rotatedPosition.copy( alignedPosition );

				}


				vertexPosition.copy( mvPosition );
				vertexPosition.x += rotatedPosition.x;
				vertexPosition.y += rotatedPosition.y;

				// transform to world space
				vertexPosition.applyMatrix4( viewWorldMatrix );

			}

			return function raycast( raycaster, intersects ) {

				worldScale.setFromMatrixScale( this.matrixWorld );
				viewWorldMatrix.getInverse( this.modelViewMatrix ).premultiply( this.matrixWorld );
				mvPosition.setFromMatrixPosition( this.modelViewMatrix );

				var rotation = this.material.rotation;
				var sin, cos;
				if ( rotation !== 0 ) {

					cos = Math.cos( rotation );
					sin = Math.sin( rotation );

				}

				var center = this.center;

				transformVertex( vA.set( - 0.5, - 0.5, 0 ), mvPosition, center, worldScale, sin, cos );
				transformVertex( vB.set( 0.5, - 0.5, 0 ), mvPosition, center, worldScale, sin, cos );
				transformVertex( vC.set( 0.5, 0.5, 0 ), mvPosition, center, worldScale, sin, cos );

				uvA.set( 0, 0 );
				uvB.set( 1, 0 );
				uvC.set( 1, 1 );

				// check first triangle
				var intersect = raycaster.ray.intersectTriangle( vA, vB, vC, false, intersectPoint );

				if ( intersect === null ) {

					// check second triangle
					transformVertex( vB.set( - 0.5, 0.5, 0 ), mvPosition, center, worldScale, sin, cos );
					uvB.set( 0, 1 );

					intersect = raycaster.ray.intersectTriangle( vA, vC, vB, false, intersectPoint );
					if ( intersect === null ) {

						return;

					}

				}

				var distance = raycaster.ray.origin.distanceTo( intersectPoint );

				if ( distance < raycaster.near || distance > raycaster.far ) return;

				intersects.push( {

					distance: distance,
					point: intersectPoint.clone(),
					uv: Triangle.getUV( intersectPoint, vA, vB, vC, uvA, uvB, uvC, new Vector2() ),
					face: null,
					object: this

				} );

			};

		}() ),

		clone: function () {

			return new this.constructor( this.material ).copy( this );

		},

		copy: function ( source ) {

			Object3D.prototype.copy.call( this, source );

			if ( source.center !== undefined ) this.center.copy( source.center );

			return this;

		}


	} );

	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 */

	function LOD() {

		Object3D.call( this );

		this.type = 'LOD';

		Object.defineProperties( this, {
			levels: {
				enumerable: true,
				value: []
			}
		} );

	}

	LOD.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: LOD,

		copy: function ( source ) {

			Object3D.prototype.copy.call( this, source, false );

			var levels = source.levels;

			for ( var i = 0, l = levels.length; i < l; i ++ ) {

				var level = levels[ i ];

				this.addLevel( level.object.clone(), level.distance );

			}

			return this;

		},

		addLevel: function ( object, distance ) {

			if ( distance === undefined ) distance = 0;

			distance = Math.abs( distance );

			var levels = this.levels;

			for ( var l = 0; l < levels.length; l ++ ) {

				if ( distance < levels[ l ].distance ) {

					break;

				}

			}

			levels.splice( l, 0, { distance: distance, object: object } );

			this.add( object );

		},

		getObjectForDistance: function ( distance ) {

			var levels = this.levels;

			for ( var i = 1, l = levels.length; i < l; i ++ ) {

				if ( distance < levels[ i ].distance ) {

					break;

				}

			}

			return levels[ i - 1 ].object;

		},

		raycast: ( function () {

			var matrixPosition = new Vector3();

			return function raycast( raycaster, intersects ) {

				matrixPosition.setFromMatrixPosition( this.matrixWorld );

				var distance = raycaster.ray.origin.distanceTo( matrixPosition );

				this.getObjectForDistance( distance ).raycast( raycaster, intersects );

			};

		}() ),

		update: function () {

			var v1 = new Vector3();
			var v2 = new Vector3();

			return function update( camera ) {

				var levels = this.levels;

				if ( levels.length > 1 ) {

					v1.setFromMatrixPosition( camera.matrixWorld );
					v2.setFromMatrixPosition( this.matrixWorld );

					var distance = v1.distanceTo( v2 );

					levels[ 0 ].object.visible = true;

					for ( var i = 1, l = levels.length; i < l; i ++ ) {

						if ( distance >= levels[ i ].distance ) {

							levels[ i - 1 ].object.visible = false;
							levels[ i ].object.visible = true;

						} else {

							break;

						}

					}

					for ( ; i < l; i ++ ) {

						levels[ i ].object.visible = false;

					}

				}

			};

		}(),

		toJSON: function ( meta ) {

			var data = Object3D.prototype.toJSON.call( this, meta );

			data.object.levels = [];

			var levels = this.levels;

			for ( var i = 0, l = levels.length; i < l; i ++ ) {

				var level = levels[ i ];

				data.object.levels.push( {
					object: level.object.uuid,
					distance: level.distance
				} );

			}

			return data;

		}

	} );

	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 * @author ikerr / http://verold.com
	 */

	function SkinnedMesh( geometry, material ) {

		if ( geometry && geometry.isGeometry ) {

			console.error( 'THREE.SkinnedMesh no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.' );

		}

		Mesh.call( this, geometry, material );

		this.type = 'SkinnedMesh';

		this.bindMode = 'attached';
		this.bindMatrix = new Matrix4();
		this.bindMatrixInverse = new Matrix4();

	}

	SkinnedMesh.prototype = Object.assign( Object.create( Mesh.prototype ), {

		constructor: SkinnedMesh,

		isSkinnedMesh: true,

		bind: function ( skeleton, bindMatrix ) {

			this.skeleton = skeleton;

			if ( bindMatrix === undefined ) {

				this.updateMatrixWorld( true );

				this.skeleton.calculateInverses();

				bindMatrix = this.matrixWorld;

			}

			this.bindMatrix.copy( bindMatrix );
			this.bindMatrixInverse.getInverse( bindMatrix );

		},

		pose: function () {

			this.skeleton.pose();

		},

		normalizeSkinWeights: function () {

			var vector = new Vector4();

			var skinWeight = this.geometry.attributes.skinWeight;

			for ( var i = 0, l = skinWeight.count; i < l; i ++ ) {

				vector.x = skinWeight.getX( i );
				vector.y = skinWeight.getY( i );
				vector.z = skinWeight.getZ( i );
				vector.w = skinWeight.getW( i );

				var scale = 1.0 / vector.manhattanLength();

				if ( scale !== Infinity ) {

					vector.multiplyScalar( scale );

				} else {

					vector.set( 1, 0, 0, 0 ); // do something reasonable

				}

				skinWeight.setXYZW( i, vector.x, vector.y, vector.z, vector.w );

			}

		},

		updateMatrixWorld: function ( force ) {

			Mesh.prototype.updateMatrixWorld.call( this, force );

			if ( this.bindMode === 'attached' ) {

				this.bindMatrixInverse.getInverse( this.matrixWorld );

			} else if ( this.bindMode === 'detached' ) {

				this.bindMatrixInverse.getInverse( this.bindMatrix );

			} else {

				console.warn( 'THREE.SkinnedMesh: Unrecognized bindMode: ' + this.bindMode );

			}

		},

		clone: function () {

			return new this.constructor( this.geometry, this.material ).copy( this );

		}

	} );

	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 * @author michael guerrero / http://realitymeltdown.com
	 * @author ikerr / http://verold.com
	 */

	function Skeleton( bones, boneInverses ) {

		// copy the bone array

		bones = bones || [];

		this.bones = bones.slice( 0 );
		this.boneMatrices = new Float32Array( this.bones.length * 16 );

		// use the supplied bone inverses or calculate the inverses

		if ( boneInverses === undefined ) {

			this.calculateInverses();

		} else {

			if ( this.bones.length === boneInverses.length ) {

				this.boneInverses = boneInverses.slice( 0 );

			} else {

				console.warn( 'THREE.Skeleton boneInverses is the wrong length.' );

				this.boneInverses = [];

				for ( var i = 0, il = this.bones.length; i < il; i ++ ) {

					this.boneInverses.push( new Matrix4() );

				}

			}

		}

	}

	Object.assign( Skeleton.prototype, {

		calculateInverses: function () {

			this.boneInverses = [];

			for ( var i = 0, il = this.bones.length; i < il; i ++ ) {

				var inverse = new Matrix4();

				if ( this.bones[ i ] ) {

					inverse.getInverse( this.bones[ i ].matrixWorld );

				}

				this.boneInverses.push( inverse );

			}

		},

		pose: function () {

			var bone, i, il;

			// recover the bind-time world matrices

			for ( i = 0, il = this.bones.length; i < il; i ++ ) {

				bone = this.bones[ i ];

				if ( bone ) {

					bone.matrixWorld.getInverse( this.boneInverses[ i ] );

				}

			}

			// compute the local matrices, positions, rotations and scales

			for ( i = 0, il = this.bones.length; i < il; i ++ ) {

				bone = this.bones[ i ];

				if ( bone ) {

					if ( bone.parent && bone.parent.isBone ) {

						bone.matrix.getInverse( bone.parent.matrixWorld );
						bone.matrix.multiply( bone.matrixWorld );

					} else {

						bone.matrix.copy( bone.matrixWorld );

					}

					bone.matrix.decompose( bone.position, bone.quaternion, bone.scale );

				}

			}

		},

		update: ( function () {

			var offsetMatrix = new Matrix4();
			var identityMatrix = new Matrix4();

			return function update() {

				var bones = this.bones;
				var boneInverses = this.boneInverses;
				var boneMatrices = this.boneMatrices;
				var boneTexture = this.boneTexture;

				// flatten bone matrices to array

				for ( var i = 0, il = bones.length; i < il; i ++ ) {

					// compute the offset between the current and the original transform

					var matrix = bones[ i ] ? bones[ i ].matrixWorld : identityMatrix;

					offsetMatrix.multiplyMatrices( matrix, boneInverses[ i ] );
					offsetMatrix.toArray( boneMatrices, i * 16 );

				}

				if ( boneTexture !== undefined ) {

					boneTexture.needsUpdate = true;

				}

			};

		} )(),

		clone: function () {

			return new Skeleton( this.bones, this.boneInverses );

		},

		getBoneByName: function ( name ) {

			for ( var i = 0, il = this.bones.length; i < il; i ++ ) {

				var bone = this.bones[ i ];

				if ( bone.name === name ) {

					return bone;

				}

			}

			return undefined;

		}

	} );

	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author alteredq / http://alteredqualia.com/
	 * @author ikerr / http://verold.com
	 */

	function Bone() {

		Object3D.call( this );

		this.type = 'Bone';

	}

	Bone.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Bone,

		isBone: true

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *
	 *  linewidth: <float>,
	 *  linecap: "round",
	 *  linejoin: "round"
	 * }
	 */

	function LineBasicMaterial( parameters ) {

		Material.call( this );

		this.type = 'LineBasicMaterial';

		this.color = new Color( 0xffffff );

		this.linewidth = 1;
		this.linecap = 'round';
		this.linejoin = 'round';

		this.lights = false;

		this.setValues( parameters );

	}

	LineBasicMaterial.prototype = Object.create( Material.prototype );
	LineBasicMaterial.prototype.constructor = LineBasicMaterial;

	LineBasicMaterial.prototype.isLineBasicMaterial = true;

	LineBasicMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );

		this.linewidth = source.linewidth;
		this.linecap = source.linecap;
		this.linejoin = source.linejoin;

		return this;

	};

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function Line( geometry, material, mode ) {

		if ( mode === 1 ) {

			console.error( 'THREE.Line: parameter THREE.LinePieces no longer supported. Use THREE.LineSegments instead.' );

		}

		Object3D.call( this );

		this.type = 'Line';

		this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
		this.material = material !== undefined ? material : new LineBasicMaterial( { color: Math.random() * 0xffffff } );

	}

	Line.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Line,

		isLine: true,

		computeLineDistances: ( function () {

			var start = new Vector3();
			var end = new Vector3();

			return function computeLineDistances() {

				var geometry = this.geometry;

				if ( geometry.isBufferGeometry ) {

					// we assume non-indexed geometry

					if ( geometry.index === null ) {

						var positionAttribute = geometry.attributes.position;
						var lineDistances = [ 0 ];

						for ( var i = 1, l = positionAttribute.count; i < l; i ++ ) {

							start.fromBufferAttribute( positionAttribute, i - 1 );
							end.fromBufferAttribute( positionAttribute, i );

							lineDistances[ i ] = lineDistances[ i - 1 ];
							lineDistances[ i ] += start.distanceTo( end );

						}

						geometry.addAttribute( 'lineDistance', new Float32BufferAttribute( lineDistances, 1 ) );

					} else {

						console.warn( 'THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.' );

					}

				} else if ( geometry.isGeometry ) {

					var vertices = geometry.vertices;
					var lineDistances = geometry.lineDistances;

					lineDistances[ 0 ] = 0;

					for ( var i = 1, l = vertices.length; i < l; i ++ ) {

						lineDistances[ i ] = lineDistances[ i - 1 ];
						lineDistances[ i ] += vertices[ i - 1 ].distanceTo( vertices[ i ] );

					}

				}

				return this;

			};

		}() ),

		raycast: ( function () {

			var inverseMatrix = new Matrix4();
			var ray = new Ray();
			var sphere = new Sphere();

			return function raycast( raycaster, intersects ) {

				var precision = raycaster.linePrecision;

				var geometry = this.geometry;
				var matrixWorld = this.matrixWorld;

				// Checking boundingSphere distance to ray

				if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

				sphere.copy( geometry.boundingSphere );
				sphere.applyMatrix4( matrixWorld );
				sphere.radius += precision;

				if ( raycaster.ray.intersectsSphere( sphere ) === false ) return;

				//

				inverseMatrix.getInverse( matrixWorld );
				ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );

				var localPrecision = precision / ( ( this.scale.x + this.scale.y + this.scale.z ) / 3 );
				var localPrecisionSq = localPrecision * localPrecision;

				var vStart = new Vector3();
				var vEnd = new Vector3();
				var interSegment = new Vector3();
				var interRay = new Vector3();
				var step = ( this && this.isLineSegments ) ? 2 : 1;

				if ( geometry.isBufferGeometry ) {

					var index = geometry.index;
					var attributes = geometry.attributes;
					var positions = attributes.position.array;

					if ( index !== null ) {

						var indices = index.array;

						for ( var i = 0, l = indices.length - 1; i < l; i += step ) {

							var a = indices[ i ];
							var b = indices[ i + 1 ];

							vStart.fromArray( positions, a * 3 );
							vEnd.fromArray( positions, b * 3 );

							var distSq = ray.distanceSqToSegment( vStart, vEnd, interRay, interSegment );

							if ( distSq > localPrecisionSq ) continue;

							interRay.applyMatrix4( this.matrixWorld ); //Move back to world space for distance calculation

							var distance = raycaster.ray.origin.distanceTo( interRay );

							if ( distance < raycaster.near || distance > raycaster.far ) continue;

							intersects.push( {

								distance: distance,
								// What do we want? intersection point on the ray or on the segment??
								// point: raycaster.ray.at( distance ),
								point: interSegment.clone().applyMatrix4( this.matrixWorld ),
								index: i,
								face: null,
								faceIndex: null,
								object: this

							} );

						}

					} else {

						for ( var i = 0, l = positions.length / 3 - 1; i < l; i += step ) {

							vStart.fromArray( positions, 3 * i );
							vEnd.fromArray( positions, 3 * i + 3 );

							var distSq = ray.distanceSqToSegment( vStart, vEnd, interRay, interSegment );

							if ( distSq > localPrecisionSq ) continue;

							interRay.applyMatrix4( this.matrixWorld ); //Move back to world space for distance calculation

							var distance = raycaster.ray.origin.distanceTo( interRay );

							if ( distance < raycaster.near || distance > raycaster.far ) continue;

							intersects.push( {

								distance: distance,
								// What do we want? intersection point on the ray or on the segment??
								// point: raycaster.ray.at( distance ),
								point: interSegment.clone().applyMatrix4( this.matrixWorld ),
								index: i,
								face: null,
								faceIndex: null,
								object: this

							} );

						}

					}

				} else if ( geometry.isGeometry ) {

					var vertices = geometry.vertices;
					var nbVertices = vertices.length;

					for ( var i = 0; i < nbVertices - 1; i += step ) {

						var distSq = ray.distanceSqToSegment( vertices[ i ], vertices[ i + 1 ], interRay, interSegment );

						if ( distSq > localPrecisionSq ) continue;

						interRay.applyMatrix4( this.matrixWorld ); //Move back to world space for distance calculation

						var distance = raycaster.ray.origin.distanceTo( interRay );

						if ( distance < raycaster.near || distance > raycaster.far ) continue;

						intersects.push( {

							distance: distance,
							// What do we want? intersection point on the ray or on the segment??
							// point: raycaster.ray.at( distance ),
							point: interSegment.clone().applyMatrix4( this.matrixWorld ),
							index: i,
							face: null,
							faceIndex: null,
							object: this

						} );

					}

				}

			};

		}() ),

		clone: function () {

			return new this.constructor( this.geometry, this.material ).copy( this );

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function LineSegments( geometry, material ) {

		Line.call( this, geometry, material );

		this.type = 'LineSegments';

	}

	LineSegments.prototype = Object.assign( Object.create( Line.prototype ), {

		constructor: LineSegments,

		isLineSegments: true,

		computeLineDistances: ( function () {

			var start = new Vector3();
			var end = new Vector3();

			return function computeLineDistances() {

				var geometry = this.geometry;

				if ( geometry.isBufferGeometry ) {

					// we assume non-indexed geometry

					if ( geometry.index === null ) {

						var positionAttribute = geometry.attributes.position;
						var lineDistances = [];

						for ( var i = 0, l = positionAttribute.count; i < l; i += 2 ) {

							start.fromBufferAttribute( positionAttribute, i );
							end.fromBufferAttribute( positionAttribute, i + 1 );

							lineDistances[ i ] = ( i === 0 ) ? 0 : lineDistances[ i - 1 ];
							lineDistances[ i + 1 ] = lineDistances[ i ] + start.distanceTo( end );

						}

						geometry.addAttribute( 'lineDistance', new Float32BufferAttribute( lineDistances, 1 ) );

					} else {

						console.warn( 'THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.' );

					}

				} else if ( geometry.isGeometry ) {

					var vertices = geometry.vertices;
					var lineDistances = geometry.lineDistances;

					for ( var i = 0, l = vertices.length; i < l; i += 2 ) {

						start.copy( vertices[ i ] );
						end.copy( vertices[ i + 1 ] );

						lineDistances[ i ] = ( i === 0 ) ? 0 : lineDistances[ i - 1 ];
						lineDistances[ i + 1 ] = lineDistances[ i ] + start.distanceTo( end );

					}

				}

				return this;

			};

		}() )

	} );

	/**
	 * @author mgreter / http://github.com/mgreter
	 */

	function LineLoop( geometry, material ) {

		Line.call( this, geometry, material );

		this.type = 'LineLoop';

	}

	LineLoop.prototype = Object.assign( Object.create( Line.prototype ), {

		constructor: LineLoop,

		isLineLoop: true,

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  size: <float>,
	 *  sizeAttenuation: <bool>
	 *
	 *  morphTargets: <bool>
	 * }
	 */

	function PointsMaterial( parameters ) {

		Material.call( this );

		this.type = 'PointsMaterial';

		this.color = new Color( 0xffffff );

		this.map = null;

		this.size = 1;
		this.sizeAttenuation = true;

		this.morphTargets = false;

		this.lights = false;

		this.setValues( parameters );

	}

	PointsMaterial.prototype = Object.create( Material.prototype );
	PointsMaterial.prototype.constructor = PointsMaterial;

	PointsMaterial.prototype.isPointsMaterial = true;

	PointsMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );

		this.map = source.map;

		this.size = source.size;
		this.sizeAttenuation = source.sizeAttenuation;

		this.morphTargets = source.morphTargets;

		return this;

	};

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */

	function Points( geometry, material ) {

		Object3D.call( this );

		this.type = 'Points';

		this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
		this.material = material !== undefined ? material : new PointsMaterial( { color: Math.random() * 0xffffff } );

	}

	Points.prototype = Object.assign( Object.create( Object3D.prototype ), {

		constructor: Points,

		isPoints: true,

		raycast: ( function () {

			var inverseMatrix = new Matrix4();
			var ray = new Ray();
			var sphere = new Sphere();

			return function raycast( raycaster, intersects ) {

				var object = this;
				var geometry = this.geometry;
				var matrixWorld = this.matrixWorld;
				var threshold = raycaster.params.Points.threshold;

				// Checking boundingSphere distance to ray

				if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

				sphere.copy( geometry.boundingSphere );
				sphere.applyMatrix4( matrixWorld );
				sphere.radius += threshold;

				if ( raycaster.ray.intersectsSphere( sphere ) === false ) return;

				//

				inverseMatrix.getInverse( matrixWorld );
				ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );

				var localThreshold = threshold / ( ( this.scale.x + this.scale.y + this.scale.z ) / 3 );
				var localThresholdSq = localThreshold * localThreshold;
				var position = new Vector3();
				var intersectPoint = new Vector3();

				function testPoint( point, index ) {

					var rayPointDistanceSq = ray.distanceSqToPoint( point );

					if ( rayPointDistanceSq < localThresholdSq ) {

						ray.closestPointToPoint( point, intersectPoint );
						intersectPoint.applyMatrix4( matrixWorld );

						var distance = raycaster.ray.origin.distanceTo( intersectPoint );

						if ( distance < raycaster.near || distance > raycaster.far ) return;

						intersects.push( {

							distance: distance,
							distanceToRay: Math.sqrt( rayPointDistanceSq ),
							point: intersectPoint.clone(),
							index: index,
							face: null,
							object: object

						} );

					}

				}

				if ( geometry.isBufferGeometry ) {

					var index = geometry.index;
					var attributes = geometry.attributes;
					var positions = attributes.position.array;

					if ( index !== null ) {

						var indices = index.array;

						for ( var i = 0, il = indices.length; i < il; i ++ ) {

							var a = indices[ i ];

							position.fromArray( positions, a * 3 );

							testPoint( position, a );

						}

					} else {

						for ( var i = 0, l = positions.length / 3; i < l; i ++ ) {

							position.fromArray( positions, i * 3 );

							testPoint( position, i );

						}

					}

				} else {

					var vertices = geometry.vertices;

					for ( var i = 0, l = vertices.length; i < l; i ++ ) {

						testPoint( vertices[ i ], i );

					}

				}

			};

		}() ),

		clone: function () {

			return new this.constructor( this.geometry, this.material ).copy( this );

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function VideoTexture( video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

		Texture.call( this, video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

		this.format = format !== undefined ? format : RGBFormat;

		this.minFilter = minFilter !== undefined ? minFilter : LinearFilter;
		this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;

		this.generateMipmaps = false;

	}

	VideoTexture.prototype = Object.assign( Object.create( Texture.prototype ), {

		constructor: VideoTexture,

		isVideoTexture: true,

		update: function () {

			var video = this.image;

			if ( video.readyState >= video.HAVE_CURRENT_DATA ) {

				this.needsUpdate = true;

			}

		}

	} );

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */

	function CompressedTexture( mipmaps, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding ) {

		Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

		this.image = { width: width, height: height };
		this.mipmaps = mipmaps;

		// no flipping for cube textures
		// (also flipping doesn't work for compressed textures )

		this.flipY = false;

		// can't generate mipmaps for compressed textures
		// mips must be embedded in DDS files

		this.generateMipmaps = false;

	}

	CompressedTexture.prototype = Object.create( Texture.prototype );
	CompressedTexture.prototype.constructor = CompressedTexture;

	CompressedTexture.prototype.isCompressedTexture = true;

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function CanvasTexture( canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

		Texture.call( this, canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

		this.needsUpdate = true;

	}

	CanvasTexture.prototype = Object.create( Texture.prototype );
	CanvasTexture.prototype.constructor = CanvasTexture;
	CanvasTexture.prototype.isCanvasTexture = true;

	/**
	 * @author Matt DesLauriers / @mattdesl
	 * @author atix / arthursilber.de
	 */

	function DepthTexture( width, height, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, format ) {

		format = format !== undefined ? format : DepthFormat;

		if ( format !== DepthFormat && format !== DepthStencilFormat ) {

			throw new Error( 'DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat' );

		}

		if ( type === undefined && format === DepthFormat ) type = UnsignedShortType;
		if ( type === undefined && format === DepthStencilFormat ) type = UnsignedInt248Type;

		Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

		this.image = { width: width, height: height };

		this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
		this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;

		this.flipY = false;
		this.generateMipmaps	= false;

	}

	DepthTexture.prototype = Object.create( Texture.prototype );
	DepthTexture.prototype.constructor = DepthTexture;
	DepthTexture.prototype.isDepthTexture = true;

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	function WireframeGeometry( geometry ) {

		BufferGeometry.call( this );

		this.type = 'WireframeGeometry';

		// buffer

		var vertices = [];

		// helper variables

		var i, j, l, o, ol;
		var edge = [ 0, 0 ], edges = {}, e, edge1, edge2;
		var key, keys = [ 'a', 'b', 'c' ];
		var vertex;

		// different logic for Geometry and BufferGeometry

		if ( geometry && geometry.isGeometry ) {

			// create a data structure that contains all edges without duplicates

			var faces = geometry.faces;

			for ( i = 0, l = faces.length; i < l; i ++ ) {

				var face = faces[ i ];

				for ( j = 0; j < 3; j ++ ) {

					edge1 = face[ keys[ j ] ];
					edge2 = face[ keys[ ( j + 1 ) % 3 ] ];
					edge[ 0 ] = Math.min( edge1, edge2 ); // sorting prevents duplicates
					edge[ 1 ] = Math.max( edge1, edge2 );

					key = edge[ 0 ] + ',' + edge[ 1 ];

					if ( edges[ key ] === undefined ) {

						edges[ key ] = { index1: edge[ 0 ], index2: edge[ 1 ] };

					}

				}

			}

			// generate vertices

			for ( key in edges ) {

				e = edges[ key ];

				vertex = geometry.vertices[ e.index1 ];
				vertices.push( vertex.x, vertex.y, vertex.z );

				vertex = geometry.vertices[ e.index2 ];
				vertices.push( vertex.x, vertex.y, vertex.z );

			}

		} else if ( geometry && geometry.isBufferGeometry ) {

			var position, indices, groups;
			var group, start, count;
			var index1, index2;

			vertex = new Vector3();

			if ( geometry.index !== null ) {

				// indexed BufferGeometry

				position = geometry.attributes.position;
				indices = geometry.index;
				groups = geometry.groups;

				if ( groups.length === 0 ) {

					groups = [ { start: 0, count: indices.count, materialIndex: 0 } ];

				}

				// create a data structure that contains all eges without duplicates

				for ( o = 0, ol = groups.length; o < ol; ++ o ) {

					group = groups[ o ];

					start = group.start;
					count = group.count;

					for ( i = start, l = ( start + count ); i < l; i += 3 ) {

						for ( j = 0; j < 3; j ++ ) {

							edge1 = indices.getX( i + j );
							edge2 = indices.getX( i + ( j + 1 ) % 3 );
							edge[ 0 ] = Math.min( edge1, edge2 ); // sorting prevents duplicates
							edge[ 1 ] = Math.max( edge1, edge2 );

							key = edge[ 0 ] + ',' + edge[ 1 ];

							if ( edges[ key ] === undefined ) {

								edges[ key ] = { index1: edge[ 0 ], index2: edge[ 1 ] };

							}

						}

					}

				}

				// generate vertices

				for ( key in edges ) {

					e = edges[ key ];

					vertex.fromBufferAttribute( position, e.index1 );
					vertices.push( vertex.x, vertex.y, vertex.z );

					vertex.fromBufferAttribute( position, e.index2 );
					vertices.push( vertex.x, vertex.y, vertex.z );

				}

			} else {

				// non-indexed BufferGeometry

				position = geometry.attributes.position;

				for ( i = 0, l = ( position.count / 3 ); i < l; i ++ ) {

					for ( j = 0; j < 3; j ++ ) {

						// three edges per triangle, an edge is represented as (index1, index2)
						// e.g. the first triangle has the following edges: (0,1),(1,2),(2,0)

						index1 = 3 * i + j;
						vertex.fromBufferAttribute( position, index1 );
						vertices.push( vertex.x, vertex.y, vertex.z );

						index2 = 3 * i + ( ( j + 1 ) % 3 );
						vertex.fromBufferAttribute( position, index2 );
						vertices.push( vertex.x, vertex.y, vertex.z );

					}

				}

			}

		}

		// build geometry

		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );

	}

	WireframeGeometry.prototype = Object.create( BufferGeometry.prototype );
	WireframeGeometry.prototype.constructor = WireframeGeometry;

	/**
	 * @author zz85 / https://github.com/zz85
	 * @author Mugen87 / https://github.com/Mugen87
	 *
	 * Parametric Surfaces Geometry
	 * based on the brilliant article by @prideout http://prideout.net/blog/?p=44
	 */

	// ParametricGeometry

	function ParametricGeometry( func, slices, stacks ) {

		Geometry.call( this );

		this.type = 'ParametricGeometry';

		this.parameters = {
			func: func,
			slices: slices,
			stacks: stacks
		};

		this.fromBufferGeometry( new ParametricBufferGeometry( func, slices, stacks ) );
		this.mergeVertices();

	}

	ParametricGeometry.prototype = Object.create( Geometry.prototype );
	ParametricGeometry.prototype.constructor = ParametricGeometry;

	// ParametricBufferGeometry

	function ParametricBufferGeometry( func, slices, stacks ) {

		BufferGeometry.call( this );

		this.type = 'ParametricBufferGeometry';

		this.parameters = {
			func: func,
			slices: slices,
			stacks: stacks
		};

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		var EPS = 0.00001;

		var normal = new Vector3();

		var p0 = new Vector3(), p1 = new Vector3();
		var pu = new Vector3(), pv = new Vector3();

		var i, j;

		if ( func.length < 3 ) {

			console.error( 'THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.' );

		}

		// generate vertices, normals and uvs

		var sliceCount = slices + 1;

		for ( i = 0; i <= stacks; i ++ ) {

			var v = i / stacks;

			for ( j = 0; j <= slices; j ++ ) {

				var u = j / slices;

				// vertex

				func( u, v, p0 );
				vertices.push( p0.x, p0.y, p0.z );

				// normal

				// approximate tangent vectors via finite differences

				if ( u - EPS >= 0 ) {

					func( u - EPS, v, p1 );
					pu.subVectors( p0, p1 );

				} else {

					func( u + EPS, v, p1 );
					pu.subVectors( p1, p0 );

				}

				if ( v - EPS >= 0 ) {

					func( u, v - EPS, p1 );
					pv.subVectors( p0, p1 );

				} else {

					func( u, v + EPS, p1 );
					pv.subVectors( p1, p0 );

				}

				// cross product of tangent vectors returns surface normal

				normal.crossVectors( pu, pv ).normalize();
				normals.push( normal.x, normal.y, normal.z );

				// uv

				uvs.push( u, v );

			}

		}

		// generate indices

		for ( i = 0; i < stacks; i ++ ) {

			for ( j = 0; j < slices; j ++ ) {

				var a = i * sliceCount + j;
				var b = i * sliceCount + j + 1;
				var c = ( i + 1 ) * sliceCount + j + 1;
				var d = ( i + 1 ) * sliceCount + j;

				// faces one and two

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	}

	ParametricBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	ParametricBufferGeometry.prototype.constructor = ParametricBufferGeometry;

	/**
	 * @author clockworkgeek / https://github.com/clockworkgeek
	 * @author timothypratley / https://github.com/timothypratley
	 * @author WestLangley / http://github.com/WestLangley
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// PolyhedronGeometry

	function PolyhedronGeometry( vertices, indices, radius, detail ) {

		Geometry.call( this );

		this.type = 'PolyhedronGeometry';

		this.parameters = {
			vertices: vertices,
			indices: indices,
			radius: radius,
			detail: detail
		};

		this.fromBufferGeometry( new PolyhedronBufferGeometry( vertices, indices, radius, detail ) );
		this.mergeVertices();

	}

	PolyhedronGeometry.prototype = Object.create( Geometry.prototype );
	PolyhedronGeometry.prototype.constructor = PolyhedronGeometry;

	// PolyhedronBufferGeometry

	function PolyhedronBufferGeometry( vertices, indices, radius, detail ) {

		BufferGeometry.call( this );

		this.type = 'PolyhedronBufferGeometry';

		this.parameters = {
			vertices: vertices,
			indices: indices,
			radius: radius,
			detail: detail
		};

		radius = radius || 1;
		detail = detail || 0;

		// default buffer data

		var vertexBuffer = [];
		var uvBuffer = [];

		// the subdivision creates the vertex buffer data

		subdivide( detail );

		// all vertices should lie on a conceptual sphere with a given radius

		appplyRadius( radius );

		// finally, create the uv data

		generateUVs();

		// build non-indexed geometry

		this.addAttribute( 'position', new Float32BufferAttribute( vertexBuffer, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( vertexBuffer.slice(), 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvBuffer, 2 ) );

		if ( detail === 0 ) {

			this.computeVertexNormals(); // flat normals

		} else {

			this.normalizeNormals(); // smooth normals

		}

		// helper functions

		function subdivide( detail ) {

			var a = new Vector3();
			var b = new Vector3();
			var c = new Vector3();

			// iterate over all faces and apply a subdivison with the given detail value

			for ( var i = 0; i < indices.length; i += 3 ) {

				// get the vertices of the face

				getVertexByIndex( indices[ i + 0 ], a );
				getVertexByIndex( indices[ i + 1 ], b );
				getVertexByIndex( indices[ i + 2 ], c );

				// perform subdivision

				subdivideFace( a, b, c, detail );

			}

		}

		function subdivideFace( a, b, c, detail ) {

			var cols = Math.pow( 2, detail );

			// we use this multidimensional array as a data structure for creating the subdivision

			var v = [];

			var i, j;

			// construct all of the vertices for this subdivision

			for ( i = 0; i <= cols; i ++ ) {

				v[ i ] = [];

				var aj = a.clone().lerp( c, i / cols );
				var bj = b.clone().lerp( c, i / cols );

				var rows = cols - i;

				for ( j = 0; j <= rows; j ++ ) {

					if ( j === 0 && i === cols ) {

						v[ i ][ j ] = aj;

					} else {

						v[ i ][ j ] = aj.clone().lerp( bj, j / rows );

					}

				}

			}

			// construct all of the faces

			for ( i = 0; i < cols; i ++ ) {

				for ( j = 0; j < 2 * ( cols - i ) - 1; j ++ ) {

					var k = Math.floor( j / 2 );

					if ( j % 2 === 0 ) {

						pushVertex( v[ i ][ k + 1 ] );
						pushVertex( v[ i + 1 ][ k ] );
						pushVertex( v[ i ][ k ] );

					} else {

						pushVertex( v[ i ][ k + 1 ] );
						pushVertex( v[ i + 1 ][ k + 1 ] );
						pushVertex( v[ i + 1 ][ k ] );

					}

				}

			}

		}

		function appplyRadius( radius ) {

			var vertex = new Vector3();

			// iterate over the entire buffer and apply the radius to each vertex

			for ( var i = 0; i < vertexBuffer.length; i += 3 ) {

				vertex.x = vertexBuffer[ i + 0 ];
				vertex.y = vertexBuffer[ i + 1 ];
				vertex.z = vertexBuffer[ i + 2 ];

				vertex.normalize().multiplyScalar( radius );

				vertexBuffer[ i + 0 ] = vertex.x;
				vertexBuffer[ i + 1 ] = vertex.y;
				vertexBuffer[ i + 2 ] = vertex.z;

			}

		}

		function generateUVs() {

			var vertex = new Vector3();

			for ( var i = 0; i < vertexBuffer.length; i += 3 ) {

				vertex.x = vertexBuffer[ i + 0 ];
				vertex.y = vertexBuffer[ i + 1 ];
				vertex.z = vertexBuffer[ i + 2 ];

				var u = azimuth( vertex ) / 2 / Math.PI + 0.5;
				var v = inclination( vertex ) / Math.PI + 0.5;
				uvBuffer.push( u, 1 - v );

			}

			correctUVs();

			correctSeam();

		}

		function correctSeam() {

			// handle case when face straddles the seam, see #3269

			for ( var i = 0; i < uvBuffer.length; i += 6 ) {

				// uv data of a single face

				var x0 = uvBuffer[ i + 0 ];
				var x1 = uvBuffer[ i + 2 ];
				var x2 = uvBuffer[ i + 4 ];

				var max = Math.max( x0, x1, x2 );
				var min = Math.min( x0, x1, x2 );

				// 0.9 is somewhat arbitrary

				if ( max > 0.9 && min < 0.1 ) {

					if ( x0 < 0.2 ) uvBuffer[ i + 0 ] += 1;
					if ( x1 < 0.2 ) uvBuffer[ i + 2 ] += 1;
					if ( x2 < 0.2 ) uvBuffer[ i + 4 ] += 1;

				}

			}

		}

		function pushVertex( vertex ) {

			vertexBuffer.push( vertex.x, vertex.y, vertex.z );

		}

		function getVertexByIndex( index, vertex ) {

			var stride = index * 3;

			vertex.x = vertices[ stride + 0 ];
			vertex.y = vertices[ stride + 1 ];
			vertex.z = vertices[ stride + 2 ];

		}

		function correctUVs() {

			var a = new Vector3();
			var b = new Vector3();
			var c = new Vector3();

			var centroid = new Vector3();

			var uvA = new Vector2();
			var uvB = new Vector2();
			var uvC = new Vector2();

			for ( var i = 0, j = 0; i < vertexBuffer.length; i += 9, j += 6 ) {

				a.set( vertexBuffer[ i + 0 ], vertexBuffer[ i + 1 ], vertexBuffer[ i + 2 ] );
				b.set( vertexBuffer[ i + 3 ], vertexBuffer[ i + 4 ], vertexBuffer[ i + 5 ] );
				c.set( vertexBuffer[ i + 6 ], vertexBuffer[ i + 7 ], vertexBuffer[ i + 8 ] );

				uvA.set( uvBuffer[ j + 0 ], uvBuffer[ j + 1 ] );
				uvB.set( uvBuffer[ j + 2 ], uvBuffer[ j + 3 ] );
				uvC.set( uvBuffer[ j + 4 ], uvBuffer[ j + 5 ] );

				centroid.copy( a ).add( b ).add( c ).divideScalar( 3 );

				var azi = azimuth( centroid );

				correctUV( uvA, j + 0, a, azi );
				correctUV( uvB, j + 2, b, azi );
				correctUV( uvC, j + 4, c, azi );

			}

		}

		function correctUV( uv, stride, vector, azimuth ) {

			if ( ( azimuth < 0 ) && ( uv.x === 1 ) ) {

				uvBuffer[ stride ] = uv.x - 1;

			}

			if ( ( vector.x === 0 ) && ( vector.z === 0 ) ) {

				uvBuffer[ stride ] = azimuth / 2 / Math.PI + 0.5;

			}

		}

		// Angle around the Y axis, counter-clockwise when looking from above.

		function azimuth( vector ) {

			return Math.atan2( vector.z, - vector.x );

		}


		// Angle above the XZ plane.

		function inclination( vector ) {

			return Math.atan2( - vector.y, Math.sqrt( ( vector.x * vector.x ) + ( vector.z * vector.z ) ) );

		}

	}

	PolyhedronBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	PolyhedronBufferGeometry.prototype.constructor = PolyhedronBufferGeometry;

	/**
	 * @author timothypratley / https://github.com/timothypratley
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// TetrahedronGeometry

	function TetrahedronGeometry( radius, detail ) {

		Geometry.call( this );

		this.type = 'TetrahedronGeometry';

		this.parameters = {
			radius: radius,
			detail: detail
		};

		this.fromBufferGeometry( new TetrahedronBufferGeometry( radius, detail ) );
		this.mergeVertices();

	}

	TetrahedronGeometry.prototype = Object.create( Geometry.prototype );
	TetrahedronGeometry.prototype.constructor = TetrahedronGeometry;

	// TetrahedronBufferGeometry

	function TetrahedronBufferGeometry( radius, detail ) {

		var vertices = [
			1, 1, 1, 	- 1, - 1, 1, 	- 1, 1, - 1, 	1, - 1, - 1
		];

		var indices = [
			2, 1, 0, 	0, 3, 2,	1, 3, 0,	2, 3, 1
		];

		PolyhedronBufferGeometry.call( this, vertices, indices, radius, detail );

		this.type = 'TetrahedronBufferGeometry';

		this.parameters = {
			radius: radius,
			detail: detail
		};

	}

	TetrahedronBufferGeometry.prototype = Object.create( PolyhedronBufferGeometry.prototype );
	TetrahedronBufferGeometry.prototype.constructor = TetrahedronBufferGeometry;

	/**
	 * @author timothypratley / https://github.com/timothypratley
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// OctahedronGeometry

	function OctahedronGeometry( radius, detail ) {

		Geometry.call( this );

		this.type = 'OctahedronGeometry';

		this.parameters = {
			radius: radius,
			detail: detail
		};

		this.fromBufferGeometry( new OctahedronBufferGeometry( radius, detail ) );
		this.mergeVertices();

	}

	OctahedronGeometry.prototype = Object.create( Geometry.prototype );
	OctahedronGeometry.prototype.constructor = OctahedronGeometry;

	// OctahedronBufferGeometry

	function OctahedronBufferGeometry( radius, detail ) {

		var vertices = [
			1, 0, 0, 	- 1, 0, 0,	0, 1, 0,
			0, - 1, 0, 	0, 0, 1,	0, 0, - 1
		];

		var indices = [
			0, 2, 4,	0, 4, 3,	0, 3, 5,
			0, 5, 2,	1, 2, 5,	1, 5, 3,
			1, 3, 4,	1, 4, 2
		];

		PolyhedronBufferGeometry.call( this, vertices, indices, radius, detail );

		this.type = 'OctahedronBufferGeometry';

		this.parameters = {
			radius: radius,
			detail: detail
		};

	}

	OctahedronBufferGeometry.prototype = Object.create( PolyhedronBufferGeometry.prototype );
	OctahedronBufferGeometry.prototype.constructor = OctahedronBufferGeometry;

	/**
	 * @author timothypratley / https://github.com/timothypratley
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// IcosahedronGeometry

	function IcosahedronGeometry( radius, detail ) {

		Geometry.call( this );

		this.type = 'IcosahedronGeometry';

		this.parameters = {
			radius: radius,
			detail: detail
		};

		this.fromBufferGeometry( new IcosahedronBufferGeometry( radius, detail ) );
		this.mergeVertices();

	}

	IcosahedronGeometry.prototype = Object.create( Geometry.prototype );
	IcosahedronGeometry.prototype.constructor = IcosahedronGeometry;

	// IcosahedronBufferGeometry

	function IcosahedronBufferGeometry( radius, detail ) {

		var t = ( 1 + Math.sqrt( 5 ) ) / 2;

		var vertices = [
			- 1, t, 0, 	1, t, 0, 	- 1, - t, 0, 	1, - t, 0,
			 0, - 1, t, 	0, 1, t,	0, - 1, - t, 	0, 1, - t,
			 t, 0, - 1, 	t, 0, 1, 	- t, 0, - 1, 	- t, 0, 1
		];

		var indices = [
			 0, 11, 5, 	0, 5, 1, 	0, 1, 7, 	0, 7, 10, 	0, 10, 11,
			 1, 5, 9, 	5, 11, 4,	11, 10, 2,	10, 7, 6,	7, 1, 8,
			 3, 9, 4, 	3, 4, 2,	3, 2, 6,	3, 6, 8,	3, 8, 9,
			 4, 9, 5, 	2, 4, 11,	6, 2, 10,	8, 6, 7,	9, 8, 1
		];

		PolyhedronBufferGeometry.call( this, vertices, indices, radius, detail );

		this.type = 'IcosahedronBufferGeometry';

		this.parameters = {
			radius: radius,
			detail: detail
		};

	}

	IcosahedronBufferGeometry.prototype = Object.create( PolyhedronBufferGeometry.prototype );
	IcosahedronBufferGeometry.prototype.constructor = IcosahedronBufferGeometry;

	/**
	 * @author Abe Pazos / https://hamoid.com
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// DodecahedronGeometry

	function DodecahedronGeometry( radius, detail ) {

		Geometry.call( this );

		this.type = 'DodecahedronGeometry';

		this.parameters = {
			radius: radius,
			detail: detail
		};

		this.fromBufferGeometry( new DodecahedronBufferGeometry( radius, detail ) );
		this.mergeVertices();

	}

	DodecahedronGeometry.prototype = Object.create( Geometry.prototype );
	DodecahedronGeometry.prototype.constructor = DodecahedronGeometry;

	// DodecahedronBufferGeometry

	function DodecahedronBufferGeometry( radius, detail ) {

		var t = ( 1 + Math.sqrt( 5 ) ) / 2;
		var r = 1 / t;

		var vertices = [

			// (±1, ±1, ±1)
			- 1, - 1, - 1,	- 1, - 1, 1,
			- 1, 1, - 1, - 1, 1, 1,
			1, - 1, - 1, 1, - 1, 1,
			1, 1, - 1, 1, 1, 1,

			// (0, ±1/φ, ±φ)
			 0, - r, - t, 0, - r, t,
			 0, r, - t, 0, r, t,

			// (±1/φ, ±φ, 0)
			- r, - t, 0, - r, t, 0,
			 r, - t, 0, r, t, 0,

			// (±φ, 0, ±1/φ)
			- t, 0, - r, t, 0, - r,
			- t, 0, r, t, 0, r
		];

		var indices = [
			3, 11, 7, 	3, 7, 15, 	3, 15, 13,
			7, 19, 17, 	7, 17, 6, 	7, 6, 15,
			17, 4, 8, 	17, 8, 10, 	17, 10, 6,
			8, 0, 16, 	8, 16, 2, 	8, 2, 10,
			0, 12, 1, 	0, 1, 18, 	0, 18, 16,
			6, 10, 2, 	6, 2, 13, 	6, 13, 15,
			2, 16, 18, 	2, 18, 3, 	2, 3, 13,
			18, 1, 9, 	18, 9, 11, 	18, 11, 3,
			4, 14, 12, 	4, 12, 0, 	4, 0, 8,
			11, 9, 5, 	11, 5, 19, 	11, 19, 7,
			19, 5, 14, 	19, 14, 4, 	19, 4, 17,
			1, 12, 14, 	1, 14, 5, 	1, 5, 9
		];

		PolyhedronBufferGeometry.call( this, vertices, indices, radius, detail );

		this.type = 'DodecahedronBufferGeometry';

		this.parameters = {
			radius: radius,
			detail: detail
		};

	}

	DodecahedronBufferGeometry.prototype = Object.create( PolyhedronBufferGeometry.prototype );
	DodecahedronBufferGeometry.prototype.constructor = DodecahedronBufferGeometry;

	/**
	 * @author oosmoxiecode / https://github.com/oosmoxiecode
	 * @author WestLangley / https://github.com/WestLangley
	 * @author zz85 / https://github.com/zz85
	 * @author miningold / https://github.com/miningold
	 * @author jonobr1 / https://github.com/jonobr1
	 * @author Mugen87 / https://github.com/Mugen87
	 *
	 */

	// TubeGeometry

	function TubeGeometry( path, tubularSegments, radius, radialSegments, closed, taper ) {

		Geometry.call( this );

		this.type = 'TubeGeometry';

		this.parameters = {
			path: path,
			tubularSegments: tubularSegments,
			radius: radius,
			radialSegments: radialSegments,
			closed: closed
		};

		if ( taper !== undefined ) console.warn( 'THREE.TubeGeometry: taper has been removed.' );

		var bufferGeometry = new TubeBufferGeometry( path, tubularSegments, radius, radialSegments, closed );

		// expose internals

		this.tangents = bufferGeometry.tangents;
		this.normals = bufferGeometry.normals;
		this.binormals = bufferGeometry.binormals;

		// create geometry

		this.fromBufferGeometry( bufferGeometry );
		this.mergeVertices();

	}

	TubeGeometry.prototype = Object.create( Geometry.prototype );
	TubeGeometry.prototype.constructor = TubeGeometry;

	// TubeBufferGeometry

	function TubeBufferGeometry( path, tubularSegments, radius, radialSegments, closed ) {

		BufferGeometry.call( this );

		this.type = 'TubeBufferGeometry';

		this.parameters = {
			path: path,
			tubularSegments: tubularSegments,
			radius: radius,
			radialSegments: radialSegments,
			closed: closed
		};

		tubularSegments = tubularSegments || 64;
		radius = radius || 1;
		radialSegments = radialSegments || 8;
		closed = closed || false;

		var frames = path.computeFrenetFrames( tubularSegments, closed );

		// expose internals

		this.tangents = frames.tangents;
		this.normals = frames.normals;
		this.binormals = frames.binormals;

		// helper variables

		var vertex = new Vector3();
		var normal = new Vector3();
		var uv = new Vector2();
		var P = new Vector3();

		var i, j;

		// buffer

		var vertices = [];
		var normals = [];
		var uvs = [];
		var indices = [];

		// create buffer data

		generateBufferData();

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

		// functions

		function generateBufferData() {

			for ( i = 0; i < tubularSegments; i ++ ) {

				generateSegment( i );

			}

			// if the geometry is not closed, generate the last row of vertices and normals
			// at the regular position on the given path
			//
			// if the geometry is closed, duplicate the first row of vertices and normals (uvs will differ)

			generateSegment( ( closed === false ) ? tubularSegments : 0 );

			// uvs are generated in a separate function.
			// this makes it easy compute correct values for closed geometries

			generateUVs();

			// finally create faces

			generateIndices();

		}

		function generateSegment( i ) {

			// we use getPointAt to sample evenly distributed points from the given path

			P = path.getPointAt( i / tubularSegments, P );

			// retrieve corresponding normal and binormal

			var N = frames.normals[ i ];
			var B = frames.binormals[ i ];

			// generate normals and vertices for the current segment

			for ( j = 0; j <= radialSegments; j ++ ) {

				var v = j / radialSegments * Math.PI * 2;

				var sin = Math.sin( v );
				var cos = - Math.cos( v );

				// normal

				normal.x = ( cos * N.x + sin * B.x );
				normal.y = ( cos * N.y + sin * B.y );
				normal.z = ( cos * N.z + sin * B.z );
				normal.normalize();

				normals.push( normal.x, normal.y, normal.z );

				// vertex

				vertex.x = P.x + radius * normal.x;
				vertex.y = P.y + radius * normal.y;
				vertex.z = P.z + radius * normal.z;

				vertices.push( vertex.x, vertex.y, vertex.z );

			}

		}

		function generateIndices() {

			for ( j = 1; j <= tubularSegments; j ++ ) {

				for ( i = 1; i <= radialSegments; i ++ ) {

					var a = ( radialSegments + 1 ) * ( j - 1 ) + ( i - 1 );
					var b = ( radialSegments + 1 ) * j + ( i - 1 );
					var c = ( radialSegments + 1 ) * j + i;
					var d = ( radialSegments + 1 ) * ( j - 1 ) + i;

					// faces

					indices.push( a, b, d );
					indices.push( b, c, d );

				}

			}

		}

		function generateUVs() {

			for ( i = 0; i <= tubularSegments; i ++ ) {

				for ( j = 0; j <= radialSegments; j ++ ) {

					uv.x = i / tubularSegments;
					uv.y = j / radialSegments;

					uvs.push( uv.x, uv.y );

				}

			}

		}

	}

	TubeBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	TubeBufferGeometry.prototype.constructor = TubeBufferGeometry;

	TubeBufferGeometry.prototype.toJSON = function () {

		var data = BufferGeometry.prototype.toJSON.call( this );

		data.path = this.parameters.path.toJSON();

		return data;

	};

	/**
	 * @author oosmoxiecode
	 * @author Mugen87 / https://github.com/Mugen87
	 *
	 * based on http://www.blackpawn.com/texts/pqtorus/
	 */

	// TorusKnotGeometry

	function TorusKnotGeometry( radius, tube, tubularSegments, radialSegments, p, q, heightScale ) {

		Geometry.call( this );

		this.type = 'TorusKnotGeometry';

		this.parameters = {
			radius: radius,
			tube: tube,
			tubularSegments: tubularSegments,
			radialSegments: radialSegments,
			p: p,
			q: q
		};

		if ( heightScale !== undefined ) console.warn( 'THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead.' );

		this.fromBufferGeometry( new TorusKnotBufferGeometry( radius, tube, tubularSegments, radialSegments, p, q ) );
		this.mergeVertices();

	}

	TorusKnotGeometry.prototype = Object.create( Geometry.prototype );
	TorusKnotGeometry.prototype.constructor = TorusKnotGeometry;

	// TorusKnotBufferGeometry

	function TorusKnotBufferGeometry( radius, tube, tubularSegments, radialSegments, p, q ) {

		BufferGeometry.call( this );

		this.type = 'TorusKnotBufferGeometry';

		this.parameters = {
			radius: radius,
			tube: tube,
			tubularSegments: tubularSegments,
			radialSegments: radialSegments,
			p: p,
			q: q
		};

		radius = radius || 1;
		tube = tube || 0.4;
		tubularSegments = Math.floor( tubularSegments ) || 64;
		radialSegments = Math.floor( radialSegments ) || 8;
		p = p || 2;
		q = q || 3;

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// helper variables

		var i, j;

		var vertex = new Vector3();
		var normal = new Vector3();

		var P1 = new Vector3();
		var P2 = new Vector3();

		var B = new Vector3();
		var T = new Vector3();
		var N = new Vector3();

		// generate vertices, normals and uvs

		for ( i = 0; i <= tubularSegments; ++ i ) {

			// the radian "u" is used to calculate the position on the torus curve of the current tubular segement

			var u = i / tubularSegments * p * Math.PI * 2;

			// now we calculate two points. P1 is our current position on the curve, P2 is a little farther ahead.
			// these points are used to create a special "coordinate space", which is necessary to calculate the correct vertex positions

			calculatePositionOnCurve( u, p, q, radius, P1 );
			calculatePositionOnCurve( u + 0.01, p, q, radius, P2 );

			// calculate orthonormal basis

			T.subVectors( P2, P1 );
			N.addVectors( P2, P1 );
			B.crossVectors( T, N );
			N.crossVectors( B, T );

			// normalize B, N. T can be ignored, we don't use it

			B.normalize();
			N.normalize();

			for ( j = 0; j <= radialSegments; ++ j ) {

				// now calculate the vertices. they are nothing more than an extrusion of the torus curve.
				// because we extrude a shape in the xy-plane, there is no need to calculate a z-value.

				var v = j / radialSegments * Math.PI * 2;
				var cx = - tube * Math.cos( v );
				var cy = tube * Math.sin( v );

				// now calculate the final vertex position.
				// first we orient the extrusion with our basis vectos, then we add it to the current position on the curve

				vertex.x = P1.x + ( cx * N.x + cy * B.x );
				vertex.y = P1.y + ( cx * N.y + cy * B.y );
				vertex.z = P1.z + ( cx * N.z + cy * B.z );

				vertices.push( vertex.x, vertex.y, vertex.z );

				// normal (P1 is always the center/origin of the extrusion, thus we can use it to calculate the normal)

				normal.subVectors( vertex, P1 ).normalize();

				normals.push( normal.x, normal.y, normal.z );

				// uv

				uvs.push( i / tubularSegments );
				uvs.push( j / radialSegments );

			}

		}

		// generate indices

		for ( j = 1; j <= tubularSegments; j ++ ) {

			for ( i = 1; i <= radialSegments; i ++ ) {

				// indices

				var a = ( radialSegments + 1 ) * ( j - 1 ) + ( i - 1 );
				var b = ( radialSegments + 1 ) * j + ( i - 1 );
				var c = ( radialSegments + 1 ) * j + i;
				var d = ( radialSegments + 1 ) * ( j - 1 ) + i;

				// faces

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

		// this function calculates the current position on the torus curve

		function calculatePositionOnCurve( u, p, q, radius, position ) {

			var cu = Math.cos( u );
			var su = Math.sin( u );
			var quOverP = q / p * u;
			var cs = Math.cos( quOverP );

			position.x = radius * ( 2 + cs ) * 0.5 * cu;
			position.y = radius * ( 2 + cs ) * su * 0.5;
			position.z = radius * Math.sin( quOverP ) * 0.5;

		}

	}

	TorusKnotBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	TorusKnotBufferGeometry.prototype.constructor = TorusKnotBufferGeometry;

	/**
	 * @author oosmoxiecode
	 * @author mrdoob / http://mrdoob.com/
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// TorusGeometry

	function TorusGeometry( radius, tube, radialSegments, tubularSegments, arc ) {

		Geometry.call( this );

		this.type = 'TorusGeometry';

		this.parameters = {
			radius: radius,
			tube: tube,
			radialSegments: radialSegments,
			tubularSegments: tubularSegments,
			arc: arc
		};

		this.fromBufferGeometry( new TorusBufferGeometry( radius, tube, radialSegments, tubularSegments, arc ) );
		this.mergeVertices();

	}

	TorusGeometry.prototype = Object.create( Geometry.prototype );
	TorusGeometry.prototype.constructor = TorusGeometry;

	// TorusBufferGeometry

	function TorusBufferGeometry( radius, tube, radialSegments, tubularSegments, arc ) {

		BufferGeometry.call( this );

		this.type = 'TorusBufferGeometry';

		this.parameters = {
			radius: radius,
			tube: tube,
			radialSegments: radialSegments,
			tubularSegments: tubularSegments,
			arc: arc
		};

		radius = radius || 1;
		tube = tube || 0.4;
		radialSegments = Math.floor( radialSegments ) || 8;
		tubularSegments = Math.floor( tubularSegments ) || 6;
		arc = arc || Math.PI * 2;

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// helper variables

		var center = new Vector3();
		var vertex = new Vector3();
		var normal = new Vector3();

		var j, i;

		// generate vertices, normals and uvs

		for ( j = 0; j <= radialSegments; j ++ ) {

			for ( i = 0; i <= tubularSegments; i ++ ) {

				var u = i / tubularSegments * arc;
				var v = j / radialSegments * Math.PI * 2;

				// vertex

				vertex.x = ( radius + tube * Math.cos( v ) ) * Math.cos( u );
				vertex.y = ( radius + tube * Math.cos( v ) ) * Math.sin( u );
				vertex.z = tube * Math.sin( v );

				vertices.push( vertex.x, vertex.y, vertex.z );

				// normal

				center.x = radius * Math.cos( u );
				center.y = radius * Math.sin( u );
				normal.subVectors( vertex, center ).normalize();

				normals.push( normal.x, normal.y, normal.z );

				// uv

				uvs.push( i / tubularSegments );
				uvs.push( j / radialSegments );

			}

		}

		// generate indices

		for ( j = 1; j <= radialSegments; j ++ ) {

			for ( i = 1; i <= tubularSegments; i ++ ) {

				// indices

				var a = ( tubularSegments + 1 ) * j + i - 1;
				var b = ( tubularSegments + 1 ) * ( j - 1 ) + i - 1;
				var c = ( tubularSegments + 1 ) * ( j - 1 ) + i;
				var d = ( tubularSegments + 1 ) * j + i;

				// faces

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	}

	TorusBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	TorusBufferGeometry.prototype.constructor = TorusBufferGeometry;

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 * Port from https://github.com/mapbox/earcut (v2.1.2)
	 */

	var Earcut = {

		triangulate: function ( data, holeIndices, dim ) {

			dim = dim || 2;

			var hasHoles = holeIndices && holeIndices.length,
				outerLen = hasHoles ? holeIndices[ 0 ] * dim : data.length,
				outerNode = linkedList( data, 0, outerLen, dim, true ),
				triangles = [];

			if ( ! outerNode ) return triangles;

			var minX, minY, maxX, maxY, x, y, invSize;

			if ( hasHoles ) outerNode = eliminateHoles( data, holeIndices, outerNode, dim );

			// if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox

			if ( data.length > 80 * dim ) {

				minX = maxX = data[ 0 ];
				minY = maxY = data[ 1 ];

				for ( var i = dim; i < outerLen; i += dim ) {

					x = data[ i ];
					y = data[ i + 1 ];
					if ( x < minX ) minX = x;
					if ( y < minY ) minY = y;
					if ( x > maxX ) maxX = x;
					if ( y > maxY ) maxY = y;

				}

				// minX, minY and invSize are later used to transform coords into integers for z-order calculation

				invSize = Math.max( maxX - minX, maxY - minY );
				invSize = invSize !== 0 ? 1 / invSize : 0;

			}

			earcutLinked( outerNode, triangles, dim, minX, minY, invSize );

			return triangles;

		}

	};

	// create a circular doubly linked list from polygon points in the specified winding order

	function linkedList( data, start, end, dim, clockwise ) {

		var i, last;

		if ( clockwise === ( signedArea( data, start, end, dim ) > 0 ) ) {

			for ( i = start; i < end; i += dim ) last = insertNode( i, data[ i ], data[ i + 1 ], last );

		} else {

			for ( i = end - dim; i >= start; i -= dim ) last = insertNode( i, data[ i ], data[ i + 1 ], last );

		}

		if ( last && equals( last, last.next ) ) {

			removeNode( last );
			last = last.next;

		}

		return last;

	}

	// eliminate colinear or duplicate points

	function filterPoints( start, end ) {

		if ( ! start ) return start;
		if ( ! end ) end = start;

		var p = start, again;

		do {

			again = false;

			if ( ! p.steiner && ( equals( p, p.next ) || area( p.prev, p, p.next ) === 0 ) ) {

				removeNode( p );
				p = end = p.prev;
				if ( p === p.next ) break;
				again = true;

			} else {

				p = p.next;

			}

		} while ( again || p !== end );

		return end;

	}

	// main ear slicing loop which triangulates a polygon (given as a linked list)

	function earcutLinked( ear, triangles, dim, minX, minY, invSize, pass ) {

		if ( ! ear ) return;

		// interlink polygon nodes in z-order

		if ( ! pass && invSize ) indexCurve( ear, minX, minY, invSize );

		var stop = ear, prev, next;

		// iterate through ears, slicing them one by one

		while ( ear.prev !== ear.next ) {

			prev = ear.prev;
			next = ear.next;

			if ( invSize ? isEarHashed( ear, minX, minY, invSize ) : isEar( ear ) ) {

				// cut off the triangle
				triangles.push( prev.i / dim );
				triangles.push( ear.i / dim );
				triangles.push( next.i / dim );

				removeNode( ear );

				// skipping the next vertice leads to less sliver triangles
				ear = next.next;
				stop = next.next;

				continue;

			}

			ear = next;

			// if we looped through the whole remaining polygon and can't find any more ears

			if ( ear === stop ) {

				// try filtering points and slicing again

				if ( ! pass ) {

					earcutLinked( filterPoints( ear ), triangles, dim, minX, minY, invSize, 1 );

					// if this didn't work, try curing all small self-intersections locally

				} else if ( pass === 1 ) {

					ear = cureLocalIntersections( ear, triangles, dim );
					earcutLinked( ear, triangles, dim, minX, minY, invSize, 2 );

					// as a last resort, try splitting the remaining polygon into two

				} else if ( pass === 2 ) {

					splitEarcut( ear, triangles, dim, minX, minY, invSize );

				}

				break;

			}

		}

	}

	// check whether a polygon node forms a valid ear with adjacent nodes

	function isEar( ear ) {

		var a = ear.prev,
			b = ear,
			c = ear.next;

		if ( area( a, b, c ) >= 0 ) return false; // reflex, can't be an ear

		// now make sure we don't have other points inside the potential ear
		var p = ear.next.next;

		while ( p !== ear.prev ) {

			if ( pointInTriangle( a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y ) && area( p.prev, p, p.next ) >= 0 ) {

				return false;

			}

			p = p.next;

		}

		return true;

	}

	function isEarHashed( ear, minX, minY, invSize ) {

		var a = ear.prev,
			b = ear,
			c = ear.next;

		if ( area( a, b, c ) >= 0 ) return false; // reflex, can't be an ear

		// triangle bbox; min & max are calculated like this for speed

		var minTX = a.x < b.x ? ( a.x < c.x ? a.x : c.x ) : ( b.x < c.x ? b.x : c.x ),
			minTY = a.y < b.y ? ( a.y < c.y ? a.y : c.y ) : ( b.y < c.y ? b.y : c.y ),
			maxTX = a.x > b.x ? ( a.x > c.x ? a.x : c.x ) : ( b.x > c.x ? b.x : c.x ),
			maxTY = a.y > b.y ? ( a.y > c.y ? a.y : c.y ) : ( b.y > c.y ? b.y : c.y );

		// z-order range for the current triangle bbox;

		var minZ = zOrder( minTX, minTY, minX, minY, invSize ),
			maxZ = zOrder( maxTX, maxTY, minX, minY, invSize );

		// first look for points inside the triangle in increasing z-order

		var p = ear.nextZ;

		while ( p && p.z <= maxZ ) {

			if ( p !== ear.prev && p !== ear.next &&
					pointInTriangle( a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y ) &&
					area( p.prev, p, p.next ) >= 0 ) return false;
			p = p.nextZ;

		}

		// then look for points in decreasing z-order

		p = ear.prevZ;

		while ( p && p.z >= minZ ) {

			if ( p !== ear.prev && p !== ear.next &&
					pointInTriangle( a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y ) &&
					area( p.prev, p, p.next ) >= 0 ) return false;

			p = p.prevZ;

		}

		return true;

	}

	// go through all polygon nodes and cure small local self-intersections

	function cureLocalIntersections( start, triangles, dim ) {

		var p = start;

		do {

			var a = p.prev, b = p.next.next;

			if ( ! equals( a, b ) && intersects( a, p, p.next, b ) && locallyInside( a, b ) && locallyInside( b, a ) ) {

				triangles.push( a.i / dim );
				triangles.push( p.i / dim );
				triangles.push( b.i / dim );

				// remove two nodes involved

				removeNode( p );
				removeNode( p.next );

				p = start = b;

			}

			p = p.next;

		} while ( p !== start );

		return p;

	}

	// try splitting polygon into two and triangulate them independently

	function splitEarcut( start, triangles, dim, minX, minY, invSize ) {

		// look for a valid diagonal that divides the polygon into two

		var a = start;

		do {

			var b = a.next.next;

			while ( b !== a.prev ) {

				if ( a.i !== b.i && isValidDiagonal( a, b ) ) {

					// split the polygon in two by the diagonal

					var c = splitPolygon( a, b );

					// filter colinear points around the cuts

					a = filterPoints( a, a.next );
					c = filterPoints( c, c.next );

					// run earcut on each half

					earcutLinked( a, triangles, dim, minX, minY, invSize );
					earcutLinked( c, triangles, dim, minX, minY, invSize );
					return;

				}

				b = b.next;

			}

			a = a.next;

		} while ( a !== start );

	}

	// link every hole into the outer loop, producing a single-ring polygon without holes

	function eliminateHoles( data, holeIndices, outerNode, dim ) {

		var queue = [], i, len, start, end, list;

		for ( i = 0, len = holeIndices.length; i < len; i ++ ) {

			start = holeIndices[ i ] * dim;
			end = i < len - 1 ? holeIndices[ i + 1 ] * dim : data.length;
			list = linkedList( data, start, end, dim, false );
			if ( list === list.next ) list.steiner = true;
			queue.push( getLeftmost( list ) );

		}

		queue.sort( compareX );

		// process holes from left to right

		for ( i = 0; i < queue.length; i ++ ) {

			eliminateHole( queue[ i ], outerNode );
			outerNode = filterPoints( outerNode, outerNode.next );

		}

		return outerNode;

	}

	function compareX( a, b ) {

		return a.x - b.x;

	}

	// find a bridge between vertices that connects hole with an outer ring and and link it

	function eliminateHole( hole, outerNode ) {

		outerNode = findHoleBridge( hole, outerNode );

		if ( outerNode ) {

			var b = splitPolygon( outerNode, hole );

			filterPoints( b, b.next );

		}

	}

	// David Eberly's algorithm for finding a bridge between hole and outer polygon

	function findHoleBridge( hole, outerNode ) {

		var p = outerNode,
			hx = hole.x,
			hy = hole.y,
			qx = - Infinity,
			m;

		// find a segment intersected by a ray from the hole's leftmost point to the left;
		// segment's endpoint with lesser x will be potential connection point

		do {

			if ( hy <= p.y && hy >= p.next.y && p.next.y !== p.y ) {

				var x = p.x + ( hy - p.y ) * ( p.next.x - p.x ) / ( p.next.y - p.y );

				if ( x <= hx && x > qx ) {

					qx = x;

					if ( x === hx ) {

						if ( hy === p.y ) return p;
						if ( hy === p.next.y ) return p.next;

					}

					m = p.x < p.next.x ? p : p.next;

				}

			}

			p = p.next;

		} while ( p !== outerNode );

		if ( ! m ) return null;

		if ( hx === qx ) return m.prev; // hole touches outer segment; pick lower endpoint

		// look for points inside the triangle of hole point, segment intersection and endpoint;
		// if there are no points found, we have a valid connection;
		// otherwise choose the point of the minimum angle with the ray as connection point

		var stop = m,
			mx = m.x,
			my = m.y,
			tanMin = Infinity,
			tan;

		p = m.next;

		while ( p !== stop ) {

			if ( hx >= p.x && p.x >= mx && hx !== p.x &&
							pointInTriangle( hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y ) ) {

				tan = Math.abs( hy - p.y ) / ( hx - p.x ); // tangential

				if ( ( tan < tanMin || ( tan === tanMin && p.x > m.x ) ) && locallyInside( p, hole ) ) {

					m = p;
					tanMin = tan;

				}

			}

			p = p.next;

		}

		return m;

	}

	// interlink polygon nodes in z-order

	function indexCurve( start, minX, minY, invSize ) {

		var p = start;

		do {

			if ( p.z === null ) p.z = zOrder( p.x, p.y, minX, minY, invSize );
			p.prevZ = p.prev;
			p.nextZ = p.next;
			p = p.next;

		} while ( p !== start );

		p.prevZ.nextZ = null;
		p.prevZ = null;

		sortLinked( p );

	}

	// Simon Tatham's linked list merge sort algorithm
	// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html

	function sortLinked( list ) {

		var i, p, q, e, tail, numMerges, pSize, qSize, inSize = 1;

		do {

			p = list;
			list = null;
			tail = null;
			numMerges = 0;

			while ( p ) {

				numMerges ++;
				q = p;
				pSize = 0;

				for ( i = 0; i < inSize; i ++ ) {

					pSize ++;
					q = q.nextZ;
					if ( ! q ) break;

				}

				qSize = inSize;

				while ( pSize > 0 || ( qSize > 0 && q ) ) {

					if ( pSize !== 0 && ( qSize === 0 || ! q || p.z <= q.z ) ) {

						e = p;
						p = p.nextZ;
						pSize --;

					} else {

						e = q;
						q = q.nextZ;
						qSize --;

					}

					if ( tail ) tail.nextZ = e;
					else list = e;

					e.prevZ = tail;
					tail = e;

				}

				p = q;

			}

			tail.nextZ = null;
			inSize *= 2;

		} while ( numMerges > 1 );

		return list;

	}

	// z-order of a point given coords and inverse of the longer side of data bbox

	function zOrder( x, y, minX, minY, invSize ) {

		// coords are transformed into non-negative 15-bit integer range

		x = 32767 * ( x - minX ) * invSize;
		y = 32767 * ( y - minY ) * invSize;

		x = ( x | ( x << 8 ) ) & 0x00FF00FF;
		x = ( x | ( x << 4 ) ) & 0x0F0F0F0F;
		x = ( x | ( x << 2 ) ) & 0x33333333;
		x = ( x | ( x << 1 ) ) & 0x55555555;

		y = ( y | ( y << 8 ) ) & 0x00FF00FF;
		y = ( y | ( y << 4 ) ) & 0x0F0F0F0F;
		y = ( y | ( y << 2 ) ) & 0x33333333;
		y = ( y | ( y << 1 ) ) & 0x55555555;

		return x | ( y << 1 );

	}

	// find the leftmost node of a polygon ring

	function getLeftmost( start ) {

		var p = start, leftmost = start;

		do {

			if ( p.x < leftmost.x ) leftmost = p;
			p = p.next;

		} while ( p !== start );

		return leftmost;

	}

	// check if a point lies within a convex triangle

	function pointInTriangle( ax, ay, bx, by, cx, cy, px, py ) {

		return ( cx - px ) * ( ay - py ) - ( ax - px ) * ( cy - py ) >= 0 &&
		 ( ax - px ) * ( by - py ) - ( bx - px ) * ( ay - py ) >= 0 &&
		 ( bx - px ) * ( cy - py ) - ( cx - px ) * ( by - py ) >= 0;

	}

	// check if a diagonal between two polygon nodes is valid (lies in polygon interior)

	function isValidDiagonal( a, b ) {

		return a.next.i !== b.i && a.prev.i !== b.i && ! intersectsPolygon( a, b ) &&
			locallyInside( a, b ) && locallyInside( b, a ) && middleInside( a, b );

	}

	// signed area of a triangle

	function area( p, q, r ) {

		return ( q.y - p.y ) * ( r.x - q.x ) - ( q.x - p.x ) * ( r.y - q.y );

	}

	// check if two points are equal

	function equals( p1, p2 ) {

		return p1.x === p2.x && p1.y === p2.y;

	}

	// check if two segments intersect

	function intersects( p1, q1, p2, q2 ) {

		if ( ( equals( p1, q1 ) && equals( p2, q2 ) ) ||
				( equals( p1, q2 ) && equals( p2, q1 ) ) ) return true;

		return area( p1, q1, p2 ) > 0 !== area( p1, q1, q2 ) > 0 &&
					 area( p2, q2, p1 ) > 0 !== area( p2, q2, q1 ) > 0;

	}

	// check if a polygon diagonal intersects any polygon segments

	function intersectsPolygon( a, b ) {

		var p = a;

		do {

			if ( p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
							intersects( p, p.next, a, b ) ) {

				return true;

			}

			p = p.next;

		} while ( p !== a );

		return false;

	}

	// check if a polygon diagonal is locally inside the polygon

	function locallyInside( a, b ) {

		return area( a.prev, a, a.next ) < 0 ?
			area( a, b, a.next ) >= 0 && area( a, a.prev, b ) >= 0 :
			area( a, b, a.prev ) < 0 || area( a, a.next, b ) < 0;

	}

	// check if the middle point of a polygon diagonal is inside the polygon

	function middleInside( a, b ) {

		var p = a,
			inside = false,
			px = ( a.x + b.x ) / 2,
			py = ( a.y + b.y ) / 2;

		do {

			if ( ( ( p.y > py ) !== ( p.next.y > py ) ) && p.next.y !== p.y &&
							( px < ( p.next.x - p.x ) * ( py - p.y ) / ( p.next.y - p.y ) + p.x ) ) {

				inside = ! inside;

			}

			p = p.next;

		} while ( p !== a );

		return inside;

	}

	// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
	// if one belongs to the outer ring and another to a hole, it merges it into a single ring

	function splitPolygon( a, b ) {

		var a2 = new Node( a.i, a.x, a.y ),
			b2 = new Node( b.i, b.x, b.y ),
			an = a.next,
			bp = b.prev;

		a.next = b;
		b.prev = a;

		a2.next = an;
		an.prev = a2;

		b2.next = a2;
		a2.prev = b2;

		bp.next = b2;
		b2.prev = bp;

		return b2;

	}

	// create a node and optionally link it with previous one (in a circular doubly linked list)

	function insertNode( i, x, y, last ) {

		var p = new Node( i, x, y );

		if ( ! last ) {

			p.prev = p;
			p.next = p;

		} else {

			p.next = last.next;
			p.prev = last;
			last.next.prev = p;
			last.next = p;

		}

		return p;

	}

	function removeNode( p ) {

		p.next.prev = p.prev;
		p.prev.next = p.next;

		if ( p.prevZ ) p.prevZ.nextZ = p.nextZ;
		if ( p.nextZ ) p.nextZ.prevZ = p.prevZ;

	}

	function Node( i, x, y ) {

		// vertice index in coordinates array
		this.i = i;

		// vertex coordinates
		this.x = x;
		this.y = y;

		// previous and next vertice nodes in a polygon ring
		this.prev = null;
		this.next = null;

		// z-order curve value
		this.z = null;

		// previous and next nodes in z-order
		this.prevZ = null;
		this.nextZ = null;

		// indicates whether this is a steiner point
		this.steiner = false;

	}

	function signedArea( data, start, end, dim ) {

		var sum = 0;

		for ( var i = start, j = end - dim; i < end; i += dim ) {

			sum += ( data[ j ] - data[ i ] ) * ( data[ i + 1 ] + data[ j + 1 ] );
			j = i;

		}

		return sum;

	}

	/**
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 */

	var ShapeUtils = {

		// calculate area of the contour polygon

		area: function ( contour ) {

			var n = contour.length;
			var a = 0.0;

			for ( var p = n - 1, q = 0; q < n; p = q ++ ) {

				a += contour[ p ].x * contour[ q ].y - contour[ q ].x * contour[ p ].y;

			}

			return a * 0.5;

		},

		isClockWise: function ( pts ) {

			return ShapeUtils.area( pts ) < 0;

		},

		triangulateShape: function ( contour, holes ) {

			var vertices = []; // flat array of vertices like [ x0,y0, x1,y1, x2,y2, ... ]
			var holeIndices = []; // array of hole indices
			var faces = []; // final array of vertex indices like [ [ a,b,d ], [ b,c,d ] ]

			removeDupEndPts( contour );
			addContour( vertices, contour );

			//

			var holeIndex = contour.length;

			holes.forEach( removeDupEndPts );

			for ( var i = 0; i < holes.length; i ++ ) {

				holeIndices.push( holeIndex );
				holeIndex += holes[ i ].length;
				addContour( vertices, holes[ i ] );

			}

			//

			var triangles = Earcut.triangulate( vertices, holeIndices );

			//

			for ( var i = 0; i < triangles.length; i += 3 ) {

				faces.push( triangles.slice( i, i + 3 ) );

			}

			return faces;

		}

	};

	function removeDupEndPts( points ) {

		var l = points.length;

		if ( l > 2 && points[ l - 1 ].equals( points[ 0 ] ) ) {

			points.pop();

		}

	}

	function addContour( vertices, contour ) {

		for ( var i = 0; i < contour.length; i ++ ) {

			vertices.push( contour[ i ].x );
			vertices.push( contour[ i ].y );

		}

	}

	/**
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 *
	 * Creates extruded geometry from a path shape.
	 *
	 * parameters = {
	 *
	 *  curveSegments: <int>, // number of points on the curves
	 *  steps: <int>, // number of points for z-side extrusions / used for subdividing segments of extrude spline too
	 *  depth: <float>, // Depth to extrude the shape
	 *
	 *  bevelEnabled: <bool>, // turn on bevel
	 *  bevelThickness: <float>, // how deep into the original shape bevel goes
	 *  bevelSize: <float>, // how far from shape outline is bevel
	 *  bevelSegments: <int>, // number of bevel layers
	 *
	 *  extrudePath: <THREE.Curve> // curve to extrude shape along
	 *
	 *  UVGenerator: <Object> // object that provides UV generator functions
	 *
	 * }
	 */

	// ExtrudeGeometry

	function ExtrudeGeometry( shapes, options ) {

		Geometry.call( this );

		this.type = 'ExtrudeGeometry';

		this.parameters = {
			shapes: shapes,
			options: options
		};

		this.fromBufferGeometry( new ExtrudeBufferGeometry( shapes, options ) );
		this.mergeVertices();

	}

	ExtrudeGeometry.prototype = Object.create( Geometry.prototype );
	ExtrudeGeometry.prototype.constructor = ExtrudeGeometry;

	ExtrudeGeometry.prototype.toJSON = function () {

		var data = Geometry.prototype.toJSON.call( this );

		var shapes = this.parameters.shapes;
		var options = this.parameters.options;

		return toJSON( shapes, options, data );

	};

	// ExtrudeBufferGeometry

	function ExtrudeBufferGeometry( shapes, options ) {

		BufferGeometry.call( this );

		this.type = 'ExtrudeBufferGeometry';

		this.parameters = {
			shapes: shapes,
			options: options
		};

		shapes = Array.isArray( shapes ) ? shapes : [ shapes ];

		var scope = this;

		var verticesArray = [];
		var uvArray = [];

		for ( var i = 0, l = shapes.length; i < l; i ++ ) {

			var shape = shapes[ i ];
			addShape( shape );

		}

		// build geometry

		this.addAttribute( 'position', new Float32BufferAttribute( verticesArray, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvArray, 2 ) );

		this.computeVertexNormals();

		// functions

		function addShape( shape ) {

			var placeholder = [];

			// options

			var curveSegments = options.curveSegments !== undefined ? options.curveSegments : 12;
			var steps = options.steps !== undefined ? options.steps : 1;
			var depth = options.depth !== undefined ? options.depth : 100;

			var bevelEnabled = options.bevelEnabled !== undefined ? options.bevelEnabled : true;
			var bevelThickness = options.bevelThickness !== undefined ? options.bevelThickness : 6;
			var bevelSize = options.bevelSize !== undefined ? options.bevelSize : bevelThickness - 2;
			var bevelSegments = options.bevelSegments !== undefined ? options.bevelSegments : 3;

			var extrudePath = options.extrudePath;

			var uvgen = options.UVGenerator !== undefined ? options.UVGenerator : WorldUVGenerator;

			// deprecated options

			if ( options.amount !== undefined ) {

				console.warn( 'THREE.ExtrudeBufferGeometry: amount has been renamed to depth.' );
				depth = options.amount;

			}

			//

			var extrudePts, extrudeByPath = false;
			var splineTube, binormal, normal, position2;

			if ( extrudePath ) {

				extrudePts = extrudePath.getSpacedPoints( steps );

				extrudeByPath = true;
				bevelEnabled = false; // bevels not supported for path extrusion

				// SETUP TNB variables

				// TODO1 - have a .isClosed in spline?

				splineTube = extrudePath.computeFrenetFrames( steps, false );

				// console.log(splineTube, 'splineTube', splineTube.normals.length, 'steps', steps, 'extrudePts', extrudePts.length);

				binormal = new Vector3();
				normal = new Vector3();
				position2 = new Vector3();

			}

			// Safeguards if bevels are not enabled

			if ( ! bevelEnabled ) {

				bevelSegments = 0;
				bevelThickness = 0;
				bevelSize = 0;

			}

			// Variables initialization

			var ahole, h, hl; // looping of holes

			var shapePoints = shape.extractPoints( curveSegments );

			var vertices = shapePoints.shape;
			var holes = shapePoints.holes;

			var reverse = ! ShapeUtils.isClockWise( vertices );

			if ( reverse ) {

				vertices = vertices.reverse();

				// Maybe we should also check if holes are in the opposite direction, just to be safe ...

				for ( h = 0, hl = holes.length; h < hl; h ++ ) {

					ahole = holes[ h ];

					if ( ShapeUtils.isClockWise( ahole ) ) {

						holes[ h ] = ahole.reverse();

					}

				}

			}


			var faces = ShapeUtils.triangulateShape( vertices, holes );

			/* Vertices */

			var contour = vertices; // vertices has all points but contour has only points of circumference

			for ( h = 0, hl = holes.length; h < hl; h ++ ) {

				ahole = holes[ h ];

				vertices = vertices.concat( ahole );

			}


			function scalePt2( pt, vec, size ) {

				if ( ! vec ) console.error( "THREE.ExtrudeGeometry: vec does not exist" );

				return vec.clone().multiplyScalar( size ).add( pt );

			}

			var b, bs, t, z,
				vert, vlen = vertices.length,
				face, flen = faces.length;


			// Find directions for point movement


			function getBevelVec( inPt, inPrev, inNext ) {

				// computes for inPt the corresponding point inPt' on a new contour
				//   shifted by 1 unit (length of normalized vector) to the left
				// if we walk along contour clockwise, this new contour is outside the old one
				//
				// inPt' is the intersection of the two lines parallel to the two
				//  adjacent edges of inPt at a distance of 1 unit on the left side.

				var v_trans_x, v_trans_y, shrink_by; // resulting translation vector for inPt

				// good reading for geometry algorithms (here: line-line intersection)
				// http://geomalgorithms.com/a05-_intersect-1.html

				var v_prev_x = inPt.x - inPrev.x,
					v_prev_y = inPt.y - inPrev.y;
				var v_next_x = inNext.x - inPt.x,
					v_next_y = inNext.y - inPt.y;

				var v_prev_lensq = ( v_prev_x * v_prev_x + v_prev_y * v_prev_y );

				// check for collinear edges
				var collinear0 = ( v_prev_x * v_next_y - v_prev_y * v_next_x );

				if ( Math.abs( collinear0 ) > Number.EPSILON ) {

					// not collinear

					// length of vectors for normalizing

					var v_prev_len = Math.sqrt( v_prev_lensq );
					var v_next_len = Math.sqrt( v_next_x * v_next_x + v_next_y * v_next_y );

					// shift adjacent points by unit vectors to the left

					var ptPrevShift_x = ( inPrev.x - v_prev_y / v_prev_len );
					var ptPrevShift_y = ( inPrev.y + v_prev_x / v_prev_len );

					var ptNextShift_x = ( inNext.x - v_next_y / v_next_len );
					var ptNextShift_y = ( inNext.y + v_next_x / v_next_len );

					// scaling factor for v_prev to intersection point

					var sf = ( ( ptNextShift_x - ptPrevShift_x ) * v_next_y -
							( ptNextShift_y - ptPrevShift_y ) * v_next_x ) /
						( v_prev_x * v_next_y - v_prev_y * v_next_x );

					// vector from inPt to intersection point

					v_trans_x = ( ptPrevShift_x + v_prev_x * sf - inPt.x );
					v_trans_y = ( ptPrevShift_y + v_prev_y * sf - inPt.y );

					// Don't normalize!, otherwise sharp corners become ugly
					//  but prevent crazy spikes
					var v_trans_lensq = ( v_trans_x * v_trans_x + v_trans_y * v_trans_y );
					if ( v_trans_lensq <= 2 ) {

						return new Vector2( v_trans_x, v_trans_y );

					} else {

						shrink_by = Math.sqrt( v_trans_lensq / 2 );

					}

				} else {

					// handle special case of collinear edges

					var direction_eq = false; // assumes: opposite
					if ( v_prev_x > Number.EPSILON ) {

						if ( v_next_x > Number.EPSILON ) {

							direction_eq = true;

						}

					} else {

						if ( v_prev_x < - Number.EPSILON ) {

							if ( v_next_x < - Number.EPSILON ) {

								direction_eq = true;

							}

						} else {

							if ( Math.sign( v_prev_y ) === Math.sign( v_next_y ) ) {

								direction_eq = true;

							}

						}

					}

					if ( direction_eq ) {

						// console.log("Warning: lines are a straight sequence");
						v_trans_x = - v_prev_y;
						v_trans_y = v_prev_x;
						shrink_by = Math.sqrt( v_prev_lensq );

					} else {

						// console.log("Warning: lines are a straight spike");
						v_trans_x = v_prev_x;
						v_trans_y = v_prev_y;
						shrink_by = Math.sqrt( v_prev_lensq / 2 );

					}

				}

				return new Vector2( v_trans_x / shrink_by, v_trans_y / shrink_by );

			}


			var contourMovements = [];

			for ( var i = 0, il = contour.length, j = il - 1, k = i + 1; i < il; i ++, j ++, k ++ ) {

				if ( j === il ) j = 0;
				if ( k === il ) k = 0;

				//  (j)---(i)---(k)
				// console.log('i,j,k', i, j , k)

				contourMovements[ i ] = getBevelVec( contour[ i ], contour[ j ], contour[ k ] );

			}

			var holesMovements = [],
				oneHoleMovements, verticesMovements = contourMovements.concat();

			for ( h = 0, hl = holes.length; h < hl; h ++ ) {

				ahole = holes[ h ];

				oneHoleMovements = [];

				for ( i = 0, il = ahole.length, j = il - 1, k = i + 1; i < il; i ++, j ++, k ++ ) {

					if ( j === il ) j = 0;
					if ( k === il ) k = 0;

					//  (j)---(i)---(k)
					oneHoleMovements[ i ] = getBevelVec( ahole[ i ], ahole[ j ], ahole[ k ] );

				}

				holesMovements.push( oneHoleMovements );
				verticesMovements = verticesMovements.concat( oneHoleMovements );

			}


			// Loop bevelSegments, 1 for the front, 1 for the back

			for ( b = 0; b < bevelSegments; b ++ ) {

				//for ( b = bevelSegments; b > 0; b -- ) {

				t = b / bevelSegments;
				z = bevelThickness * Math.cos( t * Math.PI / 2 );
				bs = bevelSize * Math.sin( t * Math.PI / 2 );

				// contract shape

				for ( i = 0, il = contour.length; i < il; i ++ ) {

					vert = scalePt2( contour[ i ], contourMovements[ i ], bs );

					v( vert.x, vert.y, - z );

				}

				// expand holes

				for ( h = 0, hl = holes.length; h < hl; h ++ ) {

					ahole = holes[ h ];
					oneHoleMovements = holesMovements[ h ];

					for ( i = 0, il = ahole.length; i < il; i ++ ) {

						vert = scalePt2( ahole[ i ], oneHoleMovements[ i ], bs );

						v( vert.x, vert.y, - z );

					}

				}

			}

			bs = bevelSize;

			// Back facing vertices

			for ( i = 0; i < vlen; i ++ ) {

				vert = bevelEnabled ? scalePt2( vertices[ i ], verticesMovements[ i ], bs ) : vertices[ i ];

				if ( ! extrudeByPath ) {

					v( vert.x, vert.y, 0 );

				} else {

					// v( vert.x, vert.y + extrudePts[ 0 ].y, extrudePts[ 0 ].x );

					normal.copy( splineTube.normals[ 0 ] ).multiplyScalar( vert.x );
					binormal.copy( splineTube.binormals[ 0 ] ).multiplyScalar( vert.y );

					position2.copy( extrudePts[ 0 ] ).add( normal ).add( binormal );

					v( position2.x, position2.y, position2.z );

				}

			}

			// Add stepped vertices...
			// Including front facing vertices

			var s;

			for ( s = 1; s <= steps; s ++ ) {

				for ( i = 0; i < vlen; i ++ ) {

					vert = bevelEnabled ? scalePt2( vertices[ i ], verticesMovements[ i ], bs ) : vertices[ i ];

					if ( ! extrudeByPath ) {

						v( vert.x, vert.y, depth / steps * s );

					} else {

						// v( vert.x, vert.y + extrudePts[ s - 1 ].y, extrudePts[ s - 1 ].x );

						normal.copy( splineTube.normals[ s ] ).multiplyScalar( vert.x );
						binormal.copy( splineTube.binormals[ s ] ).multiplyScalar( vert.y );

						position2.copy( extrudePts[ s ] ).add( normal ).add( binormal );

						v( position2.x, position2.y, position2.z );

					}

				}

			}


			// Add bevel segments planes

			//for ( b = 1; b <= bevelSegments; b ++ ) {
			for ( b = bevelSegments - 1; b >= 0; b -- ) {

				t = b / bevelSegments;
				z = bevelThickness * Math.cos( t * Math.PI / 2 );
				bs = bevelSize * Math.sin( t * Math.PI / 2 );

				// contract shape

				for ( i = 0, il = contour.length; i < il; i ++ ) {

					vert = scalePt2( contour[ i ], contourMovements[ i ], bs );
					v( vert.x, vert.y, depth + z );

				}

				// expand holes

				for ( h = 0, hl = holes.length; h < hl; h ++ ) {

					ahole = holes[ h ];
					oneHoleMovements = holesMovements[ h ];

					for ( i = 0, il = ahole.length; i < il; i ++ ) {

						vert = scalePt2( ahole[ i ], oneHoleMovements[ i ], bs );

						if ( ! extrudeByPath ) {

							v( vert.x, vert.y, depth + z );

						} else {

							v( vert.x, vert.y + extrudePts[ steps - 1 ].y, extrudePts[ steps - 1 ].x + z );

						}

					}

				}

			}

			/* Faces */

			// Top and bottom faces

			buildLidFaces();

			// Sides faces

			buildSideFaces();


			/////  Internal functions

			function buildLidFaces() {

				var start = verticesArray.length / 3;

				if ( bevelEnabled ) {

					var layer = 0; // steps + 1
					var offset = vlen * layer;

					// Bottom faces

					for ( i = 0; i < flen; i ++ ) {

						face = faces[ i ];
						f3( face[ 2 ] + offset, face[ 1 ] + offset, face[ 0 ] + offset );

					}

					layer = steps + bevelSegments * 2;
					offset = vlen * layer;

					// Top faces

					for ( i = 0; i < flen; i ++ ) {

						face = faces[ i ];
						f3( face[ 0 ] + offset, face[ 1 ] + offset, face[ 2 ] + offset );

					}

				} else {

					// Bottom faces

					for ( i = 0; i < flen; i ++ ) {

						face = faces[ i ];
						f3( face[ 2 ], face[ 1 ], face[ 0 ] );

					}

					// Top faces

					for ( i = 0; i < flen; i ++ ) {

						face = faces[ i ];
						f3( face[ 0 ] + vlen * steps, face[ 1 ] + vlen * steps, face[ 2 ] + vlen * steps );

					}

				}

				scope.addGroup( start, verticesArray.length / 3 - start, 0 );

			}

			// Create faces for the z-sides of the shape

			function buildSideFaces() {

				var start = verticesArray.length / 3;
				var layeroffset = 0;
				sidewalls( contour, layeroffset );
				layeroffset += contour.length;

				for ( h = 0, hl = holes.length; h < hl; h ++ ) {

					ahole = holes[ h ];
					sidewalls( ahole, layeroffset );

					//, true
					layeroffset += ahole.length;

				}


				scope.addGroup( start, verticesArray.length / 3 - start, 1 );


			}

			function sidewalls( contour, layeroffset ) {

				var j, k;
				i = contour.length;

				while ( -- i >= 0 ) {

					j = i;
					k = i - 1;
					if ( k < 0 ) k = contour.length - 1;

					//console.log('b', i,j, i-1, k,vertices.length);

					var s = 0,
						sl = steps + bevelSegments * 2;

					for ( s = 0; s < sl; s ++ ) {

						var slen1 = vlen * s;
						var slen2 = vlen * ( s + 1 );

						var a = layeroffset + j + slen1,
							b = layeroffset + k + slen1,
							c = layeroffset + k + slen2,
							d = layeroffset + j + slen2;

						f4( a, b, c, d );

					}

				}

			}

			function v( x, y, z ) {

				placeholder.push( x );
				placeholder.push( y );
				placeholder.push( z );

			}


			function f3( a, b, c ) {

				addVertex( a );
				addVertex( b );
				addVertex( c );

				var nextIndex = verticesArray.length / 3;
				var uvs = uvgen.generateTopUV( scope, verticesArray, nextIndex - 3, nextIndex - 2, nextIndex - 1 );

				addUV( uvs[ 0 ] );
				addUV( uvs[ 1 ] );
				addUV( uvs[ 2 ] );

			}

			function f4( a, b, c, d ) {

				addVertex( a );
				addVertex( b );
				addVertex( d );

				addVertex( b );
				addVertex( c );
				addVertex( d );


				var nextIndex = verticesArray.length / 3;
				var uvs = uvgen.generateSideWallUV( scope, verticesArray, nextIndex - 6, nextIndex - 3, nextIndex - 2, nextIndex - 1 );

				addUV( uvs[ 0 ] );
				addUV( uvs[ 1 ] );
				addUV( uvs[ 3 ] );

				addUV( uvs[ 1 ] );
				addUV( uvs[ 2 ] );
				addUV( uvs[ 3 ] );

			}

			function addVertex( index ) {

				verticesArray.push( placeholder[ index * 3 + 0 ] );
				verticesArray.push( placeholder[ index * 3 + 1 ] );
				verticesArray.push( placeholder[ index * 3 + 2 ] );

			}


			function addUV( vector2 ) {

				uvArray.push( vector2.x );
				uvArray.push( vector2.y );

			}

		}

	}

	ExtrudeBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	ExtrudeBufferGeometry.prototype.constructor = ExtrudeBufferGeometry;

	ExtrudeBufferGeometry.prototype.toJSON = function () {

		var data = BufferGeometry.prototype.toJSON.call( this );

		var shapes = this.parameters.shapes;
		var options = this.parameters.options;

		return toJSON( shapes, options, data );

	};

	//

	var WorldUVGenerator = {

		generateTopUV: function ( geometry, vertices, indexA, indexB, indexC ) {

			var a_x = vertices[ indexA * 3 ];
			var a_y = vertices[ indexA * 3 + 1 ];
			var b_x = vertices[ indexB * 3 ];
			var b_y = vertices[ indexB * 3 + 1 ];
			var c_x = vertices[ indexC * 3 ];
			var c_y = vertices[ indexC * 3 + 1 ];

			return [
				new Vector2( a_x, a_y ),
				new Vector2( b_x, b_y ),
				new Vector2( c_x, c_y )
			];

		},

		generateSideWallUV: function ( geometry, vertices, indexA, indexB, indexC, indexD ) {

			var a_x = vertices[ indexA * 3 ];
			var a_y = vertices[ indexA * 3 + 1 ];
			var a_z = vertices[ indexA * 3 + 2 ];
			var b_x = vertices[ indexB * 3 ];
			var b_y = vertices[ indexB * 3 + 1 ];
			var b_z = vertices[ indexB * 3 + 2 ];
			var c_x = vertices[ indexC * 3 ];
			var c_y = vertices[ indexC * 3 + 1 ];
			var c_z = vertices[ indexC * 3 + 2 ];
			var d_x = vertices[ indexD * 3 ];
			var d_y = vertices[ indexD * 3 + 1 ];
			var d_z = vertices[ indexD * 3 + 2 ];

			if ( Math.abs( a_y - b_y ) < 0.01 ) {

				return [
					new Vector2( a_x, 1 - a_z ),
					new Vector2( b_x, 1 - b_z ),
					new Vector2( c_x, 1 - c_z ),
					new Vector2( d_x, 1 - d_z )
				];

			} else {

				return [
					new Vector2( a_y, 1 - a_z ),
					new Vector2( b_y, 1 - b_z ),
					new Vector2( c_y, 1 - c_z ),
					new Vector2( d_y, 1 - d_z )
				];

			}

		}
	};

	function toJSON( shapes, options, data ) {

		//

		data.shapes = [];

		if ( Array.isArray( shapes ) ) {

			for ( var i = 0, l = shapes.length; i < l; i ++ ) {

				var shape = shapes[ i ];

				data.shapes.push( shape.uuid );

			}

		} else {

			data.shapes.push( shapes.uuid );

		}

		//

		if ( options.extrudePath !== undefined ) data.options.extrudePath = options.extrudePath.toJSON();

		return data;

	}

	/**
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * Text = 3D Text
	 *
	 * parameters = {
	 *  font: <THREE.Font>, // font
	 *
	 *  size: <float>, // size of the text
	 *  height: <float>, // thickness to extrude text
	 *  curveSegments: <int>, // number of points on the curves
	 *
	 *  bevelEnabled: <bool>, // turn on bevel
	 *  bevelThickness: <float>, // how deep into text bevel goes
	 *  bevelSize: <float> // how far from text outline is bevel
	 * }
	 */

	// TextGeometry

	function TextGeometry( text, parameters ) {

		Geometry.call( this );

		this.type = 'TextGeometry';

		this.parameters = {
			text: text,
			parameters: parameters
		};

		this.fromBufferGeometry( new TextBufferGeometry( text, parameters ) );
		this.mergeVertices();

	}

	TextGeometry.prototype = Object.create( Geometry.prototype );
	TextGeometry.prototype.constructor = TextGeometry;

	// TextBufferGeometry

	function TextBufferGeometry( text, parameters ) {

		parameters = parameters || {};

		var font = parameters.font;

		if ( ! ( font && font.isFont ) ) {

			console.error( 'THREE.TextGeometry: font parameter is not an instance of THREE.Font.' );
			return new Geometry();

		}

		var shapes = font.generateShapes( text, parameters.size );

		// translate parameters to ExtrudeGeometry API

		parameters.depth = parameters.height !== undefined ? parameters.height : 50;

		// defaults

		if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
		if ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;
		if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;

		ExtrudeBufferGeometry.call( this, shapes, parameters );

		this.type = 'TextBufferGeometry';

	}

	TextBufferGeometry.prototype = Object.create( ExtrudeBufferGeometry.prototype );
	TextBufferGeometry.prototype.constructor = TextBufferGeometry;

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author benaadams / https://twitter.com/ben_a_adams
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// SphereGeometry

	function SphereGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {

		Geometry.call( this );

		this.type = 'SphereGeometry';

		this.parameters = {
			radius: radius,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			phiStart: phiStart,
			phiLength: phiLength,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		this.fromBufferGeometry( new SphereBufferGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) );
		this.mergeVertices();

	}

	SphereGeometry.prototype = Object.create( Geometry.prototype );
	SphereGeometry.prototype.constructor = SphereGeometry;

	// SphereBufferGeometry

	function SphereBufferGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {

		BufferGeometry.call( this );

		this.type = 'SphereBufferGeometry';

		this.parameters = {
			radius: radius,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			phiStart: phiStart,
			phiLength: phiLength,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		radius = radius || 1;

		widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
		heightSegments = Math.max( 2, Math.floor( heightSegments ) || 6 );

		phiStart = phiStart !== undefined ? phiStart : 0;
		phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

		thetaStart = thetaStart !== undefined ? thetaStart : 0;
		thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

		var thetaEnd = thetaStart + thetaLength;

		var ix, iy;

		var index = 0;
		var grid = [];

		var vertex = new Vector3();
		var normal = new Vector3();

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// generate vertices, normals and uvs

		for ( iy = 0; iy <= heightSegments; iy ++ ) {

			var verticesRow = [];

			var v = iy / heightSegments;

			for ( ix = 0; ix <= widthSegments; ix ++ ) {

				var u = ix / widthSegments;

				// vertex

				vertex.x = - radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
				vertex.y = radius * Math.cos( thetaStart + v * thetaLength );
				vertex.z = radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );

				vertices.push( vertex.x, vertex.y, vertex.z );

				// normal

				normal.set( vertex.x, vertex.y, vertex.z ).normalize();
				normals.push( normal.x, normal.y, normal.z );

				// uv

				uvs.push( u, 1 - v );

				verticesRow.push( index ++ );

			}

			grid.push( verticesRow );

		}

		// indices

		for ( iy = 0; iy < heightSegments; iy ++ ) {

			for ( ix = 0; ix < widthSegments; ix ++ ) {

				var a = grid[ iy ][ ix + 1 ];
				var b = grid[ iy ][ ix ];
				var c = grid[ iy + 1 ][ ix ];
				var d = grid[ iy + 1 ][ ix + 1 ];

				if ( iy !== 0 || thetaStart > 0 ) indices.push( a, b, d );
				if ( iy !== heightSegments - 1 || thetaEnd < Math.PI ) indices.push( b, c, d );

			}

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	}

	SphereBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	SphereBufferGeometry.prototype.constructor = SphereBufferGeometry;

	/**
	 * @author Kaleb Murphy
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// RingGeometry

	function RingGeometry( innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength ) {

		Geometry.call( this );

		this.type = 'RingGeometry';

		this.parameters = {
			innerRadius: innerRadius,
			outerRadius: outerRadius,
			thetaSegments: thetaSegments,
			phiSegments: phiSegments,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		this.fromBufferGeometry( new RingBufferGeometry( innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength ) );
		this.mergeVertices();

	}

	RingGeometry.prototype = Object.create( Geometry.prototype );
	RingGeometry.prototype.constructor = RingGeometry;

	// RingBufferGeometry

	function RingBufferGeometry( innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength ) {

		BufferGeometry.call( this );

		this.type = 'RingBufferGeometry';

		this.parameters = {
			innerRadius: innerRadius,
			outerRadius: outerRadius,
			thetaSegments: thetaSegments,
			phiSegments: phiSegments,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		innerRadius = innerRadius || 0.5;
		outerRadius = outerRadius || 1;

		thetaStart = thetaStart !== undefined ? thetaStart : 0;
		thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

		thetaSegments = thetaSegments !== undefined ? Math.max( 3, thetaSegments ) : 8;
		phiSegments = phiSegments !== undefined ? Math.max( 1, phiSegments ) : 1;

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// some helper variables

		var segment;
		var radius = innerRadius;
		var radiusStep = ( ( outerRadius - innerRadius ) / phiSegments );
		var vertex = new Vector3();
		var uv = new Vector2();
		var j, i;

		// generate vertices, normals and uvs

		for ( j = 0; j <= phiSegments; j ++ ) {

			for ( i = 0; i <= thetaSegments; i ++ ) {

				// values are generate from the inside of the ring to the outside

				segment = thetaStart + i / thetaSegments * thetaLength;

				// vertex

				vertex.x = radius * Math.cos( segment );
				vertex.y = radius * Math.sin( segment );

				vertices.push( vertex.x, vertex.y, vertex.z );

				// normal

				normals.push( 0, 0, 1 );

				// uv

				uv.x = ( vertex.x / outerRadius + 1 ) / 2;
				uv.y = ( vertex.y / outerRadius + 1 ) / 2;

				uvs.push( uv.x, uv.y );

			}

			// increase the radius for next row of vertices

			radius += radiusStep;

		}

		// indices

		for ( j = 0; j < phiSegments; j ++ ) {

			var thetaSegmentLevel = j * ( thetaSegments + 1 );

			for ( i = 0; i < thetaSegments; i ++ ) {

				segment = i + thetaSegmentLevel;

				var a = segment;
				var b = segment + thetaSegments + 1;
				var c = segment + thetaSegments + 2;
				var d = segment + 1;

				// faces

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	}

	RingBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	RingBufferGeometry.prototype.constructor = RingBufferGeometry;

	/**
	 * @author zz85 / https://github.com/zz85
	 * @author bhouston / http://clara.io
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// LatheGeometry

	function LatheGeometry( points, segments, phiStart, phiLength ) {

		Geometry.call( this );

		this.type = 'LatheGeometry';

		this.parameters = {
			points: points,
			segments: segments,
			phiStart: phiStart,
			phiLength: phiLength
		};

		this.fromBufferGeometry( new LatheBufferGeometry( points, segments, phiStart, phiLength ) );
		this.mergeVertices();

	}

	LatheGeometry.prototype = Object.create( Geometry.prototype );
	LatheGeometry.prototype.constructor = LatheGeometry;

	// LatheBufferGeometry

	function LatheBufferGeometry( points, segments, phiStart, phiLength ) {

		BufferGeometry.call( this );

		this.type = 'LatheBufferGeometry';

		this.parameters = {
			points: points,
			segments: segments,
			phiStart: phiStart,
			phiLength: phiLength
		};

		segments = Math.floor( segments ) || 12;
		phiStart = phiStart || 0;
		phiLength = phiLength || Math.PI * 2;

		// clamp phiLength so it's in range of [ 0, 2PI ]

		phiLength = _Math.clamp( phiLength, 0, Math.PI * 2 );


		// buffers

		var indices = [];
		var vertices = [];
		var uvs = [];

		// helper variables

		var base;
		var inverseSegments = 1.0 / segments;
		var vertex = new Vector3();
		var uv = new Vector2();
		var i, j;

		// generate vertices and uvs

		for ( i = 0; i <= segments; i ++ ) {

			var phi = phiStart + i * inverseSegments * phiLength;

			var sin = Math.sin( phi );
			var cos = Math.cos( phi );

			for ( j = 0; j <= ( points.length - 1 ); j ++ ) {

				// vertex

				vertex.x = points[ j ].x * sin;
				vertex.y = points[ j ].y;
				vertex.z = points[ j ].x * cos;

				vertices.push( vertex.x, vertex.y, vertex.z );

				// uv

				uv.x = i / segments;
				uv.y = j / ( points.length - 1 );

				uvs.push( uv.x, uv.y );


			}

		}

		// indices

		for ( i = 0; i < segments; i ++ ) {

			for ( j = 0; j < ( points.length - 1 ); j ++ ) {

				base = j + i * points.length;

				var a = base;
				var b = base + points.length;
				var c = base + points.length + 1;
				var d = base + 1;

				// faces

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

		// generate normals

		this.computeVertexNormals();

		// if the geometry is closed, we need to average the normals along the seam.
		// because the corresponding vertices are identical (but still have different UVs).

		if ( phiLength === Math.PI * 2 ) {

			var normals = this.attributes.normal.array;
			var n1 = new Vector3();
			var n2 = new Vector3();
			var n = new Vector3();

			// this is the buffer offset for the last line of vertices

			base = segments * points.length * 3;

			for ( i = 0, j = 0; i < points.length; i ++, j += 3 ) {

				// select the normal of the vertex in the first line

				n1.x = normals[ j + 0 ];
				n1.y = normals[ j + 1 ];
				n1.z = normals[ j + 2 ];

				// select the normal of the vertex in the last line

				n2.x = normals[ base + j + 0 ];
				n2.y = normals[ base + j + 1 ];
				n2.z = normals[ base + j + 2 ];

				// average normals

				n.addVectors( n1, n2 ).normalize();

				// assign the new values to both normals

				normals[ j + 0 ] = normals[ base + j + 0 ] = n.x;
				normals[ j + 1 ] = normals[ base + j + 1 ] = n.y;
				normals[ j + 2 ] = normals[ base + j + 2 ] = n.z;

			}

		}

	}

	LatheBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	LatheBufferGeometry.prototype.constructor = LatheBufferGeometry;

	/**
	 * @author jonobr1 / http://jonobr1.com
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// ShapeGeometry

	function ShapeGeometry( shapes, curveSegments ) {

		Geometry.call( this );

		this.type = 'ShapeGeometry';

		if ( typeof curveSegments === 'object' ) {

			console.warn( 'THREE.ShapeGeometry: Options parameter has been removed.' );

			curveSegments = curveSegments.curveSegments;

		}

		this.parameters = {
			shapes: shapes,
			curveSegments: curveSegments
		};

		this.fromBufferGeometry( new ShapeBufferGeometry( shapes, curveSegments ) );
		this.mergeVertices();

	}

	ShapeGeometry.prototype = Object.create( Geometry.prototype );
	ShapeGeometry.prototype.constructor = ShapeGeometry;

	ShapeGeometry.prototype.toJSON = function () {

		var data = Geometry.prototype.toJSON.call( this );

		var shapes = this.parameters.shapes;

		return toJSON$1( shapes, data );

	};

	// ShapeBufferGeometry

	function ShapeBufferGeometry( shapes, curveSegments ) {

		BufferGeometry.call( this );

		this.type = 'ShapeBufferGeometry';

		this.parameters = {
			shapes: shapes,
			curveSegments: curveSegments
		};

		curveSegments = curveSegments || 12;

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// helper variables

		var groupStart = 0;
		var groupCount = 0;

		// allow single and array values for "shapes" parameter

		if ( Array.isArray( shapes ) === false ) {

			addShape( shapes );

		} else {

			for ( var i = 0; i < shapes.length; i ++ ) {

				addShape( shapes[ i ] );

				this.addGroup( groupStart, groupCount, i ); // enables MultiMaterial support

				groupStart += groupCount;
				groupCount = 0;

			}

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );


		// helper functions

		function addShape( shape ) {

			var i, l, shapeHole;

			var indexOffset = vertices.length / 3;
			var points = shape.extractPoints( curveSegments );

			var shapeVertices = points.shape;
			var shapeHoles = points.holes;

			// check direction of vertices

			if ( ShapeUtils.isClockWise( shapeVertices ) === false ) {

				shapeVertices = shapeVertices.reverse();

			}

			for ( i = 0, l = shapeHoles.length; i < l; i ++ ) {

				shapeHole = shapeHoles[ i ];

				if ( ShapeUtils.isClockWise( shapeHole ) === true ) {

					shapeHoles[ i ] = shapeHole.reverse();

				}

			}

			var faces = ShapeUtils.triangulateShape( shapeVertices, shapeHoles );

			// join vertices of inner and outer paths to a single array

			for ( i = 0, l = shapeHoles.length; i < l; i ++ ) {

				shapeHole = shapeHoles[ i ];
				shapeVertices = shapeVertices.concat( shapeHole );

			}

			// vertices, normals, uvs

			for ( i = 0, l = shapeVertices.length; i < l; i ++ ) {

				var vertex = shapeVertices[ i ];

				vertices.push( vertex.x, vertex.y, 0 );
				normals.push( 0, 0, 1 );
				uvs.push( vertex.x, vertex.y ); // world uvs

			}

			// incides

			for ( i = 0, l = faces.length; i < l; i ++ ) {

				var face = faces[ i ];

				var a = face[ 0 ] + indexOffset;
				var b = face[ 1 ] + indexOffset;
				var c = face[ 2 ] + indexOffset;

				indices.push( a, b, c );
				groupCount += 3;

			}

		}

	}

	ShapeBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	ShapeBufferGeometry.prototype.constructor = ShapeBufferGeometry;

	ShapeBufferGeometry.prototype.toJSON = function () {

		var data = BufferGeometry.prototype.toJSON.call( this );

		var shapes = this.parameters.shapes;

		return toJSON$1( shapes, data );

	};

	//

	function toJSON$1( shapes, data ) {

		data.shapes = [];

		if ( Array.isArray( shapes ) ) {

			for ( var i = 0, l = shapes.length; i < l; i ++ ) {

				var shape = shapes[ i ];

				data.shapes.push( shape.uuid );

			}

		} else {

			data.shapes.push( shapes.uuid );

		}

		return data;

	}

	/**
	 * @author WestLangley / http://github.com/WestLangley
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	function EdgesGeometry( geometry, thresholdAngle ) {

		BufferGeometry.call( this );

		this.type = 'EdgesGeometry';

		this.parameters = {
			thresholdAngle: thresholdAngle
		};

		thresholdAngle = ( thresholdAngle !== undefined ) ? thresholdAngle : 1;

		// buffer

		var vertices = [];

		// helper variables

		var thresholdDot = Math.cos( _Math.DEG2RAD * thresholdAngle );
		var edge = [ 0, 0 ], edges = {}, edge1, edge2;
		var key, keys = [ 'a', 'b', 'c' ];

		// prepare source geometry

		var geometry2;

		if ( geometry.isBufferGeometry ) {

			geometry2 = new Geometry();
			geometry2.fromBufferGeometry( geometry );

		} else {

			geometry2 = geometry.clone();

		}

		geometry2.mergeVertices();
		geometry2.computeFaceNormals();

		var sourceVertices = geometry2.vertices;
		var faces = geometry2.faces;

		// now create a data structure where each entry represents an edge with its adjoining faces

		for ( var i = 0, l = faces.length; i < l; i ++ ) {

			var face = faces[ i ];

			for ( var j = 0; j < 3; j ++ ) {

				edge1 = face[ keys[ j ] ];
				edge2 = face[ keys[ ( j + 1 ) % 3 ] ];
				edge[ 0 ] = Math.min( edge1, edge2 );
				edge[ 1 ] = Math.max( edge1, edge2 );

				key = edge[ 0 ] + ',' + edge[ 1 ];

				if ( edges[ key ] === undefined ) {

					edges[ key ] = { index1: edge[ 0 ], index2: edge[ 1 ], face1: i, face2: undefined };

				} else {

					edges[ key ].face2 = i;

				}

			}

		}

		// generate vertices

		for ( key in edges ) {

			var e = edges[ key ];

			// an edge is only rendered if the angle (in degrees) between the face normals of the adjoining faces exceeds this value. default = 1 degree.

			if ( e.face2 === undefined || faces[ e.face1 ].normal.dot( faces[ e.face2 ].normal ) <= thresholdDot ) {

				var vertex = sourceVertices[ e.index1 ];
				vertices.push( vertex.x, vertex.y, vertex.z );

				vertex = sourceVertices[ e.index2 ];
				vertices.push( vertex.x, vertex.y, vertex.z );

			}

		}

		// build geometry

		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );

	}

	EdgesGeometry.prototype = Object.create( BufferGeometry.prototype );
	EdgesGeometry.prototype.constructor = EdgesGeometry;

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	// CylinderGeometry

	function CylinderGeometry( radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength ) {

		Geometry.call( this );

		this.type = 'CylinderGeometry';

		this.parameters = {
			radiusTop: radiusTop,
			radiusBottom: radiusBottom,
			height: height,
			radialSegments: radialSegments,
			heightSegments: heightSegments,
			openEnded: openEnded,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		this.fromBufferGeometry( new CylinderBufferGeometry( radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength ) );
		this.mergeVertices();

	}

	CylinderGeometry.prototype = Object.create( Geometry.prototype );
	CylinderGeometry.prototype.constructor = CylinderGeometry;

	// CylinderBufferGeometry

	function CylinderBufferGeometry( radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength ) {

		BufferGeometry.call( this );

		this.type = 'CylinderBufferGeometry';

		this.parameters = {
			radiusTop: radiusTop,
			radiusBottom: radiusBottom,
			height: height,
			radialSegments: radialSegments,
			heightSegments: heightSegments,
			openEnded: openEnded,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		var scope = this;

		radiusTop = radiusTop !== undefined ? radiusTop : 1;
		radiusBottom = radiusBottom !== undefined ? radiusBottom : 1;
		height = height || 1;

		radialSegments = Math.floor( radialSegments ) || 8;
		heightSegments = Math.floor( heightSegments ) || 1;

		openEnded = openEnded !== undefined ? openEnded : false;
		thetaStart = thetaStart !== undefined ? thetaStart : 0.0;
		thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// helper variables

		var index = 0;
		var indexArray = [];
		var halfHeight = height / 2;
		var groupStart = 0;

		// generate geometry

		generateTorso();

		if ( openEnded === false ) {

			if ( radiusTop > 0 ) generateCap( true );
			if ( radiusBottom > 0 ) generateCap( false );

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

		function generateTorso() {

			var x, y;
			var normal = new Vector3();
			var vertex = new Vector3();

			var groupCount = 0;

			// this will be used to calculate the normal
			var slope = ( radiusBottom - radiusTop ) / height;

			// generate vertices, normals and uvs

			for ( y = 0; y <= heightSegments; y ++ ) {

				var indexRow = [];

				var v = y / heightSegments;

				// calculate the radius of the current row

				var radius = v * ( radiusBottom - radiusTop ) + radiusTop;

				for ( x = 0; x <= radialSegments; x ++ ) {

					var u = x / radialSegments;

					var theta = u * thetaLength + thetaStart;

					var sinTheta = Math.sin( theta );
					var cosTheta = Math.cos( theta );

					// vertex

					vertex.x = radius * sinTheta;
					vertex.y = - v * height + halfHeight;
					vertex.z = radius * cosTheta;
					vertices.push( vertex.x, vertex.y, vertex.z );

					// normal

					normal.set( sinTheta, slope, cosTheta ).normalize();
					normals.push( normal.x, normal.y, normal.z );

					// uv

					uvs.push( u, 1 - v );

					// save index of vertex in respective row

					indexRow.push( index ++ );

				}

				// now save vertices of the row in our index array

				indexArray.push( indexRow );

			}

			// generate indices

			for ( x = 0; x < radialSegments; x ++ ) {

				for ( y = 0; y < heightSegments; y ++ ) {

					// we use the index array to access the correct indices

					var a = indexArray[ y ][ x ];
					var b = indexArray[ y + 1 ][ x ];
					var c = indexArray[ y + 1 ][ x + 1 ];
					var d = indexArray[ y ][ x + 1 ];

					// faces

					indices.push( a, b, d );
					indices.push( b, c, d );

					// update group counter

					groupCount += 6;

				}

			}

			// add a group to the geometry. this will ensure multi material support

			scope.addGroup( groupStart, groupCount, 0 );

			// calculate new start value for groups

			groupStart += groupCount;

		}

		function generateCap( top ) {

			var x, centerIndexStart, centerIndexEnd;

			var uv = new Vector2();
			var vertex = new Vector3();

			var groupCount = 0;

			var radius = ( top === true ) ? radiusTop : radiusBottom;
			var sign = ( top === true ) ? 1 : - 1;

			// save the index of the first center vertex
			centerIndexStart = index;

			// first we generate the center vertex data of the cap.
			// because the geometry needs one set of uvs per face,
			// we must generate a center vertex per face/segment

			for ( x = 1; x <= radialSegments; x ++ ) {

				// vertex

				vertices.push( 0, halfHeight * sign, 0 );

				// normal

				normals.push( 0, sign, 0 );

				// uv

				uvs.push( 0.5, 0.5 );

				// increase index

				index ++;

			}

			// save the index of the last center vertex

			centerIndexEnd = index;

			// now we generate the surrounding vertices, normals and uvs

			for ( x = 0; x <= radialSegments; x ++ ) {

				var u = x / radialSegments;
				var theta = u * thetaLength + thetaStart;

				var cosTheta = Math.cos( theta );
				var sinTheta = Math.sin( theta );

				// vertex

				vertex.x = radius * sinTheta;
				vertex.y = halfHeight * sign;
				vertex.z = radius * cosTheta;
				vertices.push( vertex.x, vertex.y, vertex.z );

				// normal

				normals.push( 0, sign, 0 );

				// uv

				uv.x = ( cosTheta * 0.5 ) + 0.5;
				uv.y = ( sinTheta * 0.5 * sign ) + 0.5;
				uvs.push( uv.x, uv.y );

				// increase index

				index ++;

			}

			// generate indices

			for ( x = 0; x < radialSegments; x ++ ) {

				var c = centerIndexStart + x;
				var i = centerIndexEnd + x;

				if ( top === true ) {

					// face top

					indices.push( i, i + 1, c );

				} else {

					// face bottom

					indices.push( i + 1, i, c );

				}

				groupCount += 3;

			}

			// add a group to the geometry. this will ensure multi material support

			scope.addGroup( groupStart, groupCount, top === true ? 1 : 2 );

			// calculate new start value for groups

			groupStart += groupCount;

		}

	}

	CylinderBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	CylinderBufferGeometry.prototype.constructor = CylinderBufferGeometry;

	/**
	 * @author abelnation / http://github.com/abelnation
	 */

	// ConeGeometry

	function ConeGeometry( radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength ) {

		CylinderGeometry.call( this, 0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength );

		this.type = 'ConeGeometry';

		this.parameters = {
			radius: radius,
			height: height,
			radialSegments: radialSegments,
			heightSegments: heightSegments,
			openEnded: openEnded,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

	}

	ConeGeometry.prototype = Object.create( CylinderGeometry.prototype );
	ConeGeometry.prototype.constructor = ConeGeometry;

	// ConeBufferGeometry

	function ConeBufferGeometry( radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength ) {

		CylinderBufferGeometry.call( this, 0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength );

		this.type = 'ConeBufferGeometry';

		this.parameters = {
			radius: radius,
			height: height,
			radialSegments: radialSegments,
			heightSegments: heightSegments,
			openEnded: openEnded,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

	}

	ConeBufferGeometry.prototype = Object.create( CylinderBufferGeometry.prototype );
	ConeBufferGeometry.prototype.constructor = ConeBufferGeometry;

	/**
	 * @author benaadams / https://twitter.com/ben_a_adams
	 * @author Mugen87 / https://github.com/Mugen87
	 * @author hughes
	 */

	// CircleGeometry

	function CircleGeometry( radius, segments, thetaStart, thetaLength ) {

		Geometry.call( this );

		this.type = 'CircleGeometry';

		this.parameters = {
			radius: radius,
			segments: segments,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		this.fromBufferGeometry( new CircleBufferGeometry( radius, segments, thetaStart, thetaLength ) );
		this.mergeVertices();

	}

	CircleGeometry.prototype = Object.create( Geometry.prototype );
	CircleGeometry.prototype.constructor = CircleGeometry;

	// CircleBufferGeometry

	function CircleBufferGeometry( radius, segments, thetaStart, thetaLength ) {

		BufferGeometry.call( this );

		this.type = 'CircleBufferGeometry';

		this.parameters = {
			radius: radius,
			segments: segments,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		radius = radius || 1;
		segments = segments !== undefined ? Math.max( 3, segments ) : 8;

		thetaStart = thetaStart !== undefined ? thetaStart : 0;
		thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// helper variables

		var i, s;
		var vertex = new Vector3();
		var uv = new Vector2();

		// center point

		vertices.push( 0, 0, 0 );
		normals.push( 0, 0, 1 );
		uvs.push( 0.5, 0.5 );

		for ( s = 0, i = 3; s <= segments; s ++, i += 3 ) {

			var segment = thetaStart + s / segments * thetaLength;

			// vertex

			vertex.x = radius * Math.cos( segment );
			vertex.y = radius * Math.sin( segment );

			vertices.push( vertex.x, vertex.y, vertex.z );

			// normal

			normals.push( 0, 0, 1 );

			// uvs

			uv.x = ( vertices[ i ] / radius + 1 ) / 2;
			uv.y = ( vertices[ i + 1 ] / radius + 1 ) / 2;

			uvs.push( uv.x, uv.y );

		}

		// indices

		for ( i = 1; i <= segments; i ++ ) {

			indices.push( i, i + 1, 0 );

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	}

	CircleBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
	CircleBufferGeometry.prototype.constructor = CircleBufferGeometry;



	var Geometries = /*#__PURE__*/Object.freeze({
		WireframeGeometry: WireframeGeometry,
		ParametricGeometry: ParametricGeometry,
		ParametricBufferGeometry: ParametricBufferGeometry,
		TetrahedronGeometry: TetrahedronGeometry,
		TetrahedronBufferGeometry: TetrahedronBufferGeometry,
		OctahedronGeometry: OctahedronGeometry,
		OctahedronBufferGeometry: OctahedronBufferGeometry,
		IcosahedronGeometry: IcosahedronGeometry,
		IcosahedronBufferGeometry: IcosahedronBufferGeometry,
		DodecahedronGeometry: DodecahedronGeometry,
		DodecahedronBufferGeometry: DodecahedronBufferGeometry,
		PolyhedronGeometry: PolyhedronGeometry,
		PolyhedronBufferGeometry: PolyhedronBufferGeometry,
		TubeGeometry: TubeGeometry,
		TubeBufferGeometry: TubeBufferGeometry,
		TorusKnotGeometry: TorusKnotGeometry,
		TorusKnotBufferGeometry: TorusKnotBufferGeometry,
		TorusGeometry: TorusGeometry,
		TorusBufferGeometry: TorusBufferGeometry,
		TextGeometry: TextGeometry,
		TextBufferGeometry: TextBufferGeometry,
		SphereGeometry: SphereGeometry,
		SphereBufferGeometry: SphereBufferGeometry,
		RingGeometry: RingGeometry,
		RingBufferGeometry: RingBufferGeometry,
		PlaneGeometry: PlaneGeometry,
		PlaneBufferGeometry: PlaneBufferGeometry,
		LatheGeometry: LatheGeometry,
		LatheBufferGeometry: LatheBufferGeometry,
		ShapeGeometry: ShapeGeometry,
		ShapeBufferGeometry: ShapeBufferGeometry,
		ExtrudeGeometry: ExtrudeGeometry,
		ExtrudeBufferGeometry: ExtrudeBufferGeometry,
		EdgesGeometry: EdgesGeometry,
		ConeGeometry: ConeGeometry,
		ConeBufferGeometry: ConeBufferGeometry,
		CylinderGeometry: CylinderGeometry,
		CylinderBufferGeometry: CylinderBufferGeometry,
		CircleGeometry: CircleGeometry,
		CircleBufferGeometry: CircleBufferGeometry,
		BoxGeometry: BoxGeometry,
		BoxBufferGeometry: BoxBufferGeometry
	});

	/**
	 * @author mrdoob / http://mrdoob.com/
	 *
	 * parameters = {
	 *  color: <THREE.Color>
	 * }
	 */

	function ShadowMaterial( parameters ) {

		Material.call( this );

		this.type = 'ShadowMaterial';

		this.color = new Color( 0x000000 );
		this.transparent = true;

		this.setValues( parameters );

	}

	ShadowMaterial.prototype = Object.create( Material.prototype );
	ShadowMaterial.prototype.constructor = ShadowMaterial;

	ShadowMaterial.prototype.isShadowMaterial = true;

	ShadowMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );

		return this;

	};

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function RawShaderMaterial( parameters ) {

		ShaderMaterial.call( this, parameters );

		this.type = 'RawShaderMaterial';

	}

	RawShaderMaterial.prototype = Object.create( ShaderMaterial.prototype );
	RawShaderMaterial.prototype.constructor = RawShaderMaterial;

	RawShaderMaterial.prototype.isRawShaderMaterial = true;

	/**
	 * @author WestLangley / http://github.com/WestLangley
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  roughness: <float>,
	 *  metalness: <float>,
	 *  opacity: <float>,
	 *
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  lightMap: new THREE.Texture( <Image> ),
	 *  lightMapIntensity: <float>
	 *
	 *  aoMap: new THREE.Texture( <Image> ),
	 *  aoMapIntensity: <float>
	 *
	 *  emissive: <hex>,
	 *  emissiveIntensity: <float>
	 *  emissiveMap: new THREE.Texture( <Image> ),
	 *
	 *  bumpMap: new THREE.Texture( <Image> ),
	 *  bumpScale: <float>,
	 *
	 *  normalMap: new THREE.Texture( <Image> ),
	 *  normalMapType: THREE.TangentSpaceNormalMap,
	 *  normalScale: <Vector2>,
	 *
	 *  displacementMap: new THREE.Texture( <Image> ),
	 *  displacementScale: <float>,
	 *  displacementBias: <float>,
	 *
	 *  roughnessMap: new THREE.Texture( <Image> ),
	 *
	 *  metalnessMap: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
	 *  envMapIntensity: <float>
	 *
	 *  refractionRatio: <float>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *  morphNormals: <bool>
	 * }
	 */

	function MeshStandardMaterial( parameters ) {

		Material.call( this );

		this.defines = { 'STANDARD': '' };

		this.type = 'MeshStandardMaterial';

		this.color = new Color( 0xffffff ); // diffuse
		this.roughness = 0.5;
		this.metalness = 0.5;

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.emissive = new Color( 0x000000 );
		this.emissiveIntensity = 1.0;
		this.emissiveMap = null;

		this.bumpMap = null;
		this.bumpScale = 1;

		this.normalMap = null;
		this.normalMapType = TangentSpaceNormalMap;
		this.normalScale = new Vector2( 1, 1 );

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.roughnessMap = null;

		this.metalnessMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.envMapIntensity = 1.0;

		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.skinning = false;
		this.morphTargets = false;
		this.morphNormals = false;

		this.setValues( parameters );

	}

	MeshStandardMaterial.prototype = Object.create( Material.prototype );
	MeshStandardMaterial.prototype.constructor = MeshStandardMaterial;

	MeshStandardMaterial.prototype.isMeshStandardMaterial = true;

	MeshStandardMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.defines = { 'STANDARD': '' };

		this.color.copy( source.color );
		this.roughness = source.roughness;
		this.metalness = source.metalness;

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.emissive.copy( source.emissive );
		this.emissiveMap = source.emissiveMap;
		this.emissiveIntensity = source.emissiveIntensity;

		this.bumpMap = source.bumpMap;
		this.bumpScale = source.bumpScale;

		this.normalMap = source.normalMap;
		this.normalMapType = source.normalMapType;
		this.normalScale.copy( source.normalScale );

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.roughnessMap = source.roughnessMap;

		this.metalnessMap = source.metalnessMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.envMapIntensity = source.envMapIntensity;

		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		return this;

	};

	/**
	 * @author WestLangley / http://github.com/WestLangley
	 *
	 * parameters = {
	 *  reflectivity: <float>
	 *  clearCoat: <float>
	 *  clearCoatRoughness: <float>
	 * }
	 */

	function MeshPhysicalMaterial( parameters ) {

		MeshStandardMaterial.call( this );

		this.defines = { 'PHYSICAL': '' };

		this.type = 'MeshPhysicalMaterial';

		this.reflectivity = 0.5; // maps to F0 = 0.04

		this.clearCoat = 0.0;
		this.clearCoatRoughness = 0.0;

		this.setValues( parameters );

	}

	MeshPhysicalMaterial.prototype = Object.create( MeshStandardMaterial.prototype );
	MeshPhysicalMaterial.prototype.constructor = MeshPhysicalMaterial;

	MeshPhysicalMaterial.prototype.isMeshPhysicalMaterial = true;

	MeshPhysicalMaterial.prototype.copy = function ( source ) {

		MeshStandardMaterial.prototype.copy.call( this, source );

		this.defines = { 'PHYSICAL': '' };

		this.reflectivity = source.reflectivity;

		this.clearCoat = source.clearCoat;
		this.clearCoatRoughness = source.clearCoatRoughness;

		return this;

	};

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  specular: <hex>,
	 *  shininess: <float>,
	 *  opacity: <float>,
	 *
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  lightMap: new THREE.Texture( <Image> ),
	 *  lightMapIntensity: <float>
	 *
	 *  aoMap: new THREE.Texture( <Image> ),
	 *  aoMapIntensity: <float>
	 *
	 *  emissive: <hex>,
	 *  emissiveIntensity: <float>
	 *  emissiveMap: new THREE.Texture( <Image> ),
	 *
	 *  bumpMap: new THREE.Texture( <Image> ),
	 *  bumpScale: <float>,
	 *
	 *  normalMap: new THREE.Texture( <Image> ),
	 *  normalMapType: THREE.TangentSpaceNormalMap,
	 *  normalScale: <Vector2>,
	 *
	 *  displacementMap: new THREE.Texture( <Image> ),
	 *  displacementScale: <float>,
	 *  displacementBias: <float>,
	 *
	 *  specularMap: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
	 *  combine: THREE.Multiply,
	 *  reflectivity: <float>,
	 *  refractionRatio: <float>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *  morphNormals: <bool>
	 * }
	 */

	function MeshPhongMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshPhongMaterial';

		this.color = new Color( 0xffffff ); // diffuse
		this.specular = new Color( 0x111111 );
		this.shininess = 30;

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.emissive = new Color( 0x000000 );
		this.emissiveIntensity = 1.0;
		this.emissiveMap = null;

		this.bumpMap = null;
		this.bumpScale = 1;

		this.normalMap = null;
		this.normalMapType = TangentSpaceNormalMap;
		this.normalScale = new Vector2( 1, 1 );

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.specularMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.combine = MultiplyOperation;
		this.reflectivity = 1;
		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.skinning = false;
		this.morphTargets = false;
		this.morphNormals = false;

		this.setValues( parameters );

	}

	MeshPhongMaterial.prototype = Object.create( Material.prototype );
	MeshPhongMaterial.prototype.constructor = MeshPhongMaterial;

	MeshPhongMaterial.prototype.isMeshPhongMaterial = true;

	MeshPhongMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );
		this.specular.copy( source.specular );
		this.shininess = source.shininess;

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.emissive.copy( source.emissive );
		this.emissiveMap = source.emissiveMap;
		this.emissiveIntensity = source.emissiveIntensity;

		this.bumpMap = source.bumpMap;
		this.bumpScale = source.bumpScale;

		this.normalMap = source.normalMap;
		this.normalMapType = source.normalMapType;
		this.normalScale.copy( source.normalScale );

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.specularMap = source.specularMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.combine = source.combine;
		this.reflectivity = source.reflectivity;
		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		return this;

	};

	/**
	 * @author takahirox / http://github.com/takahirox
	 *
	 * parameters = {
	 *  gradientMap: new THREE.Texture( <Image> )
	 * }
	 */

	function MeshToonMaterial( parameters ) {

		MeshPhongMaterial.call( this );

		this.defines = { 'TOON': '' };

		this.type = 'MeshToonMaterial';

		this.gradientMap = null;

		this.setValues( parameters );

	}

	MeshToonMaterial.prototype = Object.create( MeshPhongMaterial.prototype );
	MeshToonMaterial.prototype.constructor = MeshToonMaterial;

	MeshToonMaterial.prototype.isMeshToonMaterial = true;

	MeshToonMaterial.prototype.copy = function ( source ) {

		MeshPhongMaterial.prototype.copy.call( this, source );

		this.gradientMap = source.gradientMap;

		return this;

	};

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author WestLangley / http://github.com/WestLangley
	 *
	 * parameters = {
	 *  opacity: <float>,
	 *
	 *  bumpMap: new THREE.Texture( <Image> ),
	 *  bumpScale: <float>,
	 *
	 *  normalMap: new THREE.Texture( <Image> ),
	 *  normalMapType: THREE.TangentSpaceNormalMap,
	 *  normalScale: <Vector2>,
	 *
	 *  displacementMap: new THREE.Texture( <Image> ),
	 *  displacementScale: <float>,
	 *  displacementBias: <float>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *  morphNormals: <bool>
	 * }
	 */

	function MeshNormalMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshNormalMaterial';

		this.bumpMap = null;
		this.bumpScale = 1;

		this.normalMap = null;
		this.normalMapType = TangentSpaceNormalMap;
		this.normalScale = new Vector2( 1, 1 );

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.wireframe = false;
		this.wireframeLinewidth = 1;

		this.fog = false;
		this.lights = false;

		this.skinning = false;
		this.morphTargets = false;
		this.morphNormals = false;

		this.setValues( parameters );

	}

	MeshNormalMaterial.prototype = Object.create( Material.prototype );
	MeshNormalMaterial.prototype.constructor = MeshNormalMaterial;

	MeshNormalMaterial.prototype.isMeshNormalMaterial = true;

	MeshNormalMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.bumpMap = source.bumpMap;
		this.bumpScale = source.bumpScale;

		this.normalMap = source.normalMap;
		this.normalMapType = source.normalMapType;
		this.normalScale.copy( source.normalScale );

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		return this;

	};

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  lightMap: new THREE.Texture( <Image> ),
	 *  lightMapIntensity: <float>
	 *
	 *  aoMap: new THREE.Texture( <Image> ),
	 *  aoMapIntensity: <float>
	 *
	 *  emissive: <hex>,
	 *  emissiveIntensity: <float>
	 *  emissiveMap: new THREE.Texture( <Image> ),
	 *
	 *  specularMap: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
	 *  combine: THREE.Multiply,
	 *  reflectivity: <float>,
	 *  refractionRatio: <float>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *  morphNormals: <bool>
	 * }
	 */

	function MeshLambertMaterial( parameters ) {

		Material.call( this );

		this.type = 'MeshLambertMaterial';

		this.color = new Color( 0xffffff ); // diffuse

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.emissive = new Color( 0x000000 );
		this.emissiveIntensity = 1.0;
		this.emissiveMap = null;

		this.specularMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.combine = MultiplyOperation;
		this.reflectivity = 1;
		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.skinning = false;
		this.morphTargets = false;
		this.morphNormals = false;

		this.setValues( parameters );

	}

	MeshLambertMaterial.prototype = Object.create( Material.prototype );
	MeshLambertMaterial.prototype.constructor = MeshLambertMaterial;

	MeshLambertMaterial.prototype.isMeshLambertMaterial = true;

	MeshLambertMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.color.copy( source.color );

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.emissive.copy( source.emissive );
		this.emissiveMap = source.emissiveMap;
		this.emissiveIntensity = source.emissiveIntensity;

		this.specularMap = source.specularMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.combine = source.combine;
		this.reflectivity = source.reflectivity;
		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		return this;

	};

	/**
	 * @author WestLangley / http://github.com/WestLangley
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *
	 *  matcap: new THREE.Texture( <Image> ),
	 *
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  bumpMap: new THREE.Texture( <Image> ),
	 *  bumpScale: <float>,
	 *
	 *  normalMap: new THREE.Texture( <Image> ),
	 *  normalMapType: THREE.TangentSpaceNormalMap,
	 *  normalScale: <Vector2>,
	 *
	 *  displacementMap: new THREE.Texture( <Image> ),
	 *  displacementScale: <float>,
	 *  displacementBias: <float>,
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *  morphNormals: <bool>
	 * }
	 */

	function MeshMatcapMaterial( parameters ) {

		Material.call( this );

		this.defines = { 'MATCAP': '' };

		this.type = 'MeshMatcapMaterial';

		this.color = new Color( 0xffffff ); // diffuse

		this.matcap = null;

		this.map = null;

		this.bumpMap = null;
		this.bumpScale = 1;

		this.normalMap = null;
		this.normalMapType = TangentSpaceNormalMap;
		this.normalScale = new Vector2( 1, 1 );

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.alphaMap = null;

		this.skinning = false;
		this.morphTargets = false;
		this.morphNormals = false;

		this.lights = false;

		this.setValues( parameters );

	}

	MeshMatcapMaterial.prototype = Object.create( Material.prototype );
	MeshMatcapMaterial.prototype.constructor = MeshMatcapMaterial;

	MeshMatcapMaterial.prototype.isMeshMatcapMaterial = true;

	MeshMatcapMaterial.prototype.copy = function ( source ) {

		Material.prototype.copy.call( this, source );

		this.defines = { 'MATCAP': '' };

		this.color.copy( source.color );

		this.matcap = source.matcap;

		this.map = source.map;

		this.bumpMap = source.bumpMap;
		this.bumpScale = source.bumpScale;

		this.normalMap = source.normalMap;
		this.normalMapType = source.normalMapType;
		this.normalScale.copy( source.normalScale );

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.alphaMap = source.alphaMap;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		return this;

	};

	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * parameters = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *
	 *  linewidth: <float>,
	 *
	 *  scale: <float>,
	 *  dashSize: <float>,
	 *  gapSize: <float>
	 * }
	 */

	function LineDashedMaterial( parameters ) {

		LineBasicMaterial.call( this );

		this.type = 'LineDashedMaterial';

		this.scale = 1;
		this.dashSize = 3;
		this.gapSize = 1;

		this.setValues( parameters );

	}

	LineDashedMaterial.prototype = Object.create( LineBasicMaterial.prototype );
	LineDashedMaterial.prototype.constructor = LineDashedMaterial;

	LineDashedMaterial.prototype.isLineDashedMaterial = true;

	LineDashedMaterial.prototype.copy = function ( source ) {

		LineBasicMaterial.prototype.copy.call( this, source );

		this.scale = source.scale;
		this.dashSize = source.dashSize;
		this.gapSize = source.gapSize;

		return this;

	};



	var Materials = /*#__PURE__*/Object.freeze({
		ShadowMaterial: ShadowMaterial,
		SpriteMaterial: SpriteMaterial,
		RawShaderMaterial: RawShaderMaterial,
		ShaderMaterial: ShaderMaterial,
		PointsMaterial: PointsMaterial,
		MeshPhysicalMaterial: MeshPhysicalMaterial,
		MeshStandardMaterial: MeshStandardMaterial,
		MeshPhongMaterial: MeshPhongMaterial,
		MeshToonMaterial: MeshToonMaterial,
		MeshNormalMaterial: MeshNormalMaterial,
		MeshLambertMaterial: MeshLambertMaterial,
		MeshDepthMaterial: MeshDepthMaterial,
		MeshDistanceMaterial: MeshDistanceMaterial,
		MeshBasicMaterial: MeshBasicMaterial,
		MeshMatcapMaterial: MeshMatcapMaterial,
		LineDashedMaterial: LineDashedMaterial,
		LineBasicMaterial: LineBasicMaterial,
		Material: Material
	});

	/**
	 * @author tschw
	 * @author Ben Houston / http://clara.io/
	 * @author David Sarno / http://lighthaus.us/
	 */

	var AnimationUtils = {

		// same as Array.prototype.slice, but also works on typed arrays
		arraySlice: function ( array, from, to ) {

			if ( AnimationUtils.isTypedArray( array ) ) {

				// in ios9 array.subarray(from, undefined) will return empty array
				// but array.subarray(from) or array.subarray(from, len) is correct
				return new array.constructor( array.subarray( from, to !== undefined ? to : array.length ) );

			}

			return array.slice( from, to );

		},

		// converts an array to a specific type
		convertArray: function ( array, type, forceClone ) {

			if ( ! array || // let 'undefined' and 'null' pass
				! forceClone && array.constructor === type ) return array;

			if ( typeof type.BYTES_PER_ELEMENT === 'number' ) {

				return new type( array ); // create typed array

			}

			return Array.prototype.slice.call( array ); // create Array

		},

		isTypedArray: function ( object ) {

			return ArrayBuffer.isView( object ) &&
				! ( object instanceof DataView );

		},

		// returns an array by which times and values can be sorted
		getKeyframeOrder: function ( times ) {

			function compareTime( i, j ) {

				return times[ i ] - times[ j ];

			}

			var n = times.length;
			var result = new Array( n );
			for ( var i = 0; i !== n; ++ i ) result[ i ] = i;

			result.sort( compareTime );

			return result;

		},

		// uses the array previously returned by 'getKeyframeOrder' to sort data
		sortedArray: function ( values, stride, order ) {

			var nValues = values.length;
			var result = new values.constructor( nValues );

			for ( var i = 0, dstOffset = 0; dstOffset !== nValues; ++ i ) {

				var srcOffset = order[ i ] * stride;

				for ( var j = 0; j !== stride; ++ j ) {

					result[ dstOffset ++ ] = values[ srcOffset + j ];

				}

			}

			return result;

		},

		// function for parsing AOS keyframe formats
		flattenJSON: function ( jsonKeys, times, values, valuePropertyName ) {

			var i = 1, key = jsonKeys[ 0 ];

			while ( key !== undefined && key[ valuePropertyName ] === undefined ) {

				key = jsonKeys[ i ++ ];

			}

			if ( key === undefined ) return; // no data

			var value = key[ valuePropertyName ];
			if ( value === undefined ) return; // no data

			if ( Array.isArray( value ) ) {

				do {

					value = key[ valuePropertyName ];

					if ( value !== undefined ) {

						times.push( key.time );
						values.push.apply( values, value ); // push all elements

					}

					key = jsonKeys[ i ++ ];

				} while ( key !== undefined );

			} else if ( value.toArray !== undefined ) {

				// ...assume THREE.Math-ish

				do {

					value = key[ valuePropertyName ];

					if ( value !== undefined ) {

						times.push( key.time );
						value.toArray( values, values.length );

					}

					key = jsonKeys[ i ++ ];

				} while ( key !== undefined );

			} else {

				// otherwise push as-is

				do {

					value = key[ valuePropertyName ];

					if ( value !== undefined ) {

						times.push( key.time );
						values.push( value );

					}

					key = jsonKeys[ i ++ ];

				} while ( key !== undefined );

			}

		}

	};

	/**
	 * Abstract base class of interpolants over parametric samples.
	 *
	 * The parameter domain is one dimensional, typically the time or a path
	 * along a curve defined by the data.
	 *
	 * The sample values can have any dimensionality and derived classes may
	 * apply special interpretations to the data.
	 *
	 * This class provides the interval seek in a Template Method, deferring
	 * the actual interpolation to derived classes.
	 *
	 * Time complexity is O(1) for linear access crossing at most two points
	 * and O(log N) for random access, where N is the number of positions.
	 *
	 * References:
	 *
	 * 		http://www.oodesign.com/template-method-pattern.html
	 *
	 * @author tschw
	 */

	function Interpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		this.parameterPositions = parameterPositions;
		this._cachedIndex = 0;

		this.resultBuffer = resultBuffer !== undefined ?
			resultBuffer : new sampleValues.constructor( sampleSize );
		this.sampleValues = sampleValues;
		this.valueSize = sampleSize;

	}

	Object.assign( Interpolant.prototype, {

		evaluate: function ( t ) {

			var pp = this.parameterPositions,
				i1 = this._cachedIndex,

				t1 = pp[ i1 ],
				t0 = pp[ i1 - 1 ];

			validate_interval: {

				seek: {

					var right;

					linear_scan: {

						//- See http://jsperf.com/comparison-to-undefined/3
						//- slower code:
						//-
						//- 				if ( t >= t1 || t1 === undefined ) {
						forward_scan: if ( ! ( t < t1 ) ) {

							for ( var giveUpAt = i1 + 2; ; ) {

								if ( t1 === undefined ) {

									if ( t < t0 ) break forward_scan;

									// after end

									i1 = pp.length;
									this._cachedIndex = i1;
									return this.afterEnd_( i1 - 1, t, t0 );

								}

								if ( i1 === giveUpAt ) break; // this loop

								t0 = t1;
								t1 = pp[ ++ i1 ];

								if ( t < t1 ) {

									// we have arrived at the sought interval
									break seek;

								}

							}

							// prepare binary search on the right side of the index
							right = pp.length;
							break linear_scan;

						}

						//- slower code:
						//-					if ( t < t0 || t0 === undefined ) {
						if ( ! ( t >= t0 ) ) {

							// looping?

							var t1global = pp[ 1 ];

							if ( t < t1global ) {

								i1 = 2; // + 1, using the scan for the details
								t0 = t1global;

							}

							// linear reverse scan

							for ( var giveUpAt = i1 - 2; ; ) {

								if ( t0 === undefined ) {

									// before start

									this._cachedIndex = 0;
									return this.beforeStart_( 0, t, t1 );

								}

								if ( i1 === giveUpAt ) break; // this loop

								t1 = t0;
								t0 = pp[ -- i1 - 1 ];

								if ( t >= t0 ) {

									// we have arrived at the sought interval
									break seek;

								}

							}

							// prepare binary search on the left side of the index
							right = i1;
							i1 = 0;
							break linear_scan;

						}

						// the interval is valid

						break validate_interval;

					} // linear scan

					// binary search

					while ( i1 < right ) {

						var mid = ( i1 + right ) >>> 1;

						if ( t < pp[ mid ] ) {

							right = mid;

						} else {

							i1 = mid + 1;

						}

					}

					t1 = pp[ i1 ];
					t0 = pp[ i1 - 1 ];

					// check boundary cases, again

					if ( t0 === undefined ) {

						this._cachedIndex = 0;
						return this.beforeStart_( 0, t, t1 );

					}

					if ( t1 === undefined ) {

						i1 = pp.length;
						this._cachedIndex = i1;
						return this.afterEnd_( i1 - 1, t0, t );

					}

				} // seek

				this._cachedIndex = i1;

				this.intervalChanged_( i1, t0, t1 );

			} // validate_interval

			return this.interpolate_( i1, t0, t, t1 );

		},

		settings: null, // optional, subclass-specific settings structure
		// Note: The indirection allows central control of many interpolants.

		// --- Protected interface

		DefaultSettings_: {},

		getSettings_: function () {

			return this.settings || this.DefaultSettings_;

		},

		copySampleValue_: function ( index ) {

			// copies a sample value to the result buffer

			var result = this.resultBuffer,
				values = this.sampleValues,
				stride = this.valueSize,
				offset = index * stride;

			for ( var i = 0; i !== stride; ++ i ) {

				result[ i ] = values[ offset + i ];

			}

			return result;

		},

		// Template methods for derived classes:

		interpolate_: function ( /* i1, t0, t, t1 */ ) {

			throw new Error( 'call to abstract method' );
			// implementations shall return this.resultBuffer

		},

		intervalChanged_: function ( /* i1, t0, t1 */ ) {

			// empty

		}

	} );

	//!\ DECLARE ALIAS AFTER assign prototype !
	Object.assign( Interpolant.prototype, {

		//( 0, t, t0 ), returns this.resultBuffer
		beforeStart_: Interpolant.prototype.copySampleValue_,

		//( N-1, tN-1, t ), returns this.resultBuffer
		afterEnd_: Interpolant.prototype.copySampleValue_,

	} );

	/**
	 * Fast and simple cubic spline interpolant.
	 *
	 * It was derived from a Hermitian construction setting the first derivative
	 * at each sample position to the linear slope between neighboring positions
	 * over their parameter interval.
	 *
	 * @author tschw
	 */

	function CubicInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

		this._weightPrev = - 0;
		this._offsetPrev = - 0;
		this._weightNext = - 0;
		this._offsetNext = - 0;

	}

	CubicInterpolant.prototype = Object.assign( Object.create( Interpolant.prototype ), {

		constructor: CubicInterpolant,

		DefaultSettings_: {

			endingStart: ZeroCurvatureEnding,
			endingEnd: ZeroCurvatureEnding

		},

		intervalChanged_: function ( i1, t0, t1 ) {

			var pp = this.parameterPositions,
				iPrev = i1 - 2,
				iNext = i1 + 1,

				tPrev = pp[ iPrev ],
				tNext = pp[ iNext ];

			if ( tPrev === undefined ) {

				switch ( this.getSettings_().endingStart ) {

					case ZeroSlopeEnding:

						// f'(t0) = 0
						iPrev = i1;
						tPrev = 2 * t0 - t1;

						break;

					case WrapAroundEnding:

						// use the other end of the curve
						iPrev = pp.length - 2;
						tPrev = t0 + pp[ iPrev ] - pp[ iPrev + 1 ];

						break;

					default: // ZeroCurvatureEnding

						// f''(t0) = 0 a.k.a. Natural Spline
						iPrev = i1;
						tPrev = t1;

				}

			}

			if ( tNext === undefined ) {

				switch ( this.getSettings_().endingEnd ) {

					case ZeroSlopeEnding:

						// f'(tN) = 0
						iNext = i1;
						tNext = 2 * t1 - t0;

						break;

					case WrapAroundEnding:

						// use the other end of the curve
						iNext = 1;
						tNext = t1 + pp[ 1 ] - pp[ 0 ];

						break;

					default: // ZeroCurvatureEnding

						// f''(tN) = 0, a.k.a. Natural Spline
						iNext = i1 - 1;
						tNext = t0;

				}

			}

			var halfDt = ( t1 - t0 ) * 0.5,
				stride = this.valueSize;

			this._weightPrev = halfDt / ( t0 - tPrev );
			this._weightNext = halfDt / ( tNext - t1 );
			this._offsetPrev = iPrev * stride;
			this._offsetNext = iNext * stride;

		},

		interpolate_: function ( i1, t0, t, t1 ) {

			var result = this.resultBuffer,
				values = this.sampleValues,
				stride = this.valueSize,

				o1 = i1 * stride,		o0 = o1 - stride,
				oP = this._offsetPrev, 	oN = this._offsetNext,
				wP = this._weightPrev,	wN = this._weightNext,

				p = ( t - t0 ) / ( t1 - t0 ),
				pp = p * p,
				ppp = pp * p;

			// evaluate polynomials

			var sP = - wP * ppp + 2 * wP * pp - wP * p;
			var s0 = ( 1 + wP ) * ppp + ( - 1.5 - 2 * wP ) * pp + ( - 0.5 + wP ) * p + 1;
			var s1 = ( - 1 - wN ) * ppp + ( 1.5 + wN ) * pp + 0.5 * p;
			var sN = wN * ppp - wN * pp;

			// combine data linearly

			for ( var i = 0; i !== stride; ++ i ) {

				result[ i ] =
						sP * values[ oP + i ] +
						s0 * values[ o0 + i ] +
						s1 * values[ o1 + i ] +
						sN * values[ oN + i ];

			}

			return result;

		}

	} );

	/**
	 * @author tschw
	 */

	function LinearInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

	}

	LinearInterpolant.prototype = Object.assign( Object.create( Interpolant.prototype ), {

		constructor: LinearInterpolant,

		interpolate_: function ( i1, t0, t, t1 ) {

			var result = this.resultBuffer,
				values = this.sampleValues,
				stride = this.valueSize,

				offset1 = i1 * stride,
				offset0 = offset1 - stride,

				weight1 = ( t - t0 ) / ( t1 - t0 ),
				weight0 = 1 - weight1;

			for ( var i = 0; i !== stride; ++ i ) {

				result[ i ] =
						values[ offset0 + i ] * weight0 +
						values[ offset1 + i ] * weight1;

			}

			return result;

		}

	} );

	/**
	 *
	 * Interpolant that evaluates to the sample value at the position preceeding
	 * the parameter.
	 *
	 * @author tschw
	 */

	function DiscreteInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

	}

	DiscreteInterpolant.prototype = Object.assign( Object.create( Interpolant.prototype ), {

		constructor: DiscreteInterpolant,

		interpolate_: function ( i1 /*, t0, t, t1 */ ) {

			return this.copySampleValue_( i1 - 1 );

		}

	} );

	/**
	 *
	 * A timed sequence of keyframes for a specific property.
	 *
	 *
	 * @author Ben Houston / http://clara.io/
	 * @author David Sarno / http://lighthaus.us/
	 * @author tschw
	 */

	function KeyframeTrack( name, times, values, interpolation ) {

		if ( name === undefined ) throw new Error( 'THREE.KeyframeTrack: track name is undefined' );
		if ( times === undefined || times.length === 0 ) throw new Error( 'THREE.KeyframeTrack: no keyframes in track named ' + name );

		this.name = name;

		this.times = AnimationUtils.convertArray( times, this.TimeBufferType );
		this.values = AnimationUtils.convertArray( values, this.ValueBufferType );

		this.setInterpolation( interpolation || this.DefaultInterpolation );

	}

	// Static methods

	Object.assign( KeyframeTrack, {

		// Serialization (in static context, because of constructor invocation
		// and automatic invocation of .toJSON):

		toJSON: function ( track ) {

			var trackType = track.constructor;

			var json;

			// derived classes can define a static toJSON method
			if ( trackType.toJSON !== undefined ) {

				json = trackType.toJSON( track );

			} else {

				// by default, we assume the data can be serialized as-is
				json = {

					'name': track.name,
					'times': AnimationUtils.convertArray( track.times, Array ),
					'values': AnimationUtils.convertArray( track.values, Array )

				};

				var interpolation = track.getInterpolation();

				if ( interpolation !== track.DefaultInterpolation ) {

					json.interpolation = interpolation;

				}

			}

			json.type = track.ValueTypeName; // mandatory

			return json;

		}

	} );

	Object.assign( KeyframeTrack.prototype, {

		constructor: KeyframeTrack,

		TimeBufferType: Float32Array,

		ValueBufferType: Float32Array,

		DefaultInterpolation: InterpolateLinear,

		InterpolantFactoryMethodDiscrete: function ( result ) {

			return new DiscreteInterpolant( this.times, this.values, this.getValueSize(), result );

		},

		InterpolantFactoryMethodLinear: function ( result ) {

			return new LinearInterpolant( this.times, this.values, this.getValueSize(), result );

		},

		InterpolantFactoryMethodSmooth: function ( result ) {

			return new CubicInterpolant( this.times, this.values, this.getValueSize(), result );

		},

		setInterpolation: function ( interpolation ) {

			var factoryMethod;

			switch ( interpolation ) {

				case InterpolateDiscrete:

					factoryMethod = this.InterpolantFactoryMethodDiscrete;

					break;

				case InterpolateLinear:

					factoryMethod = this.InterpolantFactoryMethodLinear;

					break;

				case InterpolateSmooth:

					factoryMethod = this.InterpolantFactoryMethodSmooth;

					break;

			}

			if ( factoryMethod === undefined ) {

				var message = "unsupported interpolation for " +
					this.ValueTypeName + " keyframe track named " + this.name;

				if ( this.createInterpolant === undefined ) {

					// fall back to default, unless the default itself is messed up
					if ( interpolation !== this.DefaultInterpolation ) {

						this.setInterpolation( this.DefaultInterpolation );

					} else {

						throw new Error( message ); // fatal, in this case

					}

				}

				console.warn( 'THREE.KeyframeTrack:', message );
				return this;

			}

			this.createInterpolant = factoryMethod;

			return this;

		},

		getInterpolation: function () {

			switch ( this.createInterpolant ) {

				case this.InterpolantFactoryMethodDiscrete:

					return InterpolateDiscrete;

				case this.InterpolantFactoryMethodLinear:

					return InterpolateLinear;

				case this.InterpolantFactoryMethodSmooth:

					return InterpolateSmooth;

			}

		},

		getValueSize: function () {

			return this.values.length / this.times.length;

		},

		// move all keyframes either forwards or backwards in time
		shift: function ( timeOffset ) {

			if ( timeOffset !== 0.0 ) {

				var times = this.times;

				for ( var i = 0, n = times.length; i !== n; ++ i ) {

					times[ i ] += timeOffset;

				}

			}

			return this;

		},

		// scale all keyframe times by a factor (useful for frame <-> seconds conversions)
		scale: function ( timeScale ) {

			if ( timeScale !== 1.0 ) {

				var times = this.times;

				for ( var i = 0, n = times.length; i !== n; ++ i ) {

					times[ i ] *= timeScale;

				}

			}

			return this;

		},

		// removes keyframes before and after animation without changing any values within the range [startTime, endTime].
		// IMPORTANT: We do not shift around keys to the start of the track time, because for interpolated keys this will change their values
		trim: function ( startTime, endTime ) {

			var times = this.times,
				nKeys = times.length,
				from = 0,
				to = nKeys - 1;

			while ( from !== nKeys && times[ from ] < startTime ) {

				++ from;

			}

			while ( to !== - 1 && times[ to ] > endTime ) {

				-- to;

			}

			++ to; // inclusive -> exclusive bound

			if ( from !== 0 || to !== nKeys ) {

				// empty tracks are forbidden, so keep at least one keyframe
				if ( from >= to ) to = Math.max( to, 1 ), from = to - 1;

				var stride = this.getValueSize();
				this.times = AnimationUtils.arraySlice( times, from, to );
				this.values = AnimationUtils.arraySlice( this.values, from * stride, to * stride );

			}

			return this;

		},

		// ensure we do not get a GarbageInGarbageOut situation, make sure tracks are at least minimally viable
		validate: function () {

			var valid = true;

			var valueSize = this.getValueSize();
			if ( valueSize - Math.floor( valueSize ) !== 0 ) {

				console.error( 'THREE.KeyframeTrack: Invalid value size in track.', this );
				valid = false;

			}

			var times = this.times,
				values = this.values,

				nKeys = times.length;

			if ( nKeys === 0 ) {

				console.error( 'THREE.KeyframeTrack: Track is empty.', this );
				valid = false;

			}

			var prevTime = null;

			for ( var i = 0; i !== nKeys; i ++ ) {

				var currTime = times[ i ];

				if ( typeof currTime === 'number' && isNaN( currTime ) ) {

					console.error( 'THREE.KeyframeTrack: Time is not a valid number.', this, i, currTime );
					valid = false;
					break;

				}

				if ( prevTime !== null && prevTime > currTime ) {

					console.error( 'THREE.KeyframeTrack: Out of order keys.', this, i, currTime, prevTime );
					valid = false;
					break;

				}

				prevTime = currTime;

			}

			if ( values !== undefined ) {

				if ( AnimationUtils.isTypedArray( values ) ) {

					for ( var i = 0, n = values.length; i !== n; ++ i ) {

						var value = values[ i ];

						if ( isNaN( value ) ) {

							console.error( 'THREE.KeyframeTrack: Value is not a valid number.', this, i, value );
							valid = false;
							break;

						}

					}

				}

			}

			return valid;

		},

		// removes equivalent sequential keys as common in morph target sequences
		// (0,0,0,0,1,1,1,0,0,0,0,0,0,0) --> (0,0,1,1,0,0)
		optimize: function () {

			var times = this.times,
				values = this.values,
				stride = this.getValueSize(),

				smoothInterpolation = this.getInterpolation() === InterpolateSmooth,

				writeIndex = 1,
				lastIndex = times.length - 1;

			for ( var i = 1; i < lastIndex; ++ i ) {

				var keep = false;

				var time = times[ i ];
				var timeNext = times[ i + 1 ];

				// remove adjacent keyframes scheduled at the same time

				if ( time !== timeNext && ( i !== 1 || time !== time[ 0 ] ) ) {

					if ( ! smoothInterpolation ) {

						// remove unnecessary keyframes same as their neighbors

						var offset = i * stride,
							offsetP = offset - stride,
							offsetN = offset + stride;

						for ( var j = 0; j !== stride; ++ j ) {

							var value = values[ offset + j ];

							if ( value !== values[ offsetP + j ] ||
								value !== values[ offsetN + j ] ) {

								keep = true;
								break;

							}

						}

					} else {

						keep = true;

					}

				}

				// in-place compaction

				if ( keep ) {

					if ( i !== writeIndex ) {

						times[ writeIndex ] = times[ i ];

						var readOffset = i * stride,
							writeOffset = writeIndex * stride;

						for ( var j = 0; j !== stride; ++ j ) {

							values[ writeOffset + j ] = values[ readOffset + j ];

						}

					}

					++ writeIndex;

				}

			}

			// flush last keyframe (compaction looks ahead)

			if ( lastIndex > 0 ) {

				times[ writeIndex ] = times[ lastIndex ];

				for ( var readOffset = lastIndex * stride, writeOffset = writeIndex * stride, j = 0; j !== stride; ++ j ) {

					values[ writeOffset + j ] = values[ readOffset + j ];

				}

				++ writeIndex;

			}

			if ( writeIndex !== times.length ) {

				this.times = AnimationUtils.arraySlice( times, 0, writeIndex );
				this.values = AnimationUtils.arraySlice( values, 0, writeIndex * stride );

			}

			return this;

		},

		clone: function () {

			var times = AnimationUtils.arraySlice( this.times, 0 );
			var values = AnimationUtils.arraySlice( this.values, 0 );

			var TypedKeyframeTrack = this.constructor;
			var track = new TypedKeyframeTrack( this.name, times, values );

			// Interpolant argument to constructor is not saved, so copy the factory method directly.
			track.createInterpolant = this.createInterpolant;

			return track;

		}

	} );

	/**
	 *
	 * A Track of Boolean keyframe values.
	 *
	 *
	 * @author Ben Houston / http://clara.io/
	 * @author David Sarno / http://lighthaus.us/
	 * @author tschw
	 */

	function BooleanKeyframeTrack( name, times, values ) {

		KeyframeTrack.call( this, name, times, values );

	}

	BooleanKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

		constructor: BooleanKeyframeTrack,

		ValueTypeName: 'bool',
		ValueBufferType: Array,

		DefaultInterpolation: InterpolateDiscrete,

		InterpolantFactoryMethodLinear: undefined,
		InterpolantFactoryMethodSmooth: undefined

		// Note: Actually this track could have a optimized / compressed
		// representation of a single value and a custom interpolant that
		// computes "firstValue ^ isOdd( index )".

	} );

	/**
	 *
	 * A Track of keyframe values that represent color.
	 *
	 *
	 * @author Ben Houston / http://clara.io/
	 * @author David Sarno / http://lighthaus.us/
	 * @author tschw
	 */

	function ColorKeyframeTrack( name, times, values, interpolation ) {

		KeyframeTrack.call( this, name, times, values, interpolation );

	}

	ColorKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

		constructor: ColorKeyframeTrack,

		ValueTypeName: 'color'

		// ValueBufferType is inherited

		// DefaultInterpolation is inherited

		// Note: Very basic implementation and nothing special yet.
		// However, this is the place for color space parameterization.

	} );

	/**
	 *
	 * A Track of numeric keyframe values.
	 *
	 * @author Ben Houston / http://clara.io/
	 * @author David Sarno / http://lighthaus.us/
	 * @author tschw
	 */

	function NumberKeyframeTrack( name, times, values, interpolation ) {

		KeyframeTrack.call( this, name, times, values, interpolation );

	}

	NumberKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

		constructor: NumberKeyframeTrack,

		ValueTypeName: 'number'

		// ValueBufferType is inherited

		// DefaultInterpolation is inherited

	} );

	/**
	 * Spherical linear unit quaternion interpolant.
	 *
	 * @author tschw
	 */

	function QuaternionLinearInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

	}

	QuaternionLinearInterpolant.prototype = Object.assign( Object.create( Interpolant.prototype ), {

		constructor: QuaternionLinearInterpolant,

		interpolate_: function ( i1, t0, t, t1 ) {

			var result = this.resultBuffer,
				values = this.sampleValues,
				stride = this.valueSize,

				offset = i1 * stride,

				alpha = ( t - t0 ) / ( t1 - t0 );

			for ( var end = offset + stride; offset !== end; offset += 4 ) {

				Quaternion.slerpFlat( result, 0, values, offset - stride, values, offset, alpha );

			}

			return result;

		}

	} );

	/**
	 *
	 * A Track of quaternion keyframe values.
	 *
	 * @author Ben Houston / http://clara.io/
	 * @author David Sarno / http://lighthaus.us/
	 * @author tschw
	 */

	function QuaternionKeyframeTrack( name, times, values, interpolation ) {

		KeyframeTrack.call( this, name, times, values, interpolation );

	}

	QuaternionKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

		constructor: QuaternionKeyframeTrack,

		ValueTypeName: 'quaternion',

		// ValueBufferType is inherited

		DefaultInterpolation: InterpolateLinear,

		InterpolantFactoryMethodLinear: function ( result ) {

			return new QuaternionLinearInterpolant( this.times, this.values, this.getValueSize(), result );

		},

		InterpolantFactoryMethodSmooth: undefined // not yet implemented

	} );

	/**
	 *
	 * A Track that interpolates Strings
	 *
	 *
	 * @author Ben Houston / http://clara.io/
	 * @author David Sarno / http://lighthaus.us/
	 * @author tschw
	 */

	function StringKeyframeTrack( name, times, values, interpolation ) {

		KeyframeTrack.call( this, name, times, values, interpolation );

	}

	StringKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

		constructor: StringKeyframeTrack,

		ValueTypeName: 'string',
		ValueBufferType: Array,

		DefaultInterpolation: InterpolateDiscrete,

		InterpolantFactoryMethodLinear: undefined,

		InterpolantFactoryMethodSmooth: undefined

	} );

	/**
	 *
	 * A Track of vectored keyframe values.
	 *
	 *
	 * @author Ben Houston / http://clara.io/
	 * @author David Sarno / http://lighthaus.us/
	 * @author tschw
	 */

	function VectorKeyframeTrack( name, times, values, interpolation ) {

		KeyframeTrack.call( this, name, times, values, interpolation );

	}

	VectorKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

		constructor: VectorKeyframeTrack,

		ValueTypeName: 'vector'

		// ValueBufferType is inherited

		// DefaultInterpolation is inherited

	} );

	/**
	 *
	 * Reusable set of Tracks that represent an animation.
	 *
	 * @author Ben Houston / http://clara.io/
	 * @author David Sarno / http://lighthaus.us/
	 */

	function AnimationClip( name, duration, tracks ) {

		this.name = name;
		this.tracks = tracks;
		this.duration = ( duration !== undefined ) ? duration : - 1;

		this.uuid = _Math.generateUUID();

		// this means it should figure out its duration by scanning the tracks
		if ( this.duration < 0 ) {

			this.resetDuration();

		}

	}

	function getTrackTypeForValueTypeName( typeName ) {

		switch ( typeName.toLowerCase() ) {

			case 'scalar':
			case 'double':
			case 'float':
			case 'number':
			case 'integer':

				return NumberKeyframeTrack;

			case 'vector':
			case 'vector2':
			case 'vector3':
			case 'vector4':

				return VectorKeyframeTrack;

			case 'color':

				return ColorKeyframeTrack;

			case 'quaternion':

				return QuaternionKeyframeTrack;

			case 'bool':
			case 'boolean':

				return BooleanKeyframeTrack;

			case 'string':

				return StringKeyframeTrack;

		}

		throw new Error( 'THREE.KeyframeTrack: Unsupported typeName: ' + typeName );

	}

	function parseKeyframeTrack( json ) {

		if ( json.type === undefined ) {

			throw new Error( 'THREE.KeyframeTrack: track type undefined, can not parse' );

		}

		var trackType = getTrackTypeForValueTypeName( json.type );

		if ( json.times === undefined ) {

			var times = [], values = [];

			AnimationUtils.flattenJSON( json.keys, times, values, 'value' );

			json.times = times;
			json.values = values;

		}

		// derived classes can define a static parse method
		if ( trackType.parse !== undefined ) {

			return trackType.parse( json );

		} else {

			// by default, we assume a constructor compatible with the base
			return new trackType( json.name, json.times, json.values, json.interpolation );

		}

	}

	Object.assign( AnimationClip, {

		parse: function ( json ) {

			var tracks = [],
				jsonTracks = json.tracks,
				frameTime = 1.0 / ( json.fps || 1.0 );

			for ( var i = 0, n = jsonTracks.length; i !== n; ++ i ) {

				tracks.push( parseKeyframeTrack( jsonTracks[ i ] ).scale( frameTime ) );

			}

			return new AnimationClip( json.name, json.duration, tracks );

		},

		toJSON: function ( clip ) {

			var tracks = [],
				clipTracks = clip.tracks;

			var json = {

				'name': clip.name,
				'duration': clip.duration,
				'tracks': tracks,
				'uuid': clip.uuid

			};

			for ( var i = 0, n = clipTracks.length; i !== n; ++ i ) {

				tracks.push( KeyframeTrack.toJSON( clipTracks[ i ] ) );

			}

			return json;

		},

		CreateFromMorphTargetSequence: function ( name, morphTargetSequence, fps, noLoop ) {

			var numMorphTargets = morphTargetSequence.length;
			var tracks = [];

			for ( var i = 0; i < numMorphTargets; i ++ ) {

				var times = [];
				var values = [];

				times.push(
					( i + numMorphTargets - 1 ) % numMorphTargets,
					i,
					( i + 1 ) % numMorphTargets );

				values.push( 0, 1, 0 );

				var order = AnimationUtils.getKeyframeOrder( times );
				times = AnimationUtils.sortedArray( times, 1, order );
				values = AnimationUtils.sortedArray( values, 1, order );

				// if there is a key at the first frame, duplicate it as the
				// last frame as well for perfect loop.
				if ( ! noLoop && times[ 0 ] === 0 ) {

					times.push( numMorphTargets );
					values.push( values[ 0 ] );

				}

				tracks.push(
					new NumberKeyframeTrack(
						'.morphTargetInfluences[' + morphTargetSequence[ i ].name + ']',
						times, values
					).scale( 1.0 / fps ) );

			}

			return new AnimationClip( name, - 1, tracks );

		},

		findByName: function ( objectOrClipArray, name ) {

			var clipArray = objectOrClipArray;

			if ( ! Array.isArray( objectOrClipArray ) ) {

				var o = objectOrClipArray;
				clipArray = o.geometry && o.geometry.animations || o.animations;

			}

			for ( var i = 0; i < clipArray.length; i ++ ) {

				if ( clipArray[ i ].name === name ) {

					return clipArray[ i ];

				}

			}

			return null;

		},

		CreateClipsFromMorphTargetSequences: function ( morphTargets, fps, noLoop ) {

			var animationToMorphTargets = {};

			// tested with https://regex101.com/ on trick sequences
			// such flamingo_flyA_003, flamingo_run1_003, crdeath0059
			var pattern = /^([\w-]*?)([\d]+)$/;

			// sort morph target names into animation groups based
			// patterns like Walk_001, Walk_002, Run_001, Run_002
			for ( var i = 0, il = morphTargets.length; i < il; i ++ ) {

				var morphTarget = morphTargets[ i ];
				var parts = morphTarget.name.match( pattern );

				if ( parts && parts.length > 1 ) {

					var name = parts[ 1 ];

					var animationMorphTargets = animationToMorphTargets[ name ];
					if ( ! animationMorphTargets ) {

						animationToMorphTargets[ name ] = animationMorphTargets = [];

					}

					animationMorphTargets.push( morphTarget );

				}

			}

			var clips = [];

			for ( var name in animationToMorphTargets ) {

				clips.push( AnimationClip.CreateFromMorphTargetSequence( name, animationToMorphTargets[ name ], fps, noLoop ) );

			}

			return clips;

		},

		// parse the animation.hierarchy format
		parseAnimation: function ( animation, bones ) {

			if ( ! animation ) {

				console.error( 'THREE.AnimationClip: No animation in JSONLoader data.' );
				return null;

			}

			var addNonemptyTrack = function ( trackType, trackName, animationKeys, propertyName, destTracks ) {

				// only return track if there are actually keys.
				if ( animationKeys.length !== 0 ) {

					var times = [];
					var values = [];

					AnimationUtils.flattenJSON( animationKeys, times, values, propertyName );

					// empty keys are filtered out, so check again
					if ( times.length !== 0 ) {

						destTracks.push( new trackType( trackName, times, values ) );

					}

				}

			};

			var tracks = [];

			var clipName = animation.name || 'default';
			// automatic length determination in AnimationClip.
			var duration = animation.length || - 1;
			var fps = animation.fps || 30;

			var hierarchyTracks = animation.hierarchy || [];

			for ( var h = 0; h < hierarchyTracks.length; h ++ ) {

				var animationKeys = hierarchyTracks[ h ].keys;

				// skip empty tracks
				if ( ! animationKeys || animationKeys.length === 0 ) continue;

				// process morph targets
				if ( animationKeys[ 0 ].morphTargets ) {

					// figure out all morph targets used in this track
					var morphTargetNames = {};

					for ( var k = 0; k < animationKeys.length; k ++ ) {

						if ( animationKeys[ k ].morphTargets ) {

							for ( var m = 0; m < animationKeys[ k ].morphTargets.length; m ++ ) {

								morphTargetNames[ animationKeys[ k ].morphTargets[ m ] ] = - 1;

							}

						}

					}

					// create a track for each morph target with all zero
					// morphTargetInfluences except for the keys in which
					// the morphTarget is named.
					for ( var morphTargetName in morphTargetNames ) {

						var times = [];
						var values = [];

						for ( var m = 0; m !== animationKeys[ k ].morphTargets.length; ++ m ) {

							var animationKey = animationKeys[ k ];

							times.push( animationKey.time );
							values.push( ( animationKey.morphTarget === morphTargetName ) ? 1 : 0 );

						}

						tracks.push( new NumberKeyframeTrack( '.morphTargetInfluence[' + morphTargetName + ']', times, values ) );

					}

					duration = morphTargetNames.length * ( fps || 1.0 );

				} else {

					// ...assume skeletal animation

					var boneName = '.bones[' + bones[ h ].name + ']';

					addNonemptyTrack(
						VectorKeyframeTrack, boneName + '.position',
						animationKeys, 'pos', tracks );

					addNonemptyTrack(
						QuaternionKeyframeTrack, boneName + '.quaternion',
						animationKeys, 'rot', tracks );

					addNonemptyTrack(
						VectorKeyframeTrack, boneName + '.scale',
						animationKeys, 'scl', tracks );

				}

			}

			if ( tracks.length === 0 ) {

				return null;

			}

			var clip = new AnimationClip( clipName, duration, tracks );

			return clip;

		}

	} );

	Object.assign( AnimationClip.prototype, {

		resetDuration: function () {

			var tracks = this.tracks, duration = 0;

			for ( var i = 0, n = tracks.length; i !== n; ++ i ) {

				var track = this.tracks[ i ];

				duration = Math.max( duration, track.times[ track.times.length - 1 ] );

			}

			this.duration = duration;

			return this;

		},

		trim: function () {

			for ( var i = 0; i < this.tracks.length; i ++ ) {

				this.tracks[ i ].trim( 0, this.duration );

			}

			return this;

		},

		validate: function () {

			var valid = true;

			for ( var i = 0; i < this.tracks.length; i ++ ) {

				valid = valid && this.tracks[ i ].validate();

			}

			return valid;

		},

		optimize: function () {

			for ( var i = 0; i < this.tracks.length; i ++ ) {

				this.tracks[ i ].optimize();

			}

			return this;

		},


		clone: function () {

			var tracks = [];

			for ( var i = 0; i < this.tracks.length; i ++ ) {

				tracks.push( this.tracks[ i ].clone() );

			}

			return new AnimationClip( this.name, this.duration, tracks );

		}

	} );

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	var Cache = {

		enabled: false,

		files: {},

		add: function ( key, file ) {

			if ( this.enabled === false ) return;

			// console.log( 'THREE.Cache', 'Adding key:', key );

			this.files[ key ] = file;

		},

		get: function ( key ) {

			if ( this.enabled === false ) return;

			// console.log( 'THREE.Cache', 'Checking key:', key );

			return this.files[ key ];

		},

		remove: function ( key ) {

			delete this.files[ key ];

		},

		clear: function () {

			this.files = {};

		}

	};

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	function LoadingManager( onLoad, onProgress, onError ) {

		var scope = this;

		var isLoading = false;
		var itemsLoaded = 0;
		var itemsTotal = 0;
		var urlModifier = undefined;

		// Refer to #5689 for the reason why we don't set .onStart
		// in the constructor

		this.onStart = undefined;
		this.onLoad = onLoad;
		this.onProgress = onProgress;
		this.onError = onError;

		this.itemStart = function ( url ) {

			itemsTotal ++;

			if ( isLoading === false ) {

				if ( scope.onStart !== undefined ) {

					scope.onStart( url, itemsLoaded, itemsTotal );

				}

			}

			isLoading = true;

		};

		this.itemEnd = function ( url ) {

			itemsLoaded ++;

			if ( scope.onProgress !== undefined ) {

				scope.onProgress( url, itemsLoaded, itemsTotal );

			}

			if ( itemsLoaded === itemsTotal ) {

				isLoading = false;

				if ( scope.onLoad !== undefined ) {

					scope.onLoad();

				}

			}

		};

		this.itemError = function ( url ) {

			if ( scope.onError !== undefined ) {

				scope.onError( url );

			}

		};

		this.resolveURL = function ( url ) {

			if ( urlModifier ) {

				return urlModifier( url );

			}

			return url;

		};

		this.setURLModifier = function ( transform ) {

			urlModifier = transform;
			return this;

		};

	}

	var DefaultLoadingManager = new LoadingManager();

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	var loading = {};

	function FileLoader( manager ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

	}

	Object.assign( FileLoader.prototype, {

		load: function ( url, onLoad, onProgress, onError ) {

			if ( url === undefined ) url = '';

			if ( this.path !== undefined ) url = this.path + url;

			url = this.manager.resolveURL( url );

			var scope = this;

			var cached = Cache.get( url );

			if ( cached !== undefined ) {

				scope.manager.itemStart( url );

				setTimeout( function () {

					if ( onLoad ) onLoad( cached );

					scope.manager.itemEnd( url );

				}, 0 );

				return cached;

			}

			// Check if request is duplicate

			if ( loading[ url ] !== undefined ) {

				loading[ url ].push( {

					onLoad: onLoad,
					onProgress: onProgress,
					onError: onError

				} );

				return;

			}

			// Check for data: URI
			var dataUriRegex = /^data:(.*?)(;base64)?,(.*)$/;
			var dataUriRegexResult = url.match( dataUriRegex );

			// Safari can not handle Data URIs through XMLHttpRequest so process manually
			if ( dataUriRegexResult ) {

				var mimeType = dataUriRegexResult[ 1 ];
				var isBase64 = !! dataUriRegexResult[ 2 ];
				var data = dataUriRegexResult[ 3 ];

				data = decodeURIComponent( data );

				if ( isBase64 ) data = atob( data );

				try {

					var response;
					var responseType = ( this.
